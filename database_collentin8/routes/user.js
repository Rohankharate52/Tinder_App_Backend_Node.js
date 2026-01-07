









const express = require("express");
const { userAuth } = require("../middlewares/auth");
const ConnectionRequest = require("../models/connectionRequest");
const User = require("../models/user");
const { ConnectionReadyEvent } = require("mongodb");

const userRouter = express.Router();
const USER_SAFE_DATA = "firstName lastName photourl age gender about skilss";

userRouter.get("/user/requests/received", userAuth, async (req, res) => {
  try {
    const loggedInUser = req.user;

    // find all requests sent TO the logged-in user with status "interested"
    const connectionRequests = await ConnectionRequest.find({
      toUserId: loggedInUser._id,
      status: "interested",
    }).populate("fromUserId", "firstName lastName photoUrl"); 
    // 👆 optional populate if you want sender details

    res.json({
      message: "Data fetched successfully",
      data: connectionRequests,
    });
  } catch (err) {
    res.status(400).send("ERROR: " + err.message);
  }
});


//set all the pending connetion for the logged user
userRouter.get("/user/connections", userAuth, async (req, res) => {
  try {
    const loggedInUser = req.user;

    // find all accepted connections where user is either sender or receiver
    const connectionRequests = await ConnectionRequest.find({
      $or: [
        { toUserId: loggedInUser._id, status: "accepted" },
        { fromUserId: loggedInUser._id, status: "accepted" },
      ],
    })
      .populate("fromUserId", USER_SAFE_DATA)
      .populate("toUserId" ,USER_SAFE_DATA);
      
      console.log(connectionRequests);

      const data = connectionRequests.map((row) => {
        if(row.fromUserId.toString() === loggedInUser._id.toString()) {
            return row.toUserId;
        }
        return row.fromUserId;
      });
      
      



    res.json({ data });
  } catch (err) {
    res.status(400).send({ message: err.message });
  }
});


userRouter.get("/feed", userAuth, async (req, res) => {
  try {
    const loggedInUser = req.user;
  
 const page = parseInt(req.query.page) || 1; //25limit
 const limit = parseInt(req.query .limit) || 10;
 //const skip = (page-1) * limit;
limit = limit> 50 ? 50: limit;



    // ✅ find requests where logged in user is either sender or receiver
    const connectionRequests = await ConnectionRequest.find({
      $or: [{ fromUserId: loggedInUser._id }, { toUserId: loggedInUser._id }],
    }).select("fromUserId toUserId");

    const hideUserfromFeed = new Set();

    connectionRequests.forEach((reqObj) => {
      hideUserfromFeed.add(reqObj.fromUserId.toString());
      hideUserfromFeed.add(reqObj.toUserId.toString());
    });

    const users = await User.find({
      $and: [
        { _id: { $nin: Array.from(hideUserfromFeed) } }, // exclude connected users
        { _id: { $ne: loggedInUser._id } }, // exclude self
      ],
    })
    .select(USER_SAFE_DATA)
    .skip(skip)
    .limit(limit);

    res.send(users);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = userRouter;
