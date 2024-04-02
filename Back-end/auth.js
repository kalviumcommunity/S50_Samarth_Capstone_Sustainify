const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
// const User = require('./models/userDB.js');

const GOOGLE_CLIENT_ID ='142747060433-o1iub1ogneav0uut4h5i7jvsrkjqke1u.apps.googleusercontent.com' ;
const GOOGLE_CLIENT_SECRET = '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';

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
