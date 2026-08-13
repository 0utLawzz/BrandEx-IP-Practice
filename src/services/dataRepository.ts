import type { Client, Matter, LedgerEntry, Payment, Trademark, Agent } from '../types';
import { mockClients, mockMatters, mockLedgerEntries, mockPayments, mockTrademarks, mockAgents } from '../data/mockData';

// In-memory storage (will be replaced with Supabase later)
let clients = [...mockClients];
let matters = [...mockMatters];
let ledgerEntries = [...mockLedgerEntries];
let payments = [...mockPayments];
let trademarks = [...mockTrademarks];
let agents = [...mockAgents];

// Client Repository
export const clientRepository = {
  getAll: (): Client[] => clients,
  getById: (id: string): Client | undefined => clients.find(c => c.id === id),
  getByClientCode: (clientCode: string): Client | undefined => clients.find(c => c.clientCode === clientCode),
  create: (client: Omit<Client, 'id' | 'createdAt' | 'updatedAt'>): Client => {
    const newClient: Client = {
      ...client,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    clients.push(newClient);
    return newClient;
  },
  update: (id: string, updates: Partial<Client>): Client | undefined => {
    const index = clients.findIndex(c => c.id === id);
    if (index === -1) return undefined;
    clients[index] = { ...clients[index], ...updates, updatedAt: new Date().toISOString() };
    return clients[index];
  },
  delete: (id: string): boolean => {
    const index = clients.findIndex(c => c.id === id);
    if (index === -1) return false;
    clients.splice(index, 1);
    return true;
  },
  existsByClientCode: (clientCode: string, excludeId?: string): boolean => {
    return clients.some(c => c.clientCode === clientCode && c.id !== excludeId);
  },
  getNextClientNumber: (series: string): string => {
    const seriesClients = clients.filter(c => c.series === series);
    const maxNumber = seriesClients.reduce((max, c) => {
      const num = parseInt(c.clientNumber, 10);
      return num > max ? num : max;
    }, 0);
    return String(maxNumber + 1).padStart(3, '0');
  },
};

// Matter Repository
export const matterRepository = {
  getAll: (): Matter[] => matters,
  getById: (id: string): Matter | undefined => matters.find(m => m.id === id),
  getByClientId: (clientId: string): Matter[] => matters.filter(m => m.clientId === clientId),
  getByFullMatterNumber: (fullMatterNumber: string): Matter | undefined => 
    matters.find(m => m.fullMatterNumber === fullMatterNumber),
  create: (matter: Omit<Matter, 'id' | 'createdAt' | 'updatedAt'>): Matter => {
    const newMatter: Matter = {
      ...matter,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    matters.push(newMatter);
    return newMatter;
  },
  update: (id: string, updates: Partial<Matter>): Matter | undefined => {
    const index = matters.findIndex(m => m.id === id);
    if (index === -1) return undefined;
    matters[index] = { ...matters[index], ...updates, updatedAt: new Date().toISOString() };
    return matters[index];
  },
  delete: (id: string): boolean => {
    const index = matters.findIndex(m => m.id === id);
    if (index === -1) return false;
    matters.splice(index, 1);
    return true;
  },
  existsByFullMatterNumber: (fullMatterNumber: string, excludeId?: string): boolean => {
    return matters.some(m => m.fullMatterNumber === fullMatterNumber && m.id !== excludeId);
  },
  getNextMatterNumber: (clientCode: string): string => {
    const clientMatters = matters.filter(m => m.clientCode === clientCode);
    const maxNumber = clientMatters.reduce((max, m) => {
      const num = parseInt(m.matterNumber, 10);
      return num > max ? num : max;
    }, 0);
    return String(maxNumber + 1).padStart(3, '0');
  },
};

// Ledger Entry Repository
export const ledgerRepository = {
  getAll: (): LedgerEntry[] => ledgerEntries,
  getById: (id: string): LedgerEntry | undefined => ledgerEntries.find(l => l.id === id),
  getByMatterId: (matterId: string): LedgerEntry[] => ledgerEntries.filter(l => l.matterId === matterId),
  create: (entry: Omit<LedgerEntry, 'id' | 'createdAt' | 'updatedAt' | 'balance' | 'paymentStatus'>): LedgerEntry => {
    const balance = entry.due - entry.received - (entry.discount || 0);
    const paymentStatus = balance < 0 ? 'Overpaid' : balance === 0 ? 'Paid' : entry.received > 0 ? 'Partial' : 'Unpaid';
    
    const newEntry: LedgerEntry = {
      ...entry,
      id: Date.now().toString(),
      balance,
      paymentStatus,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    ledgerEntries.push(newEntry);
    return newEntry;
  },
  update: (id: string, updates: Partial<LedgerEntry>): LedgerEntry | undefined => {
    const index = ledgerEntries.findIndex(l => l.id === id);
    if (index === -1) return undefined;
    
    const updatedEntry = { ...ledgerEntries[index], ...updates };
    const balance = updatedEntry.due - updatedEntry.received - (updatedEntry.discount || 0);
    const paymentStatus = balance < 0 ? 'Overpaid' : balance === 0 ? 'Paid' : updatedEntry.received > 0 ? 'Partial' : 'Unpaid';
    
    ledgerEntries[index] = { 
      ...updatedEntry, 
      balance, 
      paymentStatus,
      updatedAt: new Date().toISOString() 
    };
    return ledgerEntries[index];
  },
  delete: (id: string): boolean => {
    const index = ledgerEntries.findIndex(l => l.id === id);
    if (index === -1) return false;
    ledgerEntries.splice(index, 1);
    return true;
  },
  recalculateBalances: (matterId: string): void => {
    const matterLedger = ledgerEntries.filter(l => l.matterId === matterId);
    matterLedger.forEach(entry => {
      const balance = entry.due - entry.received - (entry.discount || 0);
      const paymentStatus = balance < 0 ? 'Overpaid' : balance === 0 ? 'Paid' : entry.received > 0 ? 'Partial' : 'Unpaid';
      entry.balance = balance;
      entry.paymentStatus = paymentStatus;
      entry.updatedAt = new Date().toISOString();
    });
  },
};

// Payment Repository
export const paymentRepository = {
  getAll: (): Payment[] => payments,
  getById: (id: string): Payment | undefined => payments.find(p => p.id === id),
  getByMatterId: (matterId: string): Payment[] => payments.filter(p => p.matterId === matterId),
  getByLedgerEntryId: (ledgerEntryId: string): Payment[] => payments.filter(p => p.ledgerEntryId === ledgerEntryId),
  create: (payment: Omit<Payment, 'id' | 'createdAt' | 'updatedAt'>): Payment => {
    const newPayment: Payment = {
      ...payment,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    payments.push(newPayment);
    
    // Update associated ledger entry
    const ledgerEntry = ledgerRepository.getById(payment.ledgerEntryId);
    if (ledgerEntry) {
      const totalReceived = paymentRepository.getByLedgerEntryId(payment.ledgerEntryId)
        .reduce((sum, p) => sum + p.amount, 0);
      ledgerRepository.update(payment.ledgerEntryId, { received: totalReceived });
    }
    
    return newPayment;
  },
  update: (id: string, updates: Partial<Payment>): Payment | undefined => {
    const index = payments.findIndex(p => p.id === id);
    if (index === -1) return undefined;
    payments[index] = { ...payments[index], ...updates, updatedAt: new Date().toISOString() };
    return payments[index];
  },
  delete: (id: string): boolean => {
    const index = payments.findIndex(p => p.id === id);
    if (index === -1) return false;
    const payment = payments[index];
    payments.splice(index, 1);
    
    // Recalculate ledger entry received amount
    const ledgerEntry = ledgerRepository.getById(payment.ledgerEntryId);
    if (ledgerEntry) {
      const totalReceived = paymentRepository.getByLedgerEntryId(payment.ledgerEntryId)
        .reduce((sum, p) => sum + p.amount, 0);
      ledgerRepository.update(payment.ledgerEntryId, { received: totalReceived });
    }
    
    return true;
  },
};

// Trademark Repository
export const trademarkRepository = {
  getAll: (): Trademark[] => trademarks,
  getById: (id: string): Trademark | undefined => trademarks.find(t => t.id === id),
  getByMatterId: (matterId: string): Trademark | undefined => trademarks.find(t => t.matterId === matterId),
  create: (trademark: Omit<Trademark, 'id' | 'createdAt' | 'updatedAt'>): Trademark => {
    const newTrademark: Trademark = {
      ...trademark,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    trademarks.push(newTrademark);
    return newTrademark;
  },
  update: (id: string, updates: Partial<Trademark>): Trademark | undefined => {
    const index = trademarks.findIndex(t => t.id === id);
    if (index === -1) return undefined;
    trademarks[index] = { ...trademarks[index], ...updates, updatedAt: new Date().toISOString() };
    return trademarks[index];
  },
  delete: (id: string): boolean => {
    const index = trademarks.findIndex(t => t.id === id);
    if (index === -1) return false;
    trademarks.splice(index, 1);
    return true;
  },
};

// Agent Repository
export const agentRepository = {
  getAll: (): Agent[] => agents,
  getById: (id: string): Agent | undefined => agents.find(a => a.id === id),
  create: (agent: Omit<Agent, 'id'>): Agent => {
    const newAgent: Agent = {
      ...agent,
      id: Date.now().toString(),
    };
    agents.push(newAgent);
    return newAgent;
  },
  update: (id: string, updates: Partial<Agent>): Agent | undefined => {
    const index = agents.findIndex(a => a.id === id);
    if (index === -1) return undefined;
    agents[index] = { ...agents[index], ...updates };
    return agents[index];
  },
  delete: (id: string): boolean => {
    const index = agents.findIndex(a => a.id === id);
    if (index === -1) return false;
    agents.splice(index, 1);
    return true;
  },
};
