// =====================================================================
// GRUP LINE: keluarga Wilona
// Member: Papa (Darion), Mama (Aleya) — Wilona = self (hanni)
// Ortu tahu ada sesuatu, tidak masalahkan.
// Percakapan keluarga Wilona.
// =====================================================================
const CHAT_AESPA = {
  id: 'aespa',
  name: 'Keluarga 💬',
  group: true,
  members: ['taeyeon', 'jessica', 'altina'],
  unread: 4,
  avatar: 'assets/profile/aespa-group.jpg',
  color: '#ffb3c6',
  messages: [
    // ===== 24 Oktober: Papa dan Mama merekrut Karen sebagai bodyguard =====
    { from: 'taeyeon', time: '2026-10-24T08:00:00', text: 'Wilona, Papa dan Mama sudah memutuskan untuk merekrut Karen sebagai bodyguard pribadimu mulai hari ini.', read: true },
    { from: 'hanni', time: '2026-10-24T08:02:00', text: 'HAH? Bodyguard? Aku nggak butuh orang yang ngikutin aku ke mana-mana!', read: true },
    { from: 'jessica', time: '2026-10-24T08:04:00', text: 'Sayang, ini bukan untuk membatasi kamu. Kami ingin kamu tetap aman, terutama dengan situasi keluarga dan perusahaan belakangan ini.', read: true },
    { from: 'hanni', time: '2026-10-24T08:06:00', text: 'Tapi hidupku jadi kayak diawasi 24 jam. Aku bahkan nggak bisa pergi sendiri?', read: true },
    { from: 'taeyeon', time: '2026-10-24T08:08:00', text: 'Papa mengerti kamu tidak suka diawasi. Tapi keputusan ini kami ambil demi kebaikan dan keamananmu.', read: true },
    { from: 'hanni', time: '2026-10-24T08:10:00', text: 'Aku tetap nggak terima. Kenapa kalian nggak pernah tanya aku dulu?', read: true },
    { from: 'jessica', time: '2026-10-24T08:12:00', text: 'Mama minta kamu beri Karen kesempatan dulu. Dia profesional dan akan menghormati batasanmu.', read: true },
    { from: 'hanni', time: '2026-10-24T08:14:00', text: 'Aku akan coba. Tapi aku nggak janji bakal suka.', read: true },

    // ===== 1 November: Wilona menceritakan pertengkaran hebat dengan Karen =====
    { from: 'hanni', time: '2026-11-01T19:10:00', text: 'Mama. Papa. Aku baru saja bertengkar hebat sama Karen.', read: true },
    { from: 'jessica', time: '2026-11-01T19:11:00', text: 'Apa yang terjadi, sayang? Kamu aman sekarang?', read: true },
    { from: 'hanni', time: '2026-11-01T19:13:00', text: 'Aku muak terus diawasi. Aku bilang aku nggak mau ada bodyguard lagi dan menyuruh dia pergi.', read: true },
    { from: 'taeyeon', time: '2026-11-01T19:15:00', text: 'Kalian bertengkar sampai sejauh itu?', read: true },
    { from: 'hanni', time: '2026-11-01T19:17:00', text: 'Iya. Aku ngomong kasar banget. Dia juga akhirnya bilang dia capek selalu disalahkan padahal cuma menjalankan tugasnya.', read: true },
    { from: 'hanni', time: '2026-11-01T19:19:00', text: 'Terus dia pergi. Aku pikir dia bakal tetap datang besok, tapi dia benar-benar pergi.', read: true },
    { from: 'jessica', time: '2026-11-01T19:21:00', text: 'Mama nggak akan menyalahkan kamu karena merasa ruang pribadimu terganggu. Perasaanmu valid, sayang.', read: true },
    { from: 'taeyeon', time: '2026-11-01T19:23:00', text: 'Papa juga tidak menyalahkan kamu. Kami yang memilih merekrut Karen demi keamananmu, tapi seharusnya kebutuhan dan batasanmu tetap didengar.', read: true },
    { from: 'hanni', time: '2026-11-01T19:25:00', text: 'Aku cuma pengin punya kendali atas hidupku sendiri. Tapi sekarang semuanya jadi berantakan.', read: true },
    { from: 'jessica', time: '2026-11-01T19:27:00', text: 'Tenangkan dirimu dulu. Jangan paksa diri mengambil keputusan saat masih marah. Mama dan Papa ada di sini.', read: true },

    // ===== 2–5 November: Wilona mulai merasa kehilangan dan kesepian =====
    { from: 'hanni', time: '2026-11-02T20:05:00', text: 'Rumah sepi banget malam ini.', read: true },
    { from: 'jessica', time: '2026-11-02T20:07:00', text: 'Kamu mau Mama temani?', read: true },
    { from: 'hanni', time: '2026-11-02T20:09:00', text: 'Bukan itu... biasanya Karen ada di dekat pintu atau nanya aku sudah makan belum.', read: true },
    { from: 'hanni', time: '2026-11-04T18:30:00', text: 'Aku masih nggak mau bodyguard lain. Aku nggak mau orang asing menggantikan dia.', read: true },
    { from: 'taeyeon', time: '2026-11-04T18:32:00', text: 'Papa paham. Kamu tidak harus menerima pengganti Karen sekarang.', read: true },
    { from: 'hanni', time: '2026-11-05T08:20:00', text: 'Aku baru sadar, ternyata hari-hariku lebih berwarna waktu Karen ada. Aku kangen dia, Pa, Ma.', read: true },
    { from: 'jessica', time: '2026-11-05T08:22:00', text: 'Mama tahu kamu merindukannya. Tapi Karen juga mungkin terluka. Beri dia waktu, ya.', read: true },
    { from: 'hanni', time: '2026-11-05T08:24:00', text: 'Aku sudah chat dia berkali-kali. Nggak satu pun dibalas.', read: true },
    { from: 'taeyeon', time: '2026-11-05T08:26:00', text: 'Kalau nanti kamu siap, kita akan coba menghubunginya dengan baik-baik. Papa tidak akan memaksanya.', read: true },

    // ===== 6–10 November: Kak Altina membantu Wilona dan Karen =====
    { from: 'altina', time: '2026-11-06T19:00:00', text: 'Aku baca chat kalian dari tadi. Wilona, Kakak tahu kamu masih kesal, tapi Kakak juga tahu kamu sebenarnya kehilangan Karen.', read: true },
    { from: 'hanni', time: '2026-11-06T19:02:00', text: 'Kak, aku bingung. Aku yang nyuruh dia pergi, tapi sekarang aku malah nungguin chat dia setiap hari.', read: true },
    { from: 'altina', time: '2026-11-06T19:04:00', text: 'Kamu boleh menyesal, tapi jangan cuma minta dia kembali. Coba pikirkan apa yang bikin Karen terluka dan apa yang bisa kamu ubah.', read: true },
    { from: 'jessica', time: '2026-11-06T19:06:00', text: 'Mama sudah mencoba bicara baik-baik, tapi Wilona masih menutup diri. Mama dan Papa kadang bingung harus bersikap bagaimana.', read: true },
    { from: 'taeyeon', time: '2026-11-06T19:08:00', text: 'Papa ingin membantu, tapi setiap kali membahas Karen, Wilona malah makin sedih atau marah. Papa tidak mau menekannya.', read: true },
    { from: 'altina', time: '2026-11-06T19:10:00', text: 'Pa, Ma, jangan dipaksa dulu. Wilona perlu merasa didengar, bukan diatur. Biar Kakak temani dia bicara pelan-pelan.', read: true },
    { from: 'hanni', time: '2026-11-07T20:15:00', text: 'Kak, aku nggak mau bodyguard lain. Aku cuma mau Karen. Tapi aku takut dia sudah nggak mau ketemu aku.', read: true },
    { from: 'altina', time: '2026-11-07T20:17:00', text: 'Kakak nggak bisa menjanjikan Karen akan langsung kembali. Tapi Kakak bisa bantu kamu menyampaikan permintaan maaf tanpa memaksanya.', read: true },
    { from: 'jessica', time: '2026-11-08T09:00:00', text: 'Terima kasih, Altina. Mama lega ada kamu yang bisa membuat Wilona mau bicara. Mama dan Papa benar-benar sempat kehabisan cara.', read: true },
    { from: 'altina', time: '2026-11-08T09:03:00', text: 'Kita hadapi sama-sama, Ma. Wilona bukan sengaja ingin menyakiti siapa pun. Dia perlu belajar mengungkapkan rasa takut dan kesalnya dengan lebih baik.', read: true },
    { from: 'taeyeon', time: '2026-11-09T18:30:00', text: 'Papa setuju. Papa juga akan introspeksi. Mungkin sejak awal kami terlalu fokus pada keamanan sampai lupa melibatkan Wilona dalam keputusan itu.', read: true },
    { from: 'hanni', time: '2026-11-10T21:00:00', text: 'Aku sudah siap minta maaf ke Karen. Kak Altina bantu aku susun kata-katanya, ya. Aku nggak mau dia merasa dipaksa pulang.', read: true },
    { from: 'altina', time: '2026-11-10T21:02:00', text: 'Tentu. Kita tulis dengan jujur. Kamu bisa bilang kamu menyesal, kamu merindukannya, dan kamu akan menghormati keputusannya.', read: true },

    // ===== 15 November: Kedua orang tua berusaha mencari Karen =====
    { from: 'hanni', time: '2026-11-15T20:10:00', text: 'Mama, Papa... aku nggak kuat terus begini. Aku kangen Karen. Tolong cari tahu dia di mana.', read: true },
    { from: 'jessica', time: '2026-11-15T20:12:00', text: 'Mama dan Papa akan coba menghubunginya. Tapi kamu juga harus siap mendengarkan perasaannya, bukan hanya meminta dia kembali.', read: true },
    { from: 'taeyeon', time: '2026-11-15T20:14:00', text: 'Papa akan mencari Karen dan bicara langsung dengannya. Kami ingin tahu apakah dia bersedia kembali.', read: true },
    { from: 'hanni', time: '2026-11-15T20:16:00', text: 'Aku mau minta maaf. Aku nggak seharusnya melampiaskan semuanya ke dia.', read: true },
    { from: 'jessica', time: '2026-11-15T20:18:00', text: 'Itu yang perlu kamu sampaikan nanti, sayang. Jujur dan beri dia kesempatan bicara juga.', read: true },

    // ===== 20 November: Karen bersedia kembali =====
    { from: 'taeyeon', time: '2026-11-20T18:05:00', text: 'Wilona, Papa sudah berhasil bicara dengan Karen. Dia bersedia kembali, tapi ingin kalian membicarakan batasan kerja dan ruang pribadimu dengan jelas.', read: true },
    { from: 'hanni', time: '2026-11-20T18:06:00', text: 'Beneran, Pa? Karen mau kembali?', read: true },
    { from: 'jessica', time: '2026-11-20T18:07:00', text: 'Iya, sayang. Karen juga ingin semuanya berjalan lebih baik. Jangan sia-siakan kesempatan untuk saling mendengarkan.', read: true },
    { from: 'hanni', time: '2026-11-20T18:08:00', text: 'Aku janji akan minta maaf dan nggak akan menyuruh dia pergi cuma karena aku sedang marah.', read: true },
    { from: 'taeyeon', time: '2026-11-20T18:09:00', text: 'Bagus. Keamananmu penting, tapi rasa nyaman dan kepercayaan kalian juga penting.', read: true },

    // ===== 12 Desember: Wilona memberi tahu keluarga bahwa ia dan Karen resmi berpacaran =====
    { from: 'hanni', time: '2026-12-12T20:35:00', text: 'Pa, Ma, Kak Altina... aku mau cerita sesuatu. Hari ini aku dan Karen resmi jadian. ❤️', read: true },
    { from: 'jessica', time: '2026-12-12T20:36:00', text: 'Astaga, sayang! Mama ikut bahagia. Jadi selama ini kalian memang saling menyimpan perasaan?', read: true },
    { from: 'taeyeon', time: '2026-12-12T20:37:00', text: 'Papa senang kamu bahagia, Wilona. Tapi Papa ingin memastikan kalian mengambil keputusan dengan tenang dan tanpa tekanan pekerjaan.', read: true },
    { from: 'hanni', time: '2026-12-12T20:39:00', text: 'Iya, Pa. Penugasan Karen sebagai pengawal pribadiku sudah dialihkan. Kami sepakat ingin saling mengenal sebagai Karen dan Wilona, bukan bodyguard dan orang yang dijaga.', read: true },
    { from: 'altina', time: '2026-12-12T20:40:00', text: 'AKHIRNYA 😭 Kakak sudah curiga dari cara kamu cerita soal Karen. Selamat ya, adik kecil!', read: true },
    { from: 'hanni', time: '2026-12-12T20:41:00', text: 'KAK jangan mulai 😭 aku malu!', read: true },
    { from: 'jessica', time: '2026-12-12T20:42:00', text: 'Mama cuma minta kalian saling menghormati, jujur, dan tidak terburu-buru. Kalau ada masalah, bicarakan baik-baik.', read: true },
    { from: 'taeyeon', time: '2026-12-12T20:44:00', text: 'Papa juga ingin kalian tetap menjaga batasan dan pilihan masing-masing. Kalau kalian bahagia dan saling menghargai, Papa mendukung.', read: true },
    { from: 'altina', time: '2026-12-12T20:45:00', text: 'Kakak tunggu cerita kencan berikutnya. Tapi jangan lupa kabari keluarga kalau pulang malam, ya, Wilona.', read: true },
    { from: 'hanni', time: '2026-12-12T20:46:00', text: 'Iyaaa. Makasih semuanya. Aku senang akhirnya bisa cerita ke keluarga. 🤍', read: true },
    { from: 'jessica', time: '2026-12-12T20:47:00', text: 'Selamat untuk kalian berdua. Sampaikan salam Mama untuk Karen juga.', read: true },
    { from: 'taeyeon', time: '2026-12-13T09:00:00', text: 'Wilona, Papa ingin mengundang Karen makan malam bersama keluarga akhir pekan ini, kalau kalian berdua nyaman.', read: true },
    { from: 'hanni', time: '2026-12-13T09:03:00', text: 'Aku tanya Karen dulu ya, Pa. Tapi kayaknya dia bakal gugup ketemu kalian sebagai pacarku 😂', read: true },
    { from: 'altina', time: '2026-12-13T09:05:00', text: 'Tenang, Kakak yang akan mencairkan suasana. Paling Kakak cuma tanya kapan kalian mulai saling suka 🤭', read: true },
    { from: 'hanni', time: '2026-12-13T09:06:00', text: 'KAK ALTINA!!! jangan interogasi Karen 😭', read: true },
  ],
};