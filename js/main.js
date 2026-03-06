// ========================================
// BRIAN LOGÍSTICA Y RECREACIÓN
// JavaScript - Diseño Moderno
// ========================================

// Datos de ejemplo para productos
let products = [];

// Función para cargar productos en la página
function loadProducts() {
    const container = document.getElementById('productos-container');
    if (!container) return;

    // Obtener productos de localStorage
    let products = [];
    if (localStorage.products) {
        try {
            products = JSON.parse(localStorage.products);
        } catch (e) {
            console.error('Error parsing products from localStorage:', e);
            products = [];
        }
    }

    container.innerHTML = '';

    if (products.length === 0) {
        // Productos de ejemplo por defecto
        const defaultProducts = [
            {
                name: 'MEGA INFLABLE 🎈',
                description: '3 horas de servicio • 1 mega inflable gigante disponible para niños en edades máximo de 10 años • Incluye operador logístico encargado del uso adecuado • Funciona con motor a gasolina • Se requiere instalar en espacios amplios, zonas planas libres de piedras, árboles y cables bajos.',
                price: 300000,
                image: 'Inflable10.png'
            },
            {
                name: 'PAQUETE FULL INFANTIL 🎉',
                description: '3 Horas de servicio • 1 Animadora principal • Personaje (muñecón) • Parlante activo profesional • Montaje de Luces de ambientación • Dinámicas de integración, concursos para niños y acompañantes • Hora loca infantil',
                price: 700000,
                image: 'personaje3.jpeg'
            },
            {
                name: 'ACUÁTICOS 🌊',
                description: '3 HORAS DE SERVICIO • 1 Inflable acuático tipo tobogán con capacidad disponible para niños en edades máximas de 10 años en turnos dirigidos por su respectivo operador logístico',
                price: 500000,
                image: 'InflableGrande.png'
            },
            {
                name: 'SONIDO PROFESIONAL 🔊',
                description: 'DJ crossover tocando música en vivo acorde al evento y al gusto de los invitados • Montaje de sonido profesional • 2 Parlantes activos de 15 pulgadas • 2 Bajos activos de 18 pulgadas • Luces de ambientación y Humo',
                price: 800000,
                image: 'Equipo.png'
            },
            {
                name: 'INFLABLE GIGANTE 🏰',
                description: '3 Horas de servicio • 1 Inflable gigante con capacidad de uso hasta por 5 niños en tiempos dirigidos por su respectivo operador logístico • Funciona con motor a gasolina',
                price: 260000,
                image: 'InflableGrande.png'
            },
            {
                name: 'INFLABLE PULPO ACUÁTICO 🐙',
                description: 'INFLABLES PULPO ACUÁTICO • PISTA DE JABÓN Y PISCINA • 3 HORAS DE SERVICIO • Pulpo acuático tipo pista de jabón, disponible para todas las edades • Funciona con motor a gasolina • Se requiere contar con conexión de agua a máximo 7 metros del punto de instalación',
                price: 400000,
                image: 'Pulpo.png'
            },
            {
                name: 'INFLABLE PALO LOCO 🎢',
                description: '3 HORAS DE SERVICIO • Inflable palo loco para todas las edades, ingreso máximo de 2 personas • Incluye operador logístico • Funciona con motor a gasolina • Se requiere contar con conexión de energía a 110W a un máximo de 7 metros del punto de instalación',
                price: 500000,
                image: 'InflableMario.png'
            },
            {
                name: 'HORA LOCA SHOW 🎭',
                description: '1 HORA DE SERVICIO • 2 Bailarinas • Bailes coreográficos tradicionales de la hora loca y ritmos de reciente tendencia dirigidos por nuestro animador principal y sus bailarinas, cerrando el show con la sensacional batalla de los géneros',
                price: 300000,
                image: 'HoraLoca.png'
            },
            {
                name: 'CAÑÓN DE ESPUMA 💦',
                description: '3 Horas de servicio • 3 lanzamientos dirigidos de aproximadamente 15 minutos cada uno o 1 lanzamiento continuo hasta agotar insumos • Incluye 5 galones de espumógeno especial • Se requiere contar con conexión de agua y energía a 110W a un máximo de 7 metros del punto de instalación',
                price: 500000,
                image: 'cañon.png'
            },
            {
                name: 'TRAMPOLÍN 🦘',
                description: 'TRAMPOLÍN (BRINCA-BRINCA) • 3 HORAS DE SERVICIO • Disponible para niños en edades de máximo 10 años en turnos dirigidos por su respectivo operador logístico',
                price: 200000,
                image: 'brinca.jpeg'
            },
            {
                name: 'CASTILLO 🏰',
                description: 'INFLABLE TIPO CASTILLO • 3 HORAS DE SERVICIO • Capacidad de uso hasta por 4 niños en turnos dirigidos por su respectivo operador logístico • Edad máxima 10 años • Se requiere conexión de energía a 110W a menos de 5 metros del punto de instalación',
                price: 200000,
                image: 'InflablePequeño.png'
            },
            {
                name: 'BÁSICO INFANTIL 🎈',
                description: '3 Horas de servicio • 1 Animadora • Concursos y dinámicas de integración para niños y acompañantes • Hora loca infantil',
                price: 200000,
                image: 'pintura1.jpeg'
            },
            {
                name: 'REVELACIÓN/BABY SHOWER 👶',
                description: '3 Horas de servicio • 1 Animadora • Parlante activo profesional • Luces de ambientación • Dinámicas de integración y concursos acordes a la celebración',
                price: 400000,
                image: 'Revelacion.png'
            },
            {
                name: 'NEÓN PARTY INFANTIL 💡',
                description: '3 Horas de servicio • 1 Animadora • Parlante activo profesional • Luces de ambientación • Dinámicas de integración y concursos para niños y acompañantes • Hora loca infantil',
                price: 400000,
                image: 'Neon.png'
            }
        ];

        products = defaultProducts;
    }

    if (products.length === 0) {
        container.innerHTML = '<p style="text-align: center; color: #6B7280; font-size: 1.2rem; padding: 2rem;">🎁 ¡Próximamente más productos! 🎁</p>';
        return;
    }

    products.forEach(product => {
        const productCard = document.createElement('div');
        productCard.className = 'product-card';

        const imageSrc = product.image || 'img/default_product.jpg';

        productCard.innerHTML = `
            <img src="${imageSrc}" alt="${product.name}" class="product-image" onerror="this.onerror=null; this.src='data:image/svg+xml;utf8,<svg xmlns=\\'http://www.w3.org/2000/svg\\' viewBox=\\'0 0 100 100\\'><rect fill=\\'%23FBBF24\\' width=\\'100\\' height=\\'100\\'/><text x=\\'50\\' y=\\'55\\' font-size=\\'40\\' text-anchor=\\'middle\\' fill=\\'%231E3A8A\\'>🎁</text></svg>';">
            <h3 class="product-title">${product.name}</h3>
            <p class="product-description">${product.description}</p>
            <p class="product-price">$${product.price.toLocaleString('es-CO')}</p>
        `;

        container.appendChild(productCard);
    });
}

