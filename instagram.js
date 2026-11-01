// =====================================================================
// PROFIL INSTAGRAM Karen Vasco. Semua teks & foto bisa diganti di sini.
// Foto yang dipakai: assets/instagram/ dan assets/profile/winay.jpg
// =====================================================================
const INSTAGRAM = {
  username: 'wilonaaxel',
  displayName: 'Wilona',
  pronouns: '',
  verified: true,

  // Bubble catatan di atas foto profil (kosongkan '' jika tidak mau)
  note: '🥰',

  avatar: 'assets/instagram/avatars/wilonaaxel.jpg',

  bioLines: [
    'living quietly, loving deeply.',
    '୨ৎ grace in every little detail',
    '♡ collecting moments, not attention',
  ],

  link: 'wilonaaxel',

  // Pill musik di bawah bio (kosongkan null jika tidak mau)
  music: { title: 'Wherever You Are', artist: 'ONE OK ROCK' },

  dashboard: '4,6 rb penayangan dalam 30 hari terakhir',

  followers: '13,6Jt',
  following: 5,
  postCount: 327,

  // 6 postingan memakai foto asli yang dikirim pengguna, tanpa mengedit gambar.
  posts: [
    { src: 'assets/instagram/post-1.jpg', color: '#000000' },
    { src: 'assets/instagram/post-2.jpg', color: '#000000' },
    { src: 'assets/instagram/post-3.jpg', color: '#000000' },
    { src: 'assets/instagram/post-4.jpg', color: '#000000' },
    { src: 'assets/instagram/post-5.jpg', color: '#000000' },
    { src: 'assets/instagram/post-6.jpg', color: '#000000' },
  ],

  // Highlight Wilona — foto asli dari pengguna, tidak diubah.
  highlights: [
    { title: 'drive 🖤', src: 'assets/instagram/wilona-highlight-drive.jpeg', color: '#000000' },
    { title: 'you & me ♡', src: 'assets/instagram/wilona-highlight-us.jpeg', color: '#000000' },
    { title: 'memories ✨', src: 'assets/instagram/wilona-highlight-memories.jpeg', color: '#000000' },
  ],
};

// =====================================================================
// HELPER RENDER BIO INSTAGRAM
// Fungsi ini mengubah baris teks bio menjadi HTML & mewarnai @mention jadi biru
// =====================================================================
function renderBioLines(lines) {
  return lines.map((line) => {
    // Escaping teks biasa dulu agar aman
    const safeLine = esc(line);
    // Mengubah kata berawalan @ menjadi teks berwarna biru (Instagram Blue)
    return safeLine.replace(/@([a-zA-Z0-9_.]+)/g, '<span style="color: #00376b; font-weight: 500;">@$1</span>');
  }).join('<br>');
}