// Página principal
function carregarPodcasts() {
    fetch('/podcasts')
        .then(response => {
            if (!response.ok) throw new Error('Erro ao acessar os dados');
            return response.json();
        })
        .then(podcasts => {
            const container = document.getElementById('mais-podcasts-container');
            container.innerHTML = '';

            const podcastsParaExibir = podcasts.slice(0, 4);
            if (podcastsParaExibir.length > 0) {
                podcastsParaExibir.forEach((podcast, index) => {
                    const podcastCard = document.createElement('div');
                    podcastCard.className = 'podcast-item';

                    podcastCard.innerHTML = `
                        <div class="podcast-details">
                        <p><strong>${podcast.titulo}</strong></p>
                        <p><em>Autor: ${podcast.autor}</em></p>
                        <p><strong>Duração:</strong> ${podcast.duracao}</p>
                        <a href="detalhes-podcast.html?indice=${index}" class="button">Ler Descrição</a>
                        </div>
                        `;
                    container.appendChild(podcastCard);
                });
            } else {
                container.innerHTML = `<p>Nenhum podcast encontrado.</p>`;
            }
        })
        .catch(error => {
            console.error('Erro ao carregar os podcasts:', error);
            const container = document.getElementById('mais-podcasts-container');
            container.innerHTML = `<p>Erro ao carregar os podcasts. Tente novamente mais tarde.</p>`;
        });
}

// Página "Mais Podcasts"
function carregarMaisPodcasts() {
    fetch('/podcasts')
        .then(response => {
            if (!response.ok) throw new Error('Erro ao acessar os dados');
            return response.json();
        })
        .then(podcasts => {
            const container = document.getElementById('mais-podcasts-container');
            container.innerHTML = '';

            const podcastsRestantes = podcasts.slice(4);
            if (podcastsRestantes.length > 0) {
                podcastsRestantes.forEach((podcast, index) => {
                    const podcastCard = document.createElement('div');
                    podcastCard.classList.add('podcast-item');

                    podcastCard.innerHTML = `
                        <div class="podcast-details">
                        <p><strong>${podcast.titulo}</strong></p>
                        <p><em>Autor: ${podcast.autor}</em></p>
                        <p><strong>Duração:</strong> ${podcast.duracao}</p>
                        <a href="detalhes-podcast.html?indice=${4 + index}" class="button">Ler Descrição</a>
                        </div>
                        `;

                    container.appendChild(podcastCard);
                });
            } else {
                container.innerHTML = `<p>Nenhum podcast encontrado.</p>`;
            }
        })
        .catch(error => {
            console.error('Erro ao carregar os podcasts:', error);
            const container = document.getElementById('mais-podcasts-container');
            container.innerHTML = `<p>Erro ao carregar os podcasts. Tente novamente mais tarde.</p>`;
        });
}

// Página "Detalhes"
function marcarEscutado(userId, podcastId) {
    if (!userId || !podcastId) {
        console.error('ID do usuário ou do podcast inválido.');
        return;
    }

    fetch(`/usuarios/${userId}`)
        .then(response => response.json())
        .then(user => {
            if (!user.podcasts) {
                user.podcasts = [];
            }

            if (!user.podcasts.includes(podcastId)) {
                user.podcasts.push(podcastId);

                return fetch(`/usuarios/${userId}`, {
                    method: 'PATCH',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ podcasts: user.podcasts }),
                });
            } else {
                console.log('Podcast já registrado como escutado pelo usuário.');
            }
        })
        .then(response => {
            if (response && !response.ok) {
                throw new Error('Erro ao registrar o podcast como escutado.');
            }
            console.log('Podcast registrado como escutado pelo usuário.');
        })
        .catch(error => {
            console.error('Erro ao registrar o podcast como escutado:', error);
        });
}

function carregarDetalhesPodcast() {
    const urlParams = new URLSearchParams(window.location.search);
    const indicePodcast = urlParams.get('indice');

    const userId = JSON.parse(localStorage.getItem('loggedInUser')).id;
    console.log("ID: ", userId);
    if (!userId) {
        console.error('Nenhum usuário logado. Redirecionando para a página de login...');
        window.location.href = '../../modules/login/login.html';
        return;
    }

    fetch('/podcasts')
        .then(response => {
            if (!response.ok) throw new Error('Erro ao acessar os dados');
            return response.json();
        })
        .then(podcasts => {
            const podcast = podcasts[indicePodcast];
            if (podcast) {
                document.getElementById('titulo-podcast').textContent = podcast.titulo;
                const container = document.getElementById('detalhes-podcast-container');
                container.innerHTML = `
                    <p><strong>Autor:</strong> ${podcast.autor}</p>
                    <p><strong>Duração:</strong> ${podcast.duracao}</p>
                    <p><strong>Descrição:</strong> ${podcast.descricao}</p>
                    <a href="${podcast.link}" target="_blank" id="ouvir-podcast">Ouvir Podcast</a>
                    `;
                document.getElementById('ouvir-podcast').addEventListener('click', (event) => {
                    event.preventDefault();
                    marcarEscutado(userId, podcast.id);
                    window.open(podcast.link, '_blank');
                });
            } else {
                const container = document.getElementById('detalhes-podcast-container');
                container.innerHTML = `<p>Podcast não encontrado.</p>`;
            }
        })
        .catch(error => {
            console.error('Erro ao carregar os detalhes do podcast:', error);
            const container = document.getElementById('detalhes-podcast-container');
            container.innerHTML = `<p>Erro ao carregar os detalhes. Tente novamente mais tarde.</p>`;
        });
}

window.onload = () => {
    if (window.location.pathname === '/mais-podcasts.html') {
        carregarMaisPodcasts();
    } else if (window.location.pathname === '/detalhes-podcast.html') {
        carregarDetalhesPodcast();
    } else {
        carregarPodcasts();
        carregarArtigosIniciais();
    }
};
