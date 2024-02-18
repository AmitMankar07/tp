const sequelize=require('../util/database');
const Student=require('../models/Student');
const Absence=require('../models/Absence');


console.log("Absence object:",Absence);
console.log("Absence create function:",Absence.create);

const getAllStudents=async(req,res,next)=>{
    try{
        const students=await Student.findAll({});
        res.status(200).json({students})
    }catch(error){
        res.status(500).json({msg:error});
    }
};

const postAbsentStudents=async(req,res,next)=>{
  console.log("req.body:", req.body);
  const date=req.body[0].date;
    const students=req.body;
    
    
    console.log("date: ", date);
    console.log("students:",students);
  
    const absentStudents=[];

    for (const id in students) {
      console.log("id: ", Number(id));
      if (students[Number(id)].is_absent) {
        const absentStudent = {
          student_id: students[Number(id)].student_id,
          date,
        };
        console.log("absentStudent: ", absentStudent);
        try {
          const createdAbsentStudent = await Absence.Absence.create(absentStudent);
          console.log("created Absence record with id: ", createdAbsentStudent.id);
        } catch (error) {
          console.error(error);
          return res.status(500).json({ success: false, msg: 'Failed to create absence record' });
        }
      }
    }
    console.log("absentStudents.length: ", absentStudents.length);

    // Insert rows into the absences table for each absent student
   
    
  
  // res.send({ success: true });
    };
  
  //   const absentStudents=[];

  //   for (const id in students) {
  //     console.log("id: ", Number(id));
  //     if (students[Number(id)].is_absent) {
  //       const absentStudent = {
  //         student_id: students[Number(id)].student_id,
  //         date,
  //       };
  //       console.log("absentStudent: ", absentStudent);
  //       try {
  //         const createdAbsentStudent = await Absence.Absence.create(absentStudent);
  //         console.log("created Absence record with id: ", createdAbsentStudent.id);
  //       } catch (error) {
  //         console.error(error);
  //         return res.status(500).json({ success: false, msg: 'Failed to create absence record' });
  //       }
  //     }
  //   }
  //   console.log("absentStudents.length: ", absentStudents.length);

    // Insert rows into the absences table for each absent student
  // res.send({ success: true });




const getAbsentStudent=async(req,res,next)=>{
  const date = req.params.date;
  try {
    
    const absences = await Absence.Absence.findAll({
      attributes: ['id', 'student_id', 'date', 'is_absent', 'createdAt', 'updatedAt'],
      include: [{
        model: Student,
        attributes: ['id','name'],
        as:'student'
      }],
      where: {
        date
      }
    });
    const attendance={};
    
    // Loop through each student to determine if they were present or absent
    for (const student of await Student.findAll()) {
      if (!absences.some(absence => absence.student_id === student.id && absence.date === date)) {
        attendance[student.id] =  {
          status: 'present',
          icon: {
            class: 'fa-check',
            text: 'Present',
          },
        };
      } else {
        attendance[student.id] =  {
          status: 'absent',
          icon: {
            class: 'fa-times',
            text: 'Absent',
          },
        };
      }
    }

    res.send(attendance);
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: error.message });
  }
  };
    // const date = req.params.date;

    // const absences = await Absence.Absence.findAll({
    //   where: {
    //     date
    //   },
    //   include: [{
    //     model: Student,
    //     attributes: []
    //   }]
    // });
    
    // const attendance = {};
    
    // // Loop through each student to determine if they were present or absent
    // for (const student of await Student.findAll()) {
    //   const absence = absences.find(a => a.student_id === student.id && a.date === date);
    //   attendance[student.id] = {
    //     status: absence ? 'absent' : 'present',
    //     icon: absence ? {
    //       class: 'fa-times',
    //       text: 'Absent',
    //     } : {
    //       class: 'fa-check',
    //       text: 'Present',
    //     },
    //   };
    // }
    
    // res.send(attendance);




module.exports={getAllStudents,postAbsentStudents,getAbsentStudent};