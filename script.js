// Theme Toggle
const themeToggle = document.querySelector('.theme-toggle');
themeToggle.addEventListener('click', () => {
    const body = document.body;
    if(body.dataset.theme === 'light') {
        body.dataset.theme = 'dark';
        themeToggle.textContent = '☀️';
    } else {
        body.dataset.theme = 'light';
        themeToggle.textContent = '🌙';
    }
});

// Notifications System
function showNotification(msg, type='success') {
    const notif = document.createElement('div');
    notif.className = `floating-message ${type}`;
    notif.innerText = msg;
    document.body.appendChild(notif);
    notif.style.position = 'fixed';
    notif.style.top = '1rem';
    notif.style.right = '1rem';
    notif.style.padding = '1rem 1.5rem';
    notif.style.borderRadius = '8px';
    notif.style.background = type==='success'? '#4bb543' : '#ff4c4c';
    notif.style.color = '#fff';
    notif.style.boxShadow = '0 4px 12px rgba(0,0,0,0.2)';
    notif.style.zIndex = 9999;
    notif.style.opacity = 0;
    notif.style.transition = 'opacity 0.5s ease';
    setTimeout(()=> notif.style.opacity = 1, 10);
    setTimeout(()=> notif.remove(), 3000);
}

// Example usage
document.querySelectorAll('.button').forEach(btn=>{
    btn.addEventListener('click', ()=>{
        showNotification('تم إضافة المنتج إلى السلة');
    });
});
