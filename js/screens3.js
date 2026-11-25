// Pages behind every remaining button: internship details, notifications, documents, company openings,
// interns, transcripts, plans, and the university's students, companies, analytics and settings.

// ───────── shared data ─────────
const OPENINGS = [
  { role: 'Product Management Intern', team: 'Product & Tech', where: 'Jakarta · Hybrid', dur: '90 days', apps: 31, st: 'Live', k: 'ok' },
  { role: 'Data Analyst Intern', team: 'Data', where: 'Jakarta · Hybrid', dur: '3 months', apps: 18, st: 'Live', k: 'ok' },
  { role: 'Backend Engineering Intern', team: 'Platform', where: 'Jakarta · On-site', dur: '6 months', apps: 12, st: 'Closes in 5 days', k: 'wa' },
  { role: 'UI/UX Design Intern', team: 'Design', where: 'Remote', dur: '3 months', apps: 0, st: 'Draft', k: 'ln' }];

const STUDENTS = [
  { nim: '18221045', n: 'Alya Putri', fac: 'STEI', prog: 'Information Systems', co: 'Nusantara Digital', role: 'Product Management Intern', mentor: 'Andi Pratama', day: 90, log: '88/90', st: 'Ready to verify', k: 'sig' },
  { nim: '18221012', n: 'Bagus Wirawan', fac: 'STEI', prog: 'Informatics', co: 'Kopi Kilat', role: 'Growth Analyst Intern', mentor: 'Rina Sari', day: 24, log: '18/18', st: 'On track', k: 'ok' },
  { nim: '17321008', n: 'Citra Lestari', fac: 'FSRD', prog: 'Visual Communication Design', co: 'Nusantara Digital', role: 'UI/UX Design Intern', mentor: 'Andi Pratama', day: 20, log: '13/15', st: 'Logbook 2 days late', k: 'wa' },
  { nim: '18221077', n: 'Dinda Ayu', fac: 'STEI', prog: 'Information Systems', co: 'Lumbung Data', role: 'Data Analyst Intern', mentor: 'Hendra W.', day: 24, log: '18/18', st: 'On track', k: 'ok', partner: 1 },
  { nim: '18221033', n: 'Fikri Ramadhan', fac: 'STEI', prog: 'Informatics', co: 'Pasar Pintar', role: 'UI/UX Design Intern', mentor: 'Maya L.', day: 27, log: '15/20', st: 'Logbook incomplete', k: 'wa' },
  { nim: '18221091', n: 'Gilang Putra', fac: 'STEI', prog: 'Informatics', co: 'Pasar Pintar', role: 'Backend Intern', mentor: 'Not confirmed', day: 12, log: '9/9', st: "Mentor hasn't verified", k: 'wa' },
  { nim: '18221090', n: 'Hana Safitri', fac: 'SBM', prog: 'Management', co: 'Kopi Kilat', role: 'Marketing Intern', mentor: 'Rina Sari', day: 24, log: '13/18', st: '5 days without activity', k: 'er' },
  { nim: '13121044', n: 'Ivan Kurnia', fac: 'FTI', prog: 'Industrial Engineering', co: 'Gerbang Logistik', role: 'Operations Analyst Intern', mentor: 'Sari W.', day: 80, log: '70/72', st: 'Handover not started', k: 'wa', partner: 1 },
  { nim: '10221015', n: 'Jihan Amalia', fac: 'FMIPA', prog: 'Mathematics', co: '', role: '', mentor: '', day: 0, log: '', st: 'Awaiting placement', k: 'ln' }];
const initials = n => n.split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase();

const PARTNERS = [
  ['Nusantara Digital', 'Tech · Payments', 'Active until 2028', 'ok', 38, 2], ['Kopi Kilat', 'F&B · Retail', 'Active until 2027', 'ok', 24, 1],
  ['Lumbung Data', 'Data & AI', 'Active until 2028', 'ok', 19, 2], ['Gerbang Logistik', 'Logistics', 'Active until 2027', 'ok', 11, 1],
  ['Pasar Pintar', 'E-commerce', 'Expires in 30 days', 'wa', 9, 0], ['Sinar Elektrika', 'Electronics', 'Waiting for signature', 'ln', 0, 1],
  ['Hijau Lestari Energi', 'Energy', 'Active until 2029', 'ok', 6, 0]];

