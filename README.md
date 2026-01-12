# Fraud Detection Exercise

90-minute technical exercise – Implementing a fraud scoring worker.

## Quick Start

```bash
# 1. Start Redis
docker-compose up -d

# 2. Install dependencies
npm install

# 3. Run the worker (after implementation)
npm run dev

# 4. Trigger test orders
npm run trigger-order

# 5. Run tests
npm test

Instructions

See SPEC_EXERCICE.md for full instructions.

⸻

Submitting your work

Option A: Fork + Pull Request (recommended)
	1.	Fork this repo to your GitHub account
	2.	Clone your fork:

git clone https://github.com/<your-username>/fraud-detection-exercise.git


	3.	Create a branch for your work:

git checkout -b feat/risk-scoring-worker


	4.	Code and commit regularly (small atomic commits)
	5.	Push your branch:

git push origin feat/risk-scoring-worker


	6.	Create a Pull Request on your fork
	7.	Send the PR link by email

Option B: Collaborator access

If we added you as a collaborator on this repo:
	1.	Clone directly:

git clone https://github.com/mathysbarrie/fraud-detection-exercise.git


	2.	Create your branch:

git checkout -b feat/risk-scoring-worker-<your-name>


	3.	Code, commit, push
	4.	Create a Pull Request to main

⸻

Expected deliverables
	•	PLAN.md completed (before coding)
	•	src/services/risk-scoring.service.ts implemented
	•	src/workers/risk-scoring.worker.ts implemented
	•	tests/risk-scoring.test.ts with at least 5 tests
	•	Atomic commits with clear messages
	•	PR with a proper description (What/Why/How)

