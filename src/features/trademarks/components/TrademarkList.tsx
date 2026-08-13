import { trademarkRepository } from '../../../services/dataRepository';

export function TrademarkList() {
  const trademarks = trademarkRepository.getAll();

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-4xl font-bebas font-normal text-[#0C0C0C] tracking-wider">TRADEMARKS</h1>
        <button className="btn-primary px-4 py-2">
          Add Trademark
        </button>
      </div>

      <div className="card-neo overflow-hidden">
        <table className="table-neo min-w-full">
          <thead>
            <tr>
              <th className="px-6 py-3 text-left text-xs font-mono uppercase tracking-wider">
                Date
              </th>
              <th className="px-6 py-3 text-left text-xs font-mono uppercase tracking-wider">
                Case No
              </th>
              <th className="px-6 py-3 text-left text-xs font-mono uppercase tracking-wider">
                TM No
              </th>
              <th className="px-6 py-3 text-left text-xs font-mono uppercase tracking-wider">
                TM Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-mono uppercase tracking-wider">
                Class
              </th>
              <th className="px-6 py-3 text-left text-xs font-mono uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-mono uppercase tracking-wider">
                Sub-Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-mono uppercase tracking-wider">
                Applicant
              </th>
              <th className="px-6 py-3 text-left text-xs font-mono uppercase tracking-wider">
                City
              </th>
              <th className="px-6 py-3 text-left text-xs font-mono uppercase tracking-wider">
                Image
              </th>
            </tr>
          </thead>
          <tbody>
            {trademarks.map((tm) => (
              <tr key={tm.id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-[#0C0C0C]">
                  {new Date(tm.createdAt).toLocaleDateString()}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-mono text-[#0C0C0C]">
                  {tm.matterNumber}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-[#0C0C0C]">
                  {tm.trademarkNumber || '-'}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-[#0C0C0C]">
                  {tm.trademarkName}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-[#0C0C0C]">
                  {tm.class}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">
                  <span className={`px-2 py-1 text-xs font-mono uppercase ${
                    tm.status === 'Certificate Delivered' ? 'badge-complete' :
                    tm.status === 'Examination' || tm.status === 'Hearing' ? 'badge-review' :
                    'badge-published'
                  }`}>
                    {tm.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-[#0C0C0C]">
                  {tm.subStatus || '-'}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-[#0C0C0C]">
                  {tm.applicantName}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-[#0C0C0C]">
                  {tm.city}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-[#0C0C0C]">
                  {tm.imageUrl ? '📷' : '-'}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
