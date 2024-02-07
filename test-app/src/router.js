import pages from '../pages';

export const router = document.createElement('div');
router.style.display = 'flex';
Object.entries(pages).forEach(([page, config]) => {
  const link = document.createElement('a');
  link.style.marginRight = '1rem';
  link.setAttribute('href', `${page}.html`);
  link.innerHTML = config.title;
  router.appendChild(link);
});
