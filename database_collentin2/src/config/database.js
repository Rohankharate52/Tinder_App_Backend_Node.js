// mongodb+srv://rohankharate27112003:9Fh2j9FNv1NxQQ6M@devtinder100.sw4fcoe.mongodb.net/

const mongoose = require("mongoose");

const connectDB = async () => {
    await mongoose.connect( 
        "mongodb+srv://rohankharate27112003:9Fh2j9FNv1NxQQ6M@devtinder100.sw4fcoe.mongodb.net/ " 
    );
};

module.exports=connectDB;