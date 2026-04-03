document.addEventListener('DOMContentLoaded', function() {
    // 初始化 GSAP 动画
    initGSAPAnimations();
    
    // 初始化技术标签筛选
    initTagFilters();
    
    // 初始化技术图谱
    initTechMap();
    
    // 初始化滚动动画
    initScrollAnimations();
});

// GSAP 动画初始化
function initGSAPAnimations() {
    // 页面载入动画
    gsap.from('.category-header', {
        y: -50,
        opacity: 0,
        duration: 1,
        ease: 'power3.out'
    });

    gsap.from('.showcase-item', {
        y: 50,
        opacity: 0,
        duration: 0.8,
        stagger: 0.2,
        ease: 'power3.out'
    });

    gsap.from('.article-card', {
        scale: 0.8,
        opacity: 0,
        duration: 0.6,
        stagger: 0.1,
        ease: 'power3.out'
    });
}

// 标签筛选功能
function initTagFilters() {
    const tags = document.querySelectorAll('.tech-tags .tag');
    const articles = document.querySelectorAll('.article-card');

    tags.forEach(tag => {
        tag.addEventListener('click', () => {
            // 移除所有标签的active类
            tags.forEach(t => t.classList.remove('active'));
            // 添加当前标签的active类
            tag.classList.add('active');

            const type = tag.dataset.type;
            filterArticles(type, articles);
        });
    });
}

// 文章筛选函数
function filterArticles(type, articles) {
    articles.forEach(article => {
        if (type === 'all' || article.dataset.type === type) {
            gsap.to(article, {
                scale: 1,
                opacity: 1,
                duration: 0.4,
                display: 'block'
            });
        } else {
            gsap.to(article, {
                scale: 0.8,
                opacity: 0,
                duration: 0.4,
                display: 'none'
            });
        }
    });
}

// 技术图谱初始化
function initTechMap() {
    const svg = document.getElementById('techMapSvg');
    if (!svg) return;

    const techNodes = [
        { id: 'frontend', label: '前端开发', x: 200, y: 250 },
        { id: 'backend', label: '后端开发', x: 500, y: 250 },
        { id: 'database', label: '数据库', x: 800, y: 250 },
        // 添加更多技术节点
    ];

    const connections = [
        { from: 'frontend', to: 'backend' },
        { from: 'backend', to: 'database' },
        // 添加更多连接
    ];

    // 绘制节点和连接
    drawTechMap(svg, techNodes, connections);
}

// 绘制技术图谱
function drawTechMap(svg, nodes, connections) {
    // 绘制连接线
    connections.forEach(conn => {
        const fromNode = nodes.find(n => n.id === conn.from);
        const toNode = nodes.find(n => n.id === conn.to);
        if (fromNode && toNode) {
            const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
            line.setAttribute('x1', fromNode.x);
            line.setAttribute('y1', fromNode.y);
            line.setAttribute('x2', toNode.x);
            line.setAttribute('y2', toNode.y);
            line.setAttribute('stroke', 'var(--text-color)');
            line.setAttribute('stroke-width', '2');
            svg.appendChild(line);
        }
    });

    // 绘制节点
    nodes.forEach(node => {
        const g = document.createElementNS('http://www.w3.org/2000/svg', 'g');
        
        // 创建节点圆圈
        const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
        circle.setAttribute('cx', node.x);
        circle.setAttribute('cy', node.y);
        circle.setAttribute('r', '30');
        circle.setAttribute('fill', 'var(--primary-color)');
        
        // 创建节点文本
        const text = document.createElementNS('http://www.w3.org/2000/svg', 'text');
        text.setAttribute('x', node.x);
        text.setAttribute('y', node.y);
        text.setAttribute('text-anchor', 'middle');
        text.setAttribute('alignment-baseline', 'middle');
        text.setAttribute('fill', 'white');
        text.textContent = node.label;

        g.appendChild(circle);
        g.appendChild(text);
        svg.appendChild(g);
    });
}

// 获取 SVG 容器
const svg = document.getElementById('techMapSvg');

// 数据：节点和连接的关系
const nodes = [
	{ id: 'HTML', x: 100, y: 100 },
	{ id: 'CSS', x: 250, y: 100 },
	{ id: 'JavaScript', x: 400, y: 100 },
	{ id: 'React', x: 600, y: 100 },
	{ id: 'Node.js', x: 800, y: 100 },
	{ id: 'Express', x: 400, y: 300 },
	{ id: 'MongoDB', x: 600, y: 300 },
	{ id: 'Vue', x: 250, y: 300 },
	{ id: 'Python', x: 100, y: 300 },
];

const links = [
	{ source: 'HTML', target: 'CSS' },
	{ source: 'HTML', target: 'JavaScript' },
	{ source: 'JavaScript', target: 'React' },
	{ source: 'JavaScript', target: 'Node.js' },
	{ source: 'React', target: 'Express' },
	{ source: 'Node.js', target: 'Express' },
	{ source: 'Node.js', target: 'MongoDB' },
	{ source: 'React', target: 'Vue' },
	{ source: 'Python', target: 'Node.js' },
];

// 添加节点
nodes.forEach(node => {
	const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
	circle.setAttribute('cx', node.x);
	circle.setAttribute('cy', node.y);
	circle.setAttribute('r', 30);
	circle.setAttribute('fill', '#2196F3');
	svg.appendChild(circle);

	const text = document.createElementNS('http://www.w3.org/2000/svg', 'text');
	text.setAttribute('x', node.x);
	text.setAttribute('y', node.y);
	text.setAttribute('text-anchor', 'middle');
	text.setAttribute('dy', 5);
	text.setAttribute('fill', 'white');
	text.textContent = node.id;
	svg.appendChild(text);
});

// 添加连线
links.forEach(link => {
	const sourceNode = nodes.find(node => node.id === link.source);
	const targetNode = nodes.find(node => node.id === link.target);
	
	const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
	line.setAttribute('x1', sourceNode.x);
	line.setAttribute('y1', sourceNode.y);
	line.setAttribute('x2', targetNode.x);
	line.setAttribute('y2', targetNode.y);
	line.setAttribute('stroke', '#2196F3');
	line.setAttribute('stroke-width', 2);
	svg.appendChild(line);
});

// 滚动动画初始化
function initScrollAnimations() {
    // 监听滚动事件
    window.addEventListener('scroll', () => {
        const elements = document.querySelectorAll('.track-item, .qa-item');
        elements.forEach(element => {
            const rect = element.getBoundingClientRect();
            const isVisible = rect.top < window.innerHeight - 100;
            
            if (isVisible && !element.classList.contains('animated')) {
                element.classList.add('animated');
                gsap.from(element, {
                    x: -100,
                    opacity: 0,
                    duration: 0.8,
                    ease: 'power3.out'
                });
            }
        });
    });
}

// 添加鼠标悬停效果
document.querySelectorAll('.article-card').forEach(card => {
    card.addEventListener('mouseenter', () => {
        gsap.to(card, {
            scale: 1.02,
            duration: 0.3,
            ease: 'power2.out'
        });
    });

    card.addEventListener('mouseleave', () => {
        gsap.to(card, {
            scale: 1,
            duration: 0.3,
            ease: 'power2.out'
        });
    });
});

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