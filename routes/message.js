const express=require('express')
const router=express.Router();
const Message=require('../models/Message')
const Product=require('../models/Product')
const fetchuser = require('./fetchuser');
const User = require('../models/User');

//route 3 update note
router.post('/addmessage/:productId', fetchuser, async (req, res) => {
    try {
      const productId = req.params.productId;
      const { text } = req.body;
      const userId = req.user.id; // Assuming fetchUser middleware sets req.user with user information
  
      // Check if the product exists
      const product = await Product.findById(productId);
      if (!product) {
        return res.status(404).json({ error: 'Product not found' });
      }
      // Create a new message object
      const sender=await User.findById(userId);
      const message = new Message({
        sender: userId,
        product: productId,
        text,
        senderName:sender.name
      });
  
      // Save the message to the database
      await message.save();
      res.status(201).json({ message,user:userId });
    } catch (error) {
      console.error('Error sending message:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });

  router.get('/productmessages/:productId', fetchuser, async (req, res) => {
    try {
      const productId = req.params.productId;  
      const userId = req.user.id; 
      // Check if the product exists
      const product = await Product.findById(productId);
      if (!product) {
        return res.status(404).json({ error: 'Product not found' });
      }  
      // Fetch messages related to the product and involving the user
      const messages = await Message.find({product: productId});
  
      res.json({ messages,user:userId });
    } catch (error) {
      console.error('Error fetching messages:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });
  

  module.exports = router;