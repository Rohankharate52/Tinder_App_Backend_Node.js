

// mongodb+srv://rohankharate27112003:9Fh2j9FNv1NxQQ6M@devtinder100.sw4fcoe.mongodb.net/

const mongoose = require("mongoose");

const connectDB = async () => {
    await mongoose.connect( 
       // "mongodb+srv://rohankharate27112003:9Fh2j9FNv1NxQQ6M@devtinder100.sw4fcoe.mongodb.net/devtinder100" 
      // "mongodb+srv://rohankharate27112003:oQO0Taczyn2eIPrt@rohankharate.iyacckl.mongodb.net/deraj10"
      "mongodb+srv://rohankharate27112003_db_user:Zd1cdsGa5QIxCnDc@projectname1.ryku1gw.mongodb.net/viraj11"

      
    );
};

module.exports=connectDB;