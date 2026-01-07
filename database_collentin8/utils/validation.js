



const validator = require("validator");
const jwt = require("jsonwebtoken");

const validateSignUpData = (req) => {
  const { firstName, lastName, emailId, password } = req.body;

  if (!firstName || !lastName) {
    throw new Error("Name is not valid");
  }
  if (!validator.isEmail(emailId)) {
    throw new Error("Email is not valid");
  }
  if (!password || password.trim() === "") {
    throw new Error("Password cannot be empty");
  }
  if (!validator.isStrongPassword(password)) {
    throw new Error("Please enter a strong password (min 8 chars, with uppercase, lowercase, number, and symbol)");
  }



};


const validateEditProfileData = (req) => {
  const allowedEditFields = [ 
    "firstName",
    "lastName",
    "emailId",
    "gender",
    "age",
    "about",
    "skills",
    "photoUrl"   // ✅ add this
  ];

  const isEditAllowed = Object.keys(req.body).every((field) => 
    allowedEditFields.includes(field)
  );

  return isEditAllowed && Object.keys(req.body).length > 0;
};


module.exports = { 
  
  validateSignUpData,
  validateEditProfileData



};





