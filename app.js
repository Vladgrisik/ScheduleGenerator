document.addEventListener('DOMContentLoaded', () => {
    const fileInput = document.getElementById('file-input');
    const scheduleTableBody = document.querySelector('#schedule-table tbody');

    fileInput.addEventListener('change', (event) => {
        const file = event.target.files[0];
       
        if (file) {
            
            const reader = new FileReader();
            
            //finish reading file
            reader.onload = (e) => {

                const content = e.target.result;
                try {
                    const scheduleData = JSON.parse(content);
                    if (scheduleData.schedule) {
                        populateSchedule(scheduleData.schedule);
                    } else {
                        throw new Error('Invalid JSON structure');
                    }
                } catch (error) {
                    console.error('Error parsing JSON:', error);
                    alert('Error parsing JSON file. Please make sure the file is valid.');
                }
            };
            reader.readAsText(file);
        }
    });

    function populateSchedule(schedule) {
        scheduleTableBody.innerHTML = ''; // Очищуємо попередній розклад
        schedule.forEach(daySchedule => {
            const row = document.createElement('tr');

            const dateCell = document.createElement('td');
            dateCell.textContent = daySchedule.date;
            row.appendChild(dateCell);

            const timeCell = document.createElement('td');
            const timeTable = document.createElement('table');
            daySchedule.lessonList.forEach(lesson => {
                const timeRow = document.createElement('tr');
                const timeData = document.createElement('td');
                timeData.textContent = lesson.time;
                timeRow.appendChild(timeData);
                timeTable.appendChild(timeRow);
            });
            timeCell.appendChild(timeTable);
            row.appendChild(timeCell);

            const subjectCell = document.createElement('td');
            const subjectTable = document.createElement('table');
            daySchedule.lessonList.forEach(lesson => {
                const subjectRow = document.createElement('tr');
                const subjectData = document.createElement('td');
                subjectData.textContent = lesson.subject;
                subjectRow.appendChild(subjectData);
                subjectTable.appendChild(subjectRow);
            });
            subjectCell.appendChild(subjectTable);
            row.appendChild(subjectCell);

            const teacherCell = document.createElement('td');
            const teacherTable = document.createElement('table');
            daySchedule.lessonList.forEach(lesson => {
                const teacherRow = document.createElement('tr');
                const teacherData = document.createElement('td');
                teacherData.textContent = lesson.teacher;
                teacherRow.appendChild(teacherData);
                teacherTable.appendChild(teacherRow);
            });
            teacherCell.appendChild(teacherTable);
            row.appendChild(teacherCell);

            const roomCell = document.createElement('td');
            const roomTable = document.createElement('table');
            daySchedule.lessonList.forEach(lesson => {
                const roomRow = document.createElement('tr');
                const roomData = document.createElement('td');
                roomData.textContent = lesson.classroom;
                roomRow.appendChild(roomData);
                roomTable.appendChild(roomRow);
            });
            roomCell.appendChild(roomTable);
            row.appendChild(roomCell);

            scheduleTableBody.appendChild(row);
        });
    }
});
