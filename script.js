document.addEventListener('DOMContentLoaded', function() {
    
    // ===== МОДАЛЬНОЕ ОКНО =====
    const orderBtn = document.getElementById('orderBtn');
    const modal = document.getElementById('orderModal');
    const closeButtons = document.querySelectorAll('.close-modal, .modal-close-btn');
    
    if (orderBtn) {
        orderBtn.addEventListener('click', function() {
            modal.classList.add('show');
            document.body.style.overflow = 'hidden';
        });
    }
    
    closeButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            modal.classList.remove('show');
            document.body.style.overflow = '';
        });
    });
    
    window.addEventListener('click', function(event) {
        if (event.target === modal) {
            modal.classList.remove('show');
            document.body.style.overflow = '';
        }
    });
    
    // ===== ЭФФЕКТ ПЕРЕХОДА ЦВЕТА КРУГА ПРИ СКРОЛЛЕ =====
    const circles = document.querySelectorAll('.circle');
    const hero = document.querySelector('.hero');
    const services = document.querySelector('.services');
    let ticking = false;
    
    // Функция для интерполяции цвета (плавный переход)
    function interpolateColor(color1, color2, percent) {
        // Парсим цвета из hex в rgb
        const r1 = parseInt(color1.substring(1,3), 16);
        const g1 = parseInt(color1.substring(3,5), 16);
        const b1 = parseInt(color1.substring(5,7), 16);
        
        const r2 = parseInt(color2.substring(1,3), 16);
        const g2 = parseInt(color2.substring(3,5), 16);
        const b2 = parseInt(color2.substring(5,7), 16);
        
        // Вычисляем промежуточный цвет
        const r = Math.round(r1 + (r2 - r1) * percent);
        const g = Math.round(g1 + (g2 - g1) * percent);
        const b = Math.round(b1 + (b2 - b1) * percent);
        
        return `rgb(${r}, ${g}, ${b})`;
    }
    
    function updateCirclesOnScroll() {
        const scrollY = window.scrollY;
        const windowHeight = window.innerHeight;
        
        // Получаем позиции секций
        const heroRect = hero.getBoundingClientRect();
        const servicesRect = services.getBoundingClientRect();
        
        // Расстояние от верха страницы до секций
        const heroTop = hero.offsetTop;
        const servicesTop = services.offsetTop;
        
        // Рассчитываем прогресс скролла между секциями
        const startScroll = heroTop;
        const endScroll = servicesTop;
        const currentScroll = scrollY;
        
        // Нормализуем значение от 0 до 1
        let progress = (currentScroll - startScroll) / (endScroll - startScroll);
        progress = Math.max(0, Math.min(1, progress)); // Ограничиваем от 0 до 1
        
        // Цвета: синий (#2563eb) и серый (#4b5563)
        const blueColor = '#2563eb';
        const grayColor = '#4b5563';
        
        // Плавно меняем цвет кругов в зависимости от прогресса
        circles.forEach((circle, index) => {
            // Для разных кругов разная чувствительность к прогрессу
            let circleProgress = progress;
            
            // Некоторые круги начинают меняться раньше/позже
            if (index === 0) circleProgress = Math.max(0, progress - 0.1);
            if (index === 1) circleProgress = Math.min(1, progress + 0.1);
            if (index === 2) circleProgress = progress * 1.2;
            if (index === 3) circleProgress = progress * 0.8;
            
            // Ограничиваем от 0 до 1
            circleProgress = Math.max(0, Math.min(1, circleProgress));
            
            // Получаем текущий цвет круга
            const currentColor = circle.style.background;
            
            // Если круг синий по умолчанию - меняем на серый и наоборот
            if (circle.classList.contains('circle-1') || circle.classList.contains('circle-3')) {
                // Синие круги становятся серыми
                const newColor = interpolateColor(blueColor, grayColor, circleProgress);
                circle.style.background = `linear-gradient(135deg, ${newColor} 0%, ${adjustColor(newColor, -20)} 100%)`;
            } else {
                // Серые круги становятся синими
                const newColor = interpolateColor(grayColor, blueColor, circleProgress);
                circle.style.background = `linear-gradient(135deg, ${newColor} 0%, ${adjustColor(newColor, -20)} 100%)`;
            }
            
            // Двигаем круги
            const speed = 0.5 + (index * 0.3);
            const direction = index % 2 === 0 ? 1 : -1;
            
            const moveX = progress * 300 * direction * speed;
            const moveY = progress * 200 * (index < 2 ? 1 : -1) * speed;
            const scale = 1 + progress * 0.4;
            const rotate = progress * 45;
            
            circle.style.transform = `translate(${moveX}px, ${moveY}px) scale(${scale}) rotate(${rotate}deg)`;
        });
        
        ticking = false;
    }
    
    // Вспомогательная функция для затемнения цвета
    function adjustColor(color, percent) {
        const rgb = color.match(/\d+/g);
        if (!rgb) return color;
        
        const r = Math.max(0, Math.min(255, parseInt(rgb[0]) + percent));
        const g = Math.max(0, Math.min(255, parseInt(rgb[1]) + percent));
        const b = Math.max(0, Math.min(255, parseInt(rgb[2]) + percent));
        
        return `rgb(${r}, ${g}, ${b})`;
    }
    
    window.addEventListener('scroll', function() {
        if (!ticking) {
            window.requestAnimationFrame(function() {
                updateCirclesOnScroll();
                ticking = false;
            });
            ticking = true;
        }
    });
    
    // Запускаем один раз для начальной установки
    updateCirclesOnScroll();
    
    // ===== ПЛАВНЫЙ СКРОЛЛ =====
    const navLinks = document.querySelectorAll('.nav-menu a');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
    
    // ===== АНИМАЦИЯ ПОЯВЛЕНИЯ =====
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.1 });
    
    document.querySelectorAll('.service-card, .stat, .about-text p').forEach(el => {
        el.classList.add('fade-in');
        observer.observe(el);
    });
});