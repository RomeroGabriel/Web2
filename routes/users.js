var express = require('express');
var router = express.Router();
const controller = require('../controllers/userController');

router.post('/login', controller.login);
router.post('/createUser', controller.save);

module.exports = router;
