$(document).ready(function () { // startquiz button goes to first question
  // generate question html
    // store value of index so don't generate same question twice
    // handle submit button 
    // if answer is correct have to increment score 
    // Can choose from random positive h1s to appear on answer page X
    // Have single h1 for when the question is wrong X
  
'use strict';

let correct_answers = 0; 
let questions = populateQuestions();

// html for question to be inserted in DOM 
function questionTemplate() {
  const i = questions.length - 1; 
  return `<header class="question_page_h1">
    <h1>Question ${(10 - questions.length) + 1} of 10</h1>
  </header>
  
  <section class="question_page">
    <header class="start_page_h2 question_page_h2">
      <h2>${questions[i].question}</h2>
    </header>
    <form class="questions_page question_form">
      <fieldset class="question_page question_field">
        <label class="option light">
          <input type="radio" name="answer" required>
          <span>${questions[i].option1}</span>
        </label>
        <label class="option dark">
          <input type="radio" name="answer" required>
          <span>${questions[i].option2}</span>
        </label>
        <label class="option light">
          <input type="radio" name="answer" required>
          <span>${questions[i].option3}</span>
        </label>
        <label class="option dark">
          <input type="radio" name="answer" required>
          <span>${questions[i].option4}</span>
        </label>
      </fieldset>
      <div class="button_container">
        <button type="submit" class="question_page_button">Submit Answer</button>
      </div>
    </form>
  </section>`;
}

// html for answer page to be inserted in DOM 
function answerTemplate(result) {
  const i = questions.length -1; 

  return `<header class="answer_page_h1">
    <h1>${correct_answers} of 10 correct</h1>
  </header>

  <section class="answer_page">
    <header class="answer_page_h2">
      <h2>${result}</h2>
    </header>
    <fieldset class="answer_field question_form">
      <div class="answer">
        <input type="radio" name="answer" checked>
        <span>${questions[i].answer}</span>
      </div>
    </fieldset>
    <a href=${questions[i].link} class="image"> 
      <img src="${questions[i].image}" alt="book cover">
    </a>
    <div class="button_container">
      <button type="button" class="next_button">Next</button>
      <p class="score"></p>
    </div>
  </section>`;
}

// html for results page to be inserted in DOM 
function resultsTemplate() {
  return `<header class="results_page_h1">
    <h1>${correct_answers} of 10 Correct!</h1>
  </header>
  
  <section class="final_page">
    <header class="final_page_h2">
      <h2>See your level below</h2>
    </header>
    <table>
      <tr class="light"><td class="col_1 col_1_header">Score</td>
      <tr class="dark"><td class="col_1">10</td><td class="col_2">Literary Master!</td></tr>
      <tr class="light"><td class="col_1">8-9</td><td class="col_2">You know literature!</td></tr>
      <tr class="dark"><td class="col_1">6-7</td><td class="col_2">The Library is your favorite hangout</td></tr>
      <tr class="light"><td class="col_1">0-5</td><td class="col_2">Keep up the reading, there is a lot of literature to still explore</td></tr>
    </table>
    <div class="button_container">
      <button type="button" class="restart_button">Try Again</button>
    </div>
  </section>`;
  } 
  // <fieldset class="levels">
  //   <div class="grade light">
  //     <div class="score_range">10 of 10</div>
  //     <span>Literary Master!</span>
  //   </div>
  //   <div class="grade dark">
  //     <div class="score_range">8-9 of 10</div>
  //     <span>You know literature!</span>
  //   </div>
  //   <div class="grade light">
  //     <div class="score_range">6-7 of 10</div>
  //     <span>The library is your favorite hangout</span>
  //   </div>
  //   <div class="grade dark">
  //     <div class="score_range">0-5 of 10</div>
  //     <span>Keep up the reading, there is a lot of literature to still explore</span>
  //   </div>
  // </fieldset>
// render questions in DOM 
function renderQuestionPage() {
  $('.question_answer_form').html(questionTemplate());
}

// render answer in DOM
function renderAnswerPage(result) {
  $('.question_answer_form').html(answerTemplate(result));
}

// render results at end of test to DOM 
function renderResultsPage() {
  $('.question_answer_form').html(resultsTemplate());
}

// input text when wrong answer selected
function wrongAnswer() {
  return "The correct answer is ...";
}

// input text when correct answer selected
function correctAnswer() {
  const answers = [
    'Excellent!', 
    'Perfect!', 
    'Right On!', 
    'Good Job!', 
    'You got it!',
    'Spot on!',
  ]; 
  let idx = Math.floor(Math.random() * 6);
  return answers[idx];
}

// on start button 'click' call takeQuiz  
function handleStartButton() {
  $('main').on('click', '.start_button', event => {
    $('.start_test').remove();
    renderQuestionPage();
  });
}

// on submit, check if question is correct and pass as argument to answerTemplate
function handleSubmitButton() {
  $('body').on('submit', 'form', function (event) {
    event.preventDefault();
    const selected = $('input:checked').siblings('span');
    const answer = selected.text(); 
    const result = checkAnswer(answer);
    renderAnswerPage(result);
  });
}

// Calls render next question or results page 
function handleNextButton() {
  $('body').on('click', '.next_button', event => {
    if (testFinished()) {
      renderResultsPage();
    } else {
      removeQuestion();
      renderQuestionPage();
    }
  });
}

// restarts the quiz and resets variables 
function handleRestartButton() {
  $('body').on('click', '.restart_button', event => {
    correct_answers = 0;
    questions = populateQuestions();
    renderQuestionPage();
  });
}

// returns output of either correct or wrong answer functions
function checkAnswer(ans) {
  const i = questions.length - 1;
  if (ans === questions[i].answer) {
    increaseScore();
    return correctAnswer();
  } else {
    return wrongAnswer();
  }
}

// Return booleans as to whether test is finished 
function testFinished() {
  return questions.length < 1;
  // return 10 === 10; //just for testing results page, then remove  
}

// removes last object in array `questions` 
function removeQuestion() {
  questions.pop();
}

// raise score by 1
function increaseScore() {
  correct_answers++;
}

// function highlightCheckedLabel() {
//   $("input[type=radio]").change(function() {
//     $("input[type=radio]").parent().removeClass('selected');
//     $("input[type=radio]:checked").parent().addClass('selected');
//     console.log("I am in the function :)");
//   });
// }

// calls to setup and play game
function takeQuiz() {
  handleStartButton();
  handleSubmitButton();
  handleNextButton();
  handleRestartButton();
}

$(takeQuiz);

// ---------------------

// creates array of objects and calls shuffle on them
function populateQuestions() {
  const Q_A = shuffleQuestions([
    {
      question: 'Which of the following books was written by Alexander Dumas ',
      option1: 'The Fairy Queen',
      option2: 'Paradise Lost',
      option3: 'The Count of Monte Cristo',
      option4: 'All of the above',
      answer: 'The Count of Monte Cristo',
      image: 'images/Countofmonte.jpg',
      link: 'https://www.amazon.com/Count-Monte-Cristo-Penguin-Classics/dp/0140449264/ref=sr_1_2?crid=KDUYMJRUKQ21&keywords=count+of+monte+cristo+book&qid=1559871329&s=gateway&sprefix=count+of+%2Caps%2C130&sr=8-2'
    },
    {
      question: 'Who wrote the famous Spanish novel Don Quixote?',
      option1: 'Jon Milton',
      option2: 'Gabriel Márquez',
      option3: 'Miguel de Cervantes',
      option4: 'None of the above',
      answer: 'Miguel de Cervantes',
      image: 'images/Don-Quijote-book.jpg',
      link: 'https://www.amazon.com/Quixote-Penguin-Classics-Cervantes-Saavedra/dp/0142437239/ref=sr_1_3?crid=SY6C44NXR5F1&keywords=don+quixote&qid=1559871297&s=gateway&sprefix=don+qui%2Caps%2C129&sr=8-3'
    },
    {
      question: 'In the book Twenty Years After, which well known characters have major roles in the plot?',
      option1: 'The three Musketeers',
      option2: 'The Hardy Boys',
      option3: 'Sherlock Holmes and Watson',
      option4: 'Don Quixote and Sancho Panza',
      answer: 'The three Musketeers',
      image: 'images/Twent_years_after.jpg',
      link: 'https://www.amazon.com/Twenty-Years-Oxford-Worlds-Classics/dp/0199537267/ref=sr_1_1?keywords=Twenty+Years+after&qid=1559871243&s=gateway&sr=8-1'
    },
    {
      question: 'Which European general is the antagonist in the book War and Peace?',
      option1: 'Roman general Scipio Africanus',
      option2: 'Frederick the Great',
      option3: 'Hannibal',
      option4: 'Napoléon Bonaparte',
      answer: 'Napoléon Bonaparte',
      image: 'images/war_and_peace.jpg',
      link: 'https://www.amazon.com/War-Peace-Vintage-Classics-Tolstoy/dp/1400079985/ref=sr_1_1_sspa?keywords=war+and+peace&qid=1559871209&s=gateway&sr=8-1-spons&psc=1'
    },
    {
      question: 'Which of the following took place in the The Brothers Karamazov?',
      option1: 'All three brothers die in the end.',
      option2: 'One brother commits suicide and one other is hung.',
      option3: 'One brother marries and then leaves his spouse to join a monastery',
      option4: 'None of the above',
      answer: 'None of the above',
      image: 'images/the-brothers-karamazov.jpg',
      link: 'https://www.amazon.com/Brothers-Karamazov-Novel-Parts-Epilogue/dp/0140449248/ref=sr_1_3?crid=2UR2WVFRHB75S&keywords=brothers+karamazov&qid=1559871168&s=gateway&sprefix=brothers+kara%2Caps%2C123&sr=8-3'
    },
    {
      question: 'Who wrote East of Eden?',
      option1: 'Ernest Hemingway',
      option2: 'F. Scott Fitzgerald',
      option3: 'John Steinbeck',
      option4: 'Mark Twain',
      answer: 'John Steinbeck',
      image: 'images/east_of_eden.jpeg',
      link: 'https://www.amazon.com/East-Penguin-Twentieth-Century-Classics/dp/0140186395/ref=sr_1_1?keywords=East+of+Eden&qid=1559871125&s=gateway&sr=8-1'
    },
    {
      question: "In which of the following books did a supporting character have the nickname 'tea cake'?",
      option1: 'The Pearl',
      option2: 'The Adventures of Tom Sawyer',
      option3: '1984',
      option4: 'Their Eyes Were Watching God',
      answer: 'Their Eyes Were Watching God',
      image: 'images/eyes_watching_god.jpg',
      link: 'https://www.amazon.com/Their-Eyes-Were-Watching-God/dp/0061120065/ref=sr_1_1?crid=238592YHWKIF7&keywords=their+eyes+were+watching+god+zora+neale+hurston&qid=1559871098&s=gateway&sprefix=Their+eye%2Caps%2C125&sr=8-1'
    },
    {
      question: "John Milton's Paradise Regained is a dramatic retelling of which Bible story?",
      option1: 'The exodus',
      option2: "Jesus' temptation in the wilderness",
      option3: "Israel's exile to Babylon",
      option4: 'Adam and Eve in the Garden of Eden',
      answer: "Jesus' temptation in the wilderness",
      image: 'images/paradise-regained.jpg',
      link: 'https://www.amazon.com/Paradise-Regained-John-Milton/dp/1978337027/ref=sr_1_2?keywords=paradise+regained&qid=1559871061&s=gateway&sr=8-2'
    },
    {
      question: 'The book Animal Farm is ____.',
      option1: 'historical fiction on the agricultural industry in the 1950s',
      option2: 'an allegory for family conflict that was occuring in the turbulent decade of the 1960s',
      option3: 'a political allegory',
      option4: 'about child labor in the agricultural industry',
      answer: 'a political allegory',
      image: 'images/animal_farm.jpg',
      link: 'https://www.amazon.com/Animal-Farm-George-Orwell/dp/0451526341/ref=sr_1_2?keywords=animal+farm&qid=1559871021&s=gateway&sr=8-2'
    },
    {
      question: 'The Illiad tells a story that takes place a little over a ____.',
      option1: 'day',
      option2: 'week',
      option3: 'month',
      option4: 'year',
      answer: 'month',
      image: 'images/illiad.jpg',
      link: 'https://www.amazon.com/Iliad-Homer/dp/0140275363/ref=sr_1_2?keywords=the+illiad&qid=1559870981&s=gateway&sr=8-2'
    }]);
  return Q_A;
}

// returns shuffled array of objects
function shuffleQuestions(Q_A) {
  let i = Q_A.length;
  while (i) {
    let idx = Math.floor(Math.random() * i--);
    let new_idx = Q_A[i];
    Q_A[i] = Q_A[idx];
    Q_A[idx] = new_idx;
  }
  return Q_A;
}
});

