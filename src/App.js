import React, { useState, useEffect, useCallback } from 'react';

const setCookie = (name, value, days) => {
    let expires = "";
    if (days) {
        const date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + value + expires + "; path=/";
};

const getCookie = (name) => {
    const nameEQ = name + "=";
    const ca = document.cookie.split('; ');
    for (let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) === ' ') c = c.substring(1, c.length); 
        if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length); 
    }
    return null; 
};


// --- Header Component ---
const Header = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);

    // Toggle menu state for mobile
    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    // Scroll handler for changing header style (sticky effect)
    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 50) {
                setIsScrolled(true);
            } else {
                setIsScrolled(false);
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Smooth scroll function to target sections
    const smoothScroll = useCallback((event, targetId) => {
        event.preventDefault();
        const targetElement = document.getElementById(targetId);
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - (isScrolled ? 60 : 0), // Adjust for fixed header height
                behavior: 'smooth'
            });
            setIsMenuOpen(false); // Close mobile menu after navigation
        }
    }, [isScrolled]);

    return (
        <nav className={`fixed w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-gray-900 py-4 shadow-xl' : 'bg-transparent py-5'}`}>
            <div className="container mx-auto px-4 flex justify-end items-center"> {/* justify-end for moving all elements to the right */}
                {/* Mobile menu toggle button (burger icon) */}
                <button
                    className="md:hidden text-white focus:outline-none p-2 rounded-md hover:bg-gray-700 transition-colors z-[51] relative" // Changed z-index to z-[51]
                    onClick={toggleMenu}
                    aria-label="Toggle navigation"
                >
                    <div className={`w-7 h-0.5 bg-white transition-all duration-300 ${isMenuOpen ? 'transform rotate-45 translate-y-2' : ''}`}></div>
                    <div className={`w-7 h-0.5 bg-white transition-all duration-300 my-1 ${isMenuOpen ? 'opacity-0' : ''}`}></div>
                    <div className={`w-7 h-0.5 bg-white transition-all duration-300 ${isMenuOpen ? 'transform -rotate-45 -translate-y-2' : ''}`}></div>
                </button>

                {/* Mobile menu overlay */}
                {isMenuOpen && (
                    <div className="fixed inset-0 bg-black bg-opacity-70 z-40 md:hidden" onClick={toggleMenu}></div>
                )}

                {/* Menu links - conditional rendering for mobile (side slide-in) */}
                <div className={`fixed top-0 right-0 h-full w-64 bg-gray-900 shadow-xl z-50 transform transition-transform duration-300 ease-in-out md:static md:w-auto md:h-auto md:bg-transparent md:shadow-none md:transform-none md:block
                    ${isMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}>
                    <ul className="flex flex-col md:flex-row items-center justify-center h-full space-y-8 md:space-y-0 md:space-x-8 p-4 md:p-0">
                        <li><a href="#home" onClick={(e) => smoothScroll(e, 'home')} className="text-white hover:text-green-400 text-lg uppercase font-medium relative group pb-1">Главная <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-green-400 transition-all duration-300 group-hover:w-full"></span></a></li>
                        <li><a href="#about" onClick={(e) => smoothScroll(e, 'about')} className="text-white hover:text-green-400 text-lg uppercase font-medium relative group pb-1">Обо мне <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-green-400 transition-all duration-300 group-hover:w-full"></span></a></li>
                        <li><a href="#services" onClick={(e) => smoothScroll(e, 'services')} className="text-white hover:text-green-400 text-lg uppercase font-medium relative group pb-1">Услуги <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-green-400 transition-all duration-300 group-hover:w-full"></span></a></li>
                        <li><a href="#price" onClick={(e) => smoothScroll(e, 'price')} className="text-white hover:text-green-400 text-lg uppercase font-medium relative group pb-1">Стоимость <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-green-400 transition-all duration-300 group-hover:w-full"></span></a></li>
                        <li><a href="#portfolio" onClick={(e) => smoothScroll(e, 'portfolio')} className="text-white hover:text-green-400 text-lg uppercase font-medium relative group pb-1">Портфолио <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-green-400 transition-all duration-300 group-hover:w-full"></span></a></li>
                        <li><a href="#contact" onClick={(e) => smoothScroll(e, 'contact')} className="text-white hover:text-green-400 text-lg uppercase font-medium relative group pb-1">Контакты <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-green-400 transition-all duration-300 group-hover:w-full"></span></a></li>
                    </ul>
                </div>
            </div>
        </nav>
    );
};

// --- Hero Section Component ---
const HeroSection = ({ mediaType, mediaSrc }) => {
    return (
        <section
            id="home"
            className="relative h-screen flex items-center justify-center overflow-hidden text-center text-white font-inter"
        >
            {/* Responsive darkening overlay */}
            <div
                className="
                    absolute inset-0 bg-black z-10 animate-fadeIn
                    bg-opacity-40 sm:bg-opacity-50 md:bg-opacity-60 lg:bg-opacity-70
                "
            ></div>

            {/* Media background (video or image) */}
            {mediaType === 'video' ? (
                <video
                    className="absolute inset-0 w-full h-full object-cover z-0"
                    autoPlay
                    loop
                    muted
                    playsInline
                    preload="auto"
                >
                    <source src={mediaSrc} type="video/mp4" />
                    Ваш браузер не поддерживает тег видео.
                </video>
            ) : (
                <img
                    src={mediaSrc}
                    alt="Hero background"
                    className="absolute inset-0 w-full h-full object-cover z-0"
                    loading="eager"
                />
            )}

            {/* Hero section content */}
            <div className="relative z-20 px-4">
                <h1 className="text-5xl md:text-7xl lg:text-8xl font-light leading-tight mb-4 animate-fadeInDown">
                    Константин Прокопенко
                </h1>
                <p className="text-xl md:text-2xl lg:text-3xl text-gray-200 mb-8 animate-fadeInUp delay-200">
                    Профессиональный фотограф в Минске
                </p>
            </div>
        </section>
    );
};

// --- About Section Component ---
const AboutSection = () => {
    return (
        <section id="about" className="py-24 bg-gradient-to-br from-white to-gray-100 text-center font-inter">
            <div className="container mx-auto px-4 max-w-4xl">
                <div className="bg-white p-8 md:p-12 rounded-xl shadow-2xl transition-all duration-500 hover:shadow-3xl transform hover:-translate-y-1">
                    <h3 className="text-sm tracking-widest uppercase text-gray-500 mb-6 font-semibold">Профессиональный фотограф Константин Прокопенко</h3>
                    <h1 className="text-3xl md:text-4xl font-light leading-relaxed text-gray-800 text-left">
                        <span className="block mb-2">• Провожу индивидуальные и групповые съёмки.</span>
                        <span className="block mb-2">• Дипломированный специалист в области фотографии.</span>
                        <span className="block mb-2">• Работаю в разных стилях: от портретной фотографии до коммерческой съемки.</span>
                        <span className="block mb-2">• Подбираю индивидуальный подход к каждому клиенту для полноценного и яркого результата.</span>
                        <span className="block">• Приятный прайс, который могут позволить себе все!</span>
                    </h1>
                </div>
            </div>
        </section>
    );
};

// --- Service Card Component ---
const ServiceCard = ({ imageSrc, altText, title }) => {
    return (
        <div className="relative overflow-hidden rounded-xl shadow-xl group cursor-pointer transition-all duration-300 hover:shadow-2xl transform hover:-translate-y-2">
            <img
                src={imageSrc}
                className="w-full h-80 object-cover transform transition-transform duration-500 group-hover:scale-110"
                alt={altText}
                loading="lazy" // Lazy load images for performance
            />
            <div className="absolute inset-0 bg-black bg-opacity-60 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                <h1 className="text-white text-3xl font-bold text-shadow-lg">{title}</h1>
            </div>
        </div>
    );
};

// --- Services Section Component ---
const ServicesSection = () => {
    const services = [
        { id: 1, image: 'assets/images/studio.jpg', alt: 'Студийная фотосессия', title: 'Студийная фотосессия' },
        { id: 2, image: 'assets/images/portrait.jpg', alt: 'Портретная фотосессия', title: 'Портретная фотосессия' },
        { id: 3, image: 'assets/images/landscape.jpg', alt: 'Пейзажная фотосессия', title: 'Пейзажная фотосессия' },
        { id: 4, image: 'assets/images/street.jpg', alt: 'Уличная фотосессия', title: 'Уличная фотосессия' },
    ];

    return (
        <section id="services" className="py-24 bg-white text-center font-inter">
            <div className="container mx-auto px-4">
                <h1 className="text-4xl md:text-5xl font-light mb-12 text-gray-800 animate-slideInUp">Услуги</h1>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {services.map(service => (
                        <ServiceCard
                            key={service.id}
                            imageSrc={service.image}
                            altText={service.alt}
                            title={service.title}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
};

// --- Price Card Component ---
const PriceCard = ({ title, description, price, contactId }) => {
    const smoothScroll = useCallback((event, targetId) => {
        event.preventDefault();
        const targetElement = document.getElementById(targetId);
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 60, // Adjust for fixed header
                behavior: 'smooth'
            });
        }
    }, []);

    return (
        <div className="border-2 border-gray-200 rounded-xl p-8 m-4 flex flex-col items-center text-center shadow-xl bg-white transition-all duration-300 hover:shadow-2xl transform hover:-translate-y-2">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">{title}</h2>
            <p className="text-gray-600 mb-7 flex-grow text-lg">{description}</p>
            <h1 className="text-5xl font-extrabold text-green-600 mb-10">{price}</h1>
            <ul className="section-btn">
                <a href={`#${contactId}`} onClick={(e) => smoothScroll(e, contactId)} className="inline-block px-10 py-4 bg-blue-600 rounded-full text-white text-xl font-semibold shadow-md hover:bg-blue-700 transition-all duration-300 transform hover:scale-105 active:scale-95">
                    <span data-hover="Заказать съёмку">Заказать съёмку</span>
                </a>
            </ul>
        </div>
    );
};

