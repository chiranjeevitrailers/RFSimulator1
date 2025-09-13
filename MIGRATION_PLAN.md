# 5GLabX Cloud - Migration Plan

*Version 1.0 – 2025-01-13*

## Executive Summary

This document outlines the comprehensive migration plan for transforming the existing 5GLabX desktop application into a cloud-based subscription platform. The migration follows a phased approach to minimize risk while delivering incremental value.

## Migration Overview

### Current State
- **Desktop Electron Application** with complete CLI integration
- **Local file storage** and single-user access
- **Direct process execution** for CLI tools
- **Production-ready** with 100% CLI integration

### Target State
- **Cloud-based web application** with subscription model
- **Multi-user database** with role-based access
- **Containerized microservices** for scalability
- **Real-time collaboration** and advanced analytics

## Migration Strategy

### Phase-Based Approach
The migration is divided into 9 phases, each building upon the previous phase:

1. **Foundation Setup** (Week 1-2)
2. **Authentication & Billing** (Week 3-4)
3. **Core Dashboard** (Week 5-6)
4. **Protocol Analysis** (Week 7-8)
5. **Test Suites** (Week 9-10)
6. **Advanced Features** (Week 11-12)
7. **Admin & Monitoring** (Week 13-14)
8. **Testing & Optimization** (Week 15-16)
9. **Launch & Support** (Week 17-18)

---

## Phase 1: Foundation Setup (Week 1-2)

### 1.1 Repository Structure
**Duration**: 2 days
**Priority**: Critical

#### Tasks
- [ ] Create new repository with monorepo structure
- [ ] Setup workspace configuration
- [ ] Configure development environment
- [ ] Setup CI/CD pipelines

#### Deliverables
- Complete repository structure
- Development environment setup
- Basic CI/CD workflows

#### Success Criteria
- Developers can clone and run the project locally
- CI/CD pipelines are functional
- All development tools are configured

### 1.2 Supabase Infrastructure
**Duration**: 3 days
**Priority**: Critical

#### Tasks
- [ ] Create Supabase project
- [ ] Design database schema
- [ ] Implement Row Level Security (RLS)
- [ ] Setup authentication providers
- [ ] Create initial migrations

#### Database Schema
```sql
-- Core tables
CREATE TABLE plans (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  stripe_price_id TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  exec_limit INTEGER,
  fault_simulation BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE subscriptions (
  user_id UUID PRIMARY KEY REFERENCES auth.users(id),
  stripe_sub_id TEXT UNIQUE,
  plan_id UUID REFERENCES plans(id),
  status TEXT CHECK (status IN ('active', 'canceled', 'past_due')),
  period_end TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE test_suites (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  suite_type TEXT NOT NULL,
  description TEXT,
  threegpp_release TEXT,
  created_by UUID REFERENCES auth.users(id),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE test_cases (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  suite_id UUID REFERENCES test_suites(id),
  title TEXT NOT NULL,
  threegpp_ref TEXT,
  default_parameters JSONB,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE test_case_steps (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  case_id UUID REFERENCES test_cases(id),
  step_order INTEGER NOT NULL,
  message_json JSONB NOT NULL,
  expected_params JSONB,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE executions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  case_id UUID REFERENCES test_cases(id),
  run_by UUID REFERENCES auth.users(id),
  status TEXT CHECK (status IN ('QUEUED', 'RUNNING', 'PASSED', 'FAILED')),
  started_at TIMESTAMPTZ DEFAULT NOW(),
  finished_at TIMESTAMPTZ,
  fault_injected BOOLEAN DEFAULT false,
  summary JSONB
);

CREATE TABLE execution_steps (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  execution_id UUID REFERENCES executions(id) ON DELETE CASCADE,
  step_order INTEGER,
  raw_log TEXT,
  verdict TEXT,
  fault_type TEXT
);
```

#### RLS Policies
```sql
-- Users can only see their own executions
CREATE POLICY "Users can view own executions" ON executions
  FOR SELECT USING (auth.uid() = run_by);

-- Users can only create executions for themselves
CREATE POLICY "Users can create own executions" ON executions
  FOR INSERT WITH CHECK (auth.uid() = run_by);

-- Admins can see all executions
CREATE POLICY "Admins can view all executions" ON executions
  FOR ALL USING (auth.role() = 'service_role');
```

#### Deliverables
- Complete database schema
- RLS policies implemented
- Authentication providers configured
- Initial data seeding

#### Success Criteria
- Database schema is deployed
- RLS policies are working
- Authentication flow is functional
- Initial test data is loaded

### 1.3 Frontend Foundation
**Duration**: 3 days
**Priority**: High

#### Tasks
- [ ] Setup React + Vite project
- [ ] Configure TypeScript
- [ ] Setup TailwindCSS + DaisyUI
- [ ] Implement routing structure
- [ ] Setup Supabase client

