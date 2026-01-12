# Technical Exercise: Fraud Detection Pipeline (90min)

## Context

You're joining a team that develops an e-commerce order validation system. Your mission: implement **Module 2 - Risk Scoring Worker** of a BullMQ fraud detection pipeline.

**Stack:** Node.js + TypeScript + BullMQ + Redis + Jest

---

## Overall Architecture

```
E-commerce Webhook (simulated)
    |
    v
[Module 1: Order Ingestion Worker]  <-- Already implemented
    |
    | Push job to "risk-scoring" queue
    v
[Module 2: Risk Scoring Worker]     <-- YOUR MODULE TO IMPLEMENT
    |
    | Calculate risk_score (0-100)
    | Push job to "notification" queue
    v
[Module 3: Notification Worker]     <-- Spec provided, no implementation required
```

---

## What's Provided (Starter Kit)

```
fraud-detection-exercise/
├── package.json              # Dependencies already configured
├── tsconfig.json             # TypeScript config
├── docker-compose.yml        # Local Redis
├── src/
│   ├── workers/
│   │   ├── order-ingestion.worker.ts   # Already implemented
│   │   └── risk-scoring.worker.ts      # YOUR FILE (empty)
│   ├── services/
│   │   └── risk-scoring.service.ts     # YOUR FILE (empty)
│   ├── types/
│   │   └── index.ts                    # Types provided
│   └── utils/
│       └── redis.ts                    # Pre-configured Redis client
├── tests/
│   └── risk-scoring.test.ts            # YOUR FILE (empty)
├── scripts/
│   └── trigger-order.ts                # Test script (provided)
└── PLAN.md                             # Work plan (empty - to fill)
```

---

## Your Mission: Module 2 - Risk Scoring Worker

### Input (Job received from `risk-scoring` queue)

```typescript
interface RiskScoringInput {
  orderId: string;
  customerId: string;
  customerEmail: string;
  totalAmount: number;        // In cents (e.g., 5000 = 50 EUR)
  shippingCountry: string;    // ISO code (FR, US, etc.)
  paymentMethod: 'card' | 'paypal' | 'crypto';
  orderHistory: {
    totalOrders: number;      // Number of customer's previous orders
    avgAmount: number;        // Historical average amount
    lastOrderDate: string;    // ISO date
  };
}
```

### Output (Job pushed to `notification` queue)

```typescript
interface RiskScoringOutput {
  orderId: string;
  riskScore: number;          // 0-100 (0 = safe, 100 = fraud)
  riskLevel: 'low' | 'medium' | 'high';
  flags: string[];            // List of detected red flags
  scoredAt: string;           // ISO timestamp
}
```

---

## Risk Score Calculation Algorithm

**Base score: 0 points**

Add points according to these rules:

| # | Rule | Points | Condition | Flag |
|---|------|--------|-----------|------|
| 1 | Abnormal amount | +30 | `totalAmount > avgAmount * 3` AND `totalOrders > 0` | `abnormal_amount` |
| 2 | High-risk new customer | +25 | `totalOrders === 0` AND `totalAmount > 10000` (>100 EUR) | `new_customer_high_amount` |
| 3 | High-risk country | +20 | `shippingCountry` in `['NG', 'GH', 'PK', 'BD']` | `high_risk_country` |
| 4 | Crypto payment | +15 | `paymentMethod === 'crypto'` | `crypto_payment` |
| 5 | Rapid ordering | +10 | `lastOrderDate < 1 hour ago` AND `totalOrders > 0` | `rapid_ordering` |

### Risk Level (based on final score)

- **0-30**: `low`
- **31-60**: `medium`
- **61-100**: `high`

---

## Tasks to Complete

### Phase 1: Planning (10min)

- [ ] Read the entire spec
- [ ] Fill `PLAN.md` with development steps
- [ ] Break down into clear sub-tasks (atomic commits)

### Phase 2: Implementation (50min)

- [ ] Create `risk-scoring.service.ts` with the algorithm
  - Method `calculateRiskScore(input): RiskScoringOutput`
  - Each rule = separate function
  - JSDoc documentation on each function
- [ ] Create `risk-scoring.worker.ts` (BullMQ processor)
  - Listen to `risk-scoring` queue
  - Call the service, push to `notification` queue
  - Error handling (retry 3x with exponential backoff)
- [ ] Unit tests (`risk-scoring.test.ts`)
  - At least 5 test cases covering the rules
  - Test: new customer normal amount -> score 0
  - Test: multiple flags combined -> correct score

### Phase 3: Documentation & Tests (20min)

- [ ] Document `risk-scoring.service.ts` (JSDoc)
- [ ] Test manually with `npm run trigger-order`
- [ ] Verify tests pass with `npm test`

### Phase 4: Demo (10min)

```bash
# Start Redis
docker compose up -d

# Run the worker
npm run dev

# Trigger test orders
npm run trigger-order

# Show logs (calculated score, detected flags)
```

---

## Evaluation Criteria

### Code Quality (30%)
- Strict TypeScript enabled, no `any`
- Pure functions, separation of concerns
- Complete error handling
- Clear and structured logs

### Methodology (40%)
- `PLAN.md` filled BEFORE coding
- Atomic commits with clear messages
- Tests pass (`npm test`)

### Documentation (20%)
- JSDoc on all public functions
- Code commented at complex sections
- Types exported and documented

### Functional (10%)
- Worker starts without errors
- Correct score calculation (tests pass)
- Job pushed to notification queue
- Manual demo works

---

## Expected Deliverables

1. **Files created/modified:**
   - `PLAN.md` (detailed work plan)
   - `src/workers/risk-scoring.worker.ts`
   - `src/services/risk-scoring.service.ts`
   - `tests/risk-scoring.test.ts`

2. **Live demo (5min):**
   - Start the worker
   - Trigger an order
   - Show the logs

---

## Constraints

- No internet except:
  - Official documentation (TypeScript, BullMQ, Jest)
  - GitHub (push/PR)
- No ChatGPT / Copilot
- Normal IDE usage allowed (autocomplete, refactor)

---

## Expected Results Example

For `ORD-001` (normal customer):
```json
{
  "orderId": "ORD-001",
  "riskScore": 0,
  "riskLevel": "low",
  "flags": [],
  "scoredAt": "2024-01-15T10:30:00.000Z"
}
```

For `ORD-002` (potential fraud - new customer, Nigeria, crypto):
```json
{
  "orderId": "ORD-002",
  "riskScore": 60,
  "riskLevel": "medium",
  "flags": ["new_customer_high_amount", "high_risk_country", "crypto_payment"],
  "scoredAt": "2024-01-15T10:30:01.000Z"
}
```

---

Good luck!
