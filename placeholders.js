// Phone / Telepon — riwayat panggilan, kontak, dan keypad sederhana
registerApp('phone', (root) => {
  const phoneCss = `
    .phone-app{height:100%;background:#fff;color:#111;display:flex;flex-direction:column;font-family:-apple-system,BlinkMacSystemFont,sans-serif;overflow:hidden}
    .phone-content{flex:1;min-height:0;overflow:auto;padding:8px 18px 12px;overscroll-behavior:contain}.phone-top{font-size:29px;font-weight:750;margin:10px 0 16px;letter-spacing:-.5px}
    .phone-tabs{position:relative;z-index:5;flex:none;display:flex;justify-content:space-around;border-top:1px solid #e5e5ea;padding:7px 2px calc(7px + env(safe-area-inset-bottom));background:#fafafa;touch-action:manipulation}
    .phone-tab{position:relative;z-index:6;flex:1;min-width:0;min-height:42px;border:0;background:transparent;color:#8e8e93;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:3px;font-size:10px;padding:2px;touch-action:manipulation;cursor:pointer}.phone-tab.active{color:#34c759}.phone-tab b{font-size:21px;font-weight:500;line-height:24px}
    .phone-search{width:100%;box-sizing:border-box;border:0;border-radius:10px;background:#f2f2f7;padding:10px 12px;font-size:15px;margin-bottom:12px}
    .phone-row{display:flex;align-items:center;gap:12px;padding:13px 0;border-bottom:1px solid #e5e5ea}.phone-avatar{width:43px;height:43px;border-radius:50%;background:#d9d9de;color:#fff;display:grid;place-items:center;font-size:20px;font-weight:600;flex-shrink:0}.phone-row-main{flex:1;min-width:0}.phone-person{font-size:16px;font-weight:600}.phone-detail{font-size:12px;color:#8e8e93;margin-top:4px}.phone-red{color:#ff3b30!important}.phone-call{border:0;background:transparent;color:#34c759;font-size:22px;padding:8px}.phone-empty{text-align:center;color:#8e8e93;padding:45px 12px;line-height:1.5}
    .phone-key-display{min-height:48px;height:clamp(48px,8vh,68px);display:flex;align-items:center;justify-content:center;font-size:clamp(24px,6vw,32px);letter-spacing:1px;margin:4px 0 8px;overflow-wrap:anywhere;word-break:break-word;text-align:center}.phone-key-grid{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:clamp(6px,1.5vh,11px);width:min(100%,276px);margin:0 auto}.phone-key{width:100%;height:clamp(44px,7.3vh,58px);max-width:74px;justify-self:center;border:0;border-radius:50%;background:#e5e5ea;color:#111;font-size:clamp(21px,5.8vw,25px);font-weight:400;display:flex;flex-direction:column;align-items:center;justify-content:center;line-height:1;touch-action:manipulation}.phone-key small{display:block;font-size:8px;letter-spacing:1.5px;margin-top:3px;line-height:1}.phone-key:active{background:#c7c7cc}.phone-dial-actions{display:flex;justify-content:center;align-items:center;gap:28px;margin:clamp(8px,1.8vh,14px) 0 4px}.phone-dial-call{height:clamp(48px,7vh,56px);width:clamp(48px,7vh,56px);border:0;border-radius:50%;background:#34c759;color:#fff;font-size:25px}.phone-muted{color:#8e8e93;font-size:13px;text-align:center}.phone-app button{cursor:pointer;touch-action:manipulation;-webkit-user-select:none;user-select:none}.phone-app button:focus-visible{outline:2px solid #0a84ff;outline-offset:2px}@media(max-height:720px){.phone-top{font-size:25px;margin:4px 0 8px}.phone-key-display{min-height:38px;height:42px;margin:0 0 6px}.phone-key-grid{gap:5px}.phone-key{height:42px}.phone-dial-actions{margin:7px 0 0}.phone-dial-call{height:44px;width:44px}}

    /* iPhone-style numeric keypad */
    .phone-app:has(.phone-keypad-screen) .phone-content{padding:0 18px 8px;overflow:hidden;display:flex;flex-direction:column}
    .phone-keypad-screen{width:100%;height:100%;min-height:0;display:flex;flex-direction:column;align-items:center;justify-content:center;box-sizing:border-box;padding:clamp(12px,3vh,30px) 0}
    .phone-keypad-screen .phone-key-display{flex:1 1 0;min-height:42px;width:100%;height:auto;margin:0;align-items:flex-end;padding-bottom:clamp(12px,2vh,22px);box-sizing:border-box;font-size:clamp(25px,6vw,36px);color:#111}
    .phone-key-grid{width:min(88%,650px);max-width:650px;grid-template-columns:repeat(3,minmax(0,1fr));gap:clamp(12px,3.5vh,32px) clamp(12px,4vw,34px);margin:0 auto}
    .phone-key{width:min(100%,clamp(76px,20vw,170px));height:auto;max-width:none;aspect-ratio:1;border:1px solid #d5d5d8;border-radius:50%;background:radial-gradient(circle at 50% 42%,#fff 55%,#f8f8f8 100%);box-shadow:0 2px 5px rgba(0,0,0,.035);color:#050505;font-size:clamp(31px,8vw,76px);font-weight:650;gap:0;line-height:1}
    .phone-key span{display:block;line-height:1}
    .phone-key small{font-size:clamp(9px,2.2vw,18px);font-weight:750;letter-spacing:1.6px;margin-top:4px;line-height:1.1}
    .phone-key:active{background:#e9e9ed;transform:scale(.97)}
    .phone-dial-actions{width:100%;flex:0 0 auto;margin:clamp(18px,4vh,38px) 0 0;gap:24px}
    .phone-dial-call{width:clamp(76px,20vw,170px);height:auto;aspect-ratio:1;border:1px solid #53c96a;background:#61c96c;color:#fff;font-size:clamp(28px,7vw,58px);box-shadow:0 2px 4px rgba(0,0,0,.08)}
    .phone-delete-key{border:0;background:transparent;color:#777;font-size:clamp(22px,5vw,32px);padding:12px;min-width:48px;min-height:48px}
    .phone-app:has(.phone-keypad-screen) .phone-tabs{border:1px solid #e5e5ea;border-radius:40px;margin:0 12px 10px;padding:6px 4px calc(6px + env(safe-area-inset-bottom));background:rgba(255,255,255,.97);box-shadow:0 1px 5px rgba(0,0,0,.04)}
    .phone-app:has(.phone-keypad-screen) .phone-tab{font-size:clamp(9px,2.5vw,13px);font-weight:600;min-height:52px}
    .phone-app:has(.phone-keypad-screen) .phone-tab b{font-size:clamp(20px,5vw,29px)}
    .phone-app:has(.phone-keypad-screen) .phone-tab.active{background:#f0f0f3;border-radius:30px;color:#347ff0}
    @media(max-height:720px){.phone-keypad-screen{padding:6px 0}.phone-keypad-screen .phone-key-display{min-height:26px;padding-bottom:6px}.phone-key-grid{gap:8px 12px}.phone-key{width:min(100%,clamp(58px,16vw,100px))}.phone-dial-actions{margin:10px 0 0}.phone-dial-call{width:clamp(58px,16vw,100px)}.phone-app:has(.phone-keypad-screen) .phone-tab{min-height:42px}}
  `;
  if (!document.getElementById('phone-app-style')) { const st=document.createElement('style'); st.id='phone-app-style'; st.textContent=phoneCss; document.head.appendChild(st); }
  const now = new Date();
  const today = now.toLocaleDateString('id-ID',{day:'numeric',month:'short'});
  let history;
  try { history = JSON.parse(localStorage.getItem('wilonaPhoneHistory') || 'null'); } catch (_) { history = null; }
  if (!Array.isArray(history)) history = [
    {name:'Karen', type:'incoming', status:'Panggilan masuk', date:today, time:'09.41'},
    {name:'Mama', type:'outgoing', status:'Panggilan keluar', date:'Kemarin', time:'20.16'},
    {name:'Papa', type:'missed', status:'Panggilan tak terjawab', date:'Kemarin', time:'18.03'},
    {name:'Karen', type:'outgoing', status:'Panggilan keluar', date:'28 Okt', time:'21.27'}
  ];
  const saveHistory = () => { try { localStorage.setItem('wilonaPhoneHistory', JSON.stringify(history.slice(0,40))); } catch (_) {} };
  root.innerHTML = `<div class="phone-app"><div class="phone-content" id="phoneContent"></div><nav class="phone-tabs" aria-label="Navigasi Telepon">
    <button class="phone-tab active" data-tab="favorites"><b>☆</b>Favorit</button><button class="phone-tab" data-tab="recents"><b>◷</b>Terbaru</button><button class="phone-tab" data-tab="contacts"><b>♙</b>Kontak</button><button class="phone-tab" data-tab="keypad"><b>▦</b>Keypad</button><button class="phone-tab" data-tab="voicemail"><b>▣</b>Pesan Suara</button></nav></div>`;
  const content=root.querySelector('#phoneContent');
  let currentTab='favorites', number='';
  const escapeText = (v) => esc(String(v));
  function recordCall(name,type='outgoing') {
    const d=new Date(); history.unshift({name,type,status:type==='missed'?'Panggilan tak terjawab':type==='incoming'?'Panggilan masuk':'Panggilan keluar',date:d.toLocaleDateString('id-ID',{day:'numeric',month:'short'}),time:d.toLocaleTimeString('id-ID',{hour:'2-digit',minute:'2-digit'})});
    history=history.slice(0,40);saveHistory();
  }
  function dial(name) {
    const target=(name||number).trim(); if(!target){content.querySelector('.phone-key-display')?.classList.add('phone-red');return;}
    recordCall(target,'outgoing');
    const msg=document.createElement('div'); msg.className='phone-empty'; msg.innerHTML=`<div style="font-size:42px;margin-bottom:12px">📞</div><strong style="font-size:22px;color:#111">${escapeText(target)}</strong><p>Panggilan simulasi dimulai</p><button id="phoneEndCall" style="border:0;border-radius:50%;width:60px;height:60px;background:#ff3b30;color:white;font-size:25px;margin-top:20px">✕</button>`;
    content.replaceChildren(msg); msg.querySelector('#phoneEndCall').addEventListener('click',()=>{currentTab='recents';render();});
  }
  function renderHistory(list=history) {
    if(!list.length) return `<div class="phone-empty">Belum ada riwayat panggilan.</div>`;
    return list.map((h,i)=>`<div class="phone-row"><div class="phone-avatar">${escapeText(h.name.slice(0,1).toUpperCase())}</div><div class="phone-row-main"><div class="phone-person ${h.type==='missed'?'phone-red':''}">${escapeText(h.name)}</div><div class="phone-detail">${h.type==='missed'?'↙ Panggilan tak terjawab':h.type==='incoming'?'↙ Panggilan masuk':'↗ Panggilan keluar'} · ${escapeText(h.date)} ${escapeText(h.time)}</div></div><button class="phone-call" data-call-name="${escapeText(h.name)}" aria-label="Telepon ${escapeText(h.name)}">☎</button></div>`).join('');
  }
  function render() {
    root.querySelectorAll('.phone-tab').forEach(b=>b.classList.toggle('active',b.dataset.tab===currentTab));
    if(currentTab==='recents') {
      content.innerHTML=`<div class="phone-top">Terbaru <button id="phoneClear" style="float:right;border:0;background:none;color:#ff3b30;font-size:13px;font-weight:500;margin-top:12px">Edit</button></div><input class="phone-search" id="phoneSearch" placeholder="Cari" aria-label="Cari riwayat panggilan">${renderHistory()}`;
      content.querySelector('#phoneSearch').addEventListener('input',e=>{const q=e.target.value.toLowerCase();const old=content.querySelector('.phone-row, .phone-empty');if(old){const wrap=document.createElement('div');wrap.innerHTML=renderHistory(history.filter(h=>h.name.toLowerCase().includes(q)));old.parentNode.replaceChildren(...wrap.childNodes);}});
      content.querySelector('#phoneClear').addEventListener('click',()=>{if(confirm('Hapus semua riwayat panggilan?')){history=[];saveHistory();render();}});
    } else if(currentTab==='contacts') {
      const contacts=[['Karen','K'],['Mama','M'],['Papa','P'],['Wilona','W']];
      content.innerHTML=`<div class="phone-top">Kontak</div><input class="phone-search" id="contactSearch" placeholder="Cari kontak">${contacts.map(c=>`<div class="phone-row contact-row" data-name="${c[0].toLowerCase()}"><div class="phone-avatar">${c[1]}</div><div class="phone-row-main"><div class="phone-person">${c[0]}</div><div class="phone-detail">Kontak</div></div><button class="phone-call" data-call-name="${c[0]}" aria-label="Telepon ${c[0]}">☎</button></div>`).join('')}`;
      content.querySelector('#contactSearch').addEventListener('input',e=>content.querySelectorAll('.contact-row').forEach(r=>r.hidden=!r.dataset.name.includes(e.target.value.toLowerCase())));
    } else if(currentTab==='keypad') {
      content.innerHTML=`<section class="phone-keypad-screen" aria-label="Keypad telepon"><div class="phone-key-display" id="phoneNumber">${escapeText(number)}</div><div class="phone-key-grid">${[['1',''],['2','ABC'],['3','DEF'],['4','GHI'],['5','JKL'],['6','MNO'],['7','PQRS'],['8','TUV'],['9','WXYZ'],['*',''],['0','+'],['#','']].map(([n,l])=>`<button type="button" class="phone-key" data-digit="${n}" aria-label="${n}${l?' '+l:''}"><span>${n}</span>${l?`<small>${l}</small>`:''}</button>`).join('')}</div><div class="phone-dial-actions"><button type="button" class="phone-dial-call" id="phoneDial" aria-label="Panggil">☎</button><button type="button" id="phoneDelete" class="phone-delete-key" aria-label="Hapus angka">⌫</button></div></section>`;
      content.querySelectorAll('[data-digit]').forEach(b=>b.addEventListener('click',()=>{number+=b.dataset.digit;render();}));
      content.querySelector('#phoneDelete').addEventListener('click',()=>{number=number.slice(0,-1);render();});
      content.querySelector('#phoneDial').addEventListener('click',()=>dial(number));
    } else if(currentTab==='voicemail') {
      content.innerHTML=`<div class="phone-top">Pesan Suara</div><div class="phone-empty">Tidak ada pesan suara baru.</div>`;
    } else {
      content.innerHTML=`<div class="phone-top">Favorit</div>${[['Karen','K'],['Mama','M'],['Papa','P']].map(c=>`<div class="phone-row"><div class="phone-avatar">${c[1]}</div><div class="phone-row-main"><div class="phone-person">${c[0]}</div><div class="phone-detail">Favorit</div></div><button class="phone-call" data-call-name="${c[0]}" aria-label="Telepon ${c[0]}">☎</button></div>`).join('')}`;
    }
    content.querySelectorAll('[data-call-name]').forEach(b=>b.addEventListener('click',()=>dial(b.dataset.callName)));
  }
  root.querySelectorAll('.phone-tab').forEach(b=>b.addEventListener('click',()=>{currentTab=b.dataset.tab;render();}));
  render();
});

