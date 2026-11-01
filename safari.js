registerApp('safari', (page, api) => {
  page.innerHTML = `
    <div class="large-title">Favorit</div>
    <div class="search-box">${svg('search', { size: 18, color: '#8e8e93', sw: 2 })}
      <input id="sfInput" type="search" placeholder="Cari atau masukkan alamat web" enterkeyhint="search" autocomplete="off"></div>
    <div class="section-label">Riwayat</div>
    <div class="group" id="sfList"></div>`;

  const list = $('#sfList', page);
  SAFARI_HISTORY.forEach((h) => {
    const r = el('button', 'row click');
    r.type = 'button';
    r.innerHTML = `
      <div class="grow">
        <div class="row-title">${esc(h.title)}</div>
        <div class="sub">${esc(h.url)}</div>
      </div>
      <span class="chev-r">${svg('chevron', { size: 18, color: '#c7c7cc', sw: 2.2 })}</span>`;
    r.addEventListener('click', () => api.push(h.title, (p) => renderWebPage(p, h)));
    list.appendChild(r);
  });

  const input = $('#sfInput', page);
  input.addEventListener('keydown', (e) => {
    if (e.key !== 'Enter') return;
    const q = input.value.trim();
    if (!q) return;
    input.value = '';
    input.blur();
    api.push(q.length > 18 ? q.slice(0, 18) + '…' : q, (p) => renderSearchResult(p, q));
  });
});

function renderWebPage(page, h) {
  const body = esc(h.blurb).replace(/\n/g, '<br>');
  page.innerHTML = `
    <div class="web-doc">
      <div class="web-url">🔒 ${esc(h.url)}</div>
      <div class="web-title">${esc(h.title)}</div>
      <div class="web-blurb" style="line-height:1.55;font-size:15px;">${body}</div>
    </div>`;
}

function renderSearchResult(page, q) {
  page.innerHTML = `
    <div class="web-doc">
      <div class="web-title">Hasil untuk “${esc(q)}”</div>
      <div class="web-blurb">Belum ada hasil yang bisa ditampilkan saat ini. Coba lagi nanti.</div>
    </div>`;
}