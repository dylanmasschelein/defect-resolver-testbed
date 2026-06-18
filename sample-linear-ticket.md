# Sample Linear ticket — paste into Linear, then add the "Ready For AI" label

**Title:** Percentage discount codes overcharge customers at checkout

**Description:**

Customers using a *percentage* discount code are being overcharged — the discount applied is far
smaller than it should be. Fixed-dollar discount codes work fine.

**Steps to reproduce**
1. Build a cart with a subtotal of $200.
2. Apply a 10% discount code (`{ type: 'percent', value: 10 }`).
3. Read the total from `calculateTotal()` in `src/pricing.js`.

**Expected:** `180` (10% off $200 = $20 off)
**Actual:** `190` (only $10 is removed — the "10" is treated as a flat $10)

**Affected module:** `src/pricing.js` → `applyDiscount()`, the `discount.type === 'percent'` branch.

**Notes:** Fixed-amount discounts are unaffected. No stack trace — this is a logic/calculation bug.
