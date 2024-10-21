import { Router } from "express";
import authenticateUser from "../middlewares/authenticateUser.js";
import {addBlog, userBlogs} from "../controllers/blogController.js";

const router = Router();

router.get('/user',authenticateUser,userBlogs);
router.post('/user/add',authenticateUser, addBlog);

export default router;