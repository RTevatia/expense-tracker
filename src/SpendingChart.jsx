import { useState } from 'react';
import {
  PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer,
  BarChart, Bar, XAxis, YAxis, CartesianGrid,
} from 'recharts';

const COLORS = {
  food:          '#fb923c',
  housing:       '#818cf8',
  utilities:     '#2dd4bf',
  transport:     '#fbbf24',
  entertainment: '#f472b6',
  salary:        '#00e5a0',
  other:         '#94a3b8',
};

const CustomTooltip = ({ active, payload }) => {
  if (!active || !payload?.length) return null;
  return (
    <div style={{
      background: '#13152a',
      border: '1px solid #1c1f3a',
      borderRadius: 8,
      padding: '10px 14px',
      fontFamily: "'JetBrains Mono', monospace",
      fontSize: '0.8rem',
      color: '#dce0ff',
    }}>
      <div style={{ fontFamily: "'Mulish', sans-serif", fontWeight: 700, marginBottom: 4, color: '#7880aa', fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
        {payload[0].name}
      </div>
      <div style={{ color: COLORS[payload[0].name] || '#94a3b8' }}>
        ${payload[0].value.toFixed(2)}
      </div>
    </div>
  );
};

function SpendingChart({ transactions }) {
  const [chartType, setChartType] = useState('pie');

  const expenseByCategory = transactions
    .filter(t => t.type === 'expense')
    .reduce((acc, t) => {
      acc[t.category] = (acc[t.category] || 0) + t.amount;
      return acc;
    }, {});

  const data = Object.entries(expenseByCategory).map(([name, value]) => ({ name, value }));

  if (data.length === 0) return null;

  const axisStyle = { fill: '#525878', fontFamily: "'Mulish', sans-serif", fontSize: 12 };

  return (
    <div className="card chart-card">
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem' }}>
        <h2>Spending by Category</h2>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <span style={{ fontSize: '0.72rem', fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase', color: chartType === 'pie' ? '#dce0ff' : '#525878', transition: 'color 0.15s' }}>Pie</span>
          <button
            onClick={() => setChartType(t => t === 'pie' ? 'bar' : 'pie')}
            aria-label="Toggle chart type"
            style={{
              width: '2.75rem',
              height: '1.375rem',
              borderRadius: '9999px',
              border: 'none',
              cursor: 'pointer',
              background: chartType === 'bar' ? '#00e5a0' : '#1c1f3a',
              position: 'relative',
              transition: 'background 0.2s',
              padding: 0,
              flexShrink: 0,
            }}
          >
            <span style={{
              display: 'block',
              width: '1.0625rem',
              height: '1.0625rem',
              borderRadius: '50%',
              background: 'white',
              position: 'absolute',
              top: '0.15625rem',
              left: chartType === 'bar' ? '1.5rem' : '0.15625rem',
              transition: 'left 0.2s',
              boxShadow: '0 1px 3px rgba(0,0,0,0.4)',
            }} />
          </button>
          <span style={{ fontSize: '0.72rem', fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase', color: chartType === 'bar' ? '#dce0ff' : '#525878', transition: 'color 0.15s' }}>Bar</span>
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
              labelLine={{ stroke: '#1c1f3a' }}
            >
              {data.map((entry) => (
                <Cell key={entry.name} fill={COLORS[entry.name] || '#94a3b8'} />
              ))}
            </Pie>
            <Tooltip content={<CustomTooltip />} />
            <Legend
              formatter={(value) => (
                <span style={{ fontFamily: "'Mulish', sans-serif", fontSize: '0.8rem', color: '#7880aa' }}>{value}</span>
              )}
            />
          </PieChart>
        ) : (
          <BarChart data={data} margin={{ top: 5, right: 20, left: 10, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#1c1f3a" vertical={false} />
            <XAxis dataKey="name" tick={axisStyle} axisLine={false} tickLine={false} />
            <YAxis tickFormatter={(v) => `$${v}`} tick={axisStyle} axisLine={false} tickLine={false} />
            <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(255,255,255,0.03)' }} />
            <Bar dataKey="value" name="Amount" radius={[6, 6, 0, 0]}>
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
