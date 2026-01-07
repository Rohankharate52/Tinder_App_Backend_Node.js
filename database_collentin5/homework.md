//update data of the user..
app.patch("/user",async (req,res) => {
    const userId = res.body.userId;

    const data = req.body;
    try {
        const user = await User.findByAndUpdate({ _id: userId } ,data,{
            returnDocument: "after",
            runValidators,
        });
        cosole.log(user);
        res.send("user update succefuuly);

    } catch (err) {
        res.status(400).send("something went wrong");
    }
})





// 2
app.patch("/user",async(req,res) => {
    const userId = req.body.userId;
    const data = req.body;
    console.log(data);
    try { 
      const user =   await User.findByIdAndUpdate({ _id: userId},data);

        res.send("user update succdufuuly h ") ; 
    } catch(err) {
        res.status(400).send("something went wrong");
    }
});





    photoUrl : { 
        type: String,
        default: " https://www.clipartmax.com/png/middle/202-2029196_shivaprakash-b-dummy-user.png",
      validate(value) {
            if (!validate.isURL(value)){
                throw new Error("invalid URL : address : "+value);
            }
    },
    about: {
        type: String,
        default: "this is a default about of the user",

    },

    