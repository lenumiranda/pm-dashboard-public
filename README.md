# Automation PM Dashboard

**English** · [Español](README.es.md)

A single-page dashboard template for project managers who run automation projects (RPA, workflow and integration projects). In one place it shows each project's roadmap, hours burn, RAID log and schedule variance against the planned end.

It runs as a static site: no build step, no backend and no install. The demo ships with **fictional data** (four made-up retail and logistics accounts, nine projects).

> **Live demo:** _add your GitHub Pages link here_
>
> ![Portfolio view](docs/screenshots/portfolio.png)
> ![Project card](docs/screenshots/project-card.png)
> _Screenshots: add them to `docs/screenshots/`._

## The problem it solves

In automation projects the status usually lives in several places: the roadmap in a slide, hours in a timesheet export, risks in a spreadsheet, and the planned date in someone's head. This template puts them side by side for every project, so you can answer three questions quickly:

- Are we on schedule compared with the planned end?
- How much of the estimated effort have we used, by stage and by role?
- What is blocking us, and who owns it?

## Who it is for

- PMs and delivery leads with several automation projects across clients or business units.
- Teams that want a lightweight status page they can host for free and adapt by editing plain JavaScript.

## Features

**Portfolio view**
- KPIs: active projects, projects with a red alert, and total hours burn.
- A table of all projects with hours, burn bar, status and alert. Click a row to open the project.

**Account boards** (one per account, with status filter chips)
- **Roadmap:** a gantt chart with Day and Week views, today's line, milestones, blockers (lost working days), project close marker and PNG export.
- **Progress table:** for each stage, time elapsed on the roadmap vs. hours spent vs. manual progress %.
- **Schedule metrics:** planned end, estimated end, schedule variance (days and %) and scope changes (count and day impact).
- **Schedule badge:** 🟢 On track / 🟡 At risk / 🔴 Behind, plus Closed, No dates and No planned end.
- **RAID log:** Actions, Risks, Issues, Decisions and Changes, with status, owner, due date, overdue flag, filters and a collapsible "Closed" list.
- **Hours tab:** total burn, stage pills, one card per role (with a stage breakdown and team members), and a role × stage matrix.
- **Runs, Docs and Links tabs:** production schedule, a delivery checklist, and backlog/estimate links.
- **Comments:** a dated log per project.

**Editing** (✏️ Edit button, bottom right)
- Roadmap editor: add, remove and reorder stages, set dates, color and flag, and add blockers, milestones and close date. You can also set the planned end; changing it requires a reason, and each change is kept in a history.
- Edit progress %, comments, docs checklist and links. RAID items can be added and edited at any time.
- Every change is saved right away. Only UI-editable fields are saved; hours, roles and statuses always come from the data file.

**Other**
- Light and dark themes, following your system setting.
- Configurable thresholds, stages, holidays, roles order and checklist in `config.js`.
- Version history of saved edits, restorable from the browser console.

## Quick start

1. Download or clone the repository.
2. Open `index.html` in a browser. That's it.

To use your own data, edit `data/projects.js` (see [docs/data-schema.md](docs/data-schema.md)). To change thresholds or stages, edit `config.js` (see [docs/metrics.md](docs/metrics.md)).

To publish it, enable GitHub Pages on the repository (Settings → Pages → deploy from the `main` branch, root folder).

## Documentation

- [Usage guide](docs/usage.md): navigation, editing, storage and restoring versions.
- [Metrics](docs/metrics.md): every formula, threshold and how to read it.
- [Data schema](docs/data-schema.md): how to load your own accounts and projects.
- [Security](SECURITY.md): what this tool does not protect, and how to use it safely.

## Limitations

- **No login and no permissions.** Anyone who can open the page can use Edit mode.
- **No database: browser storage only.** Edits are saved in the visitor's browser (mock backend) and are not shared. Clearing the browser data deletes them. To share edits, connect your own database with authentication (see [Connecting your own database](docs/usage.md#connecting-your-own-database)).
- **Hours are not editable from the UI.** Estimates, spent hours and roles are edited in `data/projects.js`. There is no import from timesheet tools.
- **The "Alert" column and statuses are written by hand** in the data file; they are not calculated.
- **Saved roadmaps take priority.** Once a roadmap is edited from the UI, later changes to that project's roadmap in the data file are ignored until the saved data is cleared.
- **Single file, no tests.** It is designed to be read and modified directly, not as a library.
- Stage, month and day names are in English; there is no translation layer.

## Tech

Plain HTML, CSS and JavaScript. No backend and no network calls (enforced by a Content-Security-Policy). External resources: Google Fonts and [html2canvas](https://html2canvas.hertzen.com/) for PNG export, pinned with an integrity hash.

## License

[MIT](LICENSE) © Elena Miranda
