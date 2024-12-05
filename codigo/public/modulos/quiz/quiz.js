document.addEventListener('DOMContentLoaded', () => {
    const urlParams = new URLSearchParams(window.location.search);
    const quizId = urlParams.get('id');
    
    if (quizId) {
        loadQuiz(quizId);
    }
});

async function loadQuiz(quizId) {
    try {
        const response = await fetch(`http://localhost:3000/quizzes/${quizId}`);
        const quiz = await response.json();
        
        const quizContent = document.getElementById('quiz-content');
        
        quizContent.innerHTML = `
            <div class="quiz-question">
                <h2>${quiz.title}</h2>
                <img src="${quiz.img}" alt="Quiz Image" class="quiz-image">
                <p>${quiz.questions.question}</p>
                <div class="answers">
                    ${quiz.questions.answers.map((answer, index) => `
                        <div class="answer-option ${quiz.lastAnswer && quiz.lastAnswer.selectedAnswer === index ? (quiz.lastAnswer.isCorrect ? 'correct' : 'incorrect') : ''}" data-index="${index}">
                            <span class="answer-icon">✓</span>
                            ${answer.text}
                        </div>
                    `).join('')}
                </div>
                <div class="answer-feedback">${quiz.lastAnswer ? (quiz.lastAnswer.isCorrect ? "Correto! " : "Incorreto.") : ''}</div>
                <div class="quiz-controls">
                    <button class="return-button">Voltar</button>
                    <button class="save-button">Salvar Resposta</button>
                </div>
            </div>
        `;

        let selectedAnswerIndex = quiz.lastAnswer ? quiz.lastAnswer.selectedAnswer : null;

        // Add click handlers for answer options
        const answerOptions = document.querySelectorAll('.answer-option');
        answerOptions.forEach((option, index) => {
            option.addEventListener('click', () => {
                // Remove selection from all options
                answerOptions.forEach(opt => opt.classList.remove('selected'));
                // Add selection to clicked option
                option.classList.add('selected');
                selectedAnswerIndex = index;

                // Reset all answer-specific classes
                answerOptions.forEach(opt => {
                    opt.classList.remove('correct', 'incorrect');
                });
            });
        });

        // Add save handler
        document.querySelector('.return-button').addEventListener('click', async () => {
             window.location.href = 'index.html';
        });
        document.querySelector('.save-button').addEventListener('click', async () => {
            if (selectedAnswerIndex === null) {
                alert('Por favor, selecione uma resposta antes de salvar.');
                return;
            }

            const isCorrect = quiz.questions.answers[selectedAnswerIndex].correct;
            const feedbackElement = document.querySelector('.answer-feedback');
            
            // Show feedback
            feedbackElement.classList.add('visible');
            //feedbackElement.style.height = '50px';
            feedbackElement.textContent = isCorrect
                ? `Correto! ${quiz.questions.answers[selectedAnswerIndex].explanation}`
                : `Incorreto. ${quiz.questions.answers[selectedAnswerIndex].explanation}`;
            feedbackElement.className = `answer-feedback visible ${isCorrect ? 'correct' : 'incorrect'}`;

            try {
                // Update quiz completion status
                await fetch(`http://localhost:3000/quizzes/${quizId}`, {
                    method: 'PATCH',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        completed: true,
                        lastAnswer: {
                            selectedAnswer: selectedAnswerIndex,
                            isCorrect: isCorrect,
                            timestamp: new Date().toISOString()
                        }
                    })
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
