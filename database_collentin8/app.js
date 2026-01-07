

const express = require("express");
const cookieParser = require("cookie-parser");

// DB connection
const connectDB = require("./src/config/database.js");

// Routers
const authRouter = require("./routes/auth.js");
const profileRouter = require("./routes/profile.js");
const requestRouter = require("./routes/request.js");
const userRouter = require("./routes/user.js");

// Models / utils (keep only if used)
const jwt = require("jsonwebtoken");
const user = require("./models/user.js");

const app = express();

// ================= MIDDLEWARES =================
app.use(express.json());
app.use(cookieParser());

// ================= ROUTES =================
app.use("/", authRouter);
app.use("/", profileRouter);
app.use("/", requestRouter);
app.use("/", userRouter); // ✅ fixed (removed space & duplicate)

// ================= START SERVER =================
connectDB()
  .then(() => {
    console.log("✅ Database connection established");
    app.listen(7777, () => {
      console.log("🚀 Server running on port 7777");
    });
  })
  .catch((err) => {
    console.log("❌ Database cannot be connected");
    console.error(err);
  });
