var express = require('express');
var router = express.Router();
var db = require('../pgdb');

/* ログインページ. */
router.get('/', function(req, res, next) {
  res.render('login', { title: 'ログイン', msg: '各項目に値を入力してください' });
});
 
router.post('/', function(req, res, next) {
  if(!req.body.username) {
    var msg = 'ユーザ名の入力がありません。再入力してください。';
    res.render('login', {title: 'ログイン', msg: msg});
  } else if (!req.body.userage) {
    var msg = '年齢の入力がありません。再入力してください。';
    res.render('login', {title: 'ログイン', msg: msg});
  } else if (!req.body.usermail) {
    var msg = 'メールアドレスの入力がありません。再入力してください。';
    res.render('login', {title: 'ログイン', msg: msg});
  } else {
    db.any('insert into loginuser(name,age,mail,insdate) values($1,$2,$3,current_timestamp)'
      ,[req.body.username,req.body.userage,req.body.usermail]);
    res.redirect('../');
  }
});
 
module.exports = router;