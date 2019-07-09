var express = require('express');
var router = express.Router();
const controller = require('../controllers/orientationController');

router.get('/getAll', controller.getAll);
router.post('/create', controller.save);
router.delete('/delete/:id', controller.delete);
module.exports = router;