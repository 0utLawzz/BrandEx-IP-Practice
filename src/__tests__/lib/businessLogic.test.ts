import { describe, it, expect } from 'vitest'
import {
  formatClientCode,
  generateMatterNumber,
  calculateBalance,
  calculatePaymentStatus,
  validateClientMatterRelationship,
  isValidTrademarkStatusTransition,
} from '../../lib/businessLogic'

describe('Business Logic', () => {
  describe('formatClientCode', () => {
    it('formats client code correctly', () => {
      expect(formatClientCode('A', '045')).toBe('A-045')
      expect(formatClientCode('B', '071')).toBe('B-071')
      expect(formatClientCode('C', '012')).toBe('C-012')
    })
  })

  describe('generateMatterNumber', () => {
    it('generates matter numbers with zero padding', () => {
      expect(generateMatterNumber('B-071', 1)).toBe('B-071-001')
      expect(generateMatterNumber('B-071', 2)).toBe('B-071-002')
      expect(generateMatterNumber('B-071', 10)).toBe('B-071-010')
      expect(generateMatterNumber('A-045', 100)).toBe('A-045-100')
    })
  })

  describe('calculateBalance', () => {
    it('calculates balance correctly', () => {
      expect(calculateBalance(10000, 5000)).toBe(5000)
      expect(calculateBalance(10000, 10000)).toBe(0)
      expect(calculateBalance(10000, 15000)).toBe(-5000)
    })

    it('applies discount when provided', () => {
      expect(calculateBalance(10000, 5000, 1000)).toBe(4000)
      expect(calculateBalance(10000, 10000, 2000)).toBe(-2000)
    })
  })

  describe('calculatePaymentStatus', () => {
    it('returns correct payment status', () => {
      expect(calculatePaymentStatus(10000, 0)).toBe('Unpaid')
      expect(calculatePaymentStatus(10000, 5000)).toBe('Partial')
      expect(calculatePaymentStatus(10000, 10000)).toBe('Paid')
      expect(calculatePaymentStatus(10000, 15000)).toBe('Overpaid')
    })

    it('handles discount in status calculation', () => {
      expect(calculatePaymentStatus(10000, 9000, 1000)).toBe('Paid')
      expect(calculatePaymentStatus(10000, 5000, 1000)).toBe('Partial')
    })
  })

  describe('validateClientMatterRelationship', () => {
    it('validates matching client IDs', () => {
      expect(validateClientMatterRelationship('1', '1')).toBe(true)
      expect(validateClientMatterRelationship('2', '2')).toBe(true)
    })

    it('rejects mismatched client IDs', () => {
      expect(validateClientMatterRelationship('1', '2')).toBe(false)
      expect(validateClientMatterRelationship('1', '3')).toBe(false)
    })
  })

  describe('isValidTrademarkStatusTransition', () => {
    it('allows valid status transitions', () => {
      expect(isValidTrademarkStatusTransition('Filed', 'Acknowledged')).toBe(true)
      expect(isValidTrademarkStatusTransition('Acknowledged', 'Examination')).toBe(true)
      expect(isValidTrademarkStatusTransition('Examination', 'Assigned')).toBe(true)
      expect(isValidTrademarkStatusTransition('Certificate', 'Certificate Delivered')).toBe(true)
    })

    it('rejects invalid status transitions', () => {
      expect(isValidTrademarkStatusTransition('Filed', 'Examination')).toBe(false)
      expect(isValidTrademarkStatusTransition('Certificate Delivered', 'Filed')).toBe(false)
      expect(isValidTrademarkStatusTransition('Paid', 'Examination')).toBe(false)
    })

    it('handles hearing multiple possible transitions', () => {
      expect(isValidTrademarkStatusTransition('Hearing', 'Approved')).toBe(true)
      expect(isValidTrademarkStatusTransition('Hearing', 'Opposition')).toBe(true)
    })
  })
})
