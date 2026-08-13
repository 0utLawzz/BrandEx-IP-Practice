import { useState } from 'react';
import { ledgerRepository, clientRepository } from '../../../services/dataRepository';
import { AddLedgerEntryForm } from './AddLedgerEntryForm';

export function Ledger() {
  const [showAddForm, setShowAddForm] = useState(false);
  const [ledgerEntries, setLedgerEntries] = useState(ledgerRepository.getAll());
  const clients = clientRepository.getAll();

  const ledgerWithClients = ledgerEntries.map(entry => ({
    ...entry,
    client: clients.find(c => c.clientCode === entry.matterNumber.split('-')[0] + '-' + entry.matterNumber.split('-')[1]),
  }));

  const totalDue = ledgerWithClients.reduce((sum, entry) => sum + entry.due, 0);
  const totalReceived = ledgerWithClients.reduce((sum, entry) => sum + entry.received, 0);
  const totalBalance = ledgerWithClients.reduce((sum, entry) => sum + entry.balance, 0);

  const handleEntryAdded = () => {
    setLedgerEntries(ledgerRepository.getAll());
    setShowAddForm(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-4xl font-bebas font-normal text-[#0C0C0C] tracking-wider">PAYMENT LEDGER</h1>
        <button
          onClick={() => setShowAddForm(true)}
          className="btn-primary px-4 py-2"
        >
          Add Ledger Entry
        </button>
      </div>

      {showAddForm && (
        <AddLedgerEntryForm 
          onSuccess={handleEntryAdded}
          onCancel={() => setShowAddForm(false)}
        />
      )}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="card-neo p-6">
          <h3 className="text-sm font-mono uppercase tracking-wider text-[#0C0C0C] mb-2 opacity-60">Total Due</h3>
          <p className="text-4xl font-bebas font-normal text-[#0C0C0C]">PKR {totalDue.toLocaleString()}</p>
        </div>
        <div className="card-neo p-6">
          <h3 className="text-sm font-mono uppercase tracking-wider text-[#0C0C0C] mb-2 opacity-60">Total Received</h3>
          <p className="text-4xl font-bebas font-normal text-[#0A6B52]">PKR {totalReceived.toLocaleString()}</p>
        </div>
        <div className="card-neo p-6">
          <h3 className="text-sm font-mono uppercase tracking-wider text-[#0C0C0C] mb-2 opacity-60">Total Balance</h3>
          <p className={`text-4xl font-bebas font-normal ${totalBalance > 0 ? 'text-[#C94A00]' : 'text-[#0A6B52]'}`}>
            PKR {totalBalance.toLocaleString()}
          </p>
        </div>
      </div>

      <div className="card-neo overflow-hidden">
        <table className="table-neo min-w-full">
          <thead>
            <tr>
              <th className="px-6 py-3 text-left text-xs font-mono uppercase tracking-wider">
                Date
              </th>
              <th className="px-6 py-3 text-left text-xs font-mono uppercase tracking-wider">
                Case No
              </th>
              <th className="px-6 py-3 text-left text-xs font-mono uppercase tracking-wider">
                TM No
              </th>
              <th className="px-6 py-3 text-left text-xs font-mono uppercase tracking-wider">
                Applicant
              </th>
              <th className="px-6 py-3 text-left text-xs font-mono uppercase tracking-wider">
                Class
              </th>
              <th className="px-6 py-3 text-left text-xs font-mono uppercase tracking-wider">
                Due
              </th>
              <th className="px-6 py-3 text-left text-xs font-mono uppercase tracking-wider">
                Received
              </th>
              <th className="px-6 py-3 text-left text-xs font-mono uppercase tracking-wider">
                Balance
              </th>
              <th className="px-6 py-3 text-left text-xs font-mono uppercase tracking-wider">
                Status
              </th>
            </tr>
          </thead>
          <tbody>
            {ledgerWithClients.map((entry) => (
              <tr key={entry.id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-[#0C0C0C]">
                  {entry.date}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-mono text-[#0C0C0C]">
                  {entry.matterNumber}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-[#0C0C0C]">
                  {entry.trademarkNumber || '-'}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-[#0C0C0C]">
                  {entry.applicantName}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-[#0C0C0C]">
                  {entry.class || '-'}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-[#0C0C0C]">
                  PKR {entry.due.toLocaleString()}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-[#0C0C0C]">
                  PKR {entry.received.toLocaleString()}
                </td>
                <td className={`px-6 py-4 whitespace-nowrap text-sm font-mono font-medium ${entry.balance > 0 ? 'text-[#C94A00]' : 'text-[#0A6B52]'}`}>
                  PKR {entry.balance.toLocaleString()}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">
                  <span className={`px-2 py-1 text-xs font-mono uppercase ${
                    entry.paymentStatus === 'Paid' ? 'badge-complete' :
                    entry.paymentStatus === 'Partial' ? 'badge-review' :
                    entry.paymentStatus === 'Overpaid' ? 'badge-approved' :
                    'badge-draft'
                  }`}>
                    {entry.paymentStatus}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
