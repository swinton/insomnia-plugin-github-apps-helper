const fs = require('fs');
const App = require('@octokit/app');

module.exports.templateTags = [
  {
    name: 'jwt',
    displayName: 'JSON Web Token',
    description: 'Generates a JSON Web Token, allowing you to authenticate with the GitHub API as your GitHub App',
    args: [
      {
        displayName: 'ID',
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
      const privateKey = fs.readFileSync(path);
      const app = new App({ id, privateKey });
      return app.getSignedJsonWebToken();
    }
  }
];
