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
  if (tweet.user['screen_name'] === config.username
        && tweet.text.search('#cleanup') > -1)
    deleteThread(T, tweet);
});
