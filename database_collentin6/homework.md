


//






const express = require("express");
const app = express();

const connectDB = require("./src/config/database.js");
const User = require("./models/user");   // ✅ Capital U

const {validateSingUpData} = require("./utils/validation.js");
const bcrypt = require("bcrypt");
app.use(express.json());


app.post("/signup", async(req,res) => {

     try {
    //validation of data 
    validateSingUpData(req);
     
   const { firstName ,lastName, emailId, password } = req.body;
    //const { password} = req.body;
    // Encrpt the password
    const passwordhash = await bcrypt.hash(password,10); 
    console.log(passwordhash);
    //creating a new instance of the user model
  
   const user = new User({ 
    firstName,
    lastName,
    emailId,
    password : passwordhash,
   });

   // const user = new User (req.body);
    
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











const validator = require("validator");
const validateSingUpData = (req) => {
    const { firstName,lastName,emailId,password} = req.body;
    if( !firstName || !lastName) {
        throw new Error("Name is not valid");

    } else if (!validator.isEmail(emailId)){
    throw new Error ("Email is not valid");
    }else if (!validator.isStrongPassword(password));{ 
    throw new Error ("plasse enter a strong password");
    }
    };

     module.exports = {
    validateSingUpData,
    }