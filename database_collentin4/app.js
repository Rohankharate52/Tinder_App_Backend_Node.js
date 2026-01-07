

const express = require("express");
const app = express();

const connectDB = require("./src/config/database.js");
const User = require("./models/user");   // ✅ Capital U


app.use(express.json());


app.post("/signup", async(req,res) => {
    //creating a new instance of the user model
    const user = new User (req.body);
    try { 
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


app.patch("/user",async(req,res) => {
    const userId = req.body.userId;
    const data = req.body;
    console.log(data);
    try { 
        await User.findByIdAndUpdate({ _id: userId},data);
        res.send("user update succdufuuly h ") ; 
    } catch(err) {
        res.status(400).send("something went wrong");
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
