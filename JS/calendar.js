//Define our variables for our calendar functions
const calendar = document.querySelector(".Calendar"),
    calendarDate = document.querySelector(".Date"),
    ContainerDays = document.querySelector(".Days"),
    prevMonth = document.querySelector(".Month i.material-symbols-outlined:first-child"),
    nextMonth = document.querySelector(".Month i.material-symbols-outlined:last-child"),
    TodayButton = document.querySelector(".Today-Button"),
    GoToButton = document.querySelector(".Go-To-Button"),
    ButtonMonthInput = document.querySelector(".Month-Input"),
    eventDay = document.querySelector(".event-day"),
    eventDate = document.querySelector(".event-date"),
    eventContainer = document.querySelector(".events"),
    addEventSubmit = document.querySelector(".add-event-btn");

let presentDate = new Date();
let currentMonth = presentDate.getMonth(); 
let currentYear = presentDate.getFullYear();
let selectedDay = null;

const months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
];

//Empty Events Array
let eventsArr = [];

//Function to generate the numerical dates in a month 
getEvents();

function PopulateDatesCalendar() {
    const FirstDay = new Date(currentYear, currentMonth, 1);
    const LastDay = new Date(currentYear, currentMonth + 1, 0);
    const PrevLastDay = new Date(currentYear, currentMonth, 0);
    const PrevLastDayGet = PrevLastDay.getDate();
    const LastDayGet = LastDay.getDate();
    const day = FirstDay.getDay();
    const NextDay = 7 - LastDay.getDay() - 1;

    calendarDate.innerHTML = months[currentMonth] + " " + currentYear;

    let daysHTML = "";

    //Dates from previous month
    for (let x = day; x > 0; x--) {
        daysHTML += `<div class="Day-Month-Prev prev-date">${PrevLastDayGet - x + 1}</div>`;
    }

    //Dates for current month
    for (let i = 1; i <= LastDayGet; i++) {
        const isToday = i === new Date().getDate() &&
            currentMonth === new Date().getMonth() &&
            currentYear === new Date().getFullYear();
    
        const hasEvent = eventsArr.some(eventObj =>
            eventObj.day === i &&
            eventObj.month === currentMonth + 1 &&
            eventObj.year === currentYear
        );
    
        const isSelected = selectedDay === i;
    
        const classes = [
            isToday ? "Day-Today" : "Day",
            hasEvent ? "Day-Event" : "",
            isSelected ? "active" : ""
        ].join(" ").trim();
    
        daysHTML += `<div class="${classes}">${i}</div>`;
    }

    //Dates from next month
    for (let i = 1; i <= NextDay; i++) {
        daysHTML += `<div class="Day-Month-Next next-date">${i}</div>`;
    }

    ContainerDays.innerHTML = daysHTML;

    //Add listener after calendar initalized
    addListener();
}

//Call our function to fill in the numeric dates for this month
PopulateDatesCalendar();

//Function to add in all the previous months to the calendar
function PreviousMonths() {

    if (--currentMonth < 0) {
        currentMonth = 11;
        currentYear--;
    }
    PopulateDatesCalendar();
}

//Function to add in all the future months to the calendar
function NextMonths() {
    if (++currentMonth > 11) {
        currentMonth = 0;
        currentYear++;
    }
    PopulateDatesCalendar();
}

//Call our function to all all the previous months and their dates to our calendar
prevMonth.addEventListener("click", PreviousMonths);
//Call our function to all all the future months and their dates to our calendar
nextMonth.addEventListener("click", NextMonths);

//Adds button functionality to the Today button, will jump to present month/year
TodayButton.addEventListener("click", () => {
    let TodayDate = new Date();
    currentMonth = TodayDate.getMonth();
    currentYear = TodayDate.getFullYear();
    PopulateDatesCalendar();
});

//Code that allows us to write the MM/YYYY into our GoTo text area
ButtonMonthInput.addEventListener("keyup", (e) => {
    //Only numbers are allowed as an input
    ButtonMonthInput.value = ButtonMonthInput.value.replace(/[^0-9/]/g, "");
    // '/' is to be automatically added if two numbers are entered to separate month from date
    if (ButtonMonthInput.value.length === 2) {
        ButtonMonthInput.value += "/";
    }
    //Cannot have more than 7 characters including the '/' separator
    if (ButtonMonthInput.value.length > 7) {
        ButtonMonthInput.value = ButtonMonthInput.value.slice(0,7) 
    }
    //Handle backspace deletion for properly formatted input
    if (event.inputType == "deleteContentBackward" && ButtonMonthInput.value.length === 3) {
        if (ButtonMonthInput.value.length == 3) {
            ButtonMonthInput.value = ButtonMonthInput.value.slice(0,2);
        }
    }
});

