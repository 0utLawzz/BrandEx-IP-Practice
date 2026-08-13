import { useState } from 'react';
import { ledgerRepository, matterRepository } from '../../../services/dataRepository';
import { validatePositiveAmount, validateNonNegativeAmount } from '../../../lib/businessLogic';

interface AddLedgerEntryFormProps {
  matterId?: string;
  onSuccess: () => void;
  onCancel: () => void;
}

export function AddLedgerEntryForm({ matterId: propMatterId, onSuccess, onCancel }: AddLedgerEntryFormProps) {
  const [formData, setFormData] = useState({
    matterId: propMatterId || '',
    date: new Date().toISOString().split('T')[0],
    trademarkNumber: '',
    applicantName: '',
    class: '',
    due: '',
    received: '',
    discount: '',
    notes: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const matters = matterRepository.getAll();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: Record<string, string> = {};

    // Validation
    if (!formData.matterId) {
      newErrors.matterId = 'Matter is required';
    }
    if (!formData.date) {
      newErrors.date = 'Date is required';
    }
    if (!formData.applicantName.trim()) {
      newErrors.applicantName = 'Applicant name is required';
    }
    
    const due = parseFloat(formData.due);
    if (!formData.due || isNaN(due) || !validatePositiveAmount(due)) {
      newErrors.due = 'Due amount must be a positive number';
    }

    const received = parseFloat(formData.received) || 0;
    if (formData.received && (isNaN(received) || !validateNonNegativeAmount(received))) {
      newErrors.received = 'Received amount must be a non-negative number';
    }

    const discount = parseFloat(formData.discount) || 0;
    if (formData.discount && (isNaN(discount) || !validateNonNegativeAmount(discount))) {
      newErrors.discount = 'Discount must be a non-negative number';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    // Get matter
    const matter = matterRepository.getById(formData.matterId);
    if (!matter) {
      setErrors({ matterId: 'Invalid matter' });
      return;
    }

    // Create ledger entry
    try {
      ledgerRepository.create({
        matterId: formData.matterId,
        matterNumber: matter.fullMatterNumber,
        date: formData.date,
        trademarkNumber: formData.trademarkNumber || undefined,
        applicantName: formData.applicantName,
        class: formData.class ? parseInt(formData.class, 10) : undefined,
        due,
        received,
        discount: discount || undefined,
        notes: formData.notes || undefined,
      });

      onSuccess();
    } catch {
      setErrors({ submit: 'Failed to create ledger entry' });
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="card-neo p-6 w-full max-w-md">
        <h2 className="text-2xl font-bebas font-normal text-[#0C0C0C] tracking-wider mb-4">ADD LEDGER ENTRY</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-mono uppercase tracking-wider text-[#0C0C0C] mb-1">
              Matter *
            </label>
            <select
              value={formData.matterId}
              onChange={(e) => setFormData({ ...formData, matterId: e.target.value })}
              disabled={!!propMatterId}
              className={`w-full px-3 py-2 input-neo text-[#0C0C0C] ${
                errors.matterId ? 'border-[#C94A00]' : ''
              } ${propMatterId ? 'bg-[#E8DFC7]' : ''}`}
            >
              <option value="">Select a matter</option>
              {matters.map((matter) => (
                <option key={matter.id} value={matter.id}>
                  {matter.fullMatterNumber} - {matter.title}
                </option>
              ))}
            </select>
            {errors.matterId && <p className="text-[#C94A00] text-sm mt-1 font-mono">{errors.matterId}</p>}
          </div>

          <div>
            <label className="block text-sm font-mono uppercase tracking-wider text-[#0C0C0C] mb-1">
              Date *
            </label>
            <input
              type="date"
              value={formData.date}
              onChange={(e) => setFormData({ ...formData, date: e.target.value })}
              className={`w-full px-3 py-2 input-neo text-[#0C0C0C] ${
                errors.date ? 'border-[#C94A00]' : ''
              }`}
            />
            {errors.date && <p className="text-[#C94A00] text-sm mt-1 font-mono">{errors.date}</p>}
          </div>

          <div>
            <label className="block text-sm font-mono uppercase tracking-wider text-[#0C0C0C] mb-1">
              Trademark Number
            </label>
            <input
              type="text"
              value={formData.trademarkNumber}
              onChange={(e) => setFormData({ ...formData, trademarkNumber: e.target.value })}
              className="w-full px-3 py-2 input-neo text-[#0C0C0C]"
            />
          </div>

          <div>
            <label className="block text-sm font-mono uppercase tracking-wider text-[#0C0C0C] mb-1">
              Applicant Name *
            </label>
            <input
              type="text"
              value={formData.applicantName}
              onChange={(e) => setFormData({ ...formData, applicantName: e.target.value })}
              className={`w-full px-3 py-2 input-neo text-[#0C0C0C] ${
                errors.applicantName ? 'border-[#C94A00]' : ''
              }`}
            />
            {errors.applicantName && <p className="text-[#C94A00] text-sm mt-1 font-mono">{errors.applicantName}</p>}
          </div>

          <div>
            <label className="block text-sm font-mono uppercase tracking-wider text-[#0C0C0C] mb-1">
              Class
            </label>
            <input
              type="number"
              value={formData.class}
              onChange={(e) => setFormData({ ...formData, class: e.target.value })}
              className="w-full px-3 py-2 input-neo text-[#0C0C0C]"
            />
          </div>

          <div>
            <label className="block text-sm font-mono uppercase tracking-wider text-[#0C0C0C] mb-1">
              Due Amount *
            </label>
            <input
              type="number"
              step="0.01"
              value={formData.due}
              onChange={(e) => setFormData({ ...formData, due: e.target.value })}
              className={`w-full px-3 py-2 input-neo text-[#0C0C0C] ${
                errors.due ? 'border-[#C94A00]' : ''
              }`}
            />
            {errors.due && <p className="text-[#C94A00] text-sm mt-1 font-mono">{errors.due}</p>}
          </div>

          <div>
            <label className="block text-sm font-mono uppercase tracking-wider text-[#0C0C0C] mb-1">
              Received Amount
            </label>
            <input
              type="number"
              step="0.01"
              value={formData.received}
              onChange={(e) => setFormData({ ...formData, received: e.target.value })}
              className={`w-full px-3 py-2 input-neo text-[#0C0C0C] ${
                errors.received ? 'border-[#C94A00]' : ''
              }`}
            />
            {errors.received && <p className="text-[#C94A00] text-sm mt-1 font-mono">{errors.received}</p>}
          </div>

          <div>
            <label className="block text-sm font-mono uppercase tracking-wider text-[#0C0C0C] mb-1">
              Discount
            </label>
            <input
              type="number"
              step="0.01"
              value={formData.discount}
              onChange={(e) => setFormData({ ...formData, discount: e.target.value })}
              className={`w-full px-3 py-2 input-neo text-[#0C0C0C] ${
                errors.discount ? 'border-[#C94A00]' : ''
              }`}
            />
            {errors.discount && <p className="text-[#C94A00] text-sm mt-1 font-mono">{errors.discount}</p>}
          </div>

          <div>
            <label className="block text-sm font-mono uppercase tracking-wider text-[#0C0C0C] mb-1">
              Notes
            </label>
            <textarea
              value={formData.notes}
              onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
              rows={2}
              className="w-full px-3 py-2 input-neo text-[#0C0C0C]"
            />
          </div>

          {errors.submit && <p className="text-[#C94A00] text-sm font-mono">{errors.submit}</p>}

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
              Add Entry
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
