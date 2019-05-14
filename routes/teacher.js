var express = require('express');
var router = express.Router();
const controller = require('../controllers/teacherController');

router.get('/create', function (req, res, next) {
    res.render('newTeacher', { message: '' });
});
router.post('/createTeacher', controller.save);
router.get('/list', controller.listAll);
router.get('/delete/:id', controller.delete);

module.exports = router;