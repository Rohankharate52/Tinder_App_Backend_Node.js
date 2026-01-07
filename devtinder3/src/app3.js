  const express = require ("express");
  const app = express();

  app.get("/admin/getAllData", (req,res,) =>{
    //login of cheaking if the request is authorized
    const token = "xyzclsjdkjdfkjf";
    const isAdminAuthorized = token === "xyz";
    if(isAdminAuthorized ){
        res.sendDate("all data sent");
    }else {
        res.status(401) ("unauthoirized request");
    }
  });

  app.get("/admin/deleteUser", (req,res)=> {
    //logicc of chekuin if the is authrized 
    res.send("delete a user");
  });

  
  app.listen(7777,() => {
    console.log("server is succdfully listing on port 7777")
  })