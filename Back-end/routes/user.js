const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const user = require("../models/userDB.js");
const jwt = require('jsonwebtoken')
const secretCode = process.env.SECRET_CODE;
const verifyToken = require('./middleware/verifyToken.js');
const posts = require('../models/postDB.js');

// GET REQUEST
router.get('/', async (req, res) => {
    try {
        const data = await user.find().populate({ path: 'posts', model: 'Post' });
        res.status(200).json(data);
    }
    catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// GET REQUEST FOR VERIFICATION
router.get('/verify', verifyToken, async (req, res) => {
    try {
        const userId = req.user._id;
        const data = await user.findById(userId);
        res.status(200).json(data);
    }
    catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// GET POSTS BY USER ID
router.get('/myPosts/:id', async (req, res) => {
    try {
        const userId = req.params.id;
        const userData = await user.findById(userId);
        const postIds = userData.posts;
        const userPosts = await posts.find({ _id: { $in: postIds } });

        res.status(200).json(userPosts);
    } catch (error) {
        console.error('Error fetching user posts:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

// FIND A USER BY USING THE USERNAME
router.get('/username/:username', async (req, res) => {
    try {
        const username = req.params.username;
        const foundUser = await user.findOne({ userName: username });
        if (foundUser) {
            res.status(200).json(foundUser);
        } else {
            res.status(404).json({ message: 'User not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});


// FUNCTION TO GENERATE TOKENS
const generateToken = (tokenData) => {
    try {
        const token = jwt.sign(tokenData, secretCode);
        return token;

    }
    catch (err) {
        console.log('Token generation failed:', err);
    }
}

// LOGIN REQUEST
router.post('/login', async (req, res) => {
    const { userName, password } = req.body;
    try {
        const foundUser = await user.findOne({ userName: userName });
        // console.log(foundUser)
        if (foundUser) {
            const checkPass = await bcrypt.compare(password, foundUser.password);
            if (checkPass) {
                const tokenData = {
                    name: foundUser.name,
                    email: foundUser.email,
                    userName: foundUser.userName,
                    password: foundUser.password,
                    _id: foundUser._id
                };
                const token = generateToken(tokenData);
                // console.log(token)
                res.json({ message: 'success', token: token, user: foundUser });
            } else {
                res.json('the password is incorrect');
            }
        } else {
            res.json('no user exists');
        }
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});


// POST request
router.post('/', async (req, res) => {
    try {
        const hashedPassword = await bcrypt.hash(req.body.password, 10);

        const userData = {
            name: req.body.name,
            email: req.body.email,
            userName: req.body.userName,
            password: hashedPassword,
            posts: [],
            img: req.body.img,
            bio: req.body.bio,
            goal: req.body.goal,
            number: req.body.number
        };

        console.log("this is the user data from frntend:-", userData)
        const data = await user.create(userData);
        console.log(data)
        const tokenData = {
            _id: data._id,
            name: req.body.name,
            email: req.body.email,
            userName: req.body.userName,
            password: hashedPassword,
        }
        const token = generateToken(tokenData);
        // console.log(tokenData)
        res.status(200).json({ user: data, token: token, id: data._id });
    }
    catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// PUT request 
router.put('/:id', verifyToken, async (req, res) => {
    try {
        const userId = req.params.id;
        console.log('User ID:', userId);  // Log the user ID

        // Find user by ID
        const existingUser = await user.findById(userId);
        if (!existingUser) {
            console.log('User not found');  // Log when user is not found
            return res.status(404).json({ message: 'User not found' });
        }

        // Update user fields
        if (req.body.name) existingUser.name = req.body.name;
        if (req.body.email) existingUser.email = req.body.email;
        if (req.body.number) existingUser.number = req.body.number;
        if (req.body.bio) existingUser.bio = req.body.bio;
        if (req.body.goal) existingUser.goal = req.body.goal;
        if (req.body.img) existingUser.img = req.body.img;

        // Save updated user
        await existingUser.save();
        res.status(200).json({ message: 'Profile updated successfully', user: existingUser });
    } catch (error) {
        console.error('Error updating profile:', error);
        res.status(500).json({ message: 'Server error', error: error.message || error });
    }
});




module.exports = router;
