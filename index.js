let questionNum = 0;
let score = 0;
//generate HTML for the form
function generateQuestionAnswers() {
  console.log('executing generateQuestionAnswers');
  $('.quiz-form').html('');

  let formHTML = '';
  let formAnswers = '';
  for (let i = 0; i < STORE[questionNum].answers.length; i++) {
    formAnswers += `<label class='answerOption'><input type="radio" class="input" name="answer" value="${i}" required>${STORE[questionNum].answers[i]}</label></br>`;
  };


  formHTML += `<form><fieldset><legend>${STORE[questionNum].question}</legend>`;
  formHTML += formAnswers;
  formHTML += `</fieldset><button type="button" class="submit">Submit</button></form>`;
  console.log(formHTML);
  $('.quiz-form').append(formHTML);
}

//Start quiz -- generate first question -- HTML generating the form
function startQuiz() {
  console.log('executing startQuiz');
  $('.quizButton').click(e => {
    $('.quiz-start').hide();
    generateQuestionAnswers();
    //$('.quiz-form').show();
    $('.scoreboard').append(`<h3>Question: ${questionNum+1}   Score: ${score}</h3>`)
    $('.scoreboard').show();
  })
};

//Submit answer -- check if submitted answer is correct
function submitAnswer() {
  $('body').on('click', '.submit', function() {
    console.log('starting submitAnswer');
    //get selected Answer
    const checkedAnswer = $("input[name='answer']:checked").val();
    console.log(`${checkedAnswer}`);
    //alert if answer is not selected
    if (checkedAnswer === undefined) {
      alert('Please select an answer before submitting!')
    }
    //check if answer is right, if so, increase score
    else if (checkedAnswer == STORE[questionNum].correctAnswer) {
      correctAnswer()
    } else wrongAnswer();
  })
}

function nextQuestion() {
  $('body').on('click', '.next', function() {
    //check if there are questions remaining
    if (questionNum < STORE.length - 1) {
      //increment questionNum
      questionNum++;
      //render new question
      generateQuestionAnswers();
      //update scoreboard
      updateScoreboard();
    } else {
      //last question - go to end Screen
      endScreen()
    }
  })
}

function endScreen() {
  console.log('endScreen');
  $('.scoreboard').hide();
  //result text based on final score
  let resultText = ''
  if (score == 10) {
    resultText = `<h3>Good job! You are a sound master!</h3>`
  } else if (score >= 7 && score <= 9) {
    resultText = `<h3>You did pretty good. You can do better!</h3>`
  } else if (score <= 6 && score >= 4) {
    resultText = `<h3>Not good. You still have much to learn.</h3>`
  } else {
    resultText = `<h3>Not good. You need to learn more!</h3>`
  };
  $('.quiz-form').html('');
  $('.quiz-form').append(`<h2>End of quiz</h2>`);
  $('.quiz-form').append(`<h1>You got ${score} out of 10 correct</h1>`);
  $('.quiz-form').append(`${resultText}`);
  //button to restart the quiz
  $('.quiz-form').append(`<button onclick="window.location.reload()" type="submit" class="restart">Restart</button>`)
}



//Correct answer
function correctAnswer() {
  console.log('executing correctAnswer');
  score++;
  updateScoreboard();
  $('.quiz-form').html('');
  $('.quiz-form').append(`<h3>${STORE[questionNum].question}</h3>`);
  $('.quiz-form').append(`<h1>CORRECT!</h1>`);
  $('.quiz-form').append(`<h4>${STORE[questionNum].feedback}</h4>`);
  $('.quiz-form').append(`<button type="submit" class="next">Next</button></form></div>`);
}

//Wrong answer
function wrongAnswer() {
  console.log('executing wrongAnswer');
  $('.quiz-form').html('');
  $('.quiz-form').append(`<h3>${STORE[questionNum].question}</h3>`);
  $('.quiz-form').append(`<h1>WRONG</h1>`);
  $('.quiz-form').append(`<h4>Correct answer is: ${STORE[questionNum].correctResponse}</h4>`);
  $('.quiz-form').append(`<h4>${STORE[questionNum].feedback}</h4>`);
  $('.quiz-form').append(`<button type="submit" class="next">Next</button></form></div>`);
}

//update scoreboard
function updateScoreboard() {
  console.log('executing updateScoreboard');
  $('.scoreboard').html('');
  $('.scoreboard').append(`<h3>Question: ${questionNum+1}   Score: ${score}</h3>`)
}


//callback function
$(startQuiz);
$(submitAnswer);
$(nextQuestion);
