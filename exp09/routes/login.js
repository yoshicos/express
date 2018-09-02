var express = require('express');
var router = express.Router();
var passport = require('passport');                     // Add
var LocalStrategy = require('passport-local').Strategy; // Add
 
router.get('/', function(req, res, next) {
  res.render('login', { title: 'Login' });
});
 
router.post('/',
  passport.authenticate('local', { successRedirect: '/',
                                   failureRedirect: '/login',
                                   failureFlash: false })
); 
module.exports = router;
