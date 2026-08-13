import { useState } from 'react';
import { useParams, Link } from '@tanstack/react-router';
import { matterRepository, clientRepository, ledgerRepository, paymentRepository, trademarkRepository } from '../../../services/dataRepository';
import { AddLedgerEntryForm } from '../../ledger/components/AddLedgerEntryForm';
import { CreateTrademarkForm } from '../../trademarks/components/CreateTrademarkForm';
import { calculateBalance, calculatePaymentStatus } from '../../../lib/businessLogic';

export function MatterDetail() {
  const { matterId } = useParams({ from: '/matters/$matterId' });
  const [showAddLedgerForm, setShowAddLedgerForm] = useState(false);
  const [showAddTrademarkForm, setShowAddTrademarkForm] = useState(false);
  const [, setTick] = useState(0);

  const refreshState = () => setTick(t => t + 1);
  
  const matter = matterRepository.getById(matterId || '');
  const client = matter ? clientRepository.getById(matter.clientId) : null;
  const ledgerEntries = matter ? ledgerRepository.getByMatterId(matter.id) : [];
  const payments = matter ? paymentRepository.getByMatterId(matter.id) : [];
  const trademark = matter ? trademarkRepository.getByMatterId(matter.id) : undefined;

  if (!matter) {
    return <div className="text-[#0C0C0C] opacity-60">Matter not found</div>;
  }

  const totalDue = ledgerEntries.reduce((sum, entry) => sum + entry.due, 0);
  const totalReceived = ledgerEntries.reduce((sum, entry) => sum + entry.received, 0);
  const totalBalance = calculateBalance(totalDue, totalReceived);
  const paymentStatus = calculatePaymentStatus(totalDue, totalReceived);

  const handleLedgerEntryAdded = () => {
    setShowAddLedgerForm(false);
    refreshState();
  };

  const handleTrademarkAdded = () => {
    setShowAddTrademarkForm(false);
    refreshState();
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <Link to="/matters" className="text-[#C94A00] hover:text-[#0A6B52] font-mono uppercase text-xs mb-2 inline-block">
            ← Back to Matters
          </Link>
          <h1 className="text-4xl font-bebas font-normal text-[#0C0C0C] tracking-wider">{matter.title}</h1>
          <p className="text-[#0C0C0C] opacity-60 font-mono uppercase text-sm">{matter.fullMatterNumber} — {matter.matterType}</p>
        </div>
        <div className="flex gap-2">
          <button 
            onClick={() => setShowAddTrademarkForm(true)}
            className="btn-secondary px-4 py-2"
          >
            Add Trademark
          </button>
          <button className="btn-primary px-4 py-2">
            Edit Matter
          </button>
        </div>
      </div>

      {showAddTrademarkForm && (
        <CreateTrademarkForm
          initialMatterId={matter.id}
          onSuccess={handleTrademarkAdded}
          onCancel={() => setShowAddTrademarkForm(false)}
        />
      )}

      {client && (
        <div className="card-neo p-6">
          <h2 className="text-2xl font-bebas font-normal text-[#0C0C0C] tracking-wider mb-4">CLIENT INFORMATION</h2>
          <div className="flex items-center gap-4">
            <div>
              <p className="text-sm font-mono uppercase tracking-wider text-[#0C0C0C] mb-1 opacity-60">Client Code</p>
              <p className="font-mono uppercase text-sm text-[#0C0C0C]">{client.clientCode}</p>
            </div>
            <div>
              <p className="text-sm font-mono uppercase tracking-wider text-[#0C0C0C] mb-1 opacity-60">Client Name</p>
              <p className="text-sm text-[#0C0C0C]">{client.name}</p>
            </div>
            <div>
              <p className="text-sm font-mono uppercase tracking-wider text-[#0C0C0C] mb-1 opacity-60">Contact</p>
              <p className="text-sm text-[#0C0C0C]">{client.phone || client.email || '-'}</p>
            </div>
          </div>
        </div>
      )}

      {trademark && (
        <div className="card-neo p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bebas font-normal text-[#0C0C0C] tracking-wider">TRADEMARK INFORMATION</h2>
            <Link
              to="/trademarks/$trademarkId"
              params={{ trademarkId: trademark.id }}
              className="text-[#C94A00] hover:text-[#0A6B52] font-mono uppercase text-xs"
            >
              View Trademark Details →
            </Link>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div>
              <p className="text-sm font-mono uppercase tracking-wider text-[#0C0C0C] opacity-60">TM Name</p>
              <p className="font-medium text-[#0C0C0C]">{trademark.trademarkName}</p>
            </div>
            <div>
              <p className="text-sm font-mono uppercase tracking-wider text-[#0C0C0C] opacity-60">TM Number</p>
              <p className="font-medium text-[#0C0C0C]">{trademark.trademarkNumber || 'Pending'}</p>
            </div>
            <div>
              <p className="text-sm font-mono uppercase tracking-wider text-[#0C0C0C] opacity-60">Class</p>
              <p className="font-medium text-[#0C0C0C]">{trademark.class}</p>
            </div>
            <div>
              <p className="text-sm font-mono uppercase tracking-wider text-[#0C0C0C] opacity-60">Status</p>
              <span className={`px-2 py-1 text-xs font-mono uppercase ${
                trademark.status === 'Certificate Delivered' ? 'badge-complete' : 'badge-review'
              }`}>
                {trademark.status}
              </span>
            </div>
          </div>
        </div>
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
          <h3 className="text-sm font-mono uppercase tracking-wider text-[#0C0C0C] mb-2 opacity-60">Balance</h3>
          <p className={`text-4xl font-bebas font-normal ${totalBalance > 0 ? 'text-[#C94A00]' : 'text-[#0A6B52]'}`}>
            PKR {totalBalance.toLocaleString()}
          </p>
          <p className="text-sm font-mono uppercase text-[#0C0C0C] mt-1 opacity-60">Status: {paymentStatus}</p>
        </div>
      </div>

      <div className="card-neo p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bebas font-normal text-[#0C0C0C] tracking-wider">LEDGER ENTRIES</h2>
          <button
            onClick={() => setShowAddLedgerForm(true)}
            className="btn-primary px-4 py-2"
          >
            Add Ledger Entry
          </button>
        </div>
        {showAddLedgerForm && (
          <AddLedgerEntryForm
            matterId={matter.id}
            onSuccess={handleLedgerEntryAdded}
            onCancel={() => setShowAddLedgerForm(false)}
          />
        )}
        {ledgerEntries.length === 0 ? (
          <p className="text-[#0C0C0C] opacity-60">No ledger entries found</p>
        ) : (
          <table className="table-neo min-w-full">
            <thead>
              <tr>
                <th className="px-4 py-2 text-left text-xs font-mono uppercase">Date</th>
                <th className="px-4 py-2 text-left text-xs font-mono uppercase">TM No</th>
                <th className="px-4 py-2 text-left text-xs font-mono uppercase">Due</th>
                <th className="px-4 py-2 text-left text-xs font-mono uppercase">Received</th>
                <th className="px-4 py-2 text-left text-xs font-mono uppercase">Balance</th>
                <th className="px-4 py-2 text-left text-xs font-mono uppercase">Status</th>
              </tr>
            </thead>
            <tbody>
              {ledgerEntries.map((entry) => (
                <tr key={entry.id}>
                  <td className="px-4 py-2 text-sm text-[#0C0C0C]">{entry.date}</td>
                  <td className="px-4 py-2 text-sm text-[#0C0C0C]">{entry.trademarkNumber || '-'}</td>
                  <td className="px-4 py-2 text-sm text-[#0C0C0C]">PKR {entry.due.toLocaleString()}</td>
                  <td className="px-4 py-2 text-sm text-[#0C0C0C]">PKR {entry.received.toLocaleString()}</td>
                  <td className={`px-4 py-2 text-sm font-mono font-medium ${entry.balance > 0 ? 'text-[#C94A00]' : 'text-[#0A6B52]'}`}>
                    PKR {entry.balance.toLocaleString()}
                  </td>
                  <td className="px-4 py-2 text-sm">
                    <span className={`px-2 py-1 text-xs font-mono uppercase ${
                      entry.paymentStatus === 'Paid' ? 'badge-complete' :
                      entry.paymentStatus === 'Partial' ? 'badge-review' :
                      'badge-draft'
                    }`}>
                      {entry.paymentStatus}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      <div className="card-neo p-6">
        <h2 className="text-2xl font-bebas font-normal text-[#0C0C0C] tracking-wider mb-4">PAYMENT RECORDS</h2>
        {payments.length === 0 ? (
          <p className="text-[#0C0C0C] opacity-60">No payment records found</p>
        ) : (
          <table className="table-neo min-w-full">
            <thead>
              <tr>
                <th className="px-4 py-2 text-left text-xs font-mono uppercase">Date</th>
                <th className="px-4 py-2 text-left text-xs font-mono uppercase">Amount</th>
                <th className="px-4 py-2 text-left text-xs font-mono uppercase">Method</th>
                <th className="px-4 py-2 text-left text-xs font-mono uppercase">Status</th>
                <th className="px-4 py-2 text-left text-xs font-mono uppercase">Reference</th>
              </tr>
            </thead>
            <tbody>
              {payments.map((payment) => (
                <tr key={payment.id}>
                  <td className="px-4 py-2 text-sm text-[#0C0C0C]">{payment.date}</td>
                  <td className="px-4 py-2 text-sm text-[#0C0C0C]">PKR {payment.amount.toLocaleString()}</td>
                  <td className="px-4 py-2 text-sm text-[#0C0C0C]">{payment.method}</td>
                  <td className="px-4 py-2 text-sm">
                    <span className={`px-2 py-1 text-xs font-mono uppercase ${
                      payment.status === 'Paid' ? 'badge-complete' :
                      payment.status === 'Partial' ? 'badge-review' :
                      'badge-draft'
                    }`}>
                      {payment.status}
                    </span>
                  </td>
                  <td className="px-4 py-2 text-sm text-[#0C0C0C]">{payment.reference || '-'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
