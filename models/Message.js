const mongoose=require('mongoose');
const {Schema}=mongoose
const MessageSchema=new Schema({
  sender: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
  },
  product:{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product'
  },
  text: {
    type: String,
    required: true
  },
  timestamp: {
    type: Date,
    default: Date.now
  },
  senderName:{
    type:String
  }
});
const Message=mongoose.model('Message',MessageSchema);
module.exports=Message;