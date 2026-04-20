---
name: Codebase Architecture
description: Core architectural facts about the expense-tracker app that inform all reviews
type: project
---

Vite + React 19 single-page expense tracker.

**Why:** Learning project, small scope. No persistence, no test runner.
**How to apply:** Keep suggestions proportionate — no Redux, no virtualization, no enterprise patterns.

Key facts:
- `App.jsx` is the sole stateful component; all others are presentational.
- Transaction shape: `{ id, description, amount (number), type, category, date }`.
- `categories` array is defined identically in both `TransactionForm.jsx` and `TransactionList.jsx` — known duplication, always flag it.
- `BADGE` color map in `TransactionList.jsx` and `COLORS` map in `SpendingChart.jsx` use identical category keys but different values — both are local to their files.
- CSS classes `.income-amount` / `.expense-amount` / `.balance-amount` are established conventions for color-coded amounts.
- `.balance-amount` is styled with `var(--gold)` regardless of whether the balance is negative — this is a visual bug.
- `SpendingChart.jsx` is heavily styled with inline styles rather than CSS classes — technical debt for the chart card UI chrome.
- No shared constants file exists. `categories`, `BADGE`, `COLORS` are all file-local.
- recharts is the charting library.
- `Date.now()` is used as the transaction ID — risk of collision if two transactions are added very quickly (unlikely in practice for this app size).
