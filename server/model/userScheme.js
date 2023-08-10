const mongoose = require("mongoose");

const UserScheme = new mongoose.Schema({
   
    date:{
        type:Date,
        default:Date.now
    },
    name:{
        type:String,
        required:true
    },
    mobile:{
        type:Number,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    message:{
        type:String,
        required:true
    }  
        
});


const User = mongoose.model("User",UserScheme);
module.exports = User;