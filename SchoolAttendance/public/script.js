const axiosInstance = axios.create({
    baseURL: 'http://localhost:4000/student',
    
  });

document.getElementById('date').addEventListener('submit',checkDate)
const display = document.getElementById('display')
const ul = document.querySelector('ul')

const form = document.querySelector("#display form")

document.querySelector("#display form").addEventListener('submit' , uploadAttendence)

let attendence = []

var date ;
async function checkDate(e){
    e.preventDefault()
    date = e.target.getdate.value;
    const table = document.getElementById("attendence-report")

    table.classList.add('hide')
    form.classList.remove("hide")
    console.log(date)
    try{
        const res = await axiosInstance.post('/getdate' ,{date})
        console.log(res)
        ul.innerHTML = ``

        attendence = []
        if(!res.data.success){

        
        res.data.students.forEach(student =>{
            console.log(student)
            attendence.push({id : student.id , present : false})
            displayStudents(student)            
        })
        document.querySelector('#display button').classList.remove("hide")
    }else{
            res.data.students.forEach(student =>{
                showUsers(student)            
            })  
        }
    
    }catch(e){
        console.log(e)
    }
}

function displayStudents(student){
    
    const li = document.createElement('li')
    li.textContent = student.name
    const pInput = document.createElement('input')
    const pLabel = document.createElement('label')
    pInput.type = "radio"
    pInput.name = student.id
    pInput.value = "present"
    pInput.required = true
    pLabel.textContent = "present"
    li.style.justifyContent="space-around"
    li.style.textAlign="left"
    
    const aInput = document.createElement('input')
    const aLabel = document.createElement('label')
    aInput.type = "radio"
    aInput.name = student.id
    aInput.value = "absent"
    aInput.required = true
    aLabel.textContent = "absent"
    

    li.appendChild(pInput)
    li.appendChild(pLabel)
    li.appendChild(aInput)
    li.appendChild(aLabel)
    pLabel.appendChild(pInput)
    aLabel.appendChild(aInput)

    ul.appendChild(li)

    

}


async function uploadAttendence(e){
    e.preventDefault()
    console.log(e.target)
    console.log(e.target[0])
    const result = attendence.map(elem => {
        let radio = document.getElementsByName(elem.id)
        if(radio[0].checked){
            elem.present = true
            console.log(elem.id + " : " + radio[0].value)
        }else{
            elem.present = false
            console.log(elem.id + " : " + radio[1].value)
        }
        // console.log(radio)
        // console.log(elem.id + " : ")
        // let temp = elem.name + elem.id
        // console.log(temp)
        // console.log(e.target.temp)
        return elem
    })
    console.log("-----")
    console.log(result)
    const res = await axiosInstance.post('/attendence' , {data : result , date})
    if(res.status == 200){
        ul.innerHTML =``
        console.log("print",res.data)
        res.data.forEach(user =>{
            showUsers(user)
        })
    }
    console.log(res)
}



function showUsers(user){
    console.log(user.id)
    const li = document.createElement('li')
    const p = document.createElement('p')
    p.textContent = user.name
    
    li.appendChild(p)
    
    const p2 = document.createElement('p')
    if(user.records.present){

        p2.innerHTML = `&#9745; present`
    }else{
        p2.innerHTML = `&#9746; absent`

    }
    li.appendChild(p2)

    ul.appendChild(li)
  }


  document.getElementById("report").addEventListener('click' , async()=>{
    try{

        const res = await axiosInstance('/report')
        console.log(res)
        if(res.status == 200){
            form.classList.add("hide")

            const {totalDays , students} = res.data;
            console.log(totalDays)
            console.log(students)

            const table = document.getElementById("attendence-report")
            table.classList.remove("hide")
            const tbody = table.querySelector("tbody")
            tbody.innerHTML =``
            ul.innerHTML = ``
            students.forEach(student =>{
                const tr = document.createElement('tr')

                const td1 = document.createElement('td')
                const td2 = document.createElement('td')
                const td3 = document.createElement('td')


                td1.textContent = student.name
                td2.textContent = student.totalPresent
                const value = ((student.totalPresent / totalDays)  * 100).toFixed(2)
                td3.textContent = value + "%"

                tr.appendChild(td1)
                tr.appendChild(td2)
                tr.appendChild(td3)

                tbody.appendChild(tr)
            })

        }
    }catch(e){
        console.log(e)
    }
  })