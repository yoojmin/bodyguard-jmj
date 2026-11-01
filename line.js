// =====================================================================
// APLIKASI KAKAOTALK: daftar chat, ruang chat, foto, dan panggilan
// =====================================================================

// ----- Pool balasan otomatis (aman, selalu array) -----
// Karen (bodyguard) — balasan otomatis saat Wilona chat
const MINJI_AUTO_REPLIES = [
  'ada apa?',
  'aku di pos',
  'shift masih jalan',
  'jangan keluar sendirian',
  'nanti aku kabarin',
  'maaf baru bales',
  'lagi briefing',
  'kamu di rumah kan',
  'hati-hati',
  'oke',
  'siap',
  'aku dengerin',
  'jangan khawatir',
  'nanti malam aku di kompleks',
];

// Ningning
const HAERIN_AUTO_REPLIES = [
  'Oke',
  'Iya Karen',
  'Noted',
  'Hati-hati ya',
  'Nanti kabarin',
  'Sip',
  'Haha oke',
  'Min lagi di rumah kan?',
];

// Kak Altina — kakak yang nenangin & percaya Karen
const ALTINA_AUTO_REPLIES = [
  'iya sayang',
  'kakak di sini',
  'jangan sedih dulu ya',
  'napas dulu, pelan-pelan',
  'kakak dukung kamu',
  'karen orang baik',
  'gapapa cerita ke kakak',
  'kamu kuat, tapi gapapa kalau lelah',
  'istirahat dulu ya',
  'sayang adik 🤍',
  'kalau butuh apa-apa bilang',
  'kakak percaya kamu',
  'udah makan belum?',
  'jangan dipendam sendiri',
];

// Manager
const MANAGER_AUTO_REPLIES = [
  'Baik, Karen.',
  'Noted. Nanti saya follow up.',
  'Fokus dulu ya.',
  'Istirahat juga penting.',
  'Oke, saya catat.',
];

// Staff
const STAFF_AUTO_REPLIES = [
  'Baik kak',
  'Siap',
  'Nanti kami bantu',
  'Oke',
  'Langsung kami cek ya',
];

// Grup keluarga (balasan dari member acak)
const AESPA_AUTO_REPLIES = [
  { from: 'hanni', text: 'iyaa, nanti aku kabarin yaa 🤍' },
  { from: 'hanni', text: 'hehe iya, aku ngerti kok' },
  { from: 'hanni', text: 'oke deh, makasih yaa 🥹' },
  { from: 'taeyeon', text: 'iya sayang, kabarin Mama kalau sudah sampai ya' },
  { from: 'taeyeon', text: 'hati-hati di jalan, jangan buru-buru ya' },
  { from: 'jessica', text: 'baik, sayang. kalau butuh apa-apa bilang Mama aja ya 🤍' },
  { from: 'jessica', text: 'iyaa, Mama di sini kok. santai aja yaa' },
  { from: 'jessica', text: 'nanti cerita ke Mama ya kalau sudah senggang' },
];

function pickReply(list) {
  if (!Array.isArray(list) || !list.length) return null;
  return list[Math.floor(Math.random() * list.length)];
}

// ----- Waktu & urutan pesan -----
const tOf = (m) => new Date(m.time).getTime();

// Pesan diurutkan berdasarkan waktu (yang lama di atas, yang baru di bawah)
function sortedMsgs(chat) {
  return [...(Array.isArray(chat.messages) ? chat.messages : [])].sort((a, b) => tOf(a) - tOf(b));
}

// Pesan paling baru dalam chat
function lastMsgOf(chat) {
  const s = sortedMsgs(chat);
  return s[s.length - 1];
}

// Waktu untuk pesan baru: sekarang, tetapi tidak pernah lebih awal dari pesan terakhir.
// Dengan begitu pesan baru selalu muncul di bawah.
function nextTime(chat) {
  const last = lastMsgOf(chat);
  const now = Date.now();
  const t = last ? Math.max(now, tOf(last) + 1000) : now;
  return new Date(t).toISOString();
}

// ----- Ikon & format panggilan -----
const PHONE_PATH = '<path d="M5 4.5h3l1.5 4-2 1.5a11 11 0 006.5 6.5l1.5-2 4 1.5v3a1.5 1.5 0 01-1.5 1.5A16 16 0 013.5 6 1.5 1.5 0 015 4.5z"/>';
const phoneIcon = (color, size = 18) =>
  `<svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="${color}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${PHONE_PATH}</svg>`;

