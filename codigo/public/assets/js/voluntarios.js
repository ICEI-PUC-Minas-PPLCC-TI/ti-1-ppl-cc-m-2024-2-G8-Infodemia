// Adicionar o evento de envio do formulário
document.getElementById('form-cadastro').addEventListener('submit', function (e) {
    e.preventDefault();

    // Coletar os dados do formulário
    const voluntario = {
        nome: document.getElementById('nome').value,
        idade: document.getElementById('idade').value,
        area: document.getElementById('area').value,
        especialidade: document.getElementById('especialidade').value,
        contato: {
            email: document.getElementById('email').value,
            telefone: document.getElementById('telefone').value
        },
        certificacoes: document.getElementById('certificacoes').value.split(',').map(cert => cert.trim())
    };

    // Exemplo de como você pode enviar os dados para o db.json
    fetch('http://localhost:3000/voluntarios', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(voluntario)
    })
    .then(response => response.json())
    .then(data => {
        alert('Voluntário cadastrado com sucesso!');
        // Limpar o formulário após o envio
        document.getElementById('form-cadastro').reset();
    })
    .catch(error => {
        alert('Erro ao cadastrar o voluntário.');
        console.error(error);
    });
});
