// =============================================================================
// RISK SCORING WORKER - Module 2
// =============================================================================
//
// YOUR TASK: Implement this worker
//
// This worker should:
// 1. Listen to the 'risk-scoring' queue
// 2. Process each job using the RiskScoringService
// 3. Push the result to the 'notification' queue
// 4. Handle errors with retry logic (3 attempts, exponential backoff)
//
// See SPEC_EXERCICE.md for full requirements
// =============================================================================

// TODO: Import dependencies (Worker, Queue from 'bullmq', connection from utils, types, service)

// TODO: Create notification queue

// TODO: Create worker that:
//   - Processes jobs from 'risk-scoring' queue
//   - Calls RiskScoringService.calculateRiskScore()
//   - Pushes result to 'notification' queue
//   - Logs processing info

// TODO: Add event handlers (completed, failed)

// TODO: Log worker startup message
