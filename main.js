

// Layar panggilan masuk layar penuh dari Karen (simulasi interaktif).
function showKarenCallNotification() {
  if (document.querySelector('.karen-call-notification')) return;
  const note = document.createElement('div');
  note.className = 'karen-call-notification';
  note.setAttribute('role', 'dialog');
  note.setAttribute('aria-label', 'Panggilan masuk dari Karen');
  note.innerHTML = `
    <div class="kcn-photo" aria-hidden="true"></div>
    <div class="kcn-shade" aria-hidden="true"></div>
    <div class="kcn-top">
      <div class="kcn-status">is calling...</div>
      <div class="kcn-name">Karen</div>
    </div>
    <div class="kcn-actions">
      <div class="kcn-action"><span class="kcn-helper-icon">◷</span><span>Remind Me</span></div>
      <div class="kcn-action"><span class="kcn-helper-icon">●</span><span>Message</span></div>
      <div class="kcn-action"><button type="button" class="kcn-decline" aria-label="Decline call"><svg viewBox="0 0 64 64" aria-hidden="true"><path d="M12 35c11-12 29-12 40 0l5 6c2 2 1 5-1 6l-8 5c-2 1-4 1-5-1l-5-7c-4-2-8-2-12 0l-5 7c-1 2-3 2-5 1l-8-5c-2-1-3-4-1-6z"/></svg></button><span>Decline</span></div>
      <div class="kcn-action"><button type="button" class="kcn-answer" aria-label="Accept call"><svg viewBox="0 0 64 64" aria-hidden="true"><path d="M12 35c11-12 29-12 40 0l5 6c2 2 1 5-1 6l-8 5c-2 1-4 1-5-1l-5-7c-4-2-8-2-12 0l-5 7c-1 2-3 2-5 1l-8-5c-2-1-3-4-1-6z"/></svg></button><span>Accept</span></div>
    </div>
  `;
  const screen = document.querySelector('.device .screen') || document.body;
  screen.appendChild(note);

  let handled = false;
  const finish = (answer, event) => {
    if (handled) return;
    handled = true;
    if (event) {
      event.preventDefault();
      event.stopPropagation();
    }
    note.classList.add('kcn-out');
    setTimeout(() => note.remove(), 220);
    if (answer) {
      // Mulai dalam gesture pengguna agar browser mobile mengizinkan audio.
      if (window.Call && typeof window.Call.startVoice === 'function') {
        window.Call.startVoice();
      } else {
        const fallback = document.createElement('div');
        fallback.className = 'vcall-root voice-only';
        fallback.innerHTML = '<div class="vcall-stage voice-stage"><div class="vcall-top"><div class="vcall-pill">Panggilan Suara</div><div class="vcall-name">Karen</div><div class="vcall-status">Terhubung</div><div class="vcall-timer">00:00</div></div><div class="vcall-controls"><button type="button" class="vcall-btn end" aria-label="Akhiri">end</button></div></div>';
        screen.appendChild(fallback);
        fallback.querySelector('.end').addEventListener('click', () => fallback.remove());
      }
    }
  };

  const decline = note.querySelector('.kcn-decline');
  const answer = note.querySelector('.kcn-answer');
  // touchend untuk Safari/iOS, click sebagai fallback desktop dan assistive input.
  decline.addEventListener('touchend', (e) => finish(false, e), { passive: false });
  answer.addEventListener('touchend', (e) => finish(true, e), { passive: false });
  decline.addEventListener('click', (e) => finish(false, e));
  answer.addEventListener('click', (e) => finish(true, e));
}

// Titik masuk: menyalakan semua bagian dan menangani keyboard.
function boot() {
  const lockSrc = CONFIG.wallpapers.lock + '?v=2';
  const homeSrc = CONFIG.wallpapers.home + '?v=2';
  $('#wpLock').style.cssText = bgStyle(lockSrc, CONFIG.wallpaperFallback.lock);
  $('#wpHome').style.cssText = bgStyle(homeSrc, CONFIG.wallpaperFallback.home);
  // Fallback jika gambar gagal load
  const img = new Image();
  img.onerror = () => {
    $('#wpLock').style.background = CONFIG.wallpaperFallback.lock;
  };
  img.src = lockSrc;

  initLock();
  tick();
  setInterval(tick, 10000);

  renderCalendar();
  renderWeather();
  setInterval(renderWeather, 15 * 60 * 1000);
  renderHome();

  Screen.show('lock');
  setTimeout(showKarenCallNotification, 2600);
}

document.addEventListener('keydown', (e) => {
  if (Viewer.isOpen()) {
    if (e.key === 'Escape') Viewer.close();
    else if (e.key === 'ArrowRight') Viewer.step(1);
    else if (e.key === 'ArrowLeft') Viewer.step(-1);
    return;
  }
  if (Screen.current() === 'passcode') {
    if (/^\d$/.test(e.key)) Passcode.press(e.key);
    else if (e.key === 'Backspace') Passcode.press('del');
    else if (e.key === 'Escape') Passcode.cancel();
    return;
  }
  if (e.key === 'Escape' && Router.isOpen()) Router.back();
});

boot();