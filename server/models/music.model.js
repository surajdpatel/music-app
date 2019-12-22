const mongoose = require('mongoose');

mongoose.model('User', new mongoose.Schema({
    username: String,
    email: String,
    bio: String,
    image: String,
    hash: String,
    salt: String
}, { timestamps: true }));