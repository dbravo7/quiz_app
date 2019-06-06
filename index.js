// startquiz button goes to first question
  // generate question html
    // store value of index so don't generate same question twice
    // handle submit button 
    // if answer is correct have to increment score 
    // Can choose from random positive h1s to appear on answer page X
    // Have single h1 for when the question is wrong X

    // function to create shuffled STORE variable
    // function remove value from STORE and send to question template
    // subtract length of STORE from 10 to get number of question
  
'use strict';

let question_num = 0;
let asked_questions = [];
let correct_answers = 0; 

function questionTemplate() {
  const obj = Q_A[chooseQuestion()];

  return `<header class="question_header">
    <h1>${question_num += 1}</h1>
  </header>
  
  <section class="question_page">
    <header>
      <h2>${obj.question}</h2>
    </header>
    <form class="question_form">
      <fieldset class="question_field">
        <label>
          <input type="radio" name="answer" required>
          <span>The Fairy Queen</span>
        </label>
        <label>
          <input type="radio" name="answer" required>
          <span>Paradise Lost</span>
        </label>
        <label>
          <input type="radio" name="answer" required>
          <span>The Count of Monte Cristo</span>
        </label>
        <label>
          <input type="radio" name="answer" required>
          <span>All of the above</span>
        </label>
      </fieldset>
      <div class=" button_container">
        <button type="button" class="submit_button">
          <a href="wireframe_answer_page.html">Submit Answer</a>
        </button>
      </div>
    </form>
  </section>`
}

function 

function chooseQuestion() {
  
  if (asked_questions.includes(idx)) {
    chooseQuestion();
  } else {
    asked_questions.push(idx);
    return idx; 
  }
}

function wrongAnswer() {
  return "The correct answer is below";
}

function correctAnswer() {
  const answers = ['Excellent!', 'Perfect!', 'Right On!', 'Good Job!']; 
  let idx = Math.floor(Math.random() * 4);
  return answers[idx];
}

function increaseScore() {
  return correct_answers += 1; 
}

  