require('dotenv').config();
const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const connectDB = require("./config/dbConnect.js");

const userRouter = require('./routes/user.js');
const postRouter = require('./routes/post.js');
const googleAuthRouter = require('./routes/auth.google.js');

const app = express();
const port = process.env.PORT || 2001;

// Connect DB
connectDB();

// Middleware
app.use(cors({
  origin: [
    "https://nimble-smakager-347f97.netlify.app",
    "https://s50-samarth-capstone-sustainify.onrender.com"
  ],
  credentials: true
}));
app.use(express.json({ limit: '10mb' }));
app.use(cookieParser());
    origin: [
        "https://s50-samarth-capstone-sustainify.onrender.com",
        "https://precious-marshmallow-630587.netlify.app",
        "http://localhost:5173",
    ],
    credentials: true
}));


app.use(cookieParser());
app.use(express.json({ limit: '10mb' }));
app.use("/user", userRouter)
app.use("/post", postRouter)
// app.get('/protected', isLoggedIn, (req, res) => {
//     const accessToken = req.cookies.accessToken;
//     res.send(`Hello ${req.user.displayName}, Access Token: ${accessToken}`);
// });




// Google OAuth part 


// Routes
app.use("/user", userRouter);
app.use("/post", postRouter);
app.use("/auth", googleAuthRouter);


// Start server
app.listen(port, () => {
  console.log(`App is running on port = ${port}`);
});
    console.log(`App is runnning on port = ${port}`)
})

