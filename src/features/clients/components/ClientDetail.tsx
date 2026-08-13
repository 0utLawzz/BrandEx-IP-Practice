import { useParams, Link } from '@tanstack/react-router';
import { mockClients, mockMatters } from '../../../data/mockData';

export function ClientDetail() {
  const { clientId } = useParams({ from: '/clients/$clientId' });
  const client = mockClients.find(c => c.id === clientId);
  const clientMatters = mockMatters.filter(m => m.clientId === clientId);

  if (!client) {
    return <div className="text-slate-600 dark:text-slate-400">Client not found</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <Link to="/clients" className="text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 mb-2 inline-block">
            ← Back to Clients
          </Link>
          <h1 className="text-3xl font-bold text-slate-900 dark:text-slate-50">{client.name}</h1>
          <p className="text-slate-600 dark:text-slate-400">{client.clientCode}</p>
        </div>
        <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
          Edit Client
        </button>
      </div>

      <div className="bg-white dark:bg-slate-800 rounded-lg shadow p-6">
        <h2 className="text-xl font-semibold text-slate-900 dark:text-slate-50 mb-4">Client Information</h2>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-sm text-slate-600 dark:text-slate-400">Client Type</p>
            <p className="font-medium text-slate-900 dark:text-slate-50">{client.clientType}</p>
          </div>
          <div>
            <p className="text-sm text-slate-600 dark:text-slate-400">Client Number</p>
            <p className="font-medium text-slate-900 dark:text-slate-50">{client.clientNumber}</p>
          </div>
          <div>
            <p className="text-sm text-slate-600 dark:text-slate-400">Phone</p>
            <p className="font-medium text-slate-900 dark:text-slate-50">{client.phone || '-'}</p>
          </div>
          <div>
            <p className="text-sm text-slate-600 dark:text-slate-400">Email</p>
            <p className="font-medium text-slate-900 dark:text-slate-50">{client.email || '-'}</p>
          </div>
          <div>
            <p className="text-sm text-slate-600 dark:text-slate-400">City</p>
            <p className="font-medium text-slate-900 dark:text-slate-50">{client.city}</p>
          </div>
          <div>
            <p className="text-sm text-slate-600 dark:text-slate-400">Country</p>
            <p className="font-medium text-slate-900 dark:text-slate-50">{client.country}</p>
          </div>
          <div className="col-span-2">
            <p className="text-sm text-slate-600 dark:text-slate-400">Contact Person</p>
            <p className="font-medium text-slate-900 dark:text-slate-50">{client.contactPerson || '-'}</p>
          </div>
          <div className="col-span-2">
            <p className="text-sm text-slate-600 dark:text-slate-400">Notes</p>
            <p className="font-medium text-slate-900 dark:text-slate-50">{client.notes || '-'}</p>
          </div>
        </div>
      </div>

      <div className="bg-white dark:bg-slate-800 rounded-lg shadow p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-slate-900 dark:text-slate-50">Client Matters</h2>
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
            Add Matter
          </button>
        </div>
        {clientMatters.length === 0 ? (
          <p className="text-slate-600 dark:text-slate-400">No matters found for this client</p>
        ) : (
          <table className="min-w-full divide-y divide-slate-200 dark:divide-slate-700">
            <thead className="bg-slate-50 dark:bg-slate-900">
              <tr>
                <th className="px-4 py-2 text-left text-xs font-medium text-slate-500 dark:text-slate-400 uppercase">
                  Matter No
                </th>
                <th className="px-4 py-2 text-left text-xs font-medium text-slate-500 dark:text-slate-400 uppercase">
                  Type
                </th>
                <th className="px-4 py-2 text-left text-xs font-medium text-slate-500 dark:text-slate-400 uppercase">
                  Title
                </th>
                <th className="px-4 py-2 text-left text-xs font-medium text-slate-500 dark:text-slate-400 uppercase">
                  Status
                </th>
                <th className="px-4 py-2 text-left text-xs font-medium text-slate-500 dark:text-slate-400 uppercase">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 dark:divide-slate-700">
              {clientMatters.map((matter) => (
                <tr key={matter.id} className="hover:bg-slate-50 dark:hover:bg-slate-700">
                  <td className="px-4 py-2 text-sm text-slate-900 dark:text-slate-50">{matter.fullMatterNumber}</td>
                  <td className="px-4 py-2 text-sm text-slate-700 dark:text-slate-300">{matter.matterType}</td>
                  <td className="px-4 py-2 text-sm text-slate-700 dark:text-slate-300">{matter.title}</td>
                  <td className="px-4 py-2 text-sm text-slate-700 dark:text-slate-300">{matter.status}</td>
                  <td className="px-4 py-2 text-sm">
                    <Link
                      to="/matters/$matterId"
                      params={{ matterId: matter.id }}
                      className="text-blue-600 hover:text-blue-900 dark:text-blue-400 dark:hover:text-blue-300"
                    >
                      View
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
