// =====================================================================
// CHAT WILONA (POV) ↔ KAK ALTINA (kakak kandung)
// from 'hanni' = Wilona, from 'altina' = Kak Altina
// Kakak yang selalu nenangin, gamau liat adik sedih,
// setuju hubungan dengan Karen, sudah menyelidiki latar belakang Karen.
// =====================================================================
const CHAT_ALTINA = {
  id: 'altina',
  name: 'Kak Altina',
  group: false,
  unread: 3,
  avatar: CONFIG.profile.altina || CONFIG.profile.jessica,
  color: PEOPLE.altina?.color || '#f8bbd0',
  messages: [

    // ===== Awal: Wilona curhat setelah ribut dengan Karen =====
    { from: 'hanni', time: '2026-10-24T20:15:00', text: 'kak', read: true },
    { from: 'hanni', time: '2026-10-24T20:15:20', text: 'aku ribut sama karen', read: true },
    { from: 'altina', time: '2026-10-24T20:16:00', text: 'kenapa sayang?', read: true },
    { from: 'hanni', time: '2026-10-24T20:16:40', text: 'aku bilang dia risih. terus minta dia menjauh', read: true },
    { from: 'hanni', time: '2026-10-24T20:17:00', text: 'dia nurut. sekarang hilang', read: true },
    { from: 'altina', time: '2026-10-24T20:18:00', text: 'kamu marah banget waktu itu ya', read: true },
    { from: 'hanni', time: '2026-10-24T20:18:30', text: 'iya… tapi sekarang aneh', read: true },
    { from: 'hanni', time: '2026-10-24T20:18:50', text: 'rumah sepi. aku nyari dia terus', read: true },
    { from: 'altina', time: '2026-10-24T20:20:00', text: 'kakak tau. kamu lagi bingung sama perasaanmu sendiri', read: true },
    { from: 'altina', time: '2026-10-24T20:20:30', text: 'gapapa. pelan-pelan aja. kakak di sini', read: true },
    { from: 'hanni', time: '2026-10-24T20:21:00', text: 'makasih kak 🥹', read: true },

    // ===== Kakak nenangin, tidak suka lihat adik sedih =====
    { from: 'hanni', time: '2026-10-25T14:10:00', text: 'kak altina', read: true },
    { from: 'altina', time: '2026-10-25T14:11:00', text: 'iya wilona', read: true },
    { from: 'hanni', time: '2026-10-25T14:11:30', text: 'aku sedih', read: true },
    { from: 'hanni', time: '2026-10-25T14:11:50', text: 'karen beneran ga muncul-muncul', read: true },
    { from: 'altina', time: '2026-10-25T14:13:00', text: 'shh… jangan nangis dulu', read: true },
    { from: 'altina', time: '2026-10-25T14:13:30', text: 'kakak gamau liat kamu sedih gini', read: true },
    { from: 'altina', time: '2026-10-25T14:14:00', text: 'napas dulu. pelan-pelan', read: true },
    { from: 'hanni', time: '2026-10-25T14:15:00', text: 'aku yang nyuruh dia pergi…', read: true },
    { from: 'altina', time: '2026-10-25T14:16:00', text: 'kamu lagi capek waktu itu. semua orang bisa salah ngomong pas emosi', read: true },
    { from: 'altina', time: '2026-10-25T14:16:40', text: 'yang penting sekarang kamu jujur sama perasaanmu', read: true },
    { from: 'hanni', time: '2026-10-25T14:17:30', text: 'aku kangen dia kak', read: true },
    { from: 'altina', time: '2026-10-25T14:18:00', text: 'iya. kakak denger. gapapa mengakuin itu', read: true },

    // ===== Kakak mendukung hubungan dengan Karen =====
    { from: 'hanni', time: '2026-10-26T21:05:00', text: 'kak', read: true },
    { from: 'hanni', time: '2026-10-26T21:05:20', text: 'kalau aku suka sama karen… kamu marah?', read: true },
    { from: 'altina', time: '2026-10-26T21:07:00', text: 'marah? engga sama sekali', read: true },
    { from: 'altina', time: '2026-10-26T21:07:30', text: 'kakak justru lega kamu bisa cerita', read: true },
    { from: 'hanni', time: '2026-10-26T21:08:00', text: 'serius?', read: true },
    { from: 'altina', time: '2026-10-26T21:09:00', text: 'serius. karen orang yang baik ke kamu', read: true },
    { from: 'altina', time: '2026-10-26T21:09:30', text: 'dia jaga kamu bukan cuma karena kerjaan', read: true },
    { from: 'hanni', time: '2026-10-26T21:10:00', text: 'papa mama gimana?', read: true },
    { from: 'altina', time: '2026-10-26T21:11:00', text: 'nanti kita bicara bareng. tapi kakak dukung kamu', read: true },
    { from: 'altina', time: '2026-10-26T21:11:40', text: 'asal kamu bahagia dan aman, kakak setuju', read: true },
    { from: 'hanni', time: '2026-10-26T21:12:20', text: 'makasih kak… beneran', read: true },
    { from: 'altina', time: '2026-10-26T21:13:00', text: 'selalu. kamu adik kakak', read: true },

    // ===== Kakak sudah menyelidiki latar belakang Karen =====
    { from: 'hanni', time: '2026-10-27T19:30:00', text: 'kak altina', read: true },
    { from: 'altina', time: '2026-10-27T19:31:00', text: 'iyaa', read: true },
    { from: 'hanni', time: '2026-10-27T19:31:30', text: 'kamu yakin banget sama karen ya', read: true },
    { from: 'altina', time: '2026-10-27T19:33:00', text: 'iya. karena kakak cek sendiri', read: true },
    { from: 'hanni', time: '2026-10-27T19:33:20', text: 'cek?', read: true },
    { from: 'altina', time: '2026-10-27T19:34:00', text: 'latar belakangnya. keluarga, rekor kerja, orang-orang di sekitarnya', read: true },
    { from: 'altina', time: '2026-10-27T19:34:40', text: 'bersih. profesional. dan yang paling penting: dia serius jaga kamu', read: true },
    { from: 'hanni', time: '2026-10-27T19:35:20', text: 'kamu bilang ke papa mama?', read: true },
    { from: 'altina', time: '2026-10-27T19:36:00', text: 'belum detail. tapi kakak percaya karen', read: true },
    { from: 'altina', time: '2026-10-27T19:36:30', text: 'makanya kakak tenang kalau kamu deket sama dia', read: true },
    { from: 'hanni', time: '2026-10-27T19:37:00', text: 'kakak hebat…', read: true },
    { from: 'altina', time: '2026-10-27T19:37:40', text: 'bukan hebat. cuma gamau ada yang sakiti adik kakak', read: true },
    { from: 'altina', time: '2026-10-27T19:38:10', text: 'kalau karen yang jaga, kakak lebih tenang', read: true },
    { from: 'hanni', time: '2026-10-27T19:39:00', text: 'aku juga mulai tenang kalau ingat itu', read: true },
    { from: 'altina', time: '2026-10-27T19:40:00', text: 'bagus. sekarang istirahat ya. jangan mikir terus', read: true },
    { from: 'altina', time: '2026-10-27T19:40:30', text: 'kalau sedih lagi, chat kakak. jangan dipendam', read: true },
    { from: 'hanni', time: '2026-10-27T19:41:00', text: 'oke kak. sayang kakak', read: true },
    { from: 'altina', time: '2026-10-27T19:41:30', text: 'sayang adik juga 🤍', read: true },

    // ===== Chat terbaru (belum dibaca) =====
    { from: 'altina', time: '2026-10-30T09:12:00', text: 'wilona, pagi. udah sarapan belum?', read: false },
    { from: 'altina', time: '2026-10-30T09:15:00', text: 'jangan skip makan ya. kakak tau kamu sering lupa kalau lagi overthinking', read: false },
    { from: 'altina', time: '2026-10-30T09:18:00', text: 'kalau butuh ngobrol, kakak online', read: false },
  ],
};
