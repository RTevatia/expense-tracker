import { useState } from 'react';
import {
  PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer,
  BarChart, Bar, XAxis, YAxis, CartesianGrid,
} from 'recharts';

const COLORS = {
  food: '#f97316',
  housing: '#6366f1',
  utilities: '#14b8a6',
  transport: '#f59e0b',
  entertainment: '#ec4899',
  salary: '#22c55e',
  other: '#94a3b8',
};

function SpendingChart({ transactions }) {
  const [chartType, setChartType] = useState('pie');

  const expenseByCategory = transactions
    .filter(t => t.type === 'expense')
    .reduce((acc, t) => {
      acc[t.category] = (acc[t.category] || 0) + t.amount;
      return acc;
    }, {});

  const data = Object.entries(expenseByCategory).map(([name, value]) => ({
    name,
    value,
  }));

  if (data.length === 0) return null;

  return (
    <div className="card">
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
        <h2 style={{ margin: 0 }}>Spending by Category</h2>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.875rem' }}>
          <span style={{ color: chartType === 'pie' ? '#6366f1' : '#94a3b8' }}>Pie</span>
          <button
            onClick={() => setChartType(t => t === 'pie' ? 'bar' : 'pie')}
            style={{
              width: '2.5rem',
              height: '1.25rem',
              borderRadius: '9999px',
              border: 'none',
              cursor: 'pointer',
              background: chartType === 'bar' ? '#6366f1' : '#cbd5e1',
              position: 'relative',
              transition: 'background 0.2s',
              padding: 0,
            }}
            aria-label="Toggle chart type"
          >
            <span style={{
              display: 'block',
              width: '1rem',
              height: '1rem',
              borderRadius: '50%',
              background: 'white',
              position: 'absolute',
              top: '0.125rem',
              left: chartType === 'bar' ? '1.375rem' : '0.125rem',
              transition: 'left 0.2s',
            }} />
          </button>
          <span style={{ color: chartType === 'bar' ? '#6366f1' : '#94a3b8' }}>Bar</span>
        </div>
      </div>

      <ResponsiveContainer width="100%" height={300}>
        {chartType === 'pie' ? (
          <PieChart>
            <Pie
              data={data}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={100}
              label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
            >
              {data.map((entry) => (
                <Cell key={entry.name} fill={COLORS[entry.name] || '#94a3b8'} />
              ))}
            </Pie>
            <Tooltip formatter={(value) => `$${value.toFixed(2)}`} />
            <Legend />
          </PieChart>
        ) : (
          <BarChart data={data} margin={{ top: 5, right: 20, left: 10, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis tickFormatter={(v) => `$${v}`} />
            <Tooltip formatter={(value) => `$${value.toFixed(2)}`} />
            <Bar dataKey="value" name="Amount" radius={[4, 4, 0, 0]}>
              {data.map((entry) => (
                <Cell key={entry.name} fill={COLORS[entry.name] || '#94a3b8'} />
              ))}
            </Bar>
          </BarChart>
        )}
      </ResponsiveContainer>
    </div>
  );
}

export default SpendingChart;
