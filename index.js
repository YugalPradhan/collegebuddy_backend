const express=require("express")
const app=express()
require('dotenv').config();
const port=process.env.PORT || 80
const host=process.env.BASE_URL;
const mongoURI=process.env.DB_URI;
const cors=require('cors')

app.use(cors());
app.use(express.json())
const mongoose=require('mongoose')
mongoose.connect(mongoURI).then(()=>{
    console.log("connected to MongoDB");
})
.catch((err)=>{
    console.log('Error connecting to MongoDB: ',err);
})

app.use('/auth',require('./routes/auth'))
app.use('/product',require('./routes/product'))
app.use('/college',require('./routes/college'))
app.use('/message',require('./routes/message'))
app.get('/',(req,res)=>{
    res.json({message:"Hello World"})
})
app.listen(port,()=>{
    console.log(`app listening at ${host}`)
})