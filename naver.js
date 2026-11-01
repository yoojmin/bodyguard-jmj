// Naver: memakai ikon N asli yang diberikan pengguna.
registerApp('naver', (root) => {
  root.innerHTML = `
    <div style="height:100%;overflow:auto;background:#f7f8fa;text-align:center;padding:24px 18px 32px;box-sizing:border-box;color:#222;">
      <img src="assets/icons/naver.png" alt="Naver" style="display:block;width:104px;height:104px;object-fit:contain;margin:10px auto 16px;">
      <h2 style="margin:8px 0 22px;font-size:28px;color:#03c75a;">NAVER</h2>
      <form id="naverSearchForm" style="display:flex;gap:8px;max-width:420px;margin:0 auto;">
        <input id="naverSearchInput" type="search" placeholder="Cari di Naver" autocomplete="off" style="flex:1;min-width:0;border:1px solid #03c75a;border-radius:12px;padding:13px 14px;font-size:16px;background:#fff;color:#222;">
        <button type="submit" style="border:0;border-radius:12px;padding:0 17px;background:#03c75a;color:#fff;font-size:15px;font-weight:700;">Cari</button>
      </form>
      <a href="https://www.naver.com/" target="_blank" rel="noopener noreferrer" style="display:inline-block;margin-top:20px;padding:12px 22px;border-radius:24px;background:#03c75a;color:white;text-decoration:none;font-weight:700;">Buka Naver</a>
      <p style="margin:22px auto 0;max-width:320px;color:#666;line-height:1.5;font-size:14px;">Cari web melalui Naver. Hasil pencarian dibuka di browser agar dapat dimuat secara langsung.</p>
    </div>`;
  const form = root.querySelector('#naverSearchForm');
  const input = root.querySelector('#naverSearchInput');
  form.addEventListener('submit', (event) => {
    event.preventDefault();
    const q = input.value.trim();
    if (!q) return;
    window.open('https://search.naver.com/search.naver?query=' + encodeURIComponent(q), '_blank', 'noopener,noreferrer');
  });
});
