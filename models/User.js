const mongoose=require('mongoose');
const {Schema}=mongoose
const UserSchema=new Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    college: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'College'
      }
});
const User=mongoose.model('User',UserSchema);
module.exports=User;