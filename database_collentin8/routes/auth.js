const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken"); // ✅ added

const authRouter = express.Router();
const { validateSignUpData } = require("../utils/validation.js");
const User = require("../models/user");

// ===================== SIGNUP =====================



authRouter.post("/signup", async (req, res) => {
  try {
    validateSignUpData(req);

    const { firstName, lastName, emailId, password } = req.body;

    // hash password before saving
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({
      firstName,
      lastName,
      emailId,
      password: hashedPassword,  // ✅ save hash
    });

    await user.save();

    const token = user.getJWT();

    res.cookie("token", token, {
      httpOnly: true,
      secure: false,
      sameSite: "strict",
      expires: new Date(Date.now() + 8 * 3600000),
    });

    res.send("Signup successful ✅");
  } catch (err) {
    res.status(400).send("Error saving user: " + err.message);
  }
});

// ===================== LOGIN =====================
authRouter.post("/login", async (req, res) => {
  try {
    const { emailId, password } = req.body;

    const user = await User.findOne({ emailId });
    if (!user) {
      throw new Error("Email id not present in DB");
    }

    const isPasswordValid = await user.validatePassword(password);
    if (!isPasswordValid) {
      throw new Error("Password not correct ❌");
    }

    const token = user.getJWT();

    res.cookie("token", token, {
      httpOnly: true,
      secure: false,
      sameSite: "strict",
      expires: new Date(Date.now() + 8 * 3600000),
    });

    res.send("Login is successful ✅");
  } catch (err) {
    res.status(400).send("ERROR: " + err.message);
  }
});

authRouter.post("/logout", async(req, res) => {
  res.cookie("token",null,{
    expires:new Date(Date.now()),

  });
  res.send("logout succefully")
});




module.exports = authRouter;
