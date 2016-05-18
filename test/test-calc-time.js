var test = require('tap').test;

var calcTime = require('../lib/calc-time');

function simple(phrase) {
  return calcTime(`#cleanup ${phrase}`);
}

function complex(before, after) {
  return calcTime(`${before} #cleanup ${after}`)
}

test('calc-time basic functionality', function (t) {
  t.equals(simple(''), 0);
  t.equals(simple('30'), 30);
  t.equals(simple('300'), 300);
  t.equals(simple('3s'), 3000);
  t.equals(simple('30s'), 30000);
  t.equals(simple('5m'), 300000);
  t.equals(simple('50m'), 3000000);
  t.equals(simple('1h'), 3600000);
  t.equals(simple('100h'), 360000000);
  t.end();
});

test('content before', function (t) {
  t.equals(complex('Some words first ', ''), 0);
  t.equals(complex('Some words first ', '30'), 30);
  t.equals(complex('Some words first ', '300'), 300);
  t.equals(complex('Some words first ', '3s'), 3000);
  t.equals(complex('Some words first ', '30s'), 30000);
  t.equals(complex('Some words first ', '5m'), 300000);
  t.equals(complex('Some words first ', '50m'), 3000000);
  t.equals(complex('Some words first ', '1h'), 3600000);
  t.equals(complex('Some words first ', '100h'), 360000000);
  t.end();
});

test('content before newline', function (t) {
  t.equals(complex('Some words first\n', ''), 0);
  t.equals(complex('Some words first\n', '30'), 30);
  t.equals(complex('Some words first\n', '300'), 300);
  t.equals(complex('Some words first\n', '3s'), 3000);
  t.equals(complex('Some words first\n', '30s'), 30000);
  t.equals(complex('Some words first\n', '5m'), 300000);
  t.equals(complex('Some words first\n', '50m'), 3000000);
  t.equals(complex('Some words first\n', '1h'), 3600000);
  t.equals(complex('Some words first\n', '100h'), 360000000);
  t.end();
});

test('content after', function (t) {
  t.equals(complex('', ' Some Content AfterWards!'), 0);
  t.equals(complex('', '30 Some Content AfterWards!'), 30);
  t.equals(complex('', '300 Some Content AfterWards!'), 300);
  t.equals(complex('', '3s Some Content AfterWards!'), 3000);
  t.equals(complex('', '30s Some Content AfterWards!'), 30000);
  t.equals(complex('', '5m Some Content AfterWards!'), 300000);
  t.equals(complex('', '50m Some Content AfterWards!'), 3000000);
  t.equals(complex('', '1h Some Content AfterWards!'), 3600000);
  t.equals(complex('', '100h Some Content AfterWards!'), 360000000);
  t.end();
});

test('content after newline', function (t) {
  t.equals(complex('', '\n Some Content AfterWards!'), 0);
  t.equals(complex('', '30\n Some Content AfterWards!'), 30);
  t.equals(complex('', '300\n Some Content AfterWards!'), 300);
  t.equals(complex('', '3s\n Some Content AfterWards!'), 3000);
  t.equals(complex('', '30s\n Some Content AfterWards!'), 30000);
  t.equals(complex('', '5m\n Some Content AfterWards!'), 300000);
  t.equals(complex('', '50m\n Some Content AfterWards!'), 3000000);
  t.equals(complex('', '1h\n Some Content AfterWards!'), 3600000);
  t.equals(complex('', '100h\n Some Content AfterWards!'), 360000000);
  t.end();
});
