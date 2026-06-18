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

  test('treats a line item missing quantity as contributing 0', () => {
    const items = [
      { name: 'widget', price: 25, quantity: 2 },
      { name: 'gadget', price: 10 },
    ];
    expect(calculateSubtotal(items)).toBe(50);
  });

  test('never returns NaN when price or quantity is missing or non-numeric', () => {
    expect(calculateSubtotal([{ price: 10 }])).toBe(0);
    expect(calculateSubtotal([{ quantity: 3 }])).toBe(0);
    expect(calculateSubtotal([{ price: 'abc', quantity: 2 }])).toBe(0);
    expect(calculateSubtotal([{ price: 5, quantity: null }])).toBe(0);
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
