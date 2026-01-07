const express = require("express");
const app = express();

//

app.get("/user",(req,res,next)=>{
    console.log("handing the route user");
    next();
});
app.get("/user",(req,res,next) => {
    console.log("handing the route 2");  //run this first  res.send
     res.send("2 route handler");
});


app.listen(6000,() => {
    console.log("server is succeddfull on port ??")
})