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
        <h1 className="text-3xl font-bold text-slate-900 dark:text-slate-50">Payment Records</h1>
        <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
          Record Payment
        </button>
      </div>

      <div className="bg-white dark:bg-slate-800 rounded-lg shadow p-6">
        <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-50 mb-2">Total Collections</h3>
        <p className="text-2xl font-bold text-green-600 dark:text-green-400">PKR {totalAmount.toLocaleString()}</p>
      </div>

      <div className="bg-white dark:bg-slate-800 rounded-lg shadow overflow-hidden">
        <table className="min-w-full divide-y divide-slate-200 dark:divide-slate-700">
          <thead className="bg-slate-50 dark:bg-slate-900">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                Date
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                Case No
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                Client
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                Amount
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                Method
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                Reference
              </th>
            </tr>
          </thead>
          <tbody className="bg-white dark:bg-slate-800 divide-y divide-slate-200 dark:divide-slate-700">
            {paymentsWithDetails.map((payment) => (
              <tr key={payment.id} className="hover:bg-slate-50 dark:hover:bg-slate-700">
                <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-900 dark:text-slate-50">
                  {payment.date}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-700 dark:text-slate-300">
                  {payment.matterNumber}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-700 dark:text-slate-300">
                  {payment.client?.name || '-'}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-700 dark:text-slate-300">
                  PKR {payment.amount.toLocaleString()}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-700 dark:text-slate-300">
                  {payment.method}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">
                  <span className={`px-2 py-1 rounded-full text-xs ${
                    payment.status === 'Paid' ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' :
                    payment.status === 'Partial' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200' :
                    payment.status === 'Overpaid' ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200' :
                    'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
                  }`}>
                    {payment.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-700 dark:text-slate-300">
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
