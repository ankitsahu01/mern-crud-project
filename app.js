const dotenv= require('dotenv');
dotenv.config({ path:'./config.env' });
require('./db/conn');
const express= require('express');
const cookieParser = require('cookie-parser');
const cors= require('cors');

const app = express();

app.use(cors());
app.use(express.json());
app.use(cookieParser());

// We use the router files to make out route easy
app.use(require('./routers/auth'));

if(process.env.NODE_ENV==="production"){
    const path = require('path');
    app.use(express.static(path.resolve(__dirname,'client','build')));
    app.get('/*',(req,res)=>{
        res.sendFile(path.resolve(__dirname,'client','build','index.html'));
    });
}

const PORT= process.env.PORT;
app.listen(PORT, ()=>console.log(`Express Server Listing At ${PORT}`));