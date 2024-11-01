document.addEventListener("DOMContentLoaded", function () {
    const leadForm = document.getElementById("leadForm");
    const productPage = document.getElementById("productPage");
    const userNameSpan = document.getElementById("userName");

    // Máscara para o campo de telefone
    const telefoneInput = document.getElementById("telefone");

    telefoneInput.addEventListener("input", function () {
        let value = telefoneInput.value.replace(/\D/g, "");
        value = value.substring(0, 11);

        value = value.replace(/^(\d{2})(\d)/g, "($1) $2");
        value = value.replace(/(\d{5})(\d)/, "$1-$2");

        telefoneInput.value = value;
    });

    // Manipula o envio do formulário
    leadForm.addEventListener("submit", function (event) {
        event.preventDefault();

        const nome = document.getElementById("nome").value;
        const email = document.getElementById("email").value;
        const telefone = document.getElementById("telefone").value;

        // Validação básica de email e telefone
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailPattern.test(email)) {
            alert("Por favor, insira um e-mail válido.");
            return;
        }

        // Exibe o nome do usuário na página de produto
        userNameSpan.textContent = nome;

        // Exibe a página de produto e oculta o formulário
        productPage.classList.remove("d-none");
        document.querySelector(".lead-form-section").style.display = "none";
    });
});

const countdownTimer = document.getElementById("countdownTimer");
const minutesElement = document.getElementById("minutes");
const secondsElement = document.getElementById("seconds");

let countdownTime = 5 * 60; // Por exemplo, 5 minutos em segundos

function updateCountdown() {
    const minutes = Math.floor(countdownTime / 60);
    const seconds = countdownTime % 60;

    minutesElement.textContent = String(minutes).padStart(2, '0');
    secondsElement.textContent = String(seconds).padStart(2, '0');

    if (countdownTime > 0) {
        countdownTime--;
    } else {
        clearInterval(timerInterval);
        // Lógica adicional quando o tempo acaba, se necessário
    }
}

const timerInterval = setInterval(updateCountdown, 1000);

// Trecho que realiza modal e imagens da galeria
const images = document.querySelectorAll('.gallery-image');
    const modalImage = document.getElementById('modalImage');
    const galleryModal = new bootstrap.Modal(document.getElementById('galleryModal'));
    let currentIndex = 0;

    // Função para exibir a imagem no modal
    function showImage(index) {
        currentIndex = index;
        modalImage.src = images[currentIndex].src;
        galleryModal.show();
    }

    // Evento para abrir o modal ao clicar na imagem
    images.forEach((img, index) => {
        img.addEventListener('click', () => showImage(index));
    });

    // Navegação para a próxima imagem
    document.getElementById('nextButton').addEventListener('click', () => {
        currentIndex = (currentIndex + 1) % images.length;
        showImage(currentIndex);
    });

    // Navegação para a imagem anterior
    document.getElementById('prevButton').addEventListener('click', () => {
        currentIndex = (currentIndex - 1 + images.length) % images.length;
        showImage(currentIndex);
    });
