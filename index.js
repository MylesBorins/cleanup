'use strict';

// npm modules
const Twit = require('twit');

// local modules
const deleteThread = require('./lib/delete-thread');

// local data
const config = require('./local.json');

const T = new Twit(config);

const stream = T.stream('user');

stream.on('tweet', (tweet) => {
  console.log(`${tweet.user['screen_name']} says:\n ${tweet.text}\n`);
  if (tweet.user['screen_name'].toLowerCase() === config.username.toLowerCase()
        && tweet.text.search('#cleanup') > -1)
    deleteThread(T, tweet);
});
