const express = require('express');
const router = express.Router();
const User = require('../models/User');
const College = require('../models/College'); // Assuming you have a College model
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET;

router.post('/signup', async (req, res) => {
  let success = false;
  let user = await User.findOne({ email: req.body.email });
  if (user)
    return res.status(400).json({ success, error: "Email already exists" });

  const salt = await bcrypt.genSalt(10);
  const secPass = await bcrypt.hash(req.body.password, salt);
  
  user = await User.create({
    name: req.body.name,
    password: secPass,
    email: req.body.email,
    college:req.body.college // Assign college reference to user
  });
  const data = {
    user: {
      id: user._id,
      college:user.college
    },
  };
  const authToken = jwt.sign(data, JWT_SECRET);
  success = true;
  return res.json({ success, authToken });
});

router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  let success = false;
  let user = await User.findOne({ email });
  if (!user) {
    return res.status(400).json({ success, error: "Invalid credentials" });
  }
  
  const passwordCompare = await bcrypt.compare(password, user.password);
  if (!passwordCompare) {
    return res.status(400).json({ success, error: "Invalid credentials" });
  }
  
  const data = {
    user: {
      id: user.id,
      college:user.college
    }
  };
  const authToken = jwt.sign(data, JWT_SECRET);
  success = true;
  return res.json({ success, authToken });
});

module.exports = router;
