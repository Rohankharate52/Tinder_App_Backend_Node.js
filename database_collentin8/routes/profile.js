const express = require("express");
const { userAuth } = require("../middlewares/auth");
const jwt = require("jsonwebtoken"); // ✅ added

const profileRouter = express.Router();
const {validateEditProfileData} = require("../utils/validation.js");

profileRouter.get("/profile", userAuth, async (req, res) => {
  try {
    const user = req.user;
    res.send(user);
  } catch (err) {
    res.status(400).send("Error: " + err.message);
  }
});


profileRouter.patch("/profile/edit", userAuth, async (req, res) => {
  try {
    if (!validateEditProfileData(req)) {
      throw new Error("invalid edit req is....");
    }

    const loggedInUser = req.user;

    Object.keys(req.body).forEach((key) => {
      loggedInUser[key] = req.body[key];
    });

    await loggedInUser.save();

    res.json( {
     message: `${loggedInUser.firstName}, your profile updated successfully`,
     data: loggedInUser, 
    
  });
  } catch (err) {
    res.status(400).send("ERROR: " + err.message);
  }
});


// PATCH: Update Password
profileRouter.patch("/profile/password", userAuth, async (req, res) => {
  try {
    const { oldPassword, newPassword } = req.body;

    // 1️⃣ Validate input
    if (!oldPassword || !newPassword) {
      throw new Error("Both oldPassword and newPassword are required");
    }

    const user = req.user; // logged-in user

    // 2️⃣ Verify old password
    const isMatch = await bcrypt.compare(oldPassword, user.password);
    if (!isMatch) {
      throw new Error("Old password is incorrect");
    }

    // 3️⃣ Hash new password
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    // 4️⃣ Save new password
    user.password = hashedPassword;
    await user.save();

    res.json({
      message: "Password updated successfully ✅",
    });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});





module.exports = profileRouter;
