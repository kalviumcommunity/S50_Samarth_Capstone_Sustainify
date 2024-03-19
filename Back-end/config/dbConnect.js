const mongoose = require('mongoose')

require('dotenv').config();
const uri = process.env.URI;

const connectDB = async () => {
    try {
        await mongoose.connect(uri)
        console.log("DataBase connected")
    }
    catch (err) {
        console.log("Error connecting to database:", err)
    }
}

module.exports = connectDB;