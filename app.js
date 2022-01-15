$(document).ready(function() {
//global variables
    var currentQuestion;
    var timeLeft = 10;
    var interval;
    var score = 0;

    var updateScore = function (amount) {
        score += amount;
        $('#score').text(score);
    };

//start game
    var startGame = function () {
        if(!interval) {
            if (timeLeft === 0) {
                updateTimeLeft(10);
                updateScore(-score);
            }
            interval = setInterval (function () {
                updateTimeLeft(-1);
                if (timeLeft === 0) {
                    clearInterval (interval);
                    interval = undefined;
                }
            }, 1000);
        }
    };

//random number generator
    var randomNumberGenerator = function (size) {
        return Math.ceil(Math.random() * size);
    };

//question generator
    var questionGenerator = function () {
        var question = {};
        var num1 = randomNumberGenerator(10);
        var num2 = randomNumberGenerator(10);
    
        question.answer = num1 + num2;
        question.equation = String(num1) + " + " + String(num2);
    
        return question;
    };
    
    currentQuestion = questionGenerator();
    $('#equation').text(currentQuestion.equation);

//checking and updating question
    var checkAnswer = function (userInput, answer) {
        if (userInput === answer) {
            renderNewQuestion();
            $('#user-input').val('');
            updateTimeLeft(+1);
            updateScore(+1);
        }
    };

    var renderNewQuestion = function () {
        currentQuestion = questionGenerator();
        $('#equation').text(currentQuestion.equation);
    };

    $('#user-input').on('keyup', function () {
        startGame();
        checkAnswer(Number($(this).val()), currentQuestion.answer);
    });

//Timer countdown

    var updateTimeLeft = function (amount) {
        timeLeft += amount;
        $('#time-left').text(timeLeft);
    };


    renderNewQuestion();



});
