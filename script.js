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
    
    // ===== ПАРАЛЛАКС ЭФФЕКТ ДЛЯ ПОЛУКРУГОВ =====
    const circles = document.querySelectorAll('.circle');
    let lastScrollY = window.scrollY;
    let ticking = false;
    
    function updateCircles() {
        const scrollY = window.scrollY;
        const maxScroll = document.body.scrollHeight - window.innerHeight;
        const scrollPercent = Math.min(scrollY / maxScroll, 1);
        
        circles.forEach((circle, index) => {
            // Разные скорости движения для разных кругов
            const speed = 0.5 + (index * 0.2);
            const direction = index % 2 === 0 ? 1 : -1;
            
            // Движение по X и Y с разной амплитудой
            const moveX = scrollPercent * 200 * direction * speed;
            const moveY = scrollPercent * 150 * (index < 3 ? 1 : -1) * speed;
            
            // Масштабирование
            const scale = 1 + scrollPercent * 0.3;
            
            // Поворот для некоторых кругов
            const rotate = index > 1 ? scrollPercent * 30 : 0;
            
            // Применяем трансформацию
            circle.style.transform = `translate(${moveX}px, ${moveY}px) scale(${scale}) rotate(${rotate}deg)`;
        });
        
        ticking = false;
    }
    
    window.addEventListener('scroll', function() {
        lastScrollY = window.scrollY;
        
        if (!ticking) {
            window.requestAnimationFrame(function() {
                updateCircles();
                ticking = false;
            });
            ticking = true;
        }
    });
    
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
    
    // ===== АНИМАЦИЯ ПОЯВЛЕНИЯ ЭЛЕМЕНТОВ =====
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