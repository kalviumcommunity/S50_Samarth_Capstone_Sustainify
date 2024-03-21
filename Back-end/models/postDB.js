const mongoose = require('mongoose')

const postSchema = new mongoose.Schema({
    "img": String,
    "title": String,
    "description":String
})

const posts = mongoose.model('Post', postSchema)

module.exports = posts;