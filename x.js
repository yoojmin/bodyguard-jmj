// =====================================================================
// APP X (Twitter) - feed interaktif dengan gaya ngobrol sehari-hari
// =====================================================================
registerApp('x', (page) => {
  page.classList.add('x-page');
  const escText = (value) => (typeof esc === 'function' ? esc(String(value)) : String(value).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c])));
  const avStyle = (p) => p.avatar
    ? `background-image:url('${p.avatar}');background-size:cover;background-position:center;background-color:${p.avatarColor || '#333'}`
    : `background:${p.avatarColor || '#333'}`;
  const badge = (p) => p.verified ? '<span class="x-verified" title="Terverifikasi">✔</span>' : '';
  const me = (typeof X_PROFILE !== 'undefined') ? X_PROFILE : { user:'karen', handle:'@karenvasco', avatar:'assets/profile/jimin-x.jpg', verified:true };
  const meAv = me.avatar ? `background-image:url('${me.avatar}');background-size:cover;background-position:center;background-color:#ffb3c6` : 'background:#ffb3c6';
  const feed = (typeof X_FEED !== 'undefined' ? X_FEED : []).map(p => ({...p, liked:false, reposted:false, comments:[]}));
  let activeTab = 'Untuk Anda';
  const renderPosts = () => {
    const shown = activeTab === 'Mengikuti' ? feed.filter(p => p.handle !== me.handle) : feed;
    return shown.map(p => `
      <article class="x-post" data-post="${escText(p.id)}">
        <div class="x-av" style="${avStyle(p)}"></div>
        <div class="x-body">
          <div class="x-meta"><span class="x-name">${escText(p.user)}</span>${badge(p)}<span class="x-handle">${escText(p.handle)}</span><span class="x-dot">·</span><span class="x-time">${escText(p.time)}</span></div>
          <div class="x-text">${escText(p.text)}</div>
          <div class="x-actions">
            <button class="x-action x-reply" data-action="reply" aria-label="Balas">💬 <span>${p.replies + p.comments.length}</span></button>
            <button class="x-action ${p.reposted?'is-reposted':''}" data-action="repost" aria-label="Repost">🔁 <span>${p.reposts + (p.reposted?1:0)}</span></button>
            <button class="x-action ${p.liked?'is-liked':''}" data-action="like" aria-label="Suka">${p.liked?'❤️':'♡'} <span>${p.likes + (p.liked?1:0)}</span></button>
            <button class="x-action" data-action="share" aria-label="Bagikan">↗</button>
          </div>
          ${p.repliesPreview?.length ? `<div class="x-comments x-replies-preview">${p.repliesPreview.map(c=>`<div><b>${escText(c.user)}</b> <span class="x-handle">${escText(c.handle)}</span> ${escText(c.text)}</div>`).join('')}</div>` : ''}
          ${p.comments.length ? `<div class="x-comments">${p.comments.map(c=>`<div><b>${escText(me.user || 'karen')}</b> ${escText(c)}</div>`).join('')}</div>` : ''}
          <div class="x-replybox" hidden><input class="x-reply-input" placeholder="Bales santai aja…" maxlength="240"><button class="x-small-btn" data-action="send-reply">Kirim</button></div>
        </div>
      </article>`).join('');
  };
  const render = () => {
    page.innerHTML = `
      <div class="x-top"><div class="x-top-left"><div class="x-profile-mini" style="${meAv}"></div></div><div class="x-logo">𝕏</div><button class="x-top-right x-notify" aria-label="Notifikasi">✨</button></div>
      <div class="x-tabs"><button class="${activeTab==='Untuk Anda'?'active':''}" data-tab="Untuk Anda">Untuk Anda</button><button class="${activeTab==='Mengikuti'?'active':''}" data-tab="Mengikuti">Mengikuti</button></div>
      <form class="x-compose" id="x-compose-form"><div class="x-compose-av" style="${meAv}"></div><div class="x-compose-fields"><textarea id="x-compose-text" placeholder="Lagi kepikiran apa?" maxlength="280" rows="2"></textarea><div class="x-compose-bottom"><span class="x-compose-hint">Tulis aja, santai ✨</span><button class="x-small-btn" type="submit">Posting</button></div></div></form>
      <div class="x-feed">${renderPosts()}</div>`;
    page.querySelectorAll('[data-tab]').forEach(btn => btn.addEventListener('click', () => { activeTab = btn.dataset.tab; render(); }));
    page.querySelector('#x-compose-form').addEventListener('submit', e => {
      e.preventDefault(); const input = page.querySelector('#x-compose-text'); const text = input.value.trim(); if (!text) { input.focus(); return; }
      feed.unshift({id:'mine-'+Date.now(), user:me.user || 'karen', handle:me.handle || '@karenvasco', avatar:me.avatar || 'assets/profile/jimin-x.jpg', verified:!!me.verified, avatarColor:'#ffb3c6', time:'baru aja', text, likes:0, reposts:0, replies:0, liked:false, reposted:false, comments:[]}); activeTab='Untuk Anda'; render();
    });
    page.querySelector('.x-feed').addEventListener('click', e => {
      const btn = e.target.closest('[data-action]'); if (!btn) return;
      const postEl = btn.closest('[data-post]'); const post = feed.find(p => p.id === postEl?.dataset.post); if (!post) return;
      const action = btn.dataset.action;
      if (action === 'like') { post.liked = !post.liked; render(); }
      else if (action === 'repost') { post.reposted = !post.reposted; render(); }
      else if (action === 'reply') { const box = postEl.querySelector('.x-replybox'); box.hidden = !box.hidden; if (!box.hidden) box.querySelector('input').focus(); }
      else if (action === 'send-reply') { const input = postEl.querySelector('.x-reply-input'); const text = input.value.trim(); if (!text) { input.focus(); return; } post.comments.push(text); render(); }
      else if (action === 'share') { const shareText = `${post.user} (${post.handle}): ${post.text}`; if (navigator.clipboard && navigator.clipboard.writeText) navigator.clipboard.writeText(shareText).catch(()=>{}); btn.textContent = '✓'; setTimeout(()=>{ if(btn.isConnected) btn.textContent='↗'; }, 900); }
    });
    page.querySelector('.x-notify').addEventListener('click', () => { const note = page.querySelector('.x-notice'); if(note) note.remove(); else page.querySelector('.x-top').insertAdjacentHTML('afterend','<div class="x-notice">Kamu nggak ketinggalan apa-apa kok ✨</div>'); });
  };
  render();
});
