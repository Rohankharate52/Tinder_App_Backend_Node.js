
const express = require("express");
const app = express();

const connectDB = require("./src/config/database.js");
const User = require("./models/user");   // ✅ Capital U
const { validateSingUpData } = require("./utils/validation.js");
const bcrypt = require("bcrypt");

app.use(express.json());

// ---------------- SIGNUP ----------------
app.post("/signup", async (req, res) => {
  try {
    // validation of data
    validateSingUpData(req);

    const { firstName, lastName, emailId, password } = req.body;

    // Encrypt the password
    const passwordHash = await bcrypt.hash(password, 10);

    // creating a new instance of the user model
    const user = new User({
      firstName,
      lastName,
      emailId,
      password: passwordHash,
    });

    await user.save();
    res.send("User added successfully");
  } catch (err) {
    res.status(400).send("error saving user: " + err.message);
  }
});

// ---------------- GET USER BY EMAIL ----------------
app.get("/user", async (req, res) => {
  const userEmail = req.query.emailId; // ✅ use query param

  try {
    const user = await User.findOne({ emailId: userEmail });
    if (!user) {
      return res.status(404).send("User not found");
    }
    res.send(user);
  } catch (err) {
    res.status(400).send("Something went wrong: " + err.message);
  }
});

// ---------------- FEED (ALL USERS) ----------------
app.get("/feed", async (req, res) => {
  try {
    const users = await User.find({});
    res.send(users);
  } catch (err) {
    res.status(400).send("Something went wrong: " + err.message);
  }
});

// ---------------- DELETE USER ----------------
app.delete("/user/:userId", async (req, res) => {
  const userId = req.params.userId; // ✅ use param
  try {
    await User.findByIdAndDelete(userId);
    res.send("User deleted successfully");
  } catch (err) {
    res.status(400).send("Something went wrong: " + err.message);
  }
});

// ---------------- UPDATE USER ----------------
app.patch("/user/:userId", async (req, res) => {
  const userId = req.params.userId; // ✅ use param
  const data = req.body;

  try {
    const ALLOWED_UPDATES = ["photoUrl", "about", "gender", "age", "skils"];

    const isUpdateAllowed = Object.keys(data).every((k) =>
      ALLOWED_UPDATES.includes(k)
    );

    if (!isUpdateAllowed) {
      throw new Error("Update not allowed");
    }

    if (data?.skils?.length > 10) {
      throw new Error("Skills cannot be more than 10");
    }

    const user = await User.findByIdAndUpdate(userId, data, {
      new: true,
      runValidators: true,
    });

    console.log(user);
    res.send("User updated successfully");
  } catch (err) {
    res.status(400).send("Something went wrong: " + err.message);
  }
});

// ---------------- CONNECT DB & START SERVER ----------------
connectDB()
  .then(() => {
    console.log("✅ Database connection established..");
    app.listen(7777, () => {
      console.log("🚀 Server is successfully listening on port 7777...");
    });
  })
  .catch((err) => {
    console.log("❌ Database cannot be connected", err);
  });
