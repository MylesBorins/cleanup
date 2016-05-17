function deleteTweet(T, tweetID, cb) {
  T.post('statuses/destroy/:id', {
    id: tweetID
  }, cb);
}

function getTweet(T, tweetID) {
  T.get('statuses/show/:id', {
    id: tweetID
  }, (err, tweet) => {
    if (err) {
      console.error(new Error(err));
      return;
    }
    deleteThread(T, tweet);
  });
}

function deleteThread(T, tweet) {
  var parent = tweet['in_reply_to_status_id_str'];
  deleteTweet(T, tweet['id_str'], (err) => {
    if (err) {
      console.error(new Error(err));
      return;
    }
    if (parent) {
      getTweet(T, parent);
    }
    return;
  });
  return;
}

module.exports = deleteThread;
