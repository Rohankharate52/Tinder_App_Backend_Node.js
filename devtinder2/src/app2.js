const express = require ("express");
const app = express();

app.get("/user/:userId/:name/:password",(req,res)=>{
    console.log(req,params);
    res.send({firstName: "Akshay",lastName: "Saini"});

});
app.listen,() =>{
    console.log("Server is succesfully on port ")
}
