const OctokitApp = require('@octokit/app');

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
    return this.getInstallationAccessToken({ installationId });
  }
}

module.exports = App;
