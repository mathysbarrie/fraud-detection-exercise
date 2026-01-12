import { Redis } from 'ioredis';

/**
 * Redis connection configuration
 * Used by BullMQ workers and queues
 */
export const connection = new Redis({
  host: process.env.REDIS_HOST || 'localhost',
  port: parseInt(process.env.REDIS_PORT || '6379'),
  maxRetriesPerRequest: null,
});

// Handle connection events
connection.on('connect', () => {
  console.log('[Redis] Connected to Redis server');
});

connection.on('error', (err) => {
  console.error('[Redis] Connection error:', err.message);
});
