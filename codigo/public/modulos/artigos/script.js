// Função para carregar o arquivo JSON e exibir os artigos
function carregarNoticias() {
    fetch('noticias.json')
        .then(response => response.json())
        .then(data => {
            const container = document.getElementById('artigos-container');
            data.noticias.forEach((noticia, index) => {
                // Criação de um card para cada notícia
                const artigoCard = document.createElement('div');
                artigoCard.classList.add('noticia');  // Adiciona a classe noticia
                
                artigoCard.innerHTML = `
                    <div class="imagem-noticia">
                        <img src="${noticia.imagem}" alt="Imagem do Artigo">
                    </div>
                    <div class="conteudo-noticia">
                        <h2>${noticia.titulo}</h2>
                        <p><strong>Autor:</strong> ${noticia.autor}</p>
                        <p><strong>Data de Publicação:</strong> ${noticia.data}</p>
                        <p>${noticia.descricao.substring(0, 100)}...</p>
                        <a href="artigo.html?id=${index + 1}" class="btn">Ler Mais</a>
                    </div>
                `;

                container.appendChild(artigoCard);
            });
        })
        .catch(error => console.error('Erro ao carregar as notícias:', error));
}

// Chama a função quando a página é carregada
window.onload = carregarNoticias;
