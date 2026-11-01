// =====================================================================
// Video Call realistis — Wilona
// =====================================================================
const CALL_CONFIG = {
  video: 'assets/video/yoo-jimin-vc.mp4',
  selfcam: 'assets/video/selfcam-minjeong-new.mp4',  // video Wilona baru di bingkai kecil kanan
  voice: 'assets/audio/minjeong-voice.mp3',
  script: [
    { text: 'wilona...', delay: 2000 },
    { text: 'besok mau kencan ga?', delay: 2500 },
    { text: 'kamu mau pergi ke mana?', delay: 2800 },
    { text: 'aku yang bayarin, tenang aja', delay: 2800 },
    { text: 'makan enak, jalan-jalan, terserah kamu', delay: 3000 },
    { text: 'yang penting bareng kamu', delay: 2600 },
  ],
  endHoldMs: 3000,
};

const Call = (() => {
  let root = null;
  let videoEl = null;
  let selfcamEl = null;
  let voiceEl = null;
  let timers = [];
  let tickTimer = null;
  let startAt = 0;

  const later = (fn, ms) => { timers.push(setTimeout(fn, ms)); };
  const clearAll = () => {
    timers.forEach(clearTimeout);
    timers = [];
    clearInterval(tickTimer);
    tickTimer = null;
  };

  function stopMedia() {
    if (videoEl) {
      try {
        videoEl.pause();
        videoEl.removeAttribute('src');
        videoEl.load();
      } catch (_) {}
      videoEl = null;
    }
    if (selfcamEl) {
      try {
        selfcamEl.pause();
        selfcamEl.removeAttribute('src');
        selfcamEl.load();
      } catch (_) {}
      selfcamEl = null;
    }
    if (voiceEl) {
      try {
        voiceEl.pause();
        voiceEl.currentTime = 0;
      } catch (_) {}
      voiceEl = null;
    }
  }

  function mmss(s) {
    return `${String(Math.floor(s / 60)).padStart(2, '0')}:${String(s % 60).padStart(2, '0')}`;
  }

  function close() {
    clearAll();
    stopMedia();
    if (root) {
      const el = root;
      root = null;
      el.classList.add('out');
      setTimeout(() => el.remove(), 250);
    }
  }

  function mountTarget() {
    return document.querySelector('.device .screen') ||
      document.querySelector('.screen') ||
      document.body;
  }

  function start() {
    if (root) close();

    root = document.createElement('div');
    root.className = 'vcall-root';
    root.innerHTML = `
      <div class="vcall-stage">
        <video class="vcall-video" playsinline webkit-playsinline x-webkit-airplay="deny" loop preload="auto"></video>
        <div class="vcall-shade"></div>
        <div class="vcall-top">
          <div class="vcall-pill">Video Call</div>
          <div class="vcall-name">Karen</div>
          <div class="vcall-status">Menghubungkan...</div>
          <div class="vcall-timer" hidden>00:00</div>
        </div>
        <div class="vcall-selfcam" aria-hidden="true">
          <video class="vcall-selfcam-video" playsinline webkit-playsinline loop muted preload="auto"></video>
        </div>
        <div class="vcall-caption"></div>
        <div class="vcall-controls">
          <div class="vcall-ctrl">
            <button type="button" class="vcall-btn mute" aria-label="Mute">mic</button>
            <span>Mute</span>
          </div>
          <div class="vcall-ctrl">
            <button type="button" class="vcall-btn end" aria-label="Akhiri">end</button>
            <span>End</span>
          </div>
          <div class="vcall-ctrl">
            <button type="button" class="vcall-btn cam" aria-label="Kamera">cam</button>
            <span>Flip</span>
          </div>
        </div>
      </div>
    `;
    mountTarget().appendChild(root);

    const statusEl = root.querySelector('.vcall-status');
    const timerEl = root.querySelector('.vcall-timer');
    const captionEl = root.querySelector('.vcall-caption');
    const endBtn = root.querySelector('.vcall-btn.end');

    const endHandler = (e) => {
      e.preventDefault();
      e.stopPropagation();
      close();
    };
    endBtn.addEventListener('click', endHandler);
    endBtn.addEventListener('touchend', endHandler, { passive: false });

    // Video utama (Wilona) — suara langsung aktif, tanpa tombol
    videoEl = root.querySelector('.vcall-video');
    videoEl.muted = false;
    videoEl.defaultMuted = false;
    videoEl.volume = 1;
    videoEl.playsInline = true;
    videoEl.setAttribute('playsinline', 'true');
    videoEl.setAttribute('webkit-playsinline', 'true');
    videoEl.src = CALL_CONFIG.video + '?t=' + Date.now();

    const tryPlay = () => {
      videoEl.muted = false;
      videoEl.volume = 1;
      const p = videoEl.play();
      if (p && typeof p.then === 'function') {
        p.catch(() => {
          // Browser kadang block autoplay + suara: coba lagi setelah interaksi singkat
          setTimeout(() => {
            videoEl.muted = false;
            videoEl.play().catch(() => {});
          }, 200);
        });
      }
    };
    videoEl.addEventListener('loadeddata', tryPlay, { once: true });
    videoEl.addEventListener('canplay', tryPlay, { once: true });
    videoEl.load();
    tryPlay();

    // Selfcam (POV Kamu) — pojok kanan
    selfcamEl = root.querySelector('.vcall-selfcam-video');
    if (selfcamEl) {
      selfcamEl.muted = true;
      selfcamEl.playsInline = true;
      selfcamEl.setAttribute('playsinline', 'true');
      selfcamEl.setAttribute('webkit-playsinline', 'true');
      selfcamEl.src = CALL_CONFIG.selfcam + '?t=' + Date.now();
      const trySelf = () => {
        const p = selfcamEl.play();
        if (p && typeof p.then === 'function') {
          p.catch(() => setTimeout(() => selfcamEl.play().catch(() => {}), 300));
        }
      };
      selfcamEl.addEventListener('loadeddata', trySelf, { once: true });
      selfcamEl.addEventListener('canplay', trySelf, { once: true });
      selfcamEl.load();
      trySelf();
    }

    // Connecting → live
    later(() => {
      if (!root) return;
      statusEl.textContent = 'Video Call';
      timerEl.hidden = false;
      startAt = Date.now();
      tickTimer = setInterval(() => {
        if (!root || !startAt) return;
        timerEl.textContent = mmss(Math.floor((Date.now() - startAt) / 1000));
      }, 500);

      try {
        voiceEl = new Audio(CALL_CONFIG.voice + '?t=' + Date.now());
        voiceEl.volume = 0.95;
        voiceEl.play().catch(() => {});
      } catch (_) {}

      (async () => {
        for (const line of CALL_CONFIG.script) {
          await new Promise((r) => later(r, line.delay));
          if (!root) return;
          captionEl.textContent = line.text;
          captionEl.classList.add('show');
        }
        later(() => {
          if (!root) return;
          captionEl.textContent = 'Call ended';
          later(close, 1000);
        }, CALL_CONFIG.endHoldMs);
      })();
    }, 900);
  }

  return { start, close };
})();