// ───────── internship detail + "application sent" for every opening in the intern app ─────────
function jobDetail(j) {
  const [city, mode, dur] = j.where.split(' · ');
  return phone(`${back('Internship detail')}<div class="row" style="gap:14px"><span class="logo-sq" style="background:${j.bg};color:${j.bg === 'var(--sig)' ? 'var(--ink)' : 'var(--page)'};width:48px;height:48px">${j.l}</span><div class="col"><b class="h3">${j.role}</b><span class="ts mu">${j.co} · ${city}</span></div></div>
  ${j.partner ? `<div class="card" style="background:var(--okl);border-color:var(--okl);gap:6px"><b class="row t" style="gap:8px">${I('cap', 18, '#1E9E5A')}Posted by ${j.partner} through a partnership</b><span class="ts">${j.sks ? `Counts for ${j.sks} SKS. ` : ''}The career center follows your progress and verifies your record at the end.</span></div>` : ''}
  <div class="card o" style="gap:8px"><div class="row sbw"><div class="col"><span class="num" style="font-size:56px">${j.fit}%</span><span class="lab" style="color:var(--ink)">AI fit</span></div>${I('spark', 26)}</div><span class="t">Your CV and projects match ${j.fit >= 75 ? 'most' : 'some'} of what ${j.co} asks for.</span></div>
  <div class="card" style="gap:12px"><span class="lab">What they're looking for</span>${j.skills.split(' · ').map((s, i) => `<div class="row">${CK(i < 2 || j.fit >= 75 ? '' : 'e')}<span class="t grow">${s}</span><span class="lab">${i < 2 || j.fit >= 75 ? 'You have it' : 'To learn'}</span></div>`).join('')}</div>
  <div class="row" style="gap:10px">${[['Duration', dur || '3 months'], ['Mode', mode || 'Hybrid'], ['City', city]].map(([a, b]) => `<div class="card" style="flex:1;padding:12px 14px;gap:4px"><span class="lab">${a}</span><b class="t">${b}</b></div>`).join('')}</div>
  <div class="grow"></div><div class="row" style="gap:12px"><button class="btn o">Save</button><button class="btn grow" data-go="JA_${j.key}">Apply now ${I('arr')}</button></div>`, { pad: '12px 20px 34px', gap: 14 });
}
const jobApplied = j => phone(`${back('Application')}<span class="av" style="width:64px;height:64px;border-radius:32px;background:var(--ok);margin-top:6px">${I('check', 32, '#fff', 2.5)}</span>
  <div class="h1">Application sent<i>.</i></div><span class="t mu">${j.role} at ${j.co}. They see your verified profile, not a bare CV.</span>
  <div class="card" style="gap:0;padding:8px 18px"><span class="lab" style="padding:10px 0">Sent with it</span>
   ${[['file', 'CV · Alya Putri', 'Tailored for this role'], ['shield', 'Campus verification', 'Active ITB student · semester 6'], ['spark', 'AI fit summary', j.fit + '% · you can edit it any time']].map(([ic, a, b]) => `<div class="row" style="padding:12px 0;border-top:1px solid var(--line);gap:14px"><span class="av k s">${I(ic, 16)}</span><div class="col grow"><b class="ts">${a}</b><span class="ts mu">${b}</span></div>${CK()}</div>`).join('')}</div>
  <div class="card k" style="flex-direction:row;align-items:center;gap:12px">${I('clock', 20, '#FF4A1C')}<b class="t grow">In HR review</b><span class="ts mu">± 3 days</span></div>
  ${j.partner ? `<div class="row ts mu" style="gap:8px">${I('cap', 16, '#1E9E5A')}ITB's career center has been told, because it's a partner internship.</div>` : ''}
  <div class="grow"></div><button class="btn o" data-go="S06">Back to internships</button><button class="btn" data-go="S09">View my applications ${I('arr')}</button>`, { pad: '12px 20px 34px', gap: 14 });
function regJobs() {
  JOBS.forEach(j => {
    if (!j.key) j.key = (j.co + j.role).replace(/\W/g, '').slice(0, 40);
    if (!j.go) j.go = 'JD_' + j.key;
    if (j.go === 'JD_' + j.key) SCREENS[j.go] = () => jobDetail(j);
    SCREENS['JA_' + j.key] = () => jobApplied(j);
  });
}

