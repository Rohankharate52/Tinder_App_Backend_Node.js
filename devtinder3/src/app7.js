
//error handing
const express = require("express");
const app = express();


////////////////////////////////
app.get("getUserData",(req,res)=> {
    try {
    //logic of db call and get user data
    throw new Error("dvbzhif") ;
    res.send("user data sent");
} catch(err) {
    res.status(500).send("some error contact ");
}
});
/////////////////////////////////////////////////////////////////
/////////////////////////////////////////
app.use("/",(err,req,res,next)=>{
    if(err) {
        res.status(500).send("something went wrong");
    }
});
/////////////////////////////////////////////////////// 
app.listen(7777,()=> {
    console.log("server is successfully listning on port 7777");

})