//Add functionality to our Go To button so we can enter a month/year and have our calendar display that month/year
GoToButton.addEventListener("click", JumpToDate);

//Function that will jump to our date
function JumpToDate() {
    const enteredDate = ButtonMonthInput.value.split("/");
    if (enteredDate.length === 2) {
        let enteredMonth = parseInt(enteredDate[0], 10);
        let enteredYear = enteredDate[1];
        if (enteredMonth > 0 && enteredMonth <= 12 && enteredYear.length === 4) {
            currentMonth = enteredMonth - 1;
            currentYear = parseInt(enteredYear, 10);
            PopulateDatesCalendar();
            return;
        }
    }
    // Display an error for invalid date input
    alert("Invalid date format. Please enter MM/YYYY.");
}

const addEventBtn = document.querySelector(".add-event"),
    addEventContainer = document.querySelector(".add-event-wrapper"),
    addEventCloseBtn = document.querySelector(".close"),
    addEventTitle = document.querySelector(".event-name"),
    addEventFrom = document.querySelector(".event-time-from"),
    addEventTo = document.querySelector(".event-time-to");
    addEventBtn.addEventListener("click", () => {
        if (selectedDay === null) {
            alert("Please select a date first.");
            return;
        }
        addEventContainer.classList.toggle("active");
    });
    addEventCloseBtn.addEventListener("click", () => {
        addEventContainer.classList.remove("active");
    });

document.addEventListener("click", (e) => {
    //If the click is outside
    if (e.target != addEventBtn && !addEventContainer.contains(e.target)) {
        addEventContainer.classList.remove("active");
    }
})

//Want to allow only 50 characters in the title
addEventTitle.addEventListener("input", (e) => {
    addEventTitle.value = addEventTitle.value.slice(0, 50);
});

//Time format in From and To 
addEventFrom.addEventListener("input", (e) => {
    //Only numbers and : allowed
    addEventFrom.value = addEventFrom.value.replace(/[^0-9:]/g, "");
    //Auto add : if two numbers are entered
    if (addEventFrom.value.length == 2) {
        addEventFrom.value += ":";
    }
    //Cannot enter more than 5 characters
    if (addEventFrom.value.length > 5) {
        addEventFrom.value = addEventFrom.value.slice(0, 5);
    }
});
//Write the same for the Time To sectrion
addEventTo.addEventListener("input", (e) => {
    //Only numbers and : allowed
    addEventTo.value = addEventTo.value.replace(/[^0-9:]/g, "");
    //Auto add : if two numbers are entered
    if (addEventTo.value.length == 2) {
        addEventTo.value += ":";
    }
    //Cannot enter more than 5 characters
    if (addEventTo.value.length > 5) {
        addEventTo.value = addEventTo.value.slice(0, 5);
    }
});

//Add listeners on days after rendered
function addListener() {
    const days = document.querySelectorAll(".Day, .Day-Today, .Day-Event");

    days.forEach((day) => {
        day.addEventListener("click", (e) => {
            //Set activeDay globally if needed
            selectedDay = Number(day.innerText);  // Save the clicked date
            addEventBtn.style.display = "flex";   // Show the "+" button now

            //Remove "active" from all day elements
            days.forEach((d) => d.classList.remove("active"));

            //Add "active" class to the clicked day
            e.target.classList.add("active");

            // Trigger the event form display
            addEventBtn.style.display = "flex";

            //Call active day functions AFTER active class is assigned
            getActiveDay(e.target.innerHTML);
            updateEvents(e.target.innerHTML);

            // Show the add event button/form
            document.querySelector(".add-event").style.display = "flex";

            //Debug
            console.log("Selected Day:", selectedDay);
        });
    });
}

//Show active day events and date at top
function getActiveDay(date) {
    const day = new Date(currentYear, currentMonth, date);
    const dayName = day.toString().split(" ")[0];

    document.querySelector(".event-day").innerHTML = dayName;
    document.querySelector(".event-date").innerHTML =
        date + " " + months[currentMonth] + " " + currentYear;
}

