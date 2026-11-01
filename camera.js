// Kamera dengan mode yang dapat digeser: Potret, Panorama, Slow-Mo, Selang Waktu, Cinematic.
registerApp('camera', (page) => {
  const modes = [
    { id: 'portrait', label: 'POTRET', speed: 1, ratio: '3 / 4' },
    { id: 'panorama', label: 'PANORAMA', speed: 1, ratio: '16 / 9' },
    { id: 'slowmo', label: 'SLOW-MO', speed: 0.5, ratio: '3 / 4' },
    { id: 'timelapse', label: 'SELANG WAKTU', speed: 2, ratio: '3 / 4' },
    { id: 'cinematic', label: 'CINEMATIC', speed: 1, ratio: '2.2 / 1' },
  ];
  page.innerHTML = `
    <div class="cam-wrap">
      <div class="cam-topline"><span class="cam-live-dot"></span><span id="camModeHint">POTRET</span><span class="cam-hdr">HDR</span></div>
      <div class="vf" id="vf"><button type="button" id="camSound" style="position:absolute;z-index:5;right:10px;bottom:10px;padding:8px 12px;border:0;border-radius:18px;background:#ffffffdd;color:#111;font-weight:600">🔊 Aktifkan suara</button><div class="cam-cinema-bar cam-cinema-top"></div><div class="cam-cinema-bar cam-cinema-bottom"></div><div class="cam-panorama-guide"></div></div>
      <div class="cam-modes-shell" aria-label="Mode kamera">
        <div class="cam-modes" id="camModes" role="tablist">${modes.map((m, i) => `<button type="button" class="cam-mode ${i === 0 ? 'on' : ''}" data-mode="${m.id}" role="tab" aria-selected="${i === 0}">${m.label}</button>`).join('')}</div>
      </div>
      <div class="cam-mode-caption" id="camModeCaption">Foto potret dengan efek fokus lembut</div>
      <div class="cam-bar">
        <div class="thumb" id="camThumb" aria-label="Pratinjau"></div>
        <button class="shutter" type="button" aria-label="Ambil foto"></button>
        <button class="cam-switch" type="button" id="camSwitch" aria-label="Ganti kamera">↻</button>
      </div>
      <div class="cam-bottom-note">Geser mode ke kiri atau kanan</div>
    </div>`;

  const vf = $('#vf', page);
  const modesEl = $('#camModes', page);
  const hint = $('#camModeHint', page);
  const caption = $('#camModeCaption', page);
  const captions = {
    portrait: 'Foto potret dengan efek fokus lembut',
    panorama: 'Bidang pandang lebar untuk pemandangan',
    slowmo: 'Pratinjau diperlambat',
    timelapse: 'Pratinjau dipercepat',
    cinematic: 'Tampilan layar lebar sinematik',
  };
  const placeholder = () => {
    vf.querySelector('.vf-ph')?.remove();
    const ph = document.createElement('div'); ph.className = 'vf-ph';
    ph.innerHTML = `${svg('camera', { size: 40, color: '#666', sw: 1.4 })}<p style="margin-top:10px">Taruh video di<br><code>${esc(CONFIG.camera.video)}</code></p>`;
    vf.appendChild(ph);
  };

  let video = null;
  if (CONFIG.camera.video) {
    video = el('video');
    video.src = CONFIG.camera.video;
    video.poster = CONFIG.camera.poster || '';
    video.autoplay = true; video.muted = true; video.defaultMuted = true; video.loop = true;
    video.playsInline = true; video.setAttribute('playsinline', ''); video.setAttribute('webkit-playsinline', '');
    video.preload = 'auto';
    video.addEventListener('error', placeholder);
    vf.appendChild(video);
    const startPlayback = () => { const result = video.play?.(); if (result?.catch) result.catch(() => {}); };
    video.addEventListener('loadeddata', startPlayback, { once: true });
    video.addEventListener('canplay', startPlayback, { once: true });
    startPlayback();
    const soundBtn = $('#camSound', page);
    soundBtn?.addEventListener('click', () => { video.muted = false; video.defaultMuted = false; video.volume = 1; video.play().then(() => { soundBtn.textContent = '🔊 Suara aktif'; }).catch(() => { soundBtn.textContent = 'Ketuk untuk suara'; }); });
  } else placeholder();

  const setMode = (id, scroll = true) => {
    const mode = modes.find(m => m.id === id) || modes[0];
    page.dataset.cameraMode = mode.id;
    vf.dataset.mode = mode.id;
    hint.textContent = mode.label;
    caption.textContent = captions[mode.id];
    modesEl.querySelectorAll('.cam-mode').forEach(btn => {
      const active = btn.dataset.mode === mode.id;
      btn.classList.toggle('on', active); btn.setAttribute('aria-selected', String(active));
      if (active && scroll) btn.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
    });
    if (video) { try { video.playbackRate = mode.speed; } catch (_) {} }
  };
  modesEl.querySelectorAll('.cam-mode').forEach(btn => btn.addEventListener('click', () => setMode(btn.dataset.mode)));

  // Swipe pada preview untuk berpindah mode, juga bisa digeser pada deretan label.
  let startX = null, startY = null;
  const startSwipe = e => { const p = e.touches ? e.touches[0] : e; startX = p.clientX; startY = p.clientY; };
  const endSwipe = e => {
    if (startX === null) return;
    const p = e.changedTouches ? e.changedTouches[0] : e;
    const dx = p.clientX - startX, dy = p.clientY - startY;
    if (Math.abs(dx) > 38 && Math.abs(dx) > Math.abs(dy) * 1.15) {
      const current = modes.findIndex(m => m.id === (page.dataset.cameraMode || 'portrait'));
      setMode(modes[Math.max(0, Math.min(modes.length - 1, current + (dx < 0 ? 1 : -1)))].id);
    }
    startX = startY = null;
  };
  vf.addEventListener('touchstart', startSwipe, { passive: true }); vf.addEventListener('touchend', endSwipe, { passive: true });
  vf.addEventListener('pointerdown', startSwipe); vf.addEventListener('pointerup', endSwipe);
  $('#camThumb', page).style.cssText = bgStyle(CONFIG.camera.poster, solid('#444'));
  $('.shutter', page).addEventListener('click', () => { vf.classList.remove('flash'); void vf.offsetWidth; vf.classList.add('flash'); });
  $('#camSwitch', page).addEventListener('click', () => { const i = modes.findIndex(m => m.id === page.dataset.cameraMode); setMode(modes[(i + 1) % modes.length].id); });
  setMode('portrait', false);
});
