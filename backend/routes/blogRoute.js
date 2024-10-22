import { Router } from "express";
import authenticateUser from "../middlewares/authenticateUser.js";
import {addBlog, allBlogs, blog, deleteBlog, updateBlog, userBlogs} from "../controllers/blogController.js";

const router = Router();

router.get('/' , allBlogs)
router.get('/:blogId' , blog)
router.get('/user/:userId',userBlogs);
router.post('/add',authenticateUser, addBlog);
router.delete('/delete/:blogId',authenticateUser, deleteBlog);
router.put('/update/:blogId',authenticateUser, updateBlog);

export default router;