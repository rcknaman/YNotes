const express=require('express');
const router=express.Router();
const { body, validationResult } = require('express-validator');
const { findOne } = require('../models/user');
const User=require('../models/user');
const bcryptjs=require('bcryptjs');
const JWT_SECRET_KEY="namanisbright";
const fetchUser=require('../middleware/userMiddleware');
const jwt=require('jsonwebtoken');
router.post('/create',[ body('email').isEmail(),body('password').isLength({ min: 5 }),body('name').isLength({ min: 3 }),],async function(req,res){


    let user=await User.findOne({email:req.body.email});
    let success=true;
    console.log('!user: ',!user);
    if(!user){
        const salt=await bcryptjs.genSalt(10);
        let password=await bcryptjs.hash(req.body.password,salt);
        user=await User.create({

            name:req.body.name,
            password:password,
            email:req.body.email

        })
        const data={
            user:{
                id:user.id
            }
        }
        const authtoken=jwt.sign(data,JWT_SECRET_KEY);
        res.json({success,authtoken});
    }else{
        success=false;      
        res.json({success,message:"This user already exists!"});
    }
    success=false;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ success:success,errors: errors.array() });
      }
});



router.post('/login',[ body('email').isEmail(),body('password').isLength({ min: 5 })],async function(req,res){
    const errors = validationResult(req);
    let success=false;
    if (!errors.isEmpty()) {
        return res.status(400).json({ success:success,errors: errors.array() });
    }

    const {email,password}=req.body;

    try {
        
        let user=await User.findOne({email});
        if(!user){


            return res.status(400).json({success:success,error:"pleaase enter correct credentials"});
        }
        const passwordCompare=await bcryptjs.compare(password,user.password);
        console.log(password," ",user.password," ",passwordCompare);
        if(!passwordCompare){

            return res.status(400).json({success:success,error:"pleaase assword enter correct credentials"});
        }
        const data={
            user:{
                id:user.id
            }
        }

        success=true;
        const authtoken=jwt.sign(data,JWT_SECRET_KEY);
        res.json({success,authtoken});

    } catch (error) {
        res.status(500).send("internal sserver error"); 
    }



})

router.post('/getuser',fetchUser,async function(req,res){

    try {
        
        let userId=req.user.id;

        let user=await User.findById(userId).select("-password");
        res.send(user);


    } catch (error) {
        res.status(500).send("internal sserver error");
    }




})
module.exports=router;