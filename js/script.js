document.addEventListener('DOMContentLoaded', function() {
    // --- Lógica do Carrossel (index.html) ---
    const carouselInner = document.getElementById('carousel-inner');
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');
    const dotsContainer = document.getElementById('carousel-dots');
    const images = carouselInner ? carouselInner.querySelectorAll('img') : [];
    let currentIndex = 0;
    const totalImages = images.length;

    if (carouselInner && prevBtn && nextBtn && dotsContainer && totalImages > 0) {
        // Inicializa o primeiro dot como ativo
        dotsContainer.children[0].classList.add('bg-green-500', 'scale-125'); // Atualizado para a cor verde militar

        function updateCarousel() {
            const offset = -currentIndex * 100; // Calcula o deslocamento em %
            carouselInner.style.transform = `translateX(${offset}%)`;

            // Atualiza os indicadores (dots)
            Array.from(dotsContainer.children).forEach((dot, index) => {
                if (index === currentIndex) {
                    dot.classList.add('bg-green-500', 'scale-125'); // Atualizado
                    dot.classList.remove('bg-gray-600');
                } else {
                    dot.classList.remove('bg-green-500', 'scale-125'); // Atualizado
                    dot.classList.add('bg-gray-600');
                }
            });
        }

        prevBtn.addEventListener('click', () => {
            currentIndex = (currentIndex === 0) ? totalImages - 1 : currentIndex - 1;
            updateCarousel();
        });

        nextBtn.addEventListener('click', () => {
            currentIndex = (currentIndex === totalImages - 1) ? 0 : currentIndex + 1;
            updateCarousel();
        });

        // Navegação pelos pontos (dots)
        dotsContainer.addEventListener('click', (event) => {
            if (event.target.classList.contains('dot')) {
                currentIndex = parseInt(event.target.dataset.index);
                updateCarousel();
            }
        });

        // Carrossel automático (opcional)
        setInterval(() => {
            nextBtn.click();
        }, 5000); // Muda de imagem a cada 5 segundos
    }

    // --- Lógica para iniciar e fechar a Visita Virtual (index.html) ---
    const startVirtualTourBtn = document.getElementById('start-virtual-tour-btn');
    const virtualTourContent = document.getElementById('visita-virtual-content');
    const virtualTourEmbed = document.getElementById('virtual-tour-embed');
    const closeVirtualTourBtn = document.getElementById('close-virtual-tour-btn');

    if (startVirtualTourBtn && virtualTourContent && virtualTourEmbed && closeVirtualTourBtn) {
        startVirtualTourBtn.addEventListener('click', function(event) {
            event.preventDefault();
            virtualTourContent.classList.remove('hidden');
            document.getElementById('hero-carousel').classList.add('hidden'); // Esconde o carrossel

            // Carrega o iframe do tour virtual (usando a URL do Aeroclube PR como exemplo)
            virtualTourEmbed.innerHTML = '<iframe src="https://aeroclubepr.site/" class="w-full h-full border-0" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>';
        });

        closeVirtualTourBtn.addEventListener('click', function() {
            virtualTourContent.classList.add('hidden');
            document.getElementById('hero-carousel').classList.remove('hidden'); // Mostra o carrossel novamente
            virtualTourEmbed.innerHTML = '<p>Carregando Visita Virtual...</p>'; // Limpa o iframe
        });
    }


    // --- Lógica para a página de Agendamento (agendamento.html) ---
    const schedulingForm = document.getElementById('scheduling-form');
    const schedulingMessage = document.getElementById('scheduling-message');
    const schedulingError = document.getElementById('scheduling-error');

    if (schedulingForm) {
        schedulingForm.addEventListener('submit', function(event) {
            event.preventDefault();

            const formData = {
                name: document.getElementById('name').value,
                email: document.getElementById('email').value,
                phone: document.getElementById('phone').value,
                date: document.getElementById('date').value,
                time: document.getElementById('time').value
            };

            console.log('Dados do agendamento:', formData);

            const success = Math.random() > 0.3;

            if (success) {
                schedulingMessage.classList.remove('hidden');
                schedulingError.classList.add('hidden');
                schedulingForm.reset();
                setTimeout(() => {
                    schedulingMessage.classList.add('hidden');
                }, 5000);
            } else {
                schedulingError.classList.remove('hidden');
                schedulingMessage.classList.add('hidden');
                setTimeout(() => {
                    schedulingError.classList.add('hidden');
                }, 5000);
            }
        });
    }

    // --- Lógica para a página do Acervo (acervo.html) ---
    const acervoItemsContainer = document.getElementById('acervo-items');
    const itemModal = document.getElementById('item-modal');
    const closeModalButton = document.getElementById('close-modal');
    const modalTitle = document.getElementById('modal-title');
    const modalImage = document.getElementById('modal-image');
    const modalDescription = document.getElementById('modal-description');
    const modalDetails = document.getElementById('modal-details');

    // Dados do acervo e da história da aviação brasileira
    const acervoData = [
        {
            id: 1,
            title: "História",
            image: "img/images (1).jpeg",
            description: "",
            details: "Origem: Mesopotâmia | Período: Neolítico (5000 a.C.) | Material: Cerâmica | Dimensões: 30cm altura, 20cm diâmetro"
        },
        {
            id: 2,
            title: "Preservação",
            image: "img/images (2).jpeg",
            description: "",
            details: "Origem: Europa (França) | Período: Medieval (Século XIII) | Material: Aço, Couro | Dimensões: 110cm comprimento"
        },
        {
            id: 3,
            title: "Sobre nós",
            image: "img/SOBRE-NOS2.jpg",
            description: "",
            details: "Origem: Egito Antigo | Período: Dinastia XVIII (1550-1292 a.C.) | Material: Ouro, Lápis-lazúli, Vidro | Dimensões: 50cm altura, 35cm largura"
        },
    ];

    if (acervoItemsContainer) {
        // Função para criar e exibir um item do acervo
        function displayAcervoItem(item) {
            const itemDiv = document.createElement('div');
            itemDiv.className = 'bg-gray-800 shadow-lg rounded-lg overflow-hidden border border-gray-700 transform hover:scale-105 transition duration-300 cursor-pointer'; // Cores atualizadas
            itemDiv.innerHTML = `
                <img src="${item.image}" alt="${item.title}" class="w-full h-48 object-cover">
                <div class="p-6">
                    <h3 class="text-xl font-semibold text-green-400 mb-2">${item.title}</h3>
                    <p class="text-gray-300 text-sm">${item.description.substring(0, 100)}...</p>
                    <button data-id="${item.id}" class="view-details mt-4 bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-full text-sm transition duration-300 focus:outline-none focus:ring-2 focus:ring-green-500">Ver Detalhes</button>
                </div>
            `;
            acervoItemsContainer.appendChild(itemDiv);
        }

        // Carregar e exibir todos os itens do acervo
        acervoData.forEach(item => displayAcervoItem(item));

        // Adicionar evento para abrir o modal quando "Ver Detalhes" for clicado
        acervoItemsContainer.addEventListener('click', function(event) {
            if (event.target.classList.contains('view-details')) {
                const itemId = parseInt(event.target.dataset.id);
                const item = acervoData.find(i => i.id === itemId);

                if (item) {
                    modalTitle.textContent = item.title;
                    modalImage.src = item.image;
                    modalImage.alt = item.title;
                    modalDescription.textContent = item.description;
                    modalDetails.textContent = item.details;
                    itemModal.classList.remove('hidden');
                    document.body.style.overflow = 'hidden';
                }
            }
        });

        // Fechar o modal
        closeModalButton.addEventListener('click', function() {
            itemModal.classList.add('hidden');
            document.body.style.overflow = '';
        });

        // Fechar o modal clicando fora dele
        itemModal.addEventListener('click', function(event) {
            if (event.target === itemModal) {
                itemModal.classList.add('hidden');
                document.body.style.overflow = '';
            }
        });
    }
});