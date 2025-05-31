let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let UserSchema = Schema({
    id: Number,
    firstName: String,
    lastName: String,
    username: String,
    role: String,
    password: String,
    subjects: [String],
});

// C'est à travers ce modèle Mongoose qu'on pourra faire le CRUD
module.exports = mongoose.model('users', UserSchema);
