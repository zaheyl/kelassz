alert("Please make sure all info entered are correct :)\nThe official name and email will be used for certificates purposes\n\nDo not hesitate to contact us if there is wrongly submitted info!\nThank you!")

document.addEventListener("DOMContentLoaded", () => {

    const monthNames = ["January","February","March","April","May","June",
                         "July","August","September","October","November","December"];

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    function pad(n) {
        return String(n).padStart(2, '0');
    }

    /**
     * Creates an independent calendar instance bound to its own
     * input, dropdown, and nav buttons, so multiple calendars can
     * exist on the same page without sharing state.
     */
    function createCalendar({ inputId, rowId, wrapperId, gridId, monthLabelId, prevBtnId, nextBtnId }) {
        const kelasInput = document.getElementById(inputId);
        const kelasRow = document.getElementById(rowId);
        const calendarWrapper = document.getElementById(wrapperId);
        const grid = document.getElementById(gridId);
        const monthLabel = document.getElementById(monthLabelId);
        const prevBtn = document.getElementById(prevBtnId);
        const nextBtn = document.getElementById(nextBtnId);

        let viewYear = today.getFullYear();
        let viewMonth = today.getMonth();

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
                const weekday = cellDate.getDay(); // 5 = Friday
                const dateStr = `${cellDate.getFullYear()}-${pad(cellDate.getMonth() + 1)}-${pad(cellDate.getDate())}`;

                const cell = document.createElement('div');
                cell.className = 'calendar-day';
                cell.textContent = d;

                const BLOCKED_DATES = new Set([""]);
                const EXTRA_DATES = new Set([""]);

                const isFriOrSat = (weekday === 5);
                const isBlocked = BLOCKED_DATES.has(dateStr);
                const isExtra = EXTRA_DATES.has(dateStr);
                const isPast = cellDate < today;

                if ((isFriOrSat || isExtra) && !isPast && !isBlocked) {
                    cell.classList.add('available');
                    cell.addEventListener('click', () => selectDate(dateStr, cell));
                } else {
                    cell.classList.add('disabled');
                }

                if (kelasInput.value === dateStr) {
                    cell.classList.add('selected');
                }

                grid.appendChild(cell);
            }
        }

        function selectDate(dateStr, cell) {
            grid.querySelectorAll('.calendar-day.selected').forEach(el => el.classList.remove('selected'));
            cell.classList.add('selected');
            kelasInput.value = dateStr;
            closeCalendar();
        }

        function openCalendar() {
            calendarWrapper.classList.add('open');
            kelasRow.classList.add('open');
        }

        function closeCalendar() {
            calendarWrapper.classList.remove('open');
            kelasRow.classList.remove('open');
        }

        function toggleCalendar() {
            calendarWrapper.classList.contains('open') ? closeCalendar() : openCalendar();
        }

        kelasInput.addEventListener('click', (e) => {
            e.stopPropagation();
            toggleCalendar();
        });

        calendarWrapper.addEventListener('click', (e) => e.stopPropagation());

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

        return { closeCalendar, row: kelasRow };
    }

    const calendar1 = createCalendar({
        inputId: 'kelas1', rowId: 'kelasRow1', wrapperId: 'calendarWrapper1',
        gridId: 'calendarGrid1', monthLabelId: 'calendarMonthLabel1',
        prevBtnId: 'prevMonth1', nextBtnId: 'nextMonth1'
    });

    const calendar2 = createCalendar({
        inputId: 'kelas2', rowId: 'kelasRow2', wrapperId: 'calendarWrapper2',
        gridId: 'calendarGrid2', monthLabelId: 'calendarMonthLabel2',
        prevBtnId: 'prevMonth2', nextBtnId: 'nextMonth2'
    });

    // Close whichever calendar is open when clicking outside both rows
    document.addEventListener('click', (e) => {
        if (!calendar1.row.contains(e.target)) calendar1.closeCalendar();
        if (!calendar2.row.contains(e.target)) calendar2.closeCalendar();
    });
});


function join(){
    const btn = document.getElementById("joinBtn");

    const name = document.getElementById("name").value.trim();
    const phone = document.getElementById("phone").value.trim();
    const email = document.getElementById("email").value.trim();
    const kelas1 = document.getElementById("kelas1").value; // Excel date
    const kelas2 = document.getElementById("kelas2").value; // Python date

    if(!name || !phone || !email || !kelas1 || !kelas2){

        if(!name){
            document.getElementById("name").style.border="2px solid red";
        }

        if(!phone){
            document.getElementById("phone").style.border="2px solid red";
        }

        if(!email){
            document.getElementById("email").style.border="2px solid red";
        }

        if(!kelas1){
            document.getElementById("kelas1").style.border="2px solid red";
        }

        if(!kelas2){
            document.getElementById("kelas2").style.border="2px solid red";
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

    // Each entry pairs a sheet with its matching selected date
    const submissions = [
        { sheetName: "Power BI", classChoice: kelas1 },
        { sheetName: "SQL", classChoice: kelas2 }
    ];

    const endpoint = "https://script.google.com/macros/s/AKfycbyrZgL8m6Lwr8IzMj5t55bU7Dq1dT12FYZJ6MEpOKP5Cqs49i6dnFzlaTXtgST0Vyf5/exec";

    const requests = submissions.map(({ sheetName, classChoice }) => {
        const data = {
            name: name,
            phone: phone,
            email: email,
            classChoice: classChoice,
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
                document.getElementById("kelas1").value = "";
                document.getElementById("kelas2").value = "";
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