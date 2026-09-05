alert("Please make sure all info entered are correct :)\nThe official name and email will be used for certificates purposes\n\nDo not hesitate to contact us if there is wrongly submitted info!\nThank you!")

document.addEventListener("DOMContentLoaded", () => {
    const monthLabel = document.getElementById('calendarMonthLabel');
    const grid = document.getElementById('calendarGrid');
    const prevBtn = document.getElementById('prevMonth');
    const nextBtn = document.getElementById('nextMonth');
    const kelasInput = document.getElementById('kelas');
    const kelasRow = document.getElementById('kelasRow');
    const calendarWrapper = document.getElementById('calendarWrapper');

    const monthNames = ["January","February","March","April","May","June",
                         "July","August","September","October","November","December"];

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    let viewYear = today.getFullYear();
    let viewMonth = today.getMonth();

    function pad(n) {
        return String(n).padStart(2, '0');
    }

    function renderCalendar(year, month) {
        grid.innerHTML = '';
        monthLabel.textContent = `${monthNames[month]} ${year}`;

        const firstDay = new Date(year, month, 1);
        const startWeekday = firstDay.getDay(); // 0 = Sunday
        const daysInMonth = new Date(year, month + 1, 0).getDate();

        for (let i = 0; i < startWeekday; i++) {
            const empty = document.createElement('div');
            empty.className = 'calendar-day empty';
            grid.appendChild(empty);
        }

        for (let d = 1; d <= daysInMonth; d++) {
            const cellDate = new Date(year, month, d);
            const weekday = cellDate.getDay(); // 5 = Friday, 6 = Saturday
            const dateStr = `${cellDate.getFullYear()}-${pad(cellDate.getMonth() + 1)}-${pad(cellDate.getDate())}`;

            const cell = document.createElement('div');
            cell.className = 'calendar-day';
            cell.textContent = d;

            const BLOCKED_DATES = new Set([
                "",
            ]);

            const EXTRA_DATES = new Set([
                "",
            ]);

            //SET THE WORKING DATE
            //SATURDAY
            //
            const isFriOrSat = (weekday === 6);
            const isBlocked = BLOCKED_DATES.has(dateStr);
            const isExtra = EXTRA_DATES.has(dateStr);
            const isPast = cellDate < today;

            if ((isFriOrSat || isExtra) && !isPast && !isBlocked) {
                cell.classList.add('available');
                cell.addEventListener('click', () => selectDate(cellDate, dateStr, cell));
            } else {
                cell.classList.add('disabled');
            }

            if (kelasInput.value === dateStr) {
                cell.classList.add('selected');
            }

            grid.appendChild(cell);
        }
    }

    function selectDate(date, dateStr, cell) {
        document.querySelectorAll('.calendar-day.selected').forEach(el => el.classList.remove('selected'));
        cell.classList.add('selected');

        kelasInput.value = dateStr;
    }

    prevBtn.addEventListener('click', () => {
        viewMonth--;
        if (viewMonth < 0) { viewMonth = 11; viewYear--; }
        renderCalendar(viewYear, viewMonth);
    });

    nextBtn.addEventListener('click', () => {
        viewMonth++;
        if (viewMonth > 11) { viewMonth = 0; viewYear++; }
        renderCalendar(viewYear, viewMonth);
    });

    renderCalendar(viewYear, viewMonth);

    function openCalendar(){
        calendarWrapper.classList.add('open');
        kelasRow.classList.add('open');
    }

    function closeCalendar(){
        calendarWrapper.classList.remove('open');
        kelasRow.classList.remove('open');
    }

    function toggleCalendar(){
        if(calendarWrapper.classList.contains('open')){
            closeCalendar();
        } else {
            openCalendar();
        }
    }

    kelasInput.addEventListener('click', (e) => {
        e.stopPropagation();
        toggleCalendar();
    });

    // Close when clicking anywhere outside the row
    document.addEventListener('click', (e) => {
        if(!kelasRow.contains(e.target)){
            closeCalendar();
        }
    });

    // Prevent clicks inside the calendar itself from bubbling up and closing it
    calendarWrapper.addEventListener('click', (e) => {
        e.stopPropagation();
    });

    prevBtn.addEventListener('click', () => {
        viewMonth--;
        if (viewMonth < 0) { viewMonth = 11; viewYear--; }
        renderCalendar(viewYear, viewMonth);
    });

    nextBtn.addEventListener('click', () => {
        viewMonth++;
        if (viewMonth > 11) { viewMonth = 0; viewYear++; }
        renderCalendar(viewYear, viewMonth);
    });

    renderCalendar(viewYear, viewMonth);

    function selectDate(date, dateStr, cell) {
    document.querySelectorAll('.calendar-day.selected').forEach(el => el.classList.remove('selected'));
    cell.classList.add('selected');

    kelasInput.value = dateStr;

    closeCalendar(); // auto-close after picking a date
}

});



function join(){
    const btn = document.getElementById("joinBtn");

    const name = document.getElementById("name").value.trim();
    const phone = document.getElementById("phone").value.trim();
    const email = document.getElementById("email").value.trim();
    const kelas = document.getElementById("kelas").value;


    if(!name || !phone || !email || !kelas){

        if(!name){
            document.getElementById("name").style.border="2px solid red";
        }

        if(!phone){
            document.getElementById("phone").style.border="2px solid red";
        }

        if(!email){
            document.getElementById("email").style.border="2px solid red";
        }

        if(!kelas){
            document.getElementById("kelas").style.border="2px solid red";
        }

        return;
    }


    if(!/[A-Z]/.test(name)){
        document.getElementById("name").style.border="2px solid red";
        alert("Enter a valid name as per IC or Passport!");
        return;
    }


    if(phone.replace(/\D/g, "").length < 10){
        document.getElementById("phone").style.border="2px solid red";
        alert("Enter a valid phone number!");
        return;
    }


    if(!email.includes("@")){
        document.getElementById("email").style.border="2px solid red";
        alert("Enter a valid email!");
        return;
    }


    // Change button text
    btn.innerHTML = "Loading QR Payment... Please Wait";
    btn.disabled = true;

    const sheetNames = ["Power BI"];
    const endpoint = "https://script.google.com/macros/s/AKfycbxgqlWfU2u-1Xa1HmkKGsq1uelXlElNDwFOCLIWCbVZf8FkvI6_J9BMGDnxGAyZP9Bu/exec";

    const requests = sheetNames.map(sheetName => {
        const data = {
            name: name,
            phone: phone,
            email: email,
            classChoice: kelas,
            sheetName: sheetName
        };

        return fetch(endpoint, {
            method: "POST",
            body: JSON.stringify(data),
            headers: { "Content-Type": "text/plain" }
        }).then(response => response.json());
    });

    Promise.all(requests)
        .then(results => {
            console.log(results);

            const allSuccess = results.every(result => result.status === "success");

            if(allSuccess){
                document.getElementById("popup").style.display = "flex";
                document.body.style.overflow = "hidden";

                document.getElementById("name").value = "";
                document.getElementById("phone").value = "";
                document.getElementById("email").value = "";
                document.getElementById("kelas").value = "";
            } else {
                alert("Something went wrong saving your registration. Please contact us.");
            }

            // Reset button
            btn.innerHTML = "Join Us";
            btn.disabled = false;
        })
        .catch(error => {
            alert("Something went wrong.");

            // Reset button
            btn.innerHTML = "Join Us";
            btn.disabled = false;
        });
}

function closePopup(){ 
    document.getElementById("popup").style.display="none";
    document.body.style.overflow = "auto";
    window.close();
}