Object.assign(SCREENS, {
// ───────── intern app ─────────
LG: () => phone(`${back('Log in')}<div class="col" style="gap:6px"><div class="h1">Welcome back<i>.</i></div><span class="t mu">Log in with your campus email.</span></div>
  ${field('Campus email', 'alya.putri@students.itb.ac.id')}${field('Password', '••••••••••', I('eye', 18, '#5F5B52'))}
  <b class="ts" data-act="forgot" style="align-self:flex-end;cursor:pointer">Forgot password?</b>
  <div class="card" style="gap:6px"><b class="row t" style="gap:8px">${I('shield', 18, '#1E9E5A')}Only active students</b><span class="ts mu">Your campus email proves you're still enrolled.</span></div>
  <div class="grow"></div><button class="btn">Log in ${I('arr')}</button><p class="ts mu" style="text-align:center">New here? <b style="color:var(--ink);cursor:pointer" data-go="S02">Create an account</b></p>`, { pad: '12px 20px 34px', gap: 14 }),

CVP: () => phone(`${back('CV preview')}<div class="card" style="background:#fff;gap:10px;padding:22px">
   <b class="h3" style="font-size:24px">Alya Putri</b><span class="ts mu">alya.putri@students.itb.ac.id · Bandung</span><div class="hr"></div>
   <span class="lab">Education</span><span class="ts"><b>Bandung Institute of Technology</b> · Information Systems, semester 6 · GPA 3.62</span>
   <span class="lab">Experience</span><span class="ts"><b>Research assistant</b>, ITB Business Lab · Interviewed 8 small businesses about stock and sales records.</span>
   <span class="ts"><b>UI design, campus projects</b> · Designed 3 apps in Figma, tested each with 5+ students.</span>
   <span class="lab">Skills</span><span class="ts">User research · Figma · Notion · Presenting · Basic SQL</span>
   <span class="lab row or" style="gap:6px">${I('spark', 12, '#FF4A1C')}Tailored for Nusantara Digital</span><span class="ts mu">Research and Figma moved to the top, because the role asks for them first.</span></div>
  <div class="grow"></div><button class="btn" data-go="S08">Use this CV ${I('arr')}</button>`, { pad: '12px 20px 34px', gap: 14 }),

N01: () => phone(`${back('Notifications')}<div class="row sbw"><div class="h1">Updates<i>.</i></div><button class="btn o s" data-act="read-all">Mark all read</button></div>
  ${[['check', 'Andi approved your 25 Nov log', '10 min ago', 'S17', 1], ['chat', 'Andi answered your question about finance access', '1 h ago', 'S15', 1], ['alert', 'Revision requested on your 19 Nov log', 'Yesterday', 'L19', 1], ['cap', 'New ITB partner internship: Data Analyst Intern at Lumbung Data', 'Yesterday', 'JD_LumbungDataDataAnalystIntern'], ['clock', 'Weekly sync with Andi today at 15:00', 'Today', 'S12'], ['route', 'Phase 2 · Contribute starts on 3 Dec', '2 days ago', 'S13']].map(([ic, t, w, go, un]) => `<div class="card" data-go="${go}" style="flex-direction:row;align-items:center;gap:12px;padding:14px 16px"><span class="av${un ? '' : ' k'} s">${I(ic, 15)}</span><div class="col grow" style="gap:2px"><b class="ts">${t}</b><span class="lab">${w}</span></div>${un ? '<span class="dot"></span>' : ''}${I('arr', 16)}</div>`).join('')}`, { pad: '12px 20px 34px', gap: 12 }),

DOC: () => phone(`${back('Report SOP.pdf · page 4 of 6')}<div class="card" style="background:#fff;gap:12px;padding:22px;border-radius:10px">
   <span class="lab">Nusantara Digital · Finance & Product Ops · v3</span><b class="h3">Monthly sales report</b>
   <span class="ts"><b>1.</b> Download last month's transactions from the Sales Dashboard (Reports → Export → CSV).</span>
   <span class="ts"><b>2.</b> Filter rows without a store code. List them separately; don't delete them.</span>
   <span class="ts" style="background:var(--al);border-radius:6px;padding:6px 8px"><b>3.</b> Match totals against the Finance recap. Keep the store-code column first, or the import fails.</span>
   <span class="ts"><b>4.</b> Send the file to your mentor before the 5th working day. Finance gets it after the mentor approves.</span>
   <div class="hr"></div><span class="lab">Owner: Rina Sari · Updated 31 Jan 2027</span></div>
  <div class="row ts mu" style="gap:8px">${I('shield', 16, '#1E9E5A')}The highlighted step is the one AI Buddy quoted.</div>
  <div class="grow"></div><div class="row" style="gap:12px"><button class="btn o grow">Download</button><button class="btn grow" data-go="S14">Ask AI Buddy ${I('arr')}</button></div>`, { pad: '12px 20px 34px', gap: 14 }),

L19: () => phone(`${back('Fix log · 19 Nov')}<div class="h1">Fix your log<i>.</i></div>
  <div class="card" style="background:var(--wal);border-color:var(--wal);gap:6px"><span class="lab">Andi's comment</span><span class="t">"Add the result numbers."</span></div>
  ${field('Activity', 'Checked October sales data against the Finance recap.')}
  <div class="col" style="gap:7px"><span class="lab row or" style="gap:6px">${I('spark', 12, '#FF4A1C')}Result numbers · AI suggestion, edit it</span><div class="field">Found 14 rows without a store code. Fixed 12, sent 2 to Finance.</div></div>
  ${field('Skill learned', 'Sales data reconciliation')}
  <div class="grow"></div><button class="btn">Resubmit to Andi ${I('arr')}</button>`, { pad: '12px 20px 34px', gap: 14 }),

// ───────── company ─────────
C03: () => desk('C03', 0, `${head(`Nusantara Digital · ${OPENINGS.length} roles`, 'Openings', '<button class="btn s" data-go="C09">Create opening ' + I('arr', 18) + '</button>')}
  <div class="row" style="gap:16px;align-items:flex-start"><div class="card" style="flex:1.7;gap:0;padding:8px 22px"><div class="tbl" style="grid-template-columns:2.2fr 1.3fr 1.6fr .9fr 1.3fr 1.2fr">${['Role', 'Team', 'Where', 'Applicants', 'Status', ''].map(h => `<div class="lab" style="border-top:0">${h}</div>`).join('')}
    ${OPENINGS.map(o => `<div><b class="ts">${o.role}</b><div class="lab">${o.dur}</div></div><div>${o.team}</div><div>${o.where}</div><div><b>${o.apps}</b></div><div><span class="badge ${o.k}">${o.st}</span></div><div><b class="ts or" data-go="${o.st === 'Draft' ? 'C09' : 'C02'}" style="cursor:pointer">${o.st === 'Draft' ? 'Edit draft →' : 'Applicants →'}</b></div>`).join('')}</div></div>
   <div class="col" style="flex:1;gap:16px"><div class="card k" style="gap:10px"><span class="lab">Shared with partner campuses</span>${['ITB · 12 students applied', 'UI · 9 students applied', 'UGM · 6 students applied'].map(s => `<div class="row ts" style="gap:10px"><span class="dot"></span>${s}</div>`).join('')}</div>
    <div class="card" style="gap:8px"><b class="h3">Recruiting is free</b><span class="ts mu">You only pay once an intern starts. AI ranks applicants; your HR team decides.</span></div></div></div>`, 'hr'),

C09: () => desk('C03', 0, `${head('Openings · new', 'Create opening', '<button class="btn o s">Save draft</button>')}
  <div class="row" style="gap:16px;align-items:flex-start"><div class="card" style="flex:1.3;gap:14px;background:#fff">
    <div class="row" style="gap:12px"><div class="col grow" style="gap:7px"><span class="lab">Role title</span><div class="field" data-f="role">Marketing Intern</div></div><div class="col" style="gap:7px;width:220px"><span class="lab">Team</span><div class="field" data-f="team">Growth</div></div></div>
    <div class="row" style="gap:12px"><div class="col grow" style="gap:7px"><span class="lab">Location & mode</span><div class="field" data-f="where">Jakarta · Hybrid</div></div><div class="col" style="gap:7px;width:160px"><span class="lab">Duration</span><div class="field" data-f="dur">3 months</div></div><div class="col" style="gap:7px;width:110px"><span class="lab">Seats</span><div class="field" data-f="seats">2</div></div></div>
    <div class="col" style="gap:8px"><span class="lab">Skills</span><div class="row" data-f="skills" style="gap:8px;flex-wrap:wrap">${['Copywriting', 'Social media', 'Basic analytics', 'Canva'].map(s => `<span class="chip on" style="height:36px;font-size:14px">${s}</span>`).join('')}<span class="chip" style="height:36px;font-size:14px">+ Add</span></div></div>
    <div class="row" style="gap:12px;padding:10px 0;border-top:1px solid var(--line)"><div class="col grow"><b class="ts">Share with partner universities</b><span class="ts mu">ITB, UI and UGM career centers see it and can recommend students</span></div>${tog(1)}</div>
    <div class="row" style="gap:12px;padding:10px 0 2px;border-top:1px solid var(--line)"><div class="col grow"><b class="ts">AI ranks applicants</b><span class="ts mu">A suggestion only. HR accepts or rejects.</span></div>${tog(1)}</div>
    <button class="btn" data-act="publish-opening" style="align-self:flex-start">Publish opening ${I('arr')}</button></div>
   <div class="col" style="flex:1;gap:16px"><span class="lab">How students see it</span><div class="card k" style="gap:12px"><div class="row" style="gap:14px"><span class="logo-sq" style="background:var(--sig)">N</span><div class="col grow"><b class="t">Nusantara Digital</b><span class="ts mu">Jakarta · Hybrid · 3 months</span></div><div class="col" style="align-items:flex-end"><span class="h2 or" style="font-size:32px">—%</span><span class="lab">Fit</span></div></div><div class="h3" style="font-size:22px">Marketing Intern</div><span class="ts mu">Each student sees their own fit score</span></div>
    <div class="card" style="gap:8px"><b class="h3">Verified students only</b><span class="ts mu">Every applicant signed up with a campus email and student ID.</span></div></div></div>`, 'hr'),

C10: () => desk('C10', 0, `${head('Cohort Nov 2026 · 6 interns', 'Interns', '<button class="btn o s">Export list</button>')}
  <div class="card" style="gap:0;padding:8px 22px"><div class="tbl" style="grid-template-columns:2fr 1fr 1.5fr 1.4fr 1.6fr 1.3fr 1.5fr">${['Intern', 'Campus', 'Role', 'Mentor', 'Progress', 'Status', ''].map(h => `<div class="lab" style="border-top:0">${h}</div>`).join('')}
   ${[['Alya Putri', 'ITB', 'Product Mgmt', 'Andi Pratama', 100, 'Handover ready', 'sig', 'C06', 'Handover review →'], ['Bima Santoso', 'UI', 'Data Analyst', 'Maya H.', 27, 'On track', 'ok', 'C05', 'Logbooks →'], ['Citra Lestari', 'UGM', 'UI/UX Design', 'Andi Pratama', 22, 'Logbook late', 'wa', 'C05', 'Logbooks →'], ['Dimas Arya', 'BINUS', 'Backend', 'Maya H.', 27, 'On track', 'ok', 'C05', 'Logbooks →'], ['Eka Wulan', 'ITS', 'Marketing', 'Rina Sari', 15, 'Needs help', 'er', 'C05', 'Questions →'], ['Fajar Nugroho', 'UB', 'Product Mgmt', 'Andi Pratama', 5, 'Onboarding', 'ln', 'R01', 'Roadmap →']].map(([n, u, r, m, p, s, k, go, l]) => `<div class="row" style="gap:10px"><span class="av k s">${initials(n)}</span><b class="ts">${n}</b></div><div>${u}</div><div>${r}</div><div>${m}</div><div><div class="bar" style="width:150px"><i style="width:${p}%"></i></div></div><div><span class="badge ${k}">${s}</span></div><div><b class="ts or" data-go="${go}" style="cursor:pointer">${l}</b></div>`).join('')}</div></div>
  <div class="row" style="gap:16px">${[['94%', 'Logbooks on time'], ['4.2 h', 'Average mentor reply'], ['78%', 'Questions answered by AI']].map(([n, l]) => `<div class="card" style="flex:1;padding:16px 18px;gap:8px"><b class="num">${n}</b><span class="lab">${l}</span></div>`).join('')}</div>`),

V05: () => desk('C02', 0, `${head('Alya Putri · Product Management Intern', 'Chat interview transcript', '<button class="btn o s" data-go="V04">Back to profile</button><button class="btn s">Accept ' + I('arr', 18) + '</button>')}
  <div class="row" style="gap:16px;align-items:flex-start"><div class="card" style="flex:1.5;gap:14px">
   ${[['Which app feature would you improve?', 'The schedule in my campus app. I\'d put it on the home screen, then test with 5 friends.', 'Starts from a real problem and plans a test.'], ['Have you talked to users directly?', 'Yes, 8 shop owners about stock. It led to a voice-notes feature.', 'Concrete user research with a result.'], ['What do you want to learn?', 'SQL, so I can check my own research numbers instead of asking someone.', 'Matches the one skill gap in her profile.']].map(([q, a, n], i) => `<div class="col" style="gap:8px;${i ? 'border-top:1px solid var(--line);padding-top:14px' : ''}"><span class="lab">Question ${i + 1}</span><b class="t">${q}</b><div class="ts" style="background:var(--page);border-radius:12px;padding:10px 14px">"${a}"</div><span class="lab row or" style="gap:6px">${I('spark', 12, '#FF4A1C')}AI note · ${n}</span></div>`).join('')}</div>
   <div class="col" style="flex:1;gap:16px"><div class="card o" style="gap:8px"><span class="lab" style="color:#111">AI summary · suggestion</span><span class="t">Strong research habit, clear communication. Plan SQL support in Phase 1.</span></div>
    <div class="card" style="gap:6px">${kv('Answered', '3 of 3')}${kv('Time taken', '11 min')}${kv('Language', 'English')}</div></div></div>`, 'hr'),

V06: () => desk('C02', 0, `${head('Alya Putri · applicant', 'CV_Alya_Putri.pdf', '<button class="btn o s" data-go="V04">Back to profile</button><button class="btn o s">Download</button>')}
  <div class="row" style="gap:16px;align-items:flex-start"><div class="card" style="flex:1.4;background:#fff;gap:12px;padding:30px 34px">
   <b class="h2">Alya Putri</b><span class="ts mu">alya.putri@students.itb.ac.id · Bandung</span><div class="hr"></div>
   <span class="lab">Education</span><span class="t"><b>Bandung Institute of Technology</b> · Information Systems, semester 6 · GPA 3.62</span>
   <span class="lab">Experience</span><span class="t"><b>Research assistant</b>, ITB Business Lab · Interviewed 8 small businesses about stock and sales records.</span><span class="t"><b>UI design, campus projects</b> · Designed 3 apps in Figma, tested each with 5+ students.</span>
   <span class="lab">Skills</span><span class="t">User research · Figma · Notion · Presenting · Basic SQL</span></div>
   <div class="col" style="flex:1;gap:16px"><div class="card k" style="gap:8px"><span class="lab">Verified by Handoff</span>${['Active ITB student · campus email', 'Student ID checked against campus records', 'CV read by AI · skills matched'].map(s => `<div class="row ts" style="gap:10px">${I('check', 16, '#3DDC84', 2.5)}${s}</div>`).join('')}</div></div></div>`, 'hr'),

C11: () => desk('C07', 0, `${head('Billing · plans', 'Choose a plan', '<button class="btn o s" data-go="C07">Back to billing</button>')}
  <div class="row" style="gap:16px;align-items:stretch">${[['Pilot', 'Free', 'First cohort, up to 90 days', ['Recruiting & AI ranking', 'Onboarding roadmaps', 'AI Buddy on your SOPs'], 'Current plan', 1], ['Onboarding', 'Rp — / intern / month', 'Pay only for active interns', ['Everything in Pilot', 'Mentor Copilot', 'Knowledge continuity analytics'], 'Choose Onboarding'], ['Enterprise', 'Custom', 'Many divisions and campuses', ['Everything in Onboarding', 'SSO & audit logs', 'Dedicated support'], 'Talk to sales']].map(([n, p, s, f, b, cur]) => `<div class="card${cur ? ' k' : ''}" style="flex:1;gap:12px;padding:24px"><span class="lab${cur ? ' or' : ''}">${n}</span><b class="h2">${p}</b><span class="ts mu">${s}</span><div class="hr"></div>${f.map(x => `<div class="row ts" style="gap:10px">${I('check', 16, cur ? '#FF4A1C' : '#111', 2.5)}${x}</div>`).join('')}<div class="grow"></div><button class="btn${cur ? ' o' : ' s'}" style="${cur ? 'border-color:#EFECE4;color:#EFECE4;opacity:.6;pointer-events:none' : ''}">${b}</button></div>`).join('')}</div>
  <span class="lab">Illustrative prices · first cohort is always free</span>`, 'adm'),

// ───────── university ─────────
U06: () => desk('U06', 1, `${head(`ITB · ${STUDENTS.length} students in this view · 1,240 registered`, 'Students', '<div class="input" style="width:300px;height:46px;flex:none">' + I('search', 18, '#111') + 'Search name or NIM…</div>')}
  <div class="row" data-filter style="gap:8px">${['All faculties', 'STEI', 'FTI', 'FMIPA', 'SBM', 'FSRD'].map((c, i) => `<span class="chip${i ? '' : ' on'}" style="height:38px;font-size:14px">${c}</span>`).join('')}</div>
  <div class="card" style="gap:0;padding:8px 22px"><div class="tbl" style="grid-template-columns:1.9fr 1.8fr 1.7fr .8fr 2fr .8fr">${['Student', 'Program', 'Internship', 'Logbook', 'Status', ''].map(h => `<div class="lab" style="border-top:0">${h}</div>`).join('')}</div>
   ${STUDENTS.map(s => `<div class="tbl srow" data-tags="${s.fac}" style="grid-template-columns:1.9fr 1.8fr 1.7fr .8fr 2fr .8fr"><div class="row" style="gap:10px"><span class="av k s">${initials(s.n)}</span><div class="col"><b class="ts">${s.n}</b><span class="lab">${s.nim}</span></div></div><div>${s.fac} · ${s.prog}</div><div>${s.co || '—'}${s.partner ? ' <span class="badge ok">Partner</span>' : ''}</div><div>${s.log || '—'}</div><div><span class="badge ${s.k}">${s.st}</span></div><div><b class="ts or" data-go="US${s.nim}" style="cursor:pointer">Open →</b></div></div>`).join('')}</div>`),

U07: () => desk('U07', 1, `${head('ITB · partnerships', 'Companies', '<button class="btn o s" data-act="add-partner">Add partner company</button><button class="btn s" data-go="U05">Post internship ' + I('arr', 18) + '</button>')}
  <div class="row" data-filter style="gap:8px">${['All', 'Active', 'Expiring', 'Pending'].map((c, i) => `<span class="chip${i ? '' : ' on'}" style="height:38px;font-size:14px">${c}</span>`).join('')}</div>
  <div class="card" id="partners" style="gap:0;padding:8px 22px"><div class="tbl" style="grid-template-columns:2fr 1.4fr 1.7fr 1fr 1fr 1.4fr">${['Company', 'Sector', 'Partnership (MoU)', 'Students', 'Open roles', ''].map(h => `<div class="lab" style="border-top:0">${h}</div>`).join('')}</div>
   ${PARTNERS.map(([n, s, m, k, st, r]) => `<div class="tbl srow" data-tags="${k === 'ok' ? 'Active' : k === 'wa' ? 'Expiring' : 'Pending'}" style="grid-template-columns:2fr 1.4fr 1.7fr 1fr 1fr 1.4fr"><div class="row" style="gap:10px"><span class="logo-sq" style="width:32px;height:32px;font-size:14px;background:var(--ink);color:var(--page)">${n[0]}</span><b class="ts">${n}</b></div><div>${s}</div><div><span class="badge ${k}">${m}</span></div><div>${st}</div><div>${r}</div><div><b class="ts or" ${k === 'wa' ? 'data-act="renew"' : 'data-go="U05"'} style="cursor:pointer">${k === 'wa' ? 'Renew MoU →' : 'Post internship →'}</b></div></div>`).join('')}</div>`),

U08: () => desk('U08', 1, `${head('ITB · odd semester 2026/27 · demo data', 'Analytics', '<button class="btn o s">Export report</button>')}
  <div class="row" style="gap:12px">${[['72%', 'Placed in an internship', 'k'], ['81%', 'Average AI fit of placements', ''], ['94%', 'Logbooks on time', ''], ['186', 'Verified records issued', 'o'], ['31%', 'Placed via partner internships', '']].map(([n, l, c]) => `<div class="card ${c}" style="flex:1;padding:16px 18px;gap:10px"><b class="num">${n}</b><span class="lab"${c === 'o' ? ' style="color:#111"' : ''}>${l}</span></div>`).join('')}</div>
  <div class="row" style="gap:16px;align-items:flex-start"><div class="card" style="flex:1.3;gap:12px"><b class="h3">Placement rate by faculty</b>
    ${[['STEI', 84], ['FTI', 76], ['SBM', 71], ['FMIPA', 58], ['FSRD', 63]].map(([f, p]) => `<div class="row" style="gap:12px"><span class="lab" style="width:60px">${f}</span><div class="grow" style="height:24px;border-radius:6px;background:var(--line);overflow:hidden"><i style="display:flex;align-items:center;padding-left:8px;height:100%;width:${p}%;background:${p > 80 ? 'var(--sig)' : 'var(--ink)'};color:#fff;font:600 12px Geist">${p}%</i></div></div>`).join('')}</div>
   <div class="card" style="flex:1;gap:10px"><b class="h3">Logbooks on time · weekly</b><div class="row" style="align-items:flex-end;gap:10px;height:170px">${[82, 88, 85, 91, 93, 90, 94, 96].map((v, i) => `<div class="col grow" style="align-items:center;gap:6px"><span class="lab">${v}</span><span style="width:100%;height:${(v - 70) * 5}px;border-radius:6px;background:${i === 7 ? 'var(--sig)' : 'var(--ink)'}"></span><span class="lab">W${i + 1}</span></div>`).join('')}</div></div>
   <div class="card" style="flex:.9;gap:6px"><b class="h3">Skills verified most</b>${[['User research', '64'], ['SQL', '58'], ['Figma', '41'], ['Presenting', '39'], ['Python', '33']].map(([a, b]) => kv(a, b + ' students')).join('')}</div></div>`),

U09: () => desk('U09', 1, `${head('Bandung Institute of Technology', 'Settings', '<button class="btn s">Save changes ' + I('arr', 18) + '</button>')}
  <div class="row" style="gap:16px;align-items:flex-start"><div class="col" style="flex:1;gap:16px"><div class="card" style="gap:12px"><b class="h3">Campus sign-up</b>${field('Student email domain', '@students.itb.ac.id')}${field('Staff email domain', '@itb.ac.id')}
     <div class="row" style="gap:12px;padding-top:6px"><div class="col grow"><b class="ts">Check student ID against campus records</b><span class="ts mu">Syncs with the academic system every night</span></div>${tog(1)}</div></div>
    <div class="card" style="gap:0"><b class="h3" style="padding-bottom:10px">Credit conversion (MBKM)</b>${[['Convert internships to SKS automatically', 1], ['Minimum 90 days for 20 SKS', 1], ['Lecturer must sign the final logbook', 0], ['Partner internships only', 0]].map(([a, on]) => `<div class="row" style="padding:12px 0;border-top:1px solid var(--line);gap:12px"><b class="ts grow">${a}</b>${tog(on)}</div>`).join('')}</div></div>
   <div class="card" style="flex:1;gap:0"><div class="row sbw" style="padding-bottom:10px"><b class="h3">Career center team</b><button class="btn o s" data-act="invite-admin">Invite admin</button></div><div id="admins">
    ${[['Dewi Sartika', 'Admin · all faculties'], ['Rahmat Hidayat', 'Lecturer · STEI'], ['Sari Wulandari', 'Staff · FTI & SBM']].map(([n, r]) => `<div class="row" style="padding:12px 0;border-top:1px solid var(--line);gap:12px"><span class="av k s">${initials(n)}</span><div class="col grow"><b class="ts">${n}</b><span class="ts mu">${r}</span></div></div>`).join('')}</div></div></div>`),
});

