// Função para carregar os 4 primeiros podcasts na página principal
function carregarPodcasts() {
  fetch('/podcasts')
    .then((response) => {
      if (!response.ok) throw new Error('Erro ao acessar os dados');
      return response.json(); // Converte a resposta para JSON
    })
    .then((podcasts) => {
      const container = document.getElementById('mais-podcasts-container');
      container.innerHTML = '';

      // Limita a exibição para os primeiros 4 podcasts
      const podcastsParaExibir = podcasts.slice(0, 4);

      if (podcastsParaExibir.length > 0) {
        podcastsParaExibir.forEach((podcast) => {
          const podcastCard = document.createElement('div');
          podcastCard.classList.add('podcast-item');

          podcastCard.innerHTML = `
            <div class="podcast-details">
              <p><strong>${podcast.titulo}</strong></p>
              <p><em>Autor: ${podcast.autor}</em></p>
              <p><strong>Duração:</strong> ${podcast.duracao}</p>
              <a href="detalhes-podcast.html?id=${podcast.id}" class="button">Ler Descrição</a>
            </div>
          `;

          container.appendChild(podcastCard);
        });
      } else {
        container.innerHTML = `<p>Nenhum podcast encontrado.</p>`;
      }
    })
    .catch((error) => {
      console.error('Erro ao carregar os podcasts:', error);
      const container = document.getElementById('mais-podcasts-container');
      container.innerHTML = `<p>Erro ao carregar os podcasts. Tente novamente mais tarde.</p>`;
    });
}

// Função para carregar os podcasts restantes na página "Mais Podcasts"
function carregarMaisPodcasts() {
  fetch('/podcasts')
    .then((response) => {
      if (!response.ok) throw new Error('Erro ao acessar os dados');
      return response.json(); // Converte a resposta para JSON
    })
    .then((podcasts) => {
      const container = document.getElementById('mais-podcasts-container');
      container.innerHTML = '';

      // Pega os podcasts restantes, ou seja, aqueles após os 4 primeiros
      const podcastsRestantes = podcasts.slice(4);

      if (podcastsRestantes.length > 0) {
        podcastsRestantes.forEach((podcast) => {
          const podcastCard = document.createElement('div');
          podcastCard.classList.add('podcast-item');

          podcastCard.innerHTML = `
            <div class="podcast-details">
              <p><strong>${podcast.titulo}</strong></p>
              <p><em>Autor: ${podcast.autor}</em></p>
              <p><strong>Duração:</strong> ${podcast.duracao}</p>
              <a href="detalhes-podcast.html?id=${podcast.id}" class="button">Ler Descrição</a>
            </div>
          `;

          container.appendChild(podcastCard);
        });
      } else {
        container.innerHTML = `<p>Nenhum podcast encontrado.</p>`;
      }
    })
    .catch((error) => {
      console.error('Erro ao carregar os podcasts:', error);
      const container = document.getElementById('todos-podcasts-container');
      container.innerHTML = `<p>Erro ao carregar os podcasts. Tente novamente mais tarde.</p>`;
    });
}

// Função para carregar os detalhes do podcast na página "Detalhes"
function carregarDetalhesPodcast() {
  const urlParams = new URLSearchParams(window.location.search);
  const idPodcast = urlParams.get('id');

  fetch('/podcasts')
    .then((response) => {
      if (!response.ok) throw new Error('Erro ao acessar os dados');
      return response.json();
    })
    .then((podcasts) => {
      const podcast = podcasts.find(p => p.id === parseInt(idPodcast));
      if (podcast) {
        document.getElementById('titulo-podcast').textContent = podcast.titulo;
        const container = document.getElementById('detalhes-podcast-container');
        container.innerHTML = `
          <p><strong>Autor:</strong> ${podcast.autor}</p>
          <p><strong>Duração:</strong> ${podcast.duracao}</p>
          <p><strong>Descrição:</strong> ${podcast.descricao}</p>
          <a href="${podcast.link}" target="_blank">Ouvir Podcast</a>
        `;
      } else {
        const container = document.getElementById('detalhes-podcast-container');
        container.innerHTML = `<p>Podcast não encontrado.</p>`;
      }
    })
    .catch((error) => {
      console.error('Erro ao carregar os detalhes do podcast:', error);
      const container = document.getElementById('detalhes-podcast-container');
      container.innerHTML = `<p>Erro ao carregar os detalhes. Tente novamente mais tarde.</p>`;
    });
}

// Carrega os podcasts na página principal ao abrir
window.onload = carregarPodcasts;

// Se estiver na página "Mais Podcasts", carrega os podcasts restantes
if (window.location.pathname === '/mais-podcasts.html') {
  window.onload = carregarMaisPodcasts;
}

// Se estiver na página de detalhes, carrega o podcast específico
if (window.location.pathname === '/detalhes-podcast.html') {
  window.onload = carregarDetalhesPodcast;
}
