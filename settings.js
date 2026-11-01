// [ikon, warna latar ikon, label, isi kanan (html), tampilkan panah]
// Hanya Wi-Fi yang aktif dan terhubung. Item lain hanya tampilan.
const SETTINGS_GROUPS = [
  [
    ['airplane', '#ff9500', 'Mode Pesawat', '<span class="toggle"></span>', false],
    ['wifi', '#0a84ff', 'Wi-Fi', `<span class="val">${esc(CONFIG.wifi)}</span><span class="check">✓</span>`, true],
    ['bluetooth', '#0a84ff', 'Bluetooth', '<span class="val">Mati</span>', true],
    ['cell', '#34c759', 'Seluler', '<span class="val">Tidak ada SIM</span>', true],
    ['link', '#34c759', 'Hotspot Pribadi', '<span class="val">Mati</span>', true],
  ],
  [
    ['bell', '#ff3b30', 'Notifikasi', '', true],
    ['speaker', '#ff2d55', 'Suara & Haptik', '', true],
    ['moon', '#5856d6', 'Fokus', '', true],
    ['hourglass', '#5856d6', 'Waktu Layar', '', true],
  ],
  [
    ['gear', '#8e8e93', 'Umum', '', true],
    ['control', '#8e8e93', 'Pusat Kontrol', '', true],
    ['sun', '#0a84ff', 'Layar & Kecerahan', '', true],
    ['wallpaper', '#0a84ff', 'Wallpaper', '', true],
    ['access', '#0a84ff', 'Aksesibilitas', '', true],
    ['wave', '#8e8e93', 'Siri & Pencarian', '', true],
  ],
  [
    ['bolt', '#34c759', 'Baterai', '', true],
    ['lock', '#0a84ff', 'Privasi & Keamanan', '', true],
    ['key', '#8e8e93', 'Kata Sandi', '', true],
    ['wallet', '#ff9500', 'Dompet', '', true],
    ['store', '#0a84ff', 'App Store', '', true],
  ],
];

registerApp('settings', (page) => {
  page.innerHTML = `
    <div class="large-title">Pengaturan</div>
    <div class="group">
      <div class="row">
        <div class="avatar-md" style="${bgStyle('assets/profile/settings-profile.jpg', solid(PEOPLE.hanni.color))}"></div>
        <div class="grow">
          <div class="row-title">Wilona Axel</div>
          <div class="sub">Akun, iCloud, Media & Pembelian</div>
        </div>
        <span class="chev-r">${svg('chevron', { size: 18, color: '#c7c7cc', sw: 2.2 })}</span>
      </div>
    </div>`;

  SETTINGS_GROUPS.forEach((items) => {
    const group = el('div', 'group');
    items.forEach(([icon, color, label, right, arrow]) => {
      const r = el('div', 'row');
      r.innerHTML = `
        <span class="ico" style="background:${color}">${svg(icon, { size: 18, color: '#fff', sw: 2 })}</span>
        <span class="grow row-title">${label}</span>
        ${right}
        ${arrow ? `<span class="chev-r">${svg('chevron', { size: 18, color: '#c7c7cc', sw: 2.2 })}</span>` : ''}`;
      group.appendChild(r);
    });
    page.appendChild(group);
  });
});