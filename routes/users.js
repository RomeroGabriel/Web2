var express = require('express');
var router = express.Router();
const controller = require('../controllers/userController');

/* GET users listing. */
router.get('/', function (req, res, next) {
  res.send('respond with a resource');
});
router.get('/login', function (req, res, next) {
  res.render('login', { message: '' });
});
router.post('/login', controller.login);
router.get('/newUser', function (req, res, next) {
  res.render('newUser', { error: '' });
});
router.post('/createUser', controller.save);

module.exports = router;
