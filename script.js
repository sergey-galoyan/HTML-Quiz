let arr=[
    {
        id: 1,
        name: 'What does HTML stand for?',
        a: 'Hyper Text Preprocessor',
        b: 'Hyper Text Markup Language',
        c: 'Hyper Text Multiple Language',
        d: 'Hyper Tool Multi Language',
        ans: 'b'
    },{
        id: 2,
        name: 'Which type of JavaScript language is ___',
        a: 'Object-Oriented',
        b: 'Object-Based',
        c: 'Assembly-language',
        d: 'High-level',
        ans: 'b'
    },{
        id: 3,
        name: 'In JavaScript, what is a block of statement?',
        a: 'Conditional block',
        b: 'block that combines a number of statements into a single compound statement',
        c: 'both conditional block and a single statement',
        d: 'block that contains a single statement',
        ans: 'b'
    },{
        id: 4,
        name: 'When interpreter encounters an empty statements, what it will do:',
        a: 'Shows a warning',
        b: 'Prompts to complete the statement',
        c: 'Throws an error',
        d: 'Ignores the statements',
        ans: 'd'
    },{
        id: 5,
        name: 'The "function" and " var" are known as:',
        a: 'Keywords',
        b: 'Data types',
        c: 'Declaration statements',
        d: 'Prototypes',
        ans: 'c'
    },{
        id: 6,
        name: 'Which of the following variables takes precedence over the others if the names are the same?',
        a: 'Global variable',
        b: 'The local element',
        c: 'Both of the above',
        d: 'None of the above',
        ans: 'b'
    },{
        id: 7,
        name: 'Which one of the following is the correct way for calling the JavaScript code?',
        a: 'Preprocessor',
        b: 'Triggering Event',
        c: 'RMI',
        d: 'Function/Method',
        ans: 'd'
    },{
        id: 8,
        name: 'Which of the following type of a variable is volatile?',
        a: 'Mutable variable',
        b: 'Dynamic variable',
        c: 'Volatile variable',
        d: 'Immutable variable',
        ans: 'a'
    },{
        id: 9,
        name: 'In JavaScript the x===y statement implies that:',
        a: 'Both x and y are equal in value, type and reference address as well.',
        b: 'Both are x and y are equal in value only.',
        c: 'Both are equal in the value and data type.',
        d: 'Both are not same at all.',
        ans: 'c'
    },{
        id: 10,
        name: 'Choose the correct snippet from the following to check if the variable "a" is not equal the "NULL":',
        a: 'if(a!==null)',
        b: 'if (a!)',
        c: 'if(a!null)',
        d: 'if(a!=null)',
        ans: 'a'
    },{
        id: 11,
        name: 'In JavaScript, what will be used for calling the function definition expression:',
        a: 'Function prototype',
        b: 'Function literal',
        c: 'Function calling',
        d: 'Function declaration',
        ans: 'b'
    },{
        id: 12,
        name: 'Which of the following one is the property of the primary expression:',
        a: 'Contains only keywords',
        b: 'basic expressions containing all necessary functions',
        c: 'contains variable references alone',
        d: 'stand-alone expressions',
        ans: 'd'
    },{
        id: 13,
        name: 'Which one of the following is used for the calling a function or a method in the JavaScript:',
        a: 'Property Access Expression',
        b: 'Functional expression',
        c: 'Invocation expression',
        d: 'Primary expression',
        ans: 'c'
    },{
        id: 14,
        name: 'The "new Point(3,2)", is a kind of _______ expression',
        a: 'Object Creation Expression',
        b: 'Primary Expression',
        c: 'Invocation Expression',
        d: 'Constructor Calling Expression',
        ans: 'a'
    },{
        id: 15,
        name: 'Which of the following type of a variable is volatile?',
        a: 'Mutable variable',
        b: 'Dynamic variable',
        c: 'Volatile variable',
        d: 'Immutable variable',
        ans: 'a'
    }]
let questionEl = document.getElementById('question');
let skipButton = document.querySelector("button[onclick='skipQuestion()']");
let questionCounterEl = document.getElementById('question-counter');
let countdownEl = document.getElementById('countdown');
let optionA = document.getElementById('option-a');
let optionB = document.getElementById('option-b');
let optionC = document.getElementById('option-c');
let optionD = document.getElementById('option-d');
let resultEl = document.getElementById('result');
let nextQuestionButton = document.getElementById('next-question');
let currentQuestionIndex = 0;
let countdown;
let selectedQuestions;
let score = {
    correct: 0,
    warning: 0,
};

function startQuiz() {
    selectedQuestions = getRandomQuestions(arr, 10);
    loadNextQuestion();
}



function loadNextQuestion() {
    if (currentQuestionIndex >= selectedQuestions.length) {
        showResult();
        return;
    }

    let currentQuestion = selectedQuestions[currentQuestionIndex];

    questionCounterEl.textContent = `Question ${currentQuestionIndex + 1} of ${selectedQuestions.length}`;
    questionEl.textContent = currentQuestion.name;
    optionA.textContent = currentQuestion.a;
    optionB.textContent = currentQuestion.b;
    optionC.textContent = currentQuestion.c;
    optionD.textContent = currentQuestion.d;

    startCountdown();
}

function startCountdown() {
    clearInterval(countdown);
    let timeLeft = 15;
    countdownEl.textContent = timeLeft;
    countdown = setInterval(() => {
        timeLeft -= 1;
        countdownEl.textContent = timeLeft;
        if (timeLeft <= 0) {
            clearInterval(countdown);
            submitAnswer(null);
        }
    }, 1000);
}

function submitAnswer(answer) {
    clearInterval(countdown);
    disableAnswerButtons(true);
    if (answer === selectedQuestions[currentQuestionIndex].ans) {
        score.correct += 1;
        document.getElementById(`option-${answer}`).classList.add('correct');
    } else {
        score.warning += 1;
        document.getElementById(`option-${answer}`).classList.add('incorrect');
        document.getElementById(`option-${selectedQuestions[currentQuestionIndex].ans}`).classList.add('correct');
    }
    nextQuestionButton.style.display = 'block';
    skipButton.style.display = 'none';
}

function nextQuestion() {
    disableAnswerButtons(false);
    resetAnswerButtonStyles();
    nextQuestionButton.style.display = 'none';
    skipButton.style.display = 'block';
    currentQuestionIndex += 1;
    loadNextQuestion();
}

function disableAnswerButtons(disabled) {
    optionA.disabled = disabled;
    optionB.disabled = disabled;
    optionC.disabled = disabled;
    optionD.disabled = disabled;
}

function resetAnswerButtonStyles() {
    optionA.classList.remove('correct', 'incorrect');
    optionB.classList.remove('correct', 'incorrect');
    optionC.classList.remove('correct', 'incorrect');
    optionD.classList.remove('correct', 'incorrect');
}
nextQuestionButton.addEventListener('click', nextQuestion);

function skipQuestion() {
    clearInterval(countdown);
    score.warning += 1;
    currentQuestionIndex += 1;
    loadNextQuestion();
}

function showResult() {
    questionEl.style.display = 'none';
    countdownEl.style.display = 'none';
    document.getElementById('options').style.display = 'none';
    questionCounterEl.style.display = 'none';
    skipButton.style.display = 'none';
    resultEl.innerHTML = `
        <h2>Congratulations!</h2>
        <p>Correct answers: ${score.correct}</p>
        <p>Warnings: ${score.warning}</p>
    `;
}

function getRandomQuestions(arr, n) {
    let shuffled = arr.slice().sort(() => 0.5 - Math.random());
    return shuffled.slice(0, n);
}

startQuiz();




