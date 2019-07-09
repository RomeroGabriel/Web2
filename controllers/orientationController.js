var orientationModel = require('../models/orientation');

module.exports = {
    save: function (req, res) {
        let thema = req.body.thema;
        let studentName = req.body.studentName;
        let teacher = req.body.teacher;
        if (thema == '' || studentName == '' || teacher == '')
            return res.status(500).json({ msg: 'Faltou informação' });

        let orientation = new orientationModel({
            thema: thema,
            studentName: studentName,
            teacher: teacher
        });
        orientation.save().then(result => {
            return res.json({ sucess: true });
        }, err => {
            return res.status(500);
        });
    },

    getAll: function (req, res) {
        orientationModel.aggregate([
            {
                $lookup:
                {
                    from: 'teachers',
                    localField: 'teacher',
                    foreignField: '_id',
                    as: 'teacherName'
                }
            },
            { $unwind: '$teacherName' },
            { $project: { thema: 1, _id: 1, studentName: 1, teacherName: 1 } }
        ]).then(result => {
            return res.json(result);
        }, err => {
            return res.status(500);
        })
    },

    delete: function (req, res) {
        let id = req.params.id;
        orientationModel.findOneAndDelete(id).then(result => {
            return res.json(result);
        }, err => {
            return res.status(500);
        });
    }
};