const Student=require('../models/Student');

const getAllStudents=async(req,res,next)=>{
    try{
        const students=await Student.findAll({});
        res.status(200).json({students})
    }catch(error){
        res.status(500).json({msg:error});
    }
};

const postAddStudent=async(req,res,next)=>{
    try{
        const name=req.body.name;
        const student=await Student.create({
            name:name
        })
        res.status(200).json(student);
    }catch(error){
        res.status(500).json({msg:error});
    }
}
exports.getStudent=(req,res,next)=>{
    const task=Student.f
}
// const addStudent=Student.create({
//     name:"Ami"
// }).then(res => {
//     console.log(res)
// }).catch((error) => {
//     console.error('Failed to create a new record : ', error);
// });

module.exports={getAllStudents};