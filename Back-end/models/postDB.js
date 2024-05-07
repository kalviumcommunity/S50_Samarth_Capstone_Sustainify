const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    img: { type: String, required: true },
    title: { type: String, required: true },
    description: { type: String, required: true },
    likes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    comments: [{
        text: [{ type: String, required: true }],
        createdBy: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }]
    }],
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }
});


const Post = mongoose.model('Post', postSchema);

module.exports = Post;
