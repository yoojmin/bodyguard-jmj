// =====================================================================
// LOCKSCREEN + PASSCODE (full rewrite, stabil di mobile)
// Passcode: 1806
// =====================================================================
let PENDING_CHAT = null;

const Screen = (() => {
  const ids = { lock: 'lockScreen', passcode: 'passcode', home: 'home' };
  let current = 'lock';

  function show(name) {
    current = name;
    Object.keys(ids).forEach((key) => {
      const el = document.getElementById(ids[key]);
      if (el) el.classList.toggle('active', key === name);
    });
    const wpLock = document.getElementById('wpLock');
    const wpHome = document.getElementById('wpHome');
    if (wpLock) {
      wpLock.classList.toggle('active', name !== 'home');
      wpLock.classList.toggle('blurred', name === 'passcode');
    }
    if (wpHome) wpHome.classList.toggle('active', name === 'home');
  }

  return {
    show,
    current: () => current,
  };
})();

function unlock() {
  const stack = document.getElementById('notifStack');
  if (stack) stack.innerHTML = '';
  PENDING_CHAT = null;
  Screen.show('home');
}

function openPasscode() {
  const stack = document.getElementById('notifStack');
  if (stack) stack.innerHTML = '';
  Screen.show('passcode');
}

// -------------------- PASSCODE KEYPAD --------------------
const Passcode = (() => {
  const PIN = () => (window.CONFIG && CONFIG.pin) ? String(CONFIG.pin) : '1806';
  const LETTERS = { 2: 'ABC', 3: 'DEF', 4: 'GHI', 5: 'JKL', 6: 'MNO', 7: 'PQRS', 8: 'TUV', 9: 'WXYZ' };
  const LAYOUT = ['1','2','3','4','5','6','7','8','9','','0','del'];

  let input = '';
  let busy = false;
  let built = false;

  function dotsEl() { return document.getElementById('pcDots'); }
  function keysEl() { return document.getElementById('pcKeys'); }

  function paint() {
    const dots = dotsEl();
    if (!dots) return;
    const list = dots.querySelectorAll('.pc-dot');
    list.forEach((d, i) => d.classList.toggle('filled', i < input.length));
  }

  function reset() {
    input = '';
    busy = false;
    const dots = dotsEl();
    if (dots) dots.classList.remove('ok', 'shake');
    paint();
  }

  function success() {
    const dots = dotsEl();
    if (dots) dots.classList.add('ok');
    busy = true;
    setTimeout(() => {
      reset();
      unlock();
    }, 220);
  }

  function fail() {
    const dots = dotsEl();
    if (dots) dots.classList.add('shake');
    busy = true;
    try { if (navigator.vibrate) navigator.vibrate(40); } catch (_) {}
    setTimeout(reset, 420);
  }

  function press(key) {
    if (busy) return;
    const pin = PIN();
    if (key === 'del') {
      input = input.slice(0, -1);
      paint();
      return;
    }
    if (!/^\d$/.test(key)) return;
    if (input.length >= pin.length) return;
    input += key;
    paint();
    if (input.length === pin.length) {
      if (input === pin) success();
      else fail();
    }
  }

  function cancel() {
    reset();
    Screen.show('lock');
  }

  function build() {
    if (built) return;
    const dots = dotsEl();
    const keys = keysEl();
    if (!dots || !keys) return;

    const len = PIN().length;
    dots.innerHTML = Array.from({ length: len }, () => '<span class="pc-dot"></span>').join('');

    keys.innerHTML = '';
    LAYOUT.forEach((k) => {
      if (k === '') {
        const s = document.createElement('span');
        s.className = 'pc-spacer';
        keys.appendChild(s);
        return;
      }
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = k === 'del' ? 'pc-key pc-del' : 'pc-key';
      btn.dataset.key = k;
      if (k === 'del') {
        btn.innerHTML = '⌫';
        btn.setAttribute('aria-label', 'Hapus');
      } else {
        btn.innerHTML = `<span class="pc-num">${k}</span><span class="pc-letters">${LETTERS[k] || ''}</span>`;
      }
      keys.appendChild(btn);
    });

    // Event delegation — lebih andal di mobile
    keys.addEventListener('click', (e) => {
      const btn = e.target.closest('[data-key]');
      if (!btn) return;
      e.preventDefault();
      e.stopPropagation();
      press(btn.dataset.key);
    });

    const cancelBtn = document.getElementById('pcCancel');
    if (cancelBtn) {
      cancelBtn.addEventListener('click', (e) => {
        e.preventDefault();
        cancel();
      });
    }

    built = true;
  }

  return { build, press, cancel, reset };
})();

