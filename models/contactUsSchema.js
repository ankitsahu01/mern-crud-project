const mongoose = require('mongoose');

const contactUsSchema = new mongoose.Schema({
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
    message:{
        type:String,
        required:true
    },
    date:{
        type:Date,
        default:Date.now

    },
    isRegisteredUser:{
        status:{
            type:Boolean,
            required:true,
            default:false
        },
        userid:{
            type:String
        },
    }
});

// store already registerd user id
contactUsSchema.methods.registeredUser = function(id){
    this.isRegisteredUser.status = true;
    this.isRegisteredUser.userid = id;    
}

const contactUsModel = mongoose.model("contactus",contactUsSchema);
module.exports = contactUsModel;