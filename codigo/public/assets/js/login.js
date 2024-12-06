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
          // Se usuário encontrado, redireciona com base no tipo de usuário
          if (user.role === "admin") {
            window.location.href = "../../paginainicial.html"; // Página de administrador
          } else {
            window.location.href = "../../paginainicial.html"; // Página do usuário comum
          }
        } else {
          alert("Email ou senha incorretos. Tente novamente.");
        }
      })
      .catch(error => {
        console.error("Erro ao buscar usuários:", error);
        alert("Ocorreu um erro. Tente novamente mais tarde.");
      });
  });
  