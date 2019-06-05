// startquiz button goes to first question
  // generate question html
    // store value of index so don't generate same question twice
    // handle submit button 
    // if answer is correct have to increment score 
    // Can choose from random positive h1s to appear on answer page
    // Have single h1 for when the question is wrong
  
'use strict';

let question_num = 0;
let asked_questions = [];
let correct_answers = 0; 

function chooseQuestion() {
  let idx = Math.floor(Math.random() * 10);
  if (asked_questions.includes(idx)) {
    chooseQuestion();
  } else {
    asked_questions.push(idx);
    return idx; 
  }
}