import Blog from "../models/blogModel.js";

export const userBlogs = async (req,res) => {
    
    const {userId} = req;
    try {
        const blogs = await Blog.find({author : userId});
        
        return res.status(201).send(blogs);
    } catch (error) {
        console.log("Error in fetching user blogs",error);
        return res.status(500).json({error: "Internal server error"});
    }
}

export const allBlogs = async (req,res) => {
    try {
        const blogs = await Blog.find();
        return res.status(201).send(blogs);
    } catch (error) {
        console.log("Error in catching all blogs ",error);
        return res.status(500).json({error: "Internal server error"});
    }
}

export const addBlog = async (req,res) => {
    const {userId} = req;
    const {title,content} = req.body;
    try {
        if(!title || !content ){
            return res.status(401).json({error : " Please fill all input fields"})
        }
        
        const newBlog = new Blog({title,content,author:userId});
        await newBlog.save();
        

        return res.status(201).json({message :" Blog added successfully"})


    } catch (error) {
        console.log("Error in adding task ",error);
        return res.status(500).json({error: "Internal server error"});
    }
}