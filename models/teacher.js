var mongoose = require('mongoose');

let TeacherSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    department: { type: String, required: false },
});

module.exports = mongoose.model('teacher', TeacherSchema);