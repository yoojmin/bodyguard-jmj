// =====================================================================
// CHAT WILONA (POV) ↔ SILVIA (kerabat Karen)
// Silvia menghubungi Wilona untuk menjelaskan ke mana Karen pergi
// selama menghilang setelah pertengkaran pada 1 November.
// =====================================================================
const CHAT_SILVIA = {
  id: 'silvia',
  name: 'Silvia',
  group: false,
  unread: 0,
  avatar: CONFIG.profile.silvia,
  color: PEOPLE.silvia.color,
  messages: [
    { from: 'silvia', time: '2026-12-14T10:02:00', text: 'Hai, kamu Wilona, ya? Aku Silvia, kerabatnya Karen. Maaf tiba-tiba menghubungi.', read: true },
    { from: 'hanni', time: '2026-12-14T10:03:00', text: 'Iya, benar. Silvia? Karen pernah cerita sedikit. Ada apa ya?', read: true },
    { from: 'silvia', time: '2026-12-14T10:04:00', text: 'Aku ingin menjelaskan sesuatu tentang masa ketika Karen menghilang dan tidak membalas pesanmu.', read: true },
    { from: 'hanni', time: '2026-12-14T10:04:40', text: 'Aku memang masih penasaran. Waktu itu aku takut dia benar-benar pergi dari hidupku.', read: true },
    { from: 'silvia', time: '2026-12-14T10:06:00', text: 'Setelah pertengkaran kalian tanggal 1 November, Karen mengajukan pengunduran diri dari penugasan sebagai bodyguard-mu. Dia merasa perlu menjauh dulu supaya kalian berdua bisa menenangkan diri.', read: true },
    { from: 'silvia', time: '2026-12-14T10:07:00', text: 'Dia lalu tinggal sementara di rumah keluarga kami di luar kota. Bukan karena membencimu, Wilona. Dia hanya sangat terpukul dengan kata-kata saat itu.', read: true },
    { from: 'hanni', time: '2026-12-14T10:08:00', text: 'Jadi selama itu dia di rumah keluargamu?', read: true },
    { from: 'silvia', time: '2026-12-14T10:08:40', text: 'Iya. Hari-harinya cukup tenang. Dia membantu urusan keluarga, olahraga, dan mencoba menyusun kembali pikirannya. Ponselnya lebih sering dia diamkan karena setiap kali membaca pesanmu, dia belum tahu harus menjawab apa.', read: true },
    { from: 'hanni', time: '2026-12-14T10:10:00', text: 'Aku kira dia sengaja menghukum aku dengan diamnya...', read: true },
    { from: 'silvia', time: '2026-12-14T10:11:00', text: 'Tidak. Dia tidak sedang ingin menghukummu. Dia takut kalau membalas saat masih terluka, kalian malah bertengkar lagi.', read: true },
    { from: 'silvia', time: '2026-12-14T10:12:00', text: 'Ada satu hal lagi. Sebelum pergi, Karen juga menyampaikan laporan soal orang asing yang mengikuti mobilmu. Dia memastikan informasi itu diteruskan ke tim keamanan Darion. Dia tetap memikirkan keselamatanmu meski sedang menjaga jarak.', read: true },
    { from: 'hanni', time: '2026-12-14T10:13:00', text: 'Aku sama sekali nggak tahu soal itu. Dia nggak pernah cerita...', read: true },
    { from: 'silvia', time: '2026-12-14T10:14:00', text: 'Karen memang bukan orang yang suka menceritakan hal yang dia lakukan. Dia cuma ingin tugasnya selesai dengan baik, tanpa membuatmu merasa dia mengatur hidupmu.', read: true },
    { from: 'hanni', time: '2026-12-14T10:15:00', text: 'Terima kasih sudah cerita. Sekarang aku jadi lebih mengerti kenapa dia butuh waktu.', read: true },
    { from: 'silvia', time: '2026-12-14T10:16:00', text: 'Aku senang kalian akhirnya bisa bicara lagi. Waktu Karen cerita kalian sudah bersama, aku ikut lega. Sudah lama aku nggak melihat dia sesenyum itu.', read: true },
    { from: 'hanni', time: '2026-12-14T10:17:00', text: 'Aku juga bahagia sekarang. Aku akan berusaha lebih memahami dia dan nggak mengulang kesalahan yang sama.', read: true },
    { from: 'silvia', time: '2026-12-14T10:18:00', text: 'Bagus. Jaga satu sama lain, ya. Dan jangan lupa, Karen juga perlu didengar, bukan cuma diminta untuk selalu kuat 🤍', read: true },
    { from: 'hanni', time: '2026-12-14T10:19:00', text: 'Iya, Silvia. Makasih sudah menghubungiku. Salam buat Karen, bilang aku sayang dia 🥹', read: true },
    { from: 'silvia', time: '2026-12-14T10:20:00', text: 'Hahaha, nanti kusampaikan. Tapi sepertinya dia lebih suka dengar langsung darimu. Semoga kalian bahagia, Wilona 🤍', read: true },
  ],
};
