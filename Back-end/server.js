require('dotenv').config();
const express = require('express')
const app = express()
const connectDB = require("./config/dbConnect.js")
const userRouter = require('./routes/user.js')
const postRouter = require('./routes/post.js')
const cors = require('cors');
const passport = require('passport');
const port = process.env.PORT;
const session = require('express-session');
const cookieParser = require('cookie-parser');


connectDB();
app.use(cors({
    origin: [
        "https://s50-samarth-capstone-sustainify.onrender.com",
        "https://precious-marshmallow-630587.netlify.app"
    ],
    credentials: true
}));


app.use(express.json({ limit: '10mb' }));
app.use("/user", userRouter)
app.use("/post", postRouter)
app.use(cookieParser());
app.get('/protected', isLoggedIn, (req, res) => {
    const accessToken = req.cookies.accessToken;
    res.send(`Hello ${req.user.displayName}, Access Token: ${accessToken}`);
});




// Google OAuth part 

require('./auth.js')
app.use(session({ secret: process.env.secretAuth }))
app.use(passport.initialize());
app.use(passport.session());

function isLoggedIn(req, res, next) {
    req.user ? next() : res.sendStatus(401);
}

app.get('/google', (req, res) => {
    res.send('<a href="/auth/google">Authenticate with Google</a>')
})

app.get('/auth/google',
    passport.authenticate('google', { scope: ['email', 'profile'] })
)

app.get('/google/callback',
    passport.authenticate('google', {
        successRedirect: 'http://localhost:5173/',
        failureRedirect: 'http://localhost:5173/user/login'
    }),
    (req, res) => {
        console.log(req.user)
        const accessToken = req.user.accessToken;
        res.cookie('accessToken', accessToken, { maxAge: 900000, httpOnly: true });
        res.redirect('/protected');
    }
);


app.get('/auth/failure', (req, res) => {
    res.send("something went worng")
})


app.get('/logout', (req, res) => {
    req.logout((err) => console.log(err))
    req.session.destroy();
    res.send("goodbyeeeeeee!")
})

app.listen(port, () => {
    console.log(`App is runnning on port = ${port}`)
})
