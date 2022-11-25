const mongoose = require("mongoose");

const MessageSchema = mongoose.Schema(
  {
    users: Array,
    sender: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    }, message: {
      text: { type: String, required: true },
    }
    ,sender_id:{
        type:String,
        required:true,
        default:"3525"
    },sender_reg_no:{
        type:String,
        default:"3525"
    },sender_number:{
        type:Number,
        default:"3525",
        required:true
    },sender_name:{
        type:String,
        default:"3525"
    },receiver_id:{
        type:String,
        default:"3525"
    },receiver_reg_no:{
        type:String,
        default:"3525"
    },receiver_number:{
        type:Number,
        default:"3525"
    },receiver_name:{
        type:String,
        default:"3525"
    },text_message:{
        type:String,
        default:"3525"
    },file_msg:{
        type:String,
        default:"3525"
    },gallery_files:{
        type:String,
        default:"3525"
    },user_location:{
        type:String,
        default:"3525"
    },ducuments:{
        type:String,
        default:"3525"
    },contacts:{
        type:String,
        default:"3525"
    },voice_record_msg:{
        type:String,
        default:"3525"
    },mems_icon_msg:{
        type:String,
        default:"3525"
    },message_status:{
        type:String,
        default:"3525"
    }
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("GroupMessages", MessageSchema);