# 5GLabX Cloud – Subscription-Based 4G/5G Protocol Analyzer & 3GPP Test-Suite Platform

*Version 1.1 – 2025-09-13*

---

## Table of Contents

0. Executive Summary  
1. Vision & Personas  
2. Solution Architecture  
3. Repository & Branching Model  
4. Supabase Design  
5. Stripe Billing & Quota Enforcement  
6. Run-Time Flow  
7. Controlled Fault-Injection Framework  
8. Front-End Specification  
9. Back-End / Log-Engine Specification  
10. Netlify Configuration  
11. Continuous Integration / Delivery  
12. Test-Suite Library  
13. Security, Compliance & Monitoring  
14. Launch Checklist & Milestones  
15. Appendix  

---

## 0  Executive Summary

Deliver a hardware-free, browser-based alternative to Keysight/Anritsu analyzers. Users purchase a subscription, sign-in, and perform:

* Live protocol log analysis (layers: RRC, NAS, NGAP, SIP, etc.).
* Execution of >1 000 ready-made 3 GPP functional, mobility, performance and security test cases.
* Fault-simulation runs injecting realistic protocol errors.

Persistent data, auth and quotas are handled by **Supabase**; web hosting and serverless logic by **Netlify**; optional heavy log-engine container by **Fly.io / Railway**.

---

## 1  Vision & Personas

### Personas

| Persona          | Goals                                               |
|------------------|-----------------------------------------------------|
| QA Engineer      | Run regression suites, analyse failures             |
| Protocol Dev     | Inject faults, inspect enhanced decodes             |
| Team Lead        | Track KPIs, manage seats & billing                  |
| Admin (internal) | Maintain plans, quotas, 3 GPP library               |

### Value Propositions

* Zero hardware; works on any modern browser.
* Always-up-to-date 3 GPP release coverage.
* Pay-as-you-go; cancel anytime.
* Interactive views identical to on-prem 5GLabX.

---

## 2  Solution Architecture

```
Browser (React/Vite)
   ↕ HTTPS & WS
Netlify Site (static + functions)
   ↔ Supabase (Postgres, Edge Functions, Auth, Storage)
   ↔ Stripe (billing)
   ↔ 5GLabX Log-Engine API (Edge or container)
```

**Real-time Flow**  
Run Test → Function pulls test_case from Supabase → inserts execution row → sends steps to Log-Engine → Log-Engine streams decoded events → FE renders.

---

## 3  Repository & Branching Model

```
root/
├ web/                    React + Vite (or Next.js)
│ ├ pages/                index, pricing, sign-in, app/*
│ ├ components/
│ ├ lib/stripe/
│ └ styles/
├ api/                    Log-Engine (Node / Deno)
├ netlify/functions/      create_checkout, stripe_webhook, run_test_case
├ test-suites/            YAML|JSON (1 000+ cases)
├ infra/
│ ├ supabase/ddl.sql
│ └ scripts/seed.ts
└ .github/workflows/      lint, test, deploy, sync-testcases
```

