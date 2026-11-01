// Ikon pin kecil untuk catatan yang disematkan
const PIN_ICON = `<svg width="14" height="14" viewBox="0 0 24 24" fill="#ff9500" aria-hidden="true" style="flex:none;margin-right:4px">
  <path d="M15.5 3.5l5 5-2.2 1.2-2.6 2.6.3 4.2-2 2-3.3-3.3-5.2 5.2-1-1 5.2-5.2-3.3-3.3 2-2 4.2.3 2.6-2.6z"/>
</svg>`;

registerApp('notes', (page, api) => {
  page.innerHTML = '<div class="large-title">Catatan</div>';
  const group = el('div', 'group');

  const sorted = [...NOTES].sort((a, b) => {
    if (!!b.pinned !== !!a.pinned) return b.pinned ? 1 : -1; // yang pinned di atas
    return new Date(b.date) - new Date(a.date);
  });

  sorted.forEach((n) => {
    const row = el('button', 'row click');
    row.type = 'button';
    row.innerHTML = `
      <div class="grow">
        <div class="row-title" style="display:flex;align-items:center;">
          ${n.pinned ? PIN_ICON : ''}<span class="grow" style="overflow:hidden;text-overflow:ellipsis;white-space:nowrap;">${esc(n.title)}</span>
        </div>
        <div class="sub">${shortDay(n.date)} · ${esc(n.body.split('\n')[0])}</div>
      </div>
      <span class="chev-r">${svg('chevron', { size: 18, color: '#c7c7cc', sw: 2.2 })}</span>`;
    row.addEventListener('click', () => api.push(n.title, (p) => renderNote(p, n)));
    group.appendChild(row);
  });

  page.appendChild(group);
});

function renderNote(page, n) {
  const body = esc(n.body).replace(/\n/g, '<br>');
  page.innerHTML = `
    <div class="note-doc">
      <div class="note-date">${dayLabel(n.date)} · ${hm(n.date)}</div>
      <h2 class="note-title">${esc(n.title)}</h2>
      <div class="note-body" style="line-height:1.55;white-space:normal;">${body}</div>
    </div>`;
}