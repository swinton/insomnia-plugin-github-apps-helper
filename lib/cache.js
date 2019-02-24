const flatCache = require('flat-cache');

const currentTimeInSeconds = () => Math.floor(Date.now() / 1000);

/**
 * Simple cache, backed by flat-cache, with a set expiration time
 */
class ExpiringCache {
  constructor({ name, expiresAfterSeconds = 3600 }) {
    this.expiresAfterSeconds = expiresAfterSeconds;
    this.cache = flatCache.load(name);
  }

  set(key, value) {
    const exp = currentTimeInSeconds() + this.expiresAfterSeconds;
    this.cache.setKey(key, { value, exp });
    this.cache.save(true);
  }

  get(key) {
    const cached = this.cache.getKey(key);
    if (!cached) {
      // Not found
      return undefined;
    }
    if (cached.exp <= currentTimeInSeconds()) {
      // Cache has expired
      return undefined;
    }
    return cached.value;
  }
}

module.exports.ExpiringCache = ExpiringCache;
