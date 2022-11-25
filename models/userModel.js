const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  user_reg_no: {
    type: String,
    default:"3525"
  },country:{
    type:String,
    default:"3525"
  },user_phone_number:{
    type:Number,
    default:"3525"
  },user_image:{
    type:String,
    default:"3525"
  },user_name:{
    type:String,
    default:"3525"
  },user_bio:{
    type:String,
    default:"3525"
  },user_dob:{
    type:Date,
    default:"3525"
  },user_ip_address:{
    type:String,
    default:"3525"
  },user_phone_name:{
    type:String,
    default:"3525"
  },user_fcm:{
    type:String,
    default:"3525",
  },user_status:{
    type:Boolean,
    default:false,
  },username: {
    type: String,
    required: true,
    min: 3,
    max: 20,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    max: 50,
  },
  password: {
    type: String,
    required: true,
    min: 8,
  },
  isAvatarImageSet: {
    type: Boolean,
    default: false,
  },
  avatarImage: {
    type: String,
    default: "",
  },
});

module.exports = mongoose.model("Users", userSchema);