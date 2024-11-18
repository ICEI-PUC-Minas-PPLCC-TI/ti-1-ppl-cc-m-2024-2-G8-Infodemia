// Selecionar o formulário
const form = document.getElementById('video-form');

// Event Listener para o envio do formulário
form.addEventListener('submit', function(event) {
    event.preventDefault();

    // Captura os dados do formulário
    const title = document.getElementById('title').value;
    const url = document.getElementById('url').value;
    const description = document.getElementById('description').value;
    const tags = document.getElementById('tags').value.split(',').map(tag => tag.trim());

    // Estrutura do novo vídeo
    const newVideo = {
        title,
        url,
        description,
        tags
    };

    // Envia para o JSON Server
    fetch('http://localhost:3000/videos', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(newVideo)
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Erro ao adicionar vídeo');
        }
        alert('Vídeo adicionado com sucesso!');
        form.reset(); // Limpa o formulário
    })
    .catch(error => console.error('Erro:', error));
});

