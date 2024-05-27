import express from 'express' ;
import ConnectionDB from './db/connectionDB.js';
import userRouter from './src/modules/users/users.routes.js';
import postRouter from './src/modules/posts/posts.routes.js';
import commentRouter from './src/modules/comments/comments.routes.js';
const app = express() ;

const port = process.env.port || 3000 ;



ConnectionDB();
app.use(express.json());
app.use(userRouter) ;
app.use(postRouter) ;
app.use(commentRouter);
app.use("*",(req,res)=>{
    res.status(404).json({message : "page is not found"})
})
app.listen(port,()=>{
    console.log("Server is running now ...");
})