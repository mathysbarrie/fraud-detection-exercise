/**
 * Input data received from the risk-scoring queue
 * This is the job payload pushed by the order-ingestion worker
 */
export interface RiskScoringInput {
  orderId: string;
  customerId: string;
  customerEmail: string;
  totalAmount: number; // In cents (e.g., 5000 = 50 EUR)
  shippingCountry: string; // ISO code (FR, US, etc.)
  paymentMethod: 'card' | 'paypal' | 'crypto';
  orderHistory: {
    totalOrders: number; // Number of previous orders
    avgAmount: number; // Average order amount in cents
    lastOrderDate: string; // ISO date string
  };
}

/**
 * Output data to be pushed to the notification queue
 * This is the result of the risk scoring calculation
 */
export interface RiskScoringOutput {
  orderId: string;
  riskScore: number; // 0-100 (0 = safe, 100 = fraud)
  riskLevel: 'low' | 'medium' | 'high';
  flags: string[]; // List of detected risk flags
  scoredAt: string; // ISO timestamp
}
