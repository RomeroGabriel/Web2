var mongoose = require('mongoose');

let orientationSchema = new mongoose.Schema({
    thema: String,
    studentName: String,
    teacher: { type: mongoose.Schema.Types.ObjectId, ref: 'teacher' },
});

module.exports = mongoose.model('orientation', orientationSchema);