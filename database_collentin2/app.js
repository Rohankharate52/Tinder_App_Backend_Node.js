const express = require ("express");
 const connectDB = require ("./src/config/database.js");
const app = express();
const User = require ("./models/user");

app.post("./singup", async(req,res) => {
    // creating a new instance of the user model
    const user = new User({ 
            firstName: "virat ",
            lastName : "kolhi",
            emaiId : "virat@gmail.com",
            password: "virat@223",

    });
    await user.save;
    res.send("User addd succsufuuly");
});


connectDB()
.then(() => {
    console.log("database connectioon established..");
    
app.listen(7777,() => {
    console.log("server is successfully listening on port 7777 ...");

})


})
.catch((err) => {
    console.log("database connot be coonected");
});


