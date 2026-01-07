//profile 

app.get("/profile", async (req, res) => {

try{ 
    const cookies = require.cookies;
    const {token} = cookies;
    if(!token) {
        throw new Error("invalid token");
    }
    const decodeMessage = await jwt.verify(token, "dev@34359");
    const {_id } = decodeMessage;
    const user = await User.findById(_id);
    if(!User) {
        throw new Error("User does not exits");

    }
    res.send(user);

}catch(err){
    res.status(400).send("Error : " +err.message);

}
});



// login 

 app.post("/login", async (req, res) => {
  try {
    const { emailId, password } = req.body;
    const user = await User.findOne({ emailId });

    if (!user) {
      throw new Error("Email id not present in DB");
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (isPasswordValid) { 
      
        //Create a JWT Token
        const token = await jwt.sign({_id: user._id}, " dev@34359" );
        console.log(token); 
        
        //Addthe token to cookie and the response back the user 

        res.cookie("token", "kksjjskdjiwietudsdhlldkjieeiksj");
       // res.send("login succfully");

      res.send("Login is successful ✅");


    }  else {
      throw new Error("Password not correct ❌");
    }
  } catch (err) {
    res.status(400).send("ERROR: " + err.message);
  }
});





////////////////////////////////////////////////////////////////////////////////
 authRouter.post("/login", async (req, res) => {
  try {
    const { emailId, password } = req.body;
    const user = await User.findOne({ emailId });

    if (!user) {
      throw new Error("Email id not present in DB");
    }

    const isPasswordValid = await user.validatePassword(password);

    if (isPasswordValid) { 
       const token = await user.getJWT();

        //Create a JWT Token
      //  const token = await jwt.sign({_id: user._id}, "DEVA@tinder$543" ,{
       //   expiresIn: "7d",
       // });
       // console.log(token); 
        
        //Addthe token to cookie and the response back the user 

        res.cookie("token", token , {
          expires : new Date(Date.now() + 8 * 3600000),
        }); 

       // res.send("login succfully");

      res.send("Login is successful ✅");


    }  else {
      throw new Error("Password not correct ❌");
    }
  } catch (err) {
    res.status(400).send("ERROR: " + err.message);
  }
});


////////////////////////////////////////////////////////////////////////////////
authRouter.post("/signup", async (req, res) => {
  try {
    // validate input
    validateSignUpData(req);

    const { firstName, lastName, emailId, password } = req.body;

    // hash password
    const passwordHash = await bcrypt.hash(password, 10);

    // create user
    const user = new User({
      firstName,
      lastName,
      emailId,
      password: passwordHash,
    });

    await user.save();
    res.send("User added successfully ✅");
  } catch (err) {
    res.status(400).send("Error saving user: " + err.message);
  }
});


////////////////////////////////////////////////////////////////////////////////////////////
user.js



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
      validate(value) {
        if (!["male", "female", "others"].includes(value)) {
          throw new Error("Gender data is not valid");
        }
      },
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

userSchema.methods.getJWT = async function() {
  const user = this;
   const token = await jwt.sign({_id: user._id}, "DEVA@tinder$543" ,{
          expiresIn: "7d",
        });
        return token;
}

userSchema.methods.validatePassword = async function (passwordInputByUser){
  const user = this;
  const passwordHash = user.password;

  const isPasswordValid = await bcrypt.compare( 
    passwordInputByUser,
    passwordHash
  );
  return isPasswordValid;
};

module.exports = mongoose.model("User", userSchema);

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
auth.js (router)

const express = require ("express");
const authRouter = express.Router();
const bcrypt = require("bcrypt");


const { validateSignUpData } = require("../utils/validation");
const User = require("../models/user"); // ✅



authRouter.post("/signup", async (req, res) => {
  try {
    // ✅ validate input
    validateSignUpData(req);

    const { firstName, lastName, emailId, password } = req.body;

    // ✅ create new user (password will be hashed automatically by pre("save"))
    const user = new User({
      firstName,
      lastName,
      emailId,
      password, // no need to hash here, schema will handle it
    });

    await user.save();

    // ✅ generate JWT
    const token = await user.getJWT();

    // ✅ set cookie
    res.cookie("token", token, {
      httpOnly: true,
      secure: false, // change to true if HTTPS
      sameSite: "strict",
      expires: new Date(Date.now() + 8 * 3600000), // 8 hours
    });

    res.send("Signup successful ✅");
  } catch (err) {
    res.status(400).send("Error saving user: " + err.message);
  }
});


authRouter.post("/login", async (req, res) => {
  try {
    const { emailId, password } = req.body;

    // 🔍 Find user by email
    const user = await User.findOne({ emailId });
    if (!user) {
      throw new Error("Email id not present in DB");
    }

    // 🔑 Validate password
    const isPasswordValid = await user.validatePassword(password);
    if (!isPasswordValid) {
      throw new Error("Password not correct ❌");
    }

    // ✅ Generate JWT using model method
    const token = await user.getJWT();

    // 🍪 Store token in cookie
    res.cookie("token", token, {
      httpOnly: true, // secure against XSS
      secure: false,  // set to true if using HTTPS
      sameSite: "strict",
      expires: new Date(Date.now() + 8 * 3600000), // 8 hours
    });

    res.send("Login is successful ✅");
  } catch (err) {
    res.status(400).send("ERROR: " + err.message);
  }
});



//authRouter.post("/login", async (req, res) => {
  try {
    const { emailId, password } = req.body;
    const user = await User.findOne({ emailId });

    if (!user) {
      throw new Error("Email id not present in DB");
    }

    const isPasswordValid = await user.validatePassword(password);

    if (isPasswordValid) { 
       const token = await user.getJWT();

        //Create a JWT Token
      //  const token = await jwt.sign({_id: user._id}, "DEVA@tinder$543" ,{
       //   expiresIn: "7d",
       // });
       // console.log(token); 
        
        //Addthe token to cookie and the response back the user 

        res.cookie("token", token , {
          expires : new Date(Date.now() + 8 * 3600000),
        }); 

       // res.send("login succfully");

      res.send("Login is successful ✅");


    }  else {
      throw new Error("Password not correct ❌");
    }
  } catch (err) {
    res.status(400).send("ERROR: " + err.message);
  }
//});

module.exports = authRouter;

//////////////////////////////////////////////////////////////////////////////////////////////////////////


const express = require("express");


const connectDB = require("./src/config/database.js");

const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");


const app = express();
app.use(express.json());
app.use(cookieParser());
 
   /* 
app.get("/profile", async (req, res) => {

try{ 
    const cookies = require.cookies;
    const {token} = cookies;
    if(!token) {
        throw new Error("invalid token");
    }
    const decodeMessage = await jwt.verify(token,  "DEVA@tinder$543" );
    const { _id } = decodeMessage;
    console.log("loggged in user " + _id);

    const user = await User.findById(_id);
    if(!user) {
        throw new Error("User does not exits");

    }
    res.send(user);

}catch(err){
    res.status(400).send("Error : " +err.message);

}
});
*/


const authRouter = require("./routes/auth.js");
const profileRouter = require ("./routes/profile.js")
const requestRouter = require("./routes/request.js");


app.use("/",authRouter);
app.use("/",profileRouter);
app.use("/",requestRouter);
  



// ✅ Start server
connectDB()
  .then(() => {
    console.log("✅ Database connection established..");
    app.listen(7777, () => {
      console.log("🚀 Server is listening on port 7777...");
    });
  })
  .catch((err) => {
    console.log("❌ Database cannot be connected", err);
  });
//////////////////////////////////////////////////////////////
middlerware auth.js
const jwt = require("jsonwebtoken");
const User = require("../models/user");

const userAuth = async (req , res , next) =>{
    try{ 
        const { token} = req.cookies;
        if (!token){ 
            throw new Error ("token is not valid !!!!!!!");

        }
        const decodeObj = await jwt.verify(token, "DEVA@tinder$543");
       // console.log(token); ");
        const { _id} = decodeObj;
        const user = await User.findById(_id);
        if(!user){
            throw new Error("User not found");

        } 

        application.user = user; 
        next ();

    } catch (err){
        res.status(400).send("Error: "+err.messsage);

    }
};
module.exports = {
    userAuth,
    
}


const mongoose = require ("mongoose");

const connectionRequestSchema = new mongoose.Schema( 
    {
        fromUserId: { 
            type:mongoose.Schema.type.ObjectId,
            required:true,
        },
        toUserId:{ 
            type:mongoose.Schema.Types.ObjectId,
            required:true,
        },
        status: { 
            type:String,
            required:true,
            enum: { 
                values: ["ignored", "interested","accepeted","rejected"],
                message:` {VALUE} IS INCORRET STATUS TYPE`,
            },
        },
    },
    { timeseries:true}
);

const ConnectionRequestModel = new mongoose.model(
    "connectionRequest",
    connectionRequestSchema
);

module.exports = ConnectionRequestModel;




const express = require("express");
const { userAuth } = require("../middlewares/auth");
const jwt = require("jsonwebtoken"); // ✅ added

const requestRouter = express.Router();

requestRouter.post("/request/send/:status/:toUserId", userAuth, async (req, res) => {
const ConnectionRequest = require("../models/connectionRequest");
try { 
  const fromUserId = req.user._Id;
  const toUserId = req.params.toUserId;
  const status = req.params.status;
  
  const connectionRequest = new ConnectionRequest({
    fromUserId,
    toUserId,
    status,
  });

  const data = await = connectionRequest.save();
  res.json({ 
    message:"connection request sent succdfully..",
    data, 
  });


  }catch(err) {
    res.status(400).send("error: " + err.message);
  }
  
});

module.exports = requestRouter;



const mongoose = require("mongoose");

const connectionRequestSchema = new mongoose.Schema(
  {
    fromUserId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    toUserId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    status: {
      type: String,
      required: true,
      enum: {
        values: ["ignored", "interested", "accepted", "rejected"],
        message: `{VALUE} is incorrect status type`,
      },
    },
  },
  { timestamps: true }
);

connectionRequestSchema.index({ fromUserId: 1, toUserId: 1 });

// ✅ fix: remove next(), just throw error
connectionRequestSchema.pre("save", function () {
  if (this.fromUserId.equals(this.toUserId)) {
    throw new Error("Cannot send connection request to yourself");
  }
});

const ConnectionRequestModel = mongoose.model(
  "ConnectionRequest",
  connectionRequestSchema
);

module.exports = ConnectionRequestModel;
