fetch('noticias.json')  // Chama o arquivo JSON
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(data => {
        exibirNoticias(data.noticias);
    })
    .catch(error => console.error('Erro ao carregar o JSON:', error));

// Função para exibir as notícias
function exibirNoticias(noticias) {
    const container = document.getElementById('noticias-container');
    
    noticias.forEach(noticia => {
        const noticiaDiv = document.createElement('div');
        noticiaDiv.className = 'noticia';
        
        noticiaDiv.innerHTML = `
            <h2>${noticia.titulo}</h2>
            <p><strong>Fonte:</strong> ${noticia.fonte} | <strong>Data:</strong> ${noticia.data} | <strong>Autor:</strong> ${noticia.autor}</p>
            <a href="${noticia.link}" target="_blank">Leia mais</a>
        `;
        
        container.appendChild(noticiaDiv);
    });
} 