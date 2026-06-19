const { calculateSubtotal, applyDiscount, calculateTotal } = require('../src/pricing');

describe('calculateSubtotal', () => {
  test('sums price * quantity across items', () => {
    const items = [
      { name: 'widget', price: 25, quantity: 2 },
      { name: 'gadget', price: 10, quantity: 3 },
    ];
    expect(calculateSubtotal(items)).toBe(80);
  });

  test('returns 0 for an empty cart', () => {
    expect(calculateSubtotal([])).toBe(0);
  });
});

describe('applyDiscount', () => {
  test('returns the subtotal unchanged when there is no discount', () => {
    expect(applyDiscount(100, null)).toBe(100);
  });

  test('subtracts a fixed-amount discount', () => {
    expect(applyDiscount(100, { type: 'fixed', value: 15 })).toBe(85);
  });

  test('never returns a negative total for an oversized fixed discount', () => {
    expect(applyDiscount(20, { type: 'fixed', value: 50 })).toBe(0);
  });

  test('treats a percent discount with a missing value as no reduction (not NaN)', () => {
    expect(applyDiscount(100, { type: 'percent' })).toBe(100);
  });

  test('treats a percent discount with a non-numeric value as no reduction', () => {
    expect(applyDiscount(100, { type: 'percent', value: 'oops' })).toBe(100);
  });
});

describe('calculateTotal', () => {
  test('combines subtotal and a fixed discount', () => {
    const items = [{ name: 'widget', price: 50, quantity: 1 }];
    expect(calculateTotal(items, { type: 'fixed', value: 10 })).toBe(40);
  });

  test('returns a finite total when a percent discount is missing its value', () => {
    const items = [{ name: 'widget', price: 100, quantity: 1 }];
    expect(calculateTotal(items, { type: 'percent' })).toBe(100);
  });
});
