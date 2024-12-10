
document.getElementById('form-cadastro').addEventListener('submit', function (e) {
    e.preventDefault();


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

            document.getElementById('form-cadastro').reset();
        })
        .catch(error => {
            alert('Erro ao cadastrar o voluntário.');
            console.error(error);
        });
});
