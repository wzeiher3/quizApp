/**
 * Example store structure
 */
let counter = 0;
let correct = 0;
let incorrect = 0;
const store = {
  // 5 or more questions are required
  questions: [{
      question: 'The sky is blue',
      answers: [
        'true',
        'false'
      ],
      correctAnswer: 'true'
    },
    {
      question: 'Javascript is super easy',
      answers: [
        'true',
        'false'
      ],
      correctAnswer: 'false'
    },
    {
      question: 'Thinkful is cool',
      answers: [
        'true',
        'false'
      ],
      correctAnswer: 'true'
    },
    {
      question: 'jQuery is fun',
      answers: [
        'true',
        'false'
      ],
      correctAnswer: 'true'
    },
    {
      question: 'Terra is the best',
      answers: [
        'true',
        'false'
      ],
      correctAnswer: 'true'
    }

  ],
  quizStarted: false,
  questionNumber: 0,
};

/**
 * 
 * Technical requirements:
 * 
 * Your app should include a render() function, that regenerates the view each time the store is updated. 
 * See your course material, consult your instructor, and reference the slides for more details.
 *
 * NO additional HTML elements should be added to the index.html file.
 *
 * You may add attributes (classes, ids, etc) to the existing HTML elements, or link stylesheets or additional scripts if necessary
 *
 * SEE BELOW FOR THE CATEGORIES OF THE TYPES OF FUNCTIONS YOU WILL BE CREATING 👇
 * https://github.com/musicMan1337/myQuizApp.git
 */

/********** TEMPLATE GENERATION FUNCTIONS **********/

// These functions return HTML templates

/********** RENDER FUNCTION(S) **********/

// This function conditionally replaces the contents of the <main> tag based on the state of the store

function renderQuestion() {
  if (store.questionNumber > store.questions.length)
    endQuiz();
  if (store.quizStarted)
    $('.question').html(store.questions[counter].question);
  //console.log(store.questions[0].question);
}

/********** EVENT HANDLER FUNCTIONS **********/

// These functions handle events (submit, click, etc)

function submitAnswer() {
  $('main').on('click', '#submit', function (event) {
    event.preventDefault();
    console.log(store.questionNumber);
    console.log(store.questions.length);
    if (!document.getElementById('true').checked && !document.getElementById('false').checked)
      return alert("Select an answer");
    let answer = 'default';
    if (document.getElementById('true').checked)
      answer = document.getElementById('true').value;
    else if (document.getElementById('false').checked)
      answer = document.getElementById('false').value;
    else
      answer = 'still default';
    console.log(answer);
    if (store.questions[counter].correctAnswer == answer) {
      correct++;
      alert("You are right!");
    } else {
      incorrect++;
      alert("You are wrong!");
    }

    counter++;
    store.questionNumber++;
    $('.question-number').html(`Question: ${store.questionNumber}/5`);
    $('.correct-counter').html(`Correct: ${correct}`);
    $('.wrong-counter').html(`Incorrect: ${incorrect}`);
    renderQuestion();
  })
}

function renderHeader() {
  $('header').html(`
    <div id="quiz-name-div">
      <h1 class="quiz-name-short">SUPER HARD QUIZ</h1>
    </div>
    <div id="quiz-tracker">
        <h2 class="question-number">Question: ${store.questionNumber}/5</h2>
    <div class="header-counters">
      <h3 class="correct-counter">Correct: ${correct}</h3>
      <h3 class="wrong-counter">Incorrect: ${incorrect}</h3>
    </div>
  </div>`);
}

function endQuiz() {
  $('header').html(`<h1 class="quiz-name-full">FULL name</h1>`);
  $('main').html(`
  <div id="results">
    <div>
      <p class="results-tag">RESULTS:</p>
    </div>
    <div class="results-counters">
      <p class="results-correct">Score: ${(correct + incorrect)}/5</p>
    </div>
    <form id="restart-button-div">
      <button type="submit" id="restart-button" class="generic-button">RESTART?</button>
    </form>
  </div>`);
}

function renderStartButton() {
  $('main').html(`
  <div id="start-button-div">
    <button type="submit" id="start-button" class="generic-button">START QUIZ</button>
  </div>`)
}

function renderMain() {
  $('main').html(`
  <div class="box">
    <div class="question"></div>
    <form class="form">
      <div>
        <input type="radio" id="true" name="answer" value="true" required="required" >
        <label for="true">True</label>
      </div>
      <div>
        <input type="radio" id="false" name="answer" value="false" >
        <label for="false">False</label>
      </div>
      <button type="submit" id="submit">Submit</button>
    </form>
  </div>`)
}

function restartQuiz() {
  $('#restart-button-div').on('click', '#restart-button', function (event) {
    event.preventDefault();
    console.log('listening');
    handleQuestions();
  })
}

function startQuiz() {
  $('#start-button-div').on('click', '#start-button', function (event) {
    event.preventDefault();
    store.questionNumber++;
    store.quizStarted = true;
    renderMain();
    renderHeader();
    renderQuestion();
  });
}

function handleQuestions() {
  renderStartButton();
  startQuiz();
  renderQuestion();
  submitAnswer();
  restartQuiz();
}

$(handleQuestions);