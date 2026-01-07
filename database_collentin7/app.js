

const express = require("express");
const bcrypt = require("bcrypt");

const connectDB = require("./src/config/database.js");
const User = require("./models/user"); // ✅
const { validateSignUpData } = require("./utils/validation");

const app = express();
app.use(express.json());

// ✅ Signup API
app.post("/signup", async (req, res) => {
  try {
    // validate input
    validateSignUpData(req);

    const { firstName, lastName, emailId, password } = req.body;

    // hash password
    const passwordHash = await bcrypt.hash(password, 10);

    // create user
    const user = new User({
      firstName,
      lastName,
      emailId,
      password: passwordHash,
    });

    await user.save();
    res.send("User added successfully ✅");
  } catch (err) {
    res.status(400).send("Error saving user: " + err.message);
  }
});
/*
app.post("/login",async(req,res) => {
    try{  
        const { emailId ,password} = req.body;
        const user = await User.findOne({ emailId:emailId});
        if(!user) {
            throw new Error ("Email id not present in DB");
        }
        const isPasswordValid = await bcrypt.compare(password,user.password);

        if(!isPasswordValid) {
            res.send("login is successfull");

        } else {
            throw new Error ("password  not correct ");

        } 


    }catch (err) {
        res.status(400).send("ERROR :  " + err.message);

    }
});
*/
app.post("/login", async (req, res) => {
  try {
    const { emailId, password } = req.body;
    const user = await User.findOne({ emailId });

    if (!user) {
      throw new Error("Email id not present in DB");
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (isPasswordValid) {
      res.send("Login is successful ✅");
    } else {
      throw new Error("Password not correct ❌");
    }
  } catch (err) {
    res.status(400).send("ERROR: " + err.message);
  }
});




// ✅ Get user by email
app.get("/user", async (req, res) => {
  const userEmail = req.body.emailId;

  try {
    const user = await User.findOne({ emailId: userEmail });
    if (!user) {
      return res.status(404).send("User not found");
    }
    res.send(user);
  } catch (err) {
    res.status(400).send("Something went wrong");
  }
});

// ✅ Get all users (feed)
app.get("/feed", async (req, res) => {
  try {
    const users = await User.find({});
    res.send(users);
  } catch (err) {
    res.status(404).send("Something went wrong");
  }
});

// ✅ Delete user
app.delete("/user", async (req, res) => {
  const userId = req.body.userId;
  try {
    await User.findByIdAndDelete(userId);
    res.send("User deleted successfully ✅");
  } catch (err) {
    res.status(400).send("Something went wrong");
  }
});

// ✅ Update user
app.patch("/user/:userId", async (req, res) => {
  const userId = req.params.userId;
  const data = req.body;

  try {
    const ALLOWED_UPDATES = ["photoUrl", "about", "gender", "age", "skills"];

    const isUpdateAllowed = Object.keys(data).every((k) =>
      ALLOWED_UPDATES.includes(k)
    );

    if (!isUpdateAllowed) {
      throw new Error("Update not allowed");
    }
    if (data?.skills && data.skills.length > 10) {
      throw new Error("Skills cannot be more than 10");
    }

    const user = await User.findByIdAndUpdate(userId, data, {
      returnDocument: "after",
      runValidators: true,
    });

    console.log(user);
    res.send("User updated successfully ✅");
  } catch (err) {
    res.status(400).send("Something went wrong: " + err.message);
  }
});

// ✅ Start server
connectDB()
  .then(() => {
    console.log("✅ Database connection established..");
    app.listen(7777, () => {
      console.log("🚀 Server is listening on port 7777...");
    });
  })
  .catch((err) => {
    console.log("❌ Database cannot be connected", err);
  });
