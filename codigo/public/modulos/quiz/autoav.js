
document.addEventListener('DOMContentLoaded', () => {
    fetchQuizzes();
    fetchProgress();
});

// Fetch quizzes and display them
async function fetchQuizzes() {
    try {
        const response = await fetch('http://localhost:3000/quizzes');
        const quizzes = await response.json();
        displayQuizzes(selectDailyQuizzes(quizzes));
    } catch (error) {
        console.error("Error fetching quizzes:", error);
    }
}

// Fetch progress data and render the doughnut chart
async function fetchProgress() {
    try {
        const response = await fetch('http://localhost:3000/progress');
        const progressData = await response.json();
        renderDoughnutChart(progressData.slice(0, 9));
    } catch (error) {
        console.error("Error fetching progress:", error);
    }
}

function displayQuizzes(quizzes) {
    const quizContainer = document.getElementById('quiz-container');
    quizContainer.innerHTML = '';

    quizzes.slice(0, 27).forEach(quiz => {
        const quizCard = document.createElement('div');
        quizCard.classList.add('quiz-card');
        
        const buttonLabel = quiz.completed ? "REALIZADO" : "REALIZAR";
        const buttonHandler = quiz.completed ? 
            `onclick="handleCompletedQuiz()"` : 
            `onclick="startQuiz(${quiz.id})"`;
        const buttonStyle = quiz.completed ? 
            "style='background-color: #7a7a7a;'" : "";

        quizCard.innerHTML = `
            <img src="${quiz.img || ''}" alt="${quiz.alt || ''}">
            <h3>${quiz.title}</h3>
            <button ${buttonHandler} ${buttonStyle}>${buttonLabel}</button>
        `;
        quizContainer.appendChild(quizCard);
    });
}

// Update startQuiz function to handle completion
async function startQuiz(quizId) {
    try {
        // Update the quiz status in the database
        const response = await fetch(`http://localhost:3000/quizzes/${quizId}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                completed: true
            })
        });

        if (response.ok) {
            // Refresh the quizzes and progress display
            await fetchQuizzes();
            await fetchProgress();
        } else {
            console.error('Failed to update quiz status');
        }
    } catch (error) {
        console.error('Error updating quiz:', error);
    }
}

// Add function to handle completed quiz clicks
function handleCompletedQuiz() {
    alert('Parabéns, você já fez esse quiz!');
}
// Select daily quizzes from uncompleted quizzes
function selectDailyQuizzes(quizzes) {
    return quizzes.slice(0, 9);
}
function renderDoughnutChart(progressData) {
    const canvas = document.getElementById('progress-chart');
    
    // Make canvas bigger
    canvas.width = 600;
    canvas.height = 600;
    
    const ctx = canvas.getContext('2d');
    const radius = 180; // Slightly smaller radius to fit in card
    const center = { x: canvas.width / 2, y: canvas.height / 2 };
    const segmentAngle = (2 * Math.PI) / progressData.length;
    const gapAngle = (2 * Math.PI) / 180; // 2-degree gap

    // Vibrant colors like in the reference
    const colors = [
        '#FF4B4B',  // Red
        '#FF8B3D',  // Orange
        '#FFD93D',  // Yellow
        '#4CAF50',  // Green
        '#2196F3',  // Light Blue
        '#673AB7',  // Purple
        '#9C27B0',  // Pink
        '#00BCD4',  // Cyan
        '#607D8B'   // Blue Grey
    ];

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw center circle first (lighter background)
    ctx.beginPath();
    ctx.arc(center.x, center.y, radius - 60, 0, 2 * Math.PI);
    ctx.fillStyle = '#1a1a1a';
    ctx.fill();

    progressData.forEach((quiz, index) => {
        const startAngle = index * segmentAngle;
        const endAngle = startAngle + segmentAngle - gapAngle;

        // Draw segment
        ctx.beginPath();
        ctx.arc(center.x, center.y, radius, startAngle, endAngle);
        ctx.arc(center.x, center.y, radius - 60, endAngle, startAngle, true);
        ctx.closePath();
        
        ctx.fillStyle = colors[index];
        ctx.fill();

        // Add segment text
        const midAngle = (startAngle + endAngle) / 2;
        const textRadius = radius - 35;
        const textX = center.x + textRadius * Math.cos(midAngle);
        const textY = center.y + textRadius * Math.sin(midAngle);

        ctx.fillStyle = "#FFFFFF";
        ctx.font = "bold 14px Arial";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText(quiz.completed ? "Complete" : "Incomplete", textX, textY);

        // Add outer labels
        const labelRadius = radius + 30;
        const labelX = center.x + labelRadius * Math.cos(midAngle);
        const labelY = center.y + labelRadius * Math.sin(midAngle);
        
        ctx.font = "12px Arial";
        ctx.fillStyle = "#FFFFFF";
        ctx.fillText(`Quiz ${quiz.quizId}`, labelX, labelY);
        ctx.font = "10px Arial";
        ctx.fillText(`Quiz ${quiz.title}`, labelX, labelY + 15);
    });
}
