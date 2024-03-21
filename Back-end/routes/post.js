const express = require('express');
const posts = require('../models/postDB');
const { post } = require('./user');
const router = express.Router();


// GET Request 
router.get('/', async (req, res) =>{
    try{
        const data = await posts.find();
        res.status(200).json(data);
    }
    catch (err){
        res.status(500).json({ message : err.message });
    }
})

// POST Request 
router.post('/', async (req,res) => {

    if (!img || !title || !description) {
        return res.status(400).json({ message: "All fields are required" });
    }

    try{
        const postData = {
            img: req.body.img,
            title: req.body.title,
            description: req.body.description
        }
        
        const data = await posts.create(postData)
        res.status(200).json(data);
    }
    catch (err) {
        res.status(400).json({ message : err.message })
    }
})

module.exports = router