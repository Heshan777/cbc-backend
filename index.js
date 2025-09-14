import express from 'express';
import mongoose from 'mongoose'; 
import Student from './models/student.js';
import studentRouter from './routes/studentRouter.js';
import userRouter from './routes/userRouter.js';
import jwt from "jsonwebtoken";
import product from './models/product.js';
import productRouter from './routes/productRouter.js';

const app = express();
app.use(express.json());

app.use(
    (req,res,next)=>{
      let token = req.header("Authorization")
      token = token.replace("Bearer ","")
      if(token!=null){
         console.log(token)
         jwt.verify(token,"jwt-secret",
            (err,decoded)=>{
                 if(decoded==null){
                    res.json(
                        {
                            message: "invalid token please login again"
                        }
                    )
                    return 
                 }else{
                    req.user = decoded
                 }
         })
    }next()
    }
) 

const connectionstring = "mongodb+srv://admin:17500@cluster0.bccs5ds.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
 mongoose.connect(connectionstring).then(
    ()=>{
        console.log("database connected")
    }
 ).catch(
    ()=>{
        console.log("error occur")
    }
 )

 app.use('/students',studentRouter);
 app.use('/users', userRouter);
 app.use('/products',productRouter);
 

 




app.listen(5000, ()=>{
    console.log("server is running o port 5000");
});