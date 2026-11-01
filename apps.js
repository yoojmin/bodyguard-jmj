// Ikon di home screen — pakai file gambar di assets/icons/
// Hanya aplikasi yang tampil di home screen (rapi)
const APPS = [
  // Aplikasi yang diminta tetap tampil di Home Screen
  { id: 'files',     name: 'File',      icon: 'files',  image: 'assets/icons/files.png',  bg: '#f2f2f7', fg: '#007AFF' },
  { id: 'papago',    name: 'Papago',    icon: 'papago', image: 'assets/icons/papago.png', bg: '#f0faf4', fg: '#00C853' },
  { id: 'phone',     name: 'Telepon',   icon: 'phone',  image: 'assets/icons/phone.png',  bg: '#f2f2f7', fg: '#34C759' },
  { id: 'notes',     name: 'Catatan',     icon: 'notes',     image: 'assets/icons/notes.png',     bg: '#ffffff', fg: '#ffb300' },
  { id: 'photos',    name: 'Galeri',      icon: 'photos',    image: 'assets/icons/gallery.svg',   bg: '#ffffff', fg: '#ff7a59', fill: true },
  { id: 'settings',  name: 'Pengaturan',  icon: 'settings',  image: 'assets/icons/settings.png',  bg: 'linear-gradient(#8e8e93,#636366)', fg: '#ffffff' },
  { id: 'gardenscapes', name: 'Township', icon: 'gardenscapes', image: 'assets/icons/township.jpg', bg: '#7ec850', fg: '#ffffff' },
  { id: 'naver',     name: 'Naver',       icon: 'naver',      image: 'assets/icons/naver.png', bg: '#03c75a', fg: '#ffffff' },
  { id: 'youtube',   name: 'YouTube',     icon: 'youtube',   image: 'assets/icons/youtube.svg', bg: '#ffffff', fg: '#ff0033' },
  { id: 'instagram', name: 'Instagram',   icon: 'instagram', image: 'assets/icons/igapp.png',     bg: 'linear-gradient(45deg,#feda75,#d62976 50%,#962fbf)', fg: '#ffffff', dark: true },
  { id: 'x',         name: 'X',           icon: 'x',         image: 'assets/icons/x.png',         bg: '#000000', fg: '#ffffff', dark: true },
  { id: 'spotify',   name: 'Spotify',     icon: 'spotify',   image: 'assets/icons/spotify.png', bg: '#000000', fg: '#ffffff', dark: true },

  // Dock
  { id: 'safari',    name: 'Safari',      icon: 'safari',    image: 'assets/icons/safari.png',    bg: 'linear-gradient(#5ac8fa,#0a84ff)', fg: '#ffffff', dock: true },
  { id: 'camera',    name: 'Kamera',      icon: 'camera',    image: 'assets/icons/camera.png',    bg: 'linear-gradient(#5a5a5f,#2c2c2e)', fg: '#ffffff', dock: true, dark: true },
  { id: 'line',      name: 'KakaoTalk',   icon: 'line',      image: 'assets/icons/kakaotalk.svg', bg: '#FEE500', fg: '#3C1E1E', dock: true },
  { id: 'music',     name: 'Apple Music', icon: 'music',     image: 'assets/icons/appmusic.webp', bg: '#ffffff', fg: '#fa243c', dock: true },
];

