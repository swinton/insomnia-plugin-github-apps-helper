const fs = require('fs');
const jwt = require('jsonwebtoken');

const createJWT = function createJWT({ id, cert }) {
  const payload = {
    iat: Math.floor(new Date() / 1000), // Issued at time
    exp: Math.floor(new Date() / 1000) + 60, // JWT expiration time
    iss: id // GitHub App ID
  };

  // Sign with RSA SHA256
  return jwt.sign(payload, cert, { algorithm: 'RS256' });
};

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
      const cert = fs.readFileSync(path);
      const tok = createJWT({
        id,
        cert
      });

      return tok;
    }
  }
];
