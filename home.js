// Widget kalender & cuaca, serta grid ikon aplikasi di home screen.
const WMO = [
  { codes: [0], icon: 'sun', text: 'Cerah' },
  { codes: [1, 2, 3], icon: 'cloud', text: 'Berawan' },
  { codes: [45, 48], icon: 'cloud', text: 'Berkabut' },
  { codes: [51, 53, 55, 56, 57, 61, 63, 65, 66, 67, 80, 81, 82], icon: 'rain', text: 'Hujan' },
  { codes: [71, 73, 75, 77, 85, 86], icon: 'cloud', text: 'Bersalju' },
  { codes: [95, 96, 99], icon: 'rain', text: 'Badai petir' },
];

function renderCalendar() {
  const now = new Date();
  $('#widgetCal').innerHTML = `
    <div class="cal-dow">${now.toLocaleDateString('id-ID', { weekday: 'long' })}</div>
    <div class="cal-date">${now.getDate()}</div>
    <div class="cal-month">${now.toLocaleDateString('id-ID', { month: 'long', year: 'numeric' })}</div>`;
}

async function renderWeather() {
  const box = $('#widgetWeather');
  const { lat, lon, label } = CONFIG.weather;
  try {
    const res = await fetch(
      `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,weather_code`
    );
    if (!res.ok) throw new Error(res.status);
    const { current } = await res.json();
    const info = WMO.find((w) => w.codes.includes(current.weather_code)) || { icon: 'cloud', text: '-' };
    box.innerHTML = `
      <div class="wx-city">${esc(label)}</div>
      <div class="wx-temp">${Math.round(current.temperature_2m)}°</div>
      <div class="wx-row">${svg(info.icon, { size: 20, color: '#fff', sw: 1.8 })}<span>${info.text}</span></div>`;
  } catch {
    box.innerHTML = `<div class="wx-city">${esc(label)}</div><div class="wx-cond">Cuaca tidak tersedia</div>`;
  }
}

function renderHome() {
  const grid = $('#appGrid');
  const dock = $('#dock');
  APPS.forEach((app) => {
    const b = el('button', 'app-icon');
    b.type = 'button';
    b.setAttribute('aria-label', app.name);
    b.dataset.app = app.id;
    b.innerHTML = `
      <span class="app-tile" style="${app.image
        ? `background-image:url('${app.image}');background-size:cover;background-position:center;`
        : `background:${app.bg}`}">
        ${app.image ? '' : svg(app.icon, { size: 36, color: app.fg, sw: app.fill ? 0 : 1.8, fill: app.fill ? app.fg : 'none' })}
        ${app.id === 'line' ? '<span class="app-badge"></span>' : ''}
      </span>
      <span class="icon-label">${app.name}</span>`;
    b.addEventListener('click', () => Router.open(app.id));
    (app.dock ? dock : grid).appendChild(b);
  });
  updateLineBadge();
}
// Home hanya satu halaman; App Library dan gesture swipe dinonaktifkan.
function setupHomeSwipe() {
  const pages = $('#homePages');
  if (pages) pages.classList.remove('page-1');
}
