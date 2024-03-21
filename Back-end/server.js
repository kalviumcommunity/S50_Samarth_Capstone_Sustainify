require('dotenv').config();
const express = require('express')
const app = express()
const connectDB = require("./config/dbConnect.js")
const userRouter = require('./routes/user.js')
const postRouter = require('./routes/post.js')
const cors = require('cors')
const port = process.env.PORT;

connectDB();
app.use(cors())
app.use(express.json())
app.use("/user", userRouter)
app.use("/post", postRouter)



app.listen(port, () => {
    console.log(`App is runnning on port = ${port}`)
} )