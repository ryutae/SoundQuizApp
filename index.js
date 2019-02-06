let questionNum = 0;
let score = 0;
//generate HTML for the form
function generateQuestionAnswers() {
  console.log('executing generateQuestionAnswers');
  console.log(STORE);
  $('.quiz-form').html('');
  $('.quiz-form').append(`<h1>${STORE[questionNum].question}</h1>`);
  $('.quiz-form').append(`<div class="form-container"><form>`);
  for (let i=0; i<STORE[questionNum].answers.length; i++) {
    $('.quiz-form').append(`<input type="radio" name="answer" value="${i}">${STORE[questionNum].answers[i]}<br>`)

  };
  $('.quiz-form').append(`<button type="submit" class="next">Submit</button></form></div>`);
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
  $('body').on('click', '.next', function() {
    console.log('starting submitAnswer');
    //check if last question

    //if last question show end screen

    //if not last question, show next question
    //get selectedAnswer
    const checkedAnswer = $("input[name='answer']:checked").val();
    //check if answer is right, if so, add to score

    //increment questionNum
    questionNum++;
    //render new question
    generateQuestionAnswers();
    //update scoreboard
    updateScoreboard();
  })

}





//Correct answer
function correctAnswer() {
  score++;
  updateScoreboard();


}



//Wrong answer
function wrongAnswer() {
  console.log('executing wrongAnswer');

}




//Feedback response


//update scoreboard
function updateScoreboard() {
  console.log('executing updateScoreboard');
$('.scoreboard').html('');
$('.scoreboard').append(`<h3>Question:${questionNum+1}   Score: ${score}</h3>`)
}

//function that kicks off the different functions
function handleSubmitAnswer() {

}


function nextQuestion() {
  questionNum++;
}

//callback function
$(startQuiz);
$(submitAnswer);
