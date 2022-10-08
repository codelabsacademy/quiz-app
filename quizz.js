const quizData = {
    title: 'Easy quiz',
    questions: [
        {
            question: "What is the correct way to declare a variable in JS",
            a: "let x = 10;",
            b: "new variable = 'text'",
            c: "const turns;",
            d: "var 8pool = 8",
            correct: "a",
        },
        {
            question: "What does HTML stand for?",
            a: "Cascading Style Sheet",
            b: "Jason Object Notation",
            c: "HyperText Markup Language",
            d: "Helicopters Terminals Motorbikes Laces",
            correct: "c",
        },
        {
            question: "What year was JS launched?",
            a: "1990",
            b: "1995",
            c: "1996",
            d: "1997",
            correct: "b",
        }
    ],
    score: 0
}

/* quizzes */
const quizzes = document.getElementsByClassName('quizzes');
 
/* quizz container */
const title = document.getElementById("quiz-title");
const questionEl = document.getElementById("question");
const answerElements = document.querySelectorAll(".answer");
const a_text = document.getElementById("a_text");
const b_text = document.getElementById("b_text");
const c_text = document.getElementById("c_text");
const d_text = document.getElementById("d_text");
const submitBtn = document.getElementById("submit")
const quizContainer = document.getElementById("quiz");
const quizContent = document.getElementById('quiz-content')
const quizAlternative = document.getElementById('quiz-content-alternative')
const date = document.getElementById("date")

/* modal */
const modal = document.getElementById('modal')
const close_btn = document.getElementById('close')

function showModal() {
    modal.style.display = "flex"
    quizContent.style.display = 'block'
    quizAlternative.style.display = 'none'
}

function hideModal() {
    modal.style.display = "none"
    // update quiz info whenever quitting from a quiz
    fillQuizzOverview(0, quizData)
}

// close modal
modal.addEventListener('click', hideModal)
close_btn.addEventListener('click', hideModal)
// stop modal from closing while clicking on the quiz
quizContainer.addEventListener('click', e => e.stopPropagation())

function deselectAnswer() {
    for (let i = 0; i < answerElements.length; i++) {
        answerElements[i].checked = false
    }
}

function getSelectedAnswer() {
    for (let i = 0; i < answerElements.length; i++) {
        if (answerElements[i].checked)
            return answerElements[i].id
    }
}

function fillModal(quiz, questionId) {
    title.innerText = quiz.title
    questionEl.innerText = quiz.questions[questionId].question;
    a_text.innerText = quiz.questions[questionId].a;
    b_text.innerText = quiz.questions[questionId].b;
    c_text.innerText = quiz.questions[questionId].c;
    d_text.innerText = quiz.questions[questionId].d;
    
    let getDate = new Date(Date.now()).toLocaleString().split(',')[0];
    date.innerHTML = getDate

    function checkAnswer(callback) {
        return function () {
            const answer = getSelectedAnswer()
    
            if (answer) {
                if (answer === quiz.questions[questionId].correct) {
                    quiz.score++;
                }
    
                callback()
            } else {
                alert('you have to select an answer!')
            }
        }
    }

    if (questionId + 1 === quiz.questions.length) {
        submitBtn.innerText = "submit"
        submitBtn.onclick = checkAnswer(e => {
            quizContent.style.display = 'none'
            quizAlternative.style.display = 'block'
            quizAlternative.innerHTML = `<h2>Quiz Finished. You have ${quiz.score} out of ${quiz.questions.length} correct answers.</h2>`
            submitBtn.innerText = 'Exit quiz'
            submitBtn.onclick = () => {
                hideModal()
            }
                
        })
    } else {
        submitBtn.innerText = "Next question"
        submitBtn.onclick = checkAnswer(e => {
            fillModal(quiz, questionId + 1)
        })
    }

    deselectAnswer()
}

function fillQuizzOverview(quizId, quiz) {
    const container = quizzes.item(quizId)
    const title = container.querySelector('#title')
    const nb_questions = container.querySelector('#nb_questions')
    const quiz_score = container.querySelector('#quiz_score')
    const open_quiz = container.querySelector('#open_quiz')

    title.innerHTML = quiz.title;
    nb_questions.innerHTML = quiz.questions.length;
    quiz_score.innerHTML = quiz.score;

    open_quiz.addEventListener('mouseup', (e) => {
        fillModal(quiz, 0)
        quiz.score = 0
        showModal()
    });

}

fillQuizzOverview(0, quizData)