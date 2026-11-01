// =====================================================================
// ROUTER: buka/tutup aplikasi, tumpukan halaman, dan tombol kembali
// =====================================================================

// Daftar render setiap aplikasi. Diisi oleh file di js/apps/.
const APP_RENDER = {};
function registerApp(id, render) { APP_RENDER[id] = render; }

// Buka/tutup aplikasi. Setiap aplikasi bisa membuka sub-halaman lewat api.push(judul, fungsiRender).
const Router = (() => {
  const layer = $('#appLayer');
  const screenEl = $('#screen');
  let stack = [];

  function syncStatus() {
    const top = stack[stack.length - 1];
    screenEl.classList.toggle('status-dark', !!top && !top.app.dark);
  }

  function open(id) {
    if (stack.length) return;
    // Semua aplikasi yang tersedia berada di home screen.
    const app = APPS.find((a) => a.id === id);
    const render = APP_RENDER[id];
    if (!app || !render) {
      console.warn('Aplikasi tidak ditemukan atau belum terdaftar:', id);
      return;
    }

    const win = el('div', 'app-window' + (app.dark ? ' dark' : '') + (id === 'line' || id === 'kakaotalk' ? ' kakaotalk-window' : ''));
    win.innerHTML = `
      <header class="app-header">
        <button class="back-btn" type="button" aria-label="Kembali">
          ${svg('back', { size: 26, color: '#0a84ff', sw: 2.4 })}<span class="back-label">Kembali</span>
        </button>
        <h1 class="app-title"></h1>
        <span class="header-spacer"></span>
      </header>
      <div class="app-stack"></div>`;
    layer.appendChild(win);

    const inst = {
      app, win,
      stackEl: $('.app-stack', win),
      titleEl: $('.app-title', win),
      backEl: $('.back-label', win),
      pages: [],
    };
    inst.api = { push: (title, r) => pushPage(inst, title, r), back };
    $('.back-btn', win).addEventListener('click', back);

    stack.push(inst);
    syncStatus();
    pushPage(inst, app.name, render);

    // setTimeout lebih andal di browser HP dibanding requestAnimationFrame ganda
    setTimeout(() => win.classList.add('open'), 30);
  }

  function pushPage(inst, title, render) {
    const prev = inst.pages[inst.pages.length - 1];
    const page = el('div', 'app-page enter');
    inst.stackEl.appendChild(page);

    try {
      render(page, inst.api);
    } catch (err) {
      console.error('Gagal merender halaman:', title, err);
      page.innerHTML = `
        <div class="placeholder">
          <p>Aplikasi belum bisa dibuka.<br><small>${esc(err.message)}</small></p>
        </div>`;
    }

    inst.pages.push({ title, el: page });
    if (prev) prev.el.classList.add('under');
    requestAnimationFrame(() => requestAnimationFrame(() => page.classList.remove('enter')));
    updateHeader(inst);
  }

  function popPage(inst) {
    const top = inst.pages.pop();
    top.el.classList.add('leave');
    setTimeout(() => top.el.remove(), 380);
    const prev = inst.pages[inst.pages.length - 1];
    if (prev) prev.el.classList.remove('under');
    updateHeader(inst);
  }

  function updateHeader(inst) {
    const cur = inst.pages[inst.pages.length - 1];
    const prev = inst.pages[inst.pages.length - 2];
    inst.titleEl.textContent = cur.title;
    inst.backEl.textContent = prev ? prev.title : 'Kembali';
  }

  function closeApp(inst) {
    stack = stack.filter((x) => x !== inst);
    inst.win.classList.remove('open');
    setTimeout(() => inst.win.remove(), 400);
    syncStatus();
  }

  function back() {
    const inst = stack[stack.length - 1];
    if (!inst) return;
    if (inst.pages.length > 1) popPage(inst);
    else closeApp(inst);
  }

  return { open, back, isOpen: () => stack.length > 0 };
})();
