# Usage guide

## Navigation

- **Portfolio** (sidebar, top) is the weekly status view: four PMO cards and a table of active projects. Completed projects, and projects with every stage done, are left out. Click a row to jump to that project's card. **📷 Export PNG** downloads the table with today's date in the title.
- **Accounts** (sidebar) opens one board per account. Active projects are listed first; completed projects (`completed: true`) appear under "Completed projects".
- Use the **Status** chips at the top of a board to filter its cards.
- The arrow next to the title collapses the sidebar. On narrow screens it is collapsed by default.

## Project card

| Area | What it shows |
|---|---|
| Header | Project name, account and status, plus badges: roles over budget, roadmap % elapsed, hours burn % and the schedule badge. |
| Roadmap tab | Gantt chart, progress table, schedule metrics and the RAID log. |
| Hours tab | Total burn, stage pills, role cards (click one to see its stage breakdown and team), and the role × stage matrix. |
| Runs tab | Production schedule (status, frequency, days, run time, notes), if the project has one. |
| Docs tab | Delivery checklist. Tick items as they are done. |
| Links tab | Links to the backlog and the estimate. The same links appear at the bottom of the card. |
| Comments | A dated log. Click the header to expand it. |

### Roadmap controls

- **View: Day / Week** switches the gantt scale.
- **Export PNG** downloads the chart as an image.
- Hover a day header to see the date, whether it is a holiday, and the milestone label.
- Visual cues: the orange line is today, the grey line is the project close, highlighted days are milestones, and faded cells are blockers. After a stage name, ✓ means done, ← current and ⚠ blocked.

## Editing

Click **✏️ Edit** (bottom right) to show the edit controls. Click **👁 View** to hide them. Edit mode only shows or hides buttons; it is not a permission (see [SECURITY.md](../SECURITY.md)).

| What | Where | How |
|---|---|---|
| Roadmap | Roadmap tab → ✏️ Edit roadmap | Opens a popup that works on a copy. Nothing changes until you click **Save**. |
| Planned end | Same popup | The first time you can set it freely. After that, a reason is required, and each change is added to the history shown below the field. |
| Progress % | Progress table → ✏️ next to each stage | Enter 0–100 and press Enter or OK. |
| Comments | Comments → + Add, ✎ edit, ✕ delete | If you leave the date empty, today's date is used. |
| Docs checklist | Docs tab | Tick or untick items. In edit mode you can also add and remove items. |
| Links | Links tab → ✏️ Edit links | Pick the type (Backlog or Estimate), a name and a URL. |
| Portfolio comment | Portfolio → ✏️ in the Comment column | A short weekly note per project. It is also included in the PNG export. |
| Portfolio order | Portfolio → ▲▼ next to each account name | Replaces the automatic order (🔴 → 🟡 → 🟢, then by account). **↺ Automatic order** goes back to it. Projects not in your manual order are listed at the end. |
| RAID items | RAID log | Always editable. Use the form row to add an item, and ✏️ or 🗑 on each row to edit or delete it. Choosing "Decision" sets the status to Closed. Choosing "Change" shows an "Impact (days)" field. |

Hours, roles, members and statuses **cannot** be edited in the UI. Change them in `data/projects.js`.

## How saving works

Each edit is saved as soon as you confirm it. The dashboard saves **only** these fields for each project:

`comments`, `roadmap`, `progress`, `docs`, `raid`, `links`, `plannedEnd`, `plannedEndHistory`, `portfolioComment`

The manual row order of the Portfolio is not tied to a project, so it is saved apart, as `meta.portfolioOrder`.

When the page loads, the saved values replace the ones in `data/projects.js` for those fields only. Everything else always comes from the data file.

Saves are per field: before writing, the dashboard reads the latest saved data and replaces only the field you changed. Two tabs editing different fields or projects don't overwrite each other. Two tabs editing the same field of the same project at the same moment can still collide (the last one wins).

### Storage

The template ships with a **mock backend**: edits are kept in the browser's `localStorage` under the key `CONFIG.storage.localKey`. Nothing is ever sent over the network. The data is private to that browser and device, and each visitor of the online demo sees their own copy.

To reset the demo, run this in the browser console, then reload:

```js
localStorage.removeItem('pm-dashboard-demo-v1')
```

When the page loads, saved data is treated as untrusted input: it is validated field by field, and anything malformed is dropped (see [SECURITY.md](../SECURITY.md)).

### Connecting your own database

The template deliberately includes **no database connection, keys or endpoints**. If your team needs to share edits, you have to connect your own backend. All storage goes through one small object in `index.html`:

```js
const Store = {
  async read()      { /* return the saved blob, or null */ },
  async write(blob) { /* persist the blob */ }
};
```

Replace these two functions with calls to your own API. The blob is a JSON object: `{ version, updatedAt, projects: { [projectId]: { ...saved fields } }, meta: { portfolioOrder: [...] }, history: [...] }`.

Before you do it, make sure your backend provides what this static page cannot:

1. **Authentication:** only signed-in users can read or write. Do not rely on the ✏️ Edit button, which is only visual.
2. **Authorization on the server:** for example, row-level policies, or checks in your API, that limit each user to the data they are allowed to see.
3. **Server-side validation:** accept only the expected fields, types and sizes, and reject HTML or scripts.
4. **No secrets in the browser:** never put service keys, admin tokens or passwords in `config.js` or `index.html`. Anything shipped to the browser is public.
5. **Backups and an audit log** of who changed what.
6. **An updated Content-Security-Policy:** the `<meta http-equiv="Content-Security-Policy">` tag in `index.html` blocks all network requests (`connect-src 'none'`). Allow only your API's origin.

Any backend works (a managed database service or your organization's own API), as long as the points above are covered.

### Version history

Every save keeps the previous version, up to `CONFIG.storage.historyLimit` versions. From the browser console:

```js
listSavedVersions()   // table of versions with their date
restoreVersion(2)     // restores version number 2 (asks for confirmation)
```
