var mongoose = require('mongoose');

let TeacherSchema = new mongoose.Schema({
    name: String,
    email: String,
    department: String,
});

module.exports = mongoose.model('teacher', TeacherSchema);