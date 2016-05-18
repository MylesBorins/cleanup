function calcTime(text) {
  var split = text.split('#cleanup ');

  if (split.length <= 1 || split[1] === '') {
    return 0;
  }

  var time = split[1].split(' ')[0].split('\n')[0];

  var num = Number(time);
  if (num || num === 0) {
    return num;
  }

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

module.exports = calcTime;
