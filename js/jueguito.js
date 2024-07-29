document.addEventListener('DOMContentLoaded', function () {
    const startButton = document.getElementById('start-button');
    const answersDiv = document.getElementById('answers');
    const timer = document.getElementById('timer');
    const questionElement = document.getElementById('question');
    const answerButtons = document.querySelectorAll('.answer-btn');
    const scoreElement = document.getElementById('score');
    const questionNumberElement = document.getElementById('question-number');
    let currentQuestionIndex = 0;
    let countdown;
    let score = 0;

    // Lista de preguntas
    const questions = [
        {
            question: '¿Donde nacio Jesus?',
            answers: ['Belén', 'Nazaret', 'Jerusalén', 'Egipto'],
            correct: 0
        },
        {
            question: '¿Cuál es la capital de Francia?',
            answers: ['París', 'Londres', 'Berlín', 'Madrid'],
            correct: 0
        },
        {
            question: "¿En la corte de qué rey pasó Leonardo Da Vinci los dos últimos años de su vida?",
            answers: ["Enrique IV", "Carlos III", "Francisco I", "Luis XII"],
            correct: 2
        },
        {
            question: "¿Cuántos continentes hay en el mundo?",
            answers: ["5", "6", "7", "8"],
            correct: 0
        },
        {
            question: '¿Cómo se llamaba el hermano de Moisés?',
            answers: ['Samuel', 'David', 'Daniel', 'Aaron'],
            correct: 3
        },

        {
            question: '¿Cuál es el planeta más frio del sistema solar?',
            answers: ['Saturno', 'Marte', 'Venus', 'Neptuno'],
            correct: 3
        },

        {
            question: '¿Cuál es la raíz cuadrada de 4?',
            answers: ['4', '8', '2', '6'],
            correct: 2
        },

        {
            question: '¿El sol es?',
            answers: ['Estrella', 'Planeta', 'Luna', 'ninguna de las anteriores'],
            correct: 0
        },

        {
            question: '¿Cuál es el título del poema de Lewis Carroll compuesto por palabras sinsentido?',
            answers: ['Gibberish', 'Jabberwocky', 'Gobbledygook', 'Twaddle'],
            correct: 1
        },

        {
            question: '¿En 1718, ¿qué pirata murió en una batalla en la costa del lugar ahora conocido como Carolina del Norte?',
            answers: ['Calico Jack', 'Barbanegra', 'GCapitán Kidd', 'Bartholomew Roberts'],
            correct: 1
        },
        // Agrega más preguntas aquí
    ];

    startButton.addEventListener('click', startGame);

    // Función para iniciar el juego
    function startGame() {
        startButton.style.display = 'none'; // Oculta el botón de empezar
        answersDiv.style.display = 'flex'; // Muestra los botones de respuestas
        showQuestion();
        startTimer(); // Inicia el temporizador
    }

    // Función para iniciar el temporizador
    function startTimer() {
        let timeLeft = 10;
        timer.textContent = timeLeft;
        countdown = setInterval(function () {
            timeLeft--;
            // Cambia el color del temporizador dependiendo del tiempo restante
            if (timeLeft >= 7) {
                timer.className = 'text-success';
            } else if (timeLeft >= 3) {
                timer.className = 'text-warning';
            } else {
                timer.className = 'text-danger';
            }
            timer.textContent = timeLeft;

            // Si el tiempo se acaba, pasa a la siguiente pregunta
            if (timeLeft === 0) {
                clearInterval(countdown);
                alert('Se acabó el tiempo!');
                nextQuestion();
            }
        }, 1000);
    }

    // Función para mostrar la pregunta actual
    function showQuestion() {
        resetState();
        let currentQuestion = questions[currentQuestionIndex];
        questionElement.textContent = currentQuestion.question;
        questionNumberElement.textContent = `Pregunta ${currentQuestionIndex + 1}`;
        answerButtons.forEach((button, index) => {
            button.textContent = `${String.fromCharCode(65 + index)}. ${currentQuestion.answers[index]}`;
            button.addEventListener('click', selectAnswer);
        });
    }

    // Función para reiniciar el estado de los botones
    function resetState() {
        answerButtons.forEach(button => {
            button.classList.remove('correct');
            button.classList.remove('incorrect');
            button.disabled = false;
        });
    }

    // Función para manejar la selección de respuestas
    function selectAnswer(e) {
        const selectedButton = e.target;
        const correctAnswer = questions[currentQuestionIndex].correct;
        if (Array.from(answerButtons).indexOf(selectedButton) === correctAnswer) {
            selectedButton.classList.add('correct');
            score++;
        } else {
            selectedButton.classList.add('incorrect');
        }
        answerButtons.forEach(button => {
            button.disabled = true;
            if (Array.from(answerButtons).indexOf(button) === correctAnswer) {
                button.classList.add('correct');
            }
        });
        scoreElement.textContent = `Puntaje: ${score}`;
        clearInterval(countdown);
        setTimeout(nextQuestion, 2000);
    }

    // Función para pasar a la siguiente pregunta
    function nextQuestion() {
        currentQuestionIndex++;
        if (currentQuestionIndex < questions.length) {
            showQuestion();
            startTimer();
        } else {
            alert('Juego terminado! Tu puntaje es: ' + score);
            resetGame();
        }
    }

    // Función para reiniciar el juego
    function resetGame() {
        currentQuestionIndex = 0;
        score = 0;
        scoreElement.textContent = `Puntaje: ${score}`;
        startButton.style.display = 'block'; // Muestra el botón de empezar
        answersDiv.style.display = 'none'; // Oculta los botones de respuestas
        questionElement.textContent = 'Pregunta';
        timer.textContent = '10';
        timer.className = 'text-success';
    }
});
