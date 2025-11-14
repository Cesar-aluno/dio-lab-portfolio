document.addEventListener('DOMContentLoaded', () => {
    // 1. Funcionalidade de Alternância de Tema (Dark/Light Mode)
    const toggleThemeButton = document.getElementById('toggleTheme');
    const htmlElement = document.documentElement;
    const themeKey = 'portfolioTheme'; // Chave para localStorage

    // Função para aplicar o tema salvo ou o padrão 'dark'
    const applyTheme = (theme) => {
        htmlElement.setAttribute('data-theme', theme);
        // Atualiza o ícone (sol para light, lua para dark)
        toggleThemeButton.classList.toggle('bi-sun', theme === 'dark');
        toggleThemeButton.classList.toggle('bi-moon-fill', theme === 'light');
    };

    // Carrega o tema do localStorage ao iniciar
    const savedTheme = localStorage.getItem(themeKey) || 'dark';
    applyTheme(savedTheme);

    // Adiciona o listener para alternar o tema ao clicar
    toggleThemeButton.addEventListener('click', () => {
        const currentTheme = htmlElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';

        applyTheme(newTheme);
        localStorage.setItem(themeKey, newTheme); // Salva a preferência
    });

    // 2. Funcionalidade do Acordeão (Accordion)
    const accordion = document.getElementById('accordion');

    // Verifica se o acordeão existe no HTML
    if (accordion) {
        accordion.addEventListener('click', (event) => {
            const header = event.target.closest('.accordion__header');
            
            if (header) {
                const item = header.parentElement;
                const body = item.querySelector('.accordion__body');
                const isActive = item.classList.contains('active');

                // Fecha todos os outros itens
                document.querySelectorAll('.accordion__item.active').forEach(activeItem => {
                    if (activeItem !== item) {
                        activeItem.classList.remove('active');
                    }
                });

                // Alterna o estado do item clicado
                if (isActive) {
                    item.classList.remove('active');
                } else {
                    item.classList.add('active');
                }
            }
        });
    }

    // 3. Listener para navegação mobile e scroll suave (opcional, mas recomendado)
    document.querySelectorAll('.menu__link').forEach(link => {
        link.addEventListener('click', (e) => {
            const href = link.getAttribute('href');
            if (href.startsWith('#')) {
                e.preventDefault();
                const targetId = href.substring(1);
                const targetElement = document.getElementById(targetId);

                if (targetElement) {
                    targetElement.scrollIntoView({ behavior: 'smooth' });
                }
                
                // Remove 'active' de todos e adiciona ao clicado
                document.querySelectorAll('.menu__link').forEach(l => l.classList.remove('active'));
                link.classList.add('active');
            }
        });
    });

});