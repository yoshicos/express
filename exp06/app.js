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

// �Z�b�V�����̐ݒ�
app.use(session({
  secret : 'secret',               // �K�{:�������s������
  resave : false,                  // ����:�Z�b�V�����A�N�Z�X���㏑���ݒ�
  saveUninitialized : true,        // ����:�V�K�Z�b�V�������A�����Ȃ��Ă��l��ۑ���true
  rolling : true,                  // �A�N�Z�X�̓x�ɁA�L��������L�΂��ꍇ�ɂ�true
  name : 'exp06-cookie',           // �N�b�L�[���i�f�t�H���g�ł́uconnect.sid�v�j
  store: new pgSession({
    pg : pg,
    conString : 'postgres://pi:raspberry@localhost:5432/raspdb',
    crear_interval : 1000 * 60 * 30 // �ۑ�����(sec)
  }),
  cookie            : {            // ��ʓI��Cookie�w��
    httpOnly: true,                // �N���C�A���g���ŃN�b�L�[�l������Ȃ��A����������Ȃ��ݒ��(true)
    secure: false,                 // https�Ŏg�p����ꍇ��true�Bhttp�̏ꍇ��false
    maxAge : 1000 * 60 * 30,       // 30�� �������ԁi�P�ʁF�~���b�j
  }
}));

/* SessionCheck */
var loginCheck = function( req, res, next ){
    if( req.session.user ) {       // ���O�C���ς�
        next();
     } else {                      // �����O�C���Ȃ�
        res.redirect('/login');    // ���O�C����ʂփ��_�C���N�g
     }
};

app.use('/login', login);              // ���O�C�����
app.use('/', loginCheck, indexRouter); // ���O�C���`�F�b�N
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
