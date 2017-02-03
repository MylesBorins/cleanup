'use strict';

// npm modules
const Twit = require('twit');

// local modules
const deleteThread = require('./lib/delete-thread');
const amnesia = require('./lib/amnesia');

// local data
const config = require('./local.json');

const T = new Twit(config);

const stream = T.stream('user');

function itMe(user) {
  return user['screen_name'].toLowerCase() === config.username.toLowerCase()
}

stream.on('tweet', (tweet) => {
  if (itMe(tweet.user)) {
    console.log(`${tweet.user['screen_name']} says:\n ${tweet.text}\n`);
    if(config.amnesia && !!tweet['retweeted_status']
      && !itMe(tweet['retweeted_status'].user)) amnesia(T, tweet, config.amnesia);
    if (tweet.text.search('#cleanup') > -1) deleteThread(T, tweet);
  }
});
