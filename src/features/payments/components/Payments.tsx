import { paymentRepository, matterRepository, clientRepository } from '../../../services/dataRepository';

export function Payments() {
  const paymentsWithDetails = paymentRepository.getAll().map(payment => {
    const matter = matterRepository.getById(payment.matterId);
    const client = matter ? clientRepository.getById(matter.clientId) : null;
    return {
      ...payment,
      matter,
      client,
    };
  });

  const totalAmount = paymentsWithDetails.reduce((sum, payment) => sum + payment.amount, 0);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-4xl font-bebas font-normal text-[#0C0C0C] tracking-wider">PAYMENT RECORDS</h1>
        <button className="btn-primary px-4 py-2">
          Record Payment
        </button>
      </div>

      <div className="card-neo p-6">
        <h3 className="text-sm font-mono uppercase tracking-wider text-[#0C0C0C] mb-2 opacity-60">Total Collections</h3>
        <p className="text-4xl font-bebas font-normal text-[#0A6B52]">PKR {totalAmount.toLocaleString()}</p>
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
                Client
              </th>
              <th className="px-6 py-3 text-left text-xs font-mono uppercase tracking-wider">
                Amount
              </th>
              <th className="px-6 py-3 text-left text-xs font-mono uppercase tracking-wider">
                Method
              </th>
              <th className="px-6 py-3 text-left text-xs font-mono uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-mono uppercase tracking-wider">
                Reference
              </th>
            </tr>
          </thead>
          <tbody>
            {paymentsWithDetails.map((payment) => (
              <tr key={payment.id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-[#0C0C0C]">
                  {payment.date}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-mono text-[#0C0C0C]">
                  {payment.matterNumber}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-[#0C0C0C]">
                  {payment.client?.name || '-'}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-[#0C0C0C]">
                  PKR {payment.amount.toLocaleString()}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-[#0C0C0C]">
                  {payment.method}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">
                  <span className={`px-2 py-1 text-xs font-mono uppercase ${
                    payment.status === 'Paid' ? 'badge-complete' :
                    payment.status === 'Partial' ? 'badge-review' :
                    payment.status === 'Overpaid' ? 'badge-approved' :
                    'badge-draft'
                  }`}>
                    {payment.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-[#0C0C0C]">
                  {payment.reference || '-'}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
