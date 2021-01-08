const fs = require('fs');
const { request } = require('@octokit/request');
const app = require('./lib/app');
const log = require('./lib/logging');

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
      log('jwt:context %o', context);
      log('jwt:args %o', args);

      // Destructure appId, path from context
      let {
        github_app_id: appId,
        github_app_private_key_path: path,
        github_api_root: baseUrl = 'https://api.github.com'
      } = context;

      // Allow appId, path, base URL to be overridden via args
      const [tagAppId = 0, tagPath = '', tagBaseUrl = ''] = args;
      appId = tagAppId > 0 ? tagAppId : appId;
      path = tagPath.length > 0 ? tagPath : path;
      baseUrl = tagBaseUrl.length > 0 ? tagBaseUrl : baseUrl;

      log('jwt:using GitHub App %d', appId);
      log('jwt:using GitHub App private key "%s"', path);
      log('jwt:using baseUrl "%s"', baseUrl);

      // Initialize request defaults
      request.defaults({
        baseUrl
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
      log('installation_access_token:context %o', context);
      log('installation_access_token:args %o', args);

      let {
        github_app_installation_id: installationId,
        github_app_id: appId,
        github_app_private_key_path: path,
        github_api_root: baseUrl = 'https://api.github.com'
      } = context;

      // Allow installationId, id, path to be overridden via args
      const [tagInstallationId = 0, tagAppId = 0, tagPath = '', tagBaseUrl = ''] = args;
      installationId = tagInstallationId > 0 ? tagInstallationId : installationId;
      appId = tagAppId > 0 ? tagAppId : appId;
      path = tagPath.length > 0 ? tagPath : path;
      baseUrl = tagBaseUrl.length > 0 ? tagBaseUrl : baseUrl;

      log('installation_access_token:using installation %d', installationId);
      log('installation_access_token:using GitHub App %d', appId);
      log('installation_access_token:using GitHub App private key "%s"', path);
      log('installation_access_token:using baseUrl "%s"', baseUrl);

      // Initialize request defaults
      request.defaults({
        baseUrl
      });

      // Return installation access token
      return app.getInstallationAccessToken({ appId, privateKey: getPrivateKey(path), installationId, request });
    }
  }
];
