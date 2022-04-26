const express=require('express');
const router=express.Router();
const fetchallnotes=require('../middleware/userMiddleware');
const Notes=require('../models/notes');
const { body, validationResult } = require('express-validator');
router.get('/fetchallnotes',fetchallnotes,async function(req,res){

    const notes=await Notes.find({user:req.user.id});
    res.json(notes);
});
router.post('/addnote',fetchallnotes,[
    body('description').isLength({ min: 5 }),
    body('title').isLength({ min: 3 })],async function(req,res){

        const {title,description,tag}=req.body;


    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const note=new Notes({

        title,description,tag,user:req.user.id
    })
    const savedNotes=await note.save();
    res.json(savedNotes);
});
router.put('/updatenote/:id',fetchallnotes,async function(req,res){

    let obj={};
    const {title,description,tag}=req.body;

    if(title){
        obj.title=title;
    }
    if(description){
        obj.description=description;
    }
    if(tag){
        obj.tag=tag;
    }
    console.log("req.params.id==req.user.id: ",req.params.id," ",req.user.id);
    let note=await Notes.findById(req.params.id);
    if(note.user==req.user.id){

        note=await Notes.findByIdAndUpdate(req.params.id,{$set:obj},{new:true});
        if(!note){
            res.json(404);
        }
        res.status(200).json(note)
    }
    res.status(401);

})
router.delete('/deletenote/:id',fetchallnotes,async function(req,res){

    let note=await Notes.findById(req.params.id);

    if(!note){
        return res.json(404);
    }
    if(note.user==req.user.id){
        await Notes.findByIdAndDelete(req.params.id);
        return res.json(200,{
            message:"deleted successfully"
        })
    }
    return res.json(401,{
        message:"not allowed"
    })

})

module.exports=router;