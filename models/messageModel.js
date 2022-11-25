const mongoose = require("mongoose");

const MessageSchema = mongoose.Schema(
  {
     message: {
      text: { type: String, required: true },
    }
    ,sender_id:{
        type:String,
        required:true,
       default:[]
    },sender_reg_no:{
        type:String,
       default:[]
    },sender_number:{
        type:Number,
       default:[],
        required:true
    },sender_name:{
        type:String,
       default:[]
    },receiver_id:{
        type:String,
       default:[]
    },receiver_reg_no:{
        type:String,
       default:[]
    },receiver_number:{
        type:Number,
       default:[]
    },receiver_name:{
        type:String,
       default:[]
    },text_message:{
        type:String,
       default:[]
    },file_msg:{
        type:String,
       default:[]
    },gallery_files:{
        type:String,
       default:[]
    },user_location:{
        type:String,
       default:[]
    },ducuments:{
        type:String,
       default:[]
    },contacts:{
        type:String,
       default:[]
    },voice_record_msg:{
        type:String,
       default:[]
    },mems_icon_msg:{
        type:String,
       default:[]
    },message_status:{
        type:String,
       default:[]
    }
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Messages", MessageSchema);