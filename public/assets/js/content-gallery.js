const galleryImages = document.querySelectorAll('[data-gallery-src]');

if (galleryImages.length) {
  const dialog = document.createElement('dialog');
  dialog.className = 'content-lightbox';
  dialog.innerHTML = '<button type="button" aria-label="Close image viewer">×</button><figure><img alt=""><figcaption></figcaption></figure><a target="_blank" rel="noopener">View original source</a>';
  document.body.append(dialog);

  const fullImage = dialog.querySelector('img');
  const caption = dialog.querySelector('figcaption');
  const sourceLink = dialog.querySelector('a');
  dialog.querySelector('button').addEventListener('click', () => dialog.close());
  dialog.addEventListener('click', (event) => { if (event.target === dialog) dialog.close(); });

  for (const image of galleryImages) {
    image.tabIndex = 0;
    image.role = 'button';
    image.setAttribute('aria-label', `Enlarge: ${image.alt}`);
    const open = () => {
      const source = image.dataset.gallerySrc;
      fullImage.src = source;
      fullImage.alt = image.alt;
      caption.textContent = image.alt;
      sourceLink.href = source;
      dialog.showModal();
    };
    image.addEventListener('click', open);
    image.addEventListener('keydown', (event) => { if (event.key === 'Enter' || event.key === ' ') { event.preventDefault(); open(); } });
  }
}
