/* =========================================================
   Certificate Maker — script.js
   ========================================================= */

/* ---------- Certificate templates ---------- */
const TEMPLATES = {
  love: {
    label: '❤️ Love',
    title: 'Love Certificate',
    sub: 'This certificate is lovingly presented to',
    name: 'My Favourite Person',
    msg: 'For being the reason behind my smile, my safe place and my forever. You officially hold the key to my heart, now and always.',
    seal: '❤️', deco: '♥ ♥ ♥', theme: 'rose', border: 'hearts', font: "'Great Vibes', cursive"
  },
  bestfriend: {
    label: '👯 Best Friend',
    title: 'Best Friend Certificate',
    sub: 'The official title of Best Friend goes to',
    name: 'My Bestie',
    msg: 'For all the laughs, the secrets, the late-night talks and for always having my back. Life is better with you in it.',
    seal: '👯', deco: '★ ★ ★', theme: 'lavender', border: 'double', font: "'Dancing Script', cursive"
  },
  couple: {
    label: '💑 Couple Goals',
    title: 'Couple Goals Award',
    sub: 'Proudly awarded to the cutest couple',
    name: 'You & Me',
    msg: 'For turning ordinary days into beautiful memories, and for proving that the best love stories are the real ones.',
    seal: '💑', deco: '✦ ✦ ✦', theme: 'sunset', border: 'floral', font: "'Great Vibes', cursive"
  },
  birthday: {
    label: '🎂 Birthday',
    title: 'Birthday Certificate',
    sub: 'Happy Birthday to the one and only',
    name: 'Birthday Star',
    msg: 'Wishing you a year full of joy, cake, surprises and everything your heart desires. You deserve the whole world today!',
    seal: '🎂', deco: '✦ ✦ ✦', theme: 'gold', border: 'classic', font: "'Playfair Display', serif"
  },
  kindness: {
    label: '🌼 Kindness',
    title: 'Kindest Heart Award',
    sub: 'With gratitude, this award is given to',
    name: 'Kind Soul',
    msg: 'For your warm heart, your gentle words and for making the world a little brighter just by being you.',
    seal: '🌼', deco: '✿ ✿ ✿', theme: 'mint', border: 'floral', font: "'Dancing Script', cursive"
  },
  cutie: {
    label: '😘 Cutest Person',
    title: 'Cutest Person Award',
    sub: 'After careful judging, the winner is',
    name: 'Cutie Pie',
    msg: 'Awarded for the sweetest smile, the funniest jokes and the highest level of cuteness ever recorded. No recounts allowed!',
    seal: '😘', deco: '♥ ♥ ♥', theme: 'ocean', border: 'dotted', font: "'Caveat', cursive"
  },
  sorry: {
    label: '🥺 Sorry',
    title: 'Sorry Certificate',
    sub: 'A heartfelt apology is hereby given to',
    name: 'My Dear One',
    msg: 'I am truly sorry for hurting you. You mean the world to me, and I promise to do better. Please forgive me?',
    seal: '🥺', deco: '✦ ✦ ✦', theme: 'lavender', border: 'classic', font: "'Great Vibes', cursive"
  },
  thanks: {
    label: '🏆 Appreciation',
    title: 'Certificate of Appreciation',
    sub: 'This certificate is proudly presented to',
    name: 'Amazing Person',
    msg: 'In sincere appreciation of your effort, support and kindness. Thank you for everything you do.',
    seal: '🏆', deco: '★ ★ ★', theme: 'gold', border: 'double', font: "'Cinzel', serif"
  }
};

/* ---------- Colour themes ---------- */
const THEMES = {
  rose:     { bg1: '#fff0f4', bg2: '#ffd1e0', accent: '#d6336c', text: '#5a2a3c', dot: '#f06595' },
  gold:     { bg1: '#fffaf0', bg2: '#f7e6bd', accent: '#b8860b', text: '#4a3a1a', dot: '#d4a017' },
  lavender: { bg1: '#f6f0ff', bg2: '#ddd0f7', accent: '#7048c8', text: '#3b2a63', dot: '#9775fa' },
  ocean:    { bg1: '#eefaff', bg2: '#c5e8f7', accent: '#1c7ed6', text: '#143a5a', dot: '#4dabf7' },
  mint:     { bg1: '#f0fff6', bg2: '#c9f0d8', accent: '#2f9e5b', text: '#1d4a30', dot: '#51cf66' },
  sunset:   { bg1: '#fff4ec', bg2: '#ffd2b8', accent: '#e8590c', text: '#5a2f1a', dot: '#ff922b' }
};

