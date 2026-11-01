// YouTube mini-app: seluruh beranda berisi FMV Jiminjeong.
const JIMINJEONG_FMVS = [
  { title: 'JIMINJEONG — A Love That Feels Like Home', tag: 'soft moments', cover: 'assets/gallery/g1.jpg' },
  { title: 'JIMINJEONG — From Friends to Something More', tag: 'friends to lovers', cover: 'assets/gallery/g3.jpg' },
  { title: 'JIMINJEONG — The Way You Look at Me', tag: 'romantic edit', cover: 'assets/line/minjeong-bed.jpg' },
  { title: 'JIMINJEONG — We Were Happy Once', tag: 'nostalgia', cover: 'assets/line/jimin-gym.jpg' },
  { title: 'JIMINJEONG — The Fight That Changed Us', tag: 'angst · heartbreak', cover: 'assets/music/pertengkaran.jpg' },
  { title: 'JIMINJEONG — I Still Choose You', tag: 'longing · reunion', cover: 'assets/music/rindu.jpg' },
  { title: 'JIMINJEONG — Please Stay', tag: 'emotional FMV', cover: 'assets/music/kembali.jpg' },
  { title: 'JIMINJEONG — Our Little Forever', tag: 'happy ending', cover: 'assets/music/awal-hangat.jpg' }
];

registerApp('youtube', (page, api) => {
  page.innerHTML = `<div class="yt-brand"><span class="yt-logo">▶</span><div><b>YouTube</b><div class="yt-subtitle">Jiminjeong FMV · Fan edits</div></div></div>
    <div class="yt-channel"><div class="yt-channel-avatar">♡</div><div class="yt-channel-copy"><b>Jiminjeong FMV</b><span>Fan-made video edits · Minjeong & Jimin</span></div><span class="yt-subtitle">Playlist</span></div>
    <div class="yt-section-title">Jiminjeong FMV <span>ALL VIDEOS</span></div>`;
  const list = el('div', 'yt-list');
  JIMINJEONG_FMVS.forEach((fmv, i) => {
    const card = el('button', 'yt-card');
    card.type = 'button';
    const query = encodeURIComponent('Jiminjeong FMV Minjeong Jimin');
    const link = `https://www.youtube.com/results?search_query=${query}`;
    card.innerHTML = `<div class="yt-thumb" style="background-image:url('${fmv.cover}')"><span class="yt-play">▶</span><span class="yt-index">${i + 1}</span></div><div class="yt-card-info"><b>${esc(fmv.title)}</b><span>Jiminjeong · ${esc(fmv.tag)}</span><small>Fan-made video edit · Cari di YouTube ↗</small></div><span class="yt-more">⋮</span>`;
    card.addEventListener('click', () => api.push(fmv.title, (sub) => {
      sub.innerHTML = `<div class="yt-watch"><div class="yt-search-art" style="background-image:url('${fmv.cover}');background-size:cover;background-position:center">▶<span>Jiminjeong FMV</span></div><h2>${esc(fmv.title)}</h2><p>Jiminjeong · ${esc(fmv.tag)}</p><a class="yt-open" href="${link}" target="_blank" rel="noopener">Cari FMV Jiminjeong di YouTube ↗</a><p class="yt-disclaimer">FMV adalah fan edit. Pilih video yang ingin ditonton dari hasil pencarian YouTube.</p></div>`;
    }));
    list.appendChild(card);
  });
  page.appendChild(list);
});
