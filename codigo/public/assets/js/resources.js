document.addEventListener("DOMContentLoaded", () => {
    const ebookGrid = document.getElementById("ebookGrid");


    fetch("http://localhost:3000/ebooks")
        .then(response => response.json())
        .then(ebooks => {

            ebooks.forEach(ebook => {
                const ebookDiv = document.createElement("div");
                ebookDiv.classList.add("ebook");

                ebookDiv.innerHTML = `
                    <img src="${ebook.capa}" alt="${ebook.titulo}">
                    <div class="ebook-content">
                        <h2>${ebook.titulo}</h2>
                        <p class="ebook-author">${ebook.autores}</p>
                        <p class="ebook-summary">${ebook.sinopse}</p>
                        <div class="button-group">
                            <a href="detalhes.html?id=${ebook.id}" class="download-button" >Saiba Mais</a>
                            <a class="delete-button" data-id="${ebook.id}">Deletar</a>
                        </div>
                    </div>
                `;

                ebookGrid.appendChild(ebookDiv);
            });
            const deleteButtons = document.querySelectorAll(".delete-button");
            console.log(deleteButtons)
            deleteButtons.forEach(button => {
                button.addEventListener("click", (event) => {
                    event.preventDefault();
                    const ebookId = button.getAttribute("data-id");
                    const confirmDelete = confirm("Tem certeza que deseja deletar este e-book?");
                    if (confirmDelete) {
                        fetch(`http://localhost:3000/ebooks/${ebookId}`, {
                            method: 'DELETE',
                        })
                            .then(response => {
                                if (response.ok) {
                                    alert("E-book deletado com sucesso!");
                                    button.closest(".ebook").remove();
                                } else {
                                    alert("Erro ao deletar o e-book.");
                                }
                            })
                            .catch(error => {
                                console.error("Erro ao deletar o e-book:", error);
                            });
                    }
                });
            });
        })
        .catch(error => {
            console.error("Erro ao buscar os ebooks:", error);
        });



});