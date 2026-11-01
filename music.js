// AppMus mengikuti alur hubungan Karen dan Wilona: awal dekat, pertengkaran, perpisahan, lalu rekonsiliasi.
const PLAYLISTS = [
  {
    id: 'pl1', title: 'Awal yang Hangat', color: '#392b39', cover: 'assets/music/awal-hangat.jpg',
    songs: [
      ['Until I Found You', 'Stephen Sanchez', '2:57'],
      ['Glue Song', 'beabadoobee', '2:34'],
      ['Best Part', 'Daniel Caesar feat. H.E.R.', '3:29'],
      ['Every Summertime', 'NIKI', '3:35'],
      ['Like I Need You', 'Keshi', '3:23'],
      ['Sweet', 'Cigarettes After Sex', '4:33'],
    ],
  },
  {
    id: 'pl2', title: 'Kata yang Terlanjur', color: '#33252d', cover: 'assets/music/pertengkaran.jpg',
    songs: [
      ['traitor', 'Olivia Rodrigo', '3:49'],
      ['Happier Than Ever', 'Billie Eilish', '4:58'],
      ['The Grudge', 'Olivia Rodrigo', '3:09'],
      ['Lose', 'NIKI', '3:08'],
      ['Let You Break My Heart Again', 'Laufey', '4:'],
      ['when the party’s over', 'Billie Eilish', '3:16'],
    ],
  },
  {
    id: 'pl3', title: 'Rindu Setelah Pergi', color: '#252b3a', cover: 'assets/music/rindu.jpg',
    songs: [
      ['The Night We Met', 'Lord Huron', '3:28'],
      ['I Love You So', 'The Walters', '2:40'],
      ['Another Love', 'Tom Odell', '4:04'],
      ['ceilings', 'Lizzy McAlpine', '3:02'],
      ['Dancing With Your Ghost', 'Sasha Alex Sloan', '3:17'],
      ['Back to December', 'Taylor Swift', '4:53'],
    ],
  },
  {
    id: 'pl4', title: 'Pulang ke Kamu', color: '#382b35', cover: 'assets/music/kembali.jpg',
    songs: [
      ['Iris', 'The Goo Goo Dolls', '4:49'],
      ['I Choose You', 'Sara Bareilles', '3:39'],
      ['You Are in Love', 'Taylor Swift', '4:27'],
      ['Those Eyes', 'New West', '3:40'],
      ['Daylight', 'Taylor Swift', '4:53'],
      ['A Thousand Years', 'Christina Perri', '4:45'],
    ],
  },
];

PLAYLISTS.forEach((pl) => {
  pl.songs = pl.songs.map(([title, artist, duration], i) => ({
    title, artist, duration,
    art: pl.cover,
    color: pl.color,
  }));
});
