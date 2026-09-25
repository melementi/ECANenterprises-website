(() => {
  const m = document.querySelector('#mobile-menu');
  const b = document.querySelector('#menu-btn');

  b.addEventListener('click', () => {
    const o = m.hidden;
    m.hidden = !o;
    b.setAttribute('aria-expanded', String(o));
  });

  m.querySelectorAll('a').forEach(a =>
    a.addEventListener('click', () => {
      m.hidden = true;
      b.setAttribute('aria-expanded', 'false');
    })
  );

  document.querySelector('#quote-form').addEventListener('submit', e => {
    e.preventDefault();
    const d = new FormData(e.target);
    const s = `Quote Request: ${d.get('service')} - ${d.get('name')}`;
    const body = [
      `Name: ${d.get('name')}`,
      `Email: ${d.get('email')}`,
      `Phone: ${d.get('phone') || 'Not provided'}`,
      `Service: ${d.get('service')}`,
      '',
      `Details:\n${d.get('message')}`
    ].join('\n');

    location.href = `mailto:contact@ecanenterprises.ca?subject=${encodeURIComponent(s)}&body=${encodeURIComponent(body)}`;
    document.querySelector('#form-status').classList.remove('hidden');
  });
})();
document.getElementById('year').textContent = new Date().getFullYear();
