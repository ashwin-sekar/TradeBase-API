const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        trim: true,
        unique: true,
        required: true,
    },
    password: {
        type: String,
        requierd: true,
        minlength: 5
    },
    signUpDate: {
        type: Date,
        default: Date.now
    }
});

module.exports = User = mongoose.model('user', userSchema);