/**
 * Example store structure
 */
let counter = 0;
let correct = 0;
let incorrect = 0;
const store = {
  // 5 or more questions are required
  questions: [{
      question: `How many moons does Jupiter have?`,
      answers: [
        103,
        96, 
        79, 
        73
      ],
      correctAnswer: 79
    },
    {
      question: `Which year was Google founded?`,
      answers: [
        1996, 
        1997, 
        1998, 
        2001
      ],
      correctAnswer: 1998
    },
    {
      question: `Kimchi is a popular side dish in which Asian country?`,
      answers: [
        'Korea', 
        'Japan', 
        'China', 
        'Vietnam'
      ],
      correctAnswer: 'Korea'
    },
    {
      question: `Coca-Cola was founded in which city?`,
      answers: [
        'New York City',
        'Boston',
        'Los Angeles',
        'Atlanta'
      ],
      correctAnswer: 'Atlanta'
    },
    {
      question: `How many ounces in a cup?`,
      answers: [
         6, 
         8, 
         12, 
         16
      ],
      correctAnswer: 8
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
  if(store.quizStarted)
    $('#thisQuestion').html(store.questions[counter].question);
  //console.log(store.questions[0].question);
}

/********** EVENT HANDLER FUNCTIONS **********/

// These functions handle events (submit, click, etc)

function submitAnswer() {
  $('main').on('click', '#submit', function (event) {
    event.preventDefault();
    console.log(store.questionNumber);
    console.log(store.questions.length);
    if (!document.getElementById('q1').checked && 
        !document.getElementById('q2').checked &&
        !document.getElementById('q3').checked &&
        !document.getElementById('q4').checked)
            return alert("Select an answer");
    let answer = 'default';
    if (document.getElementById('q1').checked)
      answer = document.getElementById('q1').value;
    else if (document.getElementById('q2').checked)
      answer = document.getElementById('q2').value;
    else if (document.getElementById('q3').checked)
      answer = document.getElementById('q3').value;
    else if (document.getElementById('q4').checked)
      answer = document.getElementById('q4').value;
    else
      answer = 'still default';
    console.log(answer);
    if (store.questions[counter].correctAnswer == answer) {
      correct++;
      submitRightAnswer();
    } else {
      incorrect++;
      submitWrongAnswer();
    }

    
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
  $('header').html(`<h1 class="quiz-name-full">CONGRATULATIONS!</h1>`);
  $('main').html(`
  <div id="results">
    <div>
      <p class="results-tag">RESULTS:</p>
    </div>
    <div class="results-counters">
      <p class="results-correct">Score: ${(correct)}/5</p>
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

function renderHeaderTag(){
    
    $('.question-number').html(`Question: ${store.questionNumber}/5`);
    $('.correct-counter').html(`Correct: ${correct}`);
    $('.wrong-counter').html(`Incorrect: ${incorrect}`);
    renderQuestion();
    renderAnswers();
}

function renderMain() {
  $('main').html(`
  <div class="box">
    <div class="question" id="thisQuestion"></div>
    <form class="form">
    </form>
  </div>`)
}

function submitRightAnswer(){
  $('main').html(`
      <h2>You are correct!</h2>
      <form id="next-button">
        <button type="submit" class="submit" id="next" class="generic-button">Next</button>
      </form>
  `)
}

function submitWrongAnswer(){
  $('main').html(`
    <h2>Incorrect. The correct answer is: ${store.questions[counter].correctAnswer}</h2>
      <form id="next-button">
        <button type="submit" class="submit" id="next" class="generic-button">Next</button>
      </form>
  `)
}


function HandleNextClick(){
  $('main').on('click', '#next', function(event){
    event.preventDefault();
    counter++;
    store.questionNumber++;
    if (store.questionNumber > store.questions.length)
      endQuiz();
    else{
      renderMain();
      renderHeader();
      renderQuestion();
      renderAnswers();
    }
  })
}

function renderAnswers(){
  $('.form').html(`
      <div>
        <input type="radio" id="q1" name="answer" value=${store.questions[counter].answers[0]} required="required" >
        <label for="q1">${store.questions[counter].answers[0]}</label>
      </div>
      <div>
        <input type="radio" id="q2" name="answer" value=${store.questions[counter].answers[1]} >
        <label for="q2">${store.questions[counter].answers[1]}</label>
      </div>
      <div>
        <input type="radio" id="q3" name="answer" value=${store.questions[counter].answers[2]} >
        <label for="q3">${store.questions[counter].answers[2]}</label>
      </div>
      <div>
        <input type="radio" id="q4" name="answer" value=${store.questions[counter].answers[3]} >
        <label for="q4">${store.questions[counter].answers[3]}</label>
      </div>
      <button type="submit" class="submit" id="submit">Submit</button>
      `);
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
    renderAnswers();
  });
}

function handleQuestions() {
  renderStartButton();
  startQuiz();
  renderHeaderTag();
  renderQuestion();
  submitAnswer();
  restartQuiz();
  HandleNextClick();
}

$(handleQuestions);
