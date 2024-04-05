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


// GET Request FOR SPEACIFIC POST
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

// POST Request 
router.post('/', async (req,res) => {

    try{

        if (!req.body.img || !req.body.title || !req.body.description) {
            return res.status(400).json({ message: "Missing required fields" });
        }
        
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

// PUT request 
router.put('/:id', async (req,res) =>{
    const id = req.params.id;
    try {
        const data = await posts.findByIdAndUpdate(id, req.body, { new: true });
        res.status(200).json(data);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
})

module.exports = router