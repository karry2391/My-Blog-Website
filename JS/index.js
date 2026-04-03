// 主题切换功能
function toggleTheme() {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', newTheme);
    
    // 切换图标
    const themeIcon = document.getElementById('theme-icon');
    themeIcon.textContent = newTheme === 'dark' ? '🌑' : '☀️';
    // 保存用户选择到 localStorage
    localStorage.setItem('theme', newTheme);
}

// 文章内容展开/收起功能
function toggleContent(button) {
    const content = button.previousElementSibling.querySelector('.content-preview');
    const isExpanded = content.style.webkitLineClamp === '6';

    if (isExpanded) {
        content.style.webkitLineClamp = '3';
        button.textContent = '阅读全文';
    } else {
        content.style.webkitLineClamp = '6';
        button.textContent = '收起内容';
    }
}

// 图片缩放功能
function toggleZoom(image) {
    image.classList.toggle('zoomed');
    
    // 如果图片被放大，添加点击事件监听器到document
    if (image.classList.contains('zoomed')) {
        document.addEventListener('click', function closeZoom(e) {
            if (e.target !== image) {
                image.classList.remove('zoomed');
                document.removeEventListener('click', closeZoom);
            }
        });
        
        // 添加ESC键监听
        document.addEventListener('keydown', function escClose(e) {
            if (e.key === 'Escape') {
                image.classList.remove('zoomed');
                document.removeEventListener('keydown', escClose);
            }
        });
    }
}

// 点赞功能
function handleLike(button) {
    const likesCount = button.nextElementSibling;
    let currentLikes = parseInt(likesCount.textContent.replace('点赞数: ', ''), 10);
    currentLikes++;
    likesCount.textContent = `点赞数: ${currentLikes}`;
}

// 评论功能
function addComment(button) {
    const commentInput = button.previousElementSibling;
    const commentList = button.nextElementSibling;
    if (commentInput.value.trim() !== "") {
        const newComment = document.createElement("li");
        newComment.textContent = commentInput.value.trim();
        commentList.appendChild(newComment);
        commentInput.value = "";
    } else {
        alert("评论不能为空！");
    }
}

// 返回上一页功能
function goBack() {
    window.history.back();
}

// 初始化功能
document.addEventListener('DOMContentLoaded', () => {
    // 初始化主题
    const savedTheme = localStorage.getItem('theme') || 'light';
    document.documentElement.setAttribute('data-theme', savedTheme);
    document.getElementById('theme-icon').textContent = savedTheme === 'dark' ? '🌑' : '☀️';
});