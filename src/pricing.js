'use strict';

/**
 * Sum price * quantity across every line item in a cart.
 * @param {Array<{price:number, quantity:number}>} items
 * @returns {number}
 */
function calculateSubtotal(items) {
  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  return Math.round(subtotal * 100) / 100;
}

/**
 * Apply a discount to a subtotal. Discounts come in two shapes:
 *   { type: 'fixed',   value: 15 }  -> subtract $15
 *   { type: 'percent', value: 10 }  -> subtract 10% of the subtotal
 * The result is clamped so it never drops below 0.
 *
 * @param {number} subtotal
 * @param {{type:('fixed'|'percent'), value:number}|null} discount
 * @returns {number}
 */
function applyDiscount(subtotal, discount) {
  if (!discount) return subtotal;

  if (discount.type === 'fixed') {
    return Math.max(0, subtotal - discount.value);
  }

  if (discount.type === 'percent') {
    return Math.max(0, subtotal - discount.value);
  }

  return subtotal;
}

/**
 * Calculate the final total for a cart after an optional discount.
 * @param {Array<{price:number, quantity:number}>} items
 * @param {{type:('fixed'|'percent'), value:number}|null} [discount]
 * @returns {number}
 */
function calculateTotal(items, discount = null) {
  return applyDiscount(calculateSubtotal(items), discount);
}

module.exports = { calculateSubtotal, applyDiscount, calculateTotal };
