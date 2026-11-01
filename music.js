registerApp('music', (page, api) => {
  page.innerHTML = '<div class="large-title">Perpustakaan</div><div class="section-label">Playlist</div>';
  const grid = el('div', 'pl-grid');
  PLAYLISTS.forEach((pl) => {
    const card = el('button', 'pl-card');
    card.type = 'button';
    card.style.textAlign = 'left';
    card.innerHTML = `
      <div class="pl-cover" style="${bgStyle(pl.cover, solid(pl.color))}"></div>
      <div class="pl-title">${esc(pl.title)}</div>
      <div class="sub">${pl.songs.length} lagu</div>`;
    card.addEventListener('click', () => api.push(pl.title, (p) => renderPlaylist(p, pl)));
    grid.appendChild(card);
  });
  page.appendChild(grid);
});

function renderPlaylist(page, pl) {
  page.innerHTML = `
    <div class="pl-head">
      <div class="pl-cover big" style="${bgStyle(pl.cover, solid(pl.color))}"></div>
      <div class="pl-title big">${esc(pl.title)}</div>
      <div class="sub">Playlist · ${pl.songs.length} lagu</div>
    </div>`;
  const group = el('div', 'group');
  pl.songs.forEach((s, i) => {
    const r = el('div', 'row');
    r.innerHTML = `
      <span class="num">${i + 1}</span>
      <div class="song-art" style="${bgStyle(s.art, solid(s.color))}"></div>
      <div class="grow">
        <div class="row-title">${esc(s.title)}</div>
        <div class="sub">${esc(s.artist)}</div>
      </div>
      <span class="sub">${s.duration}</span>`;
    group.appendChild(r);
  });
  page.appendChild(group);
}