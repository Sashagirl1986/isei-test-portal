// ================================
// ISEI TEST PORTAL
// Version 1.0
// ================================

let currentQuestion = 0;

let score = 0;

let timer = 0;

let timerInterval = null;

let selectedLevel = "light";

let questions = [];

let userAnswers = [];

const lightQuestions = [];

const highQuestions = [];

// -----------------------------

const lightCard = document.getElementById("light");
const highCard = document.getElementById("high");
const startBtn = document.getElementById("startBtn");

// -----------------------------

lightCard.addEventListener("click", () => {

    selectedLevel = "light";

    lightCard.classList.add("selected");

    highCard.classList.remove("selected");

});

highCard.addEventListener("click", () => {

    selectedLevel = "high";

    highCard.classList.add("selected");

    lightCard.classList.remove("selected");

});

// -----------------------------

startBtn.addEventListener("click", startTest);

// -----------------------------

function startTest(){

    const fullname =
        document
        .getElementById("fullname")
        .value
        .trim();

    if(fullname===""){

        alert("Введіть ПІБ");

        return;

    }

    if(selectedLevel==="light"){

        questions=[...lightQuestions];

    }else{

        questions=[...highQuestions];

    }

    shuffleArray(questions);

    currentQuestion=0;

    score=0;

    timer=0;

    userAnswers=[];

    startTimer();

    showQuestion();

}

// -----------------------------

function startTimer(){

    clearInterval(timerInterval);

    timerInterval=setInterval(()=>{

        timer++;

        updateTimer();

    },1000);

}

// -----------------------------

function updateTimer(){

    const m=Math.floor(timer/60);

    const s=timer%60;

    const value=

        String(m).padStart(2,"0")

        +":"

        +

        String(s).padStart(2,"0");

    const timerBox=document.getElementById("timer");

    if(timerBox){

        timerBox.innerHTML=value;

    }

}

// -----------------------------

function shuffleArray(array){

    for(let i=array.length-1;i>0;i--){

        const j=Math.floor(Math.random()*(i+1));

        [array[i],array[j]]

        =

        [array[j],array[i]];

    }

}
