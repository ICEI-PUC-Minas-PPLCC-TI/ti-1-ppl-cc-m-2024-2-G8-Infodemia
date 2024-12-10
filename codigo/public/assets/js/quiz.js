document.addEventListener('DOMContentLoaded', () => {
    const urlParams = new URLSearchParams(window.location.search);
    const quizId = urlParams.get('id');

    if (quizId) {
        loadQuiz(quizId);
    }

    const logoutButton = document.querySelector(".logout-button");
    if (logoutButton) {
        logoutButton.addEventListener("click", () => {
            localStorage.removeItem("loggedInUser");
            window.location.href = "/modulos/login/login.html";
        });
    }
});

async function loadQuiz(quizId) {
    try {
        const quizResponse = await fetch(`/quizzes/${quizId}`);
        const quiz = await quizResponse.json();

        const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));
        if (!loggedInUser || !loggedInUser.id) {
            alert('Usuário não autenticado.');
            return;
        }

        const userResponse = await fetch(`/usuarios/${loggedInUser.id}`);
        const user = await userResponse.json();

        const userQuizData = user.quiz?.find(q => q.id === quizId) || {};
        const quizContent = document.getElementById('quiz-content');

        quizContent.innerHTML = `
            <div class="quiz-question">
                <h2>${quiz.title}</h2>
                <img src="${quiz.img}" alt="Quiz Image" class="quiz-image">
                <p>${quiz.questions.question}</p>
                <div class="answers">
                    ${quiz.questions.answers.map((answer, index) => `
                        <div class="answer-option ${userQuizData.selectedAnswer === index ? (userQuizData.isCorrect ? 'correct' : 'incorrect') : ''}" data-index="${index}">
                            <span class="answer-icon">✓</span>
                            ${answer.text}
                        </div>
                    `).join('')}
                </div>
                <div class="answer-feedback">${userQuizData.isCorrect !== undefined ? (userQuizData.isCorrect ? "Correto! " : "Incorreto.") : ''}</div>
                <div class="quiz-controls">
                    <button class="return-button">Voltar</button>
                    <button class="save-button">Salvar Resposta</button>
                </div>
            </div>
        `;

        let selectedAnswerIndex = userQuizData.selectedAnswer ?? null;

        const answerOptions = document.querySelectorAll('.answer-option');
        answerOptions.forEach((option, index) => {
            option.addEventListener('click', () => {
                answerOptions.forEach(opt => opt.classList.remove('selected'));
                option.classList.add('selected');
                selectedAnswerIndex = index;
                answerOptions.forEach(opt => {
                    opt.classList.remove('correct', 'incorrect');
                });
            });
        });

        document.querySelector('.return-button').addEventListener('click', () => {
            window.location.href = 'ferramentas.html';
        });

        document.querySelector('.save-button').addEventListener('click', async () => {
            if (selectedAnswerIndex === null) {
                alert('Por favor, selecione uma resposta antes de salvar.');
                return;
            }

            const isCorrect = quiz.questions.answers[selectedAnswerIndex].correct;
            const feedbackElement = document.querySelector('.answer-feedback');

            feedbackElement.classList.add('visible');
            feedbackElement.textContent = isCorrect
                ? `Correto! ${quiz.questions.answers[selectedAnswerIndex].explanation}`
                : `Incorreto. ${quiz.questions.answers[selectedAnswerIndex].explanation}`;
            feedbackElement.className = `answer-feedback visible ${isCorrect ? 'correct' : 'incorrect'}`;

            try {
                if (!user.quiz) {
                    user.quiz = [];
                }

                const existingQuizIndex = user.quiz.findIndex(q => q.id === quizId);
                if (existingQuizIndex !== -1) {
                    user.quiz[existingQuizIndex] = {
                        id: quizId,
                        selectedAnswer: selectedAnswerIndex,
                        isCorrect: isCorrect
                    };
                } else {
                    user.quiz.push({
                        id: quizId,
                        selectedAnswer: selectedAnswerIndex,
                        isCorrect: isCorrect
                    });
                }

                await fetch(`/usuarios/${loggedInUser.id}`, {
                    method: 'PATCH',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ quiz: user.quiz })
                });

            } catch (error) {
                console.error('Error saving answer:', error);
                alert('Erro ao salvar resposta. Tente novamente.');
            }
        });
    } catch (error) {
        console.error('Error loading quiz:', error);
        alert('Erro ao carregar o quiz. Tente novamente.');
    }
}
