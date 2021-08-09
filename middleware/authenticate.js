const jwt = require('jsonwebtoken');
const userModel = require('../models/userSchema');

const authenticate= async (req, res, next)=>{
    try{
        const token = req.cookies.jwtoken;
        if(token){
            const verifyToken = jwt.verify(token, process.env.JWT_SECRET_KEY);
            const rootUser = await userModel.findOne({"_id":verifyToken._id, "tokens.token":token},{"name":1,"email":1,"phone":1});
            if(rootUser){
                req.isAuthorize= 1;
                req.token = token;
                req.rootUser = rootUser;
                req.userId = rootUser._id;
            }else{req.isAuthorize= 0;}
        }else{
            req.isAuthorize= 0;
        }
    }catch(err){
        console.log(err);
    }
    next();
}

module.exports= authenticate;