#### Technology Stack
```json
{
  "dependencies": {
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "react-router-dom": "^6.8.0",
    "@supabase/supabase-js": "^2.0.0",
    "@tanstack/react-query": "^4.24.0",
    "zustand": "^4.3.0",
    "tailwindcss": "^3.2.0",
    "daisyui": "^3.0.0"
  }
}
```

#### Deliverables
- React application setup
- Routing configuration
- Supabase client integration
- Basic component structure

#### Success Criteria
- React app runs locally
- Routing is functional
- Supabase connection is established
- Basic components are rendered

---

## Phase 2: Authentication & Billing (Week 3-4)

### 2.1 Authentication System
**Duration**: 3 days
**Priority**: Critical

#### Tasks
- [ ] Implement Supabase authentication
- [ ] Create login/signup forms
- [ ] Setup protected routes
- [ ] Implement role-based access control
- [ ] Create user management

#### Authentication Flow
```typescript
// Auth hook implementation
export const useAuth = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        setUser(session?.user ?? null);
        setLoading(false);
      }
    );

    return () => subscription.unsubscribe();
  }, []);

  const signIn = async (email: string, password: string) => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password
    });
    return { data, error };
  };

  const signUp = async (email: string, password: string) => {
    const { data, error } = await supabase.auth.signUp({
      email,
      password
    });
    return { data, error };
  };

  return { user, loading, signIn, signUp, signOut };
};
```

#### Deliverables
- Complete authentication system
- Protected route components
- User management interface
- Role-based access control

#### Success Criteria
- Users can sign up and log in
- Protected routes are working
- Role-based access is enforced
- User sessions are maintained

### 2.2 Stripe Billing Integration
**Duration**: 4 days
**Priority**: Critical

#### Tasks
- [ ] Setup Stripe account and products
- [ ] Implement checkout flow
- [ ] Create webhook handlers
- [ ] Setup subscription management
- [ ] Implement quota enforcement

#### Billing Plans
```typescript
export const BILLING_PLANS = {
  trial: {
    id: 'trial',
    name: 'Trial',
    price: 0,
    execLimit: 50,
    faultSimulation: false,
    duration: '7 days'
  },
  pro: {
    id: 'pro',
    name: 'Professional',
    price: 199,
    execLimit: -1, // Unlimited
    faultSimulation: true,
    duration: 'monthly'
  },
  enterprise: {
    id: 'enterprise',
    name: 'Enterprise',
    price: 'custom',
    execLimit: -1, // Unlimited
    faultSimulation: true,
    duration: 'custom'
  }
};
```

#### Stripe Integration
```typescript
// Checkout creation
export const createCheckout = async (priceId: string, userId: string) => {
  const { data, error } = await supabase.functions.invoke('create-checkout', {
    body: { priceId, userId }
  });
  return { data, error };
};

// Webhook handler
export const handleStripeWebhook = async (event: Stripe.Event) => {
  switch (event.type) {
    case 'checkout.session.completed':
      await handleCheckoutCompleted(event.data.object);
      break;
    case 'customer.subscription.updated':
      await handleSubscriptionUpdated(event.data.object);
      break;
    case 'customer.subscription.deleted':
      await handleSubscriptionDeleted(event.data.object);
      break;
  }
};
```

#### Deliverables
- Stripe integration complete
- Checkout flow functional
- Webhook handlers implemented
- Subscription management working

#### Success Criteria
- Users can purchase subscriptions
- Webhooks update user status
- Quota enforcement is working
- Billing portal is accessible

---

## Phase 3: Core Dashboard (Week 5-6)

### 3.1 Dashboard Migration
**Duration**: 4 days
**Priority**: High

#### Tasks
- [ ] Migrate dashboard components from desktop app
- [ ] Implement real-time updates
- [ ] Setup data visualization
- [ ] Create responsive design
- [ ] Implement navigation

#### Component Migration
```typescript
// Dashboard layout component
export const DashboardLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user } = useAuth();
  const { data: metrics } = useQuery(['metrics'], fetchSystemMetrics);

  return (
    <div className="drawer lg:drawer-open">
      <input id="drawer-toggle" type="checkbox" className="drawer-toggle" />
      
      <div className="drawer-content flex flex-col">
        <Navbar user={user} />
        <main className="flex-1 p-6">
          {children}
        </main>
      </div>
      
      <div className="drawer-side">
        <label htmlFor="drawer-toggle" className="drawer-overlay"></label>
        <aside className="min-h-full w-64 bg-base-200">
          <Sidebar />
        </aside>
      </div>
    </div>
  );
};
```

