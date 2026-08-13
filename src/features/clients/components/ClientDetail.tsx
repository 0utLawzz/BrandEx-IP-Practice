import { useParams, Link } from '@tanstack/react-router';
import { clientRepository, matterRepository } from '../../../services/dataRepository';

export function ClientDetail() {
  const { clientId } = useParams({ from: '/clients/$clientId' });
  const client = clientRepository.getById(clientId || '');
  const clientMatters = client ? matterRepository.getByClientId(client.id) : [];

  if (!client) {
    return <div className="text-[#0C0C0C] opacity-60">Client not found</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <Link to="/clients" className="text-[#C94A00] hover:text-[#0A6B52] font-mono uppercase text-sm mb-2 inline-block">
            ← Back to Clients
          </Link>
          <h1 className="text-4xl font-bebas font-normal text-[#0C0C0C] tracking-wider">{client.name}</h1>
          <p className="font-mono uppercase text-sm text-[#0C0C0C] opacity-60">{client.clientCode}</p>
        </div>
        <button className="btn-primary px-4 py-2">
          Edit Client
        </button>
      </div>

      <div className="card-neo p-6">
        <h2 className="text-2xl font-bebas font-normal text-[#0C0C0C] tracking-wider mb-4">CLIENT INFORMATION</h2>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-sm font-mono uppercase tracking-wider text-[#0C0C0C] opacity-60">Series</p>
            <p className="font-medium text-[#0C0C0C]">{client.series}</p>
          </div>
          <div>
            <p className="text-sm font-mono uppercase tracking-wider text-[#0C0C0C] opacity-60">Client Number</p>
            <p className="font-medium text-[#0C0C0C]">{client.clientNumber}</p>
          </div>
          <div>
            <p className="text-sm font-mono uppercase tracking-wider text-[#0C0C0C] opacity-60">Phone</p>
            <p className="font-medium text-[#0C0C0C]">{client.phone || '-'}</p>
          </div>
          <div>
            <p className="text-sm font-mono uppercase tracking-wider text-[#0C0C0C] opacity-60">Email</p>
            <p className="font-medium text-[#0C0C0C]">{client.email || '-'}</p>
          </div>
          <div>
            <p className="text-sm font-mono uppercase tracking-wider text-[#0C0C0C] opacity-60">City</p>
            <p className="font-medium text-[#0C0C0C]">{client.city}</p>
          </div>
          <div>
            <p className="text-sm font-mono uppercase tracking-wider text-[#0C0C0C] opacity-60">Country</p>
            <p className="font-medium text-[#0C0C0C]">{client.country}</p>
          </div>
          <div className="col-span-2">
            <p className="text-sm font-mono uppercase tracking-wider text-[#0C0C0C] opacity-60">Contact Person</p>
            <p className="font-medium text-[#0C0C0C]">{client.contactPerson || '-'}</p>
          </div>
          <div className="col-span-2">
            <p className="text-sm font-mono uppercase tracking-wider text-[#0C0C0C] opacity-60">Notes</p>
            <p className="font-medium text-[#0C0C0C]">{client.notes || '-'}</p>
          </div>
        </div>
      </div>

      <div className="card-neo p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bebas font-normal text-[#0C0C0C] tracking-wider">CLIENT MATTERS</h2>
          <button className="btn-primary px-4 py-2">
            Add Matter
          </button>
        </div>
        {clientMatters.length === 0 ? (
          <p className="text-[#0C0C0C] opacity-60">No matters found for this client</p>
        ) : (
          <table className="table-neo min-w-full">
            <thead>
              <tr>
                <th className="px-4 py-2 text-left text-xs font-mono uppercase tracking-wider">
                  Matter No
                </th>
                <th className="px-4 py-2 text-left text-xs font-mono uppercase tracking-wider">
                  Type
                </th>
                <th className="px-4 py-2 text-left text-xs font-mono uppercase tracking-wider">
                  Title
                </th>
                <th className="px-4 py-2 text-left text-xs font-mono uppercase tracking-wider">
                  Status
                </th>
                <th className="px-4 py-2 text-left text-xs font-mono uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {clientMatters.map((matter) => (
                <tr key={matter.id}>
                  <td className="px-4 py-2 text-sm font-mono text-[#0C0C0C]">{matter.fullMatterNumber}</td>
                  <td className="px-4 py-2 text-sm text-[#0C0C0C]">{matter.matterType}</td>
                  <td className="px-4 py-2 text-sm text-[#0C0C0C]">{matter.title}</td>
                  <td className="px-4 py-2 text-sm">
                    <span className={`px-2 py-1 text-xs font-mono uppercase ${
                      matter.status === 'Completed' ? 'badge-complete' :
                      matter.status === 'In Progress' ? 'badge-review' :
                      'badge-draft'
                    }`}>
                      {matter.status}
                    </span>
                  </td>
                  <td className="px-4 py-2 text-sm">
                    <Link
                      to="/matters/$matterId"
                      params={{ matterId: matter.id }}
                      className="text-[#C94A00] hover:text-[#0A6B52] font-mono uppercase text-xs"
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
