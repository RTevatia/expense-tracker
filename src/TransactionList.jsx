import { useState, useMemo } from 'react'
import { CATEGORIES, CATEGORY_BADGE } from './constants.js'
import { formatCurrency } from './utils.js'

function TransactionList({ transactions, onDelete }) {
  const [filterType, setFilterType] = useState("all");
  const [filterCategory, setFilterCategory] = useState("all");
  const [pendingDelete, setPendingDelete] = useState(null);

  const filtered = useMemo(() => {
    let result = transactions;
    if (filterType !== "all") result = result.filter(t => t.type === filterType);
    if (filterCategory !== "all") result = result.filter(t => t.category === filterCategory);
    return result;
  }, [transactions, filterType, filterCategory]);

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
            {CATEGORIES.map(cat => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </div>
      </div>

      <table>
        <thead>
          <tr>
            <th scope="col">Date</th>
            <th scope="col">Description</th>
            <th scope="col">Category</th>
            <th scope="col">Amount</th>
            <th scope="col"><span className="sr-only">Actions</span></th>
          </tr>
        </thead>
        <tbody>
          {filtered.length === 0 ? (
            <tr>
              <td colSpan={5} className="empty-state">No transactions match your filters.</td>
            </tr>
          ) : filtered.map(t => (
            <tr key={t.id}>
              <td className="date-cell">{t.date}</td>
              <td>{t.description}</td>
              <td>
                <span className="category-badge" style={CATEGORY_BADGE[t.category] || CATEGORY_BADGE.other}>
                  {t.category}
                </span>
              </td>
              <td className={`amount-cell ${t.type === 'income' ? 'income-amount' : 'expense-amount'}`}>
                {t.type === 'income' ? '+' : '−'}${formatCurrency(t.amount)}
              </td>
              <td>
                {pendingDelete === t.id ? (
                  <span className="delete-confirm">
                    <button
                      className="confirm-btn"
                      onClick={() => { onDelete(t.id); setPendingDelete(null); }}
                    >Confirm</button>
                    <button
                      className="cancel-btn"
                      onClick={() => setPendingDelete(null)}
                    >Cancel</button>
                  </span>
                ) : (
                  <button
                    className="delete-btn"
                    aria-label="Delete transaction"
                    onClick={() => setPendingDelete(t.id)}
                  >✕</button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default TransactionList
