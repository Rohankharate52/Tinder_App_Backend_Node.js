

const express = require("express");
const connectDB = require("./src/config/database.js");
const User = require("./models/user");   // ✅ Capital U

const app = express();
app.use(express.json());

// Route to add user
app.post("/signup", async (req, res) => {
  try {
    const user = new User({               // ✅ small u (document)
      firstName: "akashy",
      lastName: "saini",
      emailId: "akha@gmail",
      password: "akas34"
    });

    await user.save();
    res.status(201).send("✅ User added successfully");
  } catch (err) {
    console.error("Error saving user:", err.message);
    res.status(400).send("❌ Failed to add user");
  }
});

connectDB()
  .then(() => {
    console.log("✅ Database connection established..");
    app.listen(7777, () => {
      console.log("🚀 Server is successfully listening on port 7777...");
    });
  })
  .catch((err) => {
    console.log("❌ Database cannot be connected");
  });
