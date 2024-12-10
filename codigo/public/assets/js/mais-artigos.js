function carregarMaisArtigos() {
    fetch('/artigos')
        .then(response => response.json())
        .then(data => {
            const container = document.getElementById('mais-artigos-container');
            if (data.length > 0 && container) {
                const artigosExtras = data.slice(6);
                artigosExtras.forEach((artigo, index) => {
                    const artigoCard = document.createElement('div');
                    artigoCard.classList.add('artigo');

                    artigoCard.innerHTML = `
                        <div class="imagem-artigo">
                            <img src="${artigo.imagem}" alt="Imagem do Artigo">
                        </div>
                        <div class="conteudo-artigo">
                            <h2>${artigo.titulo}</h2>
                            <p><strong>Autor:</strong> ${artigo.autor}</p>
                            <p><strong>Data de Publicação:</strong> ${artigo.data}</p>
                            <a href="artigo.html?id=${index + 7}" class="btn">Ler Mais</a>
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

window.onload = carregarMaisArtigos;
