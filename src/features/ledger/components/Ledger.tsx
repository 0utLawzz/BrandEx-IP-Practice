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
        <h1 className="text-3xl font-bold text-slate-900 dark:text-slate-50">Payment Ledger</h1>
        <button 
          onClick={() => setShowAddForm(true)}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
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
        <div className="bg-white dark:bg-slate-800 rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-50 mb-2">Total Due</h3>
          <p className="text-2xl font-bold text-slate-900 dark:text-slate-50">PKR {totalDue.toLocaleString()}</p>
        </div>
        <div className="bg-white dark:bg-slate-800 rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-50 mb-2">Total Received</h3>
          <p className="text-2xl font-bold text-green-600 dark:text-green-400">PKR {totalReceived.toLocaleString()}</p>
        </div>
        <div className="bg-white dark:bg-slate-800 rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-50 mb-2">Total Balance</h3>
          <p className={`text-2xl font-bold ${totalBalance > 0 ? 'text-red-600 dark:text-red-400' : 'text-green-600 dark:text-green-400'}`}>
            PKR {totalBalance.toLocaleString()}
          </p>
        </div>
      </div>

      <div className="bg-white dark:bg-slate-800 rounded-lg shadow overflow-hidden">
        <table className="min-w-full divide-y divide-slate-200 dark:divide-slate-700">
          <thead className="bg-slate-50 dark:bg-slate-900">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                Date
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                Case No
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                TM No
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                Applicant
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                Class
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                Due
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                Received
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                Balance
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                Status
              </th>
            </tr>
          </thead>
          <tbody className="bg-white dark:bg-slate-800 divide-y divide-slate-200 dark:divide-slate-700">
            {ledgerWithClients.map((entry) => (
              <tr key={entry.id} className="hover:bg-slate-50 dark:hover:bg-slate-700">
                <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-900 dark:text-slate-50">
                  {entry.date}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-700 dark:text-slate-300">
                  {entry.matterNumber}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-700 dark:text-slate-300">
                  {entry.trademarkNumber || '-'}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-700 dark:text-slate-300">
                  {entry.applicantName}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-700 dark:text-slate-300">
                  {entry.class || '-'}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-700 dark:text-slate-300">
                  PKR {entry.due.toLocaleString()}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-700 dark:text-slate-300">
                  PKR {entry.received.toLocaleString()}
                </td>
                <td className={`px-6 py-4 whitespace-nowrap text-sm font-medium ${entry.balance > 0 ? 'text-red-600 dark:text-red-400' : 'text-green-600 dark:text-green-400'}`}>
                  PKR {entry.balance.toLocaleString()}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">
                  <span className={`px-2 py-1 rounded-full text-xs ${
                    entry.paymentStatus === 'Paid' ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' :
                    entry.paymentStatus === 'Partial' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200' :
                    entry.paymentStatus === 'Overpaid' ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200' :
                    'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
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
