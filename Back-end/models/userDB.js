const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    "name":String,
    "email": String,
    "userName": String,
    "password": String,
    "number": Number,
    "bio": String,
    "goal": String
})

const user = mongoose.model('User',userSchema)

module.exports = user;