// inspired by twitter-autohook
// https://github.com/twitterdev/autohook
// MIT
const fetch = require('node-fetch');
const Headers = fetch.Headers;

const {
  access_token,
  access_token_secret,
  consumer_key,
  consumer_secret,
  env,
  webhook_url
} = require('../local.json');

const { getBearerToken } = require('./bearer');

const {
  registerWebhook,
  getWebhooks,
  deleteWebhook
} = require('./webhooks');

async function main(auth) {
  const bearer = await getBearerToken({
    user: consumer_key,
    pass: consumer_secret
  });
  console.log('Getting existing webhook');
  const webhooks = await getWebhooks(bearer, env);
  if (!webhooks instanceof Array) throw webhooks;
  const webhook = webhooks[0];
  if (webhook) {
    console.log(`webhook found`);
    console.log(webhook);
    console.log('Deleting webhook');
    const success = await deleteWebhook(bearer, env, webhook.id);
    if (!success) throw new Error('webhook deletion failed');
    console.log('Successfully deleted webhook');
  }
  else {
    console.log('No webhook found');
  }
  console.log('Registering new webhook');
  const success = await registerWebhook({
    key: consumer_key,
    secret: consumer_secret,
  }, {
    key: access_token.trim(),
    secret: access_token_secret.trim()
  }, env, webhook_url);
  if (!success) throw new Error(`webhook creation failed`);
  console.log('Successfully created webhook 🎉');
}

main().then(_ => {
  console.log('All Done');
}).catch(e => console.error(e));
