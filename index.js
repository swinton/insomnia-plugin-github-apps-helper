const fs = require('fs');
const { request } = require('@octokit/request');
const app = require('./lib/app');

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
      },
      {
        displayName: 'GitHub API Root',
        description: 'The base URL to which to send requests',
        type: 'string'
      }
    ],
    async run({ context }, ...args) {
      // Destructure appId, path from context
      let { github_app_id: appId, github_app_private_key_path: path } = context;

      // Allow id, path to be overridden via args
      const [tagId = 0, tagPath = ''] = args;
      appId = tagId > 0 ? tagId : appId;
      path = tagPath.length > 0 ? tagPath : path;

      // Initialize request defaults
      request.defaults({
        baseUrl: context.github_api_root || 'https://api.github.com'
      });

      // Return JWT
      return app.getJsonWebToken({
        appId,
        privateKey: getPrivateKey(path),
        request
      });
    }
  },
  {
    name: 'installation_access_token',
    displayName: 'Installation Access Token',
    description:
      'Generates an Installation Access Token, allowing you to authenticate with the GitHub API as an installation of your GitHub App',
    args: [
      {
        displayName: 'Installation ID',
        description: 'ID of GitHub App Installation',
        type: 'number'
      },
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
        displayName: 'GitHub API Root',
        description: 'The base URL to which to send requests',
        type: 'string'
      }
    ],
    async run({ context }, ...args) {
      // Destructure installationId, appId, path from context
      let {
        github_app_installation_id: installationId,
        github_app_id: appId,
        github_app_private_key_path: path
      } = context;

      // Allow installationId, id, path to be overridden via args
      const [tagInstallationId = 0, tagId = 0, tagPath = ''] = args;
      installationId = tagInstallationId > 0 ? tagInstallationId : installationId;
      appId = tagId > 0 ? tagId : appId;
      path = tagPath.length > 0 ? tagPath : path;

      // Initialize request defaults
      request.defaults({
        baseUrl: context.github_api_root || 'https://api.github.com'
      });

      // Return installation access token
      return app.getInstallationAccessToken({ appId, privateKey: getPrivateKey(path), installationId, request });
    }
  }
];
