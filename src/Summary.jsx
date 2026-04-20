import { formatCurrency } from './utils.js'

function Summary({ transactions }) {
  const totalIncome = transactions
    .filter(t => t.type === "income")
    .reduce((sum, t) => sum + t.amount, 0);

  const totalExpenses = transactions
    .filter(t => t.type === "expense")
    .reduce((sum, t) => sum + t.amount, 0);

  const balance = totalIncome - totalExpenses;

  return (
    <div className="summary">
      <div className="summary-card income">
        <h3>Income</h3>
        <span className="amount income-amount">${formatCurrency(totalIncome)}</span>
      </div>
      <div className="summary-card expense">
        <h3>Expenses</h3>
        <span className="amount expense-amount">${formatCurrency(totalExpenses)}</span>
      </div>
      <div className="summary-card balance">
        <h3>Balance</h3>
        <span className={`amount ${balance >= 0 ? 'balance-amount' : 'expense-amount'}`}>
          ${formatCurrency(balance)}
        </span>
      </div>
    </div>
  );
}

export default Summary
