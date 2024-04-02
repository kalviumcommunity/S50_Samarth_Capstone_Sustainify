const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
// const User = require('./models/userDB.js');

const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID ;
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;

passport.use(new GoogleStrategy({
  clientID: GOOGLE_CLIENT_ID,
  clientSecret: GOOGLE_CLIENT_SECRET,
  callbackURL: "http://localhost:2001/google/callback",
  passReqToCallback: true
},
  function (request, accessToken, refreshToken, profile, done) {
    try{
      return done(null, profile);
    }
    catch(error){
      done(error)
    }
  }
));


passport.serializeUser(function (user, done) {
  done(null, user)
})

passport.deserializeUser(function (user, done) {
  done(null, user)
})
