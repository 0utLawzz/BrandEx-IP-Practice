// Domain Types for BrandEx IP Practice MVP

export type ClientType = 'A' | 'B' | 'C' | 'D' | 'E';

export type MatterType = 'Trademark' | 'Copyright' | 'Company' | 'NTN' | 'Opposition';

export type PaymentStatus = 'Unpaid' | 'Partial' | 'Paid' | 'Overpaid' | 'Refund';

export type PaymentMethod = 'Bank Transfer' | 'JazzCash' | 'Easypaisa' | 'Online';

export type TrademarkStatus = 
  | 'Filed'
  | 'Acknowledged'
  | 'Examination'
  | 'Assigned'
  | 'Approved'
  | 'Hearing'
  | 'Published'
  | 'Demand Note'
  | 'Opposition'
  | 'Certificate'
  | 'Certificate Delivered';

export interface Client {
  id: string;
  clientType: ClientType;
  clientNumber: string;
  clientCode: string;
  name: string;
  phone?: string;
  whatsapp?: string;
  email?: string;
  city: string;
  country: string;
  contactPerson?: string;
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Matter {
  id: string;
  clientId: string;
  clientCode: string;
  matterNumber: string;
  fullMatterNumber: string;
  matterType: MatterType;
  title: string;
  description?: string;
  status: string;
  createdAt: string;
  updatedAt: string;
}

export interface Trademark {
  id: string;
  matterId: string;
  matterNumber: string;
  trademarkNumber?: string;
  trademarkName: string;
  class: number;
  classDescription?: string;
  applicantName: string;
  fatherName?: string;
  cnic?: string;
  tradingBusiness?: string;
  address: string;
  logoUrl?: string;
  attorney?: string;
  consultant?: string;
  status: TrademarkStatus;
  subStatus?: string;
  city: string;
  imageUrl?: string;
  createdAt: string;
  updatedAt: string;
}

export interface LedgerEntry {
  id: string;
  matterId: string;
  matterNumber: string;
  date: string;
  trademarkNumber?: string;
  applicantName: string;
  class?: number;
  due: number;
  received: number;
  balance: number;
  discount?: number;
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Payment {
  id: string;
  ledgerEntryId: string;
  matterId: string;
  matterNumber: string;
  date: string;
  amount: number;
  method: PaymentMethod;
  status: PaymentStatus;
  reference?: string;
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Agent {
  id: string;
  name: string;
  location: string;
  assigned: number;
  approved: number;
  hearingObjection: number;
}

export interface FormTemplate {
  id: string;
  code: string;
  name: string;
  description?: string;
  requiredFields: string[];
}
