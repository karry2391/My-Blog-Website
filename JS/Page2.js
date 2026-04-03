// 倒计时功能
document.addEventListener('DOMContentLoaded', function() {
    let countdown = 5;
    const countdownElement = document.getElementById('countdown');
    
    // 每秒更新倒计时
    const timer = setInterval(function() {
        countdown--;
        countdownElement.textContent = countdown;
        
        // 当倒计时结束时
        if (countdown <= 0) {
            clearInterval(timer);
            window.location.href = 'index.html'; // 跳转到首页
        }
    }, 1000);

    // 当用户点击任何按钮时，清除倒计时
    document.querySelectorAll('.btn').forEach(button => {
        button.addEventListener('click', function() {
            clearInterval(timer);
        });
    });
});