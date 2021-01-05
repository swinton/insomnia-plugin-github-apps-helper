const { request: apiDotGitHubDotCom } = require('@octokit/request');
const { createAppAuth } = require('@octokit/auth-app');
const { ExpiringCache: Cache } = require('./cache');

apiDotGitHubDotCom.defaults({
  baseUrl: 'https://api.github.com'
});

// A cache for installation access tokens
const cache = new Cache({ name: 'tokens', expiresAfterSeconds: 3000 });

async function getJsonWebToken({ appId, privateKey, request = apiDotGitHubDotCom }) {
  const auth = createAppAuth({ appId, privateKey, request });
  const { token: jwt } = await auth({ type: 'app' });
  return jwt;
}

async function getInstallationAccessToken({ appId, privateKey, installationId, request = apiDotGitHubDotCom }) {
  const auth = createAppAuth({ appId, privateKey, installationId, request, cache });
  const { token } = await auth({ type: 'installation' });
  return token;
}

module.exports = {
  getJsonWebToken,
  getInstallationAccessToken
};
