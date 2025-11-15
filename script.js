// Theme Toggle (لكن الآن نبدأ من الثيم الداكن)
const themeToggle = document.querySelector('.theme-toggle');
themeToggle.addEventListener('click', () => {
  const body = document.body;
  if (body.dataset.theme === 'dark') {
    body.dataset.theme = 'light';
    themeToggle.textContent = '🌙';
    // لو تضيف ألوان خفيفة للثيم الفاتح
  } else {
    body.dataset.theme = 'dark';
    themeToggle.textContent = '☀️';
  }
});

// Notification system
function showNotification(msg, type = 'success') {
  const notif = document.createElement('div');
  notif.className = `floating-message ${type}`;
  notif.innerText = msg;
  document.body.appendChild(notif);
  notif.style.position = 'fixed';
  notif.style.top = '1rem';
  notif.style.right = '1rem';
  notif.style.padding = '1rem 1.2rem';
  notif.style.borderRadius = '10px';
  notif.style.background = type === 'success' ? 'var(--accent)' : '#ff4c4c';
  notif.style.color = '#0a0f1c';
  notif.style.boxShadow = '0 4px 12px var(--shadow-light)';
  notif.style.opacity = 0;
  notif.style.transition = 'opacity 0.4s ease';
  setTimeout(() => {
    notif.style.opacity = 1;
  }, 10);
  setTimeout(() => {
    notif.remove();
  }, 3000);
}

// عند الضغط على زر شراء
document.querySelectorAll('.button').forEach((btn) => {
  btn.addEventListener('click', () => {
    showNotification('تم إضافة المنتج إلى السلة', 'success');
  });
});
