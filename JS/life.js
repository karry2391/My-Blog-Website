// 主题切换功能
function toggleTheme() {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', newTheme);

    const themeIcon = document.getElementById('theme-icon');
    themeIcon.textContent = newTheme === 'dark' ? '🌑' : '☀️';

    localStorage.setItem('theme', newTheme);
}

// 初始化主题
document.addEventListener('DOMContentLoaded', () => {
    const savedTheme = localStorage.getItem('theme') || 'light';
    document.documentElement.setAttribute('data-theme', savedTheme);
    document.getElementById('theme-icon').textContent = savedTheme === 'dark' ? '🌑' : '☀️';
});

/**
 * 放大图片并显示遮罩层
 * @param {HTMLElement} image - 被点击的图片
 */
function toggleZoom(image) {
    const overlay = document.querySelector('.zoom-overlay');

    if (!image.classList.contains('zoomed')) {
        image.classList.add('zoomed');
        overlay.classList.add('active');
    } else {
        image.classList.remove('zoomed');
        overlay.classList.remove('active');
    }
}

/**
 * 点击遮罩层关闭放大的图片
 */
function closeZoom() {
    const zoomedImage = document.querySelector('.split-image.zoomed');
    const overlay = document.querySelector('.zoom-overlay');

    if (zoomedImage) {
        zoomedImage.classList.remove('zoomed');
    }
    overlay.classList.remove('active');
}