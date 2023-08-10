const express = require("express");
// const UserAll = require("../model/userScheme");
const UserRegister = require("../model/RegScheme");
const BloodRequestScheme = require("../model/BloodRequestScheme");
const Authenticate = require("../middleware/authenticate");
const router = express.Router();

router.get('/', (req, res) => {
  res.send("Hello Akash");
})


//for registration
router.post('/register', async (req, res) => {
  const { name, gmail, mobile, blood, pin, password, cpassword } = req.body;
  if (!name || !gmail || !mobile || !blood || !pin || !password || !cpassword) {
    return res.status(422).json({ message: "Filled properly" });
  };
  try {
    const userExist = await UserRegister.findOne({ gmail: gmail });
    if (userExist) {
      return res.status(422).json({ message: 'User already exist' })
    } else if (password != cpassword) {
      return res.status(422).json({ message: 'password are not matching' })
    }
    else {
      const user = new UserRegister({ name, gmail, mobile, blood, pin, password, cpassword });
      await user.save();
      res.status(201).json({ message: "User Register Successfully" })
    }
  } catch (error) {
    console.log(error);
  }
});

//for login
router.post("/login", async (req, res) => {
  try {
    const { gmail, password } = req.body;
    if (!gmail || !password) {
      return res.status(400).json({ message: "Please enter the proper data" });
    }
    const userlogin = await UserRegister.findOne({ gmail });
    if (userlogin) {
      const isMatch = await UserRegister.findOne({ password });

      const token = await userlogin.generateAuthToken();
      res.cookie("blood", token, {
        expires: new Date(Date.now() + 25892000000),
        httpOnly: true,
      });
      if (!isMatch) {
        res.status(400).json({ message: "Invalid Password" });
      } else {
        //   console.log(token);
        res.status(201).json({ message: "User login successfully" });
      }
    } else {
      res.status(400).json({ message: "Invalid Email Address" });
    }
  } catch (error) {
    console.log(error);
  }
});

//for logout
router.get("/logout", (req, res) => {
  res.clearCookie("blood", { path: "/" });
  return res.status(200).send("User Logout");
});

//for contact

//contact us
router.post("/contact", Authenticate, async (req, res) => {
  try {
    const { name, email, phone, message } = req.body;
    console.log(name, email, phone, message)
    if (!name || !phone || !email || !message) {
      return res.status(400).json({ message: "plz filled the contact form" });
    }
    const userContact = await UserRegister.findOne({ _id: req.userId });
    if (userContact) {
      const userMessage = await userContact.addMesage(
        name,
        email,
        phone,
        message
      );
      await userContact.save();
      res.status(201).json({ message: "Message has been send" });
    }
  } catch (error) {
    console.log(error);
  }
});
//getdata
router.get("/getUser", Authenticate, async (req, res) => {
  return res.send(req.rootuser);
});
//userVerify
router.get("/userVerify", Authenticate, async (req, res) => {
  return res.status(201).json({ message: "User Verify" })
})
module.exports = router;

//for search
router.post("/search", Authenticate, async (req, res) => {
  const { pin, blood } = req.body;

  if (blood && !pin) {
    const Data = await UserRegister.find({ blood: blood, donor_check: true, _id: { "$ne": req.userId } }, { "password": 0, "cpassword": 0, "date": 0, "messages": 0, "tokens": 0, "_id": 0 });
    if (Data.length === 0) {
      return res.status(404).json({ Success: false });
    }
    return res.status(202).json(Data);
  } else if (!blood && pin) {
    const Data = await UserRegister.find({ pin: pin, donor_check: true, _id: { "$ne": req.userId } }, { "password": 0, "cpassword": 0, "date": 0, "messages": 0, "tokens": 0, "_id": 0 });
    if (Data.length === 0) {
      return res.status(404).json({ Success: false });
    }
    return res.status(202).json(Data);
  } else {
    const Data = await UserRegister.find({ pin: pin, blood: blood, donor_check: true, _id: { "$ne": req.userId } }, { "password": 0, "cpassword": 0, "date": 0, "messages": 0, "tokens": 0, "_id": 0 });
    if (Data.length === 0) {
      return res.status(404).json({ Success: false });
    }
    return res.status(202).json(Data);
  }


})

//for update
router.put("/me/update/:id", Authenticate, async (req, res) => {
  const id = req.params.id;
  const Data = await UserRegister.findById(id);

  const { name, gmail, mobile, blood, pin, donor_check } = req.body;
  console.log(name, gmail, mobile, blood, pin, donor_check);

  if (!name || !gmail || !mobile || !blood || !pin) {
    return res.status(422).json({ message: "Filled properly" });
  }
  try {
    if (!Data) {
      return res.status(404).json({ message: "User not found" })
    } else {
      const Data = await UserRegister.findByIdAndUpdate(id, {
        name: name,
        gmail: gmail,
        mobile: mobile,
        blood: blood,
        pin: pin,
        donor_check: donor_check
      });
      await Data.save();
      const User = await UserRegister.findById(id);
      return res.status(201).json({ message: "User update Successfully", User });
    }

  } catch (error) {
    console.log(error);
  }
})

router.post("/generateBloodRequest", Authenticate, async (req, res) => {
  const { blood_group, pin_code, expiry_date, name, email, phone, message } = req.body;

  if (!blood_group || !pin_code || !expiry_date || !name || !email || !phone) {
    return res.status(422).json({ message: "Filled properly" });
  }
  try {
    const Data = await BloodRequestScheme({ blood_group, pin_code, expiry_date, name, email, phone, message });
    await Data.save();

    return res.status(201).json({ message: "Request generated Successfully" });
  } catch (error) {
    console.log(error);
  }
})

router.post("/getBloodRequestList", Authenticate, async (req, res) => {
  const { blood_group, pin_code } = req.body;

  try {

    let filter = {}
    if (blood_group != null) {
      filter["blood_group"] = blood_group
    }
    if (pin_code != "") {
      filter["pin_code"] = pin_code
    }

    const Data = await BloodRequestScheme.find(filter);

    return res.status(201).json({ message: "Request generated Successfully", data: Data });
  } catch (error) {
    console.log(error);
  }
})


// router.get("/getAllUser", async(req,res)=>{
//   try {
//     const allUser = await UserRegister.find({});
//     res.send({status: "ok",data: allUser});
//   } catch (error) {
//     console.log(error);
//   }
// })

// //delete user
// router.post("/deleteUser",async(req,res)=>{
//   const {userId}=req.body;
//   try {
//     User.deleteOne(
//       {_id:userId},function(err,res){
//         console.log(err);
//       }
//     );
//     res.send({status:"Ok",data:"Deleted"});
//   } catch (error) {
//     console.log(error);
//   }
// });


