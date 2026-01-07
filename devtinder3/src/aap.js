const express = require("express");
const app = express();

//app.use("route", rh, [rh2,rh3],rh4,rh5);

app.get(
    "/user",
    (req,res,next)=>{
        console.log("handing the route user");
        next();
    },
    (req,res,next)=> {
        console.log("handing theh route user 2 ");
        next();

    },
    (req,res,next)=> {
        console.log("handing the route user 3 ");
        next();
    },
    (req,res,next)=>{
        console.log("handing the route user 4 ");
        next();
    }
)
app.listen( 5000,() => {
    console.log("hello from 5000")

}) 