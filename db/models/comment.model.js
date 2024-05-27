import { DataTypes } from "sequelize";
import { sequelize } from "../connectionDB.js";
import userModel from "./user.model.js";
import postModel from "./post.model.js";


export const commentModel = sequelize.define(
    'comment' ,
    {
        content:{
            type : DataTypes.STRING ,
            allowNull : false 
        }
    }

)
userModel.hasMany(commentModel);
postModel.hasMany(commentModel,{
    onDelete :"CASCADE",
    onUpdate :"CASCADE"
});
commentModel.belongsTo(userModel,{
    onDelete :"CASCADE",
    onUpdate :"CASCADE"
});
commentModel.belongsTo(postModel) ;
export default commentModel ;