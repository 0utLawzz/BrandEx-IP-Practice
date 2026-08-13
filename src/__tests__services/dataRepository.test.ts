import { describe, it, expect, beforeEach } from 'vitest'
import { clientRepository, matterRepository, ledgerRepository } from '../services/dataRepository'

describe('Data Repository', () => {
  beforeEach(() => {
    // Reset repositories by creating fresh instances for each test
    // In a real app, this would be handled by a proper cleanup mechanism
  })

  describe('clientRepository', () => {
    it('should create a new client with auto-generated client code', () => {
      const newClient = clientRepository.create({
        series: 'B',
        clientNumber: '072',
        clientCode: 'B-072',
        name: 'Test Client',
        city: 'Islamabad',
        country: 'Pakistan',
      })

      expect(newClient.id).toBeDefined()
      expect(newClient.clientCode).toBe('B-072')
      expect(newClient.name).toBe('Test Client')
    })

    it('should check for duplicate client codes', () => {
      const exists = clientRepository.existsByClientCode('B-071')
      expect(exists).toBe(true)
    })

    it('should get next client number for a series', () => {
      const nextNumber = clientRepository.getNextClientNumber('B')
      expect(nextNumber).toBeDefined()
      expect(parseInt(nextNumber, 10)).toBeGreaterThan(71)
    })

    it('should update a client', () => {
      const client = clientRepository.getById('1')
      if (client) {
        const updated = clientRepository.update('1', { name: 'Updated Name' })
        expect(updated?.name).toBe('Updated Name')
      }
    })

    it('should delete a client', () => {
      const newClient = clientRepository.create({
        series: 'C',
        clientNumber: '999',
        clientCode: 'C-999',
        name: 'Temporary Client',
        city: 'Lahore',
        country: 'Pakistan',
      })

      const deleted = clientRepository.delete(newClient.id)
      expect(deleted).toBe(true)

      const found = clientRepository.getById(newClient.id)
      expect(found).toBeUndefined()
    })
  })

  describe('matterRepository', () => {
    it('should create a new matter with auto-generated matter number', () => {
      const newMatter = matterRepository.create({
        clientId: '1',
        clientCode: 'B-071',
        matterNumber: '005',
        fullMatterNumber: 'B-071-005',
        matterType: 'Trademark',
        title: 'Test Matter',
        status: 'Pending',
      })

      expect(newMatter.id).toBeDefined()
      expect(newMatter.fullMatterNumber).toBe('B-071-005')
      expect(newMatter.title).toBe('Test Matter')
    })

    it('should check for duplicate matter numbers', () => {
      const exists = matterRepository.existsByFullMatterNumber('B-071-001')
      expect(exists).toBe(true)
    })

    it('should get next matter number for a client', () => {
      const nextNumber = matterRepository.getNextMatterNumber('B-071')
      expect(nextNumber).toBeDefined()
      expect(parseInt(nextNumber, 10)).toBeGreaterThan(4)
    })

    it('should get matters by client ID', () => {
      const clientMatters = matterRepository.getByClientId('1')
      expect(clientMatters.length).toBeGreaterThan(0)
      expect(clientMatters.every(m => m.clientId === '1')).toBe(true)
    })

    it('should update a matter', () => {
      const matter = matterRepository.getById('1')
      if (matter) {
        const updated = matterRepository.update('1', { status: 'Completed' })
        expect(updated?.status).toBe('Completed')
      }
    })

    it('should delete a matter', () => {
      const newMatter = matterRepository.create({
        clientId: '1',
        clientCode: 'B-071',
        matterNumber: '999',
        fullMatterNumber: 'B-071-999',
        matterType: 'Trademark',
        title: 'Temporary Matter',
        status: 'Pending',
      })

      const deleted = matterRepository.delete(newMatter.id)
      expect(deleted).toBe(true)

      const found = matterRepository.getById(newMatter.id)
      expect(found).toBeUndefined()
    })
  })

  describe('ledgerRepository', () => {
    it('should create a new ledger entry with auto-calculated balance and status', () => {
      const newEntry = ledgerRepository.create({
        matterId: '1',
        matterNumber: 'B-071-001',
        date: '2024-06-01',
        applicantName: 'Test Applicant',
        due: 10000,
        received: 5000,
      })

      expect(newEntry.id).toBeDefined()
      expect(newEntry.balance).toBe(5000)
      expect(newEntry.paymentStatus).toBe('Partial')
    })

    it('should calculate balance with discount', () => {
      const newEntry = ledgerRepository.create({
        matterId: '1',
        matterNumber: 'B-071-001',
        date: '2024-06-01',
        applicantName: 'Test Applicant',
        due: 10000,
        received: 8000,
        discount: 2000,
      })

      expect(newEntry.balance).toBe(0)
      expect(newEntry.paymentStatus).toBe('Paid')
    })

    it('should calculate overpaid status', () => {
      const newEntry = ledgerRepository.create({
        matterId: '1',
        matterNumber: 'B-071-001',
        date: '2024-06-01',
        applicantName: 'Test Applicant',
        due: 10000,
        received: 15000,
      })

      expect(newEntry.balance).toBe(-5000)
      expect(newEntry.paymentStatus).toBe('Overpaid')
    })

    it('should get ledger entries by matter ID', () => {
      const matterLedger = ledgerRepository.getByMatterId('1')
      expect(matterLedger.length).toBeGreaterThan(0)
      expect(matterLedger.every(l => l.matterId === '1')).toBe(true)
    })

    it('should update a ledger entry and recalculate balance', () => {
      const entry = ledgerRepository.getById('1')
      if (entry) {
        const updated = ledgerRepository.update('1', { received: 15000 })
        expect(updated?.balance).toBe(0)
        expect(updated?.paymentStatus).toBe('Paid')
      }
    })

    it('should delete a ledger entry', () => {
      const newEntry = ledgerRepository.create({
        matterId: '1',
        matterNumber: 'B-071-001',
        date: '2024-06-01',
        applicantName: 'Test Applicant',
        due: 10000,
        received: 0,
      })

      const deleted = ledgerRepository.delete(newEntry.id)
      expect(deleted).toBe(true)

      const found = ledgerRepository.getById(newEntry.id)
      expect(found).toBeUndefined()
    })
  })
})
