import mongoose from "mongoose";
import User from "./userModel.js";

const blogSchema = new mongoose.Schema({
    title : {
        type : String,
        required : true
    },
    content : {
        type : String ,
        required: true,
    },
    author : {
        type : mongoose.Schema.Types.ObjectId,
        ref : User,
        required : true
    },
    createdAt  : {
        type : Date,
        default : Date.now
    },
    updatedAt : {
        type : Date ,
        default : Date.now
    }
})

const Blog = new mongoose.model('Blog' , blogSchema);

export default Blog;