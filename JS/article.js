// article.js
document.addEventListener('DOMContentLoaded', () => {
    // 初始化主题
    const savedTheme = localStorage.getItem('theme') || 'light';
    document.documentElement.setAttribute('data-theme', savedTheme);
    document.getElementById('theme-icon').textContent = savedTheme === 'dark' ? '🌑' : '☀️';
});

// 处理点赞功能
function handleLike() {
    const likeButton = document.querySelector('.like-button');
    const likeCount = document.querySelector('.like-count');
    const currentLikes = parseInt(likeCount.textContent);
    
    if (!likeButton.classList.contains('liked')) {
        likeCount.textContent = currentLikes + 1;
        likeButton.classList.add('liked');
    } else {
        likeCount.textContent = currentLikes - 1;
        likeButton.classList.remove('liked');
    }
}

// 处理分享功能
function handleShare() {
    const currentUrl = window.location.href;
    navigator.clipboard.writeText(currentUrl)
        .then(() => {
            alert('链接已复制到剪贴板');
        })
        .catch(() => {
            alert('复制失败，请手动复制链接');
        });
}

// 提交评论
function submitComment() {
    const commentInput = document.querySelector('.comment-form textarea');
    const content = commentInput.value.trim();
    
    if (!content) {
        alert('评论内容不能为空');
        return;
    }
    
    const commentsList = document.querySelector('.comments-list');
    const commentElement = document.createElement('div');
    commentElement.className = 'comment-item';
    commentElement.innerHTML = `
        <div class="comment-header">
            <img src="Image/default-avatar.jpg" alt="用户头像" class="comment-avatar">
            <div class="comment-info">
                <span class="comment-author">当前用户</span>
                <span class="comment-date">${new Date().toLocaleString()}</span>
            </div>
        </div>
        <div class="comment-content">${content}</div>
    `;
    commentsList.insertBefore(commentElement, commentsList.firstChild);
    
    commentInput.value = '';
}