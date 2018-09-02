var express = require('express');
var xmlparse = require('xml2js').parseString;
var request = require('request');                          // add

var router = express.Router();

/* GET API */
router.get('/', function(req, res, next) {
  var param = {"res":"サンプルAPI返却", "key": "key", "value": req.query.key };
  res.header('Content-Type', 'application/json; charset=utf-8')
  res.send(param);
});

router.post('/', function(req, res, next) {
  if(!req.body.url) { res.redirect('../'); return; }
  // Ajax Get
  var options = {
    url: req.body.url,
    method: 'GET',
    encoding: 'utf8',
    headers: {},
    json: false
  };
  request.get(options, function (error, response, body) {
    if (!error && response.statusCode == 200) {
      xmlparse( body, function (err, jsonresult) {       // xml parse
        res.header('Content-Type', 'application/json; charset=utf-8');
        res.send(jsonresult);
      });
    } else {
      console.log('/api post error: '+ response.statusCode);
      res.redirect('../');
    }
  });
});

module.exports = router;