// Función para manejar el envío del formulario de contacto
function setupContactForm() {
    const form = document.getElementById('contactForm');
    if (!form) return;

    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const nombre = document.getElementById('nombre').value;
        const email = document.getElementById('email').value;
        const telefono = document.getElementById('telefono').value;
        const mensaje = document.getElementById('mensaje').value;

        // Guardar mensaje en localStorage para el admin
        const messageData = {
            nombre: nombre,
            email: email,
            telefono: telefono,
            mensaje: mensaje
        };
        
        // Obtener mensajes existentes
        const messages = localStorage.getItem('contactMessages');
        const messagesArray = messages ? JSON.parse(messages) : [];
        
        // Agregar nuevo mensaje
        messagesArray.unshift({
            ...messageData,
            timestamp: new Date().toISOString(),
            read: false
        });
        
        // Guardar en localStorage
        localStorage.setItem('contactMessages', JSON.stringify(messagesArray));

        alert(`¡Gracias ${nombre}! 🎉\n\nHemos recibido tu mensaje. Nos pondremos en contacto contigo pronto al correo ${email} o al teléfono ${telefono}.`);
        
        form.reset();
    });
}

// Función para efecto de scroll suave en navegación
function setupSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                const headerOffset = 100;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Función para animación de elementos al hacer scroll
function setupScrollAnimations() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    const animatedElements = document.querySelectorAll('.service-card, .product-card, .event-item, .contact-item');
    
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
}

