var express = require('express');
var sm = require('sitemap');
var _ = require('lodash');
var fs = require('fs');

var router = express.Router();

router.all('/', function(req, res, next) {
  res.redirect(307, '/tutorials');
});

router.all('/tutorials/express', function(req, res, next) {
  res.redirect(307, '/tutorials/express/authentication/1/01');
});

router.all('/tutorials/express/authentication', function(req, res, next) {
  res.redirect(307, '/tutorials/express/authentication/1/01');
});

router.all('/tutorials/meteor', function(req, res, next) {
  res.redirect(307, '/tutorials/meteor/blog/1/01');
});

router.all('/tutorials/meteor/blog', function(req, res, next) {
  res.redirect(307, '/tutorials/meteor/blog/1/01');
});


module.exports = router;
