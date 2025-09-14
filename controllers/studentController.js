import Student from "../models/student.js";

export function getStudent(req,res){
          Student.find().then(
           (data)=>{
         res.json(data)
           }
          ).catch(
           ()=>{
   
           }
          )
   }


  export  function createStudent(req,res){
    if(req.user==null){
        res.status(401).json({
             message : "please login and try again"
        })
        return
    }
     if(req.user.role!=admin){
        res.status(403).json({
            message : "you must be a admin to create a student"
      } )
     } 
    
    const Student = new Student({
        name : req.body.name,
        age : req.body.age,
        city : req.body.city
    });
    student.save().then(
        ()=>{
            res.json({
                message: "student created successfully"
            })
        }
    ).catch(
        ()=>{
            res.json({
                message: "failed to create student"
            })
        }
    )
}