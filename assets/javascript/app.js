// Initial values
let counter = 30;
let currentQuestion = 0;
let score = 0;
let lost = 0;
let timer;

// if the timer is over then go to the next question
function nextQuestion() {
    const isQuestionOver = (quizQuestions.length - 1) === currentQuestion;
    if (isQuestionOver) {

        console.log('Game is over!!!')
        displayResult();
    } else {
        currentQuestion++;
        loadQuestion();
    }
}

// Start a 30 second timer

function timeUp() {
    clearInterval(timer);

    lost++;

    preloadImage('lost');
    setTimeout(nextQuestion, 3 * 1000);
}

function countDown() {
    counter--;

    $("#time").html('Timer: ' + counter);
    if (counter === 0) {
        timeUp();
    }
}

// Display the question and the choices to the browser

function loadQuestion() {
    counter = 30;
    timer = setInterval(countDown, 1000);

    const question = quizQuestions[currentQuestion].question;
    const choices = quizQuestions[currentQuestion].choices;

    $('#timer').html('Time:' + counter);
    $('#game').html(`
        <h4>${question}</h4>
        ${loadChoices(choices)}
        ${loadRemainingQuestion()}
    `);
}

function loadChoices(choices) {
    let result = '';

    for (let i = 0; i < choices.length; i++) {
        result += `<p class="choice" data-answer="${choices[i]}">${choices[i]}</p>`;
    }

    return result;
}

// Either correct/wrong choice selected, go to the next question

$(document).on('click', '.choice', function () {
    clearInterval(timer);
    const selectedAnswer = $(this).attr('data-answer');
    const correctAnswer = quizQuestions[currentQuestion].correctAnswer;

    if (correctAnswer === selectedAnswer) {
        score++;
        console.log('wins!!!!!!!!!');
        preloadImage('win');
        setTimeout(nextQuestion, 3 * 1000);
    } else {
        lost++;
        console.log('lost!!!!!!!!');
        preloadImage('lost');
        setTimeout(nextQuestion, 3 * 1000);
    }

    console.log('!!!!!!!!!!!!!!!!!!!!!!!!!!', selectedAnswer);

});

function displayResult() {
    const result = `
        <p>You got ${score} questions(s) right</p>
        <p>You missed ${lost} questions(s)</p>
        <p>Total questions ${quizQuestions.length}</p>
        <button class="btn btn-primary" id="reset">Reset Game</button>
    `;

    $('#game').html(result);
}


$(document).on('click', '#reset', function() {
    counter = 30;
    currentQuestion = 0;
    score = 0;
    lost = 0;
    timer = null;

    loadQuestion();
});

function loadRemainingQuestion() {
    const remainingQuestion = quizQuestions.length - (currentQuestion + 1);
    const totalQuestion = quizQuestions.length;

    return `Remaining Question: ${remainingQuestion}/${totalQuestion}`;

}

function randomImage(images) {
    const random = Math.floor(Math.random() * images.length);
    const randomImage = images[random];
    return randomImage;


}


// display a giphy for correct and wrong answers
function preloadImage(status) {
    const correctAnswer = quizQuestions[currentQuestion].correctAnswer;

    if (status === 'win') {
        $('#game').html(`
            <p class="preload-image">Congratulations, you picked the right answer</p>
            <p class="preload-image">The right answer is <b>${correctAnswer}</b></p>
            <img src="${randomImage(funImages)}"/>
        `);
    } else {
        $('#game').html(`
            <p class="preload-image">The correct answer was <b>${correctAnswer}</b></p>
            <p class="preload-image">You lost</p>
            <img src="${randomImage(sadImages)}"/>
        `);
    }
}

$('#start').click(function () {
    $('#start').remove();
    $('#time').html(counter);
    loadQuestion();
});

