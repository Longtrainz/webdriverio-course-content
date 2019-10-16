/// require main configuration
// var mainConfig = require('./wdio.conf.js').config;
var mainConfig = require('./wdio.conf.multiremote.js').config;

var spyfallConfig = Object.assign(mainConfig, {
    capabilities: {
        Host: {
            desiredCapabilities: {
                browserName: 'chrome'
            }
        },
        Guest: {
            desiredCapabilities: {
                browserName: 'chrome'
            }
        }
    },
    baseUrl: 'http://spyfall.crabhat.com/',
    specs: ['test/spyfall.js'],
});

exports.config = spyfallConfig;