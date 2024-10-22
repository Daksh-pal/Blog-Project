import Blog from "../models/blogModel.js";


// For all blogs of a specific User 
export const userBlogs = async (req,res) => {
    const {userId} = req.params;
    try {
        const blogs = await Blog.find({author : userId});
        return res.status(201).send(blogs);
    } catch (error) {
        console.log("Error in fetching user blogs",error);
        return res.status(500).json({error: "Internal server error"});
    }
}



// For a specific blog with blogID 
export const blog = async (req,res) => {
    const {blogId} = req.params;
    try {
        const blog = await Blog.findById(blogId);
        if(!blog){
            return res.status(401).json({error : " No such blog exists"})
        }
        
        return res.status(201).send(blog);
    } catch (error) {
        console.log("Error in fetching user blogs",error);
        return res.status(500).json({error: "Internal server error"});
    }
}


export const deleteBlog = async (req,res) => {
    const blogId = req.params.blogId;
    try {
        const deleteBlog = await Blog.findByIdAndDelete(blogId);
        
        if(!deleteBlog){
            return res.status(401).json({error : " No such blog exists"})
        }
        
        return res.status(201).json({message : " Blog deleted successfully"});
    } catch (error) {
        console.log("Error in fetching user blogs",error);
        return res.status(500).json({error: "Internal server error"});
    }
}

// For all random blogs to display them on homepage
export const allBlogs = async (req,res) => {
    try {
        const blogs = await Blog.find();
        return res.status(201).send(blogs);
    } catch (error) {
        console.log("Error in catching all blogs ",error);
        return res.status(500).json({error: "Internal server error"});
    }
}


// To create a new blog 
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


export const updateBlog = async (req,res) => {
    const {userId} = req;
    const {blogId} = req.params;
    const {title,content} = req.body;
    try {
        if(!title || !content ){
            return res.status(401).json({error : " Please fill all input fields"})
        }

        const blog = await Blog.findOne({author : userId , _id : blogId})
        
        if(!blog){
            return res.status(401).json({message : "No such blog exists"})
        }

        await Blog.findByIdAndUpdate(blogId,{title,content});
        
        console.log(blog)
        return res.status(201).json({message :" Blog Updated successfully"})


    } catch (error) {
        console.log("Error in testing api ",error);
        return res.status(500).json({error: "Internal server error"});
    }
}
