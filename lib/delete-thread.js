const calcTime = require('./calc-time');

function getTweet(T, tweetID, cb) {
  console.log(`☁️ Retrieving tweet with id ${tweetID} ☁️`);
  T.get('statuses/show/:id', {
    id: tweetID
  }, (err, tweet) => {
    if (err) {
      cb(err);
      return;
    }
    console.log('Tweet retrieved ✅\n');
    deleteTweet(T, tweet, cb);
    return;
  });
}

function deleteTweet(T, tweet, cb) {
  const parent = tweet['in_reply_to_status_id_str'];
  const id = tweet['id_str'];
  console.log('📛 Deleting tweet 📛');
  console.log(`id: ${id}`);
  console.log(`Content: ${tweet.text}\n`);
  T.post('statuses/destroy/:id', {
    id: id
  }, (err) => {
    if (err) {
      cb(err);
      return;
    }
    console.log('Tweet Deleted ✅\n');
    if (parent) {
      getTweet(T, parent, cb);
      return;
    }
    cb();
    return;
  });
}

function deleteThread(T, tweet) {
  const time = calcTime(tweet.text);
  setTimeout(deleteTweet, time, T, tweet, (err) => {
    if (err) {
      console.error(new Error(err));
      return;
    }
    console.log('All done 🎉');
  });
  return;
}

module.exports = deleteThread;
