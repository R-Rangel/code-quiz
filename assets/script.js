var startButton = document.querySelector('.btn');
var quizContainer = document.querySelector('.quiz');
var questionElement = document.querySelector('.quiz h1');
var answersElement = document.querySelector('.quiz ul');
var nextButton = document.querySelector('.quiz button');

var currentQuestionIndex = 0;
var questions = [
  {
    question: "What is the capital of France?",
    answers: ["London", "Paris", "Berlin"],
    correctAnswerIndex: 1
  },
  {
    question: "What is the highest mountain in the world?",
    answers: ["Mount Everest", "K2", "Kangchenjunga"],
    correctAnswerIndex: 0
  },
  {
    question: "What is the largest country in the world?",
    answers: ["Russia", "Canada", "China"],
    correctAnswerIndex: 0
  }
];
var score = 0;
var timeLeft = 60;
var timerInterval;

function startQuiz(){
  console.log('started');
  startButton.setAttribute('hidden', '');
  quizContainer.removeAttribute('hidden');
  showQuestion(0);
  startTimer();
}

function startTimer() {
  timerInterval = setInterval(function() {
    timeLeft--;
    if (timeLeft <= 0) {
      endQuiz();
    }
  }, 1000);
}

function endQuiz() {
  clearInterval(timerInterval);
 
  quizContainer.setAttribute('hidden', '');
  console.log('quiz over');
  
  localStorage.setItem('quizScore', score);
  var initials = prompt("Enter your initials to save your score:");
  
  localStorage.setItem('quizInitials', initials);
  localStorage.setItem('quizScore', score);
}

function nextQuestion(){
  currentQuestionIndex++;
  if (currentQuestionIndex >= questions.length) {
    endQuiz();
  } else {
    showQuestion(currentQuestionIndex);
  }
}

function answerSelect(event){
  var selectedAnswerIndex = event.target.getAttribute('data-answer-index');
  if (selectedAnswerIndex == questions[currentQuestionIndex].correctAnswerIndex) {
   
    score++;
  } else {
    
    timeLeft -= 10;
  }
  
  var answerButtons = answersElement.querySelectorAll('button');
  for (var i = 0; i < answerButtons.length; i++) {
    answerButtons[i].setAttribute('disabled', '');
  }
  
  nextButton.removeAttribute('hidden');
  
  document.querySelector('.score').textContent = 'Score: ' + score;
}

function showQuestion(index){
  var question = questions[index];
  questionElement.textContent = "Question " + (index + 1) + ": " + questions[index].question;

  answersElement.innerHTML = '';
  for (var i = 0; i < question.answers.length; i++) {
    var answer = question.answers[i];
    var button = document.createElement('button');
    button.textContent = answer;
    button.setAttribute('data-answer-index', i);
    button.onclick = answerSelect;
    answersElement.appendChild(document.createElement('li').appendChild(button));
  }
  
  nextButton.setAttribute('hidden', '');
}

startButton.addEventListener('click', startQuiz);
