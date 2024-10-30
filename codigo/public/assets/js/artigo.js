function getArticleIdFromUrl() {
    const params = new URLSearchParams(window.location.search);
    return params.get('id');  
}

function carregarArtigo() {
    const artigoId = getArticleIdFromUrl();

    if (artigoId) {
        fetch('http://localhost:3000/artigos')
            .then(response => response.json())
            .then(data => {
                const artigo = data[artigoId - 1]; 
                
                if (artigo) {
                    document.getElementById('titulo-artigo').textContent = artigo.titulo;
                    document.getElementById('autor-artigo').textContent = artigo.autor;
                    document.getElementById('data-artigo').textContent = artigo.data;
                    document.getElementById('decricao-artigo').textContent = artigo.descricao; // Aqui é a descrição
                    document.getElementById('conteudo-artigo').innerHTML = artigo.conteudo; // Carrega o conteúdo do artigo
                    document.getElementById('saiba-mais-link').href = artigo.saiba_mais; // Link para ler mais
                } else {
                    document.getElementById('conteudo-artigo').textContent = 'Artigo não encontrado.';
                }
            })
            .catch(error => {
                console.error('Erro ao carregar o artigo:', error);
                document.getElementById('conteudo-artigo').textContent = 'Erro ao carregar o artigo.';
            });
    } else {
        document.getElementById('conteudo-artigo').textContent = 'ID do artigo inválido.';
    }
}

// Carregar o artigo quando a página for carregada
window.onload = carregarArtigo;
