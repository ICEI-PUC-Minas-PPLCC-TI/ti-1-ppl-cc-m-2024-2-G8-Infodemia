document.addEventListener('DOMContentLoaded', () => {
    fetchQuizzes();
    createBarChart();
});

// Fetch quizzes and display them
async function fetchQuizzes() {
    try {
        const response = await fetch('http://localhost:3000/quizzes');
        const quizzes = await response.json();
        displayQuizzes(quizzes.slice(0, 9));
    } catch (error) {
        console.error("Error fetching quizzes:", error);
    }
}

function displayQuizzes(quizzes) {
    const quizContainer = document.getElementById('quiz-container');
    quizContainer.innerHTML = '';

    quizzes.slice(0, 9).forEach(quiz => {
        const quizCard = document.createElement('div');
        quizCard.classList.add('quiz-card');
        
        let buttonLabel = "";
        let buttonStyle = "";
        if (!quiz.completed) {
            buttonLabel = "Realizar"
            buttonStyle = "style='background-color: #00c0a360;'";
        } else {
            if (quiz.lastAnswer.isCorrect) {
                buttonLabel = "Correto!";
                buttonStyle = "style='background-color: #4caf5060;'";
            }
            else {
                buttonLabel = "Incorreto!";
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
}

async function startQuiz(quizId) {
    try {
        window.location.href = `quiz.html?id=${quizId}`;
    } catch (error) {
        console.error('Error starting quiz:', error);
    }
}

async function createBarChart() {
    const response = await fetch('http://localhost:3000/quizzes'); // this will be changed to a single function later on
    const quizzes = await response.json();

    // Categories and their counts
    // static for now.
    const categories = {
        Videos: 5,
        Noticias: 2,
        Artigos: 10,
        Livros: 3,
        Quizzes: 0,
        Outros: 1,
    };

    const colors = [
        '#FF4B4B',
        '#FF8B3D',
        '#FFD93D',
        '#4CAF50',
        '#2196F3',
        '#673AB7',
        '#9C27B0',
        '#00BCD4',
        '#607D8B' 
    ];

    // Populate
    categories.Quizzes = quizzes.filter(quiz => quiz.lastAnswer && quiz.lastAnswer.isCorrect).length;

    const canvas = document.getElementById("progress-chart");
    const ctx = canvas.getContext("2d");
    const canvasWidth = canvas.width;
    const canvasHeight = canvas.height;
    const chartPadding = 40;
    const barWidth = 40;
    const barSpacing = 60;
    const maxBarHeight = canvasHeight - chartPadding * 2;
    // scaling
    const maxValue = Math.max(...Object.values(categories));
    const scale = maxBarHeight / (maxValue || 1);

    // AXIS
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

        // colors
        const color = colors[index % colors.length];
        ctx.fillStyle = color;
        ctx.fillRect(x, y, barWidth, barHeight);

        // category
        ctx.fillStyle = "#f0f0f0";
        ctx.font = "16px Arial";
        ctx.textAlign = "center";
        ctx.fillText(key, x + barWidth / 2, canvasHeight - chartPadding + 15);

        // value
        ctx.font = "18px Arial";
        ctx.fillText(value, x + barWidth / 2, y - 5);
    });
}

