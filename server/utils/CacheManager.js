/**
 * Data Structures & Algorithms: LRU In-Memory Cache Manager
 * Provides O(1) key-value retrieval and eviction for API response optimization.
 */
export class CacheManager {
  constructor(capacity = 50, defaultTTLMs = 60000) {
    this.capacity = capacity;
    this.defaultTTL = defaultTTLMs;
    this.cache = new Map();
  }

  get(key) {
    if (!this.cache.has(key)) return null;

    const item = this.cache.get(key);
    
    // Check TTL Expiry
    if (Date.now() > item.expiresAt) {
      this.cache.delete(key);
      return null;
    }

    // Refresh LRU position by re-inserting
    this.cache.delete(key);
    this.cache.set(key, item);
    return item.value;
  }

  set(key, value, ttlMs = this.defaultTTL) {
    if (this.cache.has(key)) {
      this.cache.delete(key);
    } else if (this.cache.size >= this.capacity) {
      // Evict oldest entry (first item in Map)
      const oldestKey = this.cache.keys().next().value;
      this.cache.delete(oldestKey);
    }

    this.cache.set(key, {
      value,
      expiresAt: Date.now() + ttlMs
    });
  }

  clear() {
    this.cache.clear();
  }
}

export const apiCache = new CacheManager(100, 30000); // 30s cache
