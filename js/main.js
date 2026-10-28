(function () {
  'use strict';

  const data = window.SITE_DATA;
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const STAGE_ICONS = {
    star: '<path d="M12 3l2.6 5.6 6.1.7-4.5 4.2 1.2 6L12 16.6l-5.4 2.9 1.2-6-4.5-4.2 6.1-.7z"/>',
    sun: '<circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/>',
    book: '<path d="M4 19.5V5a2 2 0 0 1 2-2h14v16H6a2 2 0 0 0-2 2z"/><path d="M8 7h8"/>',
    heart: '<path d="M12 20s-7-4.4-8.7-8.6C2 8.2 4 5 7.2 5c2 0 3.4 1.1 4.8 2.8C13.4 6.1 14.8 5 16.8 5 20 5 22 8.2 20.7 11.4 19 15.6 12 20 12 20z"/>'
  };
  const POLAROID_TILT = ['-3deg', '2.4deg', '-1.4deg', '3.4deg', '2.4deg', '-3deg'];
  const COLLAGE_TILT = ['-1.1deg', '1.3deg'];
  const COLLAGE_SIZES = ['big', '', '', 'wide', 'wide', 'wide'];

  /* ---------- Utilidades ---------- */

  function fill(text) {
    return String(text ?? '').replace(/\{nombre\}/g, data.momName);
  }

  function getPath(obj, path) {
    return path.split('.').reduce((acc, key) => (acc == null ? acc : acc[key]), obj);
  }

  function el(tag, attrs, children) {
    const node = document.createElement(tag);
    Object.entries(attrs || {}).forEach(([key, value]) => {
      if (value == null || value === false) return;
      if (key === 'class') node.className = value;
      else if (key === 'text') node.textContent = value;
      else if (key === 'style') node.style.cssText = value;
      else node.setAttribute(key, value);
    });
    (children || []).forEach((child) => child && node.append(child));
    return node;
  }

  function svgIcon(id, size) {
    const ns = 'http://www.w3.org/2000/svg';
    const svg = document.createElementNS(ns, 'svg');
    svg.setAttribute('aria-hidden', 'true');
    if (size) { svg.setAttribute('width', size); svg.setAttribute('height', size); }
    const use = document.createElementNS(ns, 'use');
    use.setAttribute('href', '#' + id);
    svg.append(use);
    return svg;
  }

  function placeholder(caption) {
    return el('span', { class: 'placeholder' }, [
      svgIcon('i-camera'),
      el('span', { text: 'Foto' }),
      caption ? el('small', { text: caption }) : null
    ]);
  }

  // Marco con la imagen; si falta o falla, muestra el placeholder
  function photoFrame(photo, ratioClass, lazy) {
    const frame = el('span', { class: 'photo__frame ' + ratioClass });
    const caption = fill(photo.caption);
    if (!photo.src) {
      frame.append(placeholder(caption));
      return frame;
    }
    const img = el('img', { src: photo.src, alt: caption, loading: lazy === false ? null : 'lazy', decoding: 'async' });
    if (photo.focus) img.style.objectPosition = photo.focus;
    img.addEventListener('error', () => img.replaceWith(placeholder(caption)), { once: true });
    frame.append(img);
    return frame;
  }

  function photoButton(stageIndex, photoIndex, photo, className, children) {
    return el('button', {
      type: 'button',
      class: 'photo ' + className,
      'aria-label': photo.caption ? 'Ver en grande: ' + fill(photo.caption) : 'Ver foto en grande',
      'data-stage': stageIndex,
      'data-photo': photoIndex
    }, children);
  }

  // Pie de foto opcional: sin texto no se crea la etiqueta
  function captionEl(className, photo) {
    return photo.caption ? el('span', { class: className, text: fill(photo.caption) }) : null;
  }

  /* ---------- Textos fijos ---------- */

  function fillTexts() {
    document.querySelectorAll('[data-text]').forEach((node) => {
      node.textContent = fill(getPath(data, node.dataset.text));
      if (!node.textContent) node.hidden = true;
    });
    const body = document.getElementById('letter-body');
    (data.letter.paragraphs || []).forEach((p) => body.append(el('p', { text: fill(p) })));
    document.title = 'Feliz cumpleaños, ' + data.momName;
  }

  /* ---------- Galerías por estilo ---------- */

  const galleries = {
    polaroid(stage, s) {
      return el('div', { class: 'stage__gallery gallery-polaroid' }, stage.photos.map((photo, i) => {
        const button = photoButton(s, i, photo, 'polaroid', [
          photoFrame(photo, 'ar-45'),
          el('span', { class: 'polaroid__caption', text: fill(photo.caption) })
        ]);
        button.style.setProperty('--rot', POLAROID_TILT[i % POLAROID_TILT.length]);
        return el('div', null, [button]);
      }));
    },

    collage(stage, s) {
      return el('div', { class: 'stage__gallery gallery-collage' }, stage.photos.map((photo, i) => {
        const size = photo.size ?? COLLAGE_SIZES[i % COLLAGE_SIZES.length];
        const button = photoButton(s, i, photo, 'collage' + (size ? ' collage--' + size : ''), [
          photoFrame(photo, ''),
          captionEl('collage__caption', photo),
          el('span', { class: 'collage__tape', 'aria-hidden': 'true' })
        ]);
        button.style.setProperty('--rot', COLLAGE_TILT[i % COLLAGE_TILT.length]);
        return button;
      }));
    },

    grid(stage, s) {
      return el('div', { class: 'stage__gallery gallery-grid' }, stage.photos.map((photo, i) =>
        el('div', { class: 'grid-item' }, [
          photoButton(s, i, photo, '', [photoFrame(photo, 'ar-11')]),
          captionEl('grid-item__caption', photo)
        ])
      ));
    },

    featured(stage, s) {
      const [first, ...rest] = stage.photos;
      const root = el('div', { class: 'stage__gallery gallery-featured' });
      if (first) {
        root.append(photoButton(s, 0, first, 'featured', [
          photoFrame(first, 'ar-32'),
          captionEl('featured__caption', first)
        ]));
      }
      if (rest.length) {
        root.append(el('div', { class: 'thumbs' }, rest.map((photo, i) =>
          photoButton(s, i + 1, photo, 'thumb', [photoFrame(photo, 'ar-11')])
        )));
      }
      return root;
    }
  };

  /* ---------- Línea de tiempo ---------- */

  function buildTimeline() {
    const timeline = document.getElementById('timeline');
    const total = data.stages.length;

    data.stages.forEach((stage, s) => {
      const classes = ['stage', 'stage--' + Math.min(s + 1, 4)];
      if (s === 0) classes.push('stage--first');
      if (s === total - 1) classes.push('stage--last');

      const titleId = 'stage-title-' + (s + 1);
      const dot = el('div', { class: 'stage__dot', 'aria-hidden': 'true' });
      dot.innerHTML = '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round">' +
        (STAGE_ICONS[stage.icon] || STAGE_ICONS.heart) + '</svg>';

      const text = el('div', { class: 'stage__text' }, [
        el('p', { class: 'stage__label', text: 'Etapa ' + (s + 1) + ' · ' + fill(stage.ages) }),
        el('h2', { class: 'stage__title', id: titleId, text: fill(stage.title) }),
        el('p', { class: 'stage__quote', text: fill(stage.quote) }),
        el('p', { class: 'stage__body', text: fill(stage.text) })
      ]);

      const build = galleries[stage.layout] || galleries.grid;
      const row = el('div', { class: 'stage__row reveal' }, [dot, text, build(stage, s)]);

      timeline.append(el('section', { class: classes.join(' '), id: 'etapa-' + (s + 1), 'aria-labelledby': titleId }, [
        el('div', { class: 'stage__inner' }, [row])
      ]));
    });

    document.addEventListener('click', (event) => {
      const button = event.target.closest('.photo[data-stage]');
      if (button) openLightbox(button.dataset.stage, +button.dataset.photo, button);
    });
  }

  /* ---------- Fotos de portada y cierre ---------- */

  // Galerías sueltas (una sola foto) que también se abren en el lightbox
  const extraGalleries = {
    cover: { title: 'El comienzo', photos: [data.cover.photo].filter((p) => p && p.src) },
    closing: { title: 'Te amo, mamá', photos: [data.closing.photo].filter((p) => p && p.src) }
  };

  function galleryFor(key) {
    return extraGalleries[key] || data.stages[+key];
  }

  function buildSinglePhoto(key, containerId, className, ratioClass, withTape) {
    const container = document.getElementById(containerId);
    const photo = extraGalleries[key].photos[0];
    if (!photo) {
      container.remove();
      return;
    }
    container.append(photoButton(key, 0, photo, className, [
      photoFrame(photo, ratioClass, false),
      withTape ? el('span', { class: 'tape', 'aria-hidden': 'true' }) : null
    ]));
    if (photo.caption) container.append(el('p', { class: containerId + '__caption', text: fill(photo.caption) }));
  }

  /* ---------- Animaciones al hacer scroll ---------- */

  function setupReveal() {
    const items = document.querySelectorAll('.reveal');
    if (reducedMotion || !('IntersectionObserver' in window)) {
      items.forEach((node) => node.classList.add('is-visible'));
      return;
    }
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
    items.forEach((node) => observer.observe(node));
  }

  /* ---------- Lightbox ---------- */

  const lightbox = {
    root: document.getElementById('lightbox'),
    media: document.getElementById('lb-media'),
    caption: document.getElementById('lb-caption'),
    meta: document.getElementById('lb-meta'),
    prev: document.getElementById('lb-prev'),
    next: document.getElementById('lb-next'),
    close: document.getElementById('lb-close'),
    stage: 0,
    index: 0,
    opener: null
  };

  function renderLightbox() {
    const stage = galleryFor(lightbox.stage);
    const photo = stage.photos[lightbox.index];
    const caption = fill(photo.caption);

    lightbox.media.replaceChildren();
    const fallback = () => lightbox.media.replaceChildren(photoFrame({ caption: photo.caption }, 'ar-45'));
    if (photo.src) {
      const img = el('img', { src: photo.src, alt: caption });
      img.addEventListener('error', fallback, { once: true });
      lightbox.media.append(img);
    } else {
      fallback();
    }
    // Reinicia la animación de entrada
    lightbox.media.style.animation = 'none';
    void lightbox.media.offsetWidth;
    lightbox.media.style.animation = '';

    lightbox.caption.textContent = caption;
    const single = stage.photos.length < 2;
    lightbox.meta.textContent = fill(stage.title) + (single ? '' : ' · ' + (lightbox.index + 1) + ' de ' + stage.photos.length);
    lightbox.prev.hidden = single;
    lightbox.next.hidden = single;
  }

  function openLightbox(galleryKey, photoIndex, opener) {
    lightbox.stage = galleryKey;
    lightbox.index = photoIndex;
    lightbox.opener = opener || null;
    renderLightbox();
    lightbox.root.hidden = false;
    document.body.classList.add('is-locked');
    lightbox.close.focus();
  }

  function closeLightbox() {
    if (lightbox.root.hidden) return;
    lightbox.root.hidden = true;
    document.body.classList.remove('is-locked');
    if (lightbox.opener) lightbox.opener.focus({ preventScroll: true });
  }

  function stepLightbox(delta) {
    const count = galleryFor(lightbox.stage).photos.length;
    if (count < 2) return;
    lightbox.index = (lightbox.index + delta + count) % count;
    renderLightbox();
  }

  function setupLightbox() {
    lightbox.close.addEventListener('click', closeLightbox);
    lightbox.prev.addEventListener('click', () => stepLightbox(-1));
    lightbox.next.addEventListener('click', () => stepLightbox(1));

    // Cerrar al tocar fuera de la foto y de los controles
    lightbox.root.addEventListener('click', (event) => {
      if (!event.target.closest('img, .photo__frame, .lb-btn, .lightbox__text')) closeLightbox();
    });

    document.addEventListener('keydown', (event) => {
      if (lightbox.root.hidden) return;
      if (event.key === 'Escape') closeLightbox();
      else if (event.key === 'ArrowLeft') stepLightbox(-1);
      else if (event.key === 'ArrowRight') stepLightbox(1);
      else if (event.key === 'Tab') {
        // Mantiene el foco dentro del lightbox
        const focusable = [lightbox.close, lightbox.prev, lightbox.next].filter((b) => !b.hidden);
        const current = focusable.indexOf(document.activeElement);
        const next = (current + (event.shiftKey ? -1 : 1) + focusable.length) % focusable.length;
        focusable[next].focus();
        event.preventDefault();
      }
    });

    // Deslizar con el dedo para pasar fotos
    let startX = null;
    let startY = null;
    lightbox.root.addEventListener('touchstart', (event) => {
      startX = event.touches[0].clientX;
      startY = event.touches[0].clientY;
    }, { passive: true });
    lightbox.root.addEventListener('touchend', (event) => {
      if (startX === null) return;
      const dx = event.changedTouches[0].clientX - startX;
      const dy = event.changedTouches[0].clientY - startY;
      if (Math.abs(dx) > 50 && Math.abs(dx) > Math.abs(dy)) stepLightbox(dx < 0 ? 1 : -1);
      startX = null;
    });
  }

  /* ---------- Carta ---------- */

  function setupLetter() {
    const envelope = document.getElementById('envelope');
    const envelopeWrap = document.getElementById('envelope-wrap');
    const paperWrap = document.getElementById('letter-paper-wrap');
    const paper = document.getElementById('letter-paper');
    const closeButton = document.getElementById('letter-close');
    const wait = (ms) => new Promise((resolve) => setTimeout(resolve, reducedMotion ? 0 : ms));

    envelope.addEventListener('click', async () => {
      if (envelope.classList.contains('is-open')) return;
      envelope.classList.add('is-open');
      envelope.setAttribute('aria-expanded', 'true');
      await wait(1150);
      envelopeWrap.classList.add('is-leaving');
      await wait(400);
      envelopeWrap.hidden = true;
      envelopeWrap.classList.remove('is-leaving');
      paperWrap.hidden = false;
      paper.focus({ preventScroll: true });
      paper.scrollIntoView({ behavior: reducedMotion ? 'auto' : 'smooth', block: 'start' });
    });

    closeButton.addEventListener('click', () => {
      paperWrap.hidden = true;
      envelope.classList.remove('is-open');
      envelope.setAttribute('aria-expanded', 'false');
      envelopeWrap.hidden = false;
      envelope.focus({ preventScroll: true });
      document.getElementById('letter').scrollIntoView({ behavior: reducedMotion ? 'auto' : 'smooth' });
    });
  }

  /* ---------- Música ---------- */

  function setupMusic() {
    const audio = document.getElementById('music');
    const button = document.getElementById('music-btn');

    if (!data.music) {
      button.hidden = true;
      return;
    }
    audio.src = data.music;

    const setPlaying = (playing) => {
      button.classList.toggle('is-playing', playing);
      button.setAttribute('aria-pressed', String(playing));
      button.setAttribute('aria-label', playing ? 'Pausar música' : 'Reproducir música');
    };

    const play = () => {
      const attempt = audio.play();
      if (attempt && attempt.catch) attempt.catch(() => setPlaying(false));
    };

    audio.addEventListener('play', () => setPlaying(true));
    audio.addEventListener('pause', () => setPlaying(false));
    // Si la canción no existe, el botón desaparece
    audio.addEventListener('error', () => { button.hidden = true; });

    button.addEventListener('click', () => (audio.paused ? play() : audio.pause()));

    // Los navegadores bloquean el autoplay: empieza con el primer toque
    const startOnFirstTouch = (event) => {
      document.removeEventListener('pointerdown', startOnFirstTouch);
      document.removeEventListener('keydown', startOnFirstTouch);
      if (button.contains(event.target)) return;
      if (audio.paused) play();
    };
    document.addEventListener('pointerdown', startOnFirstTouch);
    document.addEventListener('keydown', startOnFirstTouch);
  }

  /* ---------- Confeti y corazones (canvas) ---------- */

  function setupConfetti() {
    const section = document.getElementById('closing');
    const canvas = document.getElementById('confetti');
    const title = document.getElementById('closing-title');
    if (reducedMotion || !canvas.getContext) return;

    const ctx = canvas.getContext('2d');
    const colors = ['#C9A35B', '#E2A3A6', '#B5603F', '#C9707C', '#F4C5C9', '#FFFDF8'];
    const heart = new Path2D('M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z');
    let particles = [];
    let width = 0;
    let height = 0;
    let visible = false;
    let running = false;
    let lastTrickle = 0;

    function resize() {
      const ratio = Math.min(window.devicePixelRatio || 1, 2);
      width = section.clientWidth;
      height = section.clientHeight;
      canvas.width = width * ratio;
      canvas.height = height * ratio;
      ctx.setTransform(ratio, 0, 0, ratio, 0, 0);
    }

    function spawn(count, fromTop) {
      for (let i = 0; i < count; i++) {
        const isHeart = Math.random() < 0.35;
        particles.push({
          x: Math.random() * width,
          y: fromTop ? -20 - Math.random() * height * 0.4 : -20,
          vx: (Math.random() - 0.5) * 1.2,
          vy: 1 + Math.random() * 1.8,
          size: isHeart ? 10 + Math.random() * 10 : 6 + Math.random() * 6,
          rotation: Math.random() * Math.PI * 2,
          spin: (Math.random() - 0.5) * 0.12,
          sway: Math.random() * Math.PI * 2,
          shape: isHeart ? 'heart' : (Math.random() < 0.5 ? 'rect' : 'circle'),
          color: colors[Math.floor(Math.random() * colors.length)]
        });
      }
      if (!running) {
        running = true;
        requestAnimationFrame(tick);
      }
    }

    function draw(p) {
      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.rotate(p.shape === 'heart' ? Math.sin(p.rotation) * 0.4 : p.rotation);
      ctx.fillStyle = p.color;
      if (p.shape === 'heart') {
        const scale = p.size / 24;
        ctx.scale(scale, scale);
        ctx.translate(-12, -12);
        ctx.fill(heart);
      } else if (p.shape === 'rect') {
        ctx.fillRect(-p.size / 3, -p.size / 2, p.size / 1.5, p.size);
      } else {
        ctx.beginPath();
        ctx.arc(0, 0, p.size / 2.4, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.restore();
    }

    function tick(time) {
      ctx.clearRect(0, 0, width, height);
      if (visible && time - lastTrickle > 220) {
        lastTrickle = time;
        spawn(1, false);
      }
      particles = particles.filter((p) => p.y < height + 30);
      particles.forEach((p) => {
        p.sway += 0.03;
        p.x += p.vx + Math.sin(p.sway) * 0.6;
        p.y += p.vy;
        p.rotation += p.spin;
        draw(p);
      });
      if (particles.length || visible) {
        requestAnimationFrame(tick);
      } else {
        running = false;
      }
    }

    resize();
    window.addEventListener('resize', resize);

    new IntersectionObserver((entries) => {
      visible = entries[0].isIntersecting;
      if (visible) {
        resize();
        spawn(90, true);
      }
    }, { threshold: 0.25 }).observe(section);

    // Un toque en "Te amo, mamá" lanza otra ráfaga
    title.addEventListener('click', () => spawn(60, true));
  }

  /* ---------- Inicio ---------- */

  fillTexts();
  buildTimeline();
  buildSinglePhoto('cover', 'cover-photo', 'cover-photo__frame', 'ar-34');
  buildSinglePhoto('closing', 'closing-photo', 'polaroid closing-photo__frame', 'ar-45', true);
  setupReveal();
  setupLightbox();
  setupLetter();
  setupMusic();
  setupConfetti();
})();
