require('dotenv').config();
const jwt = require("jsonwebtoken");
const User = require("../model/RegScheme.js");

const Authenticate =async(req,res,next)=>{
    try {
            const token = req.cookies.blood;
            const secretKey = process.env.SECRET_KEY;
            // console.log(token);
            if (!secretKey) {
                throw new Error("Secret key not provided");
            }
            const verifyToken = jwt.verify(token,secretKey);
            const rootuser = await User.findOne({_id:verifyToken._id,"tokens.token":token});
            if(!rootuser){
                throw new Error('User Not Found');
            }
                req.token = token;
                req.rootuser = rootuser;
                req.userId = rootuser._id;
                // console.log(`user id id :${req.userId}`);
                next();
            
    } catch (error) {
        res.status(401).send("Unauthorized: No token provided");
        console.log(error);
    }
}
module.exports = Authenticate