#### Real-time Updates
```typescript
// Real-time metrics hook
export const useRealtimeMetrics = () => {
  const [metrics, setMetrics] = useState<SystemMetrics | null>(null);

  useEffect(() => {
    const channel = supabase
      .channel('metrics')
      .on('postgres_changes', {
        event: '*',
        schema: 'public',
        table: 'executions'
      }, (payload) => {
        // Update metrics based on execution changes
        updateMetrics(payload);
      })
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  return metrics;
};
```

#### Deliverables
- Complete dashboard interface
- Real-time data updates
- Responsive design
- Navigation system

#### Success Criteria
- Dashboard loads with real data
- Real-time updates are working
- Design is responsive
- Navigation is intuitive

### 3.2 Data Visualization
**Duration**: 3 days
**Priority**: Medium

#### Tasks
- [ ] Migrate chart components
- [ ] Implement protocol-specific views
- [ ] Create KPI dashboards
- [ ] Setup export functionality

#### Chart Components
```typescript
// Metrics chart component
export const MetricsChart: React.FC<{ data: MetricData[] }> = ({ data }) => {
  return (
    <div className="card bg-base-100 shadow-xl">
      <div className="card-body">
        <h2 className="card-title">System Metrics</h2>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data}>
              <XAxis dataKey="timestamp" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="value" stroke="#8884d8" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};
```

#### Deliverables
- Chart components migrated
- KPI dashboards functional
- Export functionality working
- Protocol-specific views

#### Success Criteria
- Charts display real data
- KPIs are accurate
- Export functions work
- Views are protocol-specific

---

## Phase 4: Protocol Analysis (Week 7-8)

### 4.1 Log Engine Migration
**Duration**: 5 days
**Priority**: Critical

#### Tasks
- [ ] Containerize existing parsers
- [ ] Implement WebSocket streaming
- [ ] Setup fault injection framework
- [ ] Create API endpoints
- [ ] Deploy to cloud platform

#### Parser Migration
```typescript
// Base parser interface
export interface ProtocolParser {
  parse(data: Buffer): ParsedMessage;
  validate(message: ParsedMessage): boolean;
  getMessageType(message: ParsedMessage): string;
}

// RRC parser implementation
export class RRCParser implements ProtocolParser {
  parse(data: Buffer): ParsedMessage {
    // Migrate existing RRC parsing logic
    return this.parseRRCData(data);
  }

  validate(message: ParsedMessage): boolean {
    // Validate RRC message structure
    return this.validateRRCMessage(message);
  }

  getMessageType(message: ParsedMessage): string {
    return message.messageType;
  }
}
```

#### WebSocket Streaming
```typescript
// WebSocket server for real-time streaming
export class WebSocketServer {
  private wss: WebSocketServer;
  private connections: Map<string, WebSocket> = new Map();

  constructor(port: number) {
    this.wss = new WebSocketServer({ port });
    this.setupEventHandlers();
  }

  private setupEventHandlers() {
    this.wss.on('connection', (ws, req) => {
      const executionId = this.extractExecutionId(req.url);
      this.connections.set(executionId, ws);
      
      ws.on('close', () => {
        this.connections.delete(executionId);
      });
    });
  }

  streamExecutionResult(executionId: string, result: ExecutionResult) {
    const ws = this.connections.get(executionId);
    if (ws && ws.readyState === WebSocket.OPEN) {
      ws.send(JSON.stringify(result));
    }
  }
}
```

#### Deliverables
- Containerized log engine
- WebSocket streaming functional
- API endpoints working
- Cloud deployment complete

#### Success Criteria
- Log engine runs in container
- WebSocket connections work
- API responses are correct
- Deployment is successful

### 4.2 Analyzer Interface
**Duration**: 3 days
**Priority**: High

#### Tasks
- [ ] Migrate log viewer components
- [ ] Implement dual-pane layout
- [ ] Setup protocol-specific views
- [ ] Create export functionality

#### Log Viewer Component
```typescript
// Dual-pane log viewer
export const LogViewer: React.FC<{ executionId: string }> = ({ executionId }) => {
  const [selectedMessage, setSelectedMessage] = useState<ParsedMessage | null>(null);
  const { data: messages } = useQuery(['execution', executionId], () => 
    fetchExecutionMessages(executionId)
  );

  return (
    <div className="flex h-full">
      {/* Left pane - Message list */}
      <div className="w-1/2 border-r">
        <div className="h-full overflow-y-auto">
          {messages?.map((message) => (
            <MessageRow
              key={message.id}
              message={message}
              onClick={() => setSelectedMessage(message)}
              selected={selectedMessage?.id === message.id}
            />
          ))}
        </div>
      </div>
      
      {/* Right pane - Message details */}
      <div className="w-1/2">
        {selectedMessage ? (
          <MessageDetails message={selectedMessage} />
        ) : (
          <div className="flex items-center justify-center h-full">
            <p className="text-gray-500">Select a message to view details</p>
          </div>
        )}
      </div>
    </div>
  );
};
```

