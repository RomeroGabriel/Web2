var teacherModel = require('../models/teacher');

module.exports = {
    save: async function (req, res) {
        let name = req.body.name;
        let email = req.body.email;
        let department = req.body.department;

        if (name == '' || email == '' || department == '')
            return res.status(500).json({ msg: 'Faltou informação' });

        let teacherEmail = await teacherModel.find({ email: req.body.email });
        if (!teacherEmail.length > 0) {
            let teacher = new teacherModel({
                name: name,
                email: email,
                department: department,
            });
            teacher.save().then(result => {
                return res.json({ sucess: true });
            }, err => {
                return res.status(500);
            });
        } else
            return res.status(500).json({ sucess: false, message: 'Email já em uso' });

    },

    getAll: function (req, res) {
        teacherModel.find().then(result => {
            return res.json(result);
        }, err => {
            return res.status(500);
        });
    },

    delete: function (req, res) {
        let id = req.params.id;
        teacherModel.findOneAndDelete(id).then(result => {
            return res.json(result);
        }, err => {
            return res.status(500);
        });
    }
}