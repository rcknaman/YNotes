const express=require('express');
const router=express.Router();

router.use('/api/auth',require('./auth'));
router.use('/api/notes',require('./notes'));
module.exports=router;