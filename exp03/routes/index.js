var express = require('express');
var router = express.Router();
var url = require('url');
var http = require('https');
var xmlparse = require('xml2js').parseString;

var ejsdata = { url: 'https://headlines.yahoo.co.jp/rss/nallabout-c_ent.xml' };

/* GET home page. */
router.get('/', function(req, res, next) {
  
  res.render('index', { title: 'Express', data: ejsdata });
});

module.exports = router;