// -------------------- LOCKSCREEN GESTURE --------------------
function initLock() {
  Passcode.build();

  // Notifikasi sederhana (tidak boleh bikin error)
  try {
    const stack = document.getElementById('notifStack');
    const texts = (typeof LOCK_TEXTS !== 'undefined' && Array.isArray(LOCK_TEXTS))
      ? LOCK_TEXTS
      : [
          'Sudah sampai rumah? Kabari aku kalau sudah, ya. — Karen',
          'Besok aku jemput seperti biasa. Kita sarapan dulu sebelum mulai kerja?',
          'Hari ini menyenangkan. Istirahat yang cukup, Wilona. Sampai besok.'
        ];
    if (stack) {
      let i = 0;
      const show = () => {
        if (Screen.current() !== 'lock' || i >= texts.length) return;
        const b = document.createElement('button');
        b.type = 'button';
        b.className = 'notif';
        b.innerHTML = `
          <div class="notif-av" style="background:#b3c7ff url('${(window.CONFIG && CONFIG.profile && CONFIG.profile.Karen) ? CONFIG.profile.Karen : 'assets/profile/jimin-line.jpg'}') center/cover no-repeat"></div>
          <div class="notif-body">
            <div class="notif-row"><b>Karen</b><span>sekarang</span></div>
            <div class="notif-msg">${texts[i]}</div>
          </div>`;
        b.addEventListener('click', (e) => {
          e.stopPropagation();
          openPasscode();
        });
        stack.appendChild(b);
        requestAnimationFrame(() => b.classList.add('show'));
        i += 1;
        if (i < texts.length) setTimeout(show, 2000);
      };
      setTimeout(show, 3000);
    }
  } catch (_) {}

  const lock = document.getElementById('lockScreen');
  if (!lock) return;

  let startY = null;

  const maybeUnlockGesture = (endY) => {
    if (startY == null) return;
    if (startY - endY > 35) openPasscode();
    startY = null;
  };

  lock.addEventListener('touchstart', (e) => {
    if (e.touches.length === 1) startY = e.touches[0].clientY;
  }, { passive: true });

  lock.addEventListener('touchend', (e) => {
    if (e.changedTouches.length === 1) maybeUnlockGesture(e.changedTouches[0].clientY);
  }, { passive: true });

  lock.addEventListener('mousedown', (e) => { startY = e.clientY; });
  lock.addEventListener('mouseup', (e) => maybeUnlockGesture(e.clientY));

  // Ketuk di mana saja pada lockscreen (kecuali notif) → passcode
  lock.addEventListener('click', (e) => {
    if (e.target.closest('.notif')) return;
    openPasscode();
  });
}

function tick() {
  const d = new Date();
  const t = `${String(d.getHours()).padStart(2, '0')}:${String(d.getMinutes()).padStart(2, '0')}`;
  const st = document.getElementById('statusTime');
  const lt = document.getElementById('lockTime');
  const ld = document.getElementById('lockDate');
  if (st) st.textContent = t;
  if (lt) lt.textContent = t;
  if (ld) {
    ld.textContent = d.toLocaleDateString('id-ID', {
      weekday: 'long', day: 'numeric', month: 'long',
    });
  }
}

// Keyboard support
document.addEventListener('keydown', (e) => {
  if (Screen.current() !== 'passcode') return;
  if (/^\d$/.test(e.key)) Passcode.press(e.key);
  else if (e.key === 'Backspace') Passcode.press('del');
  else if (e.key === 'Escape') Passcode.cancel();
});
