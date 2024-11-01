document.addEventListener("DOMContentLoaded", function () {
    const leadForm = document.getElementById("leadForm");
    const productPage = document.getElementById("productPage");
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

        alert(`Olá, ${nome}! Seja bem-vindo(a) à Suplementação Fit!`);

        productPage.classList.remove("d-none");
        document.querySelector(".lead-form-section").style.display = "none";
    });
});

const countdownTimer = document.getElementById("countdownTimer");
const minutesElement = document.getElementById("minutes");
const secondsElement = document.getElementById("seconds");

let countdownTime = 5 * 60;

function updateCountdown() {
    const minutes = Math.floor(countdownTime / 60);
    const seconds = countdownTime % 60;

    minutesElement.textContent = String(minutes).padStart(2, '0');
    secondsElement.textContent = String(seconds).padStart(2, '0');

    if (countdownTime > 0) {
        countdownTime--;
    } else {
        clearInterval(timerInterval);
    }
}

const timerInterval = setInterval(updateCountdown, 1000);


// Trecho que faz thumbnails
const mainImage = document.getElementById('mainImage');
const thumbnails = document.querySelectorAll('.thumbnail');

thumbnails.forEach(thumbnail => {
    thumbnail.addEventListener('click', () => {
        mainImage.src = thumbnail.dataset.full;
        thumbnails.forEach(thumb => thumb.classList.remove('active'));
        thumbnail.classList.add('active');
    });
});


// Trecho que realiza modal e imagens da galeria
const images = document.querySelectorAll('.gallery-image');
    const modalImage = document.getElementById('modalImage');
    const galleryModal = new bootstrap.Modal(document.getElementById('galleryModal'));
    let currentIndex = 0;

    function showImage(index) {
        currentIndex = index;
        modalImage.src = images[currentIndex].src;
        galleryModal.show();
    }

    images.forEach((img, index) => {
        img.addEventListener('click', () => showImage(index));
    });

    document.getElementById('nextButton').addEventListener('click', () => {
        currentIndex = (currentIndex + 1) % images.length;
        showImage(currentIndex);
    });

    document.getElementById('prevButton').addEventListener('click', () => {
        currentIndex = (currentIndex - 1 + images.length) % images.length;
        showImage(currentIndex);
    });

    const carousel = document.getElementById('testimonialsCarousel');
    let isDragging = false;
    let startPos = 0;
    let currentTranslate = 0;
    let prevTranslate = 0;
    let animationID;

    // Funções para o movimento de arraste
    carousel.addEventListener('mousedown', dragStart);
    carousel.addEventListener('touchstart', dragStart);
    carousel.addEventListener('mouseup', dragEnd);
    carousel.addEventListener('mouseleave', dragEnd);
    carousel.addEventListener('touchend', dragEnd);
    carousel.addEventListener('mousemove', dragMove);
    carousel.addEventListener('touchmove', dragMove);

    function dragStart(event) {
        isDragging = true;
        startPos = getPositionX(event);
        animationID = requestAnimationFrame(animation);
    }

    function dragEnd() {
        isDragging = false;
        cancelAnimationFrame(animationID);
        if (currentTranslate > prevTranslate) {
            carousel.querySelector('.carousel-control-prev').click();
        } else if (currentTranslate < prevTranslate) {
            carousel.querySelector('.carousel-control-next').click();
        }
        currentTranslate = 0;
    }

    function dragMove(event) {
        if (isDragging) {
            const currentPosition = getPositionX(event);
            currentTranslate = currentPosition - startPos;
        }
    }

    function getPositionX(event) {
        return event.type.includes('mouse') ? event.pageX : event.touches[0].clientX;
    }

    function animation() {
        setCarouselTranslate(currentTranslate);
        if (isDragging) requestAnimationFrame(animation);
    }

    function setCarouselTranslate(translate) {
        carousel.querySelector('.carousel-inner').style.transform = `translateX(${translate}px)`;
    }