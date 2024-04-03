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

connectDB();
app.use(cors(
    {
        origin: "http://localhost:5173",
        credentials: true
    }
))
app.use(express.json())
app.use("/user", userRouter)
app.use("/post", postRouter)


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
    })
)

app.get('auth/failure', (req, res) => {
    res.send("something went worng")
})

app.get('/protected', isLoggedIn, (req, res) => {
    res.send(`Hello ${req.user.displayName}`)

})

app.get('/logout', (req, res) => {
    req.logout((err) => console.log(err))
    req.session.destroy();
    res.send("goodbyeeeeeee!")
})

app.listen(port, () => {
    console.log(`App is runnning on port = ${port}`)
})