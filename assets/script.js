const questions = [
  {
    question: "What is JavaScript?",
    answers: ["A programming language", "A markup language", "A styling language"],
    correctAnswer: 0
  },
  {
    question: "What is a variable?",
    answers: ["A container for storing data", "A function that returns a value", "A loop that repeats code"],
    correctAnswer: 0
  },
  {
    question: "What is a function?",
    answers: ["A block of code that performs a specific task", "A variable that stores an array", "A keyword that starts a loop"],
    correctAnswer: 0
  }
];
const quizDuration = 60; 
const wrongAnswerPenalty = 10; 


const startButton = document.querySelector(".start-button");
const quizContainer = document.querySelector(".quiz");
const questionNumberElement = document.querySelector(".question-number");
const timeElement = document.querySelector(".time");
const questionElement = document.querySelector(".question");
const answersElement = document.querySelector(".answers");
const nextButton = document.querySelector(".next-button");


let currentQuestionIndex;
let timeRemaining;
let timerId;
let score;

startButton.addEventListener("click", startQuiz);


function startQuiz() {
 
  currentQuestionIndex = 0;
  timeRemaining = quizDuration;
  score = 0;
 
  document.querySelector(".start").hidden = true;
  quizContainer.hidden = false;
 
  startTimer();
  displayQuestion();
}


function startTimer() {
  timerId = setInterval(() => {
    timeRemaining--;
    timeElement.textContent = timeRemaining;
    if (timeRemaining <= 0) {
      endQuiz();
    }
  }, 1000);
}


function displayQuestion() {
 
  const question = questions[currentQuestionIndex];
  
  questionNumberElement.textContent = `Question ${currentQuestionIndex + 1}`;
  questionElement.textContent = question.question;
  
  answersElement.innerHTML = "";
  for (const [index, answer] of question.answers.entries()) {
    const li = document.createElement("li");
    li.textContent = answer;
    li.addEventListener("click", () => {
      
      if (index === question.correctAnswer) {
        score++;
      } else {
        timeRemaining -= wrongAnswerPenalty;
      }
      
      currentQuestionIndex++;
      if (currentQuestionIndex < questions.length) {
        displayQuestion();
      } else {
        endQuiz();
      }
    });
    answersElement.appendChild(li);
  }
}
function endQuiz() {
  clearInterval(timerId);
  quizContainer.hidden = true;

  const initials = prompt(`Your score is ${score}. Enter your initials to save your score.`);

  if (initials) {
    const scores = JSON.parse(localStorage.getItem("quizScores")) || [];
    scores.push({ initials, score });
    localStorage.setItem("quizScores", JSON.stringify(scores));
  }
}

