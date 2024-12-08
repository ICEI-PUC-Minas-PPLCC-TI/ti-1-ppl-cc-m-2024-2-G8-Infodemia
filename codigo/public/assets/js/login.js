document.getElementById("login-form").addEventListener("submit", function (event) {
  event.preventDefault(); // Impede o envio do formulário

  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  // Verifica se o email e a senha foram preenchidos
  if (!email || !password) {
    alert("Por favor, preencha todos os campos.");
    return;
  }

  // Fazendo requisição ao JSON Server para verificar as credenciais
  fetch("http://localhost:3000/usuarios")
    .then(response => response.json())
    .then(users => {
      // Procurando pelo usuário no banco de dados
      const user = users.find(u => u.email === email && u.senha === password);

      if (user) {
        // Salva o usuário logado no localStorage
        localStorage.setItem("loggedInUser", JSON.stringify(user));

        // Redireciona com base no tipo de usuário
        window.location.href = "../../paginainicial.html"; // Página inicial para todos
      } else {
        alert("Email ou senha incorretos. Tente novamente.");
      }
    })
    .catch(error => {
      console.error("Erro ao buscar usuários:", error);
      alert("Ocorreu um erro. Tente novamente mais tarde.");
    });
});