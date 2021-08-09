const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const authenticate = require('../middleware/authenticate');
const userModel = require('../models/userSchema');
const contactUsModel = require('../models/contactUsSchema');

router.post('/signin', async (req,res)=>{
    // console.log(req.body);
    try{
        const {email,password}=req.body;
        const passwordEnteredByUser = password;
        if(!email || !passwordEnteredByUser){
            return res.status(400).json({error:"Please Fill All The Fields!"});
        }
        const userLogin = await userModel.findOne({email});
        if(userLogin){
            const hashPwd = userLogin.password;
            const isMatch = await bcrypt.compare(passwordEnteredByUser, hashPwd);
            if(isMatch){
                const token = await userLogin.generateAuthToken();
                const expireIn10Days = 10*24*60*60*1000;
                res.cookie("jwtoken",token,{
                    expires:new Date(Date.now()+expireIn10Days),
                    httpOnly:true //To Secure the cookie
                });
                return res.status(200).json({success:"Login Successful."});
            }
        }
        res.status(401).json({error:"Invalid Credentials!"});
    }catch(err){
        console.log(err);
    }
});

router.post('/register', async (req,res)=>{
    try{
        const {name, email, phone, password, cpassword} = req.body;
        if(!name || !email || !phone || !password || !cpassword){
            return res.status(422).json({error:"Please Fill All The Fields!"});
        }
        if(password!=cpassword){
            return res.status(400).json({error:"Password Not Matched!"});
        }
        const isEmailExist = await userModel.findOne({email:email});
        if(isEmailExist){
            return res.status(422).json({error:"User Email Already Exist!"});
        }
        const isPhoneExist = await userModel.findOne({phone:phone});
        if(isPhoneExist){
            return res.status(422).json({error:"User Phone Number Already Exist!"});
        }
        const user = new userModel({name,email,phone,password});
        const isSuccess = await user.save();
        if(isSuccess){
            res.status(201).json({success:"Data Stored Successfully."});
        }else{
            res.status(500).json({error:"Failed To Registered!"});
        }
    }catch(err){
        console.log(err);
    }
});

// Get user Data from token._id and send to the Front-end
router.get('/getdata', authenticate, (req,res)=>{
    if(req.isAuthorize){
        res.status(200).json(req.rootUser);
    }else{
        res.status(401).json({error:"Unauthorized"});
    }
});

// Store Details of Contact Us Form
router.post('/contact-us', async (req,res)=>{
    try{
        const {_id, name, email, phone, message} = req.body;
        const contactFormData = new contactUsModel({name,email,phone,message});
        if(_id){
            await contactFormData.registeredUser(_id);
        }
        const isSave = await contactFormData.save();
        if(isSave){
            res.status(200).json({success:"Message Sent Successfully."});
        }else{
            res.status(401).json({error:"Unable to send Message, Try Later."});
        }
    }catch(err){
        console.log(err);
    }
});

router.get('/logout', authenticate, async (req, res)=>{
    try{
        if(req.isAuthorize===1){
            await userModel.updateOne({"_id":req.userId},{$pull:{"tokens":{"token":req.token}}});
            res.clearCookie('jwtoken',{path:"/"});
        }
        res.status(200).json("Logout Successful.");
    }catch(err){
        console.log(err);
    }
});

module.exports= router;
