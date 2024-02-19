const express = require('express')

const router = express.Router()
// const attendenceController = require('../controller/attendence');

const Date = require('../models/date')
const Student = require('../models/student')
const Record = require('../models/record')
// router.get("/",attendenceController.loadAttendencePage)

router.post('/getdate' ,async(req ,res)=>{
    try{

        const date = req.body.date;
        const curr = await Date.findOne({where : {date : date}});
        console.log(curr)
        if(curr != null){
            const students = await curr.getStudents();
            return res.json({success : true , students})
        }else{
            const students = await Student.findAll()
            return res.json({success : false , students})
            
        }
    }catch(e){
        console.log(e)
        return res.status(500).json({success : false , msg : "Internal server error"})
    }
})
// router.get('/student' ,async(req ,res)=>{
//     res.sendFile(path.join(__dirname,'./backend/index.html'));
// })


router.post('/attendence' , async(req, res)=>{

    try{

        const date = req.body.date;
        const data = req.body.data;

        const currDate = await Date.create({date : date})
        for(let i =0;i<data.length;i++){

            // data.forEach(async (elem) =>{
                let elem = data[i]
                console.log(elem)
                const student = await Student.findByPk(elem.id);
                if(elem.present){
                    student.totalPresent = student.totalPresent+1;
                    await student.save()

                }
                await currDate.addStudent(student , { through : {present : elem.present}})
            // })
        }

        let result = await currDate.getStudents();
        console.log(result)

        return res.json(result)


    }catch(e){
        console.log(e)
        return res.status(500).json({success : false , msg : "Internal server error"})

    }

})

router.get('/report' , async(req ,res)=>{
    try{
        const dates = await Date.findAll();
        const totalDays = dates.length;
        const students = await Student.findAll()
        return res.json({totalDays , students})
    }catch(e){
        console.log(e)
        return res.status(500).json({success : false , msg : "Internal server error"})


    }
})
// router.get('/attendence',getAttendencePage)



module.exports = router;