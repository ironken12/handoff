// Router, scaling and the guided tour
const $ = s => document.querySelector(s);
const stage = $('#stage'), prog = $('#prog');
const MODES = { tour: TOUR.map((_, i) => i + 1), quick: QUICK };

const chapterList = () => CHAPTERS.map((c, i) => `<button class="chap" data-nav="#/tour/${chapterStart(i)}"><span class="n">${i + 1}</span><div class="col grow" style="gap:2px"><b>${c.name}</b><span>${c.blurb}</span></div><span class="lab">${TOUR.filter(t => t[2] === i).length} stops</span></button>`).join('');

const PAGES = {
  welcome: () => ({ kind: 'page', w: 1240, h: 720, html: `<div class="intro fade" style="width:1240px;height:720px">
    <div class="copy"><span class="lab">STACK 2026 · GDGoC ITB · BINUS University</span>
      <div class="xl" style="font-size:72px">Welcome to Handoff<i>.</i></div>
      <p class="t mu" style="font-size:18px">Every intern starts where the last one left off. Handoff is one product for the whole internship, used by three people: the intern, the company and the university.</p>
      <div class="row" style="gap:12px"><button class="btn" data-nav="#/quick/1">Quick tour · 12 stops ${I('arr')}</button><button class="btn o" data-nav="#/tour/1">Full tour · ${TOUR.length} stops</button></div>
      <span class="lab">Quick tour ≈ 3 min · Full tour ≈ 8 min · use → and ← keys · Esc to explore freely</span>
      <video class="vid" src="media/handoff-film-v2.mp4" poster="media/poster-v2.jpg" controls playsinline preload="none" style="width:100%;margin-top:6px"></video>
      <span class="lab">The 2-minute film · Kenneth Kurniawan, Michael Janto, Stevie Konardi</span></div>
    <div class="col" style="gap:10px;width:520px"><span class="lab">Or jump to a chapter</span>${chapterList()}
      <p class="ts mu" style="margin-top:6px">This is a clickable design prototype with demo data. The MVP builds AI Buddy on real company SOPs, mentor escalation and the handover library first.</p></div></div>` }),
  end: () => ({ kind: 'page', w: 1100, h: 700, html: `<div class="col fade" style="width:1100px;height:700px;gap:20px;justify-content:center">
    <span class="lab or">End of tour</span><div class="xl" style="font-size:80px">That's Handoff<i>.</i></div>
    <p class="t mu" style="font-size:19px;max-width:700px">Knowledge stays when interns leave, so every new intern starts ahead: found through AI matching, guided by AI Buddy and a mentor, and leaving behind verified knowledge and a verified record.</p>
    <div class="row" style="gap:16px;align-items:stretch"><div class="card" style="flex:1"><span class="lab or">Built</span><span class="t">Research and business model, the full design for 3 users, and this clickable prototype.</span></div>
      <div class="card" style="flex:1"><span class="lab or">MVP next</span><span class="t">AI Buddy on real company SOPs, mentor escalation and the handover library, in a 90-day pilot with 1 company and 1 campus.</span></div>
      <div class="card" style="flex:1"><span class="lab or">Later</span><span class="t">Job matching from the verified record, after the pilot.</span></div></div>
    <div class="row" style="gap:12px;flex-wrap:wrap"><button class="btn" data-go="S01">Explore the intern app ${I('arr')}</button><button class="btn o" data-go="C01">Company dashboard</button><button class="btn o" data-go="U01">University dashboard</button><button class="btn o" data-nav="#/tour/1">Full tour from the start</button><button class="btn o" data-menu>All stops</button></div></div>` })
};

