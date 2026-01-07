const express = require ("express");
 const connectDB = require ("./src/config/database.js");
const app = express();



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


