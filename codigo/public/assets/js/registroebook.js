document.addEventListener("DOMContentLoaded", () => {
    const ebookForm = document.getElementById("ebook-form");
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

        console.log(newEbook)

        fetch("http://localhost:3000/ebooks", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(newEbook),
        })
            .then(response => {
                if (response.ok) {
                    window.location.href = "/resources.html"
                } else {
                    console.error("Erro ao registrar e-book.");
                }
            })
            .catch(error => console.error("Erro ao registrar e-book:", error));

    });

});
