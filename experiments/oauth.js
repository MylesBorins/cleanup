const crypto = require('crypto');
const OAuth = require('oauth-1.0a')
const fetch = require('node-fetch');
const Headers = fetch.Headers;

function hash_function_sha1(base_string, key) {
  return crypto
      .createHmac('sha1', key)
      .update(base_string)
      .digest('base64')
}

function createOAuthHeader(token, requestData) {

  const oauth = OAuth({
    consumer: token,
    signature_method: 'HMAC-SHA1',
    hash_function(base_string, key) {
      return crypto
        .createHmac('sha1', key)
        .update(base_string)
        .digest('base64');
    }
  });
  const header = oauth.toHeader(oauth.authorize(requestData, token));
  const obj = new Headers(header);
  console.log(obj)
  return obj;
}

module.exports = {
  createOAuthHeader
};
