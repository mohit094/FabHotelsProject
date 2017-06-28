// An example configuration file.
exports.config = {
  seleniumAddress: 'http://localhost:4444/wd/hub',

  // Capabilities to be passed to the webdriver instance.
  capabilities: {
    'browserName': 'chrome',
    'chromeOptions': {
      args: [
            '--start-maximized'
        ],
      'mobileEmulation' : {
        'deviceName': 'Nexus 5'
      }
    }
  },

  // Framework to use. Jasmine is recommended.
  framework: 'jasmine',

  // Spec patterns are relative to the current working directory when
  // protractor is called.
  specs: ['testFile.js'],

  // Options to be passed to Jasmine.
  jasmineNodeOpts: {
    defaultTimeoutInterval: 3000000
  },

  onPrepare: function() {
    browser.ignoreSynchronization = true;
  }
};
