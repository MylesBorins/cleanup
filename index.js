'use strict';

// npm modules
const Twit = require('twit');
const includes = require('lodash.includes');

// local modules
const deleteThread = require('./lib/delete-thread');

// local data
const config = require('./local.json');

const T = new Twit(config);

const stream = T.stream('user', {
  'screen_name': 'thealphanerd'
});

stream.on('tweet', (tweet) => {
  if (tweet.user['screen_name'] === config.username
        && tweet.text.search('#cleanup') > -1)
    deleteThread(T, tweet);
});
