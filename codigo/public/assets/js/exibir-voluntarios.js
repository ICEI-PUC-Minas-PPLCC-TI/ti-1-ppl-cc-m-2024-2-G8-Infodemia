const lista = document.getElementById('lista-voluntarios');
const url = 'http://localhost:3000/voluntarios';

// Função para carregar a lista de voluntários
function carregarVoluntarios() {
    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error('Erro ao buscar voluntários.');
            }
            return response.json();
        })
        .then(voluntarios => {
            if (voluntarios.length === 0) {
                lista.innerHTML = '<p>Nenhum voluntário cadastrado.</p>';
                return;
            }

            lista.innerHTML = voluntarios.map(voluntario => `
                <div class="voluntario-card">
                    <h2>${voluntario.nome}</h2>
                    <p><strong>Idade:</strong> ${voluntario.idade}</p>
                    <p><strong>Área:</strong> ${voluntario.area}</p>
                    <p><strong>Especialidade:</strong> ${voluntario.especialidade}</p>
                    <p><strong>E-mail:</strong> ${voluntario.contato.email}</p>
                    <p><strong>Telefone:</strong> ${voluntario.contato.telefone}</p>
                    <p><strong>Certificações:</strong> ${voluntario.certificacoes.join(', ')}</p>
                    <button onclick="window.location.href='./editar-voluntarios.html?id=${voluntario.id}'">Editar</button>
                </div>
            `).join('');
        })
        .catch(error => {
            console.error(error);
            lista.innerHTML = '<p>Erro ao carregar os voluntários.</p>';
        });
}

// Carregar voluntários ao iniciar
carregarVoluntarios();
