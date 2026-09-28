// ══════════════════════════════════════════════
// CONFIGURATION — edit this file to adapt the dashboard.
// See docs/metrics.md for how each threshold is used.
// ══════════════════════════════════════════════
const CONFIG = {
  // Edits made in the browser are saved in this browser only (localStorage).
  // This is a mock backend: to share data, connect your own database
  // (see "Connecting your own database" in docs/usage.md).
  // Never put API keys, tokens or passwords in this file: it is public.
  storage: {
    localKey: 'pm-dashboard-demo-v1',
    historyLimit: 10,          // previous versions kept on every save
  },

  // Schedule badge (planned end vs. estimated end). Values are % of the
  // baseline timeline (start → planned end).
  schedule: {
    amberPct: 10,              // variance above this → 🟡 At risk
    redPct: 25,                // variance above this → 🔴 Behind
  },

  // Hours burn (spent / estimate). Used in the portfolio, card badges,
  // stage pills, role cards and the role × stage matrix.
  burn: {
    warnPct: 75,               // from this % → amber
    dangerPct: 100,            // above this % → red (over budget)
    stageAlertPct: 95,         // stages at or above this % are listed as alerts in the Hours tab
  },

  // Non-working days (YYYY-MM-DD). Weekends are always non-working.
  // They are skipped in the roadmap and in progress calculations.
  holidays: [],

  // Delivery stages. Keys are used in the data file (roleHours, progress).
  stages: [
    { key: 'analysis',  name: 'Analysis',  short: 'Anl.',  color: '#0D9488' },
    { key: 'build',     name: 'Build',     short: 'Build', color: '#4F46E5' },
    { key: 'test',      name: 'Test',      short: 'Test',  color: '#DB2777' },
    { key: 'hypercare', name: 'Hypercare', short: 'Hyper', color: '#CA8A04' },
  ],

  // Display order of roles in the Hours tab (roles not listed go last).
  roleOrder: ['Project Manager', 'Tech Lead', 'Business Analyst', 'Automation Developer', 'QA Analyst'],

  // Default checklist for the Docs tab when a project has no `docs`.
  defaultDocs: ['Discovery brief', 'Business case approval', 'Estimate', 'Solution design', 'Design sign-off', 'Build delivery', 'Test delivery', 'Go-live sign-off'],

  // Fixed options for the RAID "Owner" field ("Other…" allows free text).
  raidOwners: ['Delivery team', 'Client', 'Both'],
};
