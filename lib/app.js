const OctokitApp = require('@octokit/app');
const { ExpiringCache: Cache } = require('./cache');

// A cache for installation access tokens
const cache = new Cache({ name: 'tokens', expiresAfterSeconds: 3000 });

const unpack = (o, handler) => {
  // eslint-disable-next-line no-restricted-syntax
  for (const propName of Object.getOwnPropertyNames(o)) {
    handler(propName);
  }
};

class App {
  constructor(params) {
    this.id = parseInt(params.id, 10);
    const api = new OctokitApp(params);
    unpack(api, propName => {
      App.prototype[propName] = api[propName];
    });
  }

  async getCachedInstallationAccessToken({ installationId }) {
    // Lookup token from cache
    const key = `${this.id}/${installationId}`;
    let tok = cache.get(key);

    // Not found in cache, get a new token and cache it
    if (!tok) {
      tok = await this.getInstallationAccessToken({ installationId });
      cache.set(key, tok);
    }

    // Return the token
    return tok;
  }
}

module.exports = App;
