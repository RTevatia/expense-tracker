import { useState } from 'react'

const categories = ["food", "housing", "utilities", "transport", "entertainment", "salary", "other"];

const BADGE = {
  food:          { background: 'rgba(249,115,22,0.15)',  color: '#fb923c' },
  housing:       { background: 'rgba(99,102,241,0.15)',  color: '#818cf8' },
  utilities:     { background: 'rgba(20,184,166,0.15)',  color: '#2dd4bf' },
  transport:     { background: 'rgba(245,158,11,0.15)',  color: '#fbbf24' },
  entertainment: { background: 'rgba(236,72,153,0.15)',  color: '#f472b6' },
  salary:        { background: 'rgba(0,229,160,0.15)',   color: '#00e5a0' },
  other:         { background: 'rgba(148,163,184,0.12)', color: '#94a3b8' },
};

function TransactionList({ transactions, onDelete }) {
  const [filterType, setFilterType] = useState("all");
  const [filterCategory, setFilterCategory] = useState("all");

  let filtered = transactions;
  if (filterType !== "all") filtered = filtered.filter(t => t.type === filterType);
  if (filterCategory !== "all") filtered = filtered.filter(t => t.category === filterCategory);

  return (
    <div className="transactions">
      <div className="transactions-header">
        <h2>Transactions</h2>
        <div className="filters">
          <select value={filterType} onChange={(e) => setFilterType(e.target.value)}>
            <option value="all">All Types</option>
            <option value="income">Income</option>
            <option value="expense">Expense</option>
          </select>
          <select value={filterCategory} onChange={(e) => setFilterCategory(e.target.value)}>
            <option value="all">All Categories</option>
            {categories.map(cat => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </div>
      </div>

      <table>
        <thead>
          <tr>
            <th>Date</th>
            <th>Description</th>
            <th>Category</th>
            <th>Amount</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {filtered.map(t => (
            <tr key={t.id}>
              <td className="date-cell">{t.date}</td>
              <td>{t.description}</td>
              <td>
                <span className="category-badge" style={BADGE[t.category] || BADGE.other}>
                  {t.category}
                </span>
              </td>
              <td className={`amount-cell ${t.type === 'income' ? 'income-amount' : 'expense-amount'}`}>
                {t.type === 'income' ? '+' : '−'}${t.amount.toLocaleString()}
              </td>
              <td>
                <button
                  className="delete-btn"
                  onClick={() => { if (window.confirm('Delete this transaction?')) onDelete(t.id); }}
                >✕</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default TransactionList
