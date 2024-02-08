const mongoose=require("mongoose")
import { model } from './../node_modules/mongoose/types/index.d';
const UserSchema=new Schema({
    uid:{
        type:String,
    },
},
{timestamps: true});
const Uid=model("Users",UserSchema)
export default Uid;


