// comment.js
class CommentHandler {
    constructor() {
        this.button = document.querySelector('.comment-form button');
        this.commentInput = document.querySelector('.comment-form textarea');
        this.commentList = document.querySelector('.comment-list');
        
        this.initializeEventListeners();
    }
    
    initializeEventListeners() {
        this.button.addEventListener('click', () => this.handleCommentSubmission());
    }
    
    handleCommentSubmission() {
        const comment = this.commentInput.value.trim();
        if (!comment) {
            alert("评论不能为空！");
            return;
        }
        
        this.addNewComment(comment);
        this.clearInput();
    }
    
    addNewComment(comment) {
        const currentTime = new Date().toLocaleString();
        const newComment = document.createElement('div');
        newComment.className = 'comment-item';
        newComment.innerHTML = `
            <div class="comment-header">
                <img src="https://via.placeholder.com/40" alt="用户头像" class="comment-avatar">
                <div>
                    <span class="comment-username">新用户</span>
                    <span class="comment-time">${currentTime}</span>
                </div>
            </div>
            <p class="comment-content">${comment}</p>
        `;
        
        this.commentList.appendChild(newComment);
    }
    
    clearInput() {
        this.commentInput.value = '';
    }
}

// 当DOM加载完成后初始化评论处理器
document.addEventListener('DOMContentLoaded', () => {
    new CommentHandler();
});