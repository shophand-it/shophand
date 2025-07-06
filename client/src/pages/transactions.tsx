import Sidebar from '../components/Sidebar'; // Make sure this is at the top of your file

return (
  <div style={{ display: 'flex' }}>
    <Sidebar />

    <main style={{ marginLeft: '220px', padding: '2rem', flex: 1 }}>
      <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '1rem' }}>
        Transaction Logs
      </h2>

      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead style={{ backgroundColor: '#f9f9f9' }}>
          <tr>
            <th style={thStyle}>Buyer</th>
            <th style={thStyle}>Vendor</th>
            <th style={thStyle}>Amount</th>
            <th style={thStyle}>Method</th>
            <th style={thStyle}>Status</th>
            <th style={thStyle}>Date</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((tx, i) => (
            <tr key={i}>
              <td style={tdStyle}>{tx.userId || 'N/A'}</td>
              <td style={tdStyle}>{tx.vendorId || 'N/A'}</td>
              <td style={tdStyle}>${tx.amount?.toFixed(2)}</td>
              <td style={tdStyle}>{tx.paymentMethod}</td>
              <td style={tdStyle}>{tx.status}</td>
              <td style={tdStyle}>
                {tx.createdAt ? new Date(tx.createdAt).toLocaleString() : 'N/A'}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </main>
  </div>
);