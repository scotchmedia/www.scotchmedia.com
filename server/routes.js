var express = require('express');
var sm = require('sitemap');
var _ = require('lodash');
var fs = require('fs');

var router = express.Router();

// router.all('/archive/', function(req, res, next) {
//   res.redirect(301, '/projects/');
// });

module.exports = router;
