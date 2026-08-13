import { useState } from 'react';
import { trademarkRepository, matterRepository } from '../../../services/dataRepository';
import type { TrademarkStatus } from '../../../types';

interface CreateTrademarkFormProps {
  initialMatterId?: string;
  onSuccess: () => void;
  onCancel: () => void;
}

export function CreateTrademarkForm({ initialMatterId, onSuccess, onCancel }: CreateTrademarkFormProps) {
  const matters = matterRepository.getAll();
  
  const [formData, setFormData] = useState({
    matterId: initialMatterId || (matters[0]?.id || ''),
    trademarkNumber: '',
    trademarkName: '',
    class: 3,
    classDescription: '',
    applicantName: '',
    fatherName: '',
    cnic: '',
    tradingBusiness: '',
    address: '',
    attorney: '',
    status: 'Filed' as TrademarkStatus,
    subStatus: '',
    city: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: Record<string, string> = {};

    if (!formData.matterId) {
      newErrors.matterId = 'Matter is required';
    }
    if (!formData.trademarkName.trim()) {
      newErrors.trademarkName = 'Trademark name is required';
    }
    if (!formData.applicantName.trim()) {
      newErrors.applicantName = 'Applicant name is required';
    }
    if (!formData.address.trim()) {
      newErrors.address = 'Address is required';
    }
    if (!formData.city.trim()) {
      newErrors.city = 'City is required';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    const matter = matterRepository.getById(formData.matterId);
    if (!matter) {
      setErrors({ matterId: 'Selected matter not found' });
      return;
    }

    try {
      trademarkRepository.create({
        matterId: formData.matterId,
        matterNumber: matter.fullMatterNumber,
        trademarkNumber: formData.trademarkNumber || undefined,
        trademarkName: formData.trademarkName,
        class: Number(formData.class),
        classDescription: formData.classDescription || undefined,
        applicantName: formData.applicantName,
        fatherName: formData.fatherName || undefined,
        cnic: formData.cnic || undefined,
        tradingBusiness: formData.tradingBusiness || undefined,
        address: formData.address,
        attorney: formData.attorney || undefined,
        status: formData.status,
        subStatus: formData.subStatus || undefined,
        city: formData.city,
      });

      onSuccess();
    } catch {
      setErrors({ submit: 'Failed to create trademark' });
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 overflow-y-auto">
      <div className="card-neo p-6 w-full max-w-lg my-8">
        <h2 className="text-2xl font-bebas font-normal text-[#0C0C0C] tracking-wider mb-4">ADD NEW TRADEMARK</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-mono uppercase tracking-wider text-[#0C0C0C] mb-1">
              Matter / Case *
            </label>
            <select
              value={formData.matterId}
              onChange={(e) => setFormData({ ...formData, matterId: e.target.value })}
              className={`w-full px-3 py-2 input-neo text-[#0C0C0C] ${errors.matterId ? 'border-[#C94A00]' : ''}`}
            >
              <option value="">Select Matter</option>
              {matters.map((m) => (
                <option key={m.id} value={m.id}>
                  {m.fullMatterNumber} — {m.title}
                </option>
              ))}
            </select>
            {errors.matterId && <p className="text-[#C94A00] text-sm mt-1 font-mono">{errors.matterId}</p>}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-mono uppercase tracking-wider text-[#0C0C0C] mb-1">
                TM Name *
              </label>
              <input
                type="text"
                value={formData.trademarkName}
                onChange={(e) => setFormData({ ...formData, trademarkName: e.target.value })}
                className={`w-full px-3 py-2 input-neo text-[#0C0C0C] ${errors.trademarkName ? 'border-[#C94A00]' : ''}`}
              />
              {errors.trademarkName && <p className="text-[#C94A00] text-sm mt-1 font-mono">{errors.trademarkName}</p>}
            </div>

            <div>
              <label className="block text-sm font-mono uppercase tracking-wider text-[#0C0C0C] mb-1">
                TM Number
              </label>
              <input
                type="text"
                value={formData.trademarkNumber}
                onChange={(e) => setFormData({ ...formData, trademarkNumber: e.target.value })}
                className="w-full px-3 py-2 input-neo text-[#0C0C0C]"
                placeholder="e.g. 545457"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-mono uppercase tracking-wider text-[#0C0C0C] mb-1">
                Class *
              </label>
              <input
                type="number"
                min="1"
                max="45"
                value={formData.class}
                onChange={(e) => setFormData({ ...formData, class: Number(e.target.value) })}
                className="w-full px-3 py-2 input-neo text-[#0C0C0C]"
              />
            </div>

            <div>
              <label className="block text-sm font-mono uppercase tracking-wider text-[#0C0C0C] mb-1">
                Class Description
              </label>
              <input
                type="text"
                value={formData.classDescription}
                onChange={(e) => setFormData({ ...formData, classDescription: e.target.value })}
                className="w-full px-3 py-2 input-neo text-[#0C0C0C]"
                placeholder="e.g. Cosmetics"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-mono uppercase tracking-wider text-[#0C0C0C] mb-1">
                Applicant Name *
              </label>
              <input
                type="text"
                value={formData.applicantName}
                onChange={(e) => setFormData({ ...formData, applicantName: e.target.value })}
                className={`w-full px-3 py-2 input-neo text-[#0C0C0C] ${errors.applicantName ? 'border-[#C94A00]' : ''}`}
              />
              {errors.applicantName && <p className="text-[#C94A00] text-sm mt-1 font-mono">{errors.applicantName}</p>}
            </div>

            <div>
              <label className="block text-sm font-mono uppercase tracking-wider text-[#0C0C0C] mb-1">
                Father Name
              </label>
              <input
                type="text"
                value={formData.fatherName}
                onChange={(e) => setFormData({ ...formData, fatherName: e.target.value })}
                className="w-full px-3 py-2 input-neo text-[#0C0C0C]"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-mono uppercase tracking-wider text-[#0C0C0C] mb-1">
                CNIC
              </label>
              <input
                type="text"
                value={formData.cnic}
                onChange={(e) => setFormData({ ...formData, cnic: e.target.value })}
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
                className={`w-full px-3 py-2 input-neo text-[#0C0C0C] ${errors.city ? 'border-[#C94A00]' : ''}`}
              />
              {errors.city && <p className="text-[#C94A00] text-sm mt-1 font-mono">{errors.city}</p>}
            </div>
          </div>

          <div>
            <label className="block text-sm font-mono uppercase tracking-wider text-[#0C0C0C] mb-1">
              Address *
            </label>
            <input
              type="text"
              value={formData.address}
              onChange={(e) => setFormData({ ...formData, address: e.target.value })}
              className={`w-full px-3 py-2 input-neo text-[#0C0C0C] ${errors.address ? 'border-[#C94A00]' : ''}`}
            />
            {errors.address && <p className="text-[#C94A00] text-sm mt-1 font-mono">{errors.address}</p>}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-mono uppercase tracking-wider text-[#0C0C0C] mb-1">
                Status
              </label>
              <select
                value={formData.status}
                onChange={(e) => setFormData({ ...formData, status: e.target.value as TrademarkStatus })}
                className="w-full px-3 py-2 input-neo text-[#0C0C0C]"
              >
                <option value="Filed">Filed</option>
                <option value="Acknowledged">Acknowledged</option>
                <option value="Examination">Examination</option>
                <option value="Hearing">Hearing</option>
                <option value="Published">Published</option>
                <option value="Approved">Approved</option>
                <option value="Certificate">Certificate</option>
                <option value="Certificate Delivered">Certificate Delivered</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-mono uppercase tracking-wider text-[#0C0C0C] mb-1">
                Sub-Status
              </label>
              <input
                type="text"
                value={formData.subStatus}
                onChange={(e) => setFormData({ ...formData, subStatus: e.target.value })}
                className="w-full px-3 py-2 input-neo text-[#0C0C0C]"
              />
            </div>
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
              Create Trademark
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
