// Mobile menu functionality
// Product details data
const productDetails = {
    'Premium Flour': {
        description: 'Our premium flour is milled from the finest wheat grains, ensuring superior quality for all your baking needs.',
        specifications: [
            'Protein Content: 12-14%',
            'Moisture: <14%',
            'Ash Content: 0.5-0.6%',
            'Packaging: 1kg, 5kg, 10kg, 50kg'
        ],
        applications: [
            'Bread making',
            'Pastries',
            'General baking',
            'Commercial use'
        ]
    },
    'Pure Cooking Oil': {
        description: 'High-quality cooking oil that\'s perfect for all your culinary needs. Cholesterol-free and rich in nutrients.',
        specifications: [
            'Free Fatty Acid: <0.15%',
            'Moisture: <0.1%',
            'Iodine Value: 125-140',
            'Packaging: 1L, 2L, 5L'
        ],
        applications: [
            'Frying',
            'Baking',
            'Cooking',
            'Industrial use'
        ]
    },
    'Specialty Products': {
        description: 'Custom-blended products designed for specific industrial and commercial applications.',
        specifications: [
            'Custom specifications',
            'Quality certified',
            'Bulk quantities available',
            'Industrial packaging'
        ],
        applications: [
            'Food processing',
            'Bakery chains',
            'Restaurants',
            'Hotels'
        ]
    }
};

// Initialize AOS
AOS.init({
    duration: 800,
    easing: 'ease-in-out',
    once: true
});



