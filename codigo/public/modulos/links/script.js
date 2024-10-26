document.addEventListener("DOMContentLoaded", () => {
    fetch('db.json')
        .then(response => response.json())
        .then(data => {
            document.getElementById('section-title').textContent = data.trustedLinksSection.title;

            const column1 = document.getElementById('column1');
            const column2 = document.getElementById('column2');

            data.trustedLinksSection.links.forEach(linkColumn => {
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
