# 5GLabX Cloud – Full-Stack Development Guide

> **Version:** 2025-09-15  
> **Audience:** full-stack engineers, DevOps, product managers  
> **Purpose:** single source-of-truth for running, extending and deploying the 5GLabX Cloud SaaS (4G/5G protocol testing & analytics).

---

## 1. High-Level Architecture

```text
┌─────────────────────────────┐  browser
│  Front-End (React)          │  📋  user-dashboard ‑- left nav
│   • Dashboard Shell (Vite)  │  📋  <iframe> 5GLabX legacy SPA
│   • Legacy 5GLabX SPA      │
└────────▲───────────▲────────┘
         │REST/WS    │postMessage/iframe
         │(JWT)      │
┌────────▼───────────▼────────┐
│  Back-End API-Gateway       │  Node / Express Edge-Fn
│   • Auth (Supabase JWT)     │
│   • /api/tests /logs /files │
│   • /ws/log-stream          │
└────────▲───────────▲────────┘
         │SQL/WS     │object-store
         │           │
┌────────▼───────────▼────────┐
│  Supabase (Postgres + Realtime)│
│   • test_suites / test_cases    │
│   • test_executions            │
│   • decoded_messages           │
│   • layer_stats + KPI tables   │
└────────▲───────────▲────────┘
         │LISTEN/NOTIFY│S3 / Minio
         │             │
┌────────▼───────────▼────────┐
│  Worker Pool                │  Kubernetes Job / Fly.io machine
│   ➊ download PCAP / CLI logs│
│   ➋ LogProcessor            │  (existing JS)
│   ➌ MessageAnalyzer         │
│   ➍ insert rows + broadcast │
└─────────────────────────────┘
```

---

## 2. Repositories & Folder Layout

| Path                                   | Description                                        |
|----------------------------------------|----------------------------------------------------|
| `index.html` / `app.js`                | Legacy Babel/UMD 5GLabX SPA (kept as-is).          |
| `public/5glabx/`                       | **Deployment** bundle of the legacy SPA.           |
| `web/`                                 | Modern dashboard (Vite + React 18 + TypeScript).   |
| `web/src/pages/legacy/Legacy5GLabXPage.tsx` | iframe wrapper component.                      |
| `web/src/services/5GLabXDataService.ts` | Supabase data-access layer (test cases, logs, …).  |
| `services/`                             | Decoding pipeline (LogProcessor, RealTime*).       |

---

## 3. Supabase Schema (DDL)

```sql
-- tenant table
create table tenants (
  id uuid primary key default gen_random_uuid(),
  name text
);

alter table auth.users add column tenant_id uuid references tenants(id);

-- test suite catalogue
create table test_suites (
  id uuid primary key default gen_random_uuid(),
  tenant_id uuid references tenants(id),
  name text,
  description text,
  created_at timestamptz default now()
);

create table test_cases (
  id uuid primary key default gen_random_uuid(),
  tenant_id uuid references tenants(id),
  suite_id uuid references test_suites(id),
  category text,
  subcategory text,
  name text,
  description text,
  protocol_stack text[], -- e.g. {'PHY','MAC'}
  messages jsonb,         -- array of capture urls
  created_at timestamptz default now()
);

create table test_executions (
  id uuid primary key default gen_random_uuid(),
  tenant_id uuid references tenants(id),
  case_id uuid references test_cases(id),
  user_id uuid,
  status text default 'queued',
  started_at timestamptz,
  finished_at timestamptz
);

create table decoded_messages (
  id bigserial primary key,
  tenant_id uuid,
  execution_id uuid references test_executions(id),
  ts timestamptz,
  layer text,
  ie_path text[],
  payload jsonb
);

create policy rls_tenant on all tables using (tenant_id = auth.jwt() ->> 'tenant_id');
```

> See `/sql/seed_test_catalog.sql` for loading the 1 000+ test-case rows described (400 NR, 300 LTE, …).

---

## 4. Edge Functions / Routes

### `/functions/test-executions.ts`
Creates a queued execution row.

