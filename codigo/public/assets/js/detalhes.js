function getArticleIdFromUrl() {
    const params = new URLSearchParams(window.location.search);
    return params.get('id');
}

function carregarLivro() {
    const ebookId = getArticleIdFromUrl();

    const userId = JSON.parse(localStorage.getItem('loggedInUser')).id;
    console.log("ID: ", userId);
    if (!userId) {
        console.error('Nenhum usuário logado. Redirecionando para a página de login...');
        window.location.href = '../../modules/login/login.html';
        return;
    }

    if (ebookId) {
        fetch('/ebooks')
            .then(response => response.json())
            .then(data => {

                const ebook = data.find(b => b.id == ebookId);

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
                    //document.getElementById("link-livro").href = ebook.link;
                    document.getElementById('link-livro').addEventListener('click', () => {
                        event.preventDefault();
                        marcarComoLido(userId, ebook.id);
                        window.open(ebook.link, '_blank');
                    });

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

function marcarComoLido(userId, livroId) {
    if (!userId || !livroId) {
        console.error('ID do usuário ou do livro inválido.');
        return;
    }

    fetch(`/usuarios/${userId}`)
        .then(response => response.json())
        .then(user => {
            if (!user.livros) {
                user.livros = [];
            }

            if (!user.livros.includes(livroId)) {
                user.livros.push(livroId);
                console.log(user.livros);

                return fetch(`/usuarios/${userId}`, {
                    method: 'PATCH',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ livros: user.livros }),
                });
            } else {
                console.log('Livro já registrado como lido pelo usuário.');
            }
        })
        .then(response => {
            if (response && !response.ok) {
                throw new Error('Erro ao registrar a leitura do livro.');
            }
            console.log('Livro registrado como lido pelo usuário.');
        })
        .catch(error => {
            console.error('Erro ao registrar a leitura:', error);
        });
}


window.onload = carregarLivro;

