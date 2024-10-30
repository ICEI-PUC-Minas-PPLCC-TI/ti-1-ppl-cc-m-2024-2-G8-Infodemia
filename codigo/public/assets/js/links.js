document.addEventListener("DOMContentLoaded", () => {
    fetch("http://localhost:3000/trustedLinksSection")
        .then(response => response.json())
        .then(data => {
            // Aqui, data já é o objeto trustedLinksSection
            document.getElementById('section-title').textContent = data.title;

            const column1 = document.getElementById('column1');
            const column2 = document.getElementById('column2');

            data.links.forEach(linkColumn => {
                linkColumn.items.forEach(linkItem => {
                    const linkElement = document.createElement('a');
                    linkElement.href = linkItem.url;
                    linkElement.textContent = linkItem.label;
                    linkElement.classList.add('link');
                    linkElement.target = "_blank";  // Abre o link em outra guia

                    if (linkColumn.column === 1) {
                        column1.appendChild(linkElement);
                    } else {
                        column2.appendChild(linkElement);
                    }
                });
            });
        })
        .catch(error => console.error('Erro ao carregar o JSON:', error));
});
