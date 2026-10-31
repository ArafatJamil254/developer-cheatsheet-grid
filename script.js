document.addEventListener('DOMContentLoaded', () => {
  const btn = document.getElementById('actionBtn');
  const counterText = document.getElementById('counterText');
  let count = 0;

  if (btn && counterText) {
    btn.addEventListener('click', () => {
      count++;
      counterText.textContent = `Clicked: ${count} time${count === 1 ? '' : 's'}!`;
      btn.style.transform = 'scale(0.96)';
      setTimeout(() => {
        btn.style.transform = '';
      }, 100);
    });
  }
});
