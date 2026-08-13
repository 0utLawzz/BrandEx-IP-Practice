import { useState } from 'react';
import { Link } from '@tanstack/react-router';
import { clientRepository } from '../../../services/dataRepository';
import { CreateClientForm } from './CreateClientForm';

export function ClientList() {
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [clients, setClients] = useState(clientRepository.getAll());

  const handleClientCreated = () => {
    setClients(clientRepository.getAll());
    setShowCreateForm(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-4xl font-bebas font-normal text-[#0C0C0C] tracking-wider">CLIENTS</h1>
        <button 
          onClick={() => setShowCreateForm(true)}
          className="btn-primary px-4 py-2"
        >
          Add Client
        </button>
      </div>

      {showCreateForm && (
        <CreateClientForm 
          onSuccess={handleClientCreated}
          onCancel={() => setShowCreateForm(false)}
        />
      )}

      <div className="card-neo overflow-hidden">
        <table className="table-neo min-w-full">
          <thead>
            <tr>
              <th className="px-6 py-3 text-left text-xs font-mono uppercase tracking-wider">
                Client Code
              </th>
              <th className="px-6 py-3 text-left text-xs font-mono uppercase tracking-wider">
                Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-mono uppercase tracking-wider">
                City
              </th>
              <th className="px-6 py-3 text-left text-xs font-mono uppercase tracking-wider">
                Phone
              </th>
              <th className="px-6 py-3 text-left text-xs font-mono uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {clients.map((client) => (
              <tr key={client.id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-mono font-medium text-[#0C0C0C]">
                  {client.clientCode}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-[#0C0C0C]">
                  {client.name}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-[#0C0C0C]">
                  {client.city}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-[#0C0C0C]">
                  {client.phone || '-'}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-[#0C0C0C]">
                  <Link
                    to="/clients/$clientId"
                    params={{ clientId: client.id }}
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
