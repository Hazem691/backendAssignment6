
import commentModel from "../../../db/models/comment.model.js";
import postModel from "../../../db/models/post.model.js"
import userModel from "../../../db/models/user.model.js";



export const getPost = async (req,res,next)=>{
    const post = await postModel.findAll({
        include :{
            model : userModel, 
            
            attributes : ['id','userName'] 

        }
    });
    res.status(200).json({post}) ;
}
export const getSpecificPost = async (req,res,next)=>{
    const{id} = req.params 
    const post = await postModel.findOne({
        where:{
            id
        },
        include :{
            model : userModel, 
            
            attributes : ['id','userName'] 

        }
    });
    res.status(200).json({post}) ;
}




export const addPOST = async (req,res,next)=>{
    const {title ,content ,userId} = req.body ;
    const post = await postModel.create({title , content , userId})
    res.status(201).json({msg : "post is added successfully" , post})
}



export const updatePost = async (req, res) => {
    const { title, content } = req.body;
    const { id } = req.params;

    try {
        // const post = await postModel.findByPk(id);
        const post = await postModel.findOne({
            where:{
                id
            },
            include :{
                model : userModel, 
                
                attributes : ['id','userName'] 
    
            }
        });
        
        if (!post) {
            return res.status(404).json({ message: "Post not found" });
        }
         

        const theUserModel =await userModel.findByPk(post.dataValues.userId)
        const theusermodeId = theUserModel.dataValues.id ;
        console.log(theusermodeId)
        if (post.dataValues.userId != theusermodeId) {
            console.log(post.dataValues.userId);
            console.log(theUserModelId);
            return res.status(403).json({ message: "You are not authorized to update this post" });
        }

        const updatedPost = await post.update({ title, content }, { where: { id } });

        res.status(200).json({ message: "Post updated successfully", updatedPost });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};




export const deletePost = async(req,res,next)=>{
    const {id} = req.params ;
    try {
        // const post = await postModel.findByPk(id);
        const post = await postModel.findOne({
            where:{
                id
            },
            include :{
                model : userModel, 
                
                attributes : ['id','userName'] 
    
            }
        });
        
        if (!post) {
            return res.status(404).json({ message: "Post not found" });
        }
         

        const theUserModel =await userModel.findByPk(post.dataValues.userId)
        const theusermodeId = theUserModel.dataValues.id ;
        console.log(theusermodeId)
        if (post.dataValues.userId != theusermodeId) {
            return res.status(403).json({ message: "You are not authorized to delete this post" });
        }
    const deletePost = postModel.destroy({
        where:{
            id 
        }
    })
    if(!deletePost){
        res.status(401).json({message : "Post is not found ..."});
    }
    res.status(201).json({message : "deleted ..."});

}catch(err){
    res.status(500).json({ error: error.message });
}
}
