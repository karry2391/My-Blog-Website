document.addEventListener('DOMContentLoaded', function() {
    // 登录表单处理
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const username = document.getElementById('username').value;
            const password = document.getElementById('password').value;
            const remember = document.getElementById('remember').checked;
            
            // 验证用户输入
            if (!validateLoginInput(username, password)) {
                return;
            }

            // 模拟登录请求
            simulateLogin(username, password, remember);
        });
    }

    // 注册表单处理
    const registerForm = document.getElementById('registerForm');
    if (registerForm) {
        registerForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const fullname = document.getElementById('fullname').value;
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;
            const confirmPassword = document.getElementById('confirmPassword').value;
            const remember = document.getElementById('remember').checked;

            // 验证用户输入
            if (!validateRegisterInput(fullname, email, password, confirmPassword)) {
                return;
            }

            // 模拟注册请求
            simulateRegister(fullname, email, password, remember);
        });
    }

    // 忘记密码表单处理
    const forgotPasswordForm = document.getElementById('forgotPasswordForm');
    if (forgotPasswordForm) {
        forgotPasswordForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const email = document.getElementById('email').value;

            // 验证邮箱
            if (!validateEmail(email)) {
                showMessage('请输入有效的邮箱地址', 'error');
                return;
            }

            // 模拟发送重置密码邮件
            simulatePasswordReset(email);
        });
    }

    // 输入验证函数
    function validateLoginInput(username, password) {
        if (!username.trim()) {
            showMessage('请输入用户名', 'error');
            return false;
        }
        if (!password.trim()) {
            showMessage('请输入密码', 'error');
            return false;
        }
        return true;
    }

    function validateRegisterInput(fullname, email, password, confirmPassword) {
        if (!fullname.trim()) {
            showMessage('请输入姓名', 'error');
            return false;
        }
        if (!validateEmail(email)) {
            showMessage('请输入有效的邮箱地址', 'error');
            return false;
        }
        if (password.length < 6) {
            showMessage('密码长度至少为6位', 'error');
            return false;
        }
        if (password !== confirmPassword) {
            showMessage('两次输入的密码不匹配', 'error');
            return false;
        }
        return true;
    }

    function validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }

    // 模拟API请求函数
    function simulateLogin(username, password, remember) {
        showMessage('登录中...', 'info');
        
        // 模拟API请求延迟
        setTimeout(() => {
            // 这里应该是实际的API请求
            const success = true;

            if (success) {
                // 存储登录状态
                if (remember) {
                    localStorage.setItem('user', JSON.stringify({ username }));
                } else {
                    sessionStorage.setItem('user', JSON.stringify({ username }));
                }

                showMessage('登录成功！即将跳转...', 'success');
                setTimeout(() => {
                    window.location.href = 'index.html';
                }, 1500);
            } else {
                showMessage('用户名或密码错误', 'error');
            }
        }, 1000);
    }

    function simulateRegister(fullname, email, password, remember) {
        showMessage('注册中...', 'info');

        setTimeout(() => {
            // 这里应该是实际的API请求
            const success = true;

            if (success) {
                showMessage('注册成功！即将跳转到登录页面...', 'success');
                setTimeout(() => {
                    window.location.href = 'login.html';
                }, 1500);
            } else {
                showMessage('注册失败，请稍后重试', 'error');
            }
        }, 1000);
    }

    function simulatePasswordReset(email) {
        showMessage('正在发送重置邮件...', 'info');

        setTimeout(() => {
            // 这里应该是实际的API请求
            const success = true;

            if (success) {
                showMessage('重置邮件已发送，请查收！', 'success');
                setTimeout(() => {
                    window.location.href = 'login.html';
                }, 2000);
            } else {
                showMessage('发送失败，请稍后重试', 'error');
            }
        }, 1000);
    }

    // 消息提示函数
    function showMessage(message, type = 'info') {
        // 如果已经存在消息框，先移除
        const existingMessage = document.querySelector('.message-box');
        if (existingMessage) {
            existingMessage.remove();
        }

        // 创建消息框
        const messageBox = document.createElement('div');
        messageBox.className = `message-box message-${type}`;
        messageBox.textContent = message;

        // 添加到页面
        document.body.appendChild(messageBox);

        // 3秒后自动移除
        setTimeout(() => {
            messageBox.remove();
        }, 3000);
    }

    // 快捷键处理
    document.addEventListener('keydown', function(e) {
        // Alt + A: 激活截图功能
        if (e.altKey && e.key === 'a') {
            e.preventDefault();
            console.log('截图快捷键被触发');
        }
    });
});

// 消息提示样式
const style = document.createElement('style');
style.textContent = `
    .message-box {
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 15px 25px;
        border-radius: 5px;
        color: white;
        font-size: 14px;
        z-index: 1000;
        animation: slideIn 0.3s ease;
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
    }

    .message-success {
        background-color: #4caf50;
    }

    .message-error {
        background-color: #f44336;
    }

    .message-info {
        background-color: #2196f3;
    }

    @keyframes slideIn {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
`;

document.head.appendChild(style);