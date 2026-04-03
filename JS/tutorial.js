document.addEventListener('DOMContentLoaded', function() {
    // 初始化课程滑块
    initCourseSlider();
    // 初始化动画效果
    initAnimations();
    // 初始化视频预览
    initVideoPreviews();
    // 初始化交互效果
    initInteractions();
});

// 课程滑块功能
function initCourseSlider() {
    const slider = document.querySelector('.slider-container');
    const slides = document.querySelectorAll('.course-slide');
    const prevBtn = document.querySelector('.slider-btn.prev');
    const nextBtn = document.querySelector('.slider-btn.next');
    
    let currentSlide = 0;
    const slideCount = slides.length;
    
    function updateSlider() {
        slider.style.transform = `translateX(-${currentSlide * 100}%)`;
    }
    
    prevBtn.addEventListener('click', () => {
        currentSlide = (currentSlide - 1 + slideCount) % slideCount;
        updateSlider();
    });
    
    nextBtn.addEventListener('click', () => {
        currentSlide = (currentSlide + 1) % slideCount;
        updateSlider();
    });
    
    // 自动播放
    setInterval(() => {
        currentSlide = (currentSlide + 1) % slideCount;
        updateSlider();
    }, 5000);
}

// 动画效果初始化
function initAnimations() {
    // 页面加载动画
    gsap.from('.category-header', {
        y: -50,
        opacity: 0,
        duration: 1,
        ease: 'power3.out'
    });
    
    gsap.from('.category-card', {
        y: 50,
        opacity: 0,
        duration: 0.8,
        stagger: 0.2,
        ease: 'power3.out'
    });
    
    // 滚动动画
    const elements = [
        '.path-card',
        '.video-card',
        '.project-card',
        '.discussion-item',
        '.group-item'
    ];
    
    elements.forEach(selector => {
        gsap.utils.toArray(selector).forEach(element => {
            gsap.from(element, {
                scrollTrigger: {
                    trigger: element,
                    start: 'top bottom-=100',
                    toggleActions: 'play none none reverse'
                },
                y: 50,
                opacity: 0,
                duration: 0.8,
                ease: 'power3.out'
            });
        });
    });
}

// 视频预览功能
function initVideoPreviews() {
    const videoCards = document.querySelectorAll('.video-card');
    
    videoCards.forEach(card => {
        const thumbnail = card.querySelector('.video-thumbnail');
        const playBtn = card.querySelector('.play-btn');
        
        playBtn.addEventListener('click', () => {
            // 这里可以添加视频播放逻辑
            console.log('播放视频');
        });
        
        // 鼠标悬停效果
        thumbnail.addEventListener('mouseenter', () => {
            gsap.to(playBtn, {
                opacity: 1,
                scale: 1.1,
                duration: 0.3
            });
        });
        
        thumbnail.addEventListener('mouseleave', () => {
            gsap.to(playBtn, {
                opacity: 0,
                scale: 1,
                duration: 0.3
            });
        });
    });
}

// 交互效果初始化
function initInteractions() {
    // 课程分类卡片效果
    const categoryCards = document.querySelectorAll('.category-card');
    categoryCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            gsap.to(card.querySelector('.category-icon'), {
                rotate: 360,
                duration: 0.8,
                ease: 'power2.out'
            });
        });
    });
    
    // 项目卡片效果
    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            gsap.to(card.querySelector('img'), {
                scale: 1.1,
                duration: 0.5
            });
        });
        
        card.addEventListener('mouseleave', () => {
            gsap.to(card.querySelector('img'), {
                scale: 1,
                duration: 0.5
            });
        });
    });
    
    // 加入小组按钮效果
    const joinButtons = document.querySelectorAll('.join-group');
    joinButtons.forEach(button => {
        button.addEventListener('click', function() {
            const originalText = this.textContent;
            this.textContent = '已加入';
            this.style.backgroundColor = '#4caf50';
            
            // 添加动画效果
            gsap.from(this, {
                scale: 0.8,
                duration: 0.3,
                ease: 'back.out'
            });
            
            // 5秒后恢复原状
            setTimeout(() => {
                this.textContent = originalText;
                this.style.backgroundColor = '';
            }, 5000);
        });
    });
}

// 进度条动画
function animateProgress() {
    const progressBars = document.querySelectorAll('.progress');
    progressBars.forEach(bar => {
        const targetWidth = bar.parentElement.dataset.progress || '0%';
        gsap.to(bar, {
            width: targetWidth,
            duration: 1.5,
            ease: 'power3.out'
        });
    });
}

// 添加页面滚动效果
window.addEventListener('scroll', () => {
    const elements = document.querySelectorAll('.fade-in');
    elements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const elementVisible = 150;
        
        if (elementTop < window.innerHeight - elementVisible) {
            element.classList.add('active');
        }
    });
});