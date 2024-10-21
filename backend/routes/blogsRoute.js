import { Router } from "express";
import { allBlogs } from "../controllers/blogController.js";

const router = Router();

router.get('/' , allBlogs)

export default router;