// --- Price Section Component ---
const PriceSection = () => {
    const prices = [
        { id: 1, title: 'Студийная фотосессия', description: 'Фотосессия в студии в Минске', price: 'от 100BYN', contactId: 'contact' },
        { id: 2, title: 'Портретная фотосессия', description: 'Фотосессия в студии в Минске', price: 'от 100BYN', contactId: 'contact' },
        { id: 3, title: 'Пейзажная фотосессия', description: 'Фотосессия за городом на природе: везде, где душа пожелает', price: 'от 50BYN', contactId: 'contact' },
        { id: 4, title: 'Уличная фотосессия', description: 'Фотосессия в городе', price: 'от 50BYN', contactId: 'contact' },
    ];

    return (
        <section id="price" className="py-24 bg-gray-50 text-center font-inter">
            <div className="container mx-auto px-4">
                <h1 className="text-4xl md:text-5xl font-light mb-12 text-gray-800 animate-slideInUp">Стоимость</h1>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {prices.map(item => (
                        <PriceCard
                            key={item.id}
                            title={item.title}
                            description={item.description}
                            price={item.price}
                            contactId={item.contactId}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
};

// --- Portfolio Item Component ---
const PortfolioItem = ({ imageSrc, altText, title, description, link }) => {
    return (
        <a href={link} target="_blank" rel="noopener noreferrer" className="block relative overflow-hidden rounded-xl shadow-xl group cursor-pointer transition-all duration-300 hover:shadow-2xl transform hover:-translate-y-2 snap-center">
            <img
                src={imageSrc}
                className="w-full h-80 object-cover transform transition-transform duration-500 group-hover:scale-110"
                alt={altText}
                loading="lazy" // Lazy load images for performance
            />
            {/*<div className="absolute inset-0 bg-black bg-opacity-60 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500 p-4">
                <h2 className="text-white text-2xl font-bold text-shadow-lg text-center">{title}</h2>
            </div>*/}
            {/* Description below the image, always visible */}
            <div className="p-4 bg-white text-gray-800 text-center">
                <h3 className="text-xl font-semibold mb-2">{title}</h3> {/* Repeat title if it's the main heading for the card */}
                <p className="text-base text-gray-700 leading-relaxed">{description}</p> {/* Changed text-sm to text-base and added leading-relaxed */}
            </div>
        </a>
    );
};

// --- Portfolio Section Component ---
const PortfolioSection = () => {
    const portfolioItems = [
        { id: 1, image: 'assets/images/studio.jpg', alt: 'Студийная фотосессия', title: 'Студийная фотосессия', description: 'Профессиональная съемка в нашей уютной студии с использованием современного оборудования и различных фонов. Идеально подходит для индивидуальных портретов, семейных фото и креативных проектов. Мы поможем вам создать неповторимый образ и запечатлеть самые важные моменты.', link: '#' },
        { id: 2, image: 'assets/images/portrait.jpg', alt: 'Портретная фотосессия', title: 'Портретная фотосессия', description: 'Создание выразительных и глубоких портретов, отражающих вашу индивидуальность. Работаем как в студии, так и на выезде, подбирая идеальное освещение и ракурсы. Каждый снимок — это произведение искусства, подчеркивающее вашу уникальность.', link: '#' },
        { id: 3, image: 'assets/images/landscape.jpg', alt: 'Пейзажная фотосессия', title: 'Пейзажная фотосессия', description: 'Захватывающие дух фотографии природы и городских ландшафтов. Мы найдем самые живописные места, чтобы создать атмосферные и вдохновляющие снимки. Идеально для любителей природы и путешествий.', link: '#' },
        { id: 4, image: 'assets/images/street.jpg', alt: 'Уличная фотосессия', title: 'Уличная фотосессия', description: 'Динамичные и живые кадры в городской среде. Откройте для себя новые ракурсы и создайте уникальные фотографии на фоне городской архитектуры, улиц и парков. Идеально для модных съемок и городского стиля.', link: '#' },
    ];

    const scrollContainerRef = React.useRef(null);
    const [currentSlide, setCurrentSlide] = useState(0);

    // Function to scroll to a specific slide
    const scrollToSlide = useCallback((index) => {
        if (scrollContainerRef.current) {
            // Calculate the width of one item including its gap for precise scrolling
            const itemElement = scrollContainerRef.current.children[0];
            const itemWidth = itemElement ? itemElement.offsetWidth + 32 : 0; // 32px for gap-8

            scrollContainerRef.current.scrollTo({
                left: index * itemWidth,
                behavior: 'smooth'
            });
            setCurrentSlide(index);
        }
    }, []);

    // Effect to update active dot on scroll
    useEffect(() => {
        const currentRef = scrollContainerRef.current;
        if (!currentRef) return;

        const handleScroll = () => {
            const { scrollLeft, scrollWidth, clientWidth } = currentRef;
            // Approximate item width based on total scrollable width and number of items
            const totalItems = portfolioItems.length;
            const avgItemWidth = (scrollWidth - (totalItems - 1) * 32) / totalItems; // Account for gaps
            const newIndex = Math.round(scrollLeft / avgItemWidth);
            setCurrentSlide(newIndex);
        };

        currentRef.addEventListener('scroll', handleScroll);
        return () => currentRef.removeEventListener('scroll', handleScroll);
    }, [portfolioItems.length]);


    return (
        <section id="portfolio" className="py-24 bg-white text-center font-inter">
            <div className="container mx-auto px-4">
                <h1 className="text-4xl md:text-5xl font-light mb-12 text-gray-800 animate-slideInUp">Портфолио</h1>
                {/* Horizontal scrolling for mobile, grid for larger screens */}
                <div ref={scrollContainerRef} className="flex overflow-x-auto snap-x snap-mandatory pb-4 gap-8 md:grid md:grid-cols-2 lg:grid-cols-4 md:gap-8 hide-scrollbar">
                    {portfolioItems.map((item, index) => (
                        <div key={item.id} className="flex-shrink-0 w-[85%] sm:w-3/4 md:w-auto snap-center">
                            <PortfolioItem
                                imageSrc={item.image}
                                altText={item.alt}
                                title={item.title}
                                description={item.description}
                                link={item.link}
                            />
                        </div>
                    ))}
                </div>
                {/* Navigation dots for mobile only */}
                <div className="md:hidden flex justify-center mt-4 space-x-2">
                    {portfolioItems.map((_, index) => (
                        <button
                            key={index}
                            className={`w-3 h-3 rounded-full ${index === currentSlide ? 'bg-green-500' : 'bg-gray-400'} transition-colors duration-300`}
                            onClick={() => scrollToSlide(index)}
                            aria-label={`Go to slide ${index + 1}`}
                        ></button>
                    ))}
                </div>
            </div>
        </section>
    );
};

// --- Contact Section Component ---
const ContactSection = () => {
    return (
        <section id="contact" className="py-24 bg-gray-50 text-center font-inter">
            <div className="container mx-auto px-4">
                <h1 className="text-4xl md:text-5xl font-light mb-12 text-gray-800 animate-slideInUp">Контакты</h1>
                <p className="text-lg text-gray-700 max-w-2xl mx-auto mb-8">
                    Способы связи:
                </p>
                <a
                    href="https://t.me/photoprokopenko"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-full text-xl transition-all duration-300 transform hover:scale-105 shadow-lg active:scale-95"
                >
                    <i className="fab fa-telegram-plane mr-2"></i> Telegram
                </a>
            </div>
        </section>
    );
};

// --- Footer Component ---
const Footer = () => {
    return (
        <footer className="py-16 bg-gray-900 text-white text-center font-inter">
            <div className="container mx-auto px-4">
                <div className="flex flex-col md:flex-row justify-around items-center mb-10">
                    <div className="mb-8 md:mb-0">
                        <h2 className="text-2xl font-bold mb-4">Контакты</h2>
                        <p><a href="https://t.me/photoprokopenko" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors duration-300 text-lg">Telegram</a></p>
                    </div>
                    <div>
                        <h2 className="text-2xl font-bold mb-4">Социальные сети</h2>
                        <ul className="flex justify-center space-x-6">
                            <li>
                                <a
                                    href="https://t.me/photoprokopenko"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-gray-400 hover:text-green-400 text-3xl transition-transform duration-300 transform hover:scale-125"
                                    aria-label="Telegram"
                                >
                                    <i className="fab fa-telegram"></i>
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className="mt-12 border-t border-gray-700 pt-8">
                    <p className="text-gray-500 text-sm">&copy; 2024-2025 Константин Прокопенко</p>
                </div>
            </div>
        </footer>
    );
};

// --- Popup Component ---
const Popup = ({ onClose }) => {
    return (
        <>
            {/* Overlay */}
            <div
                className="fixed inset-0 bg-black bg-opacity-70 z-[999] flex items-center justify-center animate-fadeIn"
                onClick={onClose}
            ></div>
            {/* Popup window */}
            <div
                className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-gray-800 p-8 rounded-lg shadow-2xl text-center z-[1000] animate-slideIn text-white w-11/12 max-w-sm mx-auto md:w-full md:max-w-md border border-gray-700" // Adjusted width for better mobile readability
            >
                <p className="text-lg md:text-xl mb-6 leading-relaxed"> {/* Adjusted font size for readability */}
                    Константин сейчас находится в СИЗО и нуждается в нашей поддержке. Напишите ему письмо, чтобы он знал, что не один. Каждое слово имеет значение!
                </p>
                <a
                    href="https://forms.gle/R5wHT9W1zcAVqGyQ8"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block px-6 py-3 bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 text-white font-bold rounded-full shadow-md hover:shadow-xl transition-all duration-400 transform hover:scale-105 mb-4 animate-pulse-popup"
                    onClick={onClose}
                >
                    Отправить письмо
                </a>
                <button
                    onClick={onClose}
                    className="block w-auto mx-auto bg-gray-600 hover:bg-gray-700 text-white font-medium py-2 px-4 rounded-md transition-colors duration-300"
                >
                    Закрыть
                </button>
            </div>
        </>
    );
};

// --- 404 Not Found Page Component ---
const NotFoundPage = () => {
    return (
        <section className="flex-grow flex items-center justify-center bg-gray-100 text-center py-24 min-h-[calc(100vh-160px)]"> {/* Adjusted min-height */}
            <div className="bg-white p-8 md:p-12 rounded-xl shadow-2xl max-w-2xl mx-auto">
                <h1 className="text-6xl md:text-8xl font-bold text-gray-800 mb-4">404</h1>
                <p className="text-xl md:text-2xl text-gray-600 mb-8">
                    Извините, страница не найдена.
                </p>
                <a
                    href="#home"
                    className="inline-block px-8 py-3 bg-blue-600 text-white font-bold rounded-full text-lg hover:bg-blue-700 transition-colors duration-300"
                >
                    Вернуться на главную
                </a>
            </div>
        </section>
    );
};

// --- Main App Component ---
const App = () => {
    const [showPopup, setShowPopup] = useState(false);
    const [currentHash, setCurrentHash] = useState(window.location.hash);
    const validHashes = ['', '#home', '#about', '#services', '#price', '#portfolio', '#contact'];

    // Initialize popup visibility on load
    useEffect(() => {
        // Only show popup if it hasn't been closed before
        if (!getCookie("popupClosed")) {
            setShowPopup(true);
        }

        // Listener for hash changes for routing
        const handleHashChange = () => {
            setCurrentHash(window.location.hash);
        };
        window.addEventListener('hashchange', handleHashChange);
        return () => window.removeEventListener('hashchange', handleHashChange);
    }, []);

    // Close popup and set cookie
    const handleClosePopup = () => {
        setCookie("popupClosed", "true", 30); // Set cookie to remember popup was closed for 30 days
        setShowPopup(false);
    };

    const renderContent = () => {
        // If hash is not valid, show 404 page
        if (!validHashes.includes(currentHash)) {
            return (
                <div className="flex flex-col min-h-screen">
                    <Header />
                    <NotFoundPage />
                    <Footer />
                </div>
            );
        } else {
            // Otherwise, render the main site content
            return (
                <>
                    <Header />
                    {/*<HeroSection
                        mediaType="video" // Set to 'video' or 'image'
                        mediaSrc="assets/images/prokopenko_hero.jpg" // Video URL or image URL
                    />*/}
                    {/* Example for image background:*/}
                    <HeroSection
                        mediaType="image"
                        mediaSrc="assets/images/prokopenko_hero.jpg"
                    />

                    <AboutSection />
                    <ServicesSection />
                    <PriceSection />
                    <PortfolioSection />
                    <ContactSection />
                    <Footer />
                </>
            );
        }
    };

    return (
        <div className="font-inter antialiased">
            {renderContent()}

            {/* Floating Email button - only show on main pages, not on 404 */}
            {validHashes.includes(currentHash) && (
                <a
                    href="https://forms.gle/R5wHT9W1zcAVqGyQ8"
                    id="email-button"
                    className="fixed bottom-5 right-5 p-4 rounded-full shadow-lg bg-gradient-to-r from-purple-600 via-blue-500 to-green-500 text-white font-bold text-lg z-40 transition-all duration-300 hover:scale-105 active:scale-95 animate-pulseLight"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    Отправьте мне письмо
                </a>
            )}

            {/* Popup - only show if on a valid hash and not explicitly closed */}
            {showPopup && validHashes.includes(currentHash) && <Popup onClose={handleClosePopup} />}
        </div>
    );
};

export default App;