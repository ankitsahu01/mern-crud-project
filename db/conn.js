const mongoose= require('mongoose');

const DB= process.env.DATABASE;

mongoose.connect(DB,{
    useNewUrlParser:true,
    useCreateIndex:true,
    useUnifiedTopology:true,
    useFindAndModify:false
}).then(()=>{
    console.log("DB Connection Successful.")
}).catch((err)=>{
    console.log(`DB Connection Failed. Error:${err}`)
});