// Durasi dalam detik → "47 min 12 sec"
const fmtDur = (s) => `${Math.floor(s / 60)} min ${s % 60} sec`;

// Warna, judul, dan keterangan tiap jenis panggilan
function callInfo(m) {
  const outgoing = m.from === 'hanni';
  if (m.status === 'answered') {
    return {
      color: outgoing ? '#0a84ff' : '#34c759',
      title: 'Audio Call',
      sub: fmtDur(m.duration),
      label: outgoing ? 'Panggilan keluar' : 'Panggilan masuk',
    };
  }
  return {
    color: '#ff3b30',
    title: outgoing ? 'Audio Call' : 'Missed Audio Call',
    sub: 'Tidak dijawab',
    label: outgoing ? 'Panggilan keluar tak terjawab' : 'Panggilan masuk tak terjawab',
  };
}

// ----- Pratinjau pesan di daftar chat -----
function msgPreview(m) {
  if (m.type === 'photo') return '📷 Foto';
  if (m.type === 'call') return `📞 ${callInfo(m).title}`;
  return m.text;
}

function lastPreview(chat) {
  const last = lastMsgOf(chat);
  if (!last) return '';
  const prefix = last.from === 'hanni' ? 'Kamu: ' : (chat.group ? `${PEOPLE[last.from]?.name || ''}: ` : '');
  return prefix + msgPreview(last);
}

// ----- Hitung pesan belum dibaca (dari lawan bicara, read: false) -----
function unreadOf(c) {
  const messages = Array.isArray(c && c.messages) ? c.messages : [];
  return messages.filter((m) => m && m.from !== 'hanni' && !m.read).length;
}

// Memperbarui badge merah di ikon KakaoTalk pada home screen
function updateLineBadge() {
  const total = (Array.isArray(LINE_CHATS) ? LINE_CHATS : []).reduce((sum, c) => sum + unreadOf(c), 0);
  const b = document.querySelector('.app-icon[data-app="line"] .app-badge');
  if (!b) return;
  b.textContent = total;
  b.style.display = total ? 'grid' : 'none';
}

// ----- Bottom tab bar KakaoTalk -----
function lineTabBar(active) {
  const bar = el('nav', 'line-tabbar');
  bar.setAttribute('aria-label', 'KakaoTalk navigation');
  const icons = {
    home: '<svg viewBox="0 0 32 32" aria-hidden="true"><circle cx="12" cy="8" r="5"/><path d="M2.5 27v-3.2c0-5 4.2-8.3 9.5-8.3s9.5 3.3 9.5 8.3V27z"/><circle cx="23" cy="10" r="3.8"/><path d="M22 17c4.5-.3 7.5 2.4 7.5 6.2V27h-5" fill="none" stroke="currentColor" stroke-width="2.5"/></svg>',
    chats: '<svg viewBox="0 0 32 32" aria-hidden="true"><path d="M16 3C8.5 3 2.5 8.2 2.5 14.7c0 3.7 2.1 7 5.5 9.1L7 29l6.2-3.1c.9.2 1.9.3 2.8.3 7.5 0 13.5-5.2 13.5-11.5S23.5 3 16 3z"/></svg>',
    calls: '<svg viewBox="0 0 32 32" aria-hidden="true"><path d="M8 3.5 13 9l-3 4c1.8 3.7 4.2 6.1 8 8l4-3 5.5 5-2.1 5c-.5 1.2-1.8 1.8-3.1 1.5C12.1 26.8 5.2 19.9 2.5 9.7 2.2 8.4 2.8 7.1 4 6.6z"/></svg>',
    more: '<svg viewBox="0 0 32 32" aria-hidden="true"><circle cx="5" cy="16" r="3.2"/><circle cx="16" cy="16" r="3.2"/><circle cx="27" cy="16" r="3.2"/></svg>'
  };
  const tabs = [
    { id: 'home', label: 'Friends' },
    { id: 'chats', label: 'Chats' },
    { id: 'calls', label: 'Calls' },
    { id: 'more', label: 'More' },
  ];
  tabs.forEach((t) => {
    const b = el('button', 'line-tab' + (t.id === active ? ' active' : ''));
    b.type = 'button';
    b.dataset.tab = t.id;
    b.setAttribute('aria-label', t.label);
    b.setAttribute('aria-current', t.id === active ? 'page' : 'false');
    b.innerHTML = `<span class="line-tab-ico">${icons[t.id]}${t.id === 'home' ? '<span class="line-tab-badge">24</span>' : ''}</span><span class="line-tab-label">${t.label}</span>`;
    bar.appendChild(b);
  });
  return bar;
}

