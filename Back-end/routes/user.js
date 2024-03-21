const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const user = require("../models/userDB.js");

// GET Request
router.get('/', async (req, res) => {
    try {
        const data = await user.find();
        res.status(200).json(data);
    }
    catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Login Request
router.post('/login', async (req, res) => {
    const { userName, password } = req.body;
    try {
        const foundUser = await user.findOne({ userName: userName });
        if (foundUser) {
            const checkPass = await bcrypt.compare(password, foundUser.password);
            if (checkPass) {
                res.json('success');
            } else {
                res.json('the password is incorrect');
            }
        }
        else {
            res.json('no user exists');
        }
    }
    catch (err) {
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
            password: hashedPassword
        };

        const data = await user.create(userData);
        res.status(200).json(data);
    }
    catch (error) {
        res.status(400).json({ message: error.message });
    }
});

module.exports = router;
