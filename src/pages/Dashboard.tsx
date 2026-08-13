import { clientRepository, matterRepository, ledgerRepository, trademarkRepository } from '../services/dataRepository';

export function Dashboard() {
  const totalClients = clientRepository.getAll().length;
  const totalMatters = matterRepository.getAll().length;
  const totalTrademarks = trademarkRepository.getAll().length;
  const ledgerEntries = ledgerRepository.getAll();
  const totalDue = ledgerEntries.reduce((sum, entry) => sum + entry.due, 0);
  const totalReceived = ledgerEntries.reduce((sum, entry) => sum + entry.received, 0);
  const totalBalance = totalDue - totalReceived;

  const recentMatters = matterRepository.getAll().slice(0, 5);
  const pendingPayments = ledgerEntries.filter(entry => entry.balance > 0);

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-slate-900 dark:text-slate-50">Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white dark:bg-slate-800 rounded-lg shadow p-6">
          <h3 className="text-sm font-medium text-slate-600 dark:text-slate-400 mb-2">Total Clients</h3>
          <p className="text-3xl font-bold text-slate-900 dark:text-slate-50">{totalClients}</p>
        </div>
        <div className="bg-white dark:bg-slate-800 rounded-lg shadow p-6">
          <h3 className="text-sm font-medium text-slate-600 dark:text-slate-400 mb-2">Active Matters</h3>
          <p className="text-3xl font-bold text-slate-900 dark:text-slate-50">{totalMatters}</p>
        </div>
        <div className="bg-white dark:bg-slate-800 rounded-lg shadow p-6">
          <h3 className="text-sm font-medium text-slate-600 dark:text-slate-400 mb-2">Trademarks</h3>
          <p className="text-3xl font-bold text-slate-900 dark:text-slate-50">{totalTrademarks}</p>
        </div>
        <div className="bg-white dark:bg-slate-800 rounded-lg shadow p-6">
          <h3 className="text-sm font-medium text-slate-600 dark:text-slate-400 mb-2">Pending Balance</h3>
          <p className={`text-3xl font-bold ${totalBalance > 0 ? 'text-red-600 dark:text-red-400' : 'text-green-600 dark:text-green-400'}`}>
            PKR {totalBalance.toLocaleString()}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white dark:bg-slate-800 rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold text-slate-900 dark:text-slate-50 mb-4">Recent Matters</h2>
          {recentMatters.length === 0 ? (
            <p className="text-slate-600 dark:text-slate-400">No recent matters</p>
          ) : (
            <div className="space-y-3">
              {recentMatters.map((matter) => (
                <div key={matter.id} className="flex justify-between items-center p-3 bg-slate-50 dark:bg-slate-700 rounded-lg">
                  <div>
                    <p className="font-medium text-slate-900 dark:text-slate-50">{matter.fullMatterNumber}</p>
                    <p className="text-sm text-slate-600 dark:text-slate-400">{matter.title}</p>
                  </div>
                  <span className={`px-2 py-1 rounded-full text-xs ${
                    matter.status === 'Completed' ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' :
                    matter.status === 'In Progress' ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200' :
                    'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
                  }`}>
                    {matter.status}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="bg-white dark:bg-slate-800 rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold text-slate-900 dark:text-slate-50 mb-4">Pending Payments</h2>
          {pendingPayments.length === 0 ? (
            <p className="text-slate-600 dark:text-slate-400">No pending payments</p>
          ) : (
            <div className="space-y-3">
              {pendingPayments.slice(0, 5).map((entry) => (
                <div key={entry.id} className="flex justify-between items-center p-3 bg-slate-50 dark:bg-slate-700 rounded-lg">
                  <div>
                    <p className="font-medium text-slate-900 dark:text-slate-50">{entry.matterNumber}</p>
                    <p className="text-sm text-slate-600 dark:text-slate-400">{entry.applicantName}</p>
                  </div>
                  <p className="font-bold text-red-600 dark:text-red-400">PKR {entry.balance.toLocaleString()}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
