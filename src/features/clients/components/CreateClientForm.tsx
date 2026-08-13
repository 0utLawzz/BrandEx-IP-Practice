import { useState } from 'react';
import { clientRepository } from '../../../services/dataRepository';
import type { ClientSeries } from '../../../types';
import { formatClientCode } from '../../../lib/businessLogic';

interface CreateClientFormProps {
  onSuccess: () => void;
  onCancel: () => void;
}

export function CreateClientForm({ onSuccess, onCancel }: CreateClientFormProps) {
  const [formData, setFormData] = useState({
    series: 'B' as ClientSeries,
    name: '',
    phone: '',
    whatsapp: '',
    email: '',
    city: '',
    country: 'Pakistan',
    contactPerson: '',
    notes: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: Record<string, string> = {};

    // Validation
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }
    if (!formData.city.trim()) {
      newErrors.city = 'City is required';
    }
    if (!formData.country.trim()) {
      newErrors.country = 'Country is required';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    // Generate client code
    const clientNumber = clientRepository.getNextClientNumber(formData.series);
    const clientCode = formatClientCode(formData.series, clientNumber);

    // Check for duplicate client code
    if (clientRepository.existsByClientCode(clientCode)) {
      setErrors({ clientCode: 'Client code already exists' });
      return;
    }

    // Create client
    try {
      clientRepository.create({
        series: formData.series,
        clientNumber,
        clientCode,
        name: formData.name,
        phone: formData.phone || undefined,
        whatsapp: formData.whatsapp || undefined,
        email: formData.email || undefined,
        city: formData.city,
        country: formData.country,
        contactPerson: formData.contactPerson || undefined,
        notes: formData.notes || undefined,
      });

      onSuccess();
    } catch {
      setErrors({ submit: 'Failed to create client' });
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="card-neo p-6 w-full max-w-md">
        <h2 className="text-2xl font-bebas font-normal text-[#0C0C0C] tracking-wider mb-4">ADD NEW CLIENT</h2>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-mono uppercase tracking-wider text-[#0C0C0C] mb-1">
              Series
            </label>
            <select
              value={formData.series}
              onChange={(e) => setFormData({ ...formData, series: e.target.value as ClientSeries })}
              className="w-full px-3 py-2 input-neo text-[#0C0C0C]"
            >
              <option value="A">A</option>
              <option value="B">B</option>
              <option value="C">C</option>
              <option value="D">D</option>
              <option value="E">E</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-mono uppercase tracking-wider text-[#0C0C0C] mb-1">
              Name *
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className={`w-full px-3 py-2 input-neo text-[#0C0C0C] ${
                errors.name ? 'border-[#C94A00]' : ''
              }`}
            />
            {errors.name && <p className="text-[#C94A00] text-sm mt-1 font-mono">{errors.name}</p>}
          </div>

          <div>
            <label className="block text-sm font-mono uppercase tracking-wider text-[#0C0C0C] mb-1">
              Phone
            </label>
            <input
              type="text"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              className="w-full px-3 py-2 input-neo text-[#0C0C0C]"
            />
          </div>

          <div>
            <label className="block text-sm font-mono uppercase tracking-wider text-[#0C0C0C] mb-1">
              WhatsApp
            </label>
            <input
              type="text"
              value={formData.whatsapp}
              onChange={(e) => setFormData({ ...formData, whatsapp: e.target.value })}
              className="w-full px-3 py-2 input-neo text-[#0C0C0C]"
            />
          </div>

          <div>
            <label className="block text-sm font-mono uppercase tracking-wider text-[#0C0C0C] mb-1">
              Email
            </label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full px-3 py-2 input-neo text-[#0C0C0C]"
            />
          </div>

          <div>
            <label className="block text-sm font-mono uppercase tracking-wider text-[#0C0C0C] mb-1">
              City *
            </label>
            <input
              type="text"
              value={formData.city}
              onChange={(e) => setFormData({ ...formData, city: e.target.value })}
              className={`w-full px-3 py-2 input-neo text-[#0C0C0C] ${
                errors.city ? 'border-[#C94A00]' : ''
              }`}
            />
            {errors.city && <p className="text-[#C94A00] text-sm mt-1 font-mono">{errors.city}</p>}
          </div>

          <div>
            <label className="block text-sm font-mono uppercase tracking-wider text-[#0C0C0C] mb-1">
              Country *
            </label>
            <input
              type="text"
              value={formData.country}
              onChange={(e) => setFormData({ ...formData, country: e.target.value })}
              className={`w-full px-3 py-2 input-neo text-[#0C0C0C] ${
                errors.country ? 'border-[#C94A00]' : ''
              }`}
            />
            {errors.country && <p className="text-[#C94A00] text-sm mt-1 font-mono">{errors.country}</p>}
          </div>

          <div>
            <label className="block text-sm font-mono uppercase tracking-wider text-[#0C0C0C] mb-1">
              Contact Person
            </label>
            <input
              type="text"
              value={formData.contactPerson}
              onChange={(e) => setFormData({ ...formData, contactPerson: e.target.value })}
              className="w-full px-3 py-2 input-neo text-[#0C0C0C]"
            />
          </div>

          <div>
            <label className="block text-sm font-mono uppercase tracking-wider text-[#0C0C0C] mb-1">
              Notes
            </label>
            <textarea
              value={formData.notes}
              onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
              rows={3}
              className="w-full px-3 py-2 input-neo text-[#0C0C0C]"
            />
          </div>

          {errors.submit && <p className="text-[#C94A00] text-sm font-mono">{errors.submit}</p>}
          {errors.clientCode && <p className="text-[#C94A00] text-sm font-mono">{errors.clientCode}</p>}

          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={onCancel}
              className="btn-secondary flex-1 px-4 py-2"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="btn-primary flex-1 px-4 py-2"
            >
              Create Client
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
