$(document).ready(function () { // startquiz button goes to first question
  // generate question html
    // store value of index so don't generate same question twice
    // handle submit button 
    // if answer is correct have to increment score 
    // Can choose from random positive h1s to appear on answer page X
    // Have single h1 for when the question is wrong X
  
'use strict';

let question_num = 1;
let correct_answers = 0; 
const questions = populateQuestions();

function questionTemplate() {
  const i = questions.length - 1; 
  return `<header class="question_header">
    <h1>Question ${question_num} of 10</h1>
  </header>
  
  <section class="question_page">
    <header>
      <h2>${questions[i].question}</h2>
    </header>
    <form class="question_form">
      <fieldset class="question_field">
        <label>
          <input type="radio" name="answer" required>
          <span>${questions[i].option1}</span>
        </label>
        <label>
          <input type="radio" name="answer" required>
          <span>${questions[i].option2}</span>
        </label>
        <label>
          <input type="radio" name="answer" required>
          <span>${questions[i].option3}</span>
        </label>
        <label>
          <input type="radio" name="answer" required>
          <span>${questions[i].option4}</span>
        </label>
      </fieldset>
      <div class="button_container">
        <button type="button" class="question_page_button">Submit Answer</button>
      </div>
    </form>
  </section>`;
}

function answerTemplate() {
  const i = questions.length -1; 

}

// render questions in DOM 
function renderQuestion() {
  $('.question_answer_form').html(questionTemplate());
}

// input text when wrong answer selected
function wrongAnswer() {
  return "The correct answer is ...";
}

// input text when correct answer selected
function correctAnswer() {
  const answers = ['Excellent!', 'Perfect!', 'Right On!', 'Good Job!']; 
  let idx = Math.floor(Math.random() * 4);
  return answers[idx];
}

// raise score by 1
// function increaseScore() {
//   return correct_answers += 1; 
// }

// on start button 'click' call takeQuiz  
function handleStartButton() {
  $('.start_button').on('click', event => {
    $('main').remove(); 
    renderQuestion();
  });
}

function handleSubmitButton() {
  $('.question_page_button').on('click', event => {
    answerTemplate();
  });
}

// function calls to setup and play game
function takeQuiz() {
  // const questions = populateQuestions();
  // const tally = {
  //   question_num: 1,
  //   correct_answers: 0
  // };
  handleStartButton();
  handleSubmitButton();
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
    },
    {
      question: 'Who wrote the famous Spanish novel Don Quixote?',
      option1: 'Jon Milton',
      option2: 'Gabriel Márquez',
      option3: 'Miguel de Cervantes',
      option4: 'None of the above',
      answer: 'Miguel de Cervantes',
      image: 'images/Don-Quijote-book.jpg'
    },
    {
      question: 'In the book Twenty Years After, which well known characters have major roles in the plot?',
      option1: 'The three Musketeers',
      option2: 'The Hardy Boys',
      option3: 'Sherlock Holmes and Watson',
      option4: 'Don Quixote and Sancho Panza',
      answer: 'The three Musketeers',
      image: 'images/Twent_years_after.jpg'
    },
    {
      question: 'Which European general is the antagonist in the book War and Peace?',
      option1: 'Roman general Scipio Africanus',
      option2: 'Frederick the Great',
      option3: 'Hannibal',
      option4: 'Napoléon Bonaparte',
      answer: 'Napoléon Bonaparte',
      image: 'images/war_and_peace.jpg'
    },
    {
      question: 'In the book, The Brothers Karamazov, which of the following is true?',
      option1: 'All three brothers die in the end.',
      option2: 'One brother commits suicide and one other is hung.',
      option3: 'One brother marries and then leaves his spouse to join a monastery',
      option4: 'None of the above',
      answer: 'None of the above',
      image: 'images/the-brothers-karamazon.jpg'
    },
    {
      question: 'Who wrote East of Eden?',
      option1: 'Ernest Hemingway',
      option2: 'F. Scott Fitzgerald',
      option3: 'John Steinbeck',
      option4: 'Mark Twain',
      answer: 'John Steinbeck',
      image: 'images/east_of_eden.jpeg'
    },
    {
      question: "In which of the following books did a supporting character have the nickname 'tea cake'?",
      option1: 'The Pearl',
      option2: 'The Adventures of Tom Sawyer',
      option3: '1984',
      option4: 'Their Eyes Were Watching God',
      answer: 'Their Eyes Were Watching God',
      image: 'images/eyes_watching_god.jpg',
    },
    {
      question: "John Milton's Paradise Regained is a dramatic retelling of which Bible story?",
      option1: 'The exodus',
      option2: "Jesus' temptation in the wilderness",
      option3: "Israel's exile to Babylon",
      option4: 'Adam and Eve in the Garden of Eden',
      answer: "Jesus' temptation in the wilderness",
      image: 'images/paradise-regained.jpg'
    },
    {
      question: 'The book Animal Farm is ____.',
      option1: 'historical fiction on the agricultural industry in the 1950s',
      option2: 'an allegory for family conflict that was occuring in the turbulent decade of the 1960s',
      option3: 'a political allegory',
      option4: 'about child labor in the agricultural industry',
      answer: 'a political allegory',
      image: 'images/animal_farm.jpg'
    },
    {
      question: 'The Illiad tells a story that takes place a little over a ____.',
      option1: 'day',
      option2: 'week',
      option3: 'month',
      option4: 'year',
      answer: 'month',
      image: 'images/illiad.jpg'
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