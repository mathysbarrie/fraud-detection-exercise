import { Worker, Queue } from 'bullmq';
import { connection } from '../utils/redis';
import { RiskScoringInput } from '../types';

/**
 * Order Ingestion Worker (Module 1)
 *
 * This worker is already implemented and provided as reference.
 * It receives orders from the e-commerce webhook and pushes them
 * to the risk-scoring queue for fraud detection.
 *
 * YOUR TASK: Implement the risk-scoring worker (Module 2)
 * that will consume jobs from the 'risk-scoring' queue.
 */

// Queue to push jobs for risk scoring
const riskScoringQueue = new Queue('risk-scoring', { connection });

// Worker that processes incoming orders
const worker = new Worker(
  'order-ingestion',
  async (job) => {
    console.log(`[OrderIngestion] Processing order: ${job.data.orderId}`);

    // Validate order structure
    const order = job.data as RiskScoringInput;
    if (!order.orderId || !order.customerId) {
      throw new Error('Invalid order: missing required fields');
    }

    // Push to risk-scoring queue
    await riskScoringQueue.add('score-order', order, {
      attempts: 3,
      backoff: {
        type: 'exponential',
        delay: 1000,
      },
    });

    console.log(`[OrderIngestion] Order ${order.orderId} pushed to risk-scoring queue`);
    return { success: true, orderId: order.orderId };
  },
  { connection }
);

worker.on('completed', (job) => {
  console.log(`[OrderIngestion] Job ${job.id} completed`);
});

worker.on('failed', (job, err) => {
  console.error(`[OrderIngestion] Job ${job?.id} failed:`, err.message);
});

console.log('[OrderIngestion] Worker started, waiting for jobs...');
