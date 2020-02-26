const fetch = require('node-fetch');
const Headers = fetch.Headers;

const { createOAuthHeader } = require('./oauth');

let _bearerHeader;

function bearerHeader(bearer) {
  if (!_bearerHeader) _bearerHeader = new Headers({
    Authorization: `Bearer ${bearer}`
  });
  return _bearerHeader;
}

async function deleteWebhook(bearer, env, id) {
  const deleteUrl = `https://api.twitter.com/1.1/account_activity/all/${env}/webhooks/${id}.json`
  const res = await fetch(deleteUrl, {
    method: 'delete',
    headers: bearerHeader(bearer)
  });
  return res;
}

async function getWebhooks(bearer, env) {
  const getUrl = `https://api.twitter.com/1.1/account_activity/all/${env}/webhooks.json`;
  const res = await fetch(getUrl, {
    headers: bearerHeader(bearer)
  });
  const json = await res.json();
  return json;
}

async function registerWebhook(token, env, url) {
  const params = new URLSearchParams();
  params.append('url', url);
  const requestData = {
    url: `https://api.twitter.com/1.1/account_activity/all/${env}/webhooks.json`,
    method: 'post',
    data: params
  }
  const res = await fetch(requestData.url, {
    method: requestData.method,
    body: requestData.data,
    headers: createOAuthHeader(token, requestData)
  });
  if (!res.ok) throw new Error(res.statusText);
  const json = await res.json();
  return json;
}

module.exports = {
  deleteWebhook,
  getWebhooks,
  registerWebhook
};
