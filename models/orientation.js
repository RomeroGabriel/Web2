var mongoose = require('mongoose');

let orientationSchema = new mongoose.Schema({
    thema: { type: String, required: true },
    studentName: { type: String, required: true },
    teacher: { type: mongoose.Schema.Types.ObjectId, ref: 'teacher', required: true },
});

module.exports = mongoose.model('orientation', orientationSchema);