function carregarMaisArtigos() {
    fetch('http://localhost:3000/artigos')
        .then(response => response.json())
        .then(data => {
            const container = document.getElementById('mais-artigos-container');

            // Verifica se existem artigos e se o container foi encontrado
            if (data.length > 0 && container) {
                // Obtém os artigos adicionais, começando do índice 6
                const artigosExtras = data.slice(6); // Pega os artigos a partir do índice 6
                artigosExtras.forEach((artigo, index) => {
                    const artigoCard = document.createElement('div');
                    artigoCard.classList.add('noticia');
                    
                    artigoCard.innerHTML = `
                        <div class="imagem-noticia">
                            <img src="${artigo.imagem}" alt="Imagem do Artigo">
                        </div>
                        <div class="conteudo-noticia">
                            <h2>${artigo.titulo}</h2>
                            <p><strong>Autor:</strong> ${artigo.autor}</p>
                            <p><strong>Data de Publicação:</strong> ${artigo.data}</p>
                            <a href="artigo.html?id=${index + 7}" class="btn">Ler Mais</a> 
                            <!-- O link agora direciona para artigo.html com o ID correto -->
                        </div>
                    `;

                    container.appendChild(artigoCard);
                });
            } else {
                container.textContent = 'Nenhum artigo disponível.';
            }
        })
        .catch(error => {
            console.error('Erro ao carregar os artigos:', error);
            const container = document.getElementById('mais-artigos-container');
            if (container) {
                container.textContent = 'Erro ao carregar os artigos.';
            }
        });
}

// Carregar os artigos quando a página for carregada
window.onload = carregarMaisArtigos;
