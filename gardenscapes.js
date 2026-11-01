// Township: tampilan aplikasi memakai gambar ikon asli yang diberikan pengguna.
registerApp('gardenscapes', (root) => {
  root.innerHTML = `
    <div style="height:100%;overflow:auto;background:#f5f0e7;text-align:center;padding:18px 16px 28px;box-sizing:border-box;">
      <img src="assets/icons/township.jpg" alt="Township" style="display:block;width:100%;max-width:340px;aspect-ratio:1;object-fit:contain;margin:0 auto 18px;border-radius:18px;">
      <h2 style="margin:8px 0;color:#2d5a1e;font-size:26px;">Township</h2>
      <p style="color:#555;line-height:1.5;">Game puzzle dan taman.</p>
      <a href="https://township.playrix.com/" target="_blank" rel="noopener noreferrer" style="display:inline-block;margin-top:12px;padding:12px 22px;border-radius:24px;background:#5a9e3a;color:white;text-decoration:none;font-weight:700;">Buka Township</a>
    </div>`;
});
