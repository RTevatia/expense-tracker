# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev       # Start dev server at http://localhost:5173
npm run build     # Production build
npm run preview   # Preview production build
npm run lint      # Run ESLint
```

No test runner is configured.

## Architecture

Vite + React 19 app. `App.jsx` is the sole stateful component; the rest are presentational.

**Component tree:**
```
App
├── Summary          — computes and displays income/expense/balance totals
├── TransactionForm  — owns form state; calls onAdd(transaction) prop on submit
└── TransactionList  — owns filter state; receives transactions as prop
```

**State ownership:**
- `transactions` (`App`) — array of `{ id, description, amount, type, category, date }`. `amount` is a number. No persistence — resets on page reload.
- Form fields (`TransactionForm`) — local controlled state, reset after submit.
- `filterType` / `filterCategory` (`TransactionList`) — local filter state.

**Categories** are a hardcoded array defined in both `TransactionForm.jsx` and `TransactionList.jsx`: `["food", "housing", "utilities", "transport", "entertainment", "salary", "other"]`.

**CSS:** `src/App.css` uses `.income-amount` / `.expense-amount` / `.balance-amount` classes for color-coded amounts.
