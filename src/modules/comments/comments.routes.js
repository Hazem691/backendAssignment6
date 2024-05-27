import { Router } from "express";
import { createComment, deleteComment, getComment, updateComment } from "./comments.controller.js";


const router = Router();
router.get('/comments',getComment);
router.post('/comments',createComment);
router.put('/comments/:id',updateComment);
router.delete('/comments/:id',deleteComment);


export default router ;