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
var cors = require('cors');
var jwt = require('jsonwebtoken');
var router = express.Router();
var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors());

router.use(function (req, res, next) {
  try {
    const localToken = req.headers.authorization;
    jwt.verify(localToken, 'corinthians');
    next();
  } catch (e) {
    return res.status(401).json({ error: 'Falha na autenticação' })
  }
});
app.use('/users', usersRouter);
app.use(router);
app.use('/', indexRouter);
app.use('/teacher', teachersRouter);
app.use('/orientation', orientationRouter);

// mongoose.connect('mongodb+srv://romero:romero123@cluster0-sbrv8.mongodb.net/test?retryWrites=true', { useNewUrlParser: true });
mongoose.connect('mongodb://localhost:27017/web2', { useNewUrlParser: true });
let db = mongoose.connection;
db.on('error', console.error.bind(console, 'ERRO CONEXÃO BD'));

module.exports = app;