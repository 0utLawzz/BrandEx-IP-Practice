import { useParams, Link } from '@tanstack/react-router';
import { mockMatters, mockClients, mockLedgerEntries, mockPayments } from '../../../data/mockData';
import { calculateBalance, calculatePaymentStatus } from '../../../lib/businessLogic';

export function MatterDetail() {
  const { matterId } = useParams({ from: '/matters/$matterId' });
  const matter = mockMatters.find(m => m.id === matterId);
  const client = matter ? mockClients.find(c => c.id === matter.clientId) : null;
  const ledgerEntries = mockLedgerEntries.filter(l => l.matterId === matterId);
  const payments = mockPayments.filter(p => p.matterId === matterId);

  if (!matter) {
    return <div className="text-slate-600 dark:text-slate-400">Matter not found</div>;
  }

  const totalDue = ledgerEntries.reduce((sum, entry) => sum + entry.due, 0);
  const totalReceived = payments.reduce((sum, payment) => sum + payment.amount, 0);
  const totalBalance = calculateBalance(totalDue, totalReceived);
  const paymentStatus = calculatePaymentStatus(totalDue, totalReceived);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <Link to="/matters" className="text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 mb-2 inline-block">
            ← Back to Matters
          </Link>
          <h1 className="text-3xl font-bold text-slate-900 dark:text-slate-50">{matter.title}</h1>
          <p className="text-slate-600 dark:text-slate-400">{matter.fullMatterNumber} — {matter.matterType}</p>
        </div>
        <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
          Edit Matter
        </button>
      </div>

      {client && (
        <div className="bg-white dark:bg-slate-800 rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold text-slate-900 dark:text-slate-50 mb-4">Client Information</h2>
          <div className="flex items-center gap-4">
            <div>
              <p className="text-sm text-slate-600 dark:text-slate-400">Client Code</p>
              <p className="font-medium text-slate-900 dark:text-slate-50">{client.clientCode}</p>
            </div>
            <div>
              <p className="text-sm text-slate-600 dark:text-slate-400">Client Name</p>
              <p className="font-medium text-slate-900 dark:text-slate-50">{client.name}</p>
            </div>
            <div>
              <p className="text-sm text-slate-600 dark:text-slate-400">Contact</p>
              <p className="font-medium text-slate-900 dark:text-slate-50">{client.phone || client.email || '-'}</p>
            </div>
          </div>
        </div>
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
          <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-50 mb-2">Balance</h3>
          <p className={`text-2xl font-bold ${totalBalance > 0 ? 'text-red-600 dark:text-red-400' : 'text-green-600 dark:text-green-400'}`}>
            PKR {totalBalance.toLocaleString()}
          </p>
          <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">Status: {paymentStatus}</p>
        </div>
      </div>

      <div className="bg-white dark:bg-slate-800 rounded-lg shadow p-6">
        <h2 className="text-xl font-semibold text-slate-900 dark:text-slate-50 mb-4">Ledger Entries</h2>
        {ledgerEntries.length === 0 ? (
          <p className="text-slate-600 dark:text-slate-400">No ledger entries found</p>
        ) : (
          <table className="min-w-full divide-y divide-slate-200 dark:divide-slate-700">
            <thead className="bg-slate-50 dark:bg-slate-900">
              <tr>
                <th className="px-4 py-2 text-left text-xs font-medium text-slate-500 dark:text-slate-400 uppercase">Date</th>
                <th className="px-4 py-2 text-left text-xs font-medium text-slate-500 dark:text-slate-400 uppercase">TM No</th>
                <th className="px-4 py-2 text-left text-xs font-medium text-slate-500 dark:text-slate-400 uppercase">Due</th>
                <th className="px-4 py-2 text-left text-xs font-medium text-slate-500 dark:text-slate-400 uppercase">Received</th>
                <th className="px-4 py-2 text-left text-xs font-medium text-slate-500 dark:text-slate-400 uppercase">Balance</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 dark:divide-slate-700">
              {ledgerEntries.map((entry) => (
                <tr key={entry.id} className="hover:bg-slate-50 dark:hover:bg-slate-700">
                  <td className="px-4 py-2 text-sm text-slate-900 dark:text-slate-50">{entry.date}</td>
                  <td className="px-4 py-2 text-sm text-slate-700 dark:text-slate-300">{entry.trademarkNumber || '-'}</td>
                  <td className="px-4 py-2 text-sm text-slate-700 dark:text-slate-300">PKR {entry.due.toLocaleString()}</td>
                  <td className="px-4 py-2 text-sm text-slate-700 dark:text-slate-300">PKR {entry.received.toLocaleString()}</td>
                  <td className={`px-4 py-2 text-sm font-medium ${entry.balance > 0 ? 'text-red-600 dark:text-red-400' : 'text-green-600 dark:text-green-400'}`}>
                    PKR {entry.balance.toLocaleString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      <div className="bg-white dark:bg-slate-800 rounded-lg shadow p-6">
        <h2 className="text-xl font-semibold text-slate-900 dark:text-slate-50 mb-4">Payment Records</h2>
        {payments.length === 0 ? (
          <p className="text-slate-600 dark:text-slate-400">No payment records found</p>
        ) : (
          <table className="min-w-full divide-y divide-slate-200 dark:divide-slate-700">
            <thead className="bg-slate-50 dark:bg-slate-900">
              <tr>
                <th className="px-4 py-2 text-left text-xs font-medium text-slate-500 dark:text-slate-400 uppercase">Date</th>
                <th className="px-4 py-2 text-left text-xs font-medium text-slate-500 dark:text-slate-400 uppercase">Amount</th>
                <th className="px-4 py-2 text-left text-xs font-medium text-slate-500 dark:text-slate-400 uppercase">Method</th>
                <th className="px-4 py-2 text-left text-xs font-medium text-slate-500 dark:text-slate-400 uppercase">Status</th>
                <th className="px-4 py-2 text-left text-xs font-medium text-slate-500 dark:text-slate-400 uppercase">Reference</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 dark:divide-slate-700">
              {payments.map((payment) => (
                <tr key={payment.id} className="hover:bg-slate-50 dark:hover:bg-slate-700">
                  <td className="px-4 py-2 text-sm text-slate-900 dark:text-slate-50">{payment.date}</td>
                  <td className="px-4 py-2 text-sm text-slate-700 dark:text-slate-300">PKR {payment.amount.toLocaleString()}</td>
                  <td className="px-4 py-2 text-sm text-slate-700 dark:text-slate-300">{payment.method}</td>
                  <td className="px-4 py-2 text-sm">
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      payment.status === 'Paid' ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' :
                      payment.status === 'Partial' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200' :
                      'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
                    }`}>
                      {payment.status}
                    </span>
                  </td>
                  <td className="px-4 py-2 text-sm text-slate-700 dark:text-slate-300">{payment.reference || '-'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
