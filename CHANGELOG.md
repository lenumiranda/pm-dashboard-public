# Changelog

All notable changes to this project are documented here. The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/), and this project uses [Semantic Versioning](https://semver.org/).

## [1.1.0] - 2026-10-02

### Added
- Portfolio redesigned as a weekly status view: four PMO cards (Health, Hours, Schedule, To decide) and a table of active projects. The table shows burn ring, roadmap progress with burn marker and current stage, schedule badge, estimated end with variance, calculated alerts and a weekly comment.
- Manual row order for the Portfolio (▲▼ in Edit mode) and PNG export of the table.
- Social preview tags (Open Graph) and screenshots.

### Changed
- Portfolio alerts are calculated from the RAID log, roles and hours. The `statusClass`, `alert` and `alertClass` data fields were removed.
- Demo accounts renamed so that no name matches a real company.

### Fixed
- Roadmap and progress table no longer overflow on narrow screens.
- Hours column no longer wraps in the Portfolio.

## [1.0.0] - 2026-09-28

### Added
- Portfolio view with KPIs (active projects, projects needing attention, hours burn) and a project table.
- One board per account, with status filter chips and a "Completed projects" section.
- Roadmap gantt with Day and Week views, today line, milestones, blockers, close marker and PNG export.
- Progress table per stage: roadmap time elapsed, hours spent and manual progress.
- Schedule metrics (planned end, estimated end, variance, scope changes) and a schedule badge.
- RAID log with types, statuses, owners, due dates, overdue flag and filters.
- Hours tab with burn summary, stage pills, role cards and a role × stage matrix.
- Runs, Docs and Links tabs, and per-project comments.
- Edit mode with a roadmap editor and a planned-end rebaseline history.
- Per-field saving to `localStorage` (mock backend, no network calls), with version history and restore from the console.
- `config.js` for thresholds, holidays, stages, role order, default checklist and RAID owners.
- Fictional demo data (retail and logistics) with dates relative to today.

### Security
- Content-Security-Policy that blocks all network requests; Subresource Integrity for html2canvas.
- HTML escaping of all rendered text, validation of saved data and of ids, badge classes and URLs in the data file.
