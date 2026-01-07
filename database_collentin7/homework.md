user.js 








const mongoose = require ("mongoose");
const validator = require("validator");


//create user schema like .....
const userSchema = new mongoose.Schema({
    
    firstName: { 
        type: String,
        required: true,
        minLength: 4,
        maxLength : 55,


    },
    lastName: {

        type:String,
    },
    password: { 
        type : String,
        required: true,
    },
    age:{ 
        type: Number,
    },
    gender : {
        type : String,
        validate(value){
            if (! ["male" , "female", "others"].includes(value) ){
                throw new Error("gender data is not water");

            }
        }
    },
    emailId: { 
        type : String,
        required: true,
        lowercase: true,
        unique:true,
        trim:true,
        validate(value) {
            if (!validate.isEmail(value)){
                throw new Error("invalid email address : "+value);
            }
        }
    },
    
  

 photoUrl: { 
  type: String,
  default: "https://www.clipartmax.com/png/middle/202-2029196_shivaprakash-b-dummy-user.png",
  validate(value) {
    if (!validator.isURL(value)) {
      throw new Error("Invalid URL: " + value);
    }
  }
},


    skills: { 
        type: [String],
    },
   
},


 { timestamps: true},
    

 

);



module.exports = mongoose.model("User",userSchema);


database.js




// mongodb+srv://rohankharate27112003:9Fh2j9FNv1NxQQ6M@devtinder100.sw4fcoe.mongodb.net/

const mongoose = require("mongoose");

const connectDB = async () => {
    await mongoose.connect( 
       // "mongodb+srv://rohankharate27112003:9Fh2j9FNv1NxQQ6M@devtinder100.sw4fcoe.mongodb.net/devtinder100" 
      // "mongodb+srv://rohankharate27112003:oQO0Taczyn2eIPrt@rohankharate.iyacckl.mongodb.net/deraj10"
     // "mongodb+srv://rohankharate27112003_db_user:Zd1cdsGa5QIxCnDc@projectname1.ryku1gw.mongodb.net/viraj11"
      "mongodb+srv://rohankharate27112003_db_user:HnapZJkHKzzbfACa@projectname12.cvx8t45.mongodb.net/viraj12"
    );
};

module.exports=connectDB;


app.js 






const express = require("express");
const app = express();

const connectDB = require("./src/config/database.js");
const User = require("./models/user");   // ✅ Capital U
const bcrypt = require("bcrypt");

const {validateSignUpData } = require("./utils/validation");
app.use(express.json());


app.post("/signup", async(req,res) => {
   
    try {
    //validation of data 
    validateSignUpData(req);

    const { firstName,lastName,emailId,password } = req.body;
    // encrpt the password 

    const passwordHash = bcrypt.hash(password,10); 

    //creating a new instance of the user model
    const user = new User ({ 
        firstName,
        lastName,
        emailId,
        password: passwordHash,
    });
    
        await user.save();
        res.send("User addd succsssfully ");

    }catch(err) {
        res.status(400).send("error saving two user "+err.message);
    }
       

});

//get user by Emailid ....
app.get("/user",async (req,res) => {

    const userEmail = req.body.emailId;

   
    try { 
        console.log(userEmail);
        const user=await User.findOne({ emailId:userEmail});
        if(!user) {
            res.status(404).send("user not founf");
        }else { 
            res.send(user);
        }
        res.send(user);
  
     //  const users = await User.find({ emailId: userEmail});
       //if(users.length === 0) {
       //  res.status(404).send("user not found");

        //}else {
        //    res.send(users);
       // } 
    }catch(err) {
            res.status(400).send("something went wrong");
        }
});

//feed api  get all the users free the database 
app.get("/feed",async (req,res) => {
    try{ 
        const users=await User.find({});
        res.send(users);
    }catch(err) {
        res.status(404).send("somethin went wrong");
    }
});



// get delete the data 
app.delete("/user", async(req,res) => {
    const userId = req.body.userId;
    try {
        const user = await User.findByIdAndDelete({ _id: userId});
        // const user = await User.findByIdAndDelete(userId);
         res.send("user  delete succefuuly");  

    }catch (err) {
        res.status(400).send("somethiing went wrong");

    }
});

//update 
// update user by ID

//uqdate data of the user ..

//update data of the user..
app.patch("/user/:userId" ,async (req,res) => {
    const userId = res.body.userId;

    const data = req.body;

  
    try { 

       
          const ALLOWED_UPDATES = [
            "userId","photoUrl", "about","gender","age","skils"];

    const inUpdateAllowed = Object.keys(data).every((k) => 
        ALLOWED_UPDATES.includes(k)
    );
    if (! isUpdateAllowed ){
        throw new Error("update not allowrd");

    }
    if (data?.skilss.length > 10 ) {
        throw new Error("skilss is cannot be more than 10 ");
    }


        const user = await User.findByAndUpdate({ _id: userId } ,data,{
            returnDocument: "after",
            runValidators: true,
        });
        cosole.log(user);
        res.send("user update succefuuly ");

    } catch (err) {
        res.status(400).send("something went wrong" + err.message);
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
