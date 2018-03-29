const fs = require('fs')
const jwt = require('jsonwebtoken')

const createApp = function ({id, cert}) {
  return function () {
    const payload = {
      iat: Math.floor(new Date() / 1000), // Issued at time
      exp: Math.floor(new Date() / 1000) + 60, // JWT expiration time
      iss: id // GitHub App ID
    }

    // Sign with RSA SHA256
    return jwt.sign(payload, cert, {algorithm: 'RS256'})
  }
}

const createJWT = function ({id, cert}) {
  const payload = {
    iat: Math.floor(new Date() / 1000), // Issued at time
    exp: Math.floor(new Date() / 1000) + 60, // JWT expiration time
    iss: id // GitHub App ID
  }

  // Sign with RSA SHA256
  return jwt.sign(payload, cert, {algorithm: 'RS256'})
}

module.exports.templateTags = [{
    name: 'jwt',
    displayName: 'JSON Web Token',
    description: 'https://developer.github.com/apps/building-github-apps/authentication-options-for-github-apps/#authenticating-as-a-github-app',
    args: [
        {
          displayName: 'ID',
          description: 'ID of GitHub App',
          type: 'number'
        },
        {
            displayName: 'Private key file',
            description: 'Path to private key file',
            type: 'string'
        }
    ],
    async run (context, id, path) {
      const cert = fs.readFileSync(path)
      const tok = createJWT({
        id: id,
        cert: cert
      })

      return tok
    }
}];
