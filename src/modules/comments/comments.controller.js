import { response } from "express"
import commentModel from "../../../db/models/comment.model.js"


export const getComment = async(req,res,next)=>{
    const comment = await commentModel.findAll()
    res.status(200).json(comment) ;

}

export const createComment = async(req,res,next)=>{
    const {content,userId,postId} = req.body ;
    const comment = await commentModel.create({content,userId,postId}) ;
    res.status(201).json({message : "Comment is created successfully ...",comment}) ;
}

export const updateComment = async(req,res,next)=>{
    const{content} = req.body ;
    const{id} = req.params ;
    const updatecomment = await commentModel.findByPk(id);
    if(!updatecomment){
        res.status(404).json({message : "comment is not found ..."}) ;
    }
    else{
        const updatethecomment = await commentModel.update({content}, { where: { id }}) ;
        res.status(201).json({message : "comment updated successfully ..."});
    }

}

export const deleteComment = async(req,res,next)=>{
    const {id} = req.params ;
    const deletingComment = commentModel.destroy({
        where:{
            id 
        }
    })
    if(!deletingComment){
        res.status(401).json({message : "comment is not found ..."});
    }
    res.status(201).json({message : "deleted ..."});

}
