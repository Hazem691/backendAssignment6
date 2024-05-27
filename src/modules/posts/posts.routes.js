import { Router } from "express";
import { addPOST, deletePost, getPost, getSpecificPost, updatePost } from "./posts.controller.js";



const router = Router() ;

router.get('/posts',getPost);
router.post('/posts',addPOST) ;
router.put('/posts/:id',updatePost);
router.get('/specificPostDetail/:id',getSpecificPost) ;
router.delete('/posts/:id',deletePost) ;


export default router ;