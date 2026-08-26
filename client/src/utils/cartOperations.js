/**
 * Data Structures & Algorithms: O(1) Hash Map Cart Operations
 * Stores cart state as a Map for constant-time lookup, insertion, update, and deletion.
 */

export class CartMapManager {
  static addToMap(cartMap, product) {
    const updated = new Map(cartMap);
    if (updated.has(product.id)) {
      const existing = updated.get(product.id);
      updated.set(product.id, { ...existing, qty: existing.qty + 1 });
    } else {
      updated.set(product.id, { ...product, qty: 1 });
    }
    return updated;
  }

  static updateQuantityInMap(cartMap, productId, delta) {
    const updated = new Map(cartMap);
    if (!updated.has(productId)) return updated;

    const existing = updated.get(productId);
    const newQty = existing.qty + delta;

    if (newQty <= 0) {
      updated.delete(productId);
    } else {
      updated.set(productId, { ...existing, qty: newQty });
    }
    return updated;
  }

  static calculateTotals(cartMap) {
    let totalItems = 0;
    let subtotal = 0;

    for (const item of cartMap.values()) {
      totalItems += item.qty;
      subtotal += item.price * item.qty;
    }

    return { totalItems, subtotal };
  }

  static toArray(cartMap) {
    return Array.from(cartMap.values());
  }
}
