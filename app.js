// var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const mongoose = require('mongoose');
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var teachersRouter = require('./routes/teacher');
var orientationRouter = require('./routes/orientation');
var router = express.Router();
var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

router.use(function (req, res, next) {
  if (!req.cookies.login) {
    return res.status(401).send('Sem cookie');
  }
  next();
});
app.use('/users', usersRouter);
app.use(router);
app.use('/', indexRouter);
app.use('/teacher', teachersRouter);
app.use('/orientation', orientationRouter);

// // catch 404 and forward to error handler
// app.use(function(req, res, next) {
//   next(createError(404));
// });

// // error handler
// app.use(function(err, req, res, next) {
//   // set locals, only providing error in development
//   res.locals.message = err.message;
//   res.locals.error = req.app.get('env') === 'development' ? err : {};

//   // render the error page
//   res.status(err.status || 500);
//   res.render('error');
// });

mongoose.connect('mongodb+srv://romero:romero123@cluster0-sbrv8.mongodb.net/test?retryWrites=true', { useNewUrlParser: true });
let db = mongoose.connection;
db.on('error', console.error.bind(console, 'ERRO CONEXÃO BD'));

module.exports = app;