// a profile page for every student in the directory
const studentPage = s => desk('U06', 1, `${head(`${s.nim} · ${s.fac} · ${s.prog}`, s.n, `<button class="btn o s" data-act="message">Message student</button>${s.k === 'sig' ? '<button class="btn s" data-go="U04">Verify record ' + I('arr', 18) + '</button>' : s.k === 'wa' || s.k === 'er' ? '<button class="btn s">Send reminder ' + I('arr', 18) + '</button>' : ''}`)}
  <div class="row" style="gap:16px;align-items:flex-start"><div class="card${s.co ? ' k' : ''}" style="flex:1.3;gap:12px">${s.co ? `<span class="lab">Internship${s.partner ? ' · via ITB partnership' : ''}</span><b class="h2" style="font-size:28px">${s.role}</b><span class="t">${s.co} · mentor ${s.mentor}</span>
    <div class="row" style="gap:12px"><div class="bar grow" style="background:#3A3A3A"><i style="width:${Math.round(s.day / 90 * 100)}%"></i></div><span class="lab">Day ${s.day} of 90</span></div>` : `<span class="lab">No internship yet</span><b class="h2" style="font-size:28px">Applying</b><span class="t mu">4 applications sent · 2 partner internships match this student</span><button class="btn s" data-go="U05" style="align-self:flex-start">Recommend a partner internship ${I('arr', 18)}</button>`}</div>
   <div class="col" style="flex:1;gap:16px"><div class="card" style="gap:6px"><div class="row sbw"><b class="h3">Status</b><span class="badge ${s.k}">${s.st}</span></div>${kv('Logbook', s.log || '—')}${kv('Mentor verified', s.k === 'wa' && /Mentor/.test(s.st) ? 'Not yet' : s.co ? 'Yes' : '—')}${kv('Credits', s.co ? '20 SKS on completion' : '—')}</div>
    <div class="card" style="gap:8px"><b class="h3">Quick links</b><b class="ts or" data-go="U02" style="cursor:pointer">Monitoring table →</b><b class="ts or" data-go="U03" style="cursor:pointer">Logbook format →</b></div></div></div>`);
