const mongoose=require('mongoose');
const {Schema}=mongoose
const ProductSchema=new Schema({
    productName:{
        type:String,
        required:true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    description:{
        type:String,
        required:true,
    },
    price:{
        type:Number,
        required:true
    },
    category:{
        type:String,
        required:true
    },
    subCategory:{
        type:String,
    },
    images:{
        type:[String],
        required:true
    },
    date:{
        type:Date,
        default:Date.now
    }
});
const Product=mongoose.model('Product',ProductSchema);
module.exports=Product;