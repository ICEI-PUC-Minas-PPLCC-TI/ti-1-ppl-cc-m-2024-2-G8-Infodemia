function getArticleIdFromUrl() {
    const params = new URLSearchParams(window.location.search);
    return params.get('id');
}

function marcarComoLido(userId, artigoId) {
    if (!userId || !artigoId) {
        console.error('ID do usuário ou do artigo inválido.');
        return;
    }

    fetch(`/usuarios/${userId}`)
        .then(response => response.json())
        .then(user => {
            if (!user.artigos) {
                user.artigos = [];
            }

            if (!user.artigos.includes(artigoId)) {
                user.artigos.push(artigoId);
                console.log(user.artigos);

                return fetch(`/usuarios/${userId}`, {
                    method: 'PATCH',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ artigos: user.artigos }),
                });
            } else {
                console.log('Artigo já registrado como lido pelo usuário.');
            }
        })
        .then(response => {
            if (response && !response.ok) {
                throw new Error('Erro ao registrar a leitura do artigo.');
            }
            console.log('Artigo registrado como lido pelo usuário.');
        })
        .catch(error => {
            console.error('Erro ao registrar a leitura:', error);
        });
}

function carregarArtigo() {
    const userId = JSON.parse(localStorage.getItem('loggedInUser')).id;
    console.log("ID: ", userId);
    if (!userId) {
        console.error('Nenhum usuário logado. Redirecionando para a página de login...');
        window.location.href = '../../modules/login/login.html';
        return;
    }

    const artigoId = getArticleIdFromUrl();

    if (artigoId) {
        fetch('/artigos')
            .then(response => response.json())
            .then(data => {
                const artigo = data[artigoId - 1];

                if (artigo) {
                    document.getElementById('titulo-artigo').textContent = artigo.titulo;
                    document.getElementById('autor-artigo').textContent = artigo.autor;
                    document.getElementById('data-artigo').textContent = artigo.data;
                    document.getElementById('decricao-artigo').textContent = artigo.descricao;
                    document.getElementById('conteudo-artigo').innerHTML = artigo.conteudo;
                    document.getElementById('saiba-mais-link').href = artigo.saiba_mais;

                    document.getElementById('saiba-mais-link').addEventListener('click', () => {
                        marcarComoLido(userId, artigoId);
                    });

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
