import { Model } from "sequelize";
import postModel from "../../../db/models/post.model.js";
import userModel from "../../../db/models/user.model.js"
import bcrypt from 'bcryptjs';
import commentModel from "../../../db/models/comment.model.js";

export const getUsers = async (req,res,next)=>{
    const users = await userModel.findAll()
    res.status(200).json({msg :"done",users})
}

export const userRegister = async(req,res,next)=>{
      const {userName,email , password} = req.body ;
      const existedEmail = await userModel.findOne({
        where : {email} ,

      });
      if(existedEmail == null){
      const hashedPassword = await bcrypt.hash(password, 10);
      const user = await userModel.create({userName, email, password: hashedPassword });
      res.status(201).json({ message: 'User registered successfully', user });

      }
      else{
        res.status(201).json({message : "You have already signed up"});
      }
      
   

}
export const getUserDetails = async (req,res,next)=>{
    const {id} = req.params ;
    const user = await userModel.findOne({
        where :{
            id
        },
        include :{
            model : postModel,
            attributes: ['id','title','content'],
            include :{
                model: commentModel,
                attributes: ['id','content']
            }
        },
        
    })
    res.status(200).json({user});
}


export const userLogin = async(req,res,next)=>{
    const {email , password} = req.body ;
    const user = await userModel.findOne({
        where : {
            email 
        }
    })
    if(!user){
        res.status(401).json({message : "You haven't signed up yet ...."}) ;
    }
    else{
        const correctPassword = await bcrypt.compare(password , user.password);
        if(!correctPassword){
            return res.status(401).json({ error: 'Invalid email or password' });
        }
        else{
            res.status(200).json({ message: 'Login successful' });
        }
    }
}

export const userLogout = async (req,res,next)=>{
    const{id} = req.params ;
    const user = await userModel.findByPk(id);
    if(!user){
        res.status(401).json({message : "User is not founnd"});
    }
    else{
        res.status(201).json({message : "Logged out successfully ...."});

    }
}
