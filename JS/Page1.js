// 倒计时功能
document.addEventListener('DOMContentLoaded', function() {
    let timeLeft = 5;
    const timerElement = document.getElementById('timer');
    
    // 开始倒计时
    const countdown = setInterval(() => {
        timeLeft--;
        timerElement.textContent = timeLeft;
        
        if (timeLeft <= 0) {
            clearInterval(countdown);
            // 跳转到首页
            window.location.href = 'index.html';
        }
    }, 1000);
    
    // 如果用户点击了任何链接，清除倒计时
    document.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            clearInterval(countdown);
        });
    });
});