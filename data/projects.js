// ══════════════════════════════════════════════
// DEMO DATA — every company, person and project below is fictional.
// Dates are relative to today (D(n) = today + n calendar days), so the
// demo always looks "live". Replace this file with your own data.
// ══════════════════════════════════════════════
const TODAY = (() => { const t = new Date(); return new Date(t.getFullYear(), t.getMonth(), t.getDate()); })();
const _MON = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
function D(n) { const d = new Date(TODAY.getTime()); d.setDate(d.getDate() + n); return d.getFullYear()+'-'+String(d.getMonth()+1).padStart(2,'0')+'-'+String(d.getDate()).padStart(2,'0'); }
function C(n, text) { const d = new Date(TODAY.getTime()); d.setDate(d.getDate() + n); return { date: d.getDate()+' '+_MON[d.getMonth()], text }; }

// Stage colors come from config.js
const SC = Object.fromEntries(CONFIG.stages.map(s => [s.key, s.color]));
const DEMO_LINKS = [
  { type:'backlog',  name:'Backlog',  url:'https://example.com/backlog' },
  { type:'estimate', name:'Estimate', url:'https://example.com/estimate' },
];

const ACCOUNTS = [
  // ────────────────────────────────────────────
  { id:'quintabel', name:'Quintabel', industry:'Supermarket chain', color:'#0D9488', projects:[
    {
      id:'quintabel-stock-sync', name:'Cross-system stock sync',
      portfolioComment:'Build on track. Sync tested every 15 min in QA.',
      status:'In progress',
      plannedEnd: D(36),
      roadmap: {
        stages: [
          { name:'Analysis',  start:D(-40), end:D(-26), color:SC.analysis,  done:true },
          { name:'Build',     start:D(-25), end:D(10),  color:SC.build,     current:true },
          { name:'Test',      start:D(11),  end:D(24),  color:SC.test },
          { name:'Hypercare', start:D(25),  end:D(38),  color:SC.hypercare },
        ],
        milestones: [{ date:D(24), label:'UAT sign-off' }]
      },
      progress: { analysis:100, build:60, test:0, hypercare:0 },
      roleHours: [
        { role:'Project Manager',      analysis:{est:8,spent:9},  build:{est:16,spent:11},  test:{est:6,spent:0},  hypercare:{est:4,spent:0},  members:[{name:'Valeria Quintana',hours:20}] },
        { role:'Business Analyst',     analysis:{est:40,spent:38},build:{est:16,spent:10},  test:{est:12,spent:0}, hypercare:{est:4,spent:0},  members:[{name:'Rocío Benavente',hours:48}] },
        { role:'Automation Developer', analysis:{est:6,spent:5},  build:{est:160,spent:104},test:{est:30,spent:0}, hypercare:{est:16,spent:0}, members:[{name:'Tomás Arrieta',hours:71},{name:'Bruno Keller',hours:38}] },
        { role:'Tech Lead',            analysis:{est:6,spent:6},  build:{est:24,spent:17},  test:{est:6,spent:0},  hypercare:{est:4,spent:0},  members:[{name:'Priya Raman',hours:23}] },
        { role:'QA Analyst',           analysis:{est:0,spent:0},  build:{est:4,spent:2},    test:{est:30,spent:0}, hypercare:{est:6,spent:0},  members:[{name:'Noelia Ortega',hours:2}] },
      ],
      runs: null,
      comments: [
        C(-2,  'Stock deltas between the warehouse system and the online store now sync every 15 minutes in the test environment.'),
        C(-9,  'Agreed with the client to leave consignment items out of the first release.'),
        C(-24, 'Analysis signed off. Build started.'),
      ],
      links: DEMO_LINKS,
      docs: [
        {label:'Discovery brief',done:true},{label:'Business case approval',done:true},{label:'Estimate',done:true},
        {label:'Solution design',done:true},{label:'Design sign-off',done:false},{label:'Build delivery',done:false},
        {label:'Test delivery',done:false},{label:'Go-live sign-off',done:false}
      ],
      raid: { nextSeq:4, items:[
        { id:'R-001', title:'Confirm API rate limits with the warehouse system vendor', type:'Action', status:'In progress', owner:'Delivery team', due:D(3) },
        { id:'R-002', title:'Peak-season code freeze may delay the UAT slot', type:'Risk', status:'Open', owner:'Client', due:D(12) },
        { id:'R-003', title:'Consignment items are out of scope for v1', type:'Decision', status:'Closed', owner:'Both', due:null },
      ]}
    },
    {
      id:'quintabel-supplier-invoicing', name:'Supplier invoicing',
      portfolioComment:'UAT round 2 this week. Duplicated supplier tax IDs still open on the client side.',
      status:'Testing',
      plannedEnd: D(8),
      plannedEndHistory: [{ date:D(-30), previous:D(2), next:D(8), reason:'Credit-note matching approved as a change request' }],
      roadmap: {
        stages: [
          { name:'Analysis',  start:D(-70), end:D(-55), color:SC.analysis,  done:true },
          { name:'Build',     start:D(-54), end:D(-12), color:SC.build,     done:true },
          { name:'Test',      start:D(-11), end:D(9),   color:SC.test,      current:true, gaps:[{ start:D(-6), days:2, reason:'Test environment unavailable' }] },
          { name:'Hypercare', start:D(10),  end:D(22),  color:SC.hypercare },
        ],
        milestones: [{ date:D(9), label:'Go-live' }]
      },
      progress: { analysis:100, build:100, test:55, hypercare:0 },
      roleHours: [
        { role:'Project Manager',      analysis:{est:8,spent:8},   build:{est:20,spent:22},  test:{est:8,spent:5},   hypercare:{est:4,spent:0},  members:[{name:'Valeria Quintana',hours:35}] },
        { role:'Business Analyst',     analysis:{est:36,spent:44}, build:{est:20,spent:26},  test:{est:10,spent:9},  hypercare:{est:4,spent:0},  members:[{name:'Lucía Ferraro',hours:79}] },
        { role:'Automation Developer', analysis:{est:4,spent:4},   build:{est:150,spent:158},test:{est:24,spent:12}, hypercare:{est:12,spent:0}, members:[{name:'Hernán Salvatierra',hours:174}] },
        { role:'Tech Lead',            analysis:{est:4,spent:4},   build:{est:20,spent:19},  test:{est:6,spent:3},   hypercare:{est:2,spent:0},  members:[{name:'Priya Raman',hours:26}] },
        { role:'QA Analyst',           analysis:{est:0,spent:0},   build:{est:6,spent:6},    test:{est:36,spent:20}, hypercare:{est:4,spent:0},  members:[{name:'Noelia Ortega',hours:26}] },
      ],
      runs: null,
      comments: [
        C(-1,  'UAT round 1 closed with 4 minor defects, all fixed.'),
        C(-6,  'Two testing days lost: the client test environment was down.'),
        C(-30, 'Planned end moved after the credit-note change request was approved.'),
      ],
      links: DEMO_LINKS,
      docs: [
        {label:'Discovery brief',done:true},{label:'Business case approval',done:true},{label:'Estimate',done:true},
        {label:'Solution design',done:true},{label:'Design sign-off',done:true},{label:'Build delivery',done:true},
        {label:'Test delivery',done:false},{label:'Go-live sign-off',done:false}
      ],
      raid: { nextSeq:4, items:[
        { id:'R-001', title:'Add credit-note matching to scope', type:'Change', status:'Closed', owner:'Client', due:null, impact:5 },
        { id:'R-002', title:'Supplier master data has duplicated tax IDs', type:'Risk', status:'Open', owner:'Client', due:D(-2) },
        { id:'R-003', title:'Run UAT round 2 with accounts payable', type:'Action', status:'In progress', owner:'Delivery team', due:D(4) },
      ]}
    },
    {
      id:'quintabel-returns', name:'Returns reconciliation', completed:true,
      status:'Completed',
      plannedEnd: D(-38),
      roadmap: {
        stages: [
          { name:'Analysis',  start:D(-130), end:D(-116), color:SC.analysis,  done:true },
          { name:'Build',     start:D(-115), end:D(-70),  color:SC.build,     done:true },
          { name:'Test',      start:D(-69),  end:D(-50),  color:SC.test,      done:true },
          { name:'Hypercare', start:D(-49),  end:D(-35),  color:SC.hypercare, done:true },
        ]
      },
      progress: { analysis:100, build:100, test:100, hypercare:100 },
      roleHours: [
        { role:'Project Manager',      analysis:{est:6,spent:6},   build:{est:14,spent:15},  test:{est:6,spent:6},   hypercare:{est:4,spent:4},  members:[{name:'Valeria Quintana',hours:31}] },
        { role:'Business Analyst',     analysis:{est:30,spent:28}, build:{est:12,spent:12},  test:{est:10,spent:11}, hypercare:{est:4,spent:3},  members:[{name:'Rocío Benavente',hours:54}] },
        { role:'Automation Developer', analysis:{est:4,spent:4},   build:{est:120,spent:116},test:{est:20,spent:22}, hypercare:{est:16,spent:14}, members:[{name:'Tomás Arrieta',hours:156}] },
        { role:'QA Analyst',           analysis:{est:0,spent:0},   build:{est:4,spent:4},    test:{est:28,spent:26}, hypercare:{est:4,spent:4},  members:[{name:'Omar Haddad',hours:34}] },
      ],
      runs: { status:'In production', frequency:'Daily', days:'Monday to Saturday', time:'06:30', notes:'Processes the previous day returns from stores and the online store. Exceptions go to the finance inbox.' },
      comments: [
        C(-35, 'Hypercare closed. Handed over to the support team.'),
        C(-50, 'Go-live completed without incidents.'),
      ],
      links: DEMO_LINKS,
      docs: [
        {label:'Discovery brief',done:true},{label:'Business case approval',done:true},{label:'Estimate',done:true},
        {label:'Solution design',done:true},{label:'Design sign-off',done:true},{label:'Build delivery',done:true},
        {label:'Test delivery',done:true},{label:'Go-live sign-off',done:true}
      ],
      raid: { nextSeq:2, items:[
        { id:'R-001', title:'Store returns without a receipt are handled manually', type:'Decision', status:'Closed', owner:'Both', due:null },
      ]}
    },
  ]},
  // ────────────────────────────────────────────
  { id:'transmirel', name:'Transmirel', industry:'Logistics operator', color:'#4F46E5', projects:[
    {
      id:'transmirel-shipment-tracking', name:'Shipment tracking',
      portfolioComment:'Waiting for carrier API credentials. Escalated to the client sponsor.',
      status:'In progress',
      plannedEnd: D(15),
      roadmap: {
        stages: [
          { name:'Analysis',  start:D(-60), end:D(-45), color:SC.analysis,  done:true },
          { name:'Build',     start:D(-44), end:D(15),  color:SC.build,     current:true, gaps:[{ start:D(-10), days:4, reason:'Carrier API credentials pending' }] },
          { name:'Test',      start:D(16),  end:D(28),  color:SC.test },
          { name:'Hypercare', start:D(29),  end:D(40),  color:SC.hypercare },
        ]
      },
      progress: { analysis:100, build:45, test:0, hypercare:0 },
      roleHours: [
        { role:'Project Manager',      analysis:{est:8,spent:9},   build:{est:18,spent:16},  test:{est:6,spent:0},  hypercare:{est:4,spent:0},  members:[{name:'Diego Achával',hours:25}] },
        { role:'Business Analyst',     analysis:{est:36,spent:40}, build:{est:14,spent:12},  test:{est:10,spent:0}, hypercare:{est:4,spent:0},  members:[{name:'Martina Olsen',hours:52}] },
        { role:'Automation Developer', analysis:{est:4,spent:6},   build:{est:140,spent:240},test:{est:24,spent:0}, hypercare:{est:12,spent:0}, members:[{name:'Hernán Salvatierra',hours:160},{name:'Bruno Keller',hours:86}] },
        { role:'Tech Lead',            analysis:{est:4,spent:4},   build:{est:20,spent:24},  test:{est:4,spent:0},  hypercare:{est:2,spent:0},  members:[{name:'Paula Zárate',hours:28}] },
        { role:'QA Analyst',           analysis:{est:0,spent:0},   build:{est:4,spent:3},    test:{est:30,spent:0}, hypercare:{est:6,spent:0},  members:[{name:'Irene Castañeda',hours:3}] },
      ],
      runs: null,
      comments: [
        C(-1,  'Still waiting for API credentials from two carriers. Escalated to the client sponsor.'),
        C(-10, 'Build paused on carrier integrations. Working on the email-PDF parser meanwhile.'),
        C(-44, 'Kick-off of the build stage.'),
      ],
      links: DEMO_LINKS,
      raid: { nextSeq:4, items:[
        { id:'R-001', title:'Carrier API credentials not delivered yet', type:'Issue', status:'Open', owner:'Client', due:D(-5) },
        { id:'R-002', title:'Two carriers only share tracking through PDF emails', type:'Risk', status:'Open', owner:'Delivery team', due:D(7) },
        { id:'R-003', title:'Escalate credentials to the client IT sponsor', type:'Action', status:'In progress', owner:'Diego Achával', due:D(1) },
      ]}
    },
    {
      id:'transmirel-freight', name:'Freight settlement',
      portfolioComment:'Kick-off done. Planned end to be set after analysis.',
      status:'Kick-off',
      roadmap: {
        stages: [
          { name:'Analysis',  start:D(-5), end:D(10), color:SC.analysis, current:true },
          { name:'Build',     start:D(11), end:D(45), color:SC.build },
          { name:'Test',      start:D(46), end:D(58), color:SC.test },
          { name:'Hypercare', start:D(59), end:D(70), color:SC.hypercare },
        ]
      },
      progress: { analysis:20, build:0, test:0, hypercare:0 },
      roleHours: [
        { role:'Project Manager',      analysis:{est:6,spent:2},  build:{est:14,spent:0},  test:{est:6,spent:0},  hypercare:{est:4,spent:0},  members:[{name:'Diego Achával',hours:2}] },
        { role:'Business Analyst',     analysis:{est:32,spent:9}, build:{est:10,spent:0},  test:{est:8,spent:0},  hypercare:{est:2,spent:0},  members:[{name:'Martina Olsen',hours:9}] },
        { role:'Automation Developer', analysis:{est:4,spent:0},  build:{est:110,spent:0}, test:{est:20,spent:0}, hypercare:{est:10,spent:0}, members:[] },
      ],
      runs: null,
      comments: [
        C(-5, 'Kick-off meeting held. The planned end will be set after the analysis stage.'),
      ],
      links: DEMO_LINKS,
      raid: { nextSeq:2, items:[
        { id:'R-001', title:'Collect three months of freight invoices as samples', type:'Action', status:'Open', owner:'Client', due:D(4) },
      ]}
    },
  ]},
  // ────────────────────────────────────────────
  { id:'pampaluz', name:'Pampaluz', industry:'E-commerce', color:'#DB2777', projects:[
    {
      id:'pampaluz-claims', name:'Customer claims handling',
      portfolioComment:'Second change request approved (+6 d). Confirm new end date with the client.',
      status:'In progress',
      plannedEnd: D(20),
      roadmap: {
        stages: [
          { name:'Analysis',  start:D(-50), end:D(-38), color:SC.analysis,  done:true },
          { name:'Build',     start:D(-37), end:D(5),   color:SC.build,     current:true },
          { name:'Test',      start:D(6),   end:D(18),  color:SC.test },
          { name:'Hypercare', start:D(19),  end:D(30),  color:SC.hypercare },
        ]
      },
      progress: { analysis:100, build:80, test:0, hypercare:0 },
      roleHours: [
        { role:'Project Manager',      analysis:{est:6,spent:6},   build:{est:16,spent:15},  test:{est:6,spent:0},  hypercare:{est:4,spent:0},  members:[{name:'Renata Iglesias',hours:21}] },
        { role:'Business Analyst',     analysis:{est:34,spent:33}, build:{est:14,spent:15},  test:{est:8,spent:0},  hypercare:{est:4,spent:0},  members:[{name:'Lucía Ferraro',hours:48}] },
        { role:'Automation Developer', analysis:{est:4,spent:4},   build:{est:130,spent:118},test:{est:20,spent:0}, hypercare:{est:10,spent:0}, members:[{name:'Tomás Arrieta',hours:80},{name:'Bruno Keller',hours:42}] },
        { role:'Tech Lead',            analysis:{est:4,spent:4},   build:{est:16,spent:14},  test:{est:4,spent:0},  hypercare:{est:2,spent:0},  members:[{name:'Paula Zárate',hours:18}] },
        { role:'QA Analyst',           analysis:{est:0,spent:0},   build:{est:0,spent:8},    test:{est:0,spent:0},  hypercare:{est:0,spent:0},  members:[{name:'Omar Haddad',hours:8}] },
      ],
      runs: null,
      comments: [
        C(-3,  'Second change request approved: auto-reply templates in Portuguese.'),
        C(-15, 'QA joined early to review claim categories. Hours were not in the estimate.'),
        C(-37, 'Build started with marketplace claims added to scope.'),
      ],
      links: DEMO_LINKS,
      raid: { nextSeq:4, items:[
        { id:'R-001', title:'Include marketplace claims, not only the web store', type:'Change', status:'Closed', owner:'Client', due:null, impact:4 },
        { id:'R-002', title:'Auto-reply templates in Portuguese', type:'Change', status:'In progress', owner:'Client', due:D(6), impact:6 },
        { id:'R-003', title:'Refunds above USD 200 stay manual', type:'Decision', status:'Closed', owner:'Both', due:null },
      ]}
    },
    {
      id:'pampaluz-payments', name:'Marketplace payments reconciliation',
      status:'In progress',
      plannedEnd: D(38),
      roadmap: {
        stages: [
          { name:'Analysis',  start:D(-30), end:D(-18), color:SC.analysis,  done:true },
          { name:'Build',     start:D(-17), end:D(14),  color:SC.build,     current:true },
          { name:'Test',      start:D(15),  end:D(25),  color:SC.test },
          { name:'Hypercare', start:D(26),  end:D(35),  color:SC.hypercare },
        ]
      },
      progress: { analysis:100, build:50, test:0, hypercare:0 },
      roleHours: [
        { role:'Project Manager',      analysis:{est:6,spent:6},   build:{est:14,spent:7},  test:{est:6,spent:0},  hypercare:{est:4,spent:0},  members:[{name:'Renata Iglesias',hours:13}] },
        { role:'Business Analyst',     analysis:{est:28,spent:26}, build:{est:10,spent:5},  test:{est:8,spent:0},  hypercare:{est:2,spent:0},  members:[{name:'Rocío Benavente',hours:31}] },
        { role:'Automation Developer', analysis:{est:4,spent:3},   build:{est:120,spent:58},test:{est:20,spent:0}, hypercare:{est:10,spent:0}, members:[{name:'Hernán Salvatierra',hours:61}] },
        { role:'Tech Lead',            analysis:{est:4,spent:4},   build:{est:14,spent:6},  test:{est:4,spent:0},  hypercare:{est:2,spent:0},  members:[{name:'Priya Raman',hours:10}] },
      ],
      runs: null,
      comments: [
        C(-4,  'Settlement report parser finished for the two largest marketplaces.'),
        C(-17, 'Analysis signed off one day early.'),
      ],
      links: DEMO_LINKS,
      raid: { nextSeq:3, items:[
        { id:'R-001', title:'Get sandbox access to marketplace settlement reports', type:'Action', status:'Closed', owner:'Client', due:D(-20) },
        { id:'R-002', title:'Currency rounding differences on cross-border sales', type:'Risk', status:'Open', owner:'Delivery team', due:D(9) },
      ]}
    },
  ]},
  // ────────────────────────────────────────────
  { id:'circuito', name:'Circuito Sur', industry:'Electronics distributor', color:'#CA8A04', projects:[
    {
      id:'circuito-catalog', name:'Product catalog onboarding',
      status:'In progress',
      plannedEnd: D(52),
      roadmap: {
        stages: [
          { name:'Analysis',  start:D(-15), end:D(2),  color:SC.analysis, current:true },
          { name:'Build',     start:D(3),   end:D(30), color:SC.build },
          { name:'Test',      start:D(31),  end:D(40), color:SC.test },
          { name:'Hypercare', start:D(41),  end:D(50), color:SC.hypercare },
        ]
      },
      progress: { analysis:80, build:0, test:0, hypercare:0 },
      roleHours: [
        { role:'Project Manager',      analysis:{est:6,spent:5},   build:{est:14,spent:0},  test:{est:6,spent:0},  hypercare:{est:4,spent:0},  members:[{name:'Diego Achával',hours:5}] },
        { role:'Business Analyst',     analysis:{est:36,spent:30}, build:{est:12,spent:0},  test:{est:8,spent:0},  hypercare:{est:4,spent:0},  members:[{name:'Martina Olsen',hours:30}] },
        { role:'Automation Developer', analysis:{est:4,spent:2},   build:{est:120,spent:0}, test:{est:20,spent:0}, hypercare:{est:10,spent:0}, members:[{name:'Bruno Keller',hours:2}] },
        { role:'QA Analyst',           analysis:{est:0,spent:0},   build:{est:4,spent:0},   test:{est:24,spent:0}, hypercare:{est:4,spent:0},  members:[] },
      ],
      runs: null,
      comments: [
        C(-2,  'Attribute mapping validated for 3 of 5 product families.'),
        C(-15, 'Kick-off with the catalog team.'),
      ],
      links: DEMO_LINKS,
      raid: { nextSeq:3, items:[
        { id:'R-001', title:'Map manufacturer spec sheets to catalog attributes', type:'Action', status:'In progress', owner:'Delivery team', due:D(2) },
        { id:'R-002', title:'Image usage rights unclear for two brands', type:'Risk', status:'Open', owner:'Client', due:D(10) },
      ]}
    },
    {
      id:'circuito-warranty', name:'Manufacturer warranty claims',
      portfolioComment:'Blocked by manufacturer portal access. Needs a decision on a manual workaround.',
      status:'In progress',
      plannedEnd: D(25),
      roadmap: {
        stages: [
          { name:'Analysis',  start:D(-45), end:D(-32), color:SC.analysis,  done:true },
          { name:'Build',     start:D(-31), end:D(8),   color:SC.build,     blocked:true, gaps:[{ start:D(-8), days:5, reason:'Waiting for manufacturer portal access' }] },
          { name:'Test',      start:D(9),   end:D(20),  color:SC.test },
          { name:'Hypercare', start:D(21),  end:D(30),  color:SC.hypercare },
        ]
      },
      progress: { analysis:100, build:40, test:0, hypercare:0 },
      roleHours: [
        { role:'Project Manager',      analysis:{est:6,spent:6},   build:{est:14,spent:12}, test:{est:6,spent:0},  hypercare:{est:4,spent:0},  members:[{name:'Valeria Quintana',hours:18}] },
        { role:'Business Analyst',     analysis:{est:30,spent:31}, build:{est:10,spent:9},  test:{est:8,spent:0},  hypercare:{est:2,spent:0},  members:[{name:'Lucía Ferraro',hours:40}] },
        { role:'Automation Developer', analysis:{est:4,spent:4},   build:{est:110,spent:78},test:{est:20,spent:0}, hypercare:{est:10,spent:0}, members:[{name:'Tomás Arrieta',hours:82}] },
        { role:'Tech Lead',            analysis:{est:4,spent:4},   build:{est:14,spent:10}, test:{est:4,spent:0},  hypercare:{est:2,spent:0},  members:[{name:'Paula Zárate',hours:14}] },
      ],
      runs: null,
      comments: [
        C(-3, 'Still no access to the manufacturer portal. The build is on hold for the portal steps.'),
        C(-8, 'Portal access request sent to the manufacturer through the client.'),
      ],
      links: DEMO_LINKS,
      raid: { nextSeq:4, items:[
        { id:'R-001', title:'Obtain manufacturer portal access', type:'Action', status:'Blocked', owner:'Client', due:D(-3) },
        { id:'R-002', title:'Manufacturer may change the claim form layout', type:'Risk', status:'Open', owner:'Delivery team', due:D(15) },
        { id:'R-003', title:'Approve a manual workaround while portal access is pending', type:'Decision', status:'Open', owner:'Client', due:D(2) },
      ]}
    },
  ]},
];

const ALL_PROJECTS = ACCOUNTS.flatMap(a => a.projects.map(p => { p.account = a.name; p.accountId = a.id; return p; }));
