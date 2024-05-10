const express = require('express');
const posts = require('../models/postDB');
const user = require('../models/userDB');
const router = express.Router();
const mongoose = require('mongoose');



// GET REQUEST 
router.get('/', async (req, res) => {
    try {
        const data = await posts.find();
        res.status(200).json(data);
    }
    catch (err) {
        res.status(500).json({ message: err.message });
    }
})


// GET REQUEST FOR SPEACIFIC POST
router.get('/:id', async (req, res) => {
    const id = req.params.id;
    try {
        const data = await posts.findById(id);
        console.log(data)
        res.status(200).json(data);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// // GET USERNAME BY USER ID
// router.get('/userName/:id', async (req, res) => {
//     try {
//         const userId = req.params.id;
//         const userData = await user.findById(userId);
//         const postIds = userData.posts;
//         const userPosts = await posts.find({ _id: { $in: postIds } });

//         res.status(200).json(userPosts);
//     } catch (error) {
//         console.error('Error fetching user posts:', error);
//         res.status(500).json({ message: 'Internal server error' });
//     }
// });

// POST REQUEST 
router.post('/', async (req, res) => {
    try {
        if (!req.body.img || !req.body.title || !req.body.description || !req.body.createdBy) {
            return res.status(400).json({ message: "Missing required fields" });
        }

        const postData = {
            img: req.body.img,
            title: req.body.title,
            description: req.body.description,
            createdBy: req.body.createdBy
        };

        const data = await posts.create(postData);
        const userData = await user.findById(req.body.createdBy);
        userData.posts.push(data._id);
        await userData.save();

        res.status(200).json(data);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// PUT REQUEST 
router.put('/:id', async (req, res) => {
    const id = req.params.id;
    try {
        const data = await posts.findByIdAndUpdate(id, req.body, { new: true });
        res.status(200).json(data);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
})

// PUT REQUEST TO INCREASE LIKES FOR A SPECIFIC POST
router.put('/like/:id', async (req, res) => {
    const postId = req.params.id;
    try {
        const post = await posts.findById(postId);
        // console.log(post)
        if (!post) {
            return res.status(404).json({ message: 'Post not found' });
        }

        const userId = req.body.id;
        // console.log(userId)

        const likedIndex = post.likes.indexOf(userId);
        if (likedIndex !== -1) {
            post.likes.splice(likedIndex, 1);
        } else {
            post.likes.push(userId);
        }

        const updatedPost = await post.save();
        res.status(200).json({ likes: updatedPost.likes.length });
        console.log(updatedPost.likes.length);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});



// POST REQUEST FOR COMMENTS SECTION
router.post('/comments/:id', async (req, res) => {
    try {
        // console.log(req.body)
        const postId = req.params.id;
        // console.log(postId)

        if (!mongoose.Types.ObjectId.isValid(postId)) {
            return res.status(400).json({ message: 'Invalid post ID' });
        }

        const commentText = req.body.comment;
        const createdBy = req.body.id;
        // console.log(createdBy)
        const commentPost = await posts.findById(postId);
        if (!commentPost) {
            return res.status(404).json({ message: 'Post not found' });
        }

        commentPost.comments.push({ text: commentText, createdBy: createdBy });
        await commentPost.save();
        res.status(201).json({ message: 'Comment added successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
});

module.exports = router