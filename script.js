// Theme preference: explicit visitor choice wins; otherwise follow the operating system.
(() => {
  const root = document.documentElement;
  const toggle = document.querySelector('.theme-toggle');
  const label = document.querySelector('.theme-label');
  const colorMeta = document.querySelector('meta[name="theme-color"]');
  const preferenceKey = 'maya-woolf-theme';
  const systemTheme = window.matchMedia('(prefers-color-scheme: dark)');

  function applyTheme(theme) {
    root.dataset.theme = theme;
    const isDark = theme === 'dark';
    toggle.setAttribute('aria-pressed', String(isDark));
    toggle.setAttribute('aria-label', isDark ? 'Switch to light theme' : 'Switch to dark theme');
    label.textContent = isDark ? 'Light mode' : 'Dark mode';
    colorMeta.setAttribute('content', isDark ? '#151c19' : '#f6f7f3');
  }

  let savedTheme = null;
  try { savedTheme = localStorage.getItem(preferenceKey); } catch (_) { /* Storage may be unavailable; use system preference. */ }
  applyTheme(savedTheme === 'light' || savedTheme === 'dark' ? savedTheme : (systemTheme.matches ? 'dark' : 'light'));

  toggle.addEventListener('click', () => {
    const nextTheme = root.dataset.theme === 'dark' ? 'light' : 'dark';
    applyTheme(nextTheme);
    try { localStorage.setItem(preferenceKey, nextTheme); } catch (_) { /* The toggle still works for this visit. */ }
  });

  systemTheme.addEventListener('change', (event) => {
    let hasSavedPreference = false;
    try { hasSavedPreference = localStorage.getItem(preferenceKey) !== null; } catch (_) { /* Follow the system when storage is unavailable. */ }
    if (!hasSavedPreference) applyTheme(event.matches ? 'dark' : 'light');
  });
})();
