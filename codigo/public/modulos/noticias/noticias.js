fetch('http://localhost:3000/noticias')
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(data => {
        
        exibirNoticias(data);
    })
    .catch(error => console.error('Erro ao carregar o JSON:', error));

// Função para exibir as notícias
function exibirNoticias(noticias) {
    const container = document.getElementById('noticias-container');

    const userId = JSON.parse(localStorage.getItem('loggedInUser')).id;
    console.log("ID: ", userId);

    noticias.forEach(noticia => {
        const noticiaDiv = document.createElement('div');
        noticiaDiv.className = 'noticia';
        
        noticiaDiv.innerHTML = `
            <h2>${noticia.titulo}</h2>
            <p><strong>Fonte:</strong> ${noticia.fonte} | <strong>Data:</strong> ${noticia.data} | <strong>Autor:</strong> ${noticia.autor}</p>
            <!--<a href="${noticia.link}" target="_blank" id="ler-noticia-${noticia.id}">Leia mais</a>-->
            <!--nao sei pq isso n funciona, dai fiz abaixo.-->
        `;
        
        const link = document.createElement('a');
        link.href = noticia.link;
        link.target = '_blank';
        link.textContent = 'Leia mais';
        link.addEventListener('click', (event) => {
            event.preventDefault();
            marcarNoticiaLida(userId, noticia.id);
            window.open(noticia.link, '_blank');
        });
        noticiaDiv.appendChild(link);        

        container.appendChild(noticiaDiv);
    });
} 

function marcarNoticiaLida(userId, noticiaId) {
    if (!userId || !noticiaId) {
        console.error('ID do usuário ou do noticia inválido.');
        return;
    }

    fetch(`/usuarios/${userId}`)
        .then(response => response.json())
        .then(user => {
            if (!user.noticias) {
                user.noticias = [];
            }

            if (!user.noticias.includes(noticiaId)) {
                user.noticias.push(noticiaId);

                return fetch(`/usuarios/${userId}`, {
                    method: 'PATCH',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ noticias: user.noticias }),
                });
            } else {
                console.log('Noticia já registrado como lida pelo usuário.');
            }
        })
        .then(response => {
            if (response && !response.ok) {
                throw new Error('Erro ao registrar o noticia como lida.');
            }
            console.log('Noticia registrado como lida pelo usuário.');
        })
        .catch(error => {
            console.error('Erro ao registrar o noticia como lida:', error);
        });
}


