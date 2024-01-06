const jwt=require('jsonwebtoken')

const verifyToken=(req,res,next)=>{
    const token=req.cookies.token
    if(!token){
        return res.status(401).json("you are not authenticated");
    }else{
        jwt.verify(token,process.env.SECRET,async(err,data)=>{
            if(err){
                return res.status(403).json("token is not valid")
            }else{
                req.userId=data._id
                // console.log("passed");
                next();
            }
        })
    }
}

module.exports=verifyToken;