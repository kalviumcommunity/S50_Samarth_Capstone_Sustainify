// routes/auth.google.js
const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { OAuth2Client } = require("google-auth-library");
const User = require("../models/userDB");

const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const SECRET_CODE = process.env.SECRET_CODE;

const client = new OAuth2Client(GOOGLE_CLIENT_ID);

async function makeHashedPassword() {
  const randomPlain = "google-" + Math.random().toString(36).slice(2);
  const hash = await bcrypt.hash(randomPlain, 10);
  return hash;
}

/* ---------------- GOOGLE SIGNUP ---------------- */
router.post("/google/signup", async (req, res) => {
  try {
    const { token, credential, bio, goal, number, img } = req.body;
    const idToken = token || credential;

    // console.log("Signup body:", { hasToken: !!idToken, bio, goal, number, hasImg: !!img });

    if (!idToken) {
      return res.status(400).json({ message: "Missing Google ID token" });
    }

    // Verify Google token
    const ticket = await client.verifyIdToken({
      idToken,
      audience: GOOGLE_CLIENT_ID,
    });
    const payload = ticket.getPayload();
    const { email, name, given_name, picture } = payload;

    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ message: "User already exists. Please login." });
    }

    // Require bio, goal, number; DO NOT require img (we’ll fallback to Google picture)
    if (!bio || !goal || !number) {
      return res.status(400).json({
        message: "bio, goal, number are required for signup",
      });
    }

    // number validation (simple)
    const numParsed = Number(number);
    if (Number.isNaN(numParsed)) {
      return res.status(400).json({ message: "number must be numeric" });
    }

    const finalImage = img && img.length ? img : (picture || "");

    user = new User({
      name: name,
      email: email,
      userName: (given_name || name || "user").toString().replace(/\s+/g, "").toLowerCase(),
      password: await makeHashedPassword(),
      number: numParsed,
      bio,
      goal,
      img: finalImage,
      posts: [],
    });

    await user.save();

    const jwtToken = jwt.sign(
      { _id: user._id, email: user.email, userName: user.userName },
      SECRET_CODE,
      { expiresIn: "1d" }
    );

    res.json({ token: jwtToken, user });
  } catch (err) {
    console.error("Google signup error:", err);
    res.status(400).json({ message: "Invalid Google signup" });
  }
});

/* ---------------- GOOGLE LOGIN ---------------- */
router.post("/google/login", async (req, res) => {
  try {
    const { token, credential } = req.body;
    const idToken = token || credential;

    // console.log("Login body:", { hasToken: !!idToken });

    if (!idToken) {
      return res.status(400).json({ message: "Missing Google ID token" });
    }

    // Verify Google token
    const ticket = await client.verifyIdToken({
      idToken,
      audience: GOOGLE_CLIENT_ID,
    });
    const payload = ticket.getPayload();
    const { email } = payload;

    let user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found. Please signup." });
    }

    const jwtToken = jwt.sign(
      { _id: user._id, email: user.email, userName: user.userName },
      SECRET_CODE,
      { expiresIn: "1d" }
    );

    res.json({ token: jwtToken, user });
  } catch (err) {
    console.error("Google login error:", err);
    res.status(400).json({ message: "Invalid Google login" });
  }
});

module.exports = router;
