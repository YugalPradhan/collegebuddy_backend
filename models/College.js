const mongoose=require('mongoose');
const {Schema}=mongoose
const CollegeSchema=new Schema({
    name:{
        type:String,
        required:true
    }
});
const College=mongoose.model('College',CollegeSchema);
module.exports=College;