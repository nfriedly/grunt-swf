'use strict';

var fs = require('fs');
var grunt = require('grunt');


/*
  ======== A Handy Little Nodeunit Reference ========
  https://github.com/caolan/nodeunit

  Test methods:
    test.expect(numAssertions)
    test.done()
  Test assertions:
    test.ok(value, [message])
    test.equal(actual, expected, [message])
    test.notEqual(actual, expected, [message])
    test.deepEqual(actual, expected, [message])
    test.notDeepEqual(actual, expected, [message])
    test.strictEqual(actual, expected, [message])
    test.notStrictEqual(actual, expected, [message])
    test.throws(block, [error], [message])
    test.doesNotThrow(block, [error], [message])
    test.ifError(value)
*/

exports.swf = {
  compile_swfstore: function (test) {
    test.expect(2);

    fs.exists('test/out/storage.swf', function(exists) {
      test.ok(exists, "Outfile should exist in destination folder");
      fs.exists('test/fixtures/Storage.swf', function(exists) {
        test.ok(!exists, "Outfile should not exist src folder");
        test.done();
      });
    });
  }
};
