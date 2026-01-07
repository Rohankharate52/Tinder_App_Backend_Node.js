

const mongoose = require("mongoose");

const connectDB = async () => {
  await mongoose.connect(
    "mongodb+srv://rohankharate27112003_db_user:HnapZJkHKzzbfACa@projectname12.cvx8t45.mongodb.net/viraj12"
  );
};

module.exports = connectDB;
