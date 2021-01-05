jest.mock('fs');

const fs = require('fs');
const nock = require('nock');

const { templateTags } = require('..');
const privateKey = require('./fixtures/private-key');

// Get the run function associated with the named template tag
const getTag = name => templateTags.find(tag => tag.name === name).run;

describe('index.js', () => {
  const { now: realNow } = Date;

  beforeEach(() => {
    // Mocking of Date.now is required so we get consistent JWTs
    global.Date.now = jest.fn(() => new Date(Date.UTC(2021, 0, 1)));

    // Mock requests to the GitHub API
    nock('https://api.github.com')
      .post('/app/installations/88/access_tokens')
      .reply(201, {
        token: 'v1.1f699f1069f60xxx',
        expires_at: '1970-01-01T00:00:00Z',
        permissions: {
          issues: 'write',
          contents: 'read'
        },
        repository_selection: 'selected'
      });

    // Return our private key
    fs.readFileSync = jest.fn(() => privateKey);
  });

  afterEach(() => {
    global.Date.now = realNow;
  });

  it('generates a JWT', async () => {
    const context = {
      github_app_id: 42,
      github_app_private_key_path: '/path/to/some/private/key.pem'
    };
    const jwt = await getTag('jwt')({ context });
    expect(jwt).toBe(
      'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2MDk0NTkxNzAsImV4cCI6MTYwOTQ1OTc3MCwiaXNzIjo0Mn0.lYJarXoXYhlc9z3INlUygMUhBhxNyF6kvK_VvD6nwhs3TAdes0W7ZTuSlfNDUbW3awDUwH93XTx0FIG8A-TwSAXPmf5dZYef50Ton7U8hEKVSl6OleCPsqYyCRGFpNzWguCEUa-5O2jMMZbdZZbZ0MuV_ms8u4RuLnQIPP9DGDVBYAMQbDzcU3urEtYdHH7QL-OgVbk1fMM4VrvUfe6xfk2CxIIJUxXnvlk35jR6xEau7JExbjRw4KbmNwz0qB6S9jq1PlsWD4aASXNEH27yE8dGZkJyOjDrt0vvjkQDfTpIpDNbMVfiLueoK3f6mV-2VLE2GuTpDWL2n_837dHzlA'
    );
  });

  it('generates an installation access token', async () => {
    const context = {
      github_app_installation_id: 88,
      github_app_id: 42,
      github_app_private_key_path: '/path/to/some/private/key.pem'
    };
    const token = await getTag('installation_access_token')({ context });
    expect(token).toBe('v1.1f699f1069f60xxx');
  });
});
