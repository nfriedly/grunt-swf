/*
 * grunt-swf
 * https://github.com/nfriedly/grunt-swf
 *
 * Copyright (c) 2014 Nathan Friedly
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function (grunt) {

  // Please see the Grunt documentation for more information regarding task
  // creation: http://gruntjs.com/creating-tasks

  grunt.registerMultiTask('swf', 'Automates using Apache Flex to compile .as files to .swf.', function () {

    var log = grunt.log;
    var verbose = grunt.verbose;

    var opts = this.options();
    var files = this.files;

    var sdkPath = opts['flex-sdk-path'];
    if (!sdkPath) {
      throw new Error("Flex SDK path is required, see readme for details.");
    }
    var done = this.async();
    var fs = require('fs');
    var mv = require('mv');
    var pathUtil = require('path');
    var mxmlcPath = pathUtil.resolve(process.cwd(), sdkPath, './bin/mxmlc');
    if (process.platform === 'win32') {
      // node does not appear to have a seperate flag for 64-bit windows: http://nodejs.org/api/process.html#process_process_platform
      mxmlcPath += ".bat";
    }
    console.log('checking', mxmlcPath);
    fs.exists(mxmlcPath, function(exists) {
      if (!exists) {
        return done(new Error("mxmlc (Flex SDK's swf compiler) not found at path " + mxmlcPath));
      }
      console.log('mxmlc found');
      var cp = require('child_process');

      function exec(bin, args, done) {
        var command = cp.spawn(bin, args, {
          cwd: process.cwd()
        });

        command.stdout.on('data', function(d) {
          log.write(d);
        });
        command.stderr.on('data', function(d) {
          log.error(d);
        });

        // Catches failing to execute the command at all (eg spawn ENOENT),
        // since in that case an 'exit' event will not be emitted.
        command.on('error', function(err) {
          log.error('Failed with: ' + err);
          done(false);
        });

        command.on('close', function(code) {
          if (code) {
            log.error('Exited with code: ' + code);
            return done(false);
          }
          verbose.ok('Exited with code: ' + code);
          done();
        });
      }

      files.forEach(function(file) {
        if (file.src.length > 1) {
          throw new Error("grunt-swf: only one src file at a time, please: " + files.src.join(', '));
        }
        var src = file.src[0];
        var dest = file.dest;

        exec(mxmlcPath, [src], function(err) {
          if (err) {
            return err;
          }
          mv(src.replace('.as', '.swf'),dest,done);
        });
      });
    });
  });

};