* **main** → production  
* **develop** → staging  
* **feat/*** → feature branches → PR → Netlify preview

---

## 4  Supabase Design

### 4.1 Auth
* Providers: email/password, GitHub, Google.
* Post-signup trigger inserts role `trial`.

### 4.2 Core Tables
```
plans(id, stripe_price_id, name, exec_limit)
subscriptions(user_id PK, stripe_sub_id, plan_id, status, period_end)

test_suites(id, name, suite_type, description, 3gpp_release, created_by)
test_cases(id, suite_id, title, 3gpp_ref, default_parameters JSONB)
test_case_steps(id, case_id, step_order, message_json, expected_params JSONB)

executions(id, case_id, run_by, status, started_at, finished_at, fault_injected BOOL, summary JSONB)
execution_steps(id, execution_id, step_order, raw_log, verdict, fault_type TEXT)
```

### 4.3 Row-Level Security Example
```sql
create policy "owner or admin" on executions
  for all using (auth.uid() = run_by or auth.role() = 'service_role');
```

### 4.4 Edge Functions
* `run_test_case(id, simulateFault)` – quota check → insert execution → call log-engine.  
* `quota_check(user_id, suite_type)` – counts executions per month & plan.

---

## 5  Stripe Billing & Quota Enforcement

| Plan      | Exec Limit | Fault Sim | Price |
|-----------|-----------:|-----------|-------|
| Trial     | 50/mo      | Off       | Free  |
| Pro       | ∞          | On        | $199  |
| Enterprise| ∞ (prio)   | On        | Custom|

Flow: checkout → Stripe Webhook → update `subscriptions` → trigger sets user role `paid`.
`run_test_case` rejects if quota exceeded.

---

## 6  Run-Time Flow (Detailed)

1. **POST** `/run_test_case` `{caseId, simulateFault?}`  
2. Serverless:
   1. SELECT test & steps from Supabase.
   2. INSERT `executions` (status QUEUED).
   3. Forward to `LOG_ENGINE_URL/execute`.
3. FE opens WS `execution/<execId>/stream`.
4. Log-Engine replays (with optional Fault Injector) → emits decoded events.
5. On completion, back-end PATCHes `executions` status FINAL.

---

## 7  Controlled Fault-Injection Framework

* Global rate (env `GLOBAL_FAULT_RATE`, default 10 %).
* Types: `dropped_message`, `bad_ie`, `timer_expiry`, `kpi_degradation`.
* Columns: `executions.fault_injected`, `execution_steps.fault_type`.
* UI toggle "Simulate Fault"; orange progress bar when active.

---

## 8  Front-End Specification

### 8.1 Public Routes
`/` Home • `/pricing` • `/docs` • `/sign-in` | `/sign-up`

### 8.2 Protected Dashboard (sidebar)
```
Dashboard  – Live Analyzer (full 5GLabX)
Test Suites – Browse / Run / Edit
Executions  – History & KPIs
Account     – Usage & Billing Portal
Admin*      – Users, Plans, Library, Metrics
```
(*visible only to `admin` role)

* State: `supabase-js` + React-Query + Realtime.
* Styling: TailwindCSS + DaisyUI.
* Dual-pane viewer: log scroll + collapsible IE tree.
* Export: PDF call-flow diagram (no PCAP required).

---

## 9  Back-End / Log-Engine Specification

Option A – Port to Deno Edge Function.  
Option B – Node container on Fly.io.

Endpoints
```
POST /execute            {execId, steps[], injectFault}
WS   /execution/<id>/stream   // real-time decoded events
GET  /health
```
Fault Injector module sits before existing Parser.

---

## 10  Netlify Configuration

`netlify.toml`
```toml
[build]
  base   = "web"
  publish= "web/dist"
  command= "npm run build"

[functions]
  directory = "netlify/functions"

[[redirects]]
  from = "/api/*"
  to   = "/.netlify/functions/:splat"
  status = 200
```

Env-vars: `SUPABASE_URL`, `SUPABASE_ANON_KEY`, `SUPABASE_SERVICE_KEY`, `STRIPE_SECRET_KEY`, `STRIPE_WEBHOOK_SECRET`, `LOG_ENGINE_URL`, `GLOBAL_FAULT_RATE`.

---

## 11  Continuous Integration / Delivery

| Workflow            | Steps                                |
|---------------------|--------------------------------------|
| lint-test.yml       | ESLint, Vitest                       |
| deploy-preview.yml  | Netlify preview, PR comment          |
| prod.yml            | Netlify prod, `supabase db push`, seed script |
| sync-testcases.yml  | Diff `/test-suites` → upsert cases   |

---

## 12  Test-Suite Library

Suite types: `functional`, `mobility`, `performance`, `security`, `ims`, `qos`, `oran`, `nbiot`, `ntn`, `v2x`, `interrat`, `negative`, `regression`.
Target counts ≈ 1 000.
All messages, IE names and values must map to exact 3 GPP spec tables. Example YAML provided earlier.

---

## 13  Security, Compliance & Monitoring

* CSP headers & XSS protection via Netlify `_headers`.
* RLS on every table; `service_role` key only server-side.
* Stripe PCI handled externally.
* Sentry (FE) + Supabase Logs + Netlify Analytics.
* Daily automated DB backups; 30-day retention.
* OpsGenie alert: Edge Function error rate > 1 %.

---

## 14  Launch Checklist & Milestones

| Phase | Scope | ETA |
|-------|-------|-----|
| 0     | Codebase cleanup (done) | ✔ |
| 1     | Supabase schema + RLS   | 1 wk |
| 2     | Auth & Protected Routing| 1 wk |
| 3     | Stripe Billing Flow     | 1 wk |
| 4     | Dashboard w/ Analyzer   | 2 wk |
| 5     | Admin Dashboard         | 1 wk |
| 6     | Log-Engine Deploy       | 1 wk |
| 7     | Seed 1 000 cases + Fault| 1 wk |
| 8     | QA & Security Review    | 1 wk |
| 9     | Marketing Launch        | 1 wk |

---

## 15  Appendix

### A. SQL DDL Snippet – Executions & Fault Columns
```sql
create table executions (
  id uuid primary key default gen_random_uuid(),
  case_id uuid references test_cases(id),
  run_by uuid references auth.users(id),
  status text check (status in ('QUEUED','RUNNING','PASSED','FAILED')),
  started_at timestamptz default now(),
  finished_at timestamptz,
  fault_injected boolean default false,
  summary jsonb
);

create table execution_steps (
  id uuid primary key default gen_random_uuid(),
  execution_id uuid references executions(id) on delete cascade,
  step_order int,
  raw_log text,
  verdict text,
  fault_type text
);
```

### B. `run_test_case` Serverless Outline (TypeScript)
```ts
export const handler = async (event) => {
  const { caseId, simulateFault = false } = JSON.parse(event.body);
  const user = await getSupabaseUser(event);

  // Quota check
  const { count } = await supabase
    .from('executions')
    .select('*', { count: 'exact', head: true })
    .eq('run_by', user.id)
    .gte('started_at', firstDayOfMonth());
  if (count >= user.plan.exec_limit) return forbidden('Quota exceeded');

  // Insert execution row
  const { data: exec } = await supabase.from('executions')
    .insert({ case_id: caseId, run_by: user.id, status: 'QUEUED', fault_injected: simulateFault })
    .select()
    .single();

  // Trigger log-engine
  await fetch(`${process.env.LOG_ENGINE_URL}/execute`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ execId: exec.id, simulateFault })
  });

  return ok({ execId: exec.id });
};
```

### C. Seed Script Outline
*Parse YAML in `/test-suites`, upsert into Supabase via service role key.*

---

**End of Document**