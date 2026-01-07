  const express = require ("express");
  const app = express();

  //middlerware 
  app.use("/Admin",(req,res,next) =>{
    console.log("Admin auth is getting chekck");
    const token ="xyz";
    const isAdminAuthorized = token === "xyz";
    if (!isAdminAuthorized){
        res.status(401).send("unauthroer req");
    }else {
        next();
    }
  })

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