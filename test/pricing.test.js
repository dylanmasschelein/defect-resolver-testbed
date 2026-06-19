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

  test('rounds a fractional-price subtotal to cents (no floating-point drift)', () => {
    // 0.1 * 3 === 0.30000000000000004 in raw IEEE-754; it must round to 0.3.
    expect(calculateSubtotal([{ price: 0.1, quantity: 3 }])).toBe(0.3);
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
});

describe('calculateTotal', () => {
  test('combines subtotal and a fixed discount', () => {
    const items = [{ name: 'widget', price: 50, quantity: 1 }];
    expect(calculateTotal(items, { type: 'fixed', value: 10 })).toBe(40);
  });
});
