//

//get user by Emailid ....
app.get("/user",async (req,res) => {

    const userEmail = req.body.emailId;


    try {
       const users = await User.find({ emailId: userEmail});
       if(users.length === 0) {
         res.status(404).send("user not found");

        }else {
            res.send(users);
        } 
    }catch(err) {
            res.status(400).send("something went wrong");
        }
});



update 

app.patch("/user",async(req,res) => {
    const userId = req.body.userId;
    const data = req.body;
    console.log(data);
    try { 
        await User.findByAndUpdate({ _id: userId},data);
        res.send("user update succdufuuly h ") ; 
    } catch(err) {
        res.status(400).send("something went wrong");
    }
});