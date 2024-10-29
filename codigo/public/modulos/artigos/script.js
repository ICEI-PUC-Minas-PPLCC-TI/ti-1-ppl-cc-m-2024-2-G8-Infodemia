function carregarArtigosIniciais() {
    fetch('http://localhost:3000/artigos')
        .then(response => response.json())
        .then(data => {
            const container = document.getElementById('artigos-container');

            // Seleciona os primeiros 6 artigos
            const artigosIniciais = data.slice(0, 6); 

            artigosIniciais.forEach((noticia, index) => {
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
                        <a href="artigo.html?id=${index + 1}" class="btn">Ler Mais</a>
                    </div>
                `;

                container.appendChild(artigoCard);
            });
        })
        .catch(error => console.error('Erro ao carregar os artigos iniciais:', error));
}

window.onload = carregarArtigosIniciais;
