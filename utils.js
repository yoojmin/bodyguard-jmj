const $ = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => [...r.querySelectorAll(s)];
const el = (tag, cls = '', html = '') => {
  const n = document.createElement(tag);
  if (cls) n.className = cls;
  if (html) n.innerHTML = html;
  return n;
};
const esc = (s) => String(s ?? '').replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const pad = (n) => String(n).padStart(2, '0');
const wait = (ms) => new Promise((r) => setTimeout(r, ms));
const solid = (c) => `linear-gradient(${c},${c})`;

// Gambar dengan warna cadangan: kalau file belum ada, warna yang tampil
// Gambar dengan warna cadangan: kalau file belum ada, warna yang tampil.
// Memakai tanda kutip tunggal agar aman di dalam atribut style="..."
const bgStyle = (src, fill = solid('#999'), size = 'cover') =>
  `background-image:url('${src}'),${fill};background-size:${size},cover;background-position:center;background-repeat:no-repeat;`;

const hm = (iso) => { const d = new Date(iso); return `${pad(d.getHours())}:${pad(d.getMinutes())}`; };
const dayLabel = (iso) => new Date(iso).toLocaleDateString('id-ID', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' });
const sameDay = (a, b) => new Date(a).toDateString() === new Date(b).toDateString();
const shortDay = (iso) => {
  const d = new Date(iso);
  return d.toDateString() === new Date().toDateString()
    ? hm(iso)
    : `${d.getDate()} ${d.toLocaleDateString('id-ID', { month: 'short' })}`;
};