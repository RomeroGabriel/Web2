var express = require('express');
var router = express.Router();
var controller = require('../controllers/orientationController');

router.get('/', controller.getAll);
router.get('/logout', function (req, res, next) {
    res.clearCookie('login', { path: '/' });
    return res.status(200);
});

module.exports = router;