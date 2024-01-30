require('dotenv').config();
const port = process.env.PORT || 5000;
const express = require('express');
const cookieParser = require("cookie-parser")
const app = express();
const mongoose = require("mongoose");
const uri = process.env.MONGODB_URI;
const cors = require("cors");
app.use(cookieParser())
app.use(express.json());
app.use(cors());
app.use(require("./routes/auth"));
const Connect =async()=>{
    await mongoose.connect(uri).then(()=>{
        console.log("connected..");
    }).catch((err)=>{
        console.log(err);
    });
}     
Connect();

app.listen(port, () => {
  console.log(`app is listening on port ${port}`);
});

//fetch all users
require("./model/RegScheme");
const UserRegister=mongoose.model("UserRegistration")
app.get("/getAllUser", async(req,res)=>{
    try {
      const allUser = await UserRegister.find({});
      res.send({status: "ok",data: allUser});
    } catch (error) {
      console.log(error);
    }
  })

  //delete user
  app.post("/deleteUser", async (req, res) => {
    const { userId } = req.body;
    try {
      await UserRegister.deleteOne({ _id: userId });
      res.send({ status: "Ok", data: "Deleted" });
    } catch (error) {
      console.log(error);
      res.status(500).send({ status: "Error", data: "Failed to delete user" });
    }
  });

//get user messages
app.get("/getAllUserMessages", async (req, res) => {
  try {
    const allUserMessages = await UserRegister.find({}).populate("messages");
    res.send({ status: "ok", data: allUserMessages });
  } catch (error) {
    console.log(error);
  }
});
  
  // Delete a specific message from a user
app.post("/deleteMessage", async (req, res) => {
  try {
    const { userId, messageId } = req.body;
    const user = await UserRegister.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    user.messages = user.messages.filter(
      (message) => message._id.toString() !== messageId
    );

    await user.save();

    res.status(200).json({ message: "Message deleted successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error deleting message" });
  }
});