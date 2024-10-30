function carregarArtigosIniciais() {
    fetch('http://localhost:3000/artigos')
        .then(response => response.json())
        .then(data => {
            const container = document.getElementById('artigos-container');
            const artigosIniciais = data.slice(0, 6); 

            artigosIniciais.forEach((artigo, index) => {
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
                        <a href="artigo.html?id=${index + 1}" class="btn">Ler Mais</a>
                    </div>
                `;

                container.appendChild(artigoCard);
            });
        })
        .catch(error => console.error('Erro ao carregar os artigos iniciais:', error));
}

window.onload = carregarArtigosIniciais;
