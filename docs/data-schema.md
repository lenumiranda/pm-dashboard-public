# Data schema

All data lives in `data/projects.js`, a plain JavaScript file loaded by `index.html`. Replace the demo content with yours and keep the structure.

## Date helpers

The demo uses two helpers so that dates stay relative to today:

- `D(n)` returns the ISO date (`YYYY-MM-DD`) for today + `n` calendar days.
- `C(n, text)` returns a comment dated today + `n`.

For real projects, write plain dates instead: `start: '2026-10-05'`.

## Accounts

```js
const ACCOUNTS = [
  {
    id: 'acme',                 // unique, used in element ids (letters, numbers, dashes)
    name: 'Acme Stores',        // shown in the sidebar and the board title
    industry: 'Retail',         // subtitle
    color: '#0D9488',           // sidebar dot
    projects: [ /* see below */ ]
  },
];
```

Each account gets a sidebar entry and a board. Nothing else needs to be registered.

## Project

| Field | Type | Required | Notes |
|---|---|---|---|
| `id` | string | yes | Unique across all accounts. Saved edits are stored under this id. |
| `name` | string | yes | |
| `status` | string | yes | Free text, for example "In progress". Shown on the card and used by the status filter. |
| `portfolioComment` | string | no | Weekly note shown in the Portfolio table. Editable from the UI. |
| `completed` | boolean | no | `true` moves the card to "Completed projects" and sets the badge to Closed. |
| `plannedEnd` | ISO date | no | Baseline end date. Without it the badge shows "No planned end". |
| `plannedEndHistory` | array | no | `{ date, previous, next, reason }`. Written automatically by the roadmap editor. |
| `roadmap` | object | yes | See below. Use `{ stages: [] }` if you don't have one yet. |
| `progress` | object | no | Manual % per stage key, for example `{ analysis: 100, build: 40, test: 0, hypercare: 0 }`. |
| `roleHours` | array | yes | See below. Estimate and spent totals are calculated from it. |
| `runs` | object or null | no | `{ status, frequency, days, time, notes }` for production runs. |
| `comments` | array | no | `{ date, text }`, newest first. |
| `links` | array | no | `{ type, name, url }`. `type` is `backlog` or `estimate`. |
| `docs` | array | no | `{ label, done }`. Without it, `CONFIG.defaultDocs` is used. |
| `raid` | object | no | See below. |

### `roadmap`

```js
roadmap: {
  stages: [
    {
      name: 'Build',            // must match a name in CONFIG.stages to link it to hours
      start: '2026-10-05',
      end: '2026-11-13',        // or days: 25 (working days) instead of end
      color: '#4F46E5',
      done: false,              // flags (use at most one): done, current, blocked
      current: true,
      gaps: [                   // blockers: lost working days
        { start: '2026-10-20', days: 3, reason: 'Test environment down' }
      ]
    }
  ],
  milestones: [ { date: '2026-11-13', label: 'Go-live' } ],
  closeDate: '2026-11-27'       // optional. Defaults to the end of the last stage.
}
```

### `roleHours`

One entry per role. Each stage key from `CONFIG.stages` holds the estimated and spent hours for that role:

```js
roleHours: [
  {
    role: 'Automation Developer',
    analysis:  { est: 6,   spent: 5 },
    build:     { est: 160, spent: 104 },
    test:      { est: 30,  spent: 0 },
    hypercare: { est: 16,  spent: 0 },
    members: [ { name: 'Person A', hours: 71 }, { name: 'Person B', hours: 38 } ]
  }
]
```

The dashboard calculates:

- the role total (sum of its stages)
- the stage total (sum across roles)
- the project `estimate` and `spent` (sum of everything)

The `members` hours are shown as entered and are not checked against the role total, so keep them consistent.

### `raid`

```js
raid: {
  nextSeq: 3,                   // next number used for new ids (R-003)
  items: [
    {
      id: 'R-001',
      title: 'Confirm API limits with the vendor',
      type: 'Action',           // Action | Risk | Issue | Decision | Change
      status: 'Open',           // Open | In progress | Blocked | Closed
      owner: 'Delivery team',   // any text. CONFIG.raidOwners lists the quick options.
      due: '2026-10-10',        // or null
      impact: 5                 // optional, only for Change: days of schedule impact
    }
  ]
}
```

## Stages and other settings

Stage keys, names and colors are defined once in `config.js` (`CONFIG.stages`). If you rename a stage, use the same `name` in your roadmaps and the same `key` in `roleHours` and `progress`.

## After you change the data

- **Hours, roles, names and statuses** update on the next reload.
- **Fields saved from the UI** (`comments`, `roadmap`, `progress`, `docs`, `raid`, `links`, `plannedEnd`, `plannedEndHistory`, `portfolioComment`): once a field has been edited in the browser, the saved value wins over the data file. To see the file values again, clear the saved data (see [usage.md](usage.md#storage)).

## Keep the data file free of sensitive content

`data/projects.js` is downloaded by every visitor. Put only information that can be public: no real client names, people, internal URLs, hours or comments unless the page is hosted privately (see [SECURITY.md](../SECURITY.md)). Link URLs must start with `http://` or `https://`; anything else is replaced with `#`. Account and project ids may only contain letters, numbers, `-` and `_`.
