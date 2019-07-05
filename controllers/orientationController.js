var orientationModel = require('../models/orientation');

module.exports = {
    save: function (req, res) {
        let orientation = new orientationModel({
            thema: req.body.thema,
            studentName: req.body.studentName,
            teacher: req.body.teacher
        });
        orientation.save().then(result => {
            return res.status(200);
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
        orientationModel.findByIdAndRemove(id).then(result => {
            return res.status(200);
        }, err => {
            return res.status(500);
        });
    }
};