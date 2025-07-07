import React, { useEffect, useState } from 'react';
import axios from 'axios';

interface Transaction {
  _id: string;
  userId: string;
  amount: number;
  status: string;
  paymentMethod: string;
  createdAt: string;
}

const Transactions: React.FC = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/transactions`);
        setTransactions(res.data);
      } catch (err) {
        setError('Unable to fetch transactions. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchTransactions();
  }, []);

  return (
    <div className="min-h-screen px-4 md:px-10 py-8 bg-gray-50">
      <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">Payment Transactions</h1>

      {loading && <p className="text-center text-gray-500">Loading transactions...</p>}
      {error && <p className="text-center text-red-500">{error}</p>}
      {!loading && transactions.length === 0 && !error && (
        <p className="text-center text-gray-500">No transactions available.</p>
      )}

      <div className="overflow-x-auto mt-4">
        <table className="min-w-full bg-white rounded shadow-md">
          <thead>
            <tr className="text-left bg-gray-200 text-sm uppercase tracking-wider text-gray-600">
              <th className="py-3 px-4">Txn ID</th>
              <th className="py-3 px-4">User ID</th>
              <th className="py-3 px-4">Amount</th>
              <th className="py-3 px-4">Method</th>
              <th className="py-3 px-4">Status</th>
              <th className="py-3 px-4">Date</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((txn) => (
              <tr
                key={txn._id}
                className="border-t hover:bg-gray-50 transition-all"
              >
                <td className="py-2 px-4 text-sm text-gray-800">{txn._id.slice(-6)}</td>
                <td className="py-2 px-4 text-sm text-gray-700">{txn.userId.slice(-6)}</td>
                <td className="py-2 px-4 text-sm font-semibold text-green-600">
                  ${txn.amount.toFixed(2)}
                </td>
                <td className="py-2 px-4 text-sm text-gray-600 capitalize">
                  {txn.paymentMethod}
                </td>
                <td className="py-2 px-4 text-sm">
                  <span
                    className={`inline-block px-3 py-1 text-xs font-medium rounded-full ${
                      txn.status === 'succeeded'
                        ? 'bg-green-100 text-green-800'
                        : 'bg-yellow-100 text-yellow-800'
                    }`}
                  >
                    {txn.status}
                  </span>
                </td>
                <td className="py-2 px-4 text-sm text-gray-500">
                  {new Date(txn.createdAt).toLocaleDateString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Transactions;