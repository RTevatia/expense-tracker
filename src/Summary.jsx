function Summary({ transactions }) {
  const totalIncome = transactions
    .filter(t => t.type === "income")
    .reduce((sum, t) => sum + parseFloat(t.amount), 0);

  const totalExpenses = transactions
    .filter(t => t.type === "expense")
    .reduce((sum, t) => sum + parseFloat(t.amount), 0);

  const balance = totalIncome - totalExpenses;

  return (
    <div className="summary">
      <div className="summary-card income">
        <h3>Income</h3>
        <span className="amount income-amount">${totalIncome.toLocaleString()}</span>
      </div>
      <div className="summary-card expense">
        <h3>Expenses</h3>
        <span className="amount expense-amount">${totalExpenses.toLocaleString()}</span>
      </div>
      <div className="summary-card balance">
        <h3>Balance</h3>
        <span className="amount balance-amount">${balance.toLocaleString()}</span>
      </div>
    </div>
  );
}

export default Summary
