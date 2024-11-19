const form = document.getElementById('video-form');

// envio do formulário
form.addEventListener('submit', function(event) {
    event.preventDefault();

    // Pega os dados do formulário
    const title = document.getElementById('title').value;
    const url = document.getElementById('url').value;
    const description = document.getElementById('description').value;
    const tags = document.getElementById('tags').value.split(',').map(tag => tag.trim());

    // video novo
    const newVideo = {
        title,
        url,
        description,
        tags
    };

    // Envia pro JSON Server
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
        form.reset(); // limpa o formulário
    })
    .catch(error => console.error('Erro:', error));
});

