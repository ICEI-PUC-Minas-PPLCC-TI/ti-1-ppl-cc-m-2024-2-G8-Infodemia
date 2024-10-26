function carregarMaisArtigos() {
    fetch('noticias.json')
        .then(response => response.json())
        .then(data => {
            const container = document.getElementById('mais-artigos-container');

            // Seleciona apenas os artigos adicionais
            const artigosExtras = data.noticias.slice(6);

            artigosExtras.forEach((noticia, index) => {
                const artigoCard = document.createElement('div');
                artigoCard.classList.add('noticia');
                
                artigoCard.innerHTML = `
                    <div class="imagem-noticia">
                        <img src="${noticia.imagem}" alt="Imagem do Artigo">
                    </div>
                    <div class="conteudo-noticia">
                        <h2>${noticia.titulo}</h2>
                        <p><strong>Autor:</strong> ${noticia.autor}</p>
                        <p><strong>Data de Publicação:</strong> ${noticia.data}</p>
                        <a href="artigo.html?id=${index + 7}" class="btn">Ler Mais</a>
                    </div>
                `;

                container.appendChild(artigoCard);
            });
        })
        .catch(error => console.error('Erro ao carregar os artigos extras:', error));
}

window.onload = carregarMaisArtigos;
