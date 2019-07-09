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
                return res.json({ sucess: true });
            }, err => {
                return res.status(500);
            });
        } else 
            return res.json({ sucess: false, message: 'Email já em uso' });
        
    },

    getAll: function (req, res) {
        teacherModel.find().then(result => {
            return res.json(result);
        }, err => {
            return res.status(500);
        });
    },

    delete: function(req, res){
        let id = req.params.id;
        console.log(id);
        teacherModel.findByIdAndRemove(id).then(result => {
            return res.json(result);
        }, err => {
            return res.status(500);
        });
    }
}