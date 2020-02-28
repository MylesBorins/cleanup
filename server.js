// Inspired by twitter-autohook
// https://github.com/twitterdev/autohook
// MIT
'use strict';
const crypto = require('crypto');
const http = require('http');
const url = require('url');

const BufferList = require('bl');
const Twit = require('twit');

// local modules
const deleteThread = require('./lib/delete-thread');

const port = process.env.PORT || 8000;

const auth = {
  consumer_key: process.env.CONSUMER_KEY,
  consumer_secret: process.env.CONSUMER_SECRET,
  access_token: process.env.ACCESS_TOKEN,
  access_token_secret: process.env.ACCESS_TOKEN_SECRET
};

const userid = process.env.USER_ID;

let T;

function validateWebhook(token, res) {
  console.log('Validating Webhook');
  const responseToken = crypto
    .createHmac('sha256', auth.consumer_secret)
    .update(token)
    .digest('base64');
  res.writeHead(200, {'content-type': 'application/json'});
  res.end(JSON.stringify({
    response_token: `sha256=${responseToken}`
  }));
}

function handleTweet(tweet) {
  console.log(`${tweet.user['screen_name']} says:\n ${tweet.text}\n`);
  if (tweet.user.id_str === userid) {
    if (tweet.text.search('#cleanup') > -1) {
      if (!T) T = new Twit(auth);
      console.log('cleanup thread found')
      deleteThread(T, tweet);
    }
  }
}

function handleWebhook(req, res) {
  const dataBuffer = new BufferList();
  req.on('data', chunk => {
    dataBuffer.append(chunk);
  });
  req.on('end', () => {
    const result = JSON.parse(dataBuffer.toString());
    const tweets = result['tweet_create_events'];
    if (tweets) {
      console.log('Handling tweet event');
      tweets.forEach(handleTweet);
    }
    res.writeHead(200);
    res.end();
  });
}

const server = http.createServer((req, res) => {
  console.log(`request received for: ${req.url}`);

  const route = url.parse(req.url, true);
  if (route.query.crc_token) {
    validateWebhook(route.query.crc_token, res);
    return;
  }

  if (req.method === 'POST' && req.headers['content-type'] === 'application/json') {
    handleWebhook(req, res);
    return;
  }
  if (req.url !== '/') {
    res.writeHead(404);
    res.write('404\'d');
    res.end();
    return;
  }
  
  res.writeHead(200);
  res.write('Oh hi');
  res.end();
});

server.listen(port, (err) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }
  console.log(`Lisenting on port ${port}`);
});