// File Manager — dokumen perusahaan
registerApp('files', (root) => {
  const folders = [
    { name: 'Dokumen', count: 3, icon: '📄', id: 'documents' },
  ];
  const docs = [
    { name: 'Perjanjian Kerja Sama Strategis', subtitle: 'Kim Corp × Karen’s Corp', date: '20 November 2026', kind: 'MOU' },
    { name: 'Ringkasan Kolaborasi Bisnis', subtitle: 'Kemitraan dan rencana proyek bersama', date: '24 November 2026', kind: 'PDF' },
    { name: 'Agenda Rapat Direksi', subtitle: 'Pembahasan kerja sama lintas perusahaan', date: '28 November 2026', kind: 'DOC' },
  ];
  const home = () => {
    root.innerHTML = `
      <div style="padding:12px 16px 24px;background:#f2f2f7;min-height:100%;box-sizing:border-box">
        <div style="font-size:28px;font-weight:700;margin:8px 0 16px;color:#111">File</div>
        <div style="font-size:13px;font-weight:600;color:#6d6d72;margin:0 0 8px 4px">LOKASI</div>
        <div style="background:#fff;border-radius:12px;overflow:hidden">
          ${folders.map((f, i) => `
            <button data-folder="${f.id || f.name}" style="width:100%;display:flex;align-items:center;gap:14px;padding:14px 16px;border:0;background:#fff;text-align:left;border-bottom:${i < folders.length - 1 ? '1px solid #e5e5ea' : 'none'};cursor:pointer">
              <div style="width:40px;height:40px;border-radius:10px;background:#e8f0fe;display:grid;place-items:center;font-size:20px">${f.icon}</div>
              <div style="flex:1"><div style="font-size:16px;font-weight:600;color:#111">${f.name}</div><div style="font-size:13px;color:#8e8e93;margin-top:2px">${f.count} item</div></div>
              <div style="color:#c7c7cc;font-size:18px">›</div>
            </button>`).join('')}
        </div>
        <p style="text-align:center;color:#8e8e93;font-size:13px;margin-top:24px">File · Dokumen simulasi untuk cerita Wilona</p>
      </div>`;
    root.querySelectorAll('[data-folder]').forEach(b=>b.addEventListener('click',()=>{ if(b.dataset.folder==='documents') showDocs(); else { const n=b.querySelector('div[style*="font-size:16px"]')?.textContent || b.dataset.folder; root.innerHTML=`<div style="padding:20px;background:#f2f2f7;min-height:100%;box-sizing:border-box"><button id="backFiles" style="border:0;background:none;color:#007aff;font-size:16px;padding:0 0 18px">‹ File</button><h2 style="margin:0 0 8px">${n}</h2><p style="color:#6d6d72">Folder ini belum memiliki konten tambahan dalam simulasi.</p></div>`;root.querySelector('#backFiles').addEventListener('click',home); }}));
  };
  const showDocs = () => {
    root.innerHTML=`<div style="padding:12px 16px 24px;background:#f2f2f7;min-height:100%;box-sizing:border-box"><button id="backFiles" style="border:0;background:none;color:#007aff;font-size:16px;padding:4px 0 18px">‹ Lokasi</button><div style="font-size:26px;font-weight:700;margin-bottom:16px;color:#111">Dokumen</div><div style="background:#fff;border-radius:12px;overflow:hidden">${docs.map((d,i)=>`<button data-doc="${i}" style="width:100%;display:flex;align-items:center;gap:12px;text-align:left;border:0;border-bottom:${i<docs.length-1?'1px solid #e5e5ea':'none'};background:#fff;padding:14px;cursor:pointer"><div style="font-size:26px">📄</div><div style="flex:1"><div style="font-weight:600;color:#111">${d.name}</div><div style="font-size:13px;color:#6d6d72;margin-top:3px">${d.subtitle}</div><div style="font-size:12px;color:#8e8e93;margin-top:3px">${d.date}</div></div><div style="color:#c7c7cc">›</div></button>`).join('')}</div></div>`;
    root.querySelector('#backFiles').addEventListener('click',home);
    root.querySelectorAll('[data-doc]').forEach(b=>b.addEventListener('click',()=>showDoc(Number(b.dataset.doc))));
  };
  const showDoc = (idx) => {
    const d=docs[idx]||docs[0];
    root.innerHTML=`<div style="padding:12px 18px 28px;background:#fff;min-height:100%;box-sizing:border-box;color:#1c1c1e"><button id="backDocs" style="border:0;background:none;color:#007aff;font-size:16px;padding:4px 0 20px">‹ Dokumen</button><div style="font-size:12px;color:#6d6d72;letter-spacing:1px">DOKUMEN PERUSAHAAN · ${d.kind}</div><h1 style="font-size:25px;line-height:1.2;margin:10px 0 8px">${d.name}</h1><div style="color:#6d6d72;font-size:14px">${d.date}</div><div style="height:1px;background:#e5e5ea;margin:20px 0"></div><div style="text-align:center;padding:14px 0 22px"><div style="font-size:14px;font-weight:700;letter-spacing:2px">KIM CORP</div><div style="font-size:12px;color:#6d6d72;margin:5px 0">BERSAMA</div><div style="font-size:14px;font-weight:700;letter-spacing:1px">KAREN’S CORP</div></div><h3 style="font-size:17px;margin:10px 0">Ringkasan Kerja Sama</h3><p style="font-size:14px;line-height:1.65;color:#333">Dokumen ini mencatat kesepahaman awal antara Kim Corp dan Karen’s Corp untuk menjajaki kerja sama strategis, pertukaran keahlian, serta pengembangan proyek bisnis bersama.</p><h3 style="font-size:16px;margin:18px 0 6px">Ruang Lingkup</h3><ul style="font-size:14px;line-height:1.7;padding-left:20px;color:#333"><li>Koordinasi proyek dan pertukaran informasi bisnis yang disetujui kedua pihak.</li><li>Penyusunan rencana kerja, target, dan jadwal evaluasi bersama.</li><li>Penunjukan perwakilan perusahaan untuk komunikasi dan tindak lanjut.</li></ul><h3 style="font-size:16px;margin:18px 0 6px">Perwakilan</h3><p style="font-size:14px;line-height:1.65;color:#333">Kim Corp: perwakilan manajemen Kim Corp.<br>Karen’s Corp: Karen Vasco, sebagai penghubung dalam koordinasi kerja sama.</p><div style="margin-top:24px;padding:12px;border-radius:10px;background:#f2f2f7;color:#6d6d72;font-size:12px;line-height:1.5">Catatan: Dokumen fiktif untuk alur cerita dalam simulasi ponsel, bukan kontrak hukum yang sebenarnya.</div></div>`;
    root.querySelector('#backDocs').addEventListener('click',showDocs);
  };
  home();
});

