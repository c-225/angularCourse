let mongoose = require('mongoose');
const assignment = require('./assignment');
let Schema = mongoose.Schema;

let GradeSchema = Schema({
    id: Number,
    student_id: Number,
    assignment_id: Number,
    grade: Number,
});

// C'est à travers ce modèle Mongoose qu'on pourra faire le CRUD
module.exports = mongoose.model('grades', GradeSchema);
