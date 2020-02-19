const {
  Autohook,
  TooManyWebhooksError,
  UserSubscriptionError,
} = require('twitter-autohook');

const {resolve} = require('path');

async function start(credentials, event) {
  const webhook = new Autohook({
    token: credentials.access_token,
    token_secret: credentials.access_token_secret,
    consumer_key: credentials.consumer_key,
    consumer_secret: credentials.consumer_secret,
    env: credentials.env,
    port: process.env.PORT || 3000
  });

  try {
    await webhook.removeWebhooks();
    await webhook.start(process.env.TWITTER_WEBHOOK_URL || null); 
  } catch(e) {
    switch (e.constructor.name) {
      case TooManyWebhooksError.name:
        console.error('Cannot add webhook: you have exceeded the number of webhooks available');
        break;
      default:
        console.error('Error:', e.getMessage()); 
        break;        
    }
    process.exit(-1);
  }
  try {
    await webhook.subscribe({
      oauth_token: credentials.access_token,
      oauth_token_secret: credentials.access_token_secret,
    });
  }
  catch (e) {
    switch (e.constructor.name) {
      case UserSubscriptionError.name:
        console.error(e.getMessage());
        break; 
      default:
        console.error('Error:', e); 
        break;         
    }
    process.exit(-1);
  }
  webhook.on('event', event);
}

module.exports = {
  start
};