function render() {
  const h = location.hash || '#/';
  document.querySelectorAll('.coach.sheet').forEach(n => n.remove()); stage.style.bottom = '';
  let m, view, stop = null, active = 'tour';
  if ((m = h.match(/^#\/(tour|quick)\/(\d+)/))) {
    const seq = MODES[m[1]], pos = Math.min(seq.length, Math.max(1, +m[2]));
    stop = { mode: m[1], pos, seq, n: seq[pos - 1] };
    view = SCREENS[TOUR[stop.n - 1][0]]();
  }
  else if ((m = h.match(/^#\/s\/(\w+)/)) && SCREENS[m[1]]) { view = SCREENS[m[1]](); active = /^(C|V|R|K|RB)/.test(m[1]) ? 'co' : /^U/.test(m[1]) ? 'uni' : 'app'; }
  else if (h === '#/end') { view = PAGES.end(); }
  else { view = PAGES.welcome(); active = 'home'; }
  document.querySelectorAll('.top nav button[data-k]').forEach(b => b.classList.toggle('on', b.dataset.k === active));
  prog.style.width = stop ? (stop.pos / stop.seq.length * 100) + '%' : (h === '#/end' ? '100%' : '0');
  const wrap = view.kind === 'phone' ? `<div class="phone">${view.html}</div>` : view.html;
  curView = view;
  stage.innerHTML = `<div class="fit" id="fit">${wrap}</div>`;
  fit(view);
  if (stop) tour(stop, view);
  $('#hint').textContent = stop ? (stop.mode === 'quick' ? 'Quick tour' : 'Full tour') + ' · → next · ← back · Esc to explore' : (view.kind === 'page' ? '' : 'Explore mode · tap, type and chat: every screen responds');
}
function fit(view) {
  const small = innerWidth <= 820, el = $('#fit');
  // On phones the overview/end pages lay out natively and scroll instead of being shrunk
  const flow = small && view.kind === 'page';
  stage.classList.toggle('flow', flow);
  if (flow) { el.style.cssText = ''; return; }
  const W = view.kind === 'phone' ? (small ? 440 : 476) : view.kind === 'desk' ? 1440 : view.w, H = view.kind === 'phone' ? (small ? 956 : 992) : view.kind === 'desk' ? 900 : view.h;
  const r = stage.getBoundingClientRect();
  const scale = Math.min((r.width - (small ? 12 : 32)) / W, (r.height - (small ? 8 : 28)) / H, view.kind === 'page' ? 1.15 : 1);
  el.style.width = W + 'px'; el.style.height = H + 'px'; el.style.transform = `scale(${scale})`;
}
const hashFor = (mode, pos, len) => pos > len ? '#/end' : pos < 1 ? '#/' : `#/${mode}/${pos}`;
function tour({ mode, pos, seq, n }, view) {
  const [code, key, ch, title, body, why] = TOUR[n - 1];
  const host = stage.querySelector('.scr') || stage.querySelector('.desk');
  const tgt = host.querySelector(`[data-tour="${key}"]`);
  const hr = host.getBoundingClientRect(), W = host.offsetWidth, H = host.offsetHeight, k = hr.width / W;
  const chapNew = pos === 1 || TOUR[seq[pos - 2] - 1][2] !== ch;
  host.insertAdjacentHTML('beforeend', `<div class="veil"></div><div class="spot"></div><div class="coach fade">
    <div class="meta"><span class="step">${pos} / ${seq.length}</span><span class="lab">${chapNew ? '<b class="or">New chapter · </b>' : ''}${ch + 1} · ${CHAPTERS[ch].name}</span></div>
    <div class="h3">${title}</div><div class="t mu">${body}</div><div class="why"><b>Why it matters</b>${why}</div>
    <div class="acts"><div class="row" style="gap:14px"><button class="lnk" data-menu>All stops</button><button class="lnk" data-nav="#/end">Skip</button></div><div class="r">${pos > 1 ? `<button class="btn o s" data-nav="${hashFor(mode, pos - 1)}">Back</button>` : ''}<button class="btn s" data-nav="${hashFor(mode, pos + 1, seq.length)}">${pos < seq.length ? 'Next' : 'Finish'} ${I('arr', 18)}</button></div></div></div>`);
  const spot = host.querySelector('.spot'), coach = host.querySelector('.coach');
  const desk = W > 600, cw = desk ? 420 : W - 32; coach.style.width = cw + 'px';
  let b = { x: 20, y: 120, w: W - 40, h: 200 };
  if (tgt) { const t = tgt.getBoundingClientRect(); b = { x: (t.left - hr.left) / k - 8, y: (t.top - hr.top) / k - 8, w: t.width / k + 16, h: t.height / k + 16 }; }
  Object.assign(spot.style, { left: b.x + 'px', top: b.y + 'px', width: b.w + 'px', height: b.h + 'px' });
  // Desktop screens shrink a lot on a phone: show the coach card full size as a bottom sheet instead
  if (desk && innerWidth <= 820) {
    coach.classList.add('sheet'); coach.style.width = ''; document.body.appendChild(coach);
    stage.style.bottom = coach.offsetHeight + 16 + 'px'; fit(view); return;
  }
  const ch2 = coach.offsetHeight, cl = (v, lo, hi) => Math.max(lo, Math.min(hi, v));
  const area = ([x, y]) => Math.max(0, Math.min(y + ch2, b.y + b.h) - Math.max(y, b.y)) * Math.max(0, Math.min(x + cw, b.x + b.w) - Math.max(x, b.x));
  const yy = v => cl(v, desk ? 24 : 56, H - ch2 - (desk ? 24 : 30)), xx = v => cl(v, 16, W - cw - 16);
  const cands = desk
    ? [[W - cw - 40, H - ch2 - 40], [40, H - ch2 - 40], [W - cw - 40, 40], [40, 40], [b.x + b.w + 20, yy(b.y)], [b.x - cw - 20, yy(b.y)], [xx(b.x + b.w - cw), b.y + b.h + 20], [xx(b.x + b.w - cw), b.y - ch2 - 20]]
    : (b.y + b.h / 2 > H / 2 ? [[16, 60], [16, H - ch2 - 34]] : [[16, H - ch2 - 34], [16, 60]]).concat([[16, b.y + b.h + 14], [16, b.y - ch2 - 14]]);
  const ok = cands.filter(([x, y]) => x >= 8 && y >= 8 && x + cw <= W - 8 && y + ch2 <= H - 8);
  const p = ok.find(c => !area(c)) || ok.sort((m, n) => area(m) - area(n))[0] || cands[0];
  coach.style.left = p[0] + 'px'; coach.style.top = p[1] + 'px';
}
function menu(open) {
  const el = $('#menu');
  if (!open) { el.hidden = true; return; }
  const cur = (location.hash.match(/^#\/(tour|quick)\/(\d+)/) || []), curN = cur[1] ? MODES[cur[1]][+cur[2] - 1] : 0;
  el.innerHTML = `<div class="panel fade"><div class="row sbw"><div class="h2" style="font-size:30px">All ${TOUR.length} stops<i>.</i></div><button class="icb" data-menu-close>✕</button></div>
    <p class="ts mu">Jump anywhere. Stops marked <span class="qk">Q</span> are in the 12-stop quick tour.</p>
    <div class="mgrid">${CHAPTERS.map((c, ci) => `<div class="col" style="gap:4px"><span class="lab or">${ci + 1} · ${c.name}</span><span class="lab">${c.who}</span>
      ${TOUR.map((t, i) => t[2] === ci ? `<button class="mstop${i + 1 === curN ? ' on' : ''}" data-nav="#/tour/${i + 1}"><span class="lab">${i + 1}</span>${t[3]}${QUICK.includes(i + 1) ? '<span class="qk">Q</span>' : ''}</button>` : '').join('')}</div>`).join('')}</div></div>`;
  el.hidden = false;
}
document.addEventListener('click', e => {
  if (e.target.closest('[data-menu]')) { menu(true); return; }
  if (e.target.closest('[data-menu-close]') || e.target.id === 'menu') { menu(false); return; }
  const nav = e.target.closest('[data-nav]'); if (nav) { menu(false); location.hash = nav.dataset.nav; return; }
  if (/^#\/(tour|quick)/.test(location.hash) && e.target.closest('.scr,.desk') && !e.target.closest('.coach')) return; // during the tour the screen is a picture
  const go = e.target.closest('[data-go]'); if (go) { location.hash = '#/s/' + go.dataset.go; return; }
  if (e.target.closest('[data-back]')) history.length > 1 ? history.back() : (location.hash = '#/');
});
document.addEventListener('keydown', e => {
  if (!$('#menu').hidden) { if (e.key === 'Escape') menu(false); return; }
  const m = location.hash.match(/^#\/(tour|quick)\/(\d+)/);
  if (e.key === 'ArrowRight' || e.key === 'Enter') location.hash = m ? hashFor(m[1], +m[2] + 1, MODES[m[1]].length) : (location.hash === '#/' || !location.hash ? '#/quick/1' : location.hash);
  if (e.key === 'ArrowLeft' && m) location.hash = hashFor(m[1], +m[2] - 1);
  if (e.key === 'Escape' && m) location.hash = '#/s/' + TOUR[MODES[m[1]][+m[2] - 1] - 1][0];
});
window.addEventListener('hashchange', render);
// Width changes redraw; height-only changes (mobile address bar, on-screen keyboard) just rescale,
// so scrolling pages keep their place and text typed in explore mode isn't wiped.
let lastW = innerWidth, curView;
window.addEventListener('resize', () => { if (innerWidth !== lastW) { lastW = innerWidth; render(); } else if (document.querySelector('.coach.sheet')) render(); else if (curView) fit(curView); });
document.fonts.ready.then(render);
render();
