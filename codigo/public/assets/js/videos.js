document.addEventListener("DOMContentLoaded", () => {
    const videoContainer = document.getElementById("videoContainer");

    fetch("http://localhost:3000/videos")
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
                        <a href="${video.url}" target="_blank">
                            <button class="veja-mais-button">Veja Mais</button>
                        </a>
                    </div>
                `;

                videoContainer.appendChild(videoDiv);
            });
        })
        .catch(error => {
            console.error("Erro ao buscar os vídeos:", error);
        });
});
