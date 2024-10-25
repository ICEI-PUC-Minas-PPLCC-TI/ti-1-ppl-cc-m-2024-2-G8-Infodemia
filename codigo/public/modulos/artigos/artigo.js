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
                    document.getElementById('titulo-artigo').textContent = noticia.titulo;
                    document.getElementById('autor-artigo').textContent = noticia.autor;
                    document.getElementById('data-artigo').textContent = noticia.data;
                    document.getElementById('conteudo-artigo').textContent = noticia.descricao;
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

window.onload = carregarArtigo;
