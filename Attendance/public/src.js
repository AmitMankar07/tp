
console.log("in js file");
window.onload=function(){

    const searchBtn = document.getElementById('search');
    const resultsDiv = document.getElementById('results');
    if (!searchBtn || !resultsDiv) {
        console.error("searchBtn or resultsDiv not found:", searchBtn, resultsDiv);
        return;
      }
    searchBtn.addEventListener('click', async () => {
      try {
        console.log("before response");
        const response = await axios.get('http://localhost:5000/students', {
          params: {
            date: document.getElementById('date').value
          }
         
    
        });
    console.log(typeof response.data);
    console.log(response.data);
    if (Array.isArray(response.data.students)){
        resultsDiv.innerHTML = '';
        response.data.students.forEach(row => {
          const rowDiv = document.createElement('div');
          rowDiv.style.display = 'flex';
          rowDiv.style.alignItems = 'center';
          
          rowDiv.innerHTML = `
          <div id="student-${row.id}">${row.name}</div>
          <div class="spacer"></div>
          <div>
            <input type="radio" id="present-${row.id}" name="attendance-${row.id}" value="present">
            <label for="present-${row.id}">Present</label>
          </div>
          <div>
            <input type="radio" id="absent-${row.id}" name="attendance-${row.id}" value="absent">
            <label for="absent-${row.id}">Absent</label>
          </div>
          `;
          console.log("rowDiv:", rowDiv);
          resultsDiv.appendChild(rowDiv);
        });
        // add a new button element after all the rowDiv elements
        const markAttendanceBtn = document.createElement('button');
        markAttendanceBtn.textContent = 'Mark Attendance';


        markAttendanceBtn.addEventListener('click', async () => {
          const attendanceData = [];
          const attendanceInputs = document.querySelectorAll('input[name^="attendance-"]');
          if (!attendanceInputs) {
            console.error("attendanceInputs not found:", attendanceInputs);
            return;
          }
          for (let i = 0; i < attendanceInputs.length; i++) {
            if (attendanceInputs[i].checked) {
              const studentId = attendanceInputs[i].id.split('-')[1];
              const attendance = attendanceInputs[i].value === 'present' ? false : true;
              console.log("studentId:", studentId);
              console.log("attendance:", attendance);
              
              attendanceData.push({
                student_id: studentId,
                date: document.getElementById('date').value,
                is_absent: attendance,
              });
            }
            console.log("attendanceData:",attendanceData);
          }
          console.log("atndnc data outside:",attendanceData);
        
          try {
            const response = await axios.post('http://localhost:5000/students/attendance', attendanceData);
            console.log(response.data);
            markAttendanceBtn.style.
            const studentNameDivs = document.getElementsByClassName('student-name');
            for (let i = 0; i < studentNameDivs.length; i++) {
              const studentId = studentNameDivs[i].id.split('-')[1];
              const attendance = response.data.students.some(s => s.student_id === studentId && s.is_absent);
              studentNameDivs[i].classList.add(attendance ? 'absent' : 'present');
            } 
          } catch (error) {
            console.error(error);
          }
          console.log("response:",response);
        });

        resultsDiv.appendChild(markAttendanceBtn);
    }else {
        console.error("response.data.students is not an array:", response.data);
      }
       
      } catch (error) {
        console.error(error);
      }
    });
}