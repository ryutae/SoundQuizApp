let questionNum = 0;
let score = 0;
//generate HTML for the form
function generateQuestionAnswers() {
  console.log('executing generateQuestionAnswers');
  console.log(STORE);
  $('.quiz-form').html('');
  $('.quiz-form').append(`<h1>${STORE[questionNum].question}</h1>`);
  $('.quiz-form').append(`<div class="form-container"><form>`);
  for (let i = 0; i < STORE[questionNum].answers.length; i++) {
    $('.quiz-form').append(`<input type="radio" name="answer" value="${i}">${STORE[questionNum].answers[i]}<br>`)

  };
  $('.quiz-form').append(`<button type="submit" class="submit">Submit</button></form></div>`);
}


//Start quiz -- generate first question -- HTML generating the form
function startQuiz() {
  console.log('executing startQuiz');
  $('.quizButton').click(e => {
    $('.quiz-start').hide();
    generateQuestionAnswers();
    //$('.quiz-form').show();
    $('.scoreboard').append(`<h3>Question:${questionNum+1}   Score: ${score}</h3>`)
    $('.scoreboard').show();
  })
};



//Select answer -- toggle the selected answer class
function selectAnswer() {
  console.log('selectAnswer');
  $(this).toggleClass('selectedAnswer');
}

//Submit answer -- check if submitted answer is correct
function submitAnswer() {
  $('body').on('click', '.submit', function() {
    console.log('starting submitAnswer');
    //get selectedAnswer
    const checkedAnswer = $("input[name='answer']:checked").val();
    console.log(`${checkedAnswer}`);
    //check if answer is right, if so, add to score
    if (checkedAnswer == STORE[questionNum].correctAnswer) {
      correctAnswer()
    } else wrongAnswer();
  })
}



function nextQuestion() {
  $('body').on('click', '.next', function() {
    //check if last question
    if (questionNum < STORE.length - 1) {
    //increment questionNum
    questionNum++;
    //render new question
    generateQuestionAnswers();
    //update scoreboard
    updateScoreboard();
  }
  else {
    //last question
    endScreen()
  }
  })
}

function endScreen() {
  console.log('endScreen');
  let resultText = ''
  if (score == 10) {let resultText =`<h3>Good job! You were paying attention!</h3>`}
else if (score >= 7 && score <= 9) {resultText =`<h3>You did okay. You can do better!</h3>`}
else if (score <= 6 && score >= 4) {resultText =`<h3>Not good. Pay more attention to the instructor</h3>`}
else {resultText =`<h3>Terrible score. Why are you even here?</h3>`};
  $('.quiz-form').html('');
  $('.quiz-form').append(`<h2>End of quiz</h2>`);
  $('.quiz-form').append(`<h1>You got ${score} out of 10 correct</h1>`);
  $('.quiz-form').append(`${resultText}`);


}





//Correct answer
function correctAnswer() {
  console.log('executing correctAnswer');
  score++;
  updateScoreboard();
  $('.quiz-form').html('');
  $('.quiz-form').append(`<h1>${STORE[questionNum].question}</h1>`);
  $('.quiz-form').append(`<h3>CORRECT!</h3>`);
  $('.quiz-form').append(`<h4>${STORE[questionNum].feedback}</h4>`);
  $('.quiz-form').append(`<button type="submit" class="next">Next</button></form></div>`);
}





//Wrong answer
function wrongAnswer() {
  console.log('executing wrongAnswer');
  $('.quiz-form').html('');
  $('.quiz-form').append(`<h1>${STORE[questionNum].question}</h1>`);
  $('.quiz-form').append(`<h3>WRONG! WHY AREN'T YOU PAYING ATTENTION???</h3>`);
  $('.quiz-form').append(`<h4>Correct answer is: ${STORE[questionNum].correctResponse}</h4>`);

  $('.quiz-form').append(`<h4>${STORE[questionNum].feedback}</h4>`);
  $('.quiz-form').append(`<button type="submit" class="next">Next</button></form></div>`);
}




//Feedback response


//update scoreboard
function updateScoreboard() {
  console.log('executing updateScoreboard');
  $('.scoreboard').html('');
  $('.scoreboard').append(`<h3>Question:${questionNum+1}   Score: ${score}</h3>`)
}


//callback function
$(startQuiz);
$(submitAnswer);
$(nextQuestion);
