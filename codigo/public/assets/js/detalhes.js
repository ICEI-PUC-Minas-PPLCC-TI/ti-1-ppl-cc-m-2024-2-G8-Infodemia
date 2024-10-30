function getArticleIdFromUrl() {
    const params = new URLSearchParams(window.location.search);
    return params.get('id');  
}

function carregarLivro() {
    const ebookId = getArticleIdFromUrl();

    if (ebookId) {
        fetch('http://localhost:3000/ebooks')
            .then(response => response.json())
            .then(data => {
                
                const ebook = data[ebookId - 1]; 
                
                if (ebook) {
                    document.getElementById("capa-livro").src = ebook.capa;
                    document.getElementById("titulo-livro").textContent = ebook.titulo;
                    document.getElementById("autores-livro").textContent = ebook.autores;
                    document.getElementById("tema-livro").textContent = ebook.tema;
                    document.getElementById("publicacao-livro").textContent = ebook.publicacao;
                    document.getElementById("paginas-livro").textContent = ebook.paginas;
                    document.getElementById("idioma-livro").textContent = ebook.idioma;
                    document.getElementById("editora-livro").textContent = ebook.editora;
                    document.getElementById("sinopse-livro").textContent = ebook.sinopse;
                    document.getElementById("link-livro").href = ebook.link;
                } else {
                    document.getElementById("detalhes-container").innerHTML = "<p>Livro não encontrado.</p>";
                }
            })
            .catch(error => {
                console.error('Erro ao carregar o livro:', error);
                document.getElementById('conteudo-livro').textContent = 'Erro ao carregar o Livro.';
            });
    } else {
        document.getElementById('conteudo-livro').textContent = 'ID do livro inválido.';
    }
}


window.onload = carregarLivro;

