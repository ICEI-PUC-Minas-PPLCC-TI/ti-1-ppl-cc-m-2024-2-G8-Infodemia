document.addEventListener("DOMContentLoaded", () => {
    const videoContainer = document.getElementById("videoContainer");

    const userId = JSON.parse(localStorage.getItem('loggedInUser')).id;

    fetch("/videos")
        .then(response => response.json())
        .then(videos => {
            videos.forEach(video => {
                const videoDiv = document.createElement("div");
                videoDiv.classList.add("video-card");

                videoDiv.innerHTML = `
                    <iframe src="${video.url}" frameborder="0" allowfullscreen></iframe>
                    <div class="video-content">
                        <h2>${video.title}</h2>
                        <p>${video.description}</p>
                        <a href="${video.url}" target="_blank" class="veja-mais-link">
                            <button id="${video.id}" class="veja-mais-button">Veja Mais</button>
                        </a>
                    </div>
                `;

                const link = videoDiv.querySelector('.veja-mais-link');
                link.addEventListener('click', (event) => {
                    event.preventDefault();
                    marcarVideoAssistido(userId, video.id);
                    window.open(video.url, '_blank');
                });

                videoContainer.appendChild(videoDiv);
            });
        })
        .catch(error => {
            console.error("Erro ao buscar os vídeos:", error);
        });
});

function marcarVideoAssistido(userId, videoId) {
    if (!userId || !videoId) {
        console.error('ID do usuário ou do video inválido.');
        return;
    }

    fetch(`/usuarios/${userId}`)
        .then(response => response.json())
        .then(user => {
            if (!user.videos) {
                user.videos = [];
            }

            if (!user.videos.includes(videoId)) {
                user.videos.push(videoId);

                return fetch(`/usuarios/${userId}`, {
                    method: 'PATCH',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ videos: user.videos }),
                });
            } else {
                console.log('Video já registrado como assistido pelo usuário.');
            }
        })
        .then(response => {
            if (response && !response.ok) {
                throw new Error('Erro ao registrar o video como assistido.');
            }
            console.log('Video registrado como assistido pelo usuário.');
        })
        .catch(error => {
            console.error('Erro ao registrar o video como assistido:', error);
        });
}


