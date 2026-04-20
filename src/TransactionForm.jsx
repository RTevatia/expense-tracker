import { useState } from 'react'
import { CATEGORIES } from './constants.js'

function TransactionForm({ onAdd }) {
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");
  const [type, setType] = useState("expense");
  const [category, setCategory] = useState(CATEGORIES[0]);
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const parsedAmount = parseFloat(amount);

    if (!description.trim()) {
      setError("Please enter a description.");
      return;
    }
    if (isNaN(parsedAmount) || parsedAmount <= 0) {
      setError("Please enter a valid amount greater than zero.");
      return;
    }

    setError("");
    onAdd({
      id: crypto.randomUUID(),
      description: description.trim(),
      amount: parsedAmount,
      type,
      category,
      date: new Date().toISOString().split('T')[0],
    });

    setDescription("");
    setAmount("");
    setType("expense");
    setCategory(CATEGORIES[0]);
  };

  return (
    <div className="add-transaction">
      <h2>Add Transaction</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Description"
          value={description}
          onChange={(e) => { setDescription(e.target.value); setError(""); }}
          aria-label="Transaction description"
        />
        <input
          type="number"
          placeholder="Amount"
          value={amount}
          min="0.01"
          step="0.01"
          onChange={(e) => { setAmount(e.target.value); setError(""); }}
          aria-label="Transaction amount"
        />
        <div className="type-toggle">
          <button
            type="button"
            className={`type-btn ${type === 'income' ? 'active-income' : ''}`}
            onClick={() => setType('income')}
            aria-pressed={type === 'income'}
          >Income</button>
          <button
            type="button"
            className={`type-btn ${type === 'expense' ? 'active-expense' : ''}`}
            onClick={() => setType('expense')}
            aria-pressed={type === 'expense'}
          >Expense</button>
        </div>
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          aria-label="Category"
        >
          {CATEGORIES.map(cat => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>
        <button type="submit">Add</button>
      </form>
      {error && <p className="form-error">{error}</p>}
    </div>
  );
}

export default TransactionForm
