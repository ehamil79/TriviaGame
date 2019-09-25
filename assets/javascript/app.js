// Defined Variables
$(document).ready(function () {
    var count = 0;
    var time = 31;
    var isSelected = false;
    var ticker;
    var correct = 0;
    var incorrect = 0;
    var unanswered = 0;

    // questions and answer array
    var question = ["What Happens If The Ghostbusters Cross Their Streams?", "Before Die Hard, What Was Actor Bruce Willis Primarily Known For?", "With What Machine Does Sarah Connor Destroy The Terminator At The End Of The Movie?", "What Are The Three Primary Directives Of Robocop?", "In Predator, Why Does The Alien Not Attack Unarmed “Prey?”", "What Is The Name Of The Sumerian God Of Destruction That Causes The Ghostbusters So Much Trouble?", "In Aliens, Who Is The Sole Survivor Of The Terraforming Colony Hadley’s Hope?"];

    var answer = ["It Reverses The Particle Flow", "Comedic Television Roles", "Hydraulic Press", "Serve the public trust, Protect the innocent, and Uphold the law", "There’s No Sport In Attacking Unarmed Prey", "Gozer The Gozerian", "Newt"];

    var firstChoice = ["They Turn Into Ghosts", "They Blow Up", "It Reverses The Particle Flow", "The Ghost Are Tripled In Number"];
    var secondChoice = ["Sci-Fi Televison Roles", "Tough Guy Roles", "Comedic Television Roles", "Chrildren's Television"];
    var thirdChoice = ["Botnet", "Skynet", "Robocorp", "The Warweb"];
    var fourthChoice = ["Always Arrest, Never Harm, And Report To Superiors", "Never Kill A Human, Always Protect Humans, And Sacrifice Yourself For Humans", "Trust, Love, and Discipline", "Serve the public trust, Protect the innocent, and Uphold the law"];

    // show & hide functions
    function showHolders() {
        $("#question-holder").show();
        $("#choice-holder-1").show();
        $("#choice-holder-2").show();
        $("#choice-holder-3").show();
        $("#choice-holder-4").show();
    }

    function hideHolders() {
        $("#question-holder").hide();
        $("#choice-holder-1").hide();
        $("#choice-holder-2").hide();
        $("#choice-holder-3").hide();
        $("#choice-holder-4").hide();
    }

    function hideResults() {
        $("#correct-holder").hide();
        $("#incorrect-holder").hide();
        $("#unanswered-holder").hide();
        $("#restart-holder").hide();
    }

    function displayQuestion() {
        hideResults();
        $("#answer-holder").hide();
        $("#image-holder").hide();
        $("#time-holder").show();
        showHolders();
        $("#question-holder").html(question[count]);
        $("#choice-holder-1").html(firstChoice[count]);
        $("#choice-holder-2").html(secondChoice[count]);
        $("#choice-holder-3").html(thirdChoice[count]);
        $("#choice-holder-4").html(fourthChoice[count]);

        // hover CSS
        $("#choice-holder-1").hover(function () {
            $(this).css("color", "grey");
        },
            function () {
                $(this).css("color", "black");
            });
        $("#choice-holder-2").hover(function () {
            $(this).css("color", "grey");
        },
            function () {
                $(this).css("color", "black");
            });
        $("#choice-holder-3").hover(function () {
            $(this).css("color", "grey");
        },
            function () {
                $(this).css("color", "black");
            });
        $("#choice-holder-4").hover(function () {
            $(this).css("color", "grey");
        },
            function () {
                $(this).css("color", "black");
            });
    }

    $("#choice-holder-1").on("click", checkAnswer)
    $("#choice-holder-2").on("click", checkAnswer)
    $("#choice-holder-3").on("click", checkAnswer)
    $("#choice-holder-4").on("click", checkAnswer)

    // check answer function
    function checkAnswer() {
        hideHolders();

        if ($(this).text() === answer[count]) {
            stopTime();//does not link stopTime
            isSelected = true;
            $("#answer-holder").show();
            $("#answer-holder").html("Cool!! You know your 80's!!!" + answer[count]);
            displayImage();
            correct++;
            count++;
        }

        checkGameEnd();
    }

    // check end game function
    function checkGameEnd() {
        if (count === question.length) {
            $("#time-holder").hide();
            showResults();
            count = 0;
            $(".start").show();
            $(".start").on("click", function () {
                resetResults();
                startGame();
            });
        }
    }

    function resetTime() {
        time = 31;
    }

    function displayTime() {
        time--;
        $("#time-holder").html("Time remaining: " + time);

        if (time <= 0) {
            hideHolders();
            stopTime();
            $("#answer-holder").show();
            $("#answer-holder").html("Your out of time!! The answer your looking for is: " + answer[count]);
            displayImage();
            unanswered++;
            count++;
            checkGameEnd();
        }
    }

    function startTime() {
        clearInterval(ticker);
        ticker = setInterval(displayTime, 1000);
    }
    function stopTime() {
        clearInterval(ticker);
        resetTime();

        if (count < question.length - 1) {
            setTimeout(startTime, 2000);
            setTimeout(displayQuestion, 3000);
        }
    }

    resetTime();

    function displayImage() {
        if (count === 0) {
            $("#image-holder").show();
            $("#image-holder").html('<img src="">');
        }
        else if (count === 1) {
            $("#image-holder").show();
            $("#image-holser").html('<img src="">');
        }
        else if (count === 2) {
            $("#image-holder").show();
            $("#image-holser").html('<img src="">');
        }
        else if (count === 3) {
            $("#image-holder").show();
            $("#image-holser").html('<img src="">');
        }
        else if (count === 4) {
            $("#image-holder").show();
            $("#image-holser").html('<img src="">');
        }
        else if (count === 5) {
            $("#image-holder").show();
            $("#image-holser").html('<img src="">');
        }
        else if (count === 6) {
            $("#image-holder").show();
            $("#image-holser").html('<img src="">');
        }
        else if (count === 7) {
            $("#image-holder").show();
            $("#image-holser").html('<img src="">');
        }
    }

    // show results function
    function showResults() {
        $("#correct-holder").show();
        $("#correct-holder").html("Correct: " + correct);
        $("#incorrect-holder").show();
        $("#incorrect-holder").html("Incorrect " + incorrect);
        $("#unanswered-holder").show();
        $("#unanswered-holder").html("Unanswered: " + unanswered);
        $("#restart-holder").show();
        $("#restart-holder").html("Care to try again? Click Start!!");

    }

    // reset results function
    function resetResults() {
        correct = 0;
        incorrect = 0;
        unanswered = 0;
    }

    // start game function
    function startGame() {
        $(".start").hide();
        startTime();
        displayQuestion();
    }

    // start game on click
    $(".start").on("click", function () {
        startGame();
    });


});