//Function to list all events for a specific date
function updateEvents(date) {
    let events = "";

    eventsArr.forEach((eventObj) => {
        if (
            Number(date) === eventObj.day &&
            currentMonth + 1 === eventObj.month &&
            currentYear === eventObj.year
        ) {
            eventObj.events.forEach((event) => {
                events += `
                <div class="event">
                    <div class="title">
                        <i class="fas fa-circle"></i>
                        <h3 class="event-title">${event.title}</h3>
                    </div>
                    <div class="event-time">
                        <span>${event.time}</span>
                    </div>
                </div>
                `;
            });
        }
    });

    if (events === "") {
        events = `<div class="no-event"><h3>No Events</h3></div>`;
    }

    eventContainer.innerHTML = events;
}

//Add functionality to our submit button
addEventSubmit.addEventListener("click", () => {
    const eventTitle = addEventTitle.value;
    const eventTimeFrom = addEventFrom.value;
    const eventTimeTo = addEventTo.value;

    //Check if all fields are filled
    if (eventTitle === "" || eventTimeFrom === "" || eventTimeTo === "") {
        alert("Please fill all the fields");
        return;
    }

    //Time format validation
    const timeFromArr = eventTimeFrom.split(":");
    const timeToArr = eventTimeTo.split(":");

    if (
        timeFromArr.length !== 2 || timeToArr.length !== 2 ||
        isNaN(timeFromArr[0]) || isNaN(timeFromArr[1]) ||
        isNaN(timeToArr[0]) || isNaN(timeToArr[1]) ||
        timeFromArr[0] > 23 || timeFromArr[1] > 59 ||
        timeToArr[0] > 23 || timeToArr[1] > 59
    ) {
        alert("Invalid Time Format");
        return;
    }

    const timeFrom = convertTime(eventTimeFrom);
    const timeTo = convertTime(eventTimeTo);

    const newEvent = {
        title: eventTitle,
        time: `${timeFrom} - ${timeTo}`
    };

    let eventAdded = false;

    //Add to existing date if found
    for (let i = 0; i < eventsArr.length; i++) {
        if (
            eventsArr[i].day === selectedDay &&
            eventsArr[i].month === currentMonth + 1 &&
            eventsArr[i].year === currentYear
        ) {
            eventsArr[i].events.push(newEvent);
            eventAdded = true;
            break;
        }
    }

    //If not found, create new date
    if (!eventAdded) {
        eventsArr.push({
            day: selectedDay,
            month: currentMonth + 1,
            year: currentYear,
            events: [newEvent],
        });
    }

    //Hide popup and reset
    addEventContainer.classList.remove("active");
    addEventTitle.value = "";
    addEventFrom.value = "";
    addEventTo.value = "";

    //Update events
    updateEvents(selectedDay);
    PopulateDatesCalendar();
    saveEvents();
});

//Function to convert 24hr time to AM/PM format
function convertTime(time) {
    const [hourStr, min] = time.split(":");
    let hour = parseInt(hourStr);
    const ampm = hour >= 12 ? "PM" : "AM";
    hour = hour % 12 || 12;
    return `${hour}:${min} ${ampm}`;
}

//Allow user to delete event on click
eventContainer.addEventListener("click", (e) => {
    if (e.target.closest(".event")) {
        const eventTitle = e.target.closest(".event").querySelector(".event-title").textContent;

        for (let i = 0; i < eventsArr.length; i++) {
            const eventObj = eventsArr[i];
            if (
                eventObj.day === selectedDay &&
                eventObj.month === currentMonth + 1 &&
                eventObj.year === currentYear
            ) {
                const index = eventObj.events.findIndex(ev => ev.title === eventTitle);
                if (index !== -1) {
                    eventObj.events.splice(index, 1);
                    if (eventObj.events.length === 0) {
                        eventsArr.splice(i, 1);
                    }
                    break;
                }
            }
        }

        updateEvents(selectedDay);
        PopulateDatesCalendar();
        saveEvents();
    }
});

//Store events in local storage, get from there
function saveEvents() {
    localStorage.setItem("events", JSON.stringify(eventsArr));
}

function getEvents() {
    const saved = localStorage.getItem("events");
    if (saved) {
        eventsArr = JSON.parse(saved);
    }
}





