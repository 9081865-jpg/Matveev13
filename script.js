// Ждем загрузки страницы
document.addEventListener('DOMContentLoaded', function() {
    
    // ===== МОДАЛЬНОЕ ОКНО =====
    const orderBtn = document.getElementById('orderBtn');
    const modal = document.getElementById('orderModal');
    const closeButtons = document.querySelectorAll('.close-modal, .modal-close-btn');
    
    // Открыть модальное окно
    if (orderBtn) {
        orderBtn.addEventListener('click', function() {
            modal.classList.add('show');
            document.body.style.overflow = 'hidden'; // запретить скролл страницы
        });
    }
    
    // Закрыть модальное окно (на крестик или кнопку "Хорошо")
    closeButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            modal.classList.remove('show');
            document.body.style.overflow = ''; // вернуть скролл
        });
    });
    
    // Закрыть при клике вне модального окна
    window.addEventListener('click', function(event) {
        if (event.target === modal) {
            modal.classList.remove('show');
            document.body.style.overflow = '';
        }
    });
    
    // ===== АНИМАЦИЯ ПОЛУКРУГОВ ПРИ СКРОЛЛЕ =====
    const circles = document.querySelectorAll('.circle');
    
    window.addEventListener('scroll', function() {
        const scrollY = window.scrollY;
        const maxScroll = document.body.scrollHeight - window.innerHeight;
        const scrollPercent = scrollY / maxScroll;
        
        circles.forEach((circle, index) => {
            // Двигаем круги в зависимости от прокрутки
            const moveX = scrollPercent * 100 * (index % 2 === 0 ? 1 : -1);
            const moveY = scrollPercent * 50 * (index < 2 ? 1 : -1);
            
            // Добавляем движение к существующей анимации
            circle.style.transform = `translate(${moveX}px, ${moveY}px) scale(${1 + scrollPercent * 0.2})`;
        });
    });
    
    // ===== ПЛАВНЫЙ СКРОЛЛ ДЛЯ МЕНЮ =====
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
});