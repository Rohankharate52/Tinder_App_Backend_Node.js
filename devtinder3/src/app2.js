const express = require("express");
const app = express();

//GET /user => middleware chain => request handlet

app.use("/",(req,res,next) => {
    //res.send("handdign / route");     //middlerware 
    next();

});

app.get( "/user" , (req,res,next)=> {
    console.log("Handling /user router");  //route 
    next();
  } ,
  (req,res,next) => {
    res.send("1st route handler")
  },
  (req,res,next)=> {
    res.send("2nd route handler")
  }
);

