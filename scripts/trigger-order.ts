import { Queue } from 'bullmq';
import { connection } from '../src/utils/redis';

/**
 * Test script to push sample orders to the risk-scoring queue
 *
 * Usage: npm run trigger-order
 *
 * This will push 2 test orders:
 * - ORD-001: Normal customer (expected: low risk)
 * - ORD-002: Suspicious customer (expected: high risk)
 */

const riskScoringQueue = new Queue('risk-scoring', { connection });

async function triggerOrder() {
  console.log('Pushing test orders to risk-scoring queue...\n');

  // Case 1: Normal customer - should score LOW
  await riskScoringQueue.add('score-order', {
    orderId: 'ORD-001',
    customerId: 'CUST-123',
    customerEmail: 'john@example.com',
    totalAmount: 5000, // 50 EUR
    shippingCountry: 'FR',
    paymentMethod: 'card',
    orderHistory: {
      totalOrders: 5,
      avgAmount: 4500,
      lastOrderDate: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(), // 7 days ago
    },
  });
  console.log('  [1/2] ORD-001 (normal customer) pushed');

  // Case 2: Potential fraud - should score HIGH
  // Triggers: new_customer_high_amount (+25), high_risk_country (+20), crypto_payment (+15) = 60 points
  await riskScoringQueue.add('score-order', {
    orderId: 'ORD-002',
    customerId: 'CUST-999',
    customerEmail: 'suspect@example.com',
    totalAmount: 50000, // 500 EUR
    shippingCountry: 'NG', // Nigeria
    paymentMethod: 'crypto',
    orderHistory: {
      totalOrders: 0,
      avgAmount: 0,
      lastOrderDate: '',
    },
  });
  console.log('  [2/2] ORD-002 (suspicious customer) pushed');

  console.log('\n2 test orders pushed to queue');
  console.log('\nExpected results:');
  console.log('  - ORD-001: score ~0, level "low", flags []');
  console.log('  - ORD-002: score 60, level "medium", flags ["new_customer_high_amount", "high_risk_country", "crypto_payment"]');

  // Close connection
  await riskScoringQueue.close();
  await connection.quit();
  process.exit(0);
}

triggerOrder().catch((err) => {
  console.error('Error:', err);
  process.exit(1);
});
