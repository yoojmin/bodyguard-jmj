// Nama dan warna tiap karakter (dipakai saat foto belum ada).
const PEOPLE = {
  hanni:    { name: 'Karen',    avatar: CONFIG.profile.hanni,    color: '#ffb3c6' },
  minji:    { name: 'Karen🖕🏻',      avatar: CONFIG.profile.Karen,    color: '#ffb3c6' },
  haerin:   { name: 'Helena',       avatar: CONFIG.profile.haerin,   color: '#c8f0d8' },
  hyein:    { name: 'Giselle',      avatar: CONFIG.profile.hyein,    color: '#e6c8ff' },
  taeyeon:  { name: 'Darion',        avatar: CONFIG.profile.taeyeon, color: '#90caf9' },
  jessica:  { name: 'Aleya',         avatar: CONFIG.profile.jessica, color: '#f48fb1' },
  altina:   { name: 'Kak Altina',    avatar: CONFIG.profile.altina,  color: '#f8bbd0' },
  silvia:   { name: 'Silvia',        avatar: CONFIG.profile.silvia,  color: '#d7c4ef' },
  staff:    { name: 'Staff aespa',  avatar: '', color: '#cfd8dc' },
  manager:  { name: 'Manager',      avatar: '', color: '#90a4ae' },
};

// Pengaturan notifikasi lockscreen.
// Isi bubble diambil dari chat LINE yang punya `notify: true` (lihat js/data/line/minji.js).
const LOCK_NOTIFICATION = {
  time: 'sekarang',
  delayBetweenMs: 2000,
};


// Teks notifikasi yang muncul di lockscreen
const LOCK_TEXTS = [
  'Sudah sampai rumah? Kabari aku kalau sudah. — Karen',
  'Besok aku jemput pukul delapan. Jangan lupa sarapan dulu.',
  'Terima kasih untuk hari ini, Wilona. Aku senang bisa menghabiskan waktu denganmu.',
];
