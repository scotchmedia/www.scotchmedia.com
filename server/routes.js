var express = require('express');
var sm = require('sitemap');
var _ = require('lodash');
var fs = require('fs');

var router = express.Router();

router.all('/', function(req, res, next) {
  res.redirect(307, '/tutorials');
});

module.exports = router;
