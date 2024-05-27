import { Router } from "express";
import { getUserDetails, getUsers, userLogin, userLogout, userRegister } from "./users.controller.js";



const router = Router() ;

router.get('/users',getUsers);
router.post('/signup',userRegister) ;
router.post('/login',userLogin);
router.get('/logout/:id',userLogout) ;
router.get('/users/:id',getUserDetails)
export default router; 