const urlParams = new URLSearchParams(window.location.search);
const id = urlParams.get('id');
const url = `http://localhost:3000/voluntarios/${id}`;

// Selecionar os campos do formulário
const form = document.getElementById('form-editar-voluntario');
const nomeInput = document.getElementById('nome');
const idadeInput = document.getElementById('idade');
const areaInput = document.getElementById('area');
const especialidadeInput = document.getElementById('especialidade');
const emailInput = document.getElementById('email');
const telefoneInput = document.getElementById('telefone');
const certificacoesInput = document.getElementById('certificacoes');

// Preencher os campos com os dados existentes
fetch(url)
    .then(response => {
        if (!response.ok) {
            throw new Error('Erro ao buscar os dados do voluntário.');
        }
        return response.json();
    })
    .then(voluntario => {
        nomeInput.value = voluntario.nome;
        idadeInput.value = voluntario.idade;
        areaInput.value = voluntario.area;
        especialidadeInput.value = voluntario.especialidade;
        emailInput.value = voluntario.contato.email;
        telefoneInput.value = voluntario.contato.telefone;
        certificacoesInput.value = voluntario.certificacoes.join(', ');
    })
    .catch(error => {
        console.error(error);
        alert('Erro ao carregar os dados do voluntário.');
    });

// Enviar alterações para o JSON Server
form.addEventListener('submit', event => {
    event.preventDefault();

    const voluntarioAtualizado = {
        nome: nomeInput.value,
        idade: parseInt(idadeInput.value),
        area: areaInput.value,
        especialidade: especialidadeInput.value,
        contato: {
            email: emailInput.value,
            telefone: telefoneInput.value
        },
        certificacoes: certificacoesInput.value.split(',').map(cert => cert.trim())
    };

    fetch(url, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(voluntarioAtualizado)
    })
        .then(response => {
            if (!response.ok) {
                throw new Error('Erro ao salvar as alterações.');
            }
            alert('Voluntário atualizado com sucesso!');
            window.location.href = './exibir-voluntarios.html';
        })
        .catch(error => {
            console.error(error);
            alert('Erro ao atualizar o voluntário.');
        });
});
