const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const userSchema= new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    phone:{
        type:Number,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    date:{
        type:Date,
        default:Date.now

    },
    tokens:[
        {
            token:{
                type:String,
                required:true
            }
        }
    ]
});

// Wr are hashing the password, using middleware before the save() method...
userSchema.pre('save', async function(next){
    try{
        if(this.isModified('password')){
            this.password = await bcrypt.hash(this.password, 12);
        }
        next();
    }catch(err){
        console.log(err);
    }
});

// We are generating Token
userSchema.methods.generateAuthToken = async function(){
    try{
        let jwtToken = await jwt.sign({_id:this._id}, process.env.JWT_SECRET_KEY);
        // console.log(jwtToken);
        this.tokens = this.tokens.concat({token:jwtToken});
        await this.save();
        return jwtToken;
    }catch(err){
        console.log(err);
    }
}

const userModel= mongoose.model("user",userSchema);
module.exports = userModel;
