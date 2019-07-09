var express = require('express');
var router = express.Router();
const controller = require('../controllers/teacherController');

router.post('/createTeacher', controller.save);
router.get('/getAll', controller.getAll);
router.delete('/delete/:id', controller.delete);

module.exports = router;