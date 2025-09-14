import User from "../models/User.js"
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export function createUser(req,res){

    const hashedPassword = bcrypt.hashSync(req.body.password,10)
    const user = new User(
        {
            email: req.body.email,
            firstName:req.body.firstName,
            lastName:req.body.lastName,
            password: hashedPassword,
            role:req.body.role
        }
    )
    user.save().then(
        ()=>{
            res.json({
                message: "User created successfully"
            });

        }
    ).catch({
        message: "user creation failed"
    })
}

export function loginUser(req,res){
    User.findOne(
        {
            email: req.body.email
        }
    ).then(
        (user)=>{
            if(user==null){
                res.json({
                    message:"user not found"
                })
            }else{
                const isPasswordMattching = bcrypt.compareSync(req.body.password, user.password)
                if(isPasswordMattching){
                   const token = jwt.sign({
                       email: user.email,
                       firstName: user.firstName,
                       lastName: user.lastName,
                       role: user.role,
                       isEmailVerified: user.isEmailVerified

                 },"jwt-secret" )

                    res.json({
                        message: "login successfull",
                        token: token
                    })
                }else{
                    res.status(500).json({
                        message: "password is incorrect"
                    })
                }
            }
        }
    )
}

export function isAdmin(req){
    if(req.user==null){
        return false;
    }
    if(req.user.role!='admin'){
        return false;
    }
    return true;
}
        




    
    


