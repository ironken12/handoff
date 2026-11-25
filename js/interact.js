// Explore-mode interactivity for every screen: typeable fields, toggles, chips, live chat replies,
// search filtering and responsive action buttons. During the guided tour the screen stays a picture.
(() => {
  const inTour = () => /^#\/(tour|quick)/.test(location.hash);
  const host = () => document.querySelector('#stage .scr, #stage .desk');
  const code = () => (location.hash.match(/^#\/s\/(\w+)/) || [])[1] || '';
  const esc = s => s.replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
  const CHECK = '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#EFECE4" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12l5 5 9-10"/></svg>';

  // ── toast ──
  let tt; function toast(msg) {
    let el = document.getElementById('toast'); if (!el) { el = document.createElement('div'); el.id = 'toast'; document.body.appendChild(el); }
    el.innerHTML = msg; el.classList.add('show'); clearTimeout(tt); tt = setTimeout(() => el.classList.remove('show'), 2600);
  }

  // ── small pop-up form: modal('Title', [[label, placeholder, value]], 'OK label', vals => …) ──
  function modal(title, fields, ok, onOk, sub = '') {
    const m = document.createElement('div'); m.className = 'modal';
    m.innerHTML = `<div class="mpanel fade"><div class="row sbw"><b class="h3">${title}</b><button class="icb" data-x aria-label="Close">✕</button></div>${sub ? `<span class="ts mu">${sub}</span>` : ''}
      ${fields.map(([l, ph, v]) => `<div class="col" style="gap:7px"><span class="lab">${l}</span><div class="field"><input class="hin" placeholder="${esc(ph || '')}" value="${esc(v || '')}"></div></div>`).join('')}
      <div class="row" style="justify-content:flex-end;gap:10px"><button class="btn o s" data-x>Cancel</button><button class="btn s" data-ok>${ok}</button></div></div>`;
    document.body.appendChild(m); const first = m.querySelector('input'); first && first.focus();
    const submit = () => { const vals = [...m.querySelectorAll('input')].map(i => i.value.trim()); if (!vals[0]) { first.focus(); toast('Fill in the first field'); return; } m.remove(); onOk(vals.map(esc)); };
    m.addEventListener('click', e => { if (e.target === m || e.target.closest('[data-x]')) m.remove(); else if (e.target.closest('[data-ok]')) submit(); });
  }

  // ── turn static fields into real inputs after every render ──
  function enhance() {
    const h = host(); if (!h || h.dataset.live) return; h.dataset.live = 1;
    h.querySelectorAll('.input').forEach(box => {
      const tn = [...box.childNodes].find(n => n.nodeType === 3 && n.textContent.trim()); if (!tn) return;
      const inp = document.createElement('input'); inp.className = 'hin'; inp.placeholder = tn.textContent.trim(); inp.setAttribute('aria-label', inp.placeholder);
      box.replaceChild(inp, tn);
    });
    h.querySelectorAll('.field').forEach(f => {
      if (f.querySelector('input')) return;
      const v = f.textContent.trim(), pw = /^•+$/.test(v), otp = v.length <= 1 && f.parentElement.querySelectorAll(':scope > .field').length >= 4;
      const inp = document.createElement('input'); inp.className = 'hin';
      if (pw) { inp.type = 'password'; inp.value = 'handoff2026'; } else inp.value = v;
      if (otp) { inp.maxLength = 1; inp.inputMode = 'numeric'; inp.style.textAlign = 'center'; inp.dataset.otp = 1; }
      f.textContent = ''; f.appendChild(inp);
    });
    h.querySelectorAll('.chip, .ck, .tog, .btn, button, a, .icb').forEach(e => { if (!e.closest('[data-go],[data-nav],[data-back],[data-menu]')) e.style.cursor = 'pointer'; });
  }
  new MutationObserver(enhance).observe(document.getElementById('stage'), { childList: true });

  // ── chat: send, then a reply that fits the screen ──
  const KB = [
    [/vpn/i, 'Request VPN access in the IT Service Desk form (IT-07). Approval takes about 1 working day.', 'Onboarding SOP v3 · verified by Andi'],
    [/deploy/i, 'Deploys run every Tuesday and Thursday at 16:00 through the release channel. Interns ship with a buddy for the first two.', 'Handover · Cohort 2025 · Raka W.'],
    [/template|format|finance file/i, 'Use the Finance recap template (XLSX). Keep the store-code column first, or the import fails.', 'Report SOP.pdf · page 4'],
    [/access|password|account/i, 'Account access goes through your mentor: Andi approves it in the dashboard, usually the same day.', 'Access policy · verified'],
    [/brand|logo|asset/i, 'Brand files live in the Shared Drive under Marketing / Brand Kit 2026. Use the PNG export for slides.', 'Handover · Cohort 2024 · Dita S.'],
    [/billing|invoice/i, 'Billing questions go to Finance (Mbak Wulan). Use the #finance-help channel, not direct messages.', 'Team contacts card · verified'],
    [/logbook|log\b|daily/i, 'Record one minute in Voice logbook before 17:00; AI drafts the entry and Andi approves it.', 'Campus logbook format · ITB'],
    [/report|sales/i, 'Download transactions from the Sales Dashboard, check rows without a store code, then match the Finance recap.', 'Handover · Cohort 2025 · Raka W.']];
  function reply(scr, text) {
    if (scr === 'S14') {
      const hit = KB.find(([re]) => re.test(text));
      if (hit) return `<span>${hit[1]}</span><div style="border:1px solid var(--line);border-radius:14px;padding:8px 12px;background:#fff;font-size:13px"><b style="color:#1E9E5A">Source</b> · ${hit[2]}</div>`;
      return `<span>I couldn't find a verified answer in the company documents, so I won't guess. I've asked your mentor <b>Andi</b>; his answer will appear here and be saved for the next intern.</span>`;
    }
    if (scr === 'S10') return 'Thanks, that helps. Next question: is there anything about the interview day you wish you had known?';
    if (scr === 'S18') return 'Saved to your handover. I turned it into a draft card; Andi reviews it before it reaches the next intern.';
    if (scr === 'H03') return 'Thanks, we\'ve got it. Rina from Handoff Support will reply here within about an hour.';
    return 'Got it. Saved.';
  }
  function send(row) {
    const inp = row.querySelector('.hin'), text = inp && inp.value.trim(); if (!text) { inp && inp.focus(); return; }
    const scr = code(), h = host(), body = h.querySelector('.body'), spacer = row.previousElementSibling && row.previousElementSibling.classList.contains('grow') ? row.previousElementSibling : row;
    // a note box inside a card (HR notes): add the note above the box
    if (!row.classList.contains('row')) {
      row.insertAdjacentHTML('beforebegin', `<div style="background:var(--page);border-radius:12px;padding:10px 12px"><div class="ts">${esc(text)}</div><span class="lab">You · just now</span></div>`);
      inp.value = ''; toast('Note added'); return;
    }
    spacer.insertAdjacentHTML('beforebegin', `<div class="bub me">${esc(text)}</div>`); inp.value = '';
    spacer.insertAdjacentHTML('beforebegin', `<div class="bub ai typing">···</div>`);
    if (body) { body.style.overflowY = 'auto'; body.scrollTop = body.scrollHeight; }
    setTimeout(() => { const t = h.querySelector('.bub.typing'); if (!t) return; t.classList.remove('typing'); t.classList.add('col'); t.style.gap = '10px'; t.innerHTML = reply(scr, text); if (body) body.scrollTop = body.scrollHeight; }, 900);
  }

  // ── action buttons: what each one does in the demo ──
  const ACTIONS = [
    [/^log in$/i, () => { location.hash = '#/s/S12'; }],
    [/^intern preview$/i, () => { location.hash = '#/s/S13'; }],
    [/^ask andi/i, (b) => done(b, 'Asked Andi', 'Sent to Andi. You\'ll be notified when he answers.')],
    [/verify & issue/i, (b) => done(b, 'Verified', 'Verified · record issued with a QR code')],
    [/approve & add/i, (b) => done(b, 'Added to library', 'Approved · the card is now in the knowledge library')],
    [/^approve$/i, (b) => { done(b, 'Approved', 'Approved · the card is now verified'); }],
    [/send & save/i, (b) => done(b, 'Sent', 'Sent to the intern and saved as a verified card')],
    [/send back|request revision/i, (b) => done(b, 'Sent back', 'Sent back with your comments')],
    [/^accept$/i, (b) => done(b, 'Accepted', 'Accepted · offer sent to Alya')],
    [/^reject$/i, (b) => done(b, 'Rejected', 'Rejected · Alya gets a polite update')],
    [/decline offer/i, (b) => done(b, 'Declined', 'Offer declined · the company is notified')],
    [/start chat interview/i, (b) => done(b, 'Invite sent', 'Chat interview invite sent to Alya')],
    [/^publish$/i, (b) => done(b, 'Published', 'Published · new interns see it on Day 1')],
    [/duplicate/i, (b) => toast('Program duplicated as a draft')],
    [/remove automatically/i, (b) => done(b, 'Removed', 'Sensitive data removed from the card')],
    [/^view$/i, () => toast('Showing the original passage')],
    [/^save template$/i, (b) => done(b, 'Saved', 'Logbook template saved')],
    [/^save$/i, (b) => done(b, 'Saved', 'Saved to your bookmarks')],
    [/upload/i, () => pick()],
    [/export|download/i, (b) => { const r = REPORT[code()]; r ? (location.hash = '#/s/' + r) : toast(`${esc(b.textContent.trim())} · saved to your device (demo)`); }],
    [/resubmit/i, (b) => done(b, 'Resubmitted', 'Resubmitted · Andi reviews it today')],
    [/choose onboarding/i, (b) => done(b, 'Selected', 'Onboarding plan selected · it starts after the free cohort')],
    [/talk to sales/i, () => toast('Our team will email you within 1 working day')],
    [/send reminder/i, (b) => done(b, 'Reminder sent', 'Reminder sent to the student and their mentor')],
    [/save changes/i, (b) => done(b, 'Saved', 'Settings saved')],
    [/save draft/i, (b) => done(b, 'Draft saved', 'Saved as a draft in Openings')],
    [/create opening/i, () => toast('New opening created as a draft')],
    [/invite member/i, (b) => modal('Invite a team member', [['Work email', 'name@nusantara.id'], ['Role', 'Mentor, HR or Admin']], 'Send invite', ([e, r]) => {
      const card = [...host().querySelectorAll('.card')].find(c => /Team members/.test(c.textContent)); const role = /admin/i.test(r) ? 'Admin' : /hr/i.test(r) ? 'HR' : 'Mentor';
      card.insertAdjacentHTML('beforeend', `<div class="row fade" style="padding:13px 0;border-top:1px solid var(--line);gap:12px"><span class="av s">${e[0].toUpperCase()}</span><div class="col grow"><b class="ts">${e}</b><span class="ts mu">Invite sent · not joined yet</span></div><span class="badge ln">${role}</span></div>`);
      const n = card.querySelector('.lab'); if (n) n.textContent = (parseInt(n.textContent) + 1) + ' people'; toast(`Invite sent to ${e}`); })],
    [/^call$|whatsapp/i, () => toast('Connecting you to Handoff Support…')],
    [/request leave/i, (b) => done(b, 'Requested', 'Leave request sent to Andi')],
    [/attachments/i, () => pick()],
    [/manage plan|upgrade/i, () => toast('Plans: Pilot is free for the first 90 days')],
    [/^edit$/i, (b) => { const c = b.closest('.card') || b.parentElement; c.contentEditable = c.isContentEditable ? 'false' : 'true'; c.focus(); toast(c.isContentEditable ? 'Editing · click any text to change it' : 'Changes kept'); }]];
  function done(b, label, msg) { b.innerHTML = `${label} ✓`; b.style.opacity = .55; b.style.pointerEvents = 'none'; toast(msg); const c = b.closest('.card'); if (c && /approve|verify|add to library/i.test(label)) c.style.outline = '2px solid #1E9E5A'; }
  function pick() { const f = document.createElement('input'); f.type = 'file'; f.onchange = () => f.files[0] && toast(`Uploaded <b>${esc(f.files[0].name)}</b> · AI is indexing it`); f.click(); }
  // ── internship search (S06): chips and search box filter the list together ──
  const CHIP_TAG = { 'campus partners': 'partner', hybrid: 'hybrid', bandung: 'bandung', '3 months': '3m' };
  function filterJobs() {
    const h = host(), list = h && h.querySelector('#jobs'); if (!list) return;
    const q = ((h.querySelector('.hin') || {}).value || '').trim().toLowerCase();
    const tags = [...h.querySelectorAll('.chips-x .chip.on')].map(c => CHIP_TAG[c.textContent.trim().toLowerCase()]).filter(Boolean);
    const cards = [...list.querySelectorAll('.card[data-tags]')]; let shown = 0;
    cards.forEach(c => { const tg = c.dataset.tags.split(' '), hit = tags.every(t => tg.includes(t)) && (!q || c.textContent.toLowerCase().includes(q)); c.style.display = hit ? '' : 'none'; shown += hit; });
    const lab = list.querySelector(':scope > .lab'); if (lab) lab.textContent = shown === cards.length ? `Best fit for you · ${cards.length} openings` : `${shown} of ${cards.length} openings`;
    if (!shown) toast('No internships match · try fewer filters');
  }

  // ── university posts a partner internship (U05) ──
  function postPartner(btn) {
    const h = host(), val = k => { const f = h.querySelector(`[data-f="${k}"]`), i = f && f.querySelector('input'); return (i ? i.value : f ? f.textContent : '').trim(); };
    const co = val('co'), role = val('role'), where = val('where') || 'Bandung · Hybrid', dur = val('dur') || '3 months', seats = val('seats') || '1';
    if (!co || !role) { toast('Add the partner company and the role first'); return; }
    const open = [...h.querySelectorAll('[data-f="open"] .chip.on')].map(c => c.textContent.trim());
    if (!open.length) { toast('Choose at least one faculty that can apply'); return; }
    const togs = h.querySelectorAll('.tog'), credit = togs[0] && togs[0].classList.contains('on'), confirm = togs[1] && togs[1].classList.contains('on');
    const live = !confirm;
    h.querySelector('#posted').insertAdjacentHTML('afterbegin', `<div class="row fade" style="padding:12px 0;border-top:1px solid var(--line);gap:12px"><div class="col grow"><b class="ts">${esc(role)}</b><span class="ts mu">${esc(co)}${credit ? ' · 20 SKS' : ''}</span></div><div class="col" style="align-items:flex-end;gap:4px"><span class="badge ${live ? 'ok' : 'wa'}">${live ? 'Live' : 'Waiting for company'}</span><span class="lab">${live ? `Just now · ${esc(seats)} seats` : `Sent to ${esc(co)} just now`}</span></div></div>`);
    const n = h.querySelector('#posted-n'); n.textContent = +n.textContent + 1;
    done(btn, live ? 'Published' : 'Sent to company', live ? `Published · ${esc(open.join(', '))} students see it in the intern app now` : `Sent to ${esc(co)} to confirm · students see it once they approve`);
    if (live && typeof JOBS !== 'undefined') {
      const m = dur.match(/\d+/), tags = [...where.toLowerCase().split(/[^a-z-]+/).map(w => w.replace('-', '')).filter(Boolean), m ? m[0] + 'm' : '', 'partner'].join(' ');
      const j = { co, l: co[0].toUpperCase(), bg: '#1E9E5A', where: `${where} · ${dur}`, role, skills: `Open to ${open.join(', ')}`, fit: 72, tags, partner: 'ITB', sks: credit ? 20 : 0, isNew: 1 };
      ['co', 'l', 'where', 'role', 'skills'].forEach(k => j[k] = esc(j[k]));
      const at = JOBS.findIndex(x => x.fit < j.fit); JOBS.splice(at < 0 ? JOBS.length : at, 0, j);   // keep the list ranked by fit
      if (typeof regJobs === 'function') regJobs();
    }
  }

  // ── tables with search and filter chips (university Students and Companies) ──
  function filterRows() {
    const h = host(); if (!h) return; const inp = h.querySelector('.input .hin'), q = inp ? inp.value.trim().toLowerCase() : '';
    const on = [...h.querySelectorAll('[data-filter] .chip.on')].slice(0).filter(c => c !== c.parentElement.firstElementChild).map(c => c.textContent.trim());
    let shown = 0; h.querySelectorAll('.srow').forEach(r => { const hit = (!on.length || on.includes(r.dataset.tags)) && (!q || r.textContent.toLowerCase().includes(q)); r.style.display = hit ? '' : 'none'; shown += hit; });
    if (!shown) toast('Nothing matches · try another filter');
  }

  // ── company publishes an opening (C09): goes to Openings and, for students, to Find internships ──
  function publishOpening(btn) {
    const h = host(), val = k => { const f = h.querySelector(`[data-f="${k}"]`), i = f && f.querySelector('input'); return (i ? i.value : '').trim(); };
    const role = val('role'); if (!role) { toast('Give the opening a role title'); return; }
    const where = val('where') || 'Jakarta · Hybrid', dur = val('dur') || '3 months', skills = [...h.querySelectorAll('[data-f="skills"] .chip.on')].map(c => c.textContent.trim());
    OPENINGS.unshift({ role: esc(role), team: esc(val('team') || 'General'), where: esc(where), dur: esc(dur), apps: 0, st: 'Live', k: 'ok' });
    const m = dur.match(/\d+/), tags = [...where.toLowerCase().split(/[^a-z-]+/).map(w => w.replace('-', '')).filter(Boolean), m ? m[0] + 'm' : ''].join(' ');
    JOBS.splice(1, 0, { co: 'Nusantara Digital', l: 'N', bg: 'var(--sig)', where: esc(`${where} · ${dur}`), role: esc(role), skills: esc(skills.slice(0, 3).join(' · ') || 'Open to all skills'), fit: 88, tags });
    regJobs(); location.hash = '#/s/C03'; toast(`Published · <b>${esc(role)}</b> is live for students`);
  }

  const ACT = {
    flip: el => toast(el.classList.toggle('on') ? 'Switched to the back camera' : 'Switched to the front camera'),
    reject: el => { const c = el.closest('div[style*="background:var(--dl)"]') || el.parentElement; c.style.opacity = .4; el.textContent = 'Rejected'; el.style.pointerEvents = 'none'; toast("Rejected · the card won't reach interns"); },
    resend: el => { el.textContent = 'New code sent · resend again in 0:59'; el.style.pointerEvents = 'none'; toast('New code sent to alya.putri@students.itb.ac.id'); },
    portfolio: () => pick(),
    forgot: () => toast('Password reset link sent to your campus email'),
    edit: el => { const c = el.closest('.card') || el.parentElement; c.contentEditable = c.isContentEditable ? 'false' : 'true'; c.focus(); toast(c.isContentEditable ? 'Editing · click any text to change it' : 'Changes kept'); },
    restore: el => { el.textContent = 'Restored'; el.style.pointerEvents = 'none'; toast('Restored as a new version · the current one stays in history'); },
    'read-all': el => { host().querySelectorAll('.dot').forEach(d => d.remove()); done(el, 'All read', 'All notifications marked as read'); },
    'add-task': el => modal('Add a task', [['Task', 'e.g. Review the onboarding checklist'], ['Day', 'Day 21']], 'Add task', ([t, d]) => {
      el.closest('.card').insertAdjacentHTML('beforeend', `<div class="row fade" style="padding:13px 10px;border-top:1px solid var(--line);gap:14px"><span class="lab" style="width:56px">${d || 'Day —'}</span><b class="ts grow">${t}</b><span class="badge ok">New</span></div>`); toast('Task added to Phase 1'); }),
    'add-phase': el => modal('Add a phase', [['Phase', 'e.g. Phase 4 · Days 91–120'], ['Focus', 'e.g. Extend']], 'Add phase', ([p, f]) => {
      el.insertAdjacentHTML('beforebegin', `<div class="card fade" style="gap:4px"><span class="lab">${p}</span><div class="row sbw"><b class="h3">${f || 'New phase'}</b><span class="lab">0 tasks</span></div></div>`); toast('Phase added to the roadmap'); }),
    message: () => { const n = host().querySelector('.h1').textContent.replace(/\.$/, ''); modal(`Message ${n}`, [['Message', 'Write a message…']], 'Send', () => toast(`Sent to ${esc(n)} in the Handoff app`)); },
    'add-partner': () => modal('Add a partner company', [['Company', 'e.g. Bumi Agritech'], ['Sector', 'e.g. Agriculture'], ['Partnership valid until', 'e.g. 2029']], 'Add partner', ([c, sct, y]) => {
      PARTNERS.push([c, sct || '—', `Active until ${y || '2029'}`, 'ok', 0, 0]); render(); toast(`${c} added · you can post internships for them now`); }),
    renew: el => { el.textContent = 'Renewal sent ✓'; el.style.pointerEvents = 'none'; toast('MoU renewal sent to Pasar Pintar for e-signature'); },
    'invite-admin': () => modal('Invite to the career center', [['Name', 'e.g. Budi Santoso'], ['Role', 'e.g. Staff · FMIPA']], 'Send invite', ([n, r]) => {
      host().querySelector('#admins').insertAdjacentHTML('beforeend', `<div class="row fade" style="padding:12px 0;border-top:1px solid var(--line);gap:12px"><span class="av s">${n.split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase()}</span><div class="col grow"><b class="ts">${n}</b><span class="ts mu">${r || 'Staff'} · invite sent</span></div></div>`); toast(`Invite sent to ${n}`); }),
    'publish-opening': el => publishOpening(el),
    print: () => window.print(),
  };
  // export and download buttons open the matching demo report
  const REPORT = { U02: 'RPT_UNI', U08: 'RPT_UNI', U01: 'RPT_UNI', U05: 'RPT_PART', U07: 'RPT_PART', C10: 'RPT_CO', C08: 'RPT_CO', S17: 'RPT_LOG', S21: 'RPT_REC' };

  const SIDE = { Openings: 'C02', Analytics: null, Companies: null, Settings: null };

  document.addEventListener('click', e => {
    if (inTour() || !e.target.closest('#stage')) return;
    const t = e.target;
    if (t.closest('[data-go],[data-nav],[data-back],[data-menu]')) return;
    const act = t.closest('[data-act]'); if (act && ACT[act.dataset.act]) { ACT[act.dataset.act](act); return; }
    const box = t.closest('.input, .field'); if (box) { const i = box.querySelector('input'); i && i.focus(); return; }
    const sendBtn = t.closest('.row > .av'); if (sendBtn && sendBtn.parentElement.querySelector(':scope > .input')) { send(sendBtn.parentElement); return; }
    const ck = t.closest('.ck'); if (ck) { if (ck.classList.contains('e')) { ck.classList.remove('e'); ck.innerHTML = CHECK; } else { ck.classList.add('e'); ck.innerHTML = ''; } return; }
    const tog = t.closest('.tog'); if (tog) { tog.classList.toggle('on'); toast(tog.classList.contains('on') ? 'Turned on' : 'Turned off'); return; }
    const chip = t.closest('.chip'); if (chip) {
      if (/^\+ add$/i.test(chip.textContent.trim())) { modal('Add a skill', [['Skill', 'e.g. Python']], 'Add', ([v]) => { chip.insertAdjacentHTML('beforebegin', `<span class="chip on" style="${chip.getAttribute('style') || ''}">${v}</span>`); toast(`${v} added`); }); return; }
      if (chip.closest('[data-filter]')) { const all = [...chip.parentElement.querySelectorAll('.chip')], first = all[0];
        if (chip === first) all.forEach(c => c.classList.toggle('on', c === first)); else { chip.classList.toggle('on'); first.classList.toggle('on', !all.slice(1).some(c => c.classList.contains('on'))); }
        filterRows(); return; }
      const scr = code(); if (scr === 'S14') { const i = host().querySelector('.hin'); i.value = chip.textContent.trim() + '?'; send(i.closest('.row')); return; }
      if (scr === 'S06' && chip.closest('.chips-x')) { const all = [...chip.parentElement.querySelectorAll('.chip')], fy = all[0];
        if (chip === fy) all.forEach(c => c.classList.toggle('on', c === fy)); else { chip.classList.toggle('on'); fy.classList.toggle('on', !all.slice(1).some(c => c.classList.contains('on'))); }
        filterJobs(); return; }
      const grp = chip.parentElement, single = scr === 'H02' || /daily|weekly|monthly/i.test(chip.textContent);
      if (single) grp.querySelectorAll('.chip').forEach(c => c !== chip && c.classList.remove('on'));
      chip.classList.toggle('on'); return; }
    const side = t.closest('.side a'); if (side) { const l = side.textContent.trim().replace(/\d+$/, ''); const go = SIDE[l]; if (go) location.hash = '#/s/' + go; else toast(`${esc(l)} is outside this prototype`); return; }
    const icb = t.closest('.icb'); if (icb) { toast('You\'re all caught up · no new notifications'); return; }
    const post = t.closest('[data-post]'); if (post) { postPartner(post); return; }
    const b = t.closest('.btn, button'); if (b) { const lab = b.textContent.trim(); const a = ACTIONS.find(([re]) => re.test(lab)); a ? a[1](b) : toast(esc(lab) + ' ✓'); }
  });
  document.addEventListener('keydown', e => {
    const i = e.target; if (!(i instanceof HTMLInputElement) || !i.classList.contains('hin')) return;
    e.stopPropagation();   // typing must not trigger the tour's arrow / Enter keys
    const md = i.closest('.modal'); if (md) { if (e.key === 'Enter') md.querySelector('[data-ok]').click(); if (e.key === 'Escape') md.remove(); return; }
    if (e.key === 'Enter') { const box = i.closest('.input'); if (!box) return; const par = box.parentElement;
      if (par.classList.contains('row') && par.querySelector(':scope > .av')) send(par);          // chat box with a send button
      else if (/note|message|answer|write/i.test(i.placeholder)) send(box); }                     // note box inside a card
  }, true);
  document.addEventListener('input', e => {
    const i = e.target; if (!(i instanceof HTMLInputElement) || !i.classList.contains('hin')) return;
    if (i.dataset.otp && i.value) { const f = i.closest('.field'), n = f && f.nextElementSibling && f.nextElementSibling.querySelector('input'); n && n.focus(); }
    // search boxes filter the cards on the screen
    if (code() === 'S06' && /role, company/i.test(i.placeholder)) { filterJobs(); return; }
    if (host() && host().querySelector('.srow') && /search/i.test(i.placeholder)) { filterRows(); return; }
    if (/search|role, company/i.test(i.placeholder)) { const q = i.value.trim().toLowerCase(), h = host(); let n = 0, shown = 0;
      h.querySelectorAll('.card').forEach(c => { if (c.contains(i)) return; const hit = !q || c.textContent.toLowerCase().includes(q); c.style.display = hit ? '' : 'none'; n++; shown += hit; });
      if (q && n && !shown) toast('No results · try another role, company or skill'); }
  });
})();
