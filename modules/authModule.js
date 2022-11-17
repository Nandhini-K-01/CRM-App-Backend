const jwt = require("jsonwebtoken");

//Authenticate user
exports.authenticateUser = (req,res,next) => {
    //Checking if token exists
    if(!req.headers.accesstoken){
        return res.status(400).send({msg:"Token not found"});
    }

    //token validation
    try{
        const user = jwt.verify(req.headers.accesstoken, process.env.SECRET_KEY)
        // console.log(user)
        req.body.currentuser = user;
        next();
    }catch(err){
        console.log(err);
        return res.status(500).send({msg:"Unauthorized"})
    }   
}

exports.authorizeUser = (req,res,next) => {
        if(req.body.currentuser.role === "admin"){
            next();
        
    }else{
        return res.status(404).send({msg:"You are not an authorised user"})
    }
}