function renderLineHome(page, api) {
  page.innerHTML = '';
  page.classList.add('line-tab-page');
  const body = el('div', 'line-tab-body');
  body.innerHTML = `
    <div class="line-section-title">KakaoTalk</div>
    <div class="line-home-card">
      <div class="line-home-name">Karen🖕🏻</div>
      <div class="line-home-sub">Online • Di pos belakang</div>
    </div>
    <div class="line-home-card">
      <div class="line-home-name">Status hari ini</div>
      <div class="line-home-sub">Shift bodyguard. Jaga jarak biar kamu lega.</div>
    </div>`;
  page.appendChild(body);
  const bar = lineTabBar('home');
  page.appendChild(bar);
  bindLineTabs(page, bar, api);
}

function renderLineNews(page, api) {
  page.innerHTML = '';
  page.classList.add('line-tab-page');
  const body = el('div', 'line-tab-body');
  body.innerHTML = `
    <div class="line-section-title">News</div>
    <div class="line-home-card">
      <div class="line-home-name">aespa Official</div>
      <div class="line-home-sub">aespa akan world tour tahun depan. Kota pertama Seoul, dilanjut Asia & US leg.</div>
    </div>
    <div class="line-home-card">
      <div class="line-home-name">Dispatch</div>
      <div class="line-home-sub">Ningning terciduk di kafe Seoul kemarin sore. Fans heboh ☕👀</div>
    </div>
    <div class="line-home-card">
      <div class="line-home-name">Kim Corp</div>
      <div class="line-home-sub">Keamanan keluarga CEO diperketat bulan ini.</div>
    </div>`;
  page.appendChild(body);
  const bar = lineTabBar('news');
  page.appendChild(bar);
  bindLineTabs(page, bar, api);
}

function renderLineCalls(page, api) {
  page.innerHTML = '';
  page.classList.add('line-tab-page');
  const body = el('div', 'line-tab-body');
  body.innerHTML = `
    <div class="line-section-title">Panggilan</div>
    <button class="line-call-row" type="button" id="lineStartVcall">
      <div class="line-call-av" style="${bgStyle(CHAT_MINJI.avatar, solid(CHAT_MINJI.color))}"></div>
      <div class="grow">
        <div class="chat-name">Karen🖕🏻</div>
        <div class="chat-last">Video Call</div>
      </div>
      <span class="line-call-action">📹</span>
    </button>
    <button class="line-call-row" type="button" id="lineStartAcall">
      <div class="line-call-av" style="${bgStyle(CHAT_MINJI.avatar, solid(CHAT_MINJI.color))}"></div>
      <div class="grow">
        <div class="chat-name">Karen🖕🏻</div>
        <div class="chat-last">Panggilan Suara</div>
      </div>
      <span class="line-call-action">📞</span>
    </button>
    <div class="line-home-card">
      <div class="line-home-sub">Riwayat: Video call kemarin • 4 menit</div>
    </div>`;
  page.appendChild(body);
  const bar = lineTabBar('calls');
  page.appendChild(bar);
  bindLineTabs(page, bar, api);
  const btn = page.querySelector('#lineStartVcall');
  if (btn) {
    btn.addEventListener('click', () => {
      if (typeof Call !== 'undefined' && Call.start) Call.start();
    });
  }
  const btnA = page.querySelector('#lineStartAcall');
  if (btnA) {
    btnA.addEventListener('click', () => {
      if (typeof Call !== 'undefined' && Call.startVoice) Call.startVoice();
    });
  }
}

function renderLineMore(page, api) {
  page.innerHTML = '';
  page.classList.add('line-tab-page');
  const body = el('div', 'line-tab-body');
  body.innerHTML = `
    <div class="line-section-title">More</div>
    <button class="line-home-card line-more-row" type="button"><span>Settings</span><span>›</span></button>
    <button class="line-home-card line-more-row" type="button"><span>Profile</span><span>›</span></button>
    <button class="line-home-card line-more-row" type="button"><span>Help</span><span>›</span></button>`;
  page.appendChild(body);
  const bar = lineTabBar('more');
  page.appendChild(bar);
  bindLineTabs(page, bar, api);
}

