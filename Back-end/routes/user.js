const express = require('express');
const router = express.Router();
const user = require("../models/userDB.js")




//GET Request
router.get('/', async (req, res) =>{
    try{
        const data = await user.find();
        res.status(200).json(data);
    }
    catch (err) {
        res.status(500).json({mssg: err.mssg});
    }
})

router.post('/login', (req,res) =>{
    const {userName, password} = req.body;
    user.findOne({userName: userName})
    .then(user =>{
        if(user){
            if(user.password === password){
                res.json('success')
            }
            else{
                res.json("the password is incorrect")
            }
        }
        else{
            res.json("no user exists")
        }
    })
})

// POST request
router.post('/', async (req, res) => {
    try {
        const data = await user.create(req.body);
        res.status(200).json( data);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});


module.exports =router;