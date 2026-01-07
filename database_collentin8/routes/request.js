const express = require("express");
const { userAuth } = require("../middlewares/auth");
const ConnectionRequest = require("../models/connectionRequest");
const User = require("../models/user.js");

const requestRouter = express.Router();

requestRouter.post("/request/send/:status/:toUserId", userAuth, async (req, res) => {
  try {
    const fromUserId = req.user._id;
    const toUserId = req.params.toUserId;
    const status = req.params.status;

    const allowedStatus = ["ignored", "interested"];
    if (!allowedStatus.includes(status)) {
      return res.status(400).json({ message: "Invalid status type: " + status });
    }

    const toUser = await User.findById(toUserId);
    if (!toUser) {
      return res.status(404).json({ message: "User not found" });
    }

    // check if a connection request already exists
    const existingConnectionRequest = await ConnectionRequest.findOne({
      $or: [
        { fromUserId, toUserId },
        { fromUserId: toUserId, toUserId: fromUserId },
      ],
    });

    if (existingConnectionRequest) {
      return res.status(400).send({ message: "Connection request already exists" });
    }

    const connectionRequest = new ConnectionRequest({
      fromUserId,
      toUserId,
      status,
    });

    const data = await connectionRequest.save();

    res.json({
      message: `${req.user.firstName} is ${status} in ${toUser.firstName}`,
      data,
    });
  } catch (err) {
    // ✅ fix: remove next(err)
    res.status(500).json({ error: err.message });
  }
});

requestRouter.post("/request/review/:status/:requestId", userAuth, async (req, res) => {
  try {
    const loggedInUser = req.user;
    const { status, requestId } = req.params;

    const allowedStatus = ["accepted", "rejected"];
    if (!allowedStatus.includes(status)) {
      return res.status(400).json({ message: "status not allowed" });
    }

   

  const connectionRequest = await ConnectionRequest.findOne({
  _id: requestId,
  status: "interested",
  $or: [
    { toUserId: loggedInUser._id },     // receiver can accept/reject
    { fromUserId: loggedInUser._id }    // sender can cancel
  ]
});


    if (!connectionRequest) {
      return res.status(400).json({ message: "connection request not found" });
    }

    connectionRequest.status = status;
    const data = await connectionRequest.save();

    res.json({ message: "connection request " + status, data });
  } catch (err) {
    res.status(500).json({ error: err.message }); // ✅ fixed typo: save → send/json
  }
});





module.exports = requestRouter;
