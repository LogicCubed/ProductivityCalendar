const calendar = document.querySelector(".Calendar"),
    date = document.querySelector(".Date"),
    daysContainer = document.querySelector(".Days"),
    prevMonth = document.querySelector(".Day-Month-Prev"),
    nextMonth = document.querySelector(".Day-Month-Next");

let today = new Date();
let activeDay;
let month = today.getMonth(); 
let year = today.getFullYear();

const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
];

// Function to get Days
function CalendarDates(){
    const FirstDate = new Date(year, month, 1);
    const LastDate = new Date(year, month + 1, 0);
    const PrevLastDate = new Date(year, month, 0);
    const PrevLastDateGet = PrevLastDate.getDate();
    const LastDateGet = LastDate.getDate();
    const day = FirstDate.getDay();  // fixed to get the starting day of the week
    const NextDate = 7 - LastDate.getDay() - 1;

    // Update top of calendar date
    date.innerHTML = months[month] + " " + year;

    // Add Days
    let days = "";

    // Previous Month
    for (let x = day; x > 0; x--) {
        days += `<div class="Day-Month-Prev">${PrevLastDateGet - x + 1}</div>`;
    }

    // Current Month
    for (let i = 1; i <= LastDateGet; i++) {  // changed the loop to <=
        // If day is today, add class 'Day-Today'
        if (i == new Date().getDate() && year == new Date().getFullYear() && month == new Date().getMonth()) {
            days += `<div class="Day-Today">${i}</div>`;
        } else {
            // Remaining days
            days += `<div class="Day">${i}</div>`;
        }
    }

    daysContainer.innerHTML = days;
}

CalendarDates();