/* ---------- Element references ---------- */
const $ = id => document.getElementById(id);

const el = {
  types: $('types'), themes: $('themes'),
  inTitle: $('inTitle'), inSub: $('inSub'), inName: $('inName'), inMsg: $('inMsg'),
  inFrom: $('inFrom'), inDate: $('inDate'), inSeal: $('inSeal'),
  inPhoto: $('inPhoto'), removePhoto: $('removePhoto'),
  inBorder: $('inBorder'), inFont: $('inFont'),
  cert: $('cert'), stage: $('stage'), stageWrap: $('stageWrap'),
  cTitle: $('cTitle'), cSub: $('cSub'), cName: $('cName'), cMsg: $('cMsg'),
  cFrom: $('cFrom'), cDate: $('cDate'), cSeal: $('cSeal'), cDeco: $('cDeco'),
  cPhoto: $('cPhoto'), cPhotoImg: $('cPhotoImg'),
  btnPdf: $('btnPdf'), btnPng: $('btnPng'), btnReset: $('btnReset'), status: $('status')
};

let currentType = 'love';
let currentTheme = 'rose';
let photoData = '';

/* ---------- Build the type buttons & theme swatches ---------- */
Object.entries(TEMPLATES).forEach(([key, t]) => {
  const b = document.createElement('button');
  b.type = 'button';
  b.className = 'type-btn';
  b.dataset.key = key;
  b.textContent = t.label;
  b.addEventListener('click', () => loadTemplate(key));
  el.types.appendChild(b);
});

Object.entries(THEMES).forEach(([key, t]) => {
  const s = document.createElement('div');
  s.className = 'swatch';
  s.dataset.key = key;
  s.title = key;
  s.style.background = `linear-gradient(135deg, ${t.bg2} 50%, ${t.accent} 50%)`;
  s.addEventListener('click', () => { currentTheme = key; render(); });
  el.themes.appendChild(s);
});

/* ---------- Helpers ---------- */
function todayText() {
  return new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' });
}

function loadTemplate(key) {
  const t = TEMPLATES[key];
  currentType = key;
  currentTheme = t.theme;
  el.inTitle.value = t.title;
  el.inSub.value = t.sub;
  el.inName.value = t.name;
  el.inMsg.value = t.msg;
  el.inSeal.value = t.seal;
  el.inBorder.value = t.border;
  el.inFont.value = t.font;
  if (!el.inFrom.value) el.inFrom.value = 'Your Name';
  if (!el.inDate.value) el.inDate.value = todayText();
  el.cDeco.textContent = t.deco;
  render();
}

/* ---------- Render the live preview ---------- */
function render() {
  const th = THEMES[currentTheme];
  const c = el.cert;

  c.style.setProperty('--bg1', th.bg1);
  c.style.setProperty('--bg2', th.bg2);
  c.style.setProperty('--accent', th.accent);
  c.style.setProperty('--text', th.text);
  c.dataset.border = el.inBorder.value;

  el.cTitle.textContent = el.inTitle.value;
  el.cSub.textContent = el.inSub.value;
  el.cName.textContent = el.inName.value;
  el.cName.style.fontFamily = el.inFont.value;
  el.cMsg.textContent = el.inMsg.value;
  el.cFrom.textContent = el.inFrom.value;
  el.cDate.textContent = el.inDate.value;
  el.cSeal.textContent = el.inSeal.value || '★';

  // long names shrink so they always fit
  const n = el.inName.value.length;
  el.cName.style.fontSize = n > 30 ? '48px' : n > 22 ? '58px' : n > 14 ? '68px' : '74px';
  // long titles shrink too
  const tl = el.inTitle.value.length;
  el.cTitle.style.fontSize = tl > 30 ? '32px' : tl > 24 ? '38px' : '46px';

  if (photoData) {
    el.cPhotoImg.src = photoData;
    el.cPhoto.hidden = false;
    el.removePhoto.hidden = false;
  } else {
    el.cPhoto.hidden = true;
    el.removePhoto.hidden = true;
  }

  document.querySelectorAll('.type-btn').forEach(b => b.classList.toggle('active', b.dataset.key === currentType));
  document.querySelectorAll('.swatch').forEach(s => s.classList.toggle('active', s.dataset.key === currentTheme));
}

