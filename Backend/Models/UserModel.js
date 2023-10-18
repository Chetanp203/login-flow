import mongoose, { Schema } from "mongoose";

const userSchema = new Schema({
    name:{
        type:String
    },
    number:{
        type:Number
    },
    password:{
        type:String
    }
})

export default mongoose.model("User",userSchema)