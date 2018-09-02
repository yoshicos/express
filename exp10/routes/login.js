var express = require('express');
var router = express.Router();

/* ログインページ. */
router.get('/', function(req, res, next) {
  res.render('login', { title: 'Express', name: '', password: '', msg: '' });
});

router.post('/', function(req, res, next) {
  req.check('username', 'Enter Name').notEmpty()
    .custom(
      function(value) {
        if (value === 'ケリチキ') {return true;
        } else {
          throw new Error('this email is already in use');
          return false;
        }
      }
    );
  req.check('password').notEmpty().withMessage('Enter Password');
  req.getValidationResult().then(function(result) {
    if (!result.isEmpty()) {
      // エラーの場合
      errors = result.array();
      console.log('err:' + JSON.stringify(errors));
      res.render('login', { title: 'Express',
        name: req.body.username, password: req.body.password, msg: 'ERR:'+errors[0].msg });
    } else {
      // 問題ない場合
      entry = {name: req.body.username, pass: req.body.password};
      console.log('check ok');
      res.redirect('/');
    }
  });
});

module.exports = router;
