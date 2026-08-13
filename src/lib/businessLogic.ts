import type { ClientSeries, PaymentStatus } from '../types';

// Client Code Formatting
export function formatClientCode(series: ClientSeries, clientNumber: string): string {
  return `${series}-${clientNumber}`;
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

// Validation Functions
export function validateClientCode(clientCode: string): boolean {
  const regex = /^[A-E]-\d{3}$/;
  return regex.test(clientCode);
}

export function validateMatterNumber(matterNumber: string): boolean {
  const regex = /^[A-E]-\d{3}-\d{3}$/;
  return regex.test(matterNumber);
}

export function validatePositiveAmount(amount: number): boolean {
  return amount > 0;
}

export function validateNonNegativeAmount(amount: number): boolean {
  return amount >= 0;
}

export function validatePhoneNumber(phone?: string): boolean {
  if (!phone) return true; // Optional field
  const regex = /^[\d\s\-+()]+$/;
  return regex.test(phone);
}

export function validateEmail(email?: string): boolean {
  if (!email) return true; // Optional field
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
}

export function validateCnic(cnic?: string): boolean {
  if (!cnic) return true; // Optional field
  const regex = /^\d{5}-\d{7}-\d{1}$/;
  return regex.test(cnic);
}

export function validateTrademarkClass(trademarkClass: number): boolean {
  return trademarkClass >= 1 && trademarkClass <= 45;
}

export function validateDate(date: string): boolean {
  const parsedDate = new Date(date);
  return !isNaN(parsedDate.getTime());
}
