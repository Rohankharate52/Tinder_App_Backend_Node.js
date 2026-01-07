const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect(  

     " mongodb+srv://rohankharate27112003_db_user:Zo6pQPefPHkhFmBQ@vedants1.b53rcro.mongodb.net/ "
     // "mongodb+srv://rohankharate27112003_db_user:Rohan12345@projectname12.cvx8t45.mongodb.net/database_collentin8"
    );

    console.log("✅ MongoDB connected successfully");
  } catch (error) {
    console.error("❌ MongoDB connection failed:", error.message);
    process.exit(1);
  }
};

module.exports = connectDB;


// Zo6pQPefPHkhFmBQ
//password rohankharate27112003_db_user
