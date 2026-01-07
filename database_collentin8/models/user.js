const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// create user schema
const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      
      required: true, 
      
      minLength: 4,
      maxLength: 55,
    },
    lastName: {
      type: String,
    },
    password: {
      type: String,
      required: true,
    },
    age: {
      type: Number,
    },
    gender: {
      type: String,
      enum: {
        values: ["male" ,"female","other"],
        message: `{VALUE} IS NOT A VALID GENDER TYPE`
      },
      //validate(value) {
      //  if (!["male", "female", "others"].includes(value)) {
      //    throw new Error("Gender data is not valid");
      //  }
      //},
    },
    emailId: {
      type: String,
      required: true,
      lowercase: true,
      unique: true,
      trim: true,
      validate(value) {
        if (!validator.isEmail(value)) {
          throw new Error("Invalid email address: " + value);
        }
      },
    },
    photoUrl: {
      type: String,
      default:
        "https://www.clipartmax.com/png/middle/202-2029196_shivaprakash-b-dummy-user.png",
      validate(value) {
        if (!validator.isURL(value)) {
          throw new Error("Invalid URL: " + value);
        }
      },
    },
    skills: {
      type: [String],
    },
  },
  { timestamps: true }
);


userSchema.index({firstName: 1,lastName: 1});


// 🔑 Generate JWT
userSchema.methods.getJWT = function () {
  return jwt.sign({ _id: this._id }, "DEVA@tinder$543", {
    expiresIn: "7d",
  });
};

// 🔑 Validate password
userSchema.methods.validatePassword = async function (passwordInputByUser) {
  return bcrypt.compare(passwordInputByUser, this.password);
};

module.exports = mongoose.model("User", userSchema);
