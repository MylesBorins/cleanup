const fetch = require('node-fetch');
const Headers = fetch.Headers;

const bearerUrl = 'https://api.twitter.com/oauth2/token';

const params = new URLSearchParams();
params.append('grant_type', 'client_credentials');

function basicHeader(auth) {
  return new Headers({
    Authorization: 'Basic '
      + Buffer.from(`${auth.user}:${auth.pass}`, 'utf8').toString('base64')
  });
}

async function getBearerToken(auth) {
  const res = await fetch(bearerUrl, {
    method: 'post',
    body: params,
    headers: basicHeader(auth)
  });
  const {
    token_type,
    access_token
  } = await res.json();
  if (token_type !== 'bearer') throw new Error(`wrong token type: ${token_type}`);
  return access_token;
}

module.exports = {
  getBearerToken
};