// Función para el slider de eventos
function setupEventsSlider() {
    const slider = document.getElementById('eventsSlider');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    
    if (!slider || !prevBtn || !nextBtn) return;
    
    const scrollAmount = 300;
    
    prevBtn.addEventListener('click', () => {
        slider.scrollBy({
            left: -scrollAmount,
            behavior: 'smooth'
        });
    });
    
    nextBtn.addEventListener('click', () => {
        slider.scrollBy({
            left: scrollAmount,
            behavior: 'smooth'
        });
    });
    
    // También permitir arrastrar con el mouse
    let isDown = false;
    let startX;
    let scrollLeft;
    
    slider.addEventListener('mousedown', (e) => {
        isDown = true;
        startX = e.pageX - slider.offsetLeft;
        scrollLeft = slider.scrollLeft;
        slider.style.cursor = 'grabbing';
    });
    
    slider.addEventListener('mouseleave', () => {
        isDown = false;
        slider.style.cursor = 'grab';
    });
    
    slider.addEventListener('mouseup', () => {
        isDown = false;
        slider.style.cursor = 'grab';
    });
    
    slider.addEventListener('mousemove', (e) => {
        if (!isDown) return;
        e.preventDefault();
        const x = e.pageX - slider.offsetLeft;
        const walk = (x - startX) * 2;
        slider.scrollLeft = scrollLeft - walk;
    });
}

// Función para el slider de servicios
function setupServicesSlider() {
    const slider = document.getElementById('servicesSlider');
    const prevBtn = document.getElementById('servicesPrevBtn');
    const nextBtn = document.getElementById('servicesNextBtn');
    
    if (!slider || !prevBtn || !nextBtn) return;
    
    const scrollAmount = 340;
    
    prevBtn.addEventListener('click', () => {
        slider.scrollBy({
            left: -scrollAmount,
            behavior: 'smooth'
        });
    });
    
    nextBtn.addEventListener('click', () => {
        slider.scrollBy({
            left: scrollAmount,
            behavior: 'smooth'
        });
    });
    
    // También permitir arrastrar con el mouse
    let isDown = false;
    let startX;
    let scrollLeft;
    
    slider.addEventListener('mousedown', (e) => {
        isDown = true;
        startX = e.pageX - slider.offsetLeft;
        scrollLeft = slider.scrollLeft;
        slider.style.cursor = 'grabbing';
    });
    
    slider.addEventListener('mouseleave', () => {
        isDown = false;
        slider.style.cursor = 'grab';
    });
    
    slider.addEventListener('mouseup', () => {
        isDown = false;
        slider.style.cursor = 'grab';
    });
    
    slider.addEventListener('mousemove', (e) => {
        if (!isDown) return;
        e.preventDefault();
        const x = e.pageX - slider.offsetLeft;
        const walk = (x - startX) * 2;
        slider.scrollLeft = scrollLeft - walk;
    });
}

// Cargar contenido cuando se cargue la página
document.addEventListener('DOMContentLoaded', function() {
    try {
        loadProducts();
        setupContactForm();
        setupSmoothScroll();
        setupScrollAnimations();
        setupEventsSlider();
        setupServicesSlider();
        
        console.log('¡Página cargada exitosamente! 🎉');
    } catch (error) {
        console.error('Error loading content:', error);
    }
});