// Papago — translator sederhana
registerApp('papago', (root) => {
  root.innerHTML = `
    <div style="height:100%;display:flex;flex-direction:column;background:#f0faf4;box-sizing:border-box">
      <div style="padding:14px 16px;background:#03c75a;color:#fff">
        <div style="font-size:13px;opacity:.9">Papago</div>
        <div style="font-size:20px;font-weight:700;margin-top:2px">Penerjemah</div>
      </div>
      <div style="padding:16px;flex:1;display:flex;flex-direction:column;gap:12px">
        <div style="display:flex;gap:8px;align-items:center">
          <select id="papagoFrom" style="flex:1;padding:10px;border-radius:10px;border:1px solid #d0e8d8;font-size:15px;background:#fff">
            <option value="id">Indonesia</option>
            <option value="ko">한국어</option>
            <option value="en">English</option>
            <option value="ja">日本語</option>
          </select>
          <button type="button" id="papagoSwap" style="border:0;background:#e8f5e9;width:40px;height:40px;border-radius:50%;font-size:18px">⇄</button>
          <select id="papagoTo" style="flex:1;padding:10px;border-radius:10px;border:1px solid #d0e8d8;font-size:15px;background:#fff">
            <option value="ko">한국어</option>
            <option value="id">Indonesia</option>
            <option value="en">English</option>
            <option value="ja">日本語</option>
          </select>
        </div>
        <textarea id="papagoInput" placeholder="Masukkan teks..." style="width:100%;min-height:110px;padding:14px;border-radius:12px;border:1px solid #d0e8d8;font-size:16px;resize:none;box-sizing:border-box;font-family:inherit"></textarea>
        <button type="button" id="papagoBtn" style="border:0;background:#03c75a;color:#fff;padding:14px;border-radius:12px;font-size:16px;font-weight:600">Terjemahkan</button>
        <div id="papagoResult" style="flex:1;padding:14px;border-radius:12px;background:#fff;border:1px solid #e0eee4;font-size:16px;color:#333;min-height:80px"></div>
      </div>
    </div>`;
  const samples = {
    'id-ko': { 'halo': '안녕하세요', 'terima kasih': '감사합니다', 'apa kabar': '어떻게 지내세요?', 'selamat pagi': '좋은 아침이에요' },
    'ko-id': { '안녕하세요': 'halo', '감사합니다': 'terima kasih', '사랑해': 'aku sayang kamu' },
    'id-en': { 'halo': 'hello', 'terima kasih': 'thank you', 'selamat pagi': 'good morning' },
    'en-id': { 'hello': 'halo', 'thank you': 'terima kasih', 'i love you': 'aku sayang kamu' },
  };
  const input = root.querySelector('#papagoInput');
  const result = root.querySelector('#papagoResult');
  const from = root.querySelector('#papagoFrom');
  const to = root.querySelector('#papagoTo');
  root.querySelector('#papagoSwap').addEventListener('click', () => {
    const a = from.value; from.value = to.value; to.value = a;
  });
  root.querySelector('#papagoBtn').addEventListener('click', () => {
    const text = (input.value || '').trim().toLowerCase();
    const key = `${from.value}-${to.value}`;
    const map = samples[key] || {};
    const found = map[text];
    if (found) {
      result.textContent = found;
    } else if (text) {
      result.innerHTML = `<span style="color:#8e8e93">Hasil simulasi:</span><br>${text} → (${from.value} → ${to.value})`;
    } else {
      result.textContent = 'Masukkan teks dulu.';
    }
  });
});

