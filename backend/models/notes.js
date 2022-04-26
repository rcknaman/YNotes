const mongoose=require('mongoose');

const notesSchema = new mongoose.Schema({
    title: {
        type:String,
        required:true,
        

    },
    description:{
        type:String,
        required:true
    },
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'userSchema'
    },
    tag:{
        type:String,
        default:"general"
    },
    date:{
        type:Date,
        default:Date.now
    }
});

const notes = mongoose.model('Note', notesSchema);
module.exports=notes;