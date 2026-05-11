// SCORE ELEMENT

const overallScore =
    document.querySelector(".score-circle h2");


// SCORE CARDS

const scoreCards =
    document.querySelectorAll(".score-card p");


// PROGRESS BARS

const grammarBar =
    document.querySelector(".grammar");

const vocabularyBar =
    document.querySelector(".vocabulary");

const fluencyBar =
    document.querySelector(".fluency");


// FAKE RANDOM SCORE

function generateScore(){

    const scores = [
        5.5,
        6.0,
        6.5,
        7.0,
        7.5
    ];

    const randomIndex =
        Math.floor(Math.random() * scores.length);

    return scores[randomIndex];

}


// SET OVERALL SCORE

const overall =
    generateScore();

overallScore.textContent =
    overall;


// SET SUB SCORES

scoreCards.forEach(card => {

    card.textContent =
        generateScore();

});


// PROGRESS RANDOMIZER

function randomProgress(min, max){

    return Math.floor(
        Math.random() * (max - min + 1)
    ) + min;

}


// SET PROGRESS WIDTHS

grammarBar.style.width =
    `${randomProgress(60, 85)}%`;

vocabularyBar.style.width =
    `${randomProgress(65, 90)}%`;

fluencyBar.style.width =
    `${randomProgress(55, 80)}%`;


// FEEDBACK LIST

const feedbackList = [

    "Use more advanced vocabulary.",
    "Improve coherence between paragraphs.",
    "Try avoiding repetitive sentence structures.",
    "Support your ideas with stronger examples.",
    "Focus more on grammatical accuracy.",
    "Work on fluency and pronunciation.",
    "Improve linking words usage."

];


// RANDOM FEEDBACK

const feedbackItems =
    document.querySelectorAll(".feedback-box li");


feedbackItems.forEach(item => {

    const randomIndex =
        Math.floor(Math.random() * feedbackList.length);

    item.textContent =
        feedbackList[randomIndex];

});


// MISTAKES LIST

const mistakes = [

    "Weak conclusion structure",
    "Grammar inconsistency",
    "Limited vocabulary usage",
    "Unclear topic development",
    "Pronunciation issues",
    "Sentence repetition"

];


// RANDOM MISTAKES

const mistakeCards =
    document.querySelectorAll(".mistake-card");


mistakeCards.forEach(card => {

    const randomIndex =
        Math.floor(Math.random() * mistakes.length);

    card.textContent =
        `❌ ${mistakes[randomIndex]}`;

});


// SCORE ANIMATION

let currentScore = 0;

const scoreAnimation =
    setInterval(() => {

    currentScore += 0.5;

    overallScore.textContent =
        currentScore.toFixed(1);

    if(currentScore >= overall){

        overallScore.textContent =
            overall;

        clearInterval(scoreAnimation);

    }

}, 100);



// BUTTON EFFECT

const buttons =
    document.querySelectorAll(".btn");


buttons.forEach(button => {

    button.addEventListener("click", () => {

        button.style.transform =
            "scale(0.95)";

        setTimeout(() => {

            button.style.transform =
                "scale(1)";

        }, 150);

    });

});


// PAGE LOAD EFFECT

window.addEventListener("load", () => {

    document.body.style.opacity = "1";

});

document.body.style.opacity = "0";
document.body.style.transition =
    "opacity 0.5s ease";


// CONSOLE MESSAGE

console.log("Result System Loaded 📊");