




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
