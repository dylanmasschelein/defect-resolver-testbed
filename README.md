# defect-resolver-testbed

A tiny sandbox repository for exercising the **Linear AI Defect Resolver** agent end to end.

It contains a small pricing library with a **deliberately planted defect**, plus a passing
baseline test suite. The agent's job is to reproduce the defect with a new failing test, make
the minimal fix, run the suite, and open a pull request into `develop` for human review.

## Layout
- `src/pricing.js` — cart pricing helpers (`calculateSubtotal`, `applyDiscount`, `calculateTotal`)
- `test/pricing.test.js` — Jest suite; green on a clean checkout (the buggy path is intentionally uncovered)

## Run the tests
```bash
npm install
npm test
```

## Branching model (matches the agent config)
- Base branch: **`develop`**
- The agent creates a branch named `<ISSUE-ID>-<slug>` off `develop` and opens a **ready** PR back into `develop`.
- A human reviews and merges — the agent never merges.

## The planted defect
`applyDiscount()` handles `{ type: 'percent', value }` discounts incorrectly: it subtracts the
percent *value* as if it were a flat dollar amount instead of computing a percentage of the
subtotal. Fixed-amount discounts work correctly, and the baseline tests only cover those — so a
clean checkout is green and the bug hides in the percent path.

See [`sample-linear-ticket.md`](./sample-linear-ticket.md) for a ready-to-paste Linear ticket.
Create the issue, attach the **"Ready For AI"** label, and point the agent at the ticket ID.
