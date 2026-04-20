---
name: Recurring Issues
description: Patterns and bugs that appear across multiple files, worth flagging in any review
type: project
---

Issues observed in the initial full-codebase review (2026-04-19):

**Why:** These patterns were found in the first full review and are likely to persist or recur as the codebase evolves.
**How to apply:** Flag these whenever reviewing any file they appear in, even if reviewing a different feature.

1. `parseFloat()` defensive guard in `Summary.jsx` — amounts are already stored as numbers per the architecture contract; `parseFloat` is redundant. If a string ever slips through, it signals a data-entry bug in `TransactionForm.jsx` that should be fixed at the source, not papered over in `Summary`.

2. `Date.now()` as transaction ID — technically safe for this scale but semantically fragile. `crypto.randomUUID()` is the modern, correct alternative.

3. `categories` array duplicated in `TransactionForm.jsx` (line 3) and `TransactionList.jsx` (line 3) — should be extracted to a shared `src/constants.js`.

4. `BADGE` (TransactionList) and `COLORS` (SpendingChart) use the same category keys but are separate — both could reference a shared palette in constants.

5. `balance-amount` CSS class always renders gold (`var(--gold)`) even when balance is negative — visually misleading.

6. `window.confirm()` in `TransactionList.jsx` for delete confirmation — blocks the main thread, not accessible, clashes with the custom dark-theme UI. Should be replaced with an inline confirmation UI.

7. Inline styles throughout `SpendingChart.jsx` for the chart toggle UI chrome — should be CSS classes.

8. No `<label>` elements in `TransactionForm.jsx` — accessibility gap.

9. `toLocaleString()` called without a locale argument in `Summary.jsx` and `TransactionList.jsx` — output is locale-dependent and may differ across user environments. Should use `toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })` or a dedicated formatter.

10. `handleAdd` in `App.jsx` uses spread `[...transactions, transaction]` instead of the functional updater form `setTransactions(prev => [...prev, transaction])` — safe at current scale but is a stale-closure risk if multiple rapid adds were ever queued.
