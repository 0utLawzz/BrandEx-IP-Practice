import { useState } from 'react';
import { matterRepository, clientRepository } from '../../../services/dataRepository';
import type { MatterType } from '../../../types';
import { generateMatterNumber } from '../../../lib/businessLogic';

interface CreateMatterFormProps {
  onSuccess: () => void;
  onCancel: () => void;
}

export function CreateMatterForm({ onSuccess, onCancel }: CreateMatterFormProps) {
  const [formData, setFormData] = useState({
    clientId: '',
    matterType: 'Trademark' as MatterType,
    title: '',
    description: '',
    status: 'Pending',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const clients = clientRepository.getAll();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: Record<string, string> = {};

    // Validation
    if (!formData.clientId) {
      newErrors.clientId = 'Client is required';
    }
    if (!formData.title.trim()) {
      newErrors.title = 'Title is required';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    // Get client
    const client = clientRepository.getById(formData.clientId);
    if (!client) {
      setErrors({ clientId: 'Invalid client' });
      return;
    }

    // Generate matter number
    const matterNumber = matterRepository.getNextMatterNumber(client.clientCode);
    const fullMatterNumber = generateMatterNumber(client.clientCode, parseInt(matterNumber, 10));

    // Check for duplicate matter number
    if (matterRepository.existsByFullMatterNumber(fullMatterNumber)) {
      setErrors({ matterNumber: 'Matter number already exists' });
      return;
    }

    // Create matter
    try {
      matterRepository.create({
        clientId: formData.clientId,
        clientCode: client.clientCode,
        matterNumber,
        fullMatterNumber,
        matterType: formData.matterType,
        title: formData.title,
        description: formData.description || undefined,
        status: formData.status,
      });

      onSuccess();
    } catch {
      setErrors({ submit: 'Failed to create matter' });
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-slate-800 rounded-lg shadow-xl p-6 w-full max-w-md">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-50 mb-4">Add New Matter</h2>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
              Client *
            </label>
            <select
              value={formData.clientId}
              onChange={(e) => setFormData({ ...formData, clientId: e.target.value })}
              className={`w-full px-3 py-2 border rounded-lg bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-50 ${
                errors.clientId ? 'border-red-500' : 'border-slate-300 dark:border-slate-600'
              }`}
            >
              <option value="">Select a client</option>
              {clients.map((client) => (
                <option key={client.id} value={client.id}>
                  {client.clientCode} - {client.name}
                </option>
              ))}
            </select>
            {errors.clientId && <p className="text-red-500 text-sm mt-1">{errors.clientId}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
              Matter Type
            </label>
            <select
              value={formData.matterType}
              onChange={(e) => setFormData({ ...formData, matterType: e.target.value as MatterType })}
              className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-50"
            >
              <option value="Trademark">Trademark</option>
              <option value="Copyright">Copyright</option>
              <option value="Company">Company</option>
              <option value="NTN">NTN / Tax</option>
              <option value="Opposition">Opposition</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
              Title *
            </label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className={`w-full px-3 py-2 border rounded-lg bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-50 ${
                errors.title ? 'border-red-500' : 'border-slate-300 dark:border-slate-600'
              }`}
            />
            {errors.title && <p className="text-red-500 text-sm mt-1">{errors.title}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
              Description
            </label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              rows={3}
              className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-50"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
              Status
            </label>
            <select
              value={formData.status}
              onChange={(e) => setFormData({ ...formData, status: e.target.value })}
              className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-50"
            >
              <option value="Pending">Pending</option>
              <option value="In Progress">In Progress</option>
              <option value="Completed">Completed</option>
            </select>
          </div>

          {errors.submit && <p className="text-red-500 text-sm">{errors.submit}</p>}
          {errors.matterNumber && <p className="text-red-500 text-sm">{errors.matterNumber}</p>}

          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={onCancel}
              className="flex-1 px-4 py-2 border border-slate-300 dark:border-slate-600 rounded-lg text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Create Matter
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
