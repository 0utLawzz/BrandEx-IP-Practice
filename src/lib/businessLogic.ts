import type { ClientType, PaymentStatus } from '../types';

// Client Code Formatting
export function formatClientCode(clientType: ClientType, clientNumber: string): string {
  return `${clientType}-${clientNumber}`;
}

// Matter Number Generation
export function generateMatterNumber(clientCode: string, sequenceNumber: number): string {
  return `${clientCode}-${String(sequenceNumber).padStart(3, '0')}`;
}

// Ledger Balance Calculation
export function calculateBalance(due: number, received: number, discount?: number): number {
  const adjustedDue = discount ? due - discount : due;
  return adjustedDue - received;
}

// Payment Status Calculation
export function calculatePaymentStatus(due: number, received: number, discount?: number): PaymentStatus {
  const adjustedDue = discount ? due - discount : due;
  const balance = adjustedDue - received;

  if (balance < 0) return 'Overpaid';
  if (balance === 0) return 'Paid';
  if (received > 0) return 'Partial';
  return 'Unpaid';
}

// Client → Matter Relationship Validation
export function validateClientMatterRelationship(clientId: string, matterClientId: string): boolean {
  return clientId === matterClientId;
}

// Trademark Status Workflow Validation
export const trademarkWorkflow: Record<string, string[]> = {
  'Filed': ['Acknowledged'],
  'Acknowledged': ['Examination'],
  'Examination': ['Assigned', 'Hearing'],
  'Assigned': ['Approved', 'Hearing'],
  'Approved': ['Published'],
  'Hearing': ['Approved', 'Opposition'],
  'Published': ['Demand Note'],
  'Demand Note': ['Opposition', 'Certificate'],
  'Opposition': ['Certificate'],
  'Certificate': ['Certificate Delivered'],
  'Certificate Delivered': [],
};

export function isValidTrademarkStatusTransition(currentStatus: string, newStatus: string): boolean {
  const allowedTransitions = trademarkWorkflow[currentStatus] || [];
  return allowedTransitions.includes(newStatus);
}
