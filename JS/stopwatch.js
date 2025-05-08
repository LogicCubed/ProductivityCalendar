const display = document.getElementById("stopwatchdisplay");
let timer = null;
let startTime = 0;
let elapsedTime = 0;
let isRunning = false;

function start() {

    if(!isRunning) {
        startTime = Date.now() - elapsedTime;
        timer = setInterval(update, 10);
        isRunning = true;

        localStorage.setItem("isRunning", true);
        localStorage.setItem("startTime", startTime);
    }
    
}

function stop() {

    if(isRunning) {
        clearInterval(timer);
        elapsedTime = Date.now() - startTime;
        isRunning = false;

        localStorage.setItem("isRunning", false);
        localStorage.setItem("elapsedTime", elapsedTime);
    }

}

function reset() {
    clearInterval(timer);
    startTime = 0;
    elapsedTime = 0;
    isRunning = false;

    localStorage.removeItem("startTime");
    localStorage.removeItem("elapsedTime");
    localStorage.setItem("isRunning", false);

    display.textContent = "00:00:00:00";
}

function update() {

    const currentTime = Date.now();
    elapsedTime = currentTime - startTime;

    let hours = Math.floor(elapsedTime / (1000 * 60 * 60));
    let minutes = Math.floor(elapsedTime / (1000 * 60) % 60);
    let seconds = Math.floor(elapsedTime / 1000 % 60);
    let milliseconds = Math.floor(elapsedTime % 1000 / 10);

    hours = String(hours).padStart(2, "0");
    minutes = String(minutes).padStart(2, "0");
    seconds = String(seconds).padStart(2, "0");
    milliseconds = String(milliseconds).padStart(2, "0");

    display.textContent = `${hours}:${minutes}:${seconds}:${milliseconds}`;
}

window.onload = function () {
    const running = localStorage.getItem("isRunning") === "true";
    const savedStartTime = parseInt(localStorage.getItem("startTime"));
    const savedElapsedTime = parseInt(localStorage.getItem("elapsedTime")) || 0;

    if (running && savedStartTime) {
        startTime = savedStartTime;
        elapsedTime = Date.now() - startTime;
        isRunning = true;
        timer = setInterval(update, 10);
    } else if (savedElapsedTime) {
        elapsedTime = savedElapsedTime;
        update();
    }
};