#### Deliverables
- Log viewer migrated
- Dual-pane layout working
- Protocol views functional
- Export features complete

#### Success Criteria
- Log viewer displays messages
- Dual-pane layout is responsive
- Protocol details are shown
- Export functions work

---

## Phase 5: Test Suites (Week 9-10)

### 5.1 Test Case Library
**Duration**: 4 days
**Priority**: High

#### Tasks
- [ ] Migrate existing test cases
- [ ] Create 3GPP-compliant test cases
- [ ] Implement test execution engine
- [ ] Setup test result storage

#### Test Case Structure
```yaml
# Example test case YAML
id: "attach-basic-001"
title: "Basic Attach Procedure"
suite_type: "functional"
threegpp_ref: "TS 23.401 5.3.2.1"
description: "Verify basic UE attach procedure"

steps:
  - order: 1
    direction: "UE→eNB"
    layer: "RRC"
    message_type: "RRCConnectionRequest"
    ies:
      establishmentCause: "mo-Signalling"
      ue-Identity:
        s-TMSI: "0x12345678"
    expected_verdict: "PASS"
    
  - order: 2
    direction: "eNB→UE"
    layer: "RRC"
    message_type: "RRCConnectionSetup"
    ies:
      rrc-TransactionIdentifier: 0
      criticalExtensions:
        rrcConnectionSetup-r8:
          radioResourceConfigDedicated:
            srb-ToAddModList:
              - srb-Identity: 1
    expected_verdict: "PASS"
```

#### Test Execution Engine
```typescript
// Test execution engine
export class TestExecutor {
  private parsers: Map<string, ProtocolParser> = new Map();
  private faultInjector: FaultInjector;

  constructor() {
    this.initializeParsers();
    this.faultInjector = new FaultInjector();
  }

  async executeTestCase(testCase: TestCase, options: ExecutionOptions): Promise<ExecutionResult> {
    const execution = await this.createExecution(testCase, options);
    
    try {
      for (const step of testCase.steps) {
        const result = await this.executeStep(step, options);
        await this.recordStepResult(execution.id, result);
        
        if (result.verdict === 'FAIL') {
          break;
        }
      }
      
      return await this.finalizeExecution(execution.id);
    } catch (error) {
      return await this.handleExecutionError(execution.id, error);
    }
  }

  private async executeStep(step: TestStep, options: ExecutionOptions): Promise<StepResult> {
    // Apply fault injection if enabled
    if (options.simulateFault) {
      step = this.faultInjector.injectFault(step);
    }
    
    // Execute the step
    const result = await this.runStep(step);
    
    // Validate result
    const verdict = this.validateStepResult(step, result);
    
    return {
      stepOrder: step.order,
      rawLog: result.rawLog,
      verdict,
      faultType: options.simulateFault ? result.faultType : null
    };
  }
}
```

#### Deliverables
- Test case library migrated
- 3GPP-compliant test cases
- Execution engine functional
- Result storage working

#### Success Criteria
- Test cases are loaded
- Execution engine runs tests
- Results are stored correctly
- 3GPP compliance is maintained

### 5.2 Test Management Interface
**Duration**: 3 days
**Priority**: Medium

#### Tasks
- [ ] Create test suite browser
- [ ] Implement test execution UI
- [ ] Setup result analysis
- [ ] Create reporting features

#### Test Suite Browser
```typescript
// Test suite browser component
export const TestSuiteBrowser: React.FC = () => {
  const [selectedSuite, setSelectedSuite] = useState<string | null>(null);
  const { data: suites } = useQuery(['test-suites'], fetchTestSuites);
  const { data: testCases } = useQuery(
    ['test-cases', selectedSuite],
    () => fetchTestCases(selectedSuite!),
    { enabled: !!selectedSuite }
  );

  return (
    <div className="flex h-full">
      {/* Suite list */}
      <div className="w-1/3 border-r">
        <div className="p-4">
          <h2 className="text-lg font-semibold mb-4">Test Suites</h2>
          <div className="space-y-2">
            {suites?.map((suite) => (
              <div
                key={suite.id}
                className={`p-3 rounded cursor-pointer ${
                  selectedSuite === suite.id ? 'bg-primary text-primary-content' : 'bg-base-200'
                }`}
                onClick={() => setSelectedSuite(suite.id)}
              >
                <h3 className="font-medium">{suite.name}</h3>
                <p className="text-sm opacity-70">{suite.description}</p>
                <div className="flex justify-between mt-2">
                  <span className="badge badge-sm">{suite.suite_type}</span>
                  <span className="text-xs">{suite.test_count} tests</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      {/* Test cases */}
      <div className="w-2/3">
        <div className="p-4">
          <h2 className="text-lg font-semibold mb-4">Test Cases</h2>
          <div className="grid gap-4">
            {testCases?.map((testCase) => (
              <TestCaseCard
                key={testCase.id}
                testCase={testCase}
                onExecute={(id) => executeTestCase(id)}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
```

