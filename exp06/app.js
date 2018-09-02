var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var session = require('express-session');
var pg = require('pg');
var pgSession = require('connect-pg-simple')(session);

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var login = require('./routes/login');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// セッションの設定
app.use(session({
  secret : 'secret',               // 必須:署名を行うため
  resave : false,                  // 推奨:セッションアクセス時上書き設定
  saveUninitialized : true,        // 推奨:新規セッション時、何もなくても値を保存はtrue
  rolling : true,                  // アクセスの度に、有効期限を伸ばす場合にはtrue
  name : 'exp06-cookie',           // クッキー名（デフォルトでは「connect.sid」）
  store: new pgSession({
    pg : pg,
    conString : 'postgres://pi:raspberry@localhost:5432/raspdb',
    crear_interval : 1000 * 60 * 30 // 保存期間(sec)
  }),
  cookie            : {            // 一般的なCookie指定
    httpOnly: true,                // クライアント側でクッキー値を見れない、書きかえれない設定は(true)
    secure: false,                 // httpsで使用する場合はtrue。httpの場合はfalse
    maxAge : 1000 * 60 * 30,       // 30分 生存期間（単位：ミリ秒）
  }
}));

/* SessionCheck */
var loginCheck = function( req, res, next ){
    if( req.session.user ) {       // ログイン済み
        next();
     } else {                      // 未ログインなら
        res.redirect('/login');    // ログイン画面へリダイレクト
     }
};

app.use('/login', login);              // ログイン画面
app.use('/', loginCheck, indexRouter); // ログインチェック
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
