const calcTime = require('./calc-time');

function deleteTweet(T, tweet, cb) {
  const id = tweet['id_str'];
  console.log('📛 Forgetting RetWeet 📛');
  console.log(`id: ${id}`);
  console.log(`Content: ${tweet.text}\n`);
  T.post('statuses/destroy/:id', {
    id: id
  }, (err) => {
    if (err) {
      cb(err);
      return;
    }
    console.log('Retweet Forgotten ✅\n');
    cb();
    return;
  });
}

function amnesia (T, tweet, memeoryLength, cb) {
  const time = calcTime(`#cleanup ${memeoryLength}`);
  setTimeout(deleteTweet, time, T, tweet, (err) => {
    if (err) {
      console.error(new Error(err));
      return;
    }
    console.log('All done 🎉')
  });
}

module.exports = amnesia;