/* ---------- Scale the 1000px certificate to fit the screen ---------- */
function fitPreview() {
  const w = el.stageWrap.clientWidth;
  const scale = Math.min(1, w / 1000);
  el.stage.style.transform = `scale(${scale})`;
  el.stageWrap.style.height = (707 * scale) + 'px';
}

/* ---------- Live editing ---------- */
['inTitle', 'inSub', 'inName', 'inMsg', 'inFrom', 'inDate', 'inSeal'].forEach(id =>
  el[id].addEventListener('input', render)
);
el.inBorder.addEventListener('change', render);
el.inFont.addEventListener('change', render);

el.inPhoto.addEventListener('change', e => {
  const file = e.target.files[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = ev => { photoData = ev.target.result; render(); };
  reader.readAsDataURL(file);
});
el.removePhoto.addEventListener('click', () => {
  photoData = '';
  el.inPhoto.value = '';
  render();
});

el.btnReset.addEventListener('click', () => {
  photoData = '';
  el.inPhoto.value = '';
  loadTemplate(currentType);
  setStatus('Reset to the original template.');
});

/* ---------- Export ---------- */
function setStatus(msg) { el.status.textContent = msg; }

function safeFileName() {
  const base = (el.inName.value || 'certificate').trim().replace(/[^\w\- ]+/g, '').replace(/\s+/g, '-');
  return `${base || 'certificate'}-${currentType}`;
}

async function captureCertificate() {
  if (typeof html2canvas === 'undefined') {
    throw new Error('Libraries failed to load. Please check your internet connection.');
  }
  if (document.fonts && document.fonts.ready) await document.fonts.ready;

  return html2canvas(el.cert, {
    scale: 2,
    useCORS: true,
    backgroundColor: '#ffffff',
    width: 1000,
    height: 707,
    onclone: doc => {
      // remove the preview scaling in the copy so the capture is full size
      const stage = doc.getElementById('stage');
      stage.style.transform = 'none';
      const wrap = doc.getElementById('stageWrap');
      wrap.style.height = 'auto';
      wrap.style.overflow = 'visible';
    }
  });
}

async function downloadPdf() {
  el.btnPdf.disabled = true;
  setStatus('Creating your PDF…');
  try {
    const canvas = await captureCertificate();
    const { jsPDF } = window.jspdf;
    const pdf = new jsPDF({ orientation: 'landscape', unit: 'mm', format: 'a4' });
    pdf.addImage(canvas.toDataURL('image/jpeg', 0.95), 'JPEG', 0, 0, 297, 210);
    pdf.save(safeFileName() + '.pdf');
    setStatus('✅ PDF downloaded! Check your Downloads folder.');
  } catch (err) {
    console.error(err);
    setStatus('❌ ' + (err.message || 'Something went wrong. Please try again.'));
  } finally {
    el.btnPdf.disabled = false;
  }
}

async function downloadPng() {
  el.btnPng.disabled = true;
  setStatus('Creating your image…');
  try {
    const canvas = await captureCertificate();
    const a = document.createElement('a');
    a.href = canvas.toDataURL('image/png');
    a.download = safeFileName() + '.png';
    document.body.appendChild(a);
    a.click();
    a.remove();
    setStatus('✅ Image downloaded!');
  } catch (err) {
    console.error(err);
    setStatus('❌ ' + (err.message || 'Something went wrong. Please try again.'));
  } finally {
    el.btnPng.disabled = false;
  }
}

el.btnPdf.addEventListener('click', downloadPdf);
el.btnPng.addEventListener('click', downloadPng);

/* ---------- Start ---------- */
window.addEventListener('resize', fitPreview);
loadTemplate('love');
fitPreview();
if (document.fonts && document.fonts.ready) document.fonts.ready.then(fitPreview);