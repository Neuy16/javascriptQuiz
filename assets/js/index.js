let time = 60;
let timerEl = document.getElementById("time");
const questions = [
    {
        question: "What is an array?",
        options: ["Holds text", "A number", "Answers yes or no questions", "Holds multiple values"],
        answer: "Holds multiple values"
    },

    {
        question: "What is an object?",
        options: ["The displayed HTML page", "A collection of propeties and values", "Used to change content in the HTML", "It's whatever you want it to be"],
        answer: "A collection of properties and values"
    },

    {
        question: "If you wanted to loop through the array (let apple = ['fruit', 'food', 'red', 'sweet']). Starting with 'fruit', what is the correct syntax?",
        options: ["for (let i = 0; i < fruit.length; i++) {}", "for (let i = 0; i < apple.length; i++) {}", "for (let i = 0; i < fruit.length; i--) {}", "for (let i != 0; i < apple.length; i++) {}"],
        answer: "for (let i = 0; i < apple.length; i++) {}"
    },

    {
        question: "What is the role of the DOM?",
        options: ["It represents the document as objects", "It acts as the pages domain or URL", "It is an HTML document", "It stores information like variables functions"],
        answer: "It represents the document as objects"
    },

    {
        question: "What is a method?",
        options: ["A function in an object", "A type of loop", "An attribute built in to javascript", "A type of variable"],
        answer: "A function in an object"
    },

    {
        question: "What is the syntax to prevent a default action from happening?",
        options: ["default.preventEvent()", "prevent.defaultEvent()", "preventDefault{}", "preventDefault()"],
        answer: "preventDefault()"
    },

    {
        question: "What is the purpose of an event listener?",
        options: ["To listen to a click", "To listen for a specified action", "To listen for a button press", "Waits for audio to play to perform an action"],
        answer: "To listen for a specified action"
    },
];

let answer = "";
let score = 0;
let questionIndex = 0;
let initials = "";
let timerInterval = 0;
let viewHighscores = document.getElementById('highscore');
let clearHighscores = document.getElementById('clear');
let start = document.createElement("button");



document.body.appendChild(start);
start.innerHTML = "Start Quiz";
clearHighscores.addEventListener('click', clear);
start.addEventListener('click', quiz);
viewHighscores.addEventListener('click', highscores);
function quiz() {
    for (let i = 0; i < 4; i++) {
        window['optionButtons' + i] = document.createElement("button");
        document.body.children[1].children[1].children[i].appendChild(window['optionButtons' + i]);
        window['optionButtons' + i].addEventListener('click', function () { checkAnswer(i) });
    }

    generateQuestion(questionIndex);
    setTime();
};


function setTime() {
    timerInterval = setInterval(function () {
        time--;
        timerEl.textContent = time;

        if (time <= 0) {
            clearInterval(timerInterval);
            time = 0;
            initials = window.prompt("YOU'VE RUN OUT OF TIME!\n Score: " + score + "\n What are you initials?");
            localStorage.setItem(initials, score);
        }

    }, 1000);
};

function generateQuestion(index) {
    if (index < questions.length) {
        document.getElementById("question").innerHTML = questions[index].question;
        answer = questions[index].answer;
        for (const y in questions[index].options) {
            window['optionButtons' + y].innerHTML = (questions[index].options[y]);
        }
    } else {
        initials = window.prompt("YOU'VE COMPLETED THE QUIZ!! \n Score: " + score + "\n What are your initials?");
        localStorage.setItem(initials, score);
        clearInterval(timerInterval);
    }
}

function checkAnswer(i) {
    if (window['optionButtons' + i].innerHTML !== answer) {
        time = time - 5;
    } else {
        score += 10;
    }
    questionIndex += 1;
    generateQuestion(questionIndex);
}

function highscores() {
    let initialScores = [];
    let localStorageSize = localStorage.length;
    let keys = Object.keys(localStorage);
    while (localStorageSize--) {
        initialScores.push(localStorage.getItem(keys[localStorageSize]));
    }
}

function clear() {
    localStorage.clear();
}




// TODO make function to switch questions on event listener






//     ```
// GIVEN I am taking a code quiz

// WHEN I click the start button
// THEN a timer starts and I am presented with a question

// WHEN I answer a question
// THEN I am presented with another question

// WHEN I answer a question incorrectly
// THEN time is subtracted from the clock

// WHEN all questions are answered or the timer reaches 0
// THEN the game is over

// WHEN the game is over
// THEN I can save my initials and my score

// ```