function bindLineTabs(page, bar, api) {
  bar.querySelectorAll('.line-tab').forEach((btn) => {
    btn.addEventListener('click', () => {
      const tab = btn.dataset.tab;
      if (tab === 'home') renderLineHome(page, api);
      else if (tab === 'more') renderLineMore(page, api);
      else if (tab === 'calls') renderLineCalls(page, api);
      else if (tab === 'chats') renderLineChats(page, api);
    });
  });
}

function renderLineChats(page, api) {
  if (api && typeof api.push === 'function') page._lineApi = api;
  page.innerHTML = '';
  page.classList.add('line-tab-page');
  const list = el('div', 'line-list');
  const sorted = [...LINE_CHATS].sort((a, b) => {
    const pin = (b.pinned ? 1 : 0) - (a.pinned ? 1 : 0);
    if (pin !== 0) return pin;
    const ta = lastMsgOf(a) ? tOf(lastMsgOf(a)) : 0;
    const tb = lastMsgOf(b) ? tOf(lastMsgOf(b)) : 0;
    return tb - ta;
  });

  sorted.forEach((c) => {
    const last = lastMsgOf(c);
    const n = unreadOf(c);
    const row = el('button', 'chat-row');
    row.type = 'button';
    row.innerHTML = `
      <div class="chat-av" style="${bgStyle(c.avatar, solid(c.color))}"></div>
      <div class="grow">
        <div class="chat-name">${c.pinned ? '📌 ' : ''}${esc(c.name)}${c.group ? ` <span class="gcount">${(Array.isArray(c.members) ? c.members.length : 0) + 1}</span>` : ''}</div>
        <div class="chat-last">${esc(lastPreview(c))}</div>
      </div>
      <div class="chat-meta">
        <span class="chat-time">${last ? shortDay(last.time) : ''}</span>
        ${n ? `<span class="badge">${n}</span>` : ''}
      </div>`;
    row.addEventListener('click', (event) => {
      event.preventDefault();
      // Gunakan API router yang disimpan saat LINE dibuka.
      const lineApi = (api && typeof api.push === 'function') ? api : page._lineApi;
      if (!lineApi || typeof lineApi.push !== 'function') {
        console.error('LINE: router chat tidak tersedia');
        return;
      }
      try { openChat(lineApi, c); }
      catch (err) {
        console.error('LINE: gagal membuka chat', err);
        lineApi.push(c.name, (p) => {
          p.innerHTML = `<div class="placeholder"><p>Chat belum bisa dibuka.<br><small>${esc(err.message || err)}</small></p></div>`;
        });
      }
    });
    list.appendChild(row);
  });

  const body = el('div', 'line-tab-body');
  body.appendChild(list);
  page.appendChild(body);
  const bar = lineTabBar('chats');
  page.appendChild(bar);
  bindLineTabs(page, bar, api);
}

// ----- Daftar chat (urut: chat terbaru di atas) -----
registerApp('line', (page, api) => {
  page._lineApi = api;
  renderLineChats(page, api);

  // Dibuka dari notifikasi lockscreen: langsung masuk ke chat yang dipilih
  if (typeof PENDING_CHAT !== 'undefined' && PENDING_CHAT) {
    const target = LINE_CHATS.find((c) => c.id === PENDING_CHAT);
    PENDING_CHAT = null;
    if (target) openChat(api, target);
  }
});

// Membuka chat: pesan lawan bicara ditandai sudah dibaca, lalu badge diperbarui
function openChat(api, c) {
  if (!api || typeof api.push !== 'function') throw new Error('Navigasi KakaoTalk belum siap.');
  if (!c || typeof c !== 'object') throw new Error('Data percakapan tidak ditemukan.');
  if (!Array.isArray(c.messages)) c.messages = [];
  c.messages.forEach((m) => { if (m && m.from !== 'hanni') m.read = true; });
  updateLineBadge();
  api.push(c.name || 'Obrolan', (p) => renderChat(p, c));
}

// ----- Foto layar penuh (memakai Viewer). Chat tidak digambar ulang, jadi scroll tetap. -----
function openPhoto(m, idx) {
  Viewer.open(
    m.photos.map((p) => ({ src: p.src, color: p.color, meta: esc(dayLabel(m.time)) })),
    idx
  );
}

