const jwt=require('jsonwebtoken');
const JWT_SECRET_KEY="namanisbright";

const user=function(req,res,next){

    const token=req.header('auth-token');

    if(!token){
        res.status(401).send({error:"invalid token!"});
    }

    const data=jwt.verify(token,JWT_SECRET_KEY);
    req.user=data.user;

    next();
}
module.exports=user;