#### Deliverables
- Test suite browser functional
- Test execution UI working
- Result analysis complete
- Reporting features ready

#### Success Criteria
- Users can browse test suites
- Test execution is intuitive
- Results are analyzed correctly
- Reports are generated

---

## Phase 6: Advanced Features (Week 11-12)

### 6.1 Fault Injection System
**Duration**: 4 days
**Priority**: High

#### Tasks
- [ ] Implement fault injection UI
- [ ] Create fault simulation engine
- [ ] Setup fault result analysis
- [ ] Create fault reporting

#### Fault Injection Framework
```typescript
// Fault injection types
export enum FaultType {
  DROPPED_MESSAGE = 'dropped_message',
  BAD_IE = 'bad_ie',
  TIMER_EXPIRY = 'timer_expiry',
  KPI_DEGRADATION = 'kpi_degradation',
  SECURITY_VIOLATION = 'security_violation'
}

// Fault injector implementation
export class FaultInjector {
  private globalFaultRate: number;
  private faultConfigs: Map<FaultType, FaultConfig> = new Map();

  constructor(globalFaultRate: number = 0.10) {
    this.globalFaultRate = globalFaultRate;
    this.initializeFaultConfigs();
  }

  injectFault(step: TestStep): TestStep {
    if (Math.random() > this.globalFaultRate) {
      return step; // No fault injected
    }

    const faultType = this.selectFaultType();
    const faultConfig = this.faultConfigs.get(faultType);
    
    if (!faultConfig) {
      return step;
    }

    return this.applyFault(step, faultType, faultConfig);
  }

  private applyFault(step: TestStep, faultType: FaultType, config: FaultConfig): TestStep {
    switch (faultType) {
      case FaultType.DROPPED_MESSAGE:
        return this.injectDroppedMessage(step);
      case FaultType.BAD_IE:
        return this.injectBadIE(step, config);
      case FaultType.TIMER_EXPIRY:
        return this.injectTimerExpiry(step);
      case FaultType.KPI_DEGRADATION:
        return this.injectKPIDegradation(step, config);
      default:
        return step;
    }
  }

  private injectDroppedMessage(step: TestStep): TestStep {
    // Simulate message drop by modifying expected result
    return {
      ...step,
      expected_verdict: 'FAIL',
      fault_injected: true,
      fault_type: FaultType.DROPPED_MESSAGE
    };
  }

  private injectBadIE(step: TestStep, config: FaultConfig): TestStep {
    // Inject invalid IE value
    const modifiedStep = { ...step };
    if (modifiedStep.ies && config.targetIE) {
      modifiedStep.ies[config.targetIE] = config.invalidValue;
    }
    modifiedStep.fault_injected = true;
    modifiedStep.fault_type = FaultType.BAD_IE;
    return modifiedStep;
  }
}
```

#### Fault Injection UI
```typescript
// Fault injection configuration component
export const FaultInjectionConfig: React.FC = () => {
  const [faultRate, setFaultRate] = useState(0.10);
  const [enabledFaults, setEnabledFaults] = useState<FaultType[]>([]);
  const [faultConfigs, setFaultConfigs] = useState<Map<FaultType, FaultConfig>>(new Map());

  const handleFaultToggle = (faultType: FaultType) => {
    setEnabledFaults(prev => 
      prev.includes(faultType) 
        ? prev.filter(f => f !== faultType)
        : [...prev, faultType]
    );
  };

  return (
    <div className="card bg-base-100 shadow-xl">
      <div className="card-body">
        <h2 className="card-title">Fault Injection Configuration</h2>
        
        <div className="form-control">
          <label className="label">
            <span className="label-text">Global Fault Rate</span>
          </label>
          <input
            type="range"
            min="0"
            max="1"
            step="0.01"
            value={faultRate}
            onChange={(e) => setFaultRate(parseFloat(e.target.value))}
            className="range range-primary"
          />
          <div className="flex justify-between text-xs px-2">
            <span>0%</span>
            <span>{Math.round(faultRate * 100)}%</span>
            <span>100%</span>
          </div>
        </div>

        <div className="form-control">
          <label className="label">
            <span className="label-text">Fault Types</span>
          </label>
          <div className="space-y-2">
            {Object.values(FaultType).map((faultType) => (
              <label key={faultType} className="label cursor-pointer">
                <span className="label-text">{faultType.replace('_', ' ')}</span>
                <input
                  type="checkbox"
                  checked={enabledFaults.includes(faultType)}
                  onChange={() => handleFaultToggle(faultType)}
                  className="checkbox checkbox-primary"
                />
              </label>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
```

