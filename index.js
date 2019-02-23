const fs = require('fs');
const App = require('./lib/app');

const getPrivateKey = path => fs.readFileSync(path);

module.exports.templateTags = [
  {
    name: 'jwt',
    displayName: 'JSON Web Token',
    description: 'Generates a JSON Web Token, allowing you to authenticate with the GitHub API as your GitHub App',
    args: [
      {
        displayName: 'App ID',
        description: 'ID of GitHub App',
        type: 'number'
      },
      {
        displayName: 'Private key file',
        description: 'Path to private key file in PEM format',
        type: 'string'
      }
    ],
    async run(context, id, path) {
      const app = new App({ id, privateKey: getPrivateKey(path) });
      return app.getSignedJsonWebToken();
    }
  },
  {
    name: 'installation_access_token',
    displayName: 'Installation Access Token',
    description:
      'Generates an Installation Access Token, allowing you to authenticate with the GitHub API as an installation of your GitHub App',
    args: [
      {
        displayName: 'App ID',
        description: 'ID of GitHub App',
        type: 'number'
      },
      {
        displayName: 'Private key file',
        description: 'Path to private key file in PEM format',
        type: 'string'
      },
      {
        displayName: 'Installation ID',
        description: 'ID of GitHub App Installation',
        type: 'number'
      }
    ],
    async run(context, id, path, installationId) {
      const app = new App({ id, privateKey: getPrivateKey(path) });
      return app.getCachedInstallationAccessToken({ installationId });
    }
  }
];
