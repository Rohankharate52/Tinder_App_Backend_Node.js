  const express = require ("express");
  const app = express();
  const { adminAuth,userAuth } = require("./middlewares/auth");


  //middlerware 
  app.use("/Admin", adminAuth);

  app.get("/user",userAuth ,(req,res) => {
    res.send("user data sent")
  });


  app.get("/admin/getAllData",(req,res) =>{
    res.send("All data sent");
  });


  app.get("/admin/deleteUser", (req,res)=> {
    //logicc of chekuin if the is authrized 
    res.send("delete a user");
  });

  
  
  app.listen(7777,() => {
    console.log("server is succdfully listing on port 7777")
  })