// ----- Detail panggilan (overlay di dalam halaman chat) -----
function showCallDetail(page, m) {
  const info = callInfo(m);
  const ov = el('div', 'call-detail');
  ov.innerHTML = `
    <div class="cd-top"><button class="cd-close" type="button">‹ Kembali ke chat</button></div>
    <div class="cd-card">
      <div class="cd-icon" style="background:${info.color}">${phoneIcon('#fff', 28)}</div>
      <div class="cd-title">${info.title}</div>
      <div class="cd-sub">${info.label}</div>
      <div class="cd-rows">
        <div><span>Tanggal</span><b>${dayLabel(m.time)}</b></div>
        <div><span>Waktu</span><b>${hm(m.time)}</b></div>
        <div><span>Durasi</span><b>${m.status === 'answered' ? fmtDur(m.duration) : '—'}</b></div>
      </div>
    </div>`;
  $('.cd-close', ov).addEventListener('click', () => ov.remove());
  page.appendChild(ov);
}

// ----- Isi pesan: teks, foto, atau panggilan -----
function contentHtml(m) {
  if (m.type === 'photo') {
    const photos = Array.isArray(m.photos) ? m.photos : [];
    if (!photos.length) return `<div class="bubble">📷 Foto</div>`;
    const cls = photos.length > 1 ? 'n2' : 'n1';
    const stack = `<div class="photo-stack ${cls}">${photos.map((p, j) =>
      `<div class="chat-photo" role="button" tabindex="0" data-j="${j}" aria-label="Buka foto"
        style="background-color:${p.color};background-image:url('${p.src}');"></div>`).join('')}</div>`;
    return m.caption
      ? `<div class="photo-wrap">${stack}<div class="bubble">${esc(m.caption)}</div></div>`
      : stack;
  }
  if (m.type === 'call') {
    const info = callInfo(m);
    return `<button class="call-card" type="button">
      <span class="call-ico" style="background:${info.color}">${phoneIcon('#fff', 18)}</span>
      <span class="call-txt"><b style="color:${info.color}">${info.title}</b><span>${info.sub}</span></span>
    </button>`;
  }
  return `<div class="bubble">${esc(m.text)}</div>`;
}

function bindContent(row, m, page) {
  row.querySelectorAll('.chat-photo').forEach((b) =>
    b.addEventListener('click', () => openPhoto(m, Number(b.dataset.j))));
  const card = row.querySelector('.call-card');
  if (card) card.addEventListener('click', () => showCallDetail(page, m));
}

