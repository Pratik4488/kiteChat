const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  user_reg_no: {
    type: String,
    default:[]
  },country:{
    type:String,
    default:[]
  },user_phone_number:{
    type:Number,
    default:[]
  },user_image:{
    type:String,
    default:[]
  },user_name:{
    type:String,
    default:[]
  },user_bio:{
    type:String,
    default:[]
  },user_dob:{
    type:Date,
    default:[]
  },user_ip_address:{
    type:String,
    default:[]
  },user_phone_name:{
    type:String,
    default:[]
  },user_fcm:{
    type:String,
    default:[],
  },user_status:{
    type:Boolean,
    default:false,
  }
});

module.exports = mongoose.model("Users", userSchema);