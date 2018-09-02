var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var session = require('express-session');               // Add
var passport = require('passport');                     // Add
var LocalStrategy = require('passport-local').Strategy; // Add

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var loginRouter = require('./routes/login');            // Add

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// セッションの設定                                     // Add
app.use(session({
  secret : 'secret',
  resave : false,
  saveUninitialized : true,
  rolling : true,
  name : 'exp09-cookie',
  cookie            : {
    httpOnly: true,
    secure: false,
    maxAge : 1000 * 60 * 30,
  }
}));

// setup passport                                       // Add
var user = {
  username: 'exp09',
  password: 'password'
};

passport.use(                                           // Add
  new LocalStrategy(
    {
      usernameField: 'username',
      passwordField: 'password'
    },function(username, password, done){
console.log('LocalStrategy');
    // ログイン認証
    if (username != user.username) {
      return done(null, false, { message: 'Incorrect username.' });
    } else if (password != user.password) {
      return done(null, false, { message: 'Incorrect password.' });
    }
    return done(null, user);
  })
);

app.use(passport.initialize());                         // Add
app.use(passport.session());                            // Add

passport.serializeUser(function(user, done) {           // Add
console.log('serializeUser');
console.log(user);
    done(null, { "username" : user.username });
});

passport.deserializeUser(function(user, done) {         // Add
console.log('deserializeUser');
console.log(user);
    done(null, user);
});

//function isAuthenticated(req, res, next){               // Add
//    if (req.isAuthenticated()) {  // 認証済
//        return next();
//    }
//    else {  // 認証されていない
//        res.redirect('/login');  // ログイン画面に遷移
//    }
//}

app.use('/login', loginRouter);                         // Add
app.use('/', function(req, res, next){                  // Add
console.log('app.use [/]');
    if (req.isAuthenticated()) next();
    else res.redirect('/login');
  }
  , indexRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
