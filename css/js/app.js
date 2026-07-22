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
// ==============================
// Відображення питання
// ==============================

function showQuestion(){

    if(currentQuestion >= questions.length){

        finishTest();

        return;

    }

    const q = questions[currentQuestion];

    document.body.innerHTML = `

<div class="container fade">

<div class="header">

<h2>${selectedLevel.toUpperCase()} LEVEL</h2>

<div class="timer" id="timer"></div>

</div>

<div class="progress">

<div
class="progress-bar"
style="width:${((currentQuestion)/questions.length)*100}%">
</div>

</div>

<div class="question-card">

<h2>

Питання ${currentQuestion+1}

</h2>

<p style="margin-top:20px;font-size:20px;line-height:1.6">

${q.question}

</p>

${
q.image
?

`<img class="question-image" src="${q.image}">`

:

""

}

<div
class="answers"
id="answers">

</div>

<div class="navigation">

<button onclick="prevQuestion()">

← Назад

</button>

<button onclick="nextQuestion()">

Далі →

</button>

</div>

</div>

</div>

`;

    updateTimer();

    renderAnswers();

}

// ==============================

function renderAnswers(){

    const answers=document.getElementById("answers");

    answers.innerHTML="";

    const q=questions[currentQuestion];

    q.answers.forEach((answer,index)=>{

        const div=document.createElement("div");

        div.className="answer";

        div.innerHTML=answer.text;

        div.onclick=()=>selectAnswer(index,div);

        answers.appendChild(div);

    });

}
