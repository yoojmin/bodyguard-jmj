// Ikon garis tipis bergaya SF Symbols. Tambah ikon baru cukup lewat ICON_PATHS.
const ICON_PATHS = {
  // Aplikasi
  notes: '<rect x="4.5" y="3.5" width="15" height="17" rx="2.5"/><path d="M8 8.5h8M8 12h8M8 15.5h5"/>',
  photos: [0, 60, 120, 180, 240, 300]
    .map((a) => `<ellipse cx="12" cy="7.8" rx="2.8" ry="4.6" transform="rotate(${a} 12 12)"/>`).join(''),
  music: '<path d="M9 17.5V6l10-2.2v11.7"/><circle cx="6.5" cy="17.5" r="2.5"/><circle cx="16.5" cy="15.5" r="2.5"/>',
  settings: '<circle cx="12" cy="12" r="3"/><path d="M12 2.8v2.6M12 18.6v2.6M2.8 12h2.6M18.6 12h2.6M5.5 5.5l1.8 1.8M16.7 16.7l1.8 1.8M5.5 18.5l1.8-1.8M16.7 7.3l1.8-1.8"/>',
  safari: '<circle cx="12" cy="12" r="9"/><path d="M15.5 8.5l-2 5-5 2 2-5z"/>',
  camera: '<path d="M4 8h3.2l1.8-2.5h6l1.8 2.5H20v11H4z"/><circle cx="12" cy="13.2" r="3.4"/>',
  instagram: '<rect x="4" y="4" width="16" height="16" rx="5"/><circle cx="12" cy="12" r="3.8"/><circle cx="16.9" cy="7.1" r=".9" fill="currentColor"/>',
  line: '<path d="M12 4.5c-4.4 0-8 2.9-8 6.5 0 2 1.1 3.8 2.9 5L6.2 19.5l3.9-2.1c.6.1 1.2.1 1.9.1 4.4 0 8-2.9 8-6.5s-3.6-6.5-8-6.5z"/>',

  // Navigasi & umum
  back: '<path d="M15 5l-7 7 7 7"/>',
  chevron: '<path d="M9 5l7 7-7 7"/>',
  search: '<circle cx="11" cy="11" r="6.5"/><path d="M16 16l4.5 4.5"/>',
  sun: '<circle cx="12" cy="12" r="4"/><path d="M12 2v2.5M12 19.5V22M2 12h2.5M19.5 12H22M4.9 4.9l1.8 1.8M17.3 17.3l1.8 1.8M4.9 19.1l1.8-1.8M17.3 6.7l1.8-1.8"/>',
  cloud: '<path d="M7 18h10a4 4 0 000-8 6 6 0 00-11.5 1.5A3.5 3.5 0 007 18z"/>',
  rain: '<path d="M7 14h10a4 4 0 000-8 6 6 0 00-11.5 1.5A3.5 3.5 0 007 14z"/><path d="M8 17l-1 3M12 17l-1 3M16 17l-1 3"/>',

  // Pengaturan
  airplane: '<path d="M11 4h2v6l7 3.5V15l-7-1.5V18l2 1.5V21l-3-1-3 1v-1.5L11 18v-4.5L4 15v-1.5L11 10z"/>',
  bluetooth: '<path d="M7 7.5l10 9-5 4V3.5l5 4.5-10 9"/>',
  cell: '<path d="M4 20v-4M9 20v-8M14 20V8M19 20V4"/>',
  link: '<circle cx="12" cy="12" r="2"/><path d="M8 8a5.7 5.7 0 000 8M16 8a5.7 5.7 0 010 8M5 5a10 10 0 000 14M19 5a10 10 0 010 14"/>',
  bell: '<path d="M6 16V11a6 6 0 0112 0v5l1.5 2h-15z"/><path d="M10 20.5a2 2 0 004 0"/>',
  speaker: '<path d="M4 9h4l5-4v14l-5-4H4z"/><path d="M16.5 9a4 4 0 010 6"/>',
  moon: '<path d="M19 14.5A7.5 7.5 0 019.5 5a7.5 7.5 0 109.5 9.5z"/>',
  hourglass: '<path d="M7 3h10M7 21h10M8 3c0 5 8 5 8 9s-8 4-8 9M16 3c0 5-8 5-8 9s8 4 8 9"/>',
  control: '<rect x="3" y="3" width="8" height="8" rx="2"/><rect x="13" y="3" width="8" height="8" rx="2"/><rect x="3" y="13" width="8" height="8" rx="2"/><rect x="13" y="13" width="8" height="8" rx="2"/>',
  wallpaper: '<circle cx="12" cy="12" r="8"/><path d="M4 12h16M12 4a12 12 0 010 16M12 4a12 12 0 000 16"/>',
  access: '<circle cx="12" cy="12" r="9"/><circle cx="12" cy="8" r="1"/><path d="M8 10h8M12 10v4l-2 4M12 14l2 4"/>',
  wave: '<path d="M4 12c1.5-3 3-3 4.5 0s3 3 4.5 0 3-3 4.5 0"/>',
  lock: '<rect x="5" y="11" width="14" height="10" rx="2"/><path d="M8 11V8a4 4 0 018 0v3"/>',
  key: '<circle cx="8" cy="15" r="4"/><path d="M11 12l9-9M17 6l3 3"/>',
  wallet: '<rect x="3" y="6" width="18" height="13" rx="2.5"/><path d="M16 12.5h2"/>',
  store: '<path d="M5 8h14l-1 12H6z"/><path d="M9 8a3 3 0 016 0"/>',
  bolt: '<path d="M13 3L5 13.5h6L10 21l8-10.5h-6z"/>',
  gear: '<circle cx="12" cy="12" r="3"/><path d="M12 2.8v2.6M12 18.6v2.6M2.8 12h2.6M18.6 12h2.6M5.5 5.5l1.8 1.8M16.7 16.7l1.8 1.8M5.5 18.5l1.8-1.8M16.7 7.3l1.8-1.8"/>',
  x: '<path d="M4 4l7.5 9.5L4 20h2.5l6-7.2L18.5 20H20l-7.8-10L20 4h-2.5l-5.6 6.7L5.5 4H4z"/>',
};

// svg('notes', { size: 24, color: '#ffb300', sw: 1.8, fill: 'none' })
function svg(name, { size = 24, color = 'currentColor', sw = 1.8, fill = 'none' } = {}) {
  return `<svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="${fill}" stroke="${color}" stroke-width="${sw}" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${ICON_PATHS[name] || ''}</svg>`;
}