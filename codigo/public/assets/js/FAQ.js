document.addEventListener("DOMContentLoaded", () => {
    const faqContainer = document.getElementById("faqContainer");

    fetch("http://localhost:3000/faqs")
        .then(response => response.json())
        .then(faqs => {
            faqs.forEach(faq => {
                const faqDiv = document.createElement("div");
                faqDiv.classList.add("faq-card");

                faqDiv.innerHTML = `
                    <h2>
                        ${faq.pergunta}
                        <span class="material-icons toggle-icon">expand_more</span>
                    </h2>
                    <p>${faq.resposta}</p>
                `;

                const question = faqDiv.querySelector("h2");
                const answer = faqDiv.querySelector("p");
                const icon = faqDiv.querySelector(".toggle-icon");

                question.addEventListener("click", () => {
                    const isHidden = answer.style.display === "none" || answer.style.display === "";
                    answer.style.display = isHidden ? "block" : "none";

                    icon.textContent = isHidden ? "expand_less" : "expand_more";
                });

                faqContainer.appendChild(faqDiv);
            });
        })
        .catch(error => {
            console.error("Erro ao buscar o FAQ:", error);
            const errorMessage = document.createElement("div");
            errorMessage.classList.add("error-message");
            errorMessage.innerText = "Não foi possível carregar as perguntas frequentes. Tente novamente mais tarde.";
            faqContainer.appendChild(errorMessage);
        });
});