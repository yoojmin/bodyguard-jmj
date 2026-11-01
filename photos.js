// =====================================================================
// GALERI: tab Foto dan Video, thumbnail video dari frame pertama, dan viewer
// =====================================================================
registerApp('photos', (page) => {
  page.classList.add('gallery-page');
  let tab = 'photo';
  page.innerHTML = `
    <div class="large-title">Foto</div>
    <div class="seg-wrap"><div class="seg">
      <button type="button" data-t="photo" class="on">Foto</button>
      <button type="button" data-t="video">Video</button>
    </div></div>
    <div class="gal-body"></div>`;

  const body = $('.gal-body', page);

  function paint() {
    $$('.seg button', page).forEach((b) => b.classList.toggle('on', b.dataset.t === tab));
    body.innerHTML = '';
    const list = tab === 'photo' ? PHOTOS : VIDEOS;
    let lastMonth = '';
    let grid = null;
    list.forEach((item, i) => {
      const mon = new Date(item.date).toLocaleDateString('id-ID', { month: 'long', year: 'numeric' });
      if (mon !== lastMonth) {
        lastMonth = mon;
        body.appendChild(el('div', 'month-title', mon));
        grid = el('div', 'photo-grid');
        body.appendChild(grid);
      }
      const cell = el('button', 'photo-cell');
      cell.type = 'button';
      if (item.type === 'video') {
        cell.innerHTML = videoThumb(item.src) + '<span class="play-badge">▶</span>';
      } else {
        cell.style.cssText = bgStyle(item.src, solid(item.color));
      }
      cell.addEventListener('click', () => Gallery.open(list, i));
      grid.appendChild(cell);
    });
  }

  $$('.seg button', page).forEach((b) =>
    b.addEventListener('click', () => { tab = b.dataset.t; paint(); }));
  paint();
});

// Thumbnail video: browser menampilkan frame pertama dari file video itu sendiri
function videoThumb(src) {
  return `<video src="${src}#t=0.1" muted playsinline preload="metadata" tabindex="-1"></video>`;
}

// ----- Viewer: rasio asli media, video bisu, dan frame pertama sebagai tampilan awal -----
const Gallery = (() => {
  let items = [];
  let idx = 0;
  let root = null;

  const SHARE_ICON = '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 3v12M8 7l4-4 4 4M5 13v7h14v-7"/></svg>';

  function mediaHtml(it) {
    if (it.type === 'video') {
      return `<video src="${it.src}#t=0.1" controls muted playsinline preload="metadata"></video>`;
    }
    return `<img src="${it.src}" alt="">`;
  }

  function open(list, start) {
    items = list;
    idx = start;
    root = $('#viewer');
    root.innerHTML = `
      <div class="gv">
        <button class="gv-round gv-back" type="button" aria-label="Kembali">${svg('back', { size: 22, color: '#000', sw: 2.2 })}</button>
        <div class="gv-pill"><b></b><span></span></div>
        <button class="gv-round gv-more" type="button" aria-label="Lainnya">•••</button>
        <div class="gv-stage"></div>
        <div class="gv-strip"></div>
        <div class="gv-bar">
          <button class="gv-tool" type="button" aria-label="Bagikan">${SHARE_ICON}</button>
          <div class="gv-tools">
            <button type="button" aria-label="Suka">♡</button>
            <button type="button" aria-label="Info">ⓘ</button>
            <button type="button" aria-label="Edit">⚙</button>
          </div>
          <button class="gv-tool" type="button" aria-label="Hapus">🗑</button>
        </div>
      </div>`;
    $('.gv-back', root).addEventListener('click', close);
    root.classList.add('active');
    paint();
  }

  function paint() {
    const it = items[idx];
    const d = new Date(it.date);
    $('.gv-pill b', root).textContent = d.toLocaleDateString('id-ID', { weekday: 'long' });
    $('.gv-pill span', root).textContent = `${pad(d.getHours())}.${pad(d.getMinutes())}`;

    const stage = $('.gv-stage', root);
    stage.style.background = it.type === 'video' ? '#000' : '#fff';
    stage.innerHTML = mediaHtml(it);

    // Geser kiri-kanan untuk pindah foto atau video
    let sx = null;
    stage.ontouchstart = (e) => { sx = e.touches[0].clientX; };
    stage.ontouchend = (e) => {
      if (sx === null) return;
      const dx = e.changedTouches[0].clientX - sx;
      sx = null;
      if (dx < -50) step(1);
      else if (dx > 50) step(-1);
    };

    const strip = $('.gv-strip', root);
    strip.innerHTML = items.map((x, i) => {
      const on = i === idx ? 'on' : '';
      return x.type === 'video'
        ? `<button type="button" class="${on}">${videoThumb(x.src)}</button>`
        : `<button type="button" class="${on}" style="${bgStyle(x.src, solid(x.color))}"></button>`;
    }).join('');
    $$('button', strip).forEach((b, i) => b.addEventListener('click', () => { idx = i; paint(); }));
    const onEl = strip.querySelector('.on');
    if (onEl) onEl.scrollIntoView({ inline: 'center', block: 'nearest' });
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

  return { open, close };
})();