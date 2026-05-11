// ELEMENTS

const startBtn = document.querySelector(".start-btn");
const stopBtn = document.querySelector(".stop-btn");

const recordStatus = document.querySelector(".record-status");
const timer = document.getElementById("timer");

const generateBtn = document.querySelector(".generate-btn");
const questionText = document.getElementById("question");

const submitBtn = document.querySelector(".submit-btn");

const micIcon = document.querySelector(".mic-icon");


// TIMER VARIABLES

let minutes = 2;
let seconds = 0;

let timerRunning = false;
let countdown;


// START RECORDING

startBtn.addEventListener("click", () => {

    if(timerRunning){
        return;
    }

    timerRunning = true;

    recordStatus.textContent = "Recording...";

    micIcon.style.borderColor = "#ef4444";

    countdown = setInterval(() => {

        if(seconds === 0){

            if(minutes === 0){

                clearInterval(countdown);

                timerRunning = false;

                recordStatus.textContent =
                    "Recording Finished";

                alert("Recording time finished.");

                return;

            }

            minutes--;
            seconds = 59;

        }
        else{

            seconds--;

        }

        const formattedMinutes =
            String(minutes).padStart(2, "0");

        const formattedSeconds =
            String(seconds).padStart(2, "0");

        timer.textContent =
            `${formattedMinutes}:${formattedSeconds}`;

    }, 1000);

});


// STOP RECORDING

stopBtn.addEventListener("click", () => {

    clearInterval(countdown);

    timerRunning = false;

    recordStatus.textContent =
        "Recording Stopped";

    micIcon.style.borderColor = "#38bdf8";

});


// SPEAKING QUESTIONS

const questions = [

    "Describe your favorite book and explain why you like it.",

    "Talk about a memorable holiday you had.",

    "Describe a person who inspired you.",

    "Describe your hometown.",

    "Talk about a skill you want to learn in the future.",

    "Describe a difficult decision you made.",

    "Talk about your favorite movie."

];


// GENERATE RANDOM QUESTION

generateBtn.addEventListener("click", () => {

    const randomIndex =
        Math.floor(Math.random() * questions.length);

    questionText.textContent =
        questions[randomIndex];

});


// FAKE SUBMIT

submitBtn.addEventListener("click", () => {

    if(recordStatus.textContent === "Ready to Record"){

        alert("Please record your speaking first.");
        return;

    }

    alert("Speaking submitted successfully!");

    setTimeout(() => {

        window.location.href = "result.html";

    }, 1000);

});


// RESET TIMER AFTER STOP

stopBtn.addEventListener("click", () => {

    minutes = 2;
    seconds = 0;

    timer.textContent = "02:00";

});


// MIC ANIMATION

startBtn.addEventListener("click", () => {

    micIcon.style.animation =
        "pulse 1s infinite";

});


stopBtn.addEventListener("click", () => {

    micIcon.style.animation =
        "none";

});


// CONSOLE MESSAGE

console.log("Speaking Module Loaded 🎙");