// ----- Ruang chat (pesan diurutkan berdasarkan waktu) -----
function renderChat(page, chat) {
  // Pastikan halaman chat selalu dimulai dari keadaan bersih.
  page.innerHTML = '';
  page.classList.add('chat-page');
  const msgs = el('div', 'msgs');
  const bar = el('div', 'inputbar');
  // Fitur kirim foto baru terbuka setelah hubungan Wilona dan Karen mulai
  // hangat/kasmaran (momen saling memilih foto pada 31 Oktober 2026).
  const photoUnlocked = chat.id === 'minji' && Array.isArray(chat.messages) &&
    chat.messages.some((m) => m && m.type === 'photo' && String(m.time || '') >= '2026-10-31T19:40:00');
  bar.innerHTML = `
    ${photoUnlocked ? '<button class="line-photo-send" type="button" aria-label="Kirim foto" title="Kirim foto">＋</button><input class="line-photo-file" type="file" accept="image/*" hidden>' : ''}
    <input type="text" placeholder="Ketik pesan" aria-label="Ketik pesan" autocomplete="off">
    <button class="send" type="button">Kirim</button>`;
  page.append(msgs, bar);
  const input = $('input:not([type="file"])', bar);
  if (photoUnlocked) {
    const photoButton = $('.line-photo-send', bar);
    const photoFile = $('.line-photo-file', bar);
    photoButton.addEventListener('click', () => photoFile.click());
    photoFile.addEventListener('change', () => {
      const file = photoFile.files && photoFile.files[0];
      if (!file) return;
      if (!file.type || !file.type.startsWith('image/')) return;
      const reader = new FileReader();
      reader.onload = () => {
        chat.messages.push({
          from: 'hanni', time: nextTime(chat), type: 'photo',
          photos: [{ src: String(reader.result), color: '#eeeeee' }],
          caption: input.value.trim(), read: false,
        });
        input.value = '';
        photoFile.value = '';
        draw();
      };
      reader.readAsDataURL(file);
    });
  }

  // Tombol video + voice call untuk Wilona (icon)
  if (chat.id === 'minji' || (chat.name && /wilona|wilonaie/i.test(chat.name))) {
    const wrap = el('div', 'line-call-btns');
    const vc = el('button', 'line-vcall-btn');
    vc.type = 'button';
    vc.setAttribute('aria-label', 'Video Call');
    vc.innerHTML = '<img src="assets/icons/vcall.png" alt="Video">';
    vc.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      if (typeof Call !== 'undefined' && Call.start) Call.start();
    });
    const ac = el('button', 'line-acall-btn');
    ac.type = 'button';
    ac.setAttribute('aria-label', 'Panggilan Suara');
    ac.innerHTML = '<img src="assets/icons/acall.png" alt="Suara">';
    ac.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      if (typeof Call !== 'undefined' && Call.startVoice) Call.startVoice();
    });
    wrap.append(vc, ac);
    page.appendChild(wrap);
  }

  const nameOf = (k) => PEOPLE[k]?.name || k;
  const avatarOf = (k) => PEOPLE[k]?.avatar || '';
  const colorOf = (k) => PEOPLE[k]?.color || '#ddd';

  function draw() {
    msgs.innerHTML = '';
    const list = sortedMsgs(chat);
    const lastOwn = list.reduce((acc, m, i) => (m.from === 'hanni' ? i : acc), -1);

    list.forEach((m, i) => {
      const prev = list[i - 1];
      if (!prev || !sameDay(prev.time, m.time)) msgs.appendChild(el('div', 'day-sep', dayLabel(m.time)));

      const me = m.from === 'hanni';
      const cont = !!prev && prev.from === m.from && sameDay(prev.time, m.time);
      const row = el('div', 'msg-row' + (me ? ' me' : ''));

      const readTxt = me && i === lastOwn ? `<div class="read">${m.read ? 'Dibaca' : 'Terkirim'}</div>` : '';
      const meta = `<div class="meta">${readTxt}<div>${hm(m.time)}</div></div>`;
      const content = contentHtml(m);

      if (me) {
        row.innerHTML = `<div class="pair">${meta}${content}</div>`;
      } else {
        row.innerHTML = `
          <div class="mini-av ${cont ? 'ghost' : ''}" style="${bgStyle(avatarOf(m.from), solid(colorOf(m.from)))}"></div>
          <div class="col">
            ${chat.group && !cont ? `<div class="sender">${esc(nameOf(m.from))}</div>` : ''}
            <div class="pair">${content}${meta}</div>
          </div>`;
      }
      bindContent(row, m, page);
      msgs.appendChild(row);
    });
    msgs.scrollTop = msgs.scrollHeight;
  }

  function send() {
    const text = input.value.trim();
    if (!text) return;
    if (!Array.isArray(chat.messages)) chat.messages = [];
    chat.messages.push({ from: 'hanni', text, time: nextTime(chat), read: false });
    input.value = '';
    draw();

    // Pesan Hanni ditandai "Dibaca" setelah sebentar
    setTimeout(() => {
      chat.messages.forEach((m) => { if (m && m.from === 'hanni') m.read = true; });
      draw();
    }, 1200);

    // Balasan otomatis — aman untuk semua chat, tidak akan merusak buka chat
    setTimeout(() => {
      try {
        let replyFrom = null;
        let replyText = null;

        if (chat.id === 'minji') {
          replyFrom = 'minji';
          replyText = pickReply(MINJI_AUTO_REPLIES);
        } else if (chat.id === 'altina') {
          replyFrom = 'altina';
          replyText = pickReply(ALTINA_AUTO_REPLIES);
        } else if (chat.id === 'haerin') {
          replyFrom = 'haerin';
          replyText = pickReply(HAERIN_AUTO_REPLIES);
        } else if (chat.id === 'manager') {
          replyFrom = 'manager';
          replyText = pickReply(MANAGER_AUTO_REPLIES);
        } else if (chat.id === 'staff') {
          replyFrom = 'staff';
          replyText = pickReply(STAFF_AUTO_REPLIES);
        } else if (chat.group && chat.id === 'aespa') {
          const pick = pickReply(AESPA_AUTO_REPLIES);
          if (pick) {
            replyFrom = pick.from;
            replyText = pick.text;
          }
        }

        if (replyFrom && replyText) {
          chat.messages.push({
            from: replyFrom,
            text: replyText,
            time: nextTime(chat),
            read: true,
          });
          draw();
        }
      } catch (err) {
        console.warn('LINE auto-reply dilewati:', err);
      }
    }, 1800 + Math.random() * 1200);
  }

  $('.send', bar).addEventListener('click', send);
  input.addEventListener('keydown', (e) => { if (e.key === 'Enter') send(); });
  draw();
}