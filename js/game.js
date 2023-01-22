// welcome area
var user_name = localStorage.getItem('user_name');
document.querySelector('title').innerHTML = user_name + ' | quiz page'
startPage();

function startPage() {
    document.querySelector('.welcomeArea').style.display = 'flex';
    document.querySelector('.questionArea').style.display = 'none';
    document.querySelector('.name').innerHTML = 'oi ' + user_name + '!';
    document.querySelector('.progress-bar').style.width = '0%';

    document.querySelector('.welcomeArea button').addEventListener('click', showQuestion);
}

// questions area
let currentQuestion = 0;
let correctAnswer = 0;

function showQuestion() {
    
    if(questions[currentQuestion]) {
        let q = questions[currentQuestion];
        let pct = Math.floor((currentQuestion / questions.length) * 100);
        console.log(pct);

        document.querySelector('.progress-bar').style.width = `${pct}%`;

        document.querySelector('.finishQuestions').style.display = 'none';
        document.querySelector('.welcomeArea').style.display = 'none';
        document.querySelector('.questionArea').style.display = 'flex';
        document.querySelector('.question').innerHTML = q.question;

        let optionsHtml = '';
        for(let i in q.options) {
            optionsHtml += `<div data-op="${i}" class="option"><span>${parseInt(i)+1}</span>${q.options[i]}</div>`;
        };

        document.querySelector('.options').innerHTML = optionsHtml;

        document.querySelectorAll('.options .option').forEach(item => {
            item.addEventListener('click', optionClickEvent);
        });
    } else {
        finishQuiz();
    };
};

function optionClickEvent(e) {
    let clickedOption = parseInt(e.target.getAttribute('data-op'));
    if(questions[currentQuestion].answer === clickedOption) {
        correctAnswer++;
    };
    currentQuestion++;
    showQuestion();
};

function finishQuiz() {
    let points = Math.floor((correctAnswer / questions.length) * 100);
    if(points < 100) {
        document.querySelector('.progress-bar').style.backgroundColor = "#F00";
        document.querySelector('.finishContent').innerHTML = '<p>refaça o teste, errou algumas perguntas ai...</p><button class="back-btn">refazer</button>';
        document.querySelector('.back-btn').addEventListener('click', resetGame);
    } else if(points == 100) {
        document.querySelector('.progress-bar').style.backgroundColor = "#7FFF00";
        document.querySelector('.finishContent').innerHTML = '<img src="../images/prize.png" alt="prize-icon"><div>muito beem!! clica ai embaixo pra pegar seu presente </div><button class="prize-btn">pegar prêmio</button>';
        document.querySelector('.prize-btn').addEventListener('click', prizePage);
    };

    document.querySelector('.progress-bar').style.width = '100%';
    document.querySelector('.questionArea').style.display = 'none';
    document.querySelector('.finishQuestions').style.display = 'flex';
};

function resetGame() {
    document.querySelector('.progress-bar').style.backgroundColor = '#9932CC'
    correctAnswer = 0;
    currentQuestion = 0;
    showQuestion();
};

const prizePage =(event) => {
    event.preventDefault();
    window.location = 'main-page.html';
};