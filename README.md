# grunt-swf

Automates using Apache Flex to compile .as files to .swf.

Note: you must install the Apache Flex SDK separately and then configure this plugin with the path to the SDK.

## Getting Started
This plugin requires Grunt.

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```shell
npm install grunt-swf --save-dev
```

Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('grunt-swf');
```
## The "swf" task

In your project's Gruntfile, add a section named `swf` to the data object passed into `grunt.initConfig()`.

We'll get to the `flex-sdk-path` in a minute.

```js
grunt.initConfig({
  swf: {
    options: {
      'flex-sdk-path': './path-to-flex-sdk'
    },
    'dist/filename.swf' : 'src/filename.as'
  },
  // ...
})
```

## Installing the Apache Flex SDK

Installing the Flex SDK is a two-step process: 

1. Download and install the "SDK Installer" from https://flex.apache.org/installer.html
2. that installs a program named "Apache Flex SDK Installer". Run it to download the actual SDK. 

Take note of the folder you install the SDK into in step 2. and add it to your grunt config.
 
After this, `grunt swf` should be able to compile compile your configured .as files.

## Tips

This plugin plays nice with [grunt-newer](https://www.npmjs.org/package/grunt-newer) - use it to avoid 
unnecessarily re-generating your .swf files when the .as source hasn't changed.


## Release History

### 1.0.2 - 2015-04-20
* Switched from native `mv` to [mv package](https://www.npmjs.com/package/mv) to support a wider range of environments.

### 1.0.1 - 2014-11-11
* Initial release, extracted code from https://github.com/nfriedly/Javascript-Flash-Cookies and added tests.

## License
Copyright (c) 2014 Nathan Friedly. Licensed under the MIT license.