#### Deliverables
- Fault injection UI complete
- Simulation engine functional
- Result analysis working
- Reporting features ready

#### Success Criteria
- Users can configure fault injection
- Simulation engine runs correctly
- Results show fault details
- Reports include fault analysis

### 6.2 Real-time Collaboration
**Duration**: 3 days
**Priority**: Medium

#### Tasks
- [ ] Implement real-time updates
- [ ] Create collaboration features
- [ ] Setup user presence
- [ ] Implement shared sessions

#### Real-time Collaboration
```typescript
// Real-time collaboration hook
export const useCollaboration = (executionId: string) => {
  const [users, setUsers] = useState<User[]>([]);
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  useEffect(() => {
    const channel = supabase
      .channel(`execution:${executionId}`)
      .on('presence', { event: 'sync' }, () => {
        const presenceState = channel.presenceState();
        const users = Object.values(presenceState).flat() as User[];
        setUsers(users);
      })
      .on('presence', { event: 'join' }, ({ key, newPresences }) => {
        setUsers(prev => [...prev, ...newPresences as User[]]);
      })
      .on('presence', { event: 'leave' }, ({ key, leftPresences }) => {
        setUsers(prev => prev.filter(user => 
          !leftPresences.some(left => left.id === user.id)
        ));
      })
      .subscribe(async (status) => {
        if (status === 'SUBSCRIBED') {
          await channel.track({
            id: currentUser?.id,
            name: currentUser?.name,
            avatar: currentUser?.avatar,
            online_at: new Date().toISOString()
          });
        }
      });

    return () => {
      supabase.removeChannel(channel);
    };
  }, [executionId, currentUser]);

  return { users, currentUser };
};
```

#### Deliverables
- Real-time updates working
- Collaboration features functional
- User presence implemented
- Shared sessions working

#### Success Criteria
- Multiple users can collaborate
- Real-time updates are synchronized
- User presence is shown
- Shared sessions work correctly

---

## Phase 7: Admin & Monitoring (Week 13-14)

### 7.1 Admin Dashboard
**Duration**: 4 days
**Priority**: Medium

#### Tasks
- [ ] Create admin dashboard
- [ ] Implement user management
- [ ] Setup system monitoring
- [ ] Create analytics dashboard

#### Admin Dashboard
```typescript
// Admin dashboard component
export const AdminDashboard: React.FC = () => {
  const { data: users } = useQuery(['admin', 'users'], fetchAllUsers);
  const { data: metrics } = useQuery(['admin', 'metrics'], fetchSystemMetrics);
  const { data: executions } = useQuery(['admin', 'executions'], fetchAllExecutions);

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-3xl font-bold">Admin Dashboard</h1>
      
      {/* System metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <MetricCard
          title="Total Users"
          value={users?.length || 0}
          icon="users"
          trend="+12%"
        />
        <MetricCard
          title="Active Executions"
          value={executions?.filter(e => e.status === 'RUNNING').length || 0}
          icon="play"
          trend="+5%"
        />
        <MetricCard
          title="Success Rate"
          value={`${metrics?.successRate || 0}%`}
          icon="check-circle"
          trend="+2%"
        />
        <MetricCard
          title="Revenue"
          value={`$${metrics?.revenue || 0}`}
          icon="dollar-sign"
          trend="+8%"
        />
      </div>

      {/* User management */}
      <div className="card bg-base-100 shadow-xl">
        <div className="card-body">
          <h2 className="card-title">User Management</h2>
          <UserManagementTable users={users} />
        </div>
      </div>

      {/* System monitoring */}
      <div className="card bg-base-100 shadow-xl">
        <div className="card-body">
          <h2 className="card-title">System Monitoring</h2>
          <SystemMonitoringChart data={metrics} />
        </div>
      </div>
    </div>
  );
};
```

#### Deliverables
- Admin dashboard complete
- User management functional
- System monitoring working
- Analytics dashboard ready

#### Success Criteria
- Admins can manage users
- System metrics are displayed
- Monitoring alerts work
- Analytics are accurate

### 7.2 Monitoring & Alerting
**Duration**: 3 days
**Priority**: Medium

#### Tasks
- [ ] Setup system monitoring
- [ ] Implement alerting system
- [ ] Create health checks
- [ ] Setup performance monitoring

