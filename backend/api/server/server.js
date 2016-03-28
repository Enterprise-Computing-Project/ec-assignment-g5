var packageName = require('./../package.json').name;
var packageVersion = require('./../package.json').version;
var packageDescription = require('./../package.json').description;

var loopback = require('loopback');
var boot = require('loopback-boot');

var colors = require('colors');
var logger = require('winston');

logger.info(" ____  _    _   _ _____ __  __ _____  __".cyan);
logger.info("| __ )| |  | | | | ____|  \\/  |_ _\\ \\/ /".cyan);
logger.info("|  _ \\| |  | | | |  _| | |\\/| || | \\  / ".cyan);
logger.info("| |_) | |__| |_| | |___| |  | || | /  \\ ".cyan);
logger.info("|____/|_____\\___/|_____|_|  |_|___/_/\\_\\".cyan);

logger.info('');
logger.info('*** ' + packageName + ' ***');
logger.info('Version: '+ packageVersion +' (Beta)');
logger.info('Description: ' + packageDescription);
logger.info('');

var port = (process.env.VCAP_APP_PORT || 3000),
  host = (process.env.VCAP_APP_HOST || 'localhost');

var app = module.exports = loopback();

app.start = function () {
  // start the web server
  return app.listen(function () {
    app.emit('started');

    var baseUrl = app.get('url').replace(/\/$/, '');
    console.log('Web server listening at: %s', baseUrl);
    var componentExplorer = app.get('loopback-component-explorer');
    if (componentExplorer) {
      console.log('Browse your REST API at %s%s', baseUrl, componentExplorer.mountPath);
    }
  });
};

// Bootstrap the application, configure models, datasources and middleware.
// Sub-apps like REST API are mounted via boot scripts.
boot(app, __dirname, function (err) {
  if (err) throw err;
  if (require.main === module)
    app.start();
});
