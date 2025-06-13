document.addEventListener('DOMContentLoaded', () => {
    // Efeito de fade-in ao rolar
    const faders = document.querySelectorAll('.fade-in-section');

    const appearOptions = {
        threshold: 0.3, // A seção aparece quando 30% dela está visível
        rootMargin: "0px 0px -50px 0px" // Margem negativa para carregar um pouco antes de aparecer completamente
    };

    const appearOnScroll = new IntersectionObserver(function(entries, appearOnScroll) {
        entries.forEach(entry => {
            if (!entry.isIntersecting) {
                return;
            } else {
                entry.target.classList.add('is-visible');
                appearOnScroll.unobserve(entry.target); // Para de observar uma vez que a animação acontece
            }
        });
    }, appearOptions);

    faders.forEach(fader => {
        appearOnScroll.observe(fader);
    });

    // Carrossel de imagens na galeria
    const carousel = document.querySelector('.image-carousel');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');

    const galleryImages = [
        { src: 'images/campo-detalhe1.jpg', alt: 'Flores em um campo verde' },
        { src: 'images/cidade-vista-noturna.jpg', alt: 'Vista aérea de uma cidade à noite' },
        { src: 'images/campo-nascer-sol.jpg', alt: 'Nascer do sol no campo com neblina' },
        { src: 'images/cidade-parque.jpg', alt: 'Pessoas relaxando em um parque urbano' },
        { src: 'images/campo-fazenda.jpg', alt: 'Uma fazenda com celeiro e animais' },
        { src: 'images/cidade-cafe.jpg', alt: 'Cafeteria aconchegante na cidade' }
    ];

    function loadCarouselImages() {
        galleryImages.forEach(imgData => {
            const imgElement = document.createElement('img');
            imgElement.src = imgData.src;
            imgElement.alt = imgData.alt;
            carousel.appendChild(imgElement);
        });
    }

    loadCarouselImages(); // Carrega as imagens ao iniciar

    let scrollAmount = 0;
    const scrollStep = 380; // Ajuste conforme a largura das suas imagens + gap (350px + 20px)

    nextBtn.addEventListener('click', () => {
        scrollAmount += scrollStep;
        if (scrollAmount > carousel.scrollWidth - carousel.clientWidth) {
            scrollAmount = 0; // Volta para o início se chegar ao fim
        }
        carousel.scrollTo({
            left: scrollAmount,
            behavior: 'smooth'
        });
    });

    prevBtn.addEventListener('click', () => {
        scrollAmount -= scrollStep;
        if (scrollAmount < 0) {
            scrollAmount = carousel.scrollWidth - carousel.clientWidth; // Vai para o fim se chegar ao início
        }
        carousel.scrollTo({
            left: scrollAmount,
            behavior: 'smooth'
        });
    });

    // Navegação suave ao clicar nos links do menu
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('data-target');
            const targetElement = document.getElementById(targetId);

            if (targetElement) {
                // Calcula a posição do elemento menos a altura do nav para evitar que o nav cubra o conteúdo
                const offsetTop = targetElement.offsetTop - document.querySelector('.main-nav').offsetHeight;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            } else if (targetId === 'hero-section') {
                // Caso especial para o topo da página (hero-section)
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });
            }
        });
    });
});