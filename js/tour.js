// The guided tour for judges: five chapters, every stop says what the feature is and why it matters.
const CHAPTERS = [
  { name: 'Find an internship', who: 'Intern app · phone', blurb: 'Sign up, get AI-ranked matches, apply and get accepted.' },
  { name: 'Learn on the job', who: 'Intern app · phone', blurb: 'Daily home, attendance, roadmap, AI Buddy, mentor escalation and the voice logbook.' },
  { name: 'Hand over & move on', who: 'Intern app · phone', blurb: 'Pass knowledge to the next intern and leave with a verified record.' },
  { name: 'Company dashboard', who: 'Mentors, HR & admins · desktop', blurb: 'Hire, onboard, answer questions, grow the knowledge library and measure it.' },
  { name: 'University dashboard', who: 'Career center · desktop', blurb: 'Post partner internships, monitor every student, set the logbook format and verify records.' },
];
// [screen, highlighted element, chapter, title, what it is, why it matters]
const TOUR = [
  ['S01', 'stages', 0, 'One app, the whole internship', 'Handoff covers the full internship in one place: recruiting, onboarding and handover. Whatever an intern learns is passed on to the next one.', 'Today this takes 3–4 separate tools, and the knowledge disappears when each internship ends.'],
  ['S04', 'verified', 0, 'Verified students only', 'Sign-up needs a campus email with a one-time code, plus a student ID checked against campus records.', 'Companies know every applicant is a real, active student.'],
  ['S05', 'cv', 0, 'AI reads the CV', 'The student uploads a CV once. AI pulls out skills and interests, and the student can fix anything it got wrong.', 'No long forms, and matching works from the first minute.'],
  ['S06', 'match', 0, 'AI-ranked internships', 'Openings are ranked by how well the student fits, with a fit score on every card.', 'Students apply where it counts instead of mass-applying and hoping.'],
  ['S07', 'fit', 0, "Why it's a fit", 'The AI explains the score from the CV and past projects, and shows the skills to learn before day 1.', 'The ranking is explainable, not a black box.'],
  ['S08', 'share', 0, 'The student sends it, not the AI', 'AI prepares a tailored application, but nothing is sent until the student approves. The screen shows exactly what data is shared.', 'Students stay in control, and private data like ID and phone numbers stays private.'],
  ['S09', 'track', 0, 'Every application, tracked', 'Each application shows its stage, from sent to result. A rejection comes with similar roles that are still open.', 'No more applying into silence.'],
  ['S10', 'chatint', 0, 'Chat interview', 'A short first interview by chat, with no time limit. The company gets the transcript.', 'Fairer for students and faster for HR than scheduling calls.'],
  ['S11', 'offer', 0, 'Accepted', 'The offer shows the company, role, mentor and dates. Confirming it starts onboarding.', 'Recruiting flows straight into onboarding, with nothing re-typed.'],

  ['S12', 'day', 1, "The intern's home", 'Day 24 of 90: progress per phase, today’s tasks, attendance and logbook reminders, and the last AI Buddy answer.', 'One screen tells the intern what to do today.'],
  ['A01', 'camera', 1, 'One-tap attendance', 'A selfie plus the office location marks the day present. It goes to the mentor and campus automatically.', 'Replaces separate attendance apps. The photo is proof only and is never used for face recognition.'],
  ['S13', 'phase', 1, 'A 90-day roadmap', 'The mentor sets the path in three phases (Learn, Contribute, Own & Handover), with feedback on each task.', 'Interns always know what’s expected, instead of waiting for instructions.'],
  ['S14', 'answer', 1, 'AI Buddy answers from real knowledge', 'Answers come from company SOPs and from what earlier interns handed over, with the source shown.', 'Mentors stop answering the same questions every cohort.'],
  ['S15', 'noguess', 1, "When AI doesn't know, a mentor does", 'If the answer isn’t in the documents, the AI says so and sends the question to the mentor. The answer then becomes a new knowledge card.', 'No made-up answers, and every gap only has to be filled once.'],
  ['S16', 'log', 1, 'A 1-minute voice logbook', 'The intern talks for a minute, AI drafts the daily log and flags missing parts, like blockers.', 'A daily log takes a minute instead of half an hour.'],
  ['P02', 'aicheck', 1, 'AI checks, the mentor decides', 'Before the mentor reviews a log, AI runs a quick check: the right task, proof attached, sensible hours, similarity to past logs.', 'Copy-pasted logs get noticed, but AI only suggests. The mentor makes the call.'],
  ['S17', 'cal', 1, 'Logbook calendar, in the campus format', 'The month at a glance: approved, sent, revision and missed days. One tap exports it in the university’s own format.', 'Interns never re-type their logbook for campus.'],
  ['H02', 'human', 1, 'Real human support', 'Lag or an error? One tap reaches a real Handoff support person, with the technical details sent automatically.', 'Nobody gets stuck alone with a broken app.'],

  ['S18', 'interview', 2, 'The handover interview', 'Before leaving, the intern answers 6 guided questions. AI combines the answers with 90 days of logs.', 'Unwritten knowledge, like who to ask and what went wrong, finally gets written down.'],
  ['S19', 'secret', 2, 'Safe to pass on', 'AI turns it all into knowledge cards and catches confidential data, like a client account number, before anything is shared.', 'Knowledge is kept without leaking secrets.'],
  ['S20', 'inherit', 2, 'The next intern starts ahead', 'On day 1, the new intern inherits mentor-verified processes, common pitfalls and the right contacts.', 'This is the heart of Handoff: no intern starts from zero.'],
  ['S21', 'record', 2, 'A verified internship record', 'Days, approved logs and skills, verified by the mentor and the campus, with a record ID and QR code to share.', 'Real proof of work for the next job, not just a certificate.'],
  ['J01', 'jobs', 2, 'Job matches from the record', 'After the internship, jobs are ranked by the verified skills. Weak matches are hidden.', 'The journey continues from internship to first job. Planned after the pilot.'],
  ['J03', 'proof', 2, 'Apply with proof of work', 'One tap sends the CV, the verified record and the mentor’s recommendation.', 'HR doesn’t have to guess what the candidate can do.'],

  ['C01', 'kpis', 3, 'The company dashboard', 'Mentors and HR see active interns, new applications, waiting questions and logbooks to review at a glance.', 'Everything a mentor has to act on today, in one place.'],
  ['C02', 'kanban', 3, 'AI-ranked applicants', 'Applicants are ranked by fit, and HR moves them through the stages. AI never accepts or rejects anyone.', 'Faster screening, with a human making every decision.'],
  ['V04', 'skills', 3, 'Applicant detail', 'Skills compared against the role, the chat-interview answers and the team’s notes, side by side.', 'Hiring decisions rest on evidence, all in one view.'],
  ['R01', 'phases', 3, 'Roadmap builder', 'The mentor builds the 90-day program once: phases, tasks, priorities and reference files. Next cohort, they duplicate it.', 'Onboarding is planned, not improvised every cohort.'],
  ['C05', 'draft', 3, 'Mentor Copilot', 'AI drafts answers to waiting questions, sums up the week and suggests feedback. The mentor edits and sends.', 'Saves mentors hours every week.'],
  ['C04', 'approve', 3, 'The Knowledge Center', 'Company SOPs plus cards from intern handovers and questions. AI suggests new cards, and a mentor approves each one first.', 'The company’s knowledge grows with every intern.'],
  ['K01', 'prov', 3, 'Every card has a history', 'Each card shows who wrote it, its source, who can see it, how often it’s used, and every past version.', 'Knowledge stays trustworthy and up to date.'],
  ['C06', 'cards', 3, 'Handover review', 'The mentor reviews the leaving intern’s cards, sees what confidential data was removed, and approves them into the library.', 'Nothing reaches the next intern without a human check.'],
  ['C08', 'score', 3, 'Knowledge continuity score', 'Shows how much knowledge is reused across cohorts, how often AI answers versus escalates, and where the gaps are.', 'Companies can measure the value. The numbers here are labelled demo data.'],
  ['RB01', 'perm', 3, 'Roles & access', 'Admins, HR and mentors each get only the permissions they need. Data never leaves the company.', 'Safe to use with real company data.'],
  ['C07', 'plan', 3, 'Business model', 'Recruiting is free and the first cohort is free. After that, companies pay per active intern for onboarding and handover.', 'Easy to start, and revenue grows with use. The price shown is illustrative.'],

  ['U01', 'risk', 4, 'University overview', 'The career center sees every student’s internship status, and who is at risk: late logbooks, unverified mentors, no activity.', 'Problems are caught early, not at the end of the semester.'],
  ['U05', 'post', 4, 'Partner internships from the campus', 'Universities with company partnerships post internships themselves: pick an MoU partner, set the role, seats, which faculties can apply and whether it counts for credit. It shows up in the intern app, tagged as a campus partner.', 'Partnerships the campus already has become real placements, and students find them next to every other internship.'],
  ['U02', 'table', 4, 'Internship monitoring', 'Filter by faculty, program, company or cohort, and follow each student’s progress, logbook and handover.', 'No more chasing companies by email.'],
  ['U03', 'itb', 4, 'The campus’s own logbook format', 'The university sets logbook sections, frequency and deadlines once. Every intern’s log comes out in that format.', 'One logbook serves both the company and the campus.'],
  ['U04', 'checks', 4, 'Verify and issue', 'The campus checks identity, company, mentor sign-off, logbooks and handover, then issues the verified record.', 'A record employers can trust, with a full audit trail.'],
];
// the quick tour: 12 stops for judges short on time (1-based stop numbers in TOUR)
const QUICK = [1, 4, 10, 13, 14, 15, 20, 21, 25, 30, 36, 40];
const chapterStart = c => TOUR.findIndex(t => t[2] === c) + 1;
