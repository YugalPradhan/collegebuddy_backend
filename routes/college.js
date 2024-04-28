const express=require('express')
const router=express.Router();
const College=require('../models/College')

router.post('/addcollege',async (req,res)=>{
    try {
        const existingCollege = await College.findOne({ name: req.body.name.toUpperCase() });
        if (existingCollege) {
          res.status(200).json(existingCollege);
        } else {
          const newCollege = new College({ name: req.body.name.toUpperCase() });
          const savedCollege = await newCollege.save();
          res.status(201).json(savedCollege);
        }
      } catch (err) {
        res.status(500).json({ error: err.message });
      }
})
router.get('/getcolleges', async (req, res) => {
    try {
      const colleges = await College.find().sort('name');
      res.json(colleges.map(college => college.name));
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });
module.exports=router;