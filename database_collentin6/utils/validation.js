

const validator = require("validator");

const validateSingUpData = (req) => {
    const { firstName, lastName, emailId, password } = req.body;

    if (!firstName || !lastName) {
        throw new Error("Name is not valid");
    } else if (!validator.isEmail(emailId)) {
        throw new Error("Email is not valid");
    } else if (!validator.isStrongPassword(password)) {   // ✅ removed ;
        throw new Error("Please enter a strong password");
    }
};

module.exports = {
    validateSingUpData,
};

