const mongoose = require('mongoose');
const bcrypt = require('bcrypt-nodejs');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    phone: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    created:{
        type: Date,
        required: true,
        default: Date.now
    },
    password: {
        type: String,
        required: true,
    }
});
module.exports = mongoose.model('User', userSchema);    