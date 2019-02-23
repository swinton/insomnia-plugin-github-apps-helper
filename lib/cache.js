const currentTimeInSeconds = () => Math.floor(Date.now() / 1000);

/**
 * Simple in memory cache, backed by a Map, with a set expiration time
 */
class SimpleInMemoryCacheWithExpiration {
  constructor({ expiresAfterSeconds = 3600 } = {}) {
    this.expiresAfterSeconds = expiresAfterSeconds;
    this.store = new Map();
  }

  set(key, value) {
    const exp = currentTimeInSeconds() + this.expiresAfterSeconds;
    this.store.set(key, { value, exp });
  }

  get(key) {
    const cached = this.store.get(key);
    if (!cached) {
      // Not found
      return undefined;
    }
    if (cached && cached.exp <= currentTimeInSeconds()) {
      // Cache has expired
      return undefined;
    }
    return cached.value;
  }
}

module.exports.SimpleInMemoryCacheWithExpiration = SimpleInMemoryCacheWithExpiration;
