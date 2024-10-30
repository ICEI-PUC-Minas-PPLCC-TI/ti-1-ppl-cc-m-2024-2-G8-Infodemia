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
                        <a href="${ebook.link}" class="download-button" target="_blank">Saiba Mais</a>
                    </div>
                `;

                ebookGrid.appendChild(ebookDiv);
            });
        })
        .catch(error => {
            console.error("Erro ao buscar os ebooks:", error);
        });
});