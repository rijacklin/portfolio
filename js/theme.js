// Re-applies the visitor's saved light/dark choice before first paint.
// Loaded without `defer` in every page's <head>; the toggle itself lives in main.js.
try {
	const t = localStorage.getItem('theme');
	if (t === 'light' || t === 'dark') document.documentElement.dataset.theme = t;
} catch {}
