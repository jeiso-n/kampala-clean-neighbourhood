/**
 * Kampala Clean Neighbourhood - Main Core Engine
 * Victoria University Kampala - 1315 ST
 */

document.addEventListener('DOMContentLoaded', () => {
    initMobileMenu();
    initHighContrast();
    setActiveNav();
});

function initMobileMenu() {
    const toggleBtn = document.querySelector('.mobile-menu-toggle');
    const navMenu = document.querySelector('.nav-menu');

    if (toggleBtn && navMenu) {
        toggleBtn.addEventListener('click', () => {
            const isExpanded = toggleBtn.getAttribute('aria-expanded') === 'true';
            toggleBtn.setAttribute('aria-expanded', !isExpanded);
            navMenu.classList.toggle('is-active');
        });

        document.addEventListener('click', (e) => {
            if (!toggleBtn.contains(e.target) && !navMenu.contains(e.target)) {
                navMenu.classList.remove('is-active');
                toggleBtn.setAttribute('aria-expanded', 'false');
            }
        });
    }
}

function initHighContrast() {
    const btn = document.querySelector('.contrast-toggle-btn');
    const isHighContrast = localStorage.getItem('kcn_high_contrast') === 'enabled';

    if (isHighContrast) {
        document.body.classList.add('high-contrast');
        if (btn) btn.setAttribute('aria-pressed', 'true');
    }

    if (btn) {
        btn.addEventListener('click', () => {
            const active = document.body.classList.toggle('high-contrast');
            btn.setAttribute('aria-pressed', active);
            localStorage.setItem('kcn_high_contrast', active ? 'enabled' : 'disabled');
            showToast(active ? 'High contrast mode turned ON' : 'Standard contrast mode restored', 'info');
        });
    }
}

function setActiveNav() {
    const currentPath = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('.nav-link');

    navLinks.forEach(link => {
        const href = link.getAttribute('href');
        if (href === currentPath || (currentPath === '' && href === 'index.html')) {
            link.classList.add('active');
            link.setAttribute('aria-current', 'page');
        }
    });
}

function showToast(message, type = 'info') {
    let container = document.querySelector('.toast-container');
    if (!container) {
        container = document.createElement('div');
        container.className = 'toast-container';
        container.setAttribute('aria-live', 'polite');
        document.body.appendChild(container);
    }

    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    toast.setAttribute('role', 'alert');
    toast.innerHTML = `
    <span>${message}</span>
    <button style="background:none; border:none; color:#fff; cursor:pointer; font-weight:bold; font-size:1.1rem;" aria-label="Close message">&times;</button>
  `;

    toast.querySelector('button').addEventListener('click', () => toast.remove());
    container.appendChild(toast);

    setTimeout(() => {
        if (toast.parentElement) toast.remove();
    }, 4500);
}