#### Health Check System
```typescript
// Health check service
export class HealthCheckService {
  private checks: Map<string, HealthCheck> = new Map();

  constructor() {
    this.initializeChecks();
  }

  private initializeChecks() {
    this.checks.set('database', new DatabaseHealthCheck());
    this.checks.set('log-engine', new LogEngineHealthCheck());
    this.checks.set('stripe', new StripeHealthCheck());
    this.checks.set('supabase', new SupabaseHealthCheck());
  }

  async runAllChecks(): Promise<HealthStatus> {
    const results: Map<string, HealthCheckResult> = new Map();
    
    for (const [name, check] of this.checks) {
      try {
        const result = await check.run();
        results.set(name, result);
      } catch (error) {
        results.set(name, {
          status: 'error',
          message: error.message,
          timestamp: new Date()
        });
      }
    }

    return {
      overall: this.calculateOverallStatus(results),
      checks: Object.fromEntries(results),
      timestamp: new Date()
    };
  }

  private calculateOverallStatus(results: Map<string, HealthCheckResult>): 'healthy' | 'degraded' | 'unhealthy' {
    const statuses = Array.from(results.values()).map(r => r.status);
    
    if (statuses.every(s => s === 'healthy')) {
      return 'healthy';
    } else if (statuses.some(s => s === 'error')) {
      return 'unhealthy';
    } else {
      return 'degraded';
    }
  }
}
```

#### Deliverables
- Health check system working
- Alerting system functional
- Performance monitoring ready
- System status dashboard

#### Success Criteria
- Health checks run automatically
- Alerts are sent correctly
- Performance metrics are tracked
- System status is visible

---

## Phase 8: Testing & Optimization (Week 15-16)

### 8.1 Comprehensive Testing
**Duration**: 5 days
**Priority**: Critical

#### Tasks
- [ ] Unit test coverage
- [ ] Integration testing
- [ ] End-to-end testing
- [ ] Performance testing
- [ ] Security testing

#### Testing Strategy
```typescript
// Test coverage requirements
export const TEST_COVERAGE = {
  unit: {
    target: 80,
    critical: ['auth', 'billing', 'test-execution']
  },
  integration: {
    target: 70,
    critical: ['api-endpoints', 'database-operations']
  },
  e2e: {
    target: 60,
    critical: ['user-flows', 'billing-flows']
  }
};

// Test utilities
export class TestUtils {
  static createMockUser(overrides?: Partial<User>): User {
    return {
      id: 'test-user-id',
      email: 'test@example.com',
      role: 'trial',
      created_at: new Date().toISOString(),
      ...overrides
    };
  }

  static createMockTestCase(overrides?: Partial<TestCase>): TestCase {
    return {
      id: 'test-case-id',
      title: 'Test Case',
      suite_type: 'functional',
      threegpp_ref: 'TS 23.401',
      steps: [],
      ...overrides
    };
  }

  static createMockExecution(overrides?: Partial<Execution>): Execution {
    return {
      id: 'execution-id',
      case_id: 'test-case-id',
      run_by: 'test-user-id',
      status: 'QUEUED',
      started_at: new Date().toISOString(),
      fault_injected: false,
      ...overrides
    };
  }
}
```

#### Deliverables
- Comprehensive test suite
- Test coverage reports
- Performance benchmarks
- Security audit results

#### Success Criteria
- Test coverage meets targets
- All critical paths are tested
- Performance benchmarks are met
- Security vulnerabilities are addressed

### 8.2 Performance Optimization
**Duration**: 3 days
**Priority**: High

#### Tasks
- [ ] Frontend optimization
- [ ] Backend optimization
- [ ] Database optimization
- [ ] Caching implementation

#### Performance Optimization
```typescript
// Frontend optimization
export const useOptimizedQuery = <T>(
  queryKey: string[],
  queryFn: () => Promise<T>,
  options?: UseQueryOptions<T>
) => {
  return useQuery(queryKey, queryFn, {
    staleTime: 5 * 60 * 1000, // 5 minutes
    cacheTime: 10 * 60 * 1000, // 10 minutes
    refetchOnWindowFocus: false,
    ...options
  });
};

// Backend optimization
export class QueryOptimizer {
  static optimizeExecutionQuery(filters: ExecutionFilters): string {
    const conditions: string[] = [];
    
    if (filters.userId) {
      conditions.push(`run_by = '${filters.userId}'`);
    }
    
    if (filters.status) {
      conditions.push(`status = '${filters.status}'`);
    }
    
    if (filters.dateRange) {
      conditions.push(`started_at >= '${filters.dateRange.start}'`);
      conditions.push(`started_at <= '${filters.dateRange.end}'`);
    }
    
    return conditions.join(' AND ');
  }
}
```

#### Deliverables
- Performance optimizations implemented
- Caching system working
- Database queries optimized
- Frontend bundle optimized

#### Success Criteria
- Page load times are under 2 seconds
- API response times are under 500ms
- Database queries are optimized
- Bundle size is minimized

---

## Phase 9: Launch & Support (Week 17-18)

### 9.1 Production Deployment
**Duration**: 3 days
**Priority**: Critical

#### Tasks
- [ ] Production environment setup
- [ ] Database migration
- [ ] SSL certificate setup
- [ ] Domain configuration
- [ ] Monitoring setup

