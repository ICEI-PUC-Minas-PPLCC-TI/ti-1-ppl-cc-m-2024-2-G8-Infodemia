function getArticleIdFromUrl() {
    const params = new URLSearchParams(window.location.search);
    return params.get('id');  
}

function carregarArtigo() {
    const artigoId = getArticleIdFromUrl();

    if (artigoId) {
        fetch('noticias.json')
            .then(response => response.json())
            .then(data => {
                const noticia = data.noticias[artigoId - 1]; 
                
                if (noticia) {
                    // Atualiza o conteúdo da página com os dados da notícia
                    document.getElementById('titulo-artigo').textContent = noticia.titulo;
                    document.getElementById('autor-artigo').textContent = noticia.autor;
                    document.getElementById('data-artigo').textContent = noticia.data;
                    document.getElementById('conteudo-artigo').textContent = noticia.descricao;

                    // Atualiza o link "Para ler mais, clique aqui"
                    document.getElementById('saiba-mais-link').href = noticia.saiba_mais;
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
