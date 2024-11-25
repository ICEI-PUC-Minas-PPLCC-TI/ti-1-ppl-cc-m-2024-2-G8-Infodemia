document.addEventListener("DOMContentLoaded", () => {
    const ebookForm = document.getElementById("ebook-form");
    const registeredEbooksList = document.getElementById("registered-ebooks");

    const fetchEbooks = () => {
        fetch("http://localhost:3000/ebooks")
            .then(response => response.json())
            .then(ebooks => {
                registeredEbooksList.innerHTML = ""; 

                ebooks.forEach(ebook => {
                    const ebookItem = document.createElement("li");
                    ebookItem.innerHTML = `
                        <strong>${ebook.titulo}</strong> - ${ebook.autores}
                        <button class="delete-button" data-id="${ebook.id}">Remover</button>
                    `;
                    registeredEbooksList.appendChild(ebookItem);
                });


                document.querySelectorAll(".delete-button").forEach(button => {
                    button.addEventListener("click", handleDelete);
                });
            })
            .catch(error => console.error("Erro ao buscar e-books:", error));
    };


    ebookForm.addEventListener("submit", event => {
        event.preventDefault();

        const newEbook = {
            titulo: ebookForm.titulo.value,
            autores: ebookForm.autores.value,
            sinopse: ebookForm.sinopse.value,
            link: ebookForm.link.value,
            tema: ebookForm.tema.value,
            publicacao: ebookForm.publicacao.value,
            paginas: ebookForm.paginas.value,
            idioma: ebookForm.idioma.value,
            editora: ebookForm.editora.value,
            capa: ebookForm.capa.value,
        };

        fetch("http://localhost:3000/ebooks", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(newEbook),
        })
            .then(response => {
                if (response.ok) {
                    ebookForm.reset();
                    fetchEbooks(); // Atualiza a lista de e-books
                } else {
                    console.error("Erro ao registrar e-book.");
                }
            })
            .catch(error => console.error("Erro ao registrar e-book:", error));
    });


    const handleDelete = event => {
        const ebookId = event.target.getAttribute("data-id");

        fetch(`http://localhost:3000/ebooks/${ebookId}`, { method: "DELETE" })
            .then(response => {
                if (response.ok) {
                    fetchEbooks(); 
                } else {
                    console.error("Erro ao remover e-book.");
                }
            })
            .catch(error => console.error("Erro ao remover e-book:", error));
    };


    fetchEbooks();
});
