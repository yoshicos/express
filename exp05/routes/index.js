var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  if(!req.session.viewcount) req.session.viewcount = 1; else req.session.viewcount += 1;
  console.log('user:' + req.session.user.name +',viewCount:' + req.session.viewcount);
  res.render('index', { title: 'Express', userName: req.session.user.name });
});

router.get('/logout', function(req, res, next) {
  console.log('last_count:' + req.session.viewcount);
  req.session.destroy();
  console.log('deleted sesstion:' + req.session);
  res.redirect('/');
});

module.exports = router;