STUDENTS.forEach(s => { SCREENS['US' + s.nim] = () => studentPage(s); });
regJobs();

// ───────── demo reports: what each export / download produces (sample data) ─────────
const report = (role, kind, body) => ({ kind: 'doc', role, html: `<div class="rwrap fade"><div class="rbar"><button class="btn o s" data-back>${I('back', 18)} Back</button><span class="lab">Demo report · ${kind} · sample data</span><button class="btn s" data-act="print">${I('file', 18)} Save as PDF</button></div>
  <article class="report">${body}<div class="rfoot"><span>Generated by Handoff · 26 Nov 2026, 09:14</span><span>Demo data · not real students</span></div></article></div>` });
const rhead = (org, title, sub, right = '') => `<div class="rhead"><div class="col" style="gap:6px"><span class="lab">${org}</span><h1>${title}</h1><span class="mu">${sub}</span></div><div class="col" style="align-items:flex-end;gap:6px;text-align:right">${right}<span class="logo" style="font-size:22px">handoff<i>.</i></span></div></div>`;
const rkpis = items => `<div class="rkpis">${items.map(([n, l]) => `<div class="rkpi"><b>${n}</b><span class="lab">${l}</span></div>`).join('')}</div>`;
const rtable = (heads, rows) => `<div class="rscroll"><table class="rtbl"><thead><tr>${heads.map(h => `<th>${h}</th>`).join('')}</tr></thead><tbody>${rows.map(r => `<tr>${r.map(c => `<td>${c}</td>`).join('')}</tr>`).join('')}</tbody></table></div>`;
const rbars = rows => rows.map(([l, p]) => `<div class="row" style="gap:12px;margin:5px 0"><span class="lab" style="width:70px">${l}</span><div class="grow" style="height:16px;border-radius:4px;background:var(--line);overflow:hidden"><i style="display:block;height:100%;width:${p}%;background:${p > 80 ? 'var(--sig)' : 'var(--ink)'}"></i></div><b style="width:42px;text-align:right">${p}%</b></div>`).join('');
const badgeTxt = (k, t) => `<span class="badge ${k}">${t}</span>`;

