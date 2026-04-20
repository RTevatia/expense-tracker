import { useState } from 'react'
import './App.css'
import Summary from './Summary.jsx'
import TransactionForm from './TransactionForm.jsx'
import TransactionList from './TransactionList.jsx'
import SpendingChart from './SpendingChart.jsx'

function App() {
  const [transactions, setTransactions] = useState([
    { id: crypto.randomUUID(), description: "Salary", amount: 5000, type: "income", category: "salary", date: "2025-01-01" },
    { id: crypto.randomUUID(), description: "Rent", amount: 1200, type: "expense", category: "housing", date: "2025-01-02" },
    { id: crypto.randomUUID(), description: "Groceries", amount: 150, type: "expense", category: "food", date: "2025-01-03" },
    { id: crypto.randomUUID(), description: "Freelance Work", amount: 800, type: "income", category: "salary", date: "2025-01-05" },
    { id: crypto.randomUUID(), description: "Electric Bill", amount: 95, type: "expense", category: "utilities", date: "2025-01-06" },
    { id: crypto.randomUUID(), description: "Dinner Out", amount: 65, type: "expense", category: "food", date: "2025-01-07" },
    { id: crypto.randomUUID(), description: "Gas", amount: 45, type: "expense", category: "transport", date: "2025-01-08" },
    { id: crypto.randomUUID(), description: "Netflix", amount: 15, type: "expense", category: "entertainment", date: "2025-01-10" },
  ]);

  const handleAdd = (transaction) => {
    setTransactions(prev => [...prev, transaction]);
  };

  const handleDelete = (id) => {
    setTransactions(prev => prev.filter(t => t.id !== id));
  };

  return (
    <div className="app">
      <header className="app-header">
        <h1>Finance<span className="accent">.</span></h1>
        <p className="subtitle">Track your income &amp; expenses</p>
      </header>
      <Summary transactions={transactions} />
      <TransactionForm onAdd={handleAdd} />
      <SpendingChart transactions={transactions} />
      <TransactionList transactions={transactions} onDelete={handleDelete} />
    </div>
  );
}

export default App
