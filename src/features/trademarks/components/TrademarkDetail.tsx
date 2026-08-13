import { useParams, Link } from '@tanstack/react-router';
import { mockTrademarks, mockMatters, mockClients } from '../../../data/mockData';

export function TrademarkDetail() {
  const { trademarkId } = useParams({ from: '/trademarks/$trademarkId' });
  const trademark = mockTrademarks.find(t => t.id === trademarkId);
  const matter = trademark ? mockMatters.find(m => m.id === trademark.matterId) : null;
  const client = matter ? mockClients.find(c => c.id === matter.clientId) : null;

  if (!trademark) {
    return <div className="text-slate-600 dark:text-slate-400">Trademark not found</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <Link to="/trademarks" className="text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 mb-2 inline-block">
            ← Back to Trademarks
          </Link>
          <h1 className="text-3xl font-bold text-slate-900 dark:text-slate-50">{trademark.trademarkName}</h1>
          <p className="text-slate-600 dark:text-slate-400">{trademark.trademarkNumber || 'Pending'} — Class {trademark.class}</p>
        </div>
        <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
          Edit Trademark
        </button>
      </div>

      {client && matter && (
        <div className="bg-white dark:bg-slate-800 rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold text-slate-900 dark:text-slate-50 mb-4">Case Information</h2>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-slate-600 dark:text-slate-400">Case No</p>
              <p className="font-medium text-slate-900 dark:text-slate-50">{matter.fullMatterNumber}</p>
            </div>
            <div>
              <p className="text-sm text-slate-600 dark:text-slate-400">Client</p>
              <p className="font-medium text-slate-900 dark:text-slate-50">{client.name} ({client.clientCode})</p>
            </div>
          </div>
        </div>
      )}

      <div className="bg-white dark:bg-slate-800 rounded-lg shadow p-6">
        <h2 className="text-xl font-semibold text-slate-900 dark:text-slate-50 mb-4">Trademark Details</h2>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-sm text-slate-600 dark:text-slate-400">Trademark Number</p>
            <p className="font-medium text-slate-900 dark:text-slate-50">{trademark.trademarkNumber || 'Pending'}</p>
          </div>
          <div>
            <p className="text-sm text-slate-600 dark:text-slate-400">Class</p>
            <p className="font-medium text-slate-900 dark:text-slate-50">{trademark.class} - {trademark.classDescription || '-'}</p>
          </div>
          <div>
            <p className="text-sm text-slate-600 dark:text-slate-400">Applicant Name</p>
            <p className="font-medium text-slate-900 dark:text-slate-50">{trademark.applicantName}</p>
          </div>
          <div>
            <p className="text-sm text-slate-600 dark:text-slate-400">Father Name</p>
            <p className="font-medium text-slate-900 dark:text-slate-50">{trademark.fatherName || '-'}</p>
          </div>
          <div>
            <p className="text-sm text-slate-600 dark:text-slate-400">CNIC</p>
            <p className="font-medium text-slate-900 dark:text-slate-50">{trademark.cnic || '-'}</p>
          </div>
          <div>
            <p className="text-sm text-slate-600 dark:text-slate-400">Trading/Business</p>
            <p className="font-medium text-slate-900 dark:text-slate-50">{trademark.tradingBusiness || '-'}</p>
          </div>
          <div className="col-span-2">
            <p className="text-sm text-slate-600 dark:text-slate-400">Address</p>
            <p className="font-medium text-slate-900 dark:text-slate-50">{trademark.address}</p>
          </div>
          <div>
            <p className="text-sm text-slate-600 dark:text-slate-400">Attorney</p>
            <p className="font-medium text-slate-900 dark:text-slate-50">{trademark.attorney || '-'}</p>
          </div>
          <div>
            <p className="text-sm text-slate-600 dark:text-slate-400">Agent ID</p>
            <p className="font-medium text-slate-900 dark:text-slate-50">{trademark.agentId || '-'}</p>
          </div>
        </div>
      </div>

      <div className="bg-white dark:bg-slate-800 rounded-lg shadow p-6">
        <h2 className="text-xl font-semibold text-slate-900 dark:text-slate-50 mb-4">Status & Workflow</h2>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-sm text-slate-600 dark:text-slate-400">Current Status</p>
            <span className={`px-3 py-1 rounded-full text-sm font-medium ${
              trademark.status === 'Certificate Delivered' ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' :
              trademark.status === 'Examination' || trademark.status === 'Hearing' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200' :
              'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'
            }`}>
              {trademark.status}
            </span>
          </div>
          <div>
            <p className="text-sm text-slate-600 dark:text-slate-400">Sub-Status</p>
            <p className="font-medium text-slate-900 dark:text-slate-50">{trademark.subStatus || '-'}</p>
          </div>
        </div>
      </div>

      <div className="bg-white dark:bg-slate-800 rounded-lg shadow p-6">
        <h2 className="text-xl font-semibold text-slate-900 dark:text-slate-50 mb-4">Trademark Image</h2>
        {trademark.imageUrl ? (
          <div className="w-32 h-32 bg-slate-100 dark:bg-slate-700 rounded-lg flex items-center justify-center">
            <span className="text-4xl">📷</span>
          </div>
        ) : (
          <p className="text-slate-600 dark:text-slate-400">No image uploaded</p>
        )}
      </div>
    </div>
  );
}
