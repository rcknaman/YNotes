const mongoose=require('mongoose');

const mongoUrl="mongodb://localhost:27017/inotebookdb";

const mongoconnect=async function(){

    mongoose.connect(mongoUrl,()=>{
        console.log("successfully connected to db :>");

    });

}
module.exports=mongoconnect;