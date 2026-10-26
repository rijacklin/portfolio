// Header light/dark toggle. Follows the OS until clicked, then remembers the choice;
// theme.js (loaded in each page's <head>) re-applies it before first paint.
const ICONS = {
  moon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z"/></svg>',
  sun: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/></svg>',
};

function setupThemeToggle() {
  const nav = document.querySelector('.site-header nav');
  if (!nav) return;
  const root = document.documentElement;
  const prefersDark = matchMedia('(prefers-color-scheme: dark)');
  const current = () => root.dataset.theme || (prefersDark.matches ? 'dark' : 'light');
  const button = document.createElement('button');
  button.type = 'button';
  button.className = 'theme-toggle';

  const update = () => {
    const next = current() === 'dark' ? 'light' : 'dark';
    button.innerHTML = next === 'dark' ? ICONS.moon : ICONS.sun;
    button.setAttribute('aria-label', `Switch to ${next} mode`);
    button.title = `Switch to ${next} mode`;
  };
  button.addEventListener('click', () => {
    root.dataset.theme = current() === 'dark' ? 'light' : 'dark';
    try {
      localStorage.setItem('theme', root.dataset.theme);
    } catch { }
    update();
  });
  prefersDark.addEventListener('change', update);
  update();
  nav.append(button);
}

setupThemeToggle();
