var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
console.log('index.js[req.session.passport]:' + JSON.stringify(req.session.passport));
console.log('index.js[req.user]:' + JSON.stringify(req.user));
  res.render('index', { title: 'Express', username: req.session.passport.user.username });
});

module.exports = router;
