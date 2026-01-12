// =============================================================================
// RISK SCORING SERVICE
// =============================================================================
//
// YOUR TASK: Implement the fraud detection algorithm
//
// This service should:
// 1. Calculate a risk score (0-100) based on 5 rules
// 2. Return the risk level (low/medium/high)
// 3. Return the list of triggered flags
//
// RULES:
// - Abnormal amount (+30): totalAmount > avgAmount * 3 AND totalOrders > 0
// - New customer high amount (+25): totalOrders === 0 AND totalAmount > 10000
// - High risk country (+20): shippingCountry in ['NG', 'GH', 'PK', 'BD']
// - Crypto payment (+15): paymentMethod === 'crypto'
// - Rapid ordering (+10): lastOrderDate < 1 hour AND totalOrders > 0
//
// RISK LEVELS:
// - 0-30: 'low'
// - 31-60: 'medium'
// - 61-100: 'high'
//
// See SPEC_EXERCICE.md for full requirements
// =============================================================================

import { RiskScoringInput, RiskScoringOutput } from '../types';

// TODO: Implement individual rule functions
// Example:
// function checkAbnormalAmount(input: RiskScoringInput): { points: number; flag: string | null }

// TODO: Implement calculateRiskLevel function
// function calculateRiskLevel(score: number): 'low' | 'medium' | 'high'

// TODO: Implement main function
// export function calculateRiskScore(input: RiskScoringInput): RiskScoringOutput