// Spotify — playlist gelap sederhana
registerApp('spotify', (root) => {
  const artists = [
    { name: 'aespa', cover: 'assets/spotify-covers/aespa.jpeg', songs: 8 },
    { name: 'Taylor Swift', cover: 'assets/spotify-covers/taylor-swift.jpeg', songs: 12 },
    { name: 'Justin Bieber', cover: 'assets/spotify-covers/justin-bieber.jpeg', songs: 9 },
    { name: 'One Direction', cover: 'assets/spotify-covers/one-direction.jpeg', songs: 11 },
    { name: 'Ariana Grande', cover: 'assets/spotify-covers/ariana-grande.jpeg', songs: 10 },
  ];
  root.innerHTML = `
    <div style="height:100%;background:#121212;color:#fff;overflow:auto;padding:16px 16px 32px;box-sizing:border-box">
      <div style="font-size:26px;font-weight:700;margin:6px 0 18px">Spotify</div>
      <div style="font-size:13px;color:#b3b3b3;margin-bottom:10px;text-transform:uppercase;letter-spacing:.6px">Baru diputar</div>
      <div style="display:flex;flex-direction:column;gap:12px">
        ${artists.map(a => `
          <div style="display:flex;align-items:center;gap:14px;padding:8px;border-radius:8px;background:#1a1a1a">
            <div style="width:56px;height:56px;border-radius:6px;background:#333 center/cover no-repeat;background-image:url('${a.cover}')"></div>
            <div style="flex:1;min-width:0">
              <div style="font-size:15px;font-weight:600;white-space:nowrap;overflow:hidden;text-overflow:ellipsis">${a.name}</div>
              <div style="font-size:13px;color:#b3b3b3;margin-top:3px">${a.songs} lagu · Playlist</div>
            </div>
            <div style="width:36px;height:36px;border-radius:50%;background:#1db954;display:grid;place-items:center;font-size:14px">▶</div>
          </div>
        `).join('')}
      </div>
      <p style="text-align:center;color:#555;font-size:12px;margin-top:28px">Spotify (simulasi)</p>
    </div>`;
});
