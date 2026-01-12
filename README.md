# Fraud Detection Exercise

90-minute technical exercise - Implement a fraud scoring worker.

## Quick Start

```bash
# 1. Start Redis
docker compose up -d

# 2. Install dependencies
npm install

# 3. Run the worker (after implementation)
npm run dev

# 4. Trigger test orders
npm run trigger-order

# 5. Run tests
npm test
```

## Instructions

See **SPEC_EXERCISE.md** for complete instructions.

---

## Submit Your Work

### Option A: Fork + Pull Request (recommended)

1. **Fork** this repo to your GitHub account
2. Clone your fork:
   ```bash
   git clone https://github.com/<your-username>/fraud-detection-exercise.git
   ```
3. Create a branch for your work:
   ```bash
   git checkout -b feat/risk-scoring-worker
   ```
4. Code and commit regularly (atomic commits)
5. Push your branch:
   ```bash
   git push origin feat/risk-scoring-worker
   ```
6. Create a **Pull Request** on your fork
7. Send the PR link by email

### Option B: Collaborator Access

If you've been added as a collaborator on this repo:

1. Clone directly:
   ```bash
   git clone https://github.com/mathysbarrie/fraud-detection-exercise.git
   ```
2. Create your branch:
   ```bash
   git checkout -b feat/risk-scoring-worker-<your-firstname>
   ```
3. Code, commit, push
4. Create a **Pull Request** to `main`

---

## Expected Deliverables

- [ ] `PLAN.md` completed (before coding)
- [ ] `src/services/risk-scoring.service.ts` implemented
- [ ] `src/workers/risk-scoring.worker.ts` implemented
- [ ] `tests/risk-scoring.test.ts` with at least 5 tests
- [ ] Atomic commits with clear messages
- [ ] PR with description (What/Why/How)
