document.addEventListener("DOMContentLoaded", () => {
    const ebookGrid = document.getElementById("ebookGrid");

    
    fetch("http://localhost:3000/ebooks")
        .then(response => response.json())
        .then(ebooks => {
        
            ebooks.forEach(ebook => {
                const ebookDiv = document.createElement("div");
                ebookDiv.classList.add("ebook");

                ebookDiv.innerHTML = `
                    <img src="${ebook.capa}" alt="${ebook.titulo}">
                    <div class="ebook-content">
                        <h2>${ebook.titulo}</h2>
                        <p class="ebook-author">${ebook.autores}</p>
                        <p class="ebook-summary">${ebook.sinopse}</p>
                        <a href="${ebook.link}" class="download-button" target="_blank">Saiba Mais</a>
                    </div>
                `;

                ebookGrid.appendChild(ebookDiv);
            });
        })
        .catch(error => {
            console.error("Erro ao buscar os ebooks:", error);
        });
});

/*JS Videos */

// Variável para armazenar o iframe atualmente ativo
let activeIframe = null;

// Função para carregar os vídeos do arquivo JSON
async function loadVideos() {
    try {
        const response = await fetch('/codigo/db/db.json');
        const data = await response.json();
        const videos = data.videos || []; // Acessa a lista de vídeos

        const container = document.getElementById('videoContainer');
        container.innerHTML = ''; // Limpa o container antes de adicionar novos vídeos

        if (videos.length === 0) {
            const message = document.createElement('p');
            message.textContent = 'Não há vídeos cadastrados no momento.';
            message.style.color = 'white'; // Cor da mensagem
            container.appendChild(message); // Adiciona a mensagem ao container
            return; // Sai da função se não houver vídeos
        }

        videos.forEach(video => {
            const videoDiv = document.createElement('div');
            videoDiv.classList.add('video-card');  // Adiciona a classe video-card

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
            container.appendChild(videoDiv);

            // Adiciona um evento para quando o iframe for clicado
            const iframe = videoDiv.querySelector('iframe');
            iframe.addEventListener('click', () => {
                // Pausa o vídeo ativo se não for o mesmo
                if (activeIframe && activeIframe !== iframe) {
                    const activeSrc = activeIframe.src;
                    activeIframe.src = ""; // Para o vídeo
                    activeIframe.src = activeSrc; // Reinicia o vídeo
                }
                // Atualiza o iframe ativo
                activeIframe = iframe;
            });
        });
    } catch (error) {
        console.error("Erro ao carregar os vídeos:", error);
        const container = document.getElementById('videoContainer');
        const errorMessage = document.createElement('p');
        errorMessage.textContent = 'Erro ao carregar os vídeos. Tente novamente mais tarde.';
        errorMessage.style.color = 'red';
        container.appendChild(errorMessage);
    }
}

// Carrega os vídeos assim que a página é carregada
window.onload = loadVideos;