```ts
import { serve } from 'https://deno.land/std/http/server.ts'
import { createClient } from 'https://deno.land/x/supabase/mod.ts'

serve(async req => {
  const supa = createClient(Deno.env.get('SUPABASE_URL'), Deno.env.get('SUPABASE_SECRET'))
  const { case_id } = await req.json()
  const {
    data: { user }
  } = await supa.auth.getUser(req)

  const { data, error } = await supa
    .from('test_executions')
    .insert({ tenant_id: user!.user_metadata.tenant_id, case_id })
    .select()
    .single()
  if (error) return new Response(error.message, { status: 400 })

  return new Response(JSON.stringify(data), { status: 201 })
})
```

### WebSocket hub
`/ws/log-stream?token=…&execId=…` simply proxies Supabase realtime channel `test_log::<execId>`.

---

## 5. Worker Pipeline

```bash
packages/worker/
 ├ Dockerfile
 ├ index.js        # main entry
 └ parsers/        # uses existing LogProcessor, MessageAnalyzer
```

`index.js` outline:

```js
for await (const payload of queue.poll('test_executions:queued')) {
  const { id: execId, tenant_id, case_id } = payload
  await supa.from('test_executions').update({ status:'running', started_at:new Date() }).eq('id',execId)

  const testCase = await supa.from('test_cases').select('messages').eq('id',case_id).single()
  for (const url of testCase.messages) {
    const lines = await downloadAndExtract(url)
    for (const raw of lines) {
      const decoded = LogProcessor.process(raw)
      const enriched = MessageAnalyzer.analyze(decoded)
      await batch.push({ ...enriched, tenant_id, execution_id: execId })
      channel.send({ event:'log', payload: enriched })
    }
  }
  await flushBatches()
  await supa.from('test_executions').update({ status:'completed', finished_at:new Date() }).eq('id',execId)
}
```

---

## 6. Front-End Integration Steps

1.  Generate Supabase client
    ```ts
    import { createClient } from '@supabase/supabase-js'
    export const supabase = createClient(import.meta.env.VITE_SUPA_URL!, import.meta.env.VITE_SUPA_ANON!)
    ```
2.  `fiveGLabXDataService.ts` already wired: replace mock endpoints with Supabase functions (completed in codebase).
3.  `RealTimeDataService.ts` subscribes:
    ```ts
    this.channel = supabase
      .channel(`test_log::${execId}`)
      .on('broadcast', { event:'log' }, msg=>this.logListeners.forEach(fn=>fn(msg.payload)))
    ```
4.  Route registration
    ```tsx
    import Legacy5GLabXPage from './pages/legacy/Legacy5GLabXPage'
    <Route path="/app/protocol-analyzer" element={<Legacy5GLabXPage />} />
    ```

---

## 7. Deployment

```yaml
name: ci-cd
on: [push]
jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v3
        with: { node-version: '18' }
      - run: cd web && npm ci && npm run build
      - run: tar -C public/5glabx -czf legacy.tgz .
      - run: docker build -t registry/5glabx-worker:$(git rev-parse --short HEAD) packages/worker
      - run: docker push registry/5glabx-worker:$(git rev-parse --short HEAD)
      # deploy static + worker via Terraform / helm ...
```

---

## 8. Roadmap

| Phase | Goal | Key Tasks |
|-------|------|-----------|
| M1    | MVP SaaS launch | seed catalogue; deploy single worker; billing stub; basic RLS |
| M2    | Advanced KPI dashboards | materialized views, Grafana boards, alerting |
| M3    | Multi-cluster capture | support distributed packet-tap uploads |
| M4    | Full React migration | port legacy SPA components to modern code, retire iframe |

---

## 9. Troubleshooting Checklist

1. **Blank iframe** → Check `/5glabx/index.html` network 404. 
2. **No logs stream** → Verify WS CONNECT, Supabase channel permission & JWT. 
3. **RLS errors** → Confirm `tenant_id` in JWT payload. 
4. **Worker stuck queued** → Check `status` column and `LISTEN` triggers.

---

## 10. Credits

• Core protocol parsers – o3 AI team.  
• Dashboard shell – NextGen UI squad.  
• Supabase schema & worker glue – DevOps guild.