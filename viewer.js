// Viewer foto/postingan layar penuh, bisa digeser kiri-kanan.
const Viewer = (() => {
  const root = $('#viewer');
  let items = [], idx = 0, track = null, sx = 0, dx = 0, dragging = false;

  function open(list, start = 0) {
    items = list;
    idx = start;
    root.innerHTML = `
      <div class="vw-top">
        <button class="vw-close" type="button">${svg('back', { size: 26, color: '#0a84ff', sw: 2.4 })}Kembali</button>
        <span class="vw-count"></span>
        <span style="width:90px"></span>
      </div>
      <div class="vw-track"></div>
      <div class="vw-meta"></div>`;
    track = $('.vw-track', root);
    $('.vw-close', root).addEventListener('click', close);

    track.addEventListener('pointerdown', (e) => {
      dragging = true; sx = e.clientX; dx = 0;
      track.style.transition = 'none';
    });
    track.addEventListener('pointermove', (e) => {
      if (!dragging) return;
      dx = e.clientX - sx;
      track.style.transform = `translateX(${dx}px)`;
    });
    const release = () => {
      if (!dragging) return;
      dragging = false;
      const w = root.clientWidth;
      const thr = w * 0.2;
      let delta = 0;
      if (dx < -thr && idx < items.length - 1) delta = 1;
      else if (dx > thr && idx > 0) delta = -1;
      track.style.transition = 'transform .28s cubic-bezier(.2,.8,.2,1)';
      track.style.transform = `translateX(${-delta * w}px)`;
      setTimeout(() => { idx += delta; paint(); }, delta ? 280 : 200);
    };
    track.addEventListener('pointerup', release);
    track.addEventListener('pointercancel', release);

    root.classList.add('active');
    paint();
  }

  function paint() {
    track.style.transition = 'none';
    track.style.transform = 'translateX(0)';
    track.innerHTML = '';
    for (let i = Math.max(0, idx - 1); i <= Math.min(items.length - 1, idx + 1); i++) {
      const s = el('div', 'vw-slide');
      s.style.cssText = bgStyle(items[i].src, solid(items[i].color), 'contain') + `transform:translateX(${(i - idx) * 100}%)`;
      track.appendChild(s);
    }
    $('.vw-count', root).textContent = `${idx + 1} dari ${items.length}`;
    $('.vw-meta', root).innerHTML = items[idx].meta || '';
  }

  function step(d) {
    const next = Math.min(items.length - 1, Math.max(0, idx + d));
    if (next === idx) return;
    idx = next;
    paint();
  }

  function close() {
    root.classList.remove('active');
    setTimeout(() => { if (!root.classList.contains('active')) root.innerHTML = ''; }, 260);
  }

  return { open, close, step, isOpen: () => root.classList.contains('active') };
})();