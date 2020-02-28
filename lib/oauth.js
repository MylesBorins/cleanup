const crypto = require('crypto');
const OAuth = require('oauth-1.0a')
const fetch = require('node-fetch');
const Headers = fetch.Headers;

function createOAuthHeader(consumerToken, accessToken, requestData) {
  const oauth = OAuth({
    consumer: consumerToken,
    signature_method: 'HMAC-SHA1',
    hash_function(base_string, key) {
      return crypto
        .createHmac('sha1', key)
        .update(base_string)
        .digest('base64');
    }
  });
  const header = oauth.toHeader(oauth.authorize(requestData, accessToken));
  return new Headers(header);
}

module.exports = {
  createOAuthHeader
};
