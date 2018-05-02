var runNightwatch = function() {
  require('./runner.js');
}

var selenium = require('selenium-standalone');
selenium.install({
  version: '2.45.0',
  baseURL: 'http://selenium-release.storage.googleapis.com',
  drivers: {
    chrome: {
      version: '2.15',
      arch: process.arch,
      baseURL: 'http://chromedriver.storage.googleapis.com'
    },
  }
}, runNightwatch);
