var errorApp = require('../apps/error');

module.exports = function (err, req, res, next) {
  if (!err) return next();

  var message = err.message || err.toString();
  var status = parseInt(message);
  status = ((status >= 400) && (status < 600)) ? status : 500;

  if (status < 500) {
    console.log(err.message || err);
  } else {
    console.log(err.stack || err);
  }
  // XXX: temporary hack.
  // Markdown files should be loaded in the db.
  // Currently tutorials have no way of know if a pages exists until it is render.
  if (status == 500) {
    status = 404
  }

  var page = errorApp.createPage(req, res, next);
  page.renderStatic(status, status.toString());
}
