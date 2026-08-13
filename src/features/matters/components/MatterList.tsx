import { useState } from 'react';
import { Link } from '@tanstack/react-router';
import { matterRepository, clientRepository } from '../../../services/dataRepository';
import { CreateMatterForm } from './CreateMatterForm';

export function MatterList() {
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [matters, setMatters] = useState(matterRepository.getAll());
  const clients = clientRepository.getAll();

  const mattersWithClients = matters.map(matter => ({
    ...matter,
    client: clients.find(c => c.id === matter.clientId),
  }));

  const handleMatterCreated = () => {
    setMatters(matterRepository.getAll());
    setShowCreateForm(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-4xl font-bebas font-normal text-[#0C0C0C] tracking-wider">MATTERS</h1>
        <button
          onClick={() => setShowCreateForm(true)}
          className="btn-primary px-4 py-2"
        >
          Add Matter
        </button>
      </div>

      {showCreateForm && (
        <CreateMatterForm 
          onSuccess={handleMatterCreated}
          onCancel={() => setShowCreateForm(false)}
        />
      )}

      <div className="card-neo overflow-hidden">
        <table className="table-neo min-w-full">
          <thead>
            <tr>
              <th className="px-6 py-3 text-left text-xs font-mono uppercase tracking-wider">
                Matter No
              </th>
              <th className="px-6 py-3 text-left text-xs font-mono uppercase tracking-wider">
                Client
              </th>
              <th className="px-6 py-3 text-left text-xs font-mono uppercase tracking-wider">
                Type
              </th>
              <th className="px-6 py-3 text-left text-xs font-mono uppercase tracking-wider">
                Title
              </th>
              <th className="px-6 py-3 text-left text-xs font-mono uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-mono uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {mattersWithClients.map((matter) => (
              <tr key={matter.id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-mono font-medium text-[#0C0C0C]">
                  {matter.fullMatterNumber}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-[#0C0C0C]">
                  {matter.client?.name || '-'}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-[#0C0C0C]">
                  {matter.matterType}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-[#0C0C0C]">
                  {matter.title}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-[#0C0C0C]">
                  <span className={`px-2 py-1 text-xs font-mono uppercase ${
                    matter.status === 'Completed' ? 'badge-complete' :
                    matter.status === 'In Progress' ? 'badge-review' :
                    'badge-draft'
                  }`}>
                    {matter.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-[#0C0C0C]">
                  <Link
                    to="/matters/$matterId"
                    params={{ matterId: matter.id }}
                    className="text-[#C94A00] hover:text-[#0A6B52] font-mono uppercase text-xs"
                  >
                    View Details
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
