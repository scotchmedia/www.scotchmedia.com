require('coffee-script/register');

var titan = require('titanjs');

conf = {
  apps: [
    require('./apps/app'),
    // require('./apps/admin')
  ],
  middleware: [
    // require('./server/routes'),
  ],
  schemas: require('./server/schema'), 
  config: [
    require('./config/defaults'), 
    require('./config/' + process.env.NODE_ENV)
  ],
  // loginConfig: require('./config/login'),
  publicDir: process.cwd() + '/public', 
  // errorMiddleware: require('./server/error'),
};

titan.run(conf, onServerStarted);

function onServerStarted(err, storage) {

  if (err) console.log("Server Starting err: ", err);

  var store = storage.store;

  // Bundle Additional Scripts
  // -------------------------
  store.on('bundle', function(browserify) {
    // local path (from project's root) of the script file
    // browserify.add("../js/minified/jquery-1.11.0.min.js");
  });

  // Model Projections
  // ----------------- 
  store.shareClient.backend.addProjection("example", "projects", "json0", {
    id: true,
  });

  // ----
  // On each new client's connection
  store.on('client', function(client) {

    // Register handler for the event called myEvent
    client.channel.on('ping', function(start, cb) {
      var end = new Date().getTime();
      cb('ping duration: ' + (end - start));
    });
  });
}