#### Deployment Checklist
```typescript
// Production deployment checklist
export const DEPLOYMENT_CHECKLIST = {
  infrastructure: [
    'Supabase project configured',
    'Netlify site deployed',
    'Log engine container running',
    'Domain DNS configured',
    'SSL certificates installed'
  ],
  application: [
    'Environment variables set',
    'Database migrations run',
    'Test data seeded',
    'Health checks passing',
    'Monitoring configured'
  ],
  security: [
    'RLS policies enabled',
    'API keys secured',
    'CORS configured',
    'Rate limiting enabled',
    'Security headers set'
  ],
  performance: [
    'CDN configured',
    'Caching enabled',
    'Database indexes created',
    'Query optimization complete',
    'Bundle optimization done'
  ]
};
```

#### Deliverables
- Production environment ready
- Application deployed
- Monitoring configured
- Documentation updated

#### Success Criteria
- Application is accessible
- All features are working
- Performance is acceptable
- Security is validated

### 9.2 Launch Preparation
**Duration**: 4 days
**Priority**: High

#### Tasks
- [ ] User documentation
- [ ] Support system setup
- [ ] Marketing materials
- [ ] Launch announcement
- [ ] Training materials

#### Launch Materials
```typescript
// Launch preparation checklist
export const LAUNCH_CHECKLIST = {
  documentation: [
    'User guide completed',
    'API documentation ready',
    'FAQ prepared',
    'Troubleshooting guide ready',
    'Video tutorials created'
  ],
  support: [
    'Support ticket system configured',
    'Knowledge base populated',
    'Support team trained',
    'Escalation procedures defined',
    'Response time SLAs set'
  ],
  marketing: [
    'Website updated',
    'Pricing page ready',
    'Feature comparison table',
    'Case studies prepared',
    'Press release written'
  ],
  operations: [
    'Backup procedures tested',
    'Disaster recovery plan ready',
    'Incident response procedures',
    'Performance monitoring alerts',
    'Capacity planning complete'
  ]
};
```

#### Deliverables
- Complete documentation
- Support system ready
- Marketing materials prepared
- Launch announcement ready

#### Success Criteria
- Documentation is comprehensive
- Support system is functional
- Marketing materials are ready
- Launch is successful

---

## Risk Management

### High-Risk Areas

1. **Data Migration**
   - Risk: Data loss during migration
   - Mitigation: Comprehensive backup and rollback procedures
   - Contingency: Parallel running of old and new systems

2. **Performance**
   - Risk: Cloud performance degradation
   - Mitigation: Load testing and optimization
   - Contingency: Performance monitoring and scaling

3. **Security**
   - Risk: Security vulnerabilities in cloud deployment
   - Mitigation: Security audits and penetration testing
   - Contingency: Incident response procedures

4. **User Adoption**
   - Risk: Users resist cloud migration
   - Mitigation: Gradual migration and training
   - Contingency: Hybrid deployment option

### Mitigation Strategies

1. **Phased Rollout**
   - Start with limited user group
   - Gradually expand to all users
   - Monitor feedback and performance

2. **Fallback Options**
   - Maintain desktop version during transition
   - Provide migration assistance
   - Offer training and support

3. **Continuous Monitoring**
   - Real-time performance monitoring
   - User feedback collection
   - Automated alerting system

---

## Success Metrics

### Technical Metrics
- **Uptime**: 99.9% availability
- **Performance**: <2s page load time
- **Security**: Zero critical vulnerabilities
- **Scalability**: Support 1000+ concurrent users

### Business Metrics
- **User Adoption**: 80% migration rate
- **Customer Satisfaction**: 4.5/5 rating
- **Revenue Growth**: 25% increase in subscriptions
- **Support Tickets**: <5% of user base per month

### Quality Metrics
- **Test Coverage**: 80% unit, 70% integration, 60% E2E
- **Bug Rate**: <1% of deployments
- **Performance**: 95th percentile <3s response time
- **Security**: Monthly security audits

---

## Conclusion

This migration plan provides a comprehensive roadmap for transforming the 5GLabX desktop application into a modern, cloud-based subscription platform. The phased approach minimizes risk while delivering incremental value, ensuring a successful transition to the cloud.

Key success factors:
- **Thorough planning** - Detailed phases with clear deliverables
- **Risk mitigation** - Comprehensive risk management strategies
- **Quality assurance** - Extensive testing and validation
- **User focus** - Continuous feedback and improvement
- **Technical excellence** - Modern architecture and best practices

The migration will result in a scalable, maintainable platform that serves the growing demand for cloud-based 5G protocol analysis tools while maintaining the existing functionality and adding new capabilities.

---

*Last updated: 2025-01-13*
*Version: 1.0*
*Status: Ready for Implementation*