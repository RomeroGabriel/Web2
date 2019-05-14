var orientationModel = require('../models/orientation');
var teacherModel = require('../models/teacher');

module.exports = {
    save: function (req, res) {
        let orientation = new orientationModel({
            thema: req.body.thema,
            studentName: req.body.studentName,
            teacher: req.body.teacher
        });
        orientation.save().then(result => {
            return res.redirect('/');
        }, err => {
            res.render('newOrientation', { list: [], message: 'Error in save new orientation!' });
        });
    },

    getInit: function (req, res) {
        teacherModel.find().then(result => {
            res.render('newOrientation', { list: result, message: '' });
        }, err => {
            res.render('newOrientation', { list: [], message: '' });
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
            res.render('paginaInicial', { list: result, message: '' })
        }, err => {
            res.render('paginaInicial', { list: [], message: 'Error getting orientations' })
        })
        // orientationModel.find().then(result => {
        //     res.render('paginaInicial', { list: result, message: '' })
        // }, err => {
        //     res.render('paginaInicial', { list: [], message: 'Error getting orientations' })
        // });
    },

    delete: function (req, res) {
        let id = req.params.id;
        orientationModel.findByIdAndRemove(id).then(result => {
            return res.redirect('/');
        }, err => {
            res.render('paginaInicial', { list: [], message: 'Error, can not delete orientation!' });
        });
    }
};