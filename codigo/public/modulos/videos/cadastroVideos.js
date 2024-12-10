const API_URL = '/videos'; // Endpoint da API REST para os vídeos

// Carrega todos os vídeos ao inicializar
async function loadVideos() {
    try {
        const response = await fetch(API_URL);
        if (!response.ok) {
            console.error('Erro ao carregar vídeos:', response.statusText);
            return;
        }
        const videos = await response.json();
        displayVideos(videos);
    } catch (error) {
        console.error('Erro ao carregar vídeos:', error);
    }
}

// Exibe a lista de vídeos
function displayVideos(videos) {
    const container = document.getElementById('videos');
    container.innerHTML = '';
    videos.forEach(video => {
        const videoDiv = document.createElement('div');
        videoDiv.className = 'video';
        videoDiv.innerHTML = `
            <h3>${video.title}</h3>
            <p>${video.description}</p>
            <a href="${video.url}" target="_blank">Assistir</a>
            <p><strong>Tags:</strong> ${video.tags.join(', ')}</p>
            <button class="edit" onclick="editVideo('${video.id}')">Editar</button>
            <button onclick="deleteVideo('${video.id}')">Excluir</button>
        `;
        container.appendChild(videoDiv);
    });
}

// Salva ou atualiza um vídeo
async function saveVideo(event) {
    event.preventDefault();

    const id = document.getElementById('video-id').value;
    const video = {
        title: document.getElementById('title').value,
        url: document.getElementById('url').value,
        description: document.getElementById('description').value,
        tags: document.getElementById('tags').value.split(',').map(tag => tag.trim()),
    };

    const method = id ? 'PUT' : 'POST';
    const endpoint = id ? `${API_URL}/${id}` : API_URL;

    try {
        const response = await fetch(endpoint, {
            method,
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(video),
        });

        if (!response.ok) {
            console.error('Erro ao salvar vídeo:', response.statusText);
            return;
        }

        document.getElementById('video-form').reset();
        loadVideos();
    } catch (error) {
        console.error('Erro ao salvar vídeo:', error);
    }
}

// Exclui um vídeo
async function deleteVideo(id) {
    try {
        const response = await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
        if (!response.ok) {
            console.error('Erro ao excluir vídeo:', response.statusText);
            return;
        }
        loadVideos();
    } catch (error) {
        console.error('Erro ao excluir vídeo:', error);
    }
}

// Preenche o formulário para edição
async function editVideo(id) {
    try {
        const response = await fetch(`${API_URL}/${id}`);
        if (!response.ok) {
            console.error('Erro ao carregar vídeo para edição:', response.statusText);
            return;
        }

        const video = await response.json();
        document.getElementById('video-id').value = video.id;
        document.getElementById('title').value = video.title;
        document.getElementById('url').value = video.url;
        document.getElementById('description').value = video.description;
        document.getElementById('tags').value = video.tags.join(', ');
    } catch (error) {
        console.error('Erro ao carregar vídeo para edição:', error);
    }
}

// Listeners
document.getElementById('video-form').addEventListener('submit', saveVideo);
document.getElementById('cancel-btn').addEventListener('click', () => {
    document.getElementById('video-form').reset();
});

// Inicialização
loadVideos();
