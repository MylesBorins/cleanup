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
    return;
  });
}

function getTime(text) {
  var split = text.split('#cleanup ');
  if (split.length <= 1 || split[1] === '') {
    return 0;
  }
  var time = split[1].split(' ')[0];
  var delimiter = time.slice(-1);
  time = time.slice(0, -1);

  switch(delimiter) {
    case 'h':
      time *= 60;
    case 'm':
      time *= 60;
    case 's':
      time *= 1000;
  }

  return time;
}

function deleteThread(T, tweet) {
  var parent = tweet['in_reply_to_status_id_str'];
  var time = getTime(tweet.text);
  setTimeout(deleteTweet, time, T, tweet['id_str'], (err) => {
    if (err) {
      console.error(new Error(err));
      return;
    }
    if (parent) {
      getTweet(T, parent);
    }
    else {
      console.log('All done 🎉')
    }
    return;
  });
  return;
}

module.exports = deleteThread;
