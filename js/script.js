document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("leadForm");
    const productPage = document.getElementById("productPage");
    const leadFormContainer = document.getElementById("leadFormContainer");
    const userNameDisplay = document.getElementById("userName");
    const telefoneInput = document.getElementById("telefone");

    // Máscara para o telefone
    telefoneInput.addEventListener("input", (e) => {
        let value = e.target.value.replace(/\D/g, "");
        value = value.replace(/^(\d{2})(\d{5})(\d{4})$/, "($1) $2-$3");
        e.target.value = value;
    });

    form.addEventListener("submit", (e) => {
        e.preventDefault();
        const nome = document.getElementById("nome").value;
        userNameDisplay.textContent = nome;
        leadFormContainer.classList.add("d-none");
        productPage.classList.remove("d-none");
    });
});

// Abre modal de imagem
const galleryImages = document.querySelectorAll(".gallery-image");
const modalImg = document.getElementById("modalImg");

galleryImages.forEach((img) => {
    img.addEventListener("click", () => {
        modalImg.src = img.dataset.img;
    });
});

// Timer Countdown
let countdown = 600; // em segundos
setInterval(() => {
    const minutes = Math.floor(countdown / 60);
    const seconds = countdown % 60;
    document.getElementById("timer").textContent = `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
    if (countdown > 0) countdown--;
}, 1000);
