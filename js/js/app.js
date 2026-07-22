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

const lightCard = document.getElementById("light");
const highCard = document.getElementById("high");
const startBtn = document.getElementById("startBtn");

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

startBtn.addEventListener("click", startTest);

function startTest(){

    const fullname = document
        .getElementById("fullname")
        .value
        .trim();

    if(fullname===""){
        alert("Введіть ПІБ");
        return;
    }

    questions =
        selectedLevel==="light"
        ? [...lightQuestions]
        : [...highQuestions];

    shuffleArray(questions);

    currentQuestion = 0;
    score = 0;
    timer = 0;
    userAnswers = [];

    prepareQuestions();

    startTimer();

    showQuestion();

}

function startTimer(){

    clearInterval(timerInterval);

    timerInterval = setInterval(() => {

        timer++;

        updateTimer();

    },1000);

}

function updateTimer(){

    const m = Math.floor(timer/60);
    const s = timer%60;

    const value =
        String(m).padStart(2,"0")
        +":"
        +String(s).padStart(2,"0");

    const timerBox = document.getElementById("timer");

    if(timerBox){

        timerBox.innerHTML=value;

    }

}

function shuffleArray(array){

    for(let i=array.length-1;i>0;i--){

        const j=Math.floor(Math.random()*(i+1));

        [array[i],array[j]]=[array[j],array[i]];

    }

}

function showQuestion(){

    if(currentQuestion>=questions.length){

        finishTest();

        return;

    }

    const q=questions[currentQuestion];

    document.body.innerHTML=`

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

<h2>Питання ${currentQuestion+1}</h2>

<p style="margin-top:20px;font-size:20px;line-height:1.6">
${q.question}
</p>

${q.image ? `<img class="question-image" src="${q.image}">` : ""}

<div class="answers" id="answers"></div>

<div class="navigation">

<button onclick="prevQuestion()">← Назад</button>

<button onclick="nextQuestion()">Далі →</button>

</div>

</div>

</div>

`;

    updateTimer();

    renderAnswers();

    restoreAnswers();

}

function renderAnswers(){

    const answers=document.getElementById("answers");

    answers.innerHTML="";

    const q=questions[currentQuestion];

    q.answers.forEach((answer,index)=>{

        const div=document.createElement("div");

        div.className="answer";

        div.innerHTML=answer.text ?? answer;

        div.onclick=()=>selectAnswer(index,div);

        answers.appendChild(div);

    });

}

function selectAnswer(index,element){

    const q=questions[currentQuestion];

    if(q.multiple){

        element.classList.toggle("selected");

        if(!userAnswers[currentQuestion]){

            userAnswers[currentQuestion]=[];

        }

        const arr=userAnswers[currentQuestion];

        const pos=arr.indexOf(index);

        if(pos===-1){

            arr.push(index);

        }else{

            arr.splice(pos,1);

        }

    }else{

        document.querySelectorAll(".answer")
            .forEach(a=>a.classList.remove("selected"));

        element.classList.add("selected");

        userAnswers[currentQuestion]=index;

    }

}

function nextQuestion(){

    if(userAnswers[currentQuestion]===undefined){

        alert("Оберіть відповідь.");

        return;

    }

    currentQuestion++;

    showQuestion();

}

function prevQuestion(){

    if(currentQuestion===0){

        return;

    }

    currentQuestion--;

    showQuestion();

}

function restoreAnswers(){

    const saved=userAnswers[currentQuestion];

    if(saved===undefined) return;

    const blocks=document.querySelectorAll(".answer");

    if(Array.isArray(saved)){

        saved.forEach(index=>{

            if(blocks[index]){

                blocks[index].classList.add("selected");

            }

        });

    }else{

        if(blocks[saved]){

            blocks[saved].classList.add("selected");

        }

    }

}

function shuffleAnswers(question){

    const correct=question.correct;

    const answers=question.answers.map((a,i)=>({

        text:a,

        original:i

    }));

    shuffleArray(answers);

    if(question.multiple){

        question.correct=correct.map(c=>
            answers.findIndex(a=>a.original===c)
        );

    }else{

        question.correct=
            answers.findIndex(a=>a.original===correct[0]);

    }

    question.answers=answers;

}

function prepareQuestions(){

    questions.forEach(q=>shuffleAnswers(q));

}
