document.getElementById("cadastro-form").addEventListener("submit", async (event) => {
  event.preventDefault();

  const nome = document.getElementById("nome").value.trim();
  const email = document.getElementById("email").value.trim();
  const login = document.getElementById("login").value.trim();
  const senha = document.getElementById("senha").value.trim();

  if (!nome || !email || !login || !senha) {
    alert("Por favor, preencha todos os campos.");
    return;
  }

  const novoUsuario = {
    id: Date.now(), // ID único baseado no timestamp
    artigos: [],
    login,
    senha,
    nome,
    email,
    role: "user", // Padrão para usuários cadastrados
    livros: [],
  };

  try {
    const response = await fetch("http://localhost:3000/usuarios", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(novoUsuario),
    });

    if (response.ok) {
      alert("Usuário cadastrado com sucesso!");
      window.location.href = "../login/login.html";
    } else {
      alert("Erro ao cadastrar usuário.");
    }
  } catch (error) {
    console.error("Erro ao se conectar ao servidor:", error);
    alert("Não foi possível realizar o cadastro. Tente novamente mais tarde.");
  }
});