// Voice call (suara saja) dari Wilona
Call.startVoice = function startVoice() {
  if (typeof Call.close === 'function') {
    try { Call.close(); } catch (_) {}
  }

  const root = document.createElement('div');
  root.className = 'vcall-root voice-only';
  root.innerHTML = `
    <div class="vcall-stage voice-stage">
      <div class="voice-bg"></div>
      <div class="voice-photo" aria-hidden="true"></div>
      <div class="voice-photo-shade" aria-hidden="true"></div>
      <div class="vcall-top">
        <div class="vcall-timer" hidden>00:00</div>
        <div class="vcall-name">Karen</div>
        <div class="vcall-status">Menghubungkan...</div>
      </div>
      <div class="voice-caption"></div>
      <div class="voice-call-controls">
        <button type="button" class="voice-call-btn speaker active" aria-label="Speaker"><span class="voice-symbol">◖))</span><small>speaker</small></button>
        <button type="button" class="voice-call-btn keypad" aria-label="Keypad"><span class="voice-symbol">⠿</span><small>keypad</small></button>
        <button type="button" class="voice-call-btn mute" aria-label="Mute"><span class="voice-symbol">♩̸</span><small>mute</small></button>
        <button type="button" class="voice-call-btn add" aria-label="Add call"><span class="voice-symbol">＋</span><small>add call</small></button>
        <button type="button" class="voice-call-btn video" aria-label="Video"><span class="voice-symbol">▣</span><small>video</small></button>
        <button type="button" class="voice-call-btn line" aria-label="LINE"><span class="voice-symbol">LINE</span><small>LINE</small></button>
        <button type="button" class="voice-call-btn hangup" aria-label="Akhiri panggilan"><span class="voice-symbol">×</span></button>
      </div>
      <div class="voice-keypad-panel" hidden>
        <div class="voice-keypad-grid">${['1','2','3','4','5','6','7','8','9','*','0','#'].map(n => `<button type="button">${n}</button>`).join('')}</div>
      </div>
    </div>
  `;
  const mount = document.querySelector('.device .screen') || document.querySelector('.screen') || document.body;
  mount.appendChild(root);

  const statusEl = root.querySelector('.vcall-status');
  const timerEl = root.querySelector('.vcall-timer');
  const captionEl = root.querySelector('.voice-caption');
  const keypadPanel = root.querySelector('.voice-keypad-panel');
  let voiceEl = null;
  let tickTimer = null;
  let startAt = Date.now();
  const timers = [];
  const later = (fn, ms) => timers.push(setTimeout(fn, ms));

  const cleanup = () => {
    timers.forEach(clearTimeout);
    clearInterval(tickTimer);
    if (voiceEl) {
      try { voiceEl.pause(); voiceEl.currentTime = 0; } catch (_) {}
      voiceEl = null;
    }
    root.classList.add('out');
    setTimeout(() => root.remove(), 250);
  };

  // Mulai audio tepat saat tombol Accept disentuh agar Safari/iOS mengizinkan playback.
  try {
    voiceEl = new Audio('assets/audio/karen-call-audio.mp3');
    voiceEl.preload = 'auto';
    voiceEl.volume = 1;
    voiceEl.muted = false;
    const playPromise = voiceEl.play();
    if (playPromise && typeof playPromise.catch === 'function') {
      playPromise.catch(() => {
        statusEl.textContent = 'Ketuk speaker untuk mengaktifkan suara';
      });
    }
  } catch (_) {
    statusEl.textContent = 'Audio tidak tersedia';
  }

  const endCall = (e) => {
    if (e) { e.preventDefault(); e.stopPropagation(); }
    cleanup();
  };
  const bindTap = (el, fn) => {
    el.addEventListener('click', fn);
    el.addEventListener('touchend', (e) => { e.preventDefault(); fn(e); }, { passive: false });
  };
  bindTap(root.querySelector('.hangup'), endCall);
  bindTap(root.querySelector('.speaker'), () => {
    const btn = root.querySelector('.speaker');
    // Ketukan speaker juga menjadi fallback gesture untuk membuka audio di Safari/iOS.
    if (voiceEl && voiceEl.paused) {
      btn.classList.add('active');
      voiceEl.muted = false;
      voiceEl.volume = 1;
      voiceEl.play().then(() => { statusEl.textContent = 'Panggilan Suara'; }).catch(() => { statusEl.textContent = 'Audio belum dapat diputar di browser ini'; });
      return;
    }
    btn.classList.toggle('active');
    if (voiceEl) { voiceEl.volume = btn.classList.contains('active') ? 1 : 0.35; voiceEl.muted = false; }
  });
  bindTap(root.querySelector('.mute'), () => {
    const btn = root.querySelector('.mute');
    btn.classList.toggle('active');
    if (voiceEl) voiceEl.muted = btn.classList.contains('active');
  });
  bindTap(root.querySelector('.keypad'), () => {
    keypadPanel.hidden = !keypadPanel.hidden;
  });
  bindTap(root.querySelector('.add'), () => { captionEl.textContent = 'Fitur tambah panggilan belum tersedia'; captionEl.classList.add('show'); });
  bindTap(root.querySelector('.video'), () => { captionEl.textContent = 'Panggilan suara dengan Karen'; captionEl.classList.add('show'); });
  bindTap(root.querySelector('.line'), () => { captionEl.textContent = 'Tetap terhubung dengan Karen'; captionEl.classList.add('show'); });
  root.querySelectorAll('.voice-keypad-grid button').forEach(btn => bindTap(btn, () => {
    captionEl.textContent = `Nada ${btn.textContent}`;
    captionEl.classList.add('show');
  }));

  timerEl.hidden = false;
  tickTimer = setInterval(() => {
    if (!root.isConnected) return;
    const sec = Math.floor((Date.now() - startAt) / 1000);
    timerEl.textContent = `${String(Math.floor(sec / 60)).padStart(2,'0')}:${String(sec % 60).padStart(2,'0')}`;
  }, 500);
  later(() => {
    if (!root.isConnected) return;
    statusEl.textContent = 'Panggilan Suara';
  }, 500);

  const lines = [
    { t: 'Wilona, kamu sudah sampai?', d: 1800 },
    { t: 'Aku cuma mau memastikan kamu baik-baik saja.', d: 6500 },
    { t: 'Besok aku jemput seperti biasa, ya.', d: 12000 },
    { t: 'Istirahat yang cukup. Sampai besok.', d: 18000 },
  ];
  lines.forEach((line) => later(() => {
    if (!root.isConnected) return;
    captionEl.textContent = line.t;
    captionEl.classList.add('show');
  }, line.d));
};


// Ekspos ke main.js: const global tidak otomatis menjadi properti window.
// Tanpa ini tombol Accept memakai fallback statis sehingga audio dan timer tidak berjalan.
window.Call = Call;
