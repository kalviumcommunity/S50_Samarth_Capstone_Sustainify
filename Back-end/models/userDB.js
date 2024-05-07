const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    "name":{ type: String, required: true },
    "email": { type: String, required: true },
    "userName": { type: String, required: true },
    "password": { type: String, required: true },
    "number":{ type: Number, required: true },
    "bio": { type: String, required: true },
    "goal": { type: String, required: true },
    "posts": [{ type: mongoose.Schema.Types.ObjectId, ref: 'Post', required: true }]
})

const user = mongoose.model('User',userSchema)

module.exports = user;