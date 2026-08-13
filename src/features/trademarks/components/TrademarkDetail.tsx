import { useParams, Link } from '@tanstack/react-router';
import { mockTrademarks, mockMatters, mockClients } from '../../../data/mockData';

export function TrademarkDetail() {
  const { trademarkId } = useParams({ from: '/trademarks/$trademarkId' });
  const trademark = mockTrademarks.find(t => t.id === trademarkId);
  const matter = trademark ? mockMatters.find(m => m.id === trademark.matterId) : null;
  const client = matter ? mockClients.find(c => c.id === matter.clientId) : null;

  if (!trademark) {
    return <div className="text-[#0C0C0C] opacity-60">Trademark not found</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <Link to="/trademarks" className="text-[#C94A00] hover:text-[#0A6B52] font-mono uppercase text-xs mb-2 inline-block">
            ← Back to Trademarks
          </Link>
          <h1 className="text-4xl font-bebas font-normal text-[#0C0C0C] tracking-wider">{trademark.trademarkName}</h1>
          <p className="text-[#0C0C0C] opacity-60 font-mono uppercase text-sm">{trademark.trademarkNumber || 'Pending'} — Class {trademark.class}</p>
        </div>
        <button className="btn-primary px-4 py-2">
          Edit Trademark
        </button>
      </div>

      {client && matter && (
        <div className="card-neo p-6">
          <h2 className="text-2xl font-bebas font-normal text-[#0C0C0C] tracking-wider mb-4">CASE INFORMATION</h2>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm font-mono uppercase tracking-wider text-[#0C0C0C] mb-1 opacity-60">Case No</p>
              <p className="font-mono uppercase text-sm text-[#0C0C0C]">{matter.fullMatterNumber}</p>
            </div>
            <div>
              <p className="text-sm font-mono uppercase tracking-wider text-[#0C0C0C] mb-1 opacity-60">Client</p>
              <p className="text-sm text-[#0C0C0C]">{client.name} ({client.clientCode})</p>
            </div>
          </div>
        </div>
      )}

      <div className="card-neo p-6">
        <h2 className="text-2xl font-bebas font-normal text-[#0C0C0C] tracking-wider mb-4">TRADEMARK DETAILS</h2>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-sm font-mono uppercase tracking-wider text-[#0C0C0C] mb-1 opacity-60">Trademark Number</p>
            <p className="text-sm text-[#0C0C0C]">{trademark.trademarkNumber || 'Pending'}</p>
          </div>
          <div>
            <p className="text-sm font-mono uppercase tracking-wider text-[#0C0C0C] mb-1 opacity-60">Class</p>
            <p className="text-sm text-[#0C0C0C]">{trademark.class} - {trademark.classDescription || '-'}</p>
          </div>
          <div>
            <p className="text-sm font-mono uppercase tracking-wider text-[#0C0C0C] mb-1 opacity-60">Applicant Name</p>
            <p className="text-sm text-[#0C0C0C]">{trademark.applicantName}</p>
          </div>
          <div>
            <p className="text-sm font-mono uppercase tracking-wider text-[#0C0C0C] mb-1 opacity-60">Father Name</p>
            <p className="text-sm text-[#0C0C0C]">{trademark.fatherName || '-'}</p>
          </div>
          <div>
            <p className="text-sm font-mono uppercase tracking-wider text-[#0C0C0C] mb-1 opacity-60">CNIC</p>
            <p className="text-sm text-[#0C0C0C]">{trademark.cnic || '-'}</p>
          </div>
          <div>
            <p className="text-sm font-mono uppercase tracking-wider text-[#0C0C0C] mb-1 opacity-60">Trading/Business</p>
            <p className="text-sm text-[#0C0C0C]">{trademark.tradingBusiness || '-'}</p>
          </div>
          <div className="col-span-2">
            <p className="text-sm font-mono uppercase tracking-wider text-[#0C0C0C] mb-1 opacity-60">Address</p>
            <p className="text-sm text-[#0C0C0C]">{trademark.address}</p>
          </div>
          <div>
            <p className="text-sm font-mono uppercase tracking-wider text-[#0C0C0C] mb-1 opacity-60">Attorney</p>
            <p className="text-sm text-[#0C0C0C]">{trademark.attorney || '-'}</p>
          </div>
          <div>
            <p className="text-sm font-mono uppercase tracking-wider text-[#0C0C0C] mb-1 opacity-60">Agent ID</p>
            <p className="text-sm text-[#0C0C0C]">{trademark.agentId || '-'}</p>
          </div>
        </div>
      </div>

      <div className="card-neo p-6">
        <h2 className="text-2xl font-bebas font-normal text-[#0C0C0C] tracking-wider mb-4">STATUS & WORKFLOW</h2>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-sm font-mono uppercase tracking-wider text-[#0C0C0C] mb-1 opacity-60">Current Status</p>
            <span className={`px-3 py-1 text-sm font-mono uppercase ${
              trademark.status === 'Certificate Delivered' ? 'badge-complete' :
              trademark.status === 'Examination' || trademark.status === 'Hearing' ? 'badge-review' :
              'badge-published'
            }`}>
              {trademark.status}
            </span>
          </div>
          <div>
            <p className="text-sm font-mono uppercase tracking-wider text-[#0C0C0C] mb-1 opacity-60">Sub-Status</p>
            <p className="text-sm text-[#0C0C0C]">{trademark.subStatus || '-'}</p>
          </div>
        </div>
      </div>

      <div className="card-neo p-6">
        <h2 className="text-2xl font-bebas font-normal text-[#0C0C0C] tracking-wider mb-4">TRADEMARK IMAGE</h2>
        {trademark.imageUrl ? (
          <div className="w-32 h-32 border-2 border-[#0C0C0C] bg-[#F0E8D0] flex items-center justify-center">
            <span className="text-4xl">📷</span>
          </div>
        ) : (
          <p className="text-[#0C0C0C] opacity-60">No image uploaded</p>
        )}
      </div>
    </div>
  );
}