Object.assign(SCREENS, {
RPT_UNI: () => report('uni', 'semester internship report', `${rhead('Bandung Institute of Technology · Career Center', 'Internship report', 'Odd semester 2026/27 · all faculties · as of 26 Nov 2026', '<span class="lab">Prepared for the Vice Rector for Academic Affairs</span>')}
  <section><h2>Summary</h2>${rkpis([['1,240', 'Registered'], ['312', 'Interning now'], ['72%', 'Placed'], ['94%', 'Logbooks on time'], ['186', 'Verified records'], ['31%', 'Via partner internships']])}
   <p style="margin-top:12px">Placement is up from 61% last semester. Partner internships posted by the career center filled 97 of 312 placements. 9 students need attention, mostly for late logbooks; none has been unreachable for more than a week.</p></section>
  <section><h2>Placement by faculty</h2>${rbars([['STEI', 84], ['FTI', 76], ['SBM', 71], ['FSRD', 63], ['FMIPA', 58]])}</section>
  <section><h2>Students in this report</h2>${rtable(['Student', 'NIM', 'Faculty', 'Company', 'Logbook', 'Status'], STUDENTS.map(s => [`<b>${s.n}</b>`, s.nim, s.fac, (s.co || '—') + (s.partner ? ' · partner' : ''), s.log || '—', badgeTxt(s.k, s.st)]))}</section>
  <section><h2>Needs attention</h2>${rtable(['Student', 'Issue', 'Action taken'], [['Citra Lestari', 'Logbook 2 days late', 'Reminder sent 25 Nov'], ['Gilang Putra', "Mentor hasn't verified", 'Company HR contacted'], ['Hana Safitri', '5 days without activity', 'Call scheduled 27 Nov'], ['Ivan Kurnia', 'Handover not started', 'Reminder sent 24 Nov']])}</section>`),

RPT_PART: () => report('uni', 'partner internships', `${rhead('Bandung Institute of Technology · Career Center', 'Partner internships', 'Internships posted through company partnerships · odd semester 2026/27')}
  <section><h2>Summary</h2>${rkpis([[PARTNERS.length, 'Partner companies'], ['12', 'Active MoUs'], ['97', 'Students placed'], ['55', 'Applicants this month'], ['20 SKS', 'Credit per internship']])}</section>
  <section><h2>Partner companies</h2>${rtable(['Company', 'Sector', 'Partnership (MoU)', 'Students placed', 'Open roles'], PARTNERS.map(([n, s, m, k, st, r]) => [`<b>${n}</b>`, s, badgeTxt(k, m), st, r]))}</section>
  <section><h2>Posted internships</h2>${rtable(['Role', 'Company', 'Status', 'Applicants', 'Seats'], [['Data Analyst Intern', 'Lumbung Data', badgeTxt('ok', 'Live'), 34, 6], ['Operations Analyst Intern', 'Gerbang Logistik', badgeTxt('ok', 'Live'), 21, 3], ['Embedded Systems Intern', 'Sinar Elektrika', badgeTxt('wa', 'Waiting for company'), '—', 2], ['Sustainability Data Intern', 'Hijau Lestari Energi', badgeTxt('ln', 'Draft'), '—', 2]])}</section>
  <section><h2>Renewals due</h2><p>Pasar Pintar's MoU expires in 30 days. 9 ITB students have interned there, with an average mentor rating of 4.6/5.</p></section>`),

RPT_CO: () => report('co', 'cohort report', `${rhead('Nusantara Digital · Product & Technology', 'Cohort report', 'Cohort Nov 2026 · 6 interns · week 4 of 13', '<span class="lab">Prepared by Andi Pratama</span>')}
  <section><h2>Summary</h2>${rkpis([['6', 'Active interns'], ['94%', 'Logbooks on time'], ['4.2 h', 'Mentor reply'], ['78%', 'Answered by AI'], ['46', 'New knowledge cards'], ['72/100', 'Continuity score']])}
   <p style="margin-top:12px">AI Buddy answered 78% of intern questions from company documents, saving mentors about 3.5 hours a week. Questions it couldn't answer went to a mentor and became 9 new knowledge cards.</p></section>
  <section><h2>Interns</h2>${rtable(['Intern', 'Campus', 'Role', 'Mentor', 'Progress', 'Status'], [['Alya Putri', 'ITB', 'Product Mgmt', 'Andi Pratama', '90/90 days', badgeTxt('sig', 'Handover ready')], ['Bima Santoso', 'UI', 'Data Analyst', 'Maya H.', '24/90', badgeTxt('ok', 'On track')], ['Citra Lestari', 'UGM', 'UI/UX Design', 'Andi Pratama', '20/90', badgeTxt('wa', 'Logbook late')], ['Dimas Arya', 'BINUS', 'Backend', 'Maya H.', '24/90', badgeTxt('ok', 'On track')], ['Eka Wulan', 'ITS', 'Marketing', 'Rina Sari', '14/90', badgeTxt('er', 'Needs help')], ['Fajar Nugroho', 'UB', 'Product Mgmt', 'Andi Pratama', '5/90', badgeTxt('ln', 'Onboarding')]])}</section>
  <section><h2>Recruiting funnel</h2>${rbars([['Applied', 100], ['Shortlist', 19], ['Interview', 13], ['Accepted', 6]])}</section>
  <section><h2>Knowledge gaps to close</h2>${rtable(['Topic', 'Asked', 'Suggested owner'], [['Staging deploys', '9 times', 'Rina Sari'], ['Expense claims', '4 times', 'Finance'], ['Release SOP v2', 'Outdated', 'Product Ops']])}</section>`),

RPT_LOG: () => report('app', 'logbook · ITB format', `<div style="text-align:center;display:flex;flex-direction:column;gap:4px"><span class="lab">Bandung Institute of Technology · Faculty of Electrical Engineering and Informatics</span><h1 style="font-size:26px">INTERNSHIP LOGBOOK</h1><span>November 2026</span></div>
  ${rtable(['', ''], [['Student', '<b>Alya Putri</b> · 18221045 · Information Systems'], ['Company', 'Nusantara Digital · Product & Technology'], ['Period', '3 Nov 2026 – 31 Jan 2027 (90 days)'], ['Mentor', 'Andi Pratama · Product Lead'], ['Supervising lecturer', 'Dr. Rahmat Hidayat']]).replace('<thead><tr><th></th><th></th></tr></thead>', '')}
  <section><h2>Daily activities</h2>${rtable(['Date', 'Activity', 'Skill', 'Hours', 'Mentor'], [['3 Nov', 'Company introduction and tool setup.', 'Onboarding', '7.5', badgeTxt('ok', 'Approved')], ['5 Nov', 'Learned the Sales Dashboard and report flow.', 'Internal tools', '8', badgeTxt('ok', 'Approved')], ['12 Nov', '—', '', '', badgeTxt('er', 'Missed')], ['19 Nov', 'Checked October sales data. Found 14 rows without a store code; fixed 12.', 'Data reconciliation', '7.5', badgeTxt('ok', 'Approved after revision')], ['21 Nov', 'Drafted the export feature PRD.', 'Writing PRDs', '8', badgeTxt('ok', 'Approved')], ['24 Nov', 'Learned the Finance approval flow.', 'Process', '7', badgeTxt('ok', 'Approved')], ['25 Nov', 'Interviewed 2 merchants about reports.', 'User research', '7.5', badgeTxt('ok', 'Approved')], ['26 Nov', 'October recap and sales report draft.', 'Data reconciliation', '7.5', badgeTxt('ln', 'Waiting for mentor')]])}</section>
  <section><h2>Month summary</h2><p>17 of 18 workdays filled · 1 revision · 94% on time · 126 hours. Main learning: sales data reconciliation and user interviews.</p></section>
  <div class="rsign"><div><b>Andi Pratama</b><br><span class="mu">Mentor · signed digitally 26 Nov</span></div><div><b>Dr. Rahmat Hidayat</b><br><span class="mu">Supervising lecturer · pending</span></div></div>`),

RPT_REC: () => report('app', 'verified internship record', `<div class="rhead"><div class="col" style="gap:6px"><span class="lab">Verified internship record · HO-2027-ITB-0418</span><h1>Alya Putri</h1><span class="mu">Product Management Intern · Nusantara Digital</span></div><span class="logo" style="font-size:26px">handoff<i>.</i></span></div>
  <p>This certifies that <b>Alya Putri</b> (18221045, Information Systems, Bandung Institute of Technology) completed a 90-day internship at <b>Nusantara Digital</b> from <b>3 November 2026</b> to <b>31 January 2027</b>, verified by the company mentor and the university.</p>
  ${rkpis([['90', 'Days'], ['88', 'Approved logbooks'], ['12', 'Knowledge cards passed on'], ['20 SKS', 'Credits converted']])}
  <section><h2>Verified skills</h2><div class="row" style="gap:8px;flex-wrap:wrap">${['User research', 'Data reconciliation', 'Writing PRDs', 'Presenting'].map(s => `<span class="badge ln" style="padding:8px 12px">${s}</span>`).join('')}</div></section>
  <section><h2>Mentor's assessment</h2><p>"Alya asks early and documents everything. Her handover is now the first thing new interns read." — Andi Pratama, Product Lead</p></section>
  <div class="row" style="gap:20px;align-items:center"><div style="width:110px;height:110px;border:1px solid var(--line);border-radius:8px;padding:8px;display:grid;grid-template-columns:repeat(9,1fr);gap:2px">${Array.from({ length: 81 }, (_, i) => `<i style="background:${[0, 1, 2, 9, 11, 18, 19, 20, 6, 7, 8, 15, 17, 24, 25, 26, 54, 55, 56, 63, 65, 72, 73, 74].includes(i) || (i * 37 % 7 < 3) ? '#111' : 'transparent'}"></i>`).join('')}</div><div class="col" style="gap:4px"><b>Scan to verify</b><span class="mu">handoff.id/verify/HO-2027-ITB-0418</span><span class="mu">Anyone can check this record is real.</span></div></div>
  <div class="rsign"><div><b>Andi Pratama</b><br><span class="mu">Mentor · Nusantara Digital</span></div><div><b>Dewi Sartika</b><br><span class="mu">Career Center · ITB</span></div></div>`),
});
