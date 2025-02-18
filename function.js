//Define our variables for our calendar functions
const calendar = document.querySelector(".Calendar"),
    date = document.querySelector(".Date"),
    daysContainer = document.querySelector(".Days"),
    prevMonth = document.querySelector(".Month i.material-symbols-outlined:first-child"),
    nextMonth = document.querySelector(".Month i.material-symbols-outlined:last-child");
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

//Function to generate the numerical dates in a month 
function CalendarDates(){
    const FirstDate = new Date(year, month, 1);
    const LastDate = new Date(year, month + 1, 0);
    const PrevLastDate = new Date(year, month, 0);
    const PrevLastDateGet = PrevLastDate.getDate();
    const LastDateGet = LastDate.getDate();
    const day = FirstDate.getDay();  
    const NextDate = 7 - LastDate.getDay() - 1;

    //Update month/year at the top of the calendar
    date.innerHTML = months[month] + " " + year;

    //Add in the days
    let days = "";

    //Generates the dates from the previous month (greyed out) for the current month we are on
    for (let x = day; x > 0; x--) {
        days += `<div class="Day-Month-Prev">${PrevLastDateGet - x + 1}</div>`;
    }

    //Generates the dates for the current month we are on
    for (let i = 1; i <= LastDateGet; i++) {  // changed the loop to <=
        // If day is today, add class 'Day-Today'
        if (i == new Date().getDate() && year == new Date().getFullYear() && month == new Date().getMonth()) {
            days += `<div class="Day-Today">${i}</div>`;
        } else {
            //The remaining days
            days += `<div class="Day">${i}</div>`;
        }
    }

    //Generates the dates from the previous month (greyed out) for the current month we are on
    for (let i = 1; i <= NextDate; i++) {
        days += `<div class="Day-Month-Next">${i}</div>`;
    }

    daysContainer.innerHTML = days;
}

//Call our function to fill in the numeric dates for this month
CalendarDates();

//Function to add in all the previous months to the calendar
function PreviousMonths() {
    month--;
    if (month < 0) {
        month = 11;
        year--;
    }
    CalendarDates();
}

//Function to add in all the future months to the calendar
function NextMonths() {
    month++;
    if (month > 11) {
        month = 0;
        year++;
    }
    CalendarDates();
}

//Call our function to all all the previous months and their dates to our calendar
prevMonth.addEventListener("click", PreviousMonths);
//Call our function to all all the future months and their dates to our calendar
nextMonth.addEventListener("click", NextMonths);
