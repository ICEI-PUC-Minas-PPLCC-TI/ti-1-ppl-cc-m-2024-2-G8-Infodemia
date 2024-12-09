document.addEventListener('DOMContentLoaded', () => {
    const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));
    if (!loggedInUser || !loggedInUser.id) {
        alert('Usuário não autenticado.');
        window.location.href = "/modulos/login/login.html";
        return;
    }

    fetchQuizzes(loggedInUser);
    createBarChart(loggedInUser);


    const logoutButton = document.querySelector(".logout-button");
    if (logoutButton) {
        logoutButton.addEventListener("click", () => {
            localStorage.removeItem("loggedInUser");
            window.location.href = "/modulos/login/login.html";
        });
    }
});

async function fetchQuizzes(loggedInUser) {
    try {
        const response = await fetch('/quizzes');
        const quizzes = await response.json();
        displayQuizzes(loggedInUser);
    } catch (error) {
        console.error("Error fetching quizzes:", error);
    }
}


async function displayQuizzes(loggedInUser) {
    const quizContainer = document.getElementById('quiz-container');
    quizContainer.innerHTML = '';

    try {
        const quizzesResponse = await fetch('/quizzes');
        const quizzes = await quizzesResponse.json();


        const userResponse = await fetch(`/usuarios/${loggedInUser.id}`);
        const userData = await userResponse.json();

        const userQuizProgress = userData.quiz || [];

        quizzes.slice(0, 9).forEach(quiz => {
            const userQuiz = userQuizProgress.find(q => q.id === quiz.id);
            const completed = userQuiz ? true : false;
            const isCorrect = userQuiz?.isCorrect;

            const quizCard = document.createElement('div');
            quizCard.classList.add('quiz-card');

            let buttonLabel = '';
            let buttonStyle = '';
            if (!completed) {
                buttonLabel = 'Realizar';
                buttonStyle = "style='background-color: #00c0a360;'";
            } else {
                if (isCorrect) {
                    buttonLabel = 'Correto!';
                    buttonStyle = "style='background-color: #4caf5060;'";
                } else {
                    buttonLabel = 'Incorreto!';
                    buttonStyle = "style='background-color: #f4433660;'";
                }
            }
            const buttonHandler = `onclick="startQuiz(${quiz.id})"`;

            quizCard.innerHTML = `
                <img src="${quiz.img || ''}" alt="${quiz.alt || ''}">
                <h3>${quiz.title}</h3>
                <button ${buttonHandler} ${buttonStyle}>${buttonLabel}</button>
                `;
            quizContainer.appendChild(quizCard);
        });
    } catch (error) {
        console.error('Erro ao carregar quizzes:', error);
        alert('Erro ao carregar quizzes. Tente novamente.');
    }
}


async function startQuiz(quizId) {
    try {
        window.location.href = `quiz.html?id=${quizId}`;
    } catch (error) {
        console.error('Error starting quiz:', error);
    }
}

async function createBarChart(loggedInUser) {
    try {
        const userResponse = await fetch(`/usuarios/${loggedInUser.id}`);
        const userData = await userResponse.json();

        // Categories with dynamic counts from user data
        const categories = {
            Videos: userData.videos ? userData.videos.length : 0,
            Noticias: userData.noticias ? userData.noticias.length : 0,
            Artigos: userData.artigos ? userData.artigos.length : 0,
            Livros: userData.livros ? userData.livros.length : 0,
            Quizzes: userData.quiz ? userData.quiz.filter(q => q.isCorrect).length : 0,
            Podcasts: userData.podcasts ? userData.podcasts.length : 0,
        };

        // Colors for each category
        const colors = [
            '#FF4B4B', '#FF8B3D', '#FFD93D', '#4CAF50',
            '#2196F3', '#673AB7', '#9C27B0', '#00BCD4', '#607D8B'
        ];

        // Chart setup
        const canvas = document.getElementById("progress-chart");
        const ctx = canvas.getContext("2d");
        const canvasWidth = canvas.width;
        const canvasHeight = canvas.height;
        const chartPadding = 40;
        const barWidth = 40;
        const barSpacing = 60;
        const maxBarHeight = canvasHeight - chartPadding * 2;

        // Calculate scaling for bars
        const maxValue = Math.max(...Object.values(categories));
        const scale = maxBarHeight / (maxValue || 1);

        // Draw axis
        ctx.font = "18px Arial";
        ctx.clearRect(0, 0, canvasWidth, canvasHeight);
        ctx.strokeStyle = "#f0f0f0";
        ctx.beginPath();
        ctx.moveTo(chartPadding, chartPadding);
        ctx.lineTo(chartPadding, canvasHeight - chartPadding);
        ctx.lineTo(canvasWidth - chartPadding, canvasHeight - chartPadding);
        ctx.stroke();

        // Draw bars
        const categoryKeys = Object.keys(categories);
        categoryKeys.forEach((key, index) => {
            const value = categories[key];
            const barHeight = value * scale;

            const x = chartPadding + index * (barWidth + barSpacing) + barSpacing;
            const y = canvasHeight - chartPadding - barHeight - 1;

            // Draw the bar
            const color = colors[index % colors.length];
            ctx.fillStyle = color;
            ctx.fillRect(x, y, barWidth, barHeight);

            // Draw category name
            ctx.fillStyle = "#f0f0f0";
            ctx.font = "16px Arial";
            ctx.textAlign = "center";
            ctx.fillText(key, x + barWidth / 2, canvasHeight - chartPadding + 15);

            // Draw value
            ctx.font = "18px Arial";
            ctx.fillText(value, x + barWidth / 2, y - 5);
        });

    } catch (error) {
        console.error('Erro ao carregar dados para o gráfico:', error);
        alert('Erro ao carregar dados para o gráfico. Tente novamente.');
    }
}
