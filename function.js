//Define our variables for our calendar functions
const calendar = document.querySelector(".Calendar"),
    calendarDate = document.querySelector(".Date"),
    ContainerDays = document.querySelector(".Days"),
    prevMonth = document.querySelector(".Month i.material-symbols-outlined:first-child"),
    nextMonth = document.querySelector(".Month i.material-symbols-outlined:last-child"),
    TodayButton = document.querySelector(".Today-Button"),
    GoToButton = document.querySelector(".Go-To-Button"),
    ButtonMonthInput = document.querySelector(".Month-Input");

    
let presentDate = new Date();
let selectedDay;
let currentMonth = presentDate.getMonth(); 
let currentYear = presentDate.getFullYear();
const months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
];

//Function to generate the numerical dates in a month 
function PopulateDatesCalendar(){
    const FirstDay = new Date(currentYear, currentMonth, 1);
    const LastDay = new Date(currentYear, currentMonth + 1, 0);
    const PrevLastDay = new Date(currentYear, currentMonth, 0);
    const PrevLastDayGet = PrevLastDay.getDate();
    const LastDayGet = LastDay.getDate();
    const day = FirstDay.getDay();  
    const NextDay = 7 - LastDay.getDay() - 1;

    //Update month/year at the top of the calendar
    calendarDate.innerHTML = months[currentMonth] + " " + currentYear;

    //Add in the days
    let daysHTML = "";

    //Generates the dates from the previous month (greyed out) for the current month we are on
    for (let x = day; x > 0; x--) {
        daysHTML += `<div class="Day-Month-Prev">${PrevLastDayGet - x + 1}</div>`;
    }

    //Generates the dates for the current month we are on
    for (let i = 1; i <= LastDayGet; i++) {  // changed the loop to <=
        // If day is today, add class 'Day-Today'
        if (i == new Date().getDate() && currentYear == new Date().getFullYear() && currentMonth == new Date().getMonth()) {
            daysHTML += `<div class="Day-Today">${i}</div>`;
        } else {
            //The remaining days
            daysHTML += `<div class="Day">${i}</div>`;
        }
    }

    //Generates the dates from the previous month (greyed out) for the current month we are on
    for (let i = 1; i <= NextDay; i++) {
        daysHTML += `<div class="Day-Month-Next">${i}</div>`;
    }

    ContainerDays.innerHTML = daysHTML;
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
