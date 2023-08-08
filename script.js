const questions = [
    {
        question: "Who is the best football player of all time?",
        answers: [
            {text: "C.Ronaldo",correct: "false"},
            {text: "Messi",correct: "true"},
            {text: "Pele",correct: "false"},
            {text: "Maradona",correct: "false"},
        ]
    },
    {
        question: " What is the capital of tunisia?",
        answers: [
            {text: "Rome",correct: "false"},
            {text: "Paris",correct: "false"},
            {text: "Trablus",correct: "false"},
            {text: "Tunis",correct: "true"},
        ]
    },
    {
        question: "Who invented the relativety theory?",
        answers: [
            {text: "Albert Einstein",correct: "true"},
            {text: "Hokkings",correct: "false"},
            {text: "Davinchi",correct: "false"},
            {text: "Newton",correct: "false"},
        ]
    },
    {
        question: "The most spoken language in the world?",
        answers: [
            {text: "Chinese",correct: "false"},
            {text: "English",correct: "true"},
            {text: "Hindi",correct: "false"},
            {text: "Spanish",correct: "false"},
        ]
    },
];

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz(){
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    showQuestion();
}

function showQuestion(){

    resetState();

    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + "." + currentQuestion.question;

    currentQuestion.answers.forEach(answer =>{
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButtons.appendChild(button);
        if(answer.correct){
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click",selectAnswer);
    });
}

function resetState(){
    nextButton.style.display = "none";
    while(answerButtons.firstChild){
        answerButtons.removeChild(answerButtons.firstChild);
    }
}

function selectAnswer(e){
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    if(isCorrect){
        selectedBtn.classList.add("correct");
        score++;
    }else{
        selectedBtn.classList.add("incorrect");
    }
    Array.from(answerButtons.children).forEach(button =>{
        if(button.dataset.correct === "true"){
            button.classList.add("correct");
        }
        button.disabled = true ;
    });
    nextButton.style.display = "block";
}
  
function showScore(){
    resetState();
    questionElement.innerHTML = `You scored ${score} out of ${questions.length}!`;
    nextButton.innerHTML = "Play Again";
    nextButton.style.display = "block";
}

function handleNextButton(){
    currentQuestionIndex++;
    if(currentQuestionIndex < questions.length){
        showQuestion();
    }else{
        showScore();
    }
}

nextButton.addEventListener("click",()=>{
    if(currentQuestionIndex < questions.length){
        handleNextButton();
    }else{
            startQuiz();
        }
    
})

startQuiz();