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

This is a single-component React app (Vite + React 19). All logic lives in `src/App.jsx` — there are no sub-components, routing, or external state management.

**State in `App.jsx`:**
- `transactions` — array of `{ id, description, amount, type, category, date }`. `amount` is stored as a string; arithmetic uses implicit coercion (known bug: totals will be wrong if `parseFloat` is not applied).
- `filterType` / `filterCategory` — derived filter state, applied inline before render.
- Form fields (`description`, `amount`, `type`, `category`) — controlled inputs reset on submit.

**Categories** are a hardcoded array: `["food", "housing", "utilities", "transport", "entertainment", "salary", "other"]`. No persistence — state resets on page reload.

**CSS:** `src/App.css` uses `.income-amount` / `.expense-amount` / `.balance-amount` classes for color-coded amounts.
