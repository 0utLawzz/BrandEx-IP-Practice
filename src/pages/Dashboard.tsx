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
      <h1 className="text-4xl font-bebas font-normal text-[#0C0C0C] tracking-wider">DASHBOARD</h1>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="card-neo p-6">
          <h3 className="text-sm font-mono uppercase tracking-wider text-[#0C0C0C] mb-2 opacity-60">Total Clients</h3>
          <p className="text-4xl font-bebas font-normal text-[#0C0C0C]">{totalClients}</p>
        </div>
        <div className="card-neo p-6">
          <h3 className="text-sm font-mono uppercase tracking-wider text-[#0C0C0C] mb-2 opacity-60">Active Matters</h3>
          <p className="text-4xl font-bebas font-normal text-[#0C0C0C]">{totalMatters}</p>
        </div>
        <div className="card-neo p-6">
          <h3 className="text-sm font-mono uppercase tracking-wider text-[#0C0C0C] mb-2 opacity-60">Trademarks</h3>
          <p className="text-4xl font-bebas font-normal text-[#0C0C0C]">{totalTrademarks}</p>
        </div>
        <div className="card-neo p-6">
          <h3 className="text-sm font-mono uppercase tracking-wider text-[#0C0C0C] mb-2 opacity-60">Pending Balance</h3>
          <p className={`text-4xl font-bebas font-normal ${totalBalance > 0 ? 'text-[#C94A00]' : 'text-[#0A6B52]'}`}>
            PKR {totalBalance.toLocaleString()}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="card-neo p-6">
          <h2 className="text-2xl font-bebas font-normal text-[#0C0C0C] tracking-wider mb-4">Recent Matters</h2>
          {recentMatters.length === 0 ? (
            <p className="text-[#0C0C0C] opacity-60">No recent matters</p>
          ) : (
            <div className="space-y-3">
              {recentMatters.map((matter) => (
                <div key={matter.id} className="flex justify-between items-center p-3 border-2 border-[#0C0C0C] bg-[#F0E8D0]">
                  <div>
                    <p className="font-mono uppercase text-sm text-[#0C0C0C]">{matter.fullMatterNumber}</p>
                    <p className="text-sm text-[#0C0C0C]">{matter.title}</p>
                  </div>
                  <span className={`px-2 py-1 text-xs font-mono uppercase ${
                    matter.status === 'Completed' ? 'badge-complete' :
                    matter.status === 'In Progress' ? 'badge-review' :
                    'badge-draft'
                  }`}>
                    {matter.status}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="card-neo p-6">
          <h2 className="text-2xl font-bebas font-normal text-[#0C0C0C] tracking-wider mb-4">Pending Payments</h2>
          {pendingPayments.length === 0 ? (
            <p className="text-[#0C0C0C] opacity-60">No pending payments</p>
          ) : (
            <div className="space-y-3">
              {pendingPayments.slice(0, 5).map((entry) => (
                <div key={entry.id} className="flex justify-between items-center p-3 border-2 border-[#0C0C0C] bg-[#F0E8D0]">
                  <div>
                    <p className="font-mono uppercase text-sm text-[#0C0C0C]">{entry.matterNumber}</p>
                    <p className="text-sm text-[#0C0C0C]">{entry.applicantName}</p>
                  </div>
                  <p className="font-bebas text-xl text-[#C94A00]">PKR {entry.balance.toLocaleString()}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