document.addEventListener('DOMContentLoaded', function() {
    // Initialize Swiper
    const productSlider = new Swiper('.product-slider', {
        slidesPerView: 1,
        spaceBetween: 30,
        loop: true,
        pagination: {
            el: '.swiper-pagination',
            clickable: true
        },
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev'
        },
        breakpoints: {
            640: {
                slidesPerView: 2
            },
            1024: {
                slidesPerView: 3
            }
        }
    });
    // Language selector
    const languageSelect = document.getElementById('languageSelect');
    languageSelect.addEventListener('change', function() {
        showNotification(`Language changed to ${this.options[this.selectedIndex].text}`);
    });

    // Cookie consent
    const cookieConsent = document.getElementById('cookieConsent');
    const acceptCookies = document.getElementById('acceptCookies');

    if (!localStorage.getItem('cookiesAccepted')) {
        setTimeout(() => {
            cookieConsent.classList.remove('translate-y-full');
        }, 1000);
    }

    acceptCookies.addEventListener('click', () => {
        localStorage.setItem('cookiesAccepted', 'true');
        cookieConsent.classList.add('translate-y-full');
    });

    // Product modal
    const modal = document.getElementById('productModal');
    const closeModal = document.getElementById('closeModal');
    const modalTitle = document.getElementById('modalTitle');
    const modalContent = document.getElementById('modalContent');

    document.querySelectorAll('.view-product-details').forEach(button => {
        button.addEventListener('click', () => {
            const productName = button.parentElement.querySelector('h3').textContent;
            const details = productDetails[productName];

            modalTitle.textContent = productName;
            modalContent.innerHTML = `
                <div class="space-y-6">
                    <p class="text-gray-600">${details.description}</p>
                    
                    <div>
                        <h4 class="font-semibold mb-2">Specifications:</h4>
                        <ul class="list-disc pl-5 space-y-1 text-gray-600">
                            ${details.specifications.map(spec => `<li>${spec}</li>`).join('')}
                        </ul>
                    </div>

                    <div>
                        <h4 class="font-semibold mb-2">Applications:</h4>
                        <ul class="list-disc pl-5 space-y-1 text-gray-600">
                            ${details.applications.map(app => `<li>${app}</li>`).join('')}
                        </ul>
                    </div>
                </div>
            `;

            modal.classList.remove('hidden');
        });
    });

    closeModal.addEventListener('click', () => {
        modal.classList.add('hidden');
    });

    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.classList.add('hidden');
        }
    });

    // Live chat widget
    const chatWidget = document.getElementById('liveChatWidget');
    const closeChatWidget = document.getElementById('closeChatWidget');
    const chatInput = document.getElementById('chatInput');
    const sendMessage = document.getElementById('sendMessage');
    const chatMessages = document.getElementById('chatMessages');

    let chatOpen = false;

    function toggleChat() {
        chatWidget.classList.toggle('hidden');
        setTimeout(() => {
            chatWidget.classList.toggle('translate-y-full');
            chatOpen = !chatOpen;
        }, 50);
    }

    document.querySelector('.fa-whatsapp').parentElement.addEventListener('click', (e) => {
        if (!chatOpen) {
            e.preventDefault();
            toggleChat();
        }
    });

    closeChatWidget.addEventListener('click', toggleChat);

    function addMessage(message, isUser = true) {
        const messageDiv = document.createElement('div');
        messageDiv.className = `mb-4 ${isUser ? 'text-right' : ''}`;
        messageDiv.innerHTML = `
            <div class="${isUser ? 'bg-blue-600 text-white ml-auto' : 'bg-gray-200 text-gray-700'} inline-block px-4 py-2 rounded-lg max-w-[80%]">
                ${message}
            </div>
        `;
        chatMessages.appendChild(messageDiv);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }

    function handleMessage() {
        const message = chatInput.value.trim();
        if (message) {
            addMessage(message);
            chatInput.value = '';

            // Simulate response
            setTimeout(() => {
                addMessage('Thank you for your message. Our team will get back to you soon.', false);
            }, 1000);
        }
    }

    sendMessage.addEventListener('click', handleMessage);
    chatInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            handleMessage();
        }
    });

    // Notification system
    function showNotification(message, duration = 3000) {
        const toast = document.getElementById('notificationToast');
        const messageEl = document.getElementById('notificationMessage');
        
        messageEl.textContent = message;
        toast.classList.remove('translate-x-full');
        
        setTimeout(() => {
            toast.classList.add('translate-x-full');
        }, duration);
    }

    // Hide loader when page is loaded
    const loader = document.getElementById('loader');
    window.addEventListener('load', () => {
        loader.style.display = 'none';
    });
    // Navbar scroll effect
    const navbar = document.getElementById('navbar');
    let lastScroll = 0;

    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;

        if (currentScroll <= 0) {
            navbar.classList.remove('scrolled');
        }
        if (currentScroll > lastScroll && !navbar.classList.contains('scroll-down')) {
            navbar.classList.remove('scroll-up');
            navbar.classList.add('scroll-down');
        }
        if (currentScroll < lastScroll && navbar.classList.contains('scroll-down')) {
            navbar.classList.remove('scroll-down');
            navbar.classList.add('scroll-up');
        }
        if (currentScroll > 100) {
            navbar.classList.add('scrolled');
        }

        lastScroll = currentScroll;
    });

    // Back to top button
    const backToTopButton = document.getElementById('backToTop');
    
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            backToTopButton.classList.remove('hidden');
        } else {
            backToTopButton.classList.add('hidden');
        }
    });

    backToTopButton.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // Mobile menu
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');

    mobileMenuButton.addEventListener('click', function() {
        mobileMenu.classList.toggle('hidden');
    });

    // Close mobile menu when clicking a link
    const mobileLinks = mobileMenu.querySelectorAll('a');
    mobileLinks.forEach(link => {
        link.addEventListener('click', () => {
            mobileMenu.classList.add('hidden');
        });
    });

    // Smooth scroll for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Add parallax effect to hero section
    window.addEventListener('scroll', () => {
        const hero = document.querySelector('#home');
        const scrolled = window.pageYOffset;
        hero.style.backgroundPositionY = -(scrolled * 0.5) + 'px';
    });

    // Animate elements on scroll
    const animateElements = () => {
        const elements = document.querySelectorAll('[data-aos]');
        elements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const elementVisible = 150;
            
            if (elementTop < window.innerHeight - elementVisible) {
                element.classList.add('aos-animate');
            }
        });
    };

    window.addEventListener('scroll', animateElements);

    // Form submission handling
    const contactForm = document.querySelector('form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form values
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const message = document.getElementById('message').value;

            // Basic form validation
            if (!name || !email || !message) {
                alert('Please fill in all fields');
                return;
            }

            // Here you would typically send the form data to a server
            // For now, we'll just show a success message
            // Show success message with animation
            const successMessage = document.createElement('div');
            successMessage.className = 'fixed bottom-4 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg animate-fade-in';
            successMessage.textContent = 'Thank you for your message! We will get back to you soon.';
            document.body.appendChild(successMessage);

            // Remove message after 3 seconds
            setTimeout(() => {
                successMessage.classList.add('animate-fade-out');
                setTimeout(() => {
                    document.body.removeChild(successMessage);
                }, 300);
            }, 3000);
            contactForm.reset();
        });
    }

    // Animate elements on scroll
    const animateOnScroll = () => {
        const elements = document.querySelectorAll('.animate-fade-in');
        elements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const elementVisible = 150;
            
            if (elementTop < window.innerHeight - elementVisible) {
                element.classList.add('animate-fade-in');
            }
        });
    };

    window.addEventListener('scroll', animateOnScroll);
});
