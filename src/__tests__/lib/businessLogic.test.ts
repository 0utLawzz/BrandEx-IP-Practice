import { describe, it, expect } from 'vitest'
import {
  formatClientCode,
  generateMatterNumber,
  calculateBalance,
  calculatePaymentStatus,
  validateClientMatterRelationship,
  isValidTrademarkStatusTransition,
  validateClientCode,
  validateMatterNumber,
  validatePositiveAmount,
  validateNonNegativeAmount,
  validatePhoneNumber,
  validateEmail,
  validateCnic,
  validateTrademarkClass,
  validateDate,
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

  describe('validateClientCode', () => {
    it('validates correct client codes', () => {
      expect(validateClientCode('A-001')).toBe(true)
      expect(validateClientCode('B-071')).toBe(true)
      expect(validateClientCode('E-999')).toBe(true)
    })

    it('rejects invalid client codes', () => {
      expect(validateClientCode('F-001')).toBe(false)
      expect(validateClientCode('A-1')).toBe(false)
      expect(validateClientCode('A-0001')).toBe(false)
      expect(validateClientCode('A001')).toBe(false)
    })
  })

  describe('validateMatterNumber', () => {
    it('validates correct matter numbers', () => {
      expect(validateMatterNumber('A-001-001')).toBe(true)
      expect(validateMatterNumber('B-071-004')).toBe(true)
      expect(validateMatterNumber('E-999-999')).toBe(true)
    })

    it('rejects invalid matter numbers', () => {
      expect(validateMatterNumber('F-001-001')).toBe(false)
      expect(validateMatterNumber('A-1-001')).toBe(false)
      expect(validateMatterNumber('A-001-1')).toBe(false)
      expect(validateMatterNumber('A001001')).toBe(false)
    })
  })

  describe('validatePositiveAmount', () => {
    it('validates positive amounts', () => {
      expect(validatePositiveAmount(1)).toBe(true)
      expect(validatePositiveAmount(100)).toBe(true)
      expect(validatePositiveAmount(0.01)).toBe(true)
    })

    it('rejects non-positive amounts', () => {
      expect(validatePositiveAmount(0)).toBe(false)
      expect(validatePositiveAmount(-1)).toBe(false)
      expect(validatePositiveAmount(-100)).toBe(false)
    })
  })

  describe('validateNonNegativeAmount', () => {
    it('validates non-negative amounts', () => {
      expect(validateNonNegativeAmount(0)).toBe(true)
      expect(validateNonNegativeAmount(1)).toBe(true)
      expect(validateNonNegativeAmount(100)).toBe(true)
    })

    it('rejects negative amounts', () => {
      expect(validateNonNegativeAmount(-1)).toBe(false)
      expect(validateNonNegativeAmount(-100)).toBe(false)
    })
  })

  describe('validatePhoneNumber', () => {
    it('validates correct phone numbers', () => {
      expect(validatePhoneNumber('+92-300-1234567')).toBe(true)
      expect(validatePhoneNumber('03001234567')).toBe(true)
      expect(validatePhoneNumber('(300) 123-4567')).toBe(true)
    })

    it('allows empty phone numbers (optional field)', () => {
      expect(validatePhoneNumber('')).toBe(true)
      expect(validatePhoneNumber(undefined)).toBe(true)
    })

    it('rejects invalid phone numbers', () => {
      expect(validatePhoneNumber('abc')).toBe(false)
      expect(validatePhoneNumber('123-abc')).toBe(false)
    })
  })

  describe('validateEmail', () => {
    it('validates correct email addresses', () => {
      expect(validateEmail('test@example.com')).toBe(true)
      expect(validateEmail('user.name@domain.co.uk')).toBe(true)
    })

    it('allows empty email (optional field)', () => {
      expect(validateEmail('')).toBe(true)
      expect(validateEmail(undefined)).toBe(true)
    })

    it('rejects invalid email addresses', () => {
      expect(validateEmail('invalid')).toBe(false)
      expect(validateEmail('invalid@')).toBe(false)
      expect(validateEmail('@example.com')).toBe(false)
    })
  })

  describe('validateCnic', () => {
    it('validates correct CNIC format', () => {
      expect(validateCnic('54400-1234567-1')).toBe(true)
      expect(validateCnic('12345-1234567-9')).toBe(true)
    })

    it('allows empty CNIC (optional field)', () => {
      expect(validateCnic('')).toBe(true)
      expect(validateCnic(undefined)).toBe(true)
    })

    it('rejects invalid CNIC format', () => {
      expect(validateCnic('5440012345671')).toBe(false)
      expect(validateCnic('54400-1234567')).toBe(false)
      expect(validateCnic('54400-1234567-12')).toBe(false)
    })
  })

  describe('validateTrademarkClass', () => {
    it('validates correct trademark classes', () => {
      expect(validateTrademarkClass(1)).toBe(true)
      expect(validateTrademarkClass(3)).toBe(true)
      expect(validateTrademarkClass(45)).toBe(true)
    })

    it('rejects invalid trademark classes', () => {
      expect(validateTrademarkClass(0)).toBe(false)
      expect(validateTrademarkClass(46)).toBe(false)
      expect(validateTrademarkClass(100)).toBe(false)
    })
  })

  describe('validateDate', () => {
    it('validates correct date formats', () => {
      expect(validateDate('2024-01-20')).toBe(true)
      expect(validateDate('2024-12-31')).toBe(true)
    })

    it('rejects invalid date formats', () => {
      expect(validateDate('invalid')).toBe(false)
      expect(validateDate('2024-13-01')).toBe(false)
      expect(validateDate('2024-01-32')).toBe(false)
    })
  })
})
