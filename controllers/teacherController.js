var teacherModel = require('../models/teacher');

module.exports = {
    save: async function (req, res) {
        let teacherEmail = await teacherModel.find({ email: req.body.email });
        if (!teacherEmail.length > 0) {
            let teacher = new teacherModel({
                name: req.body.name,
                email: req.body.email,
                department: req.body.department,
            });
            teacher.save().then(result => {
                return res.redirect('/');
            }, err => {
                if (err) { return res.status(500).json({ message: 'Error in register new teacher', error: err }) };
            });
        } else {
            res.render('newTeacher', { message: 'Email already use by another teacher!' })
        }
    },

    listAll: function (req, res) {
        teacherModel.find().then(result => {
            res.render('listTeacher', { list: result, message: '' })
        }, err => {
            res.render('listTeacher', { list: [], message: 'Error in list all teachers' });
        });
    },

    delete: function(req, res){
        let id = req.params.id;
        teacherModel.findByIdAndRemove(id).then(result => {
            return res.redirect('/teacher/list');
        }, err => {
            res.render('listTeacher', { list: [], message: 'Error, can not delete teacher!' });
        });
    }
}