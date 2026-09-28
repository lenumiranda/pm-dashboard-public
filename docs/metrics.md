# Metrics

Every threshold below lives in `config.js`. The values shipped in the demo are **examples**: tune them to your own delivery standards.

## Working days

Weekends and the dates listed in `CONFIG.holidays` are non-working days. **Blockers** (the `gaps` of a stage) are working days lost to a blocker. Both are excluded from the roadmap progress below.

## Hours burn

```
burn % = spent hours / estimated hours × 100
```

The totals come from `roleHours` in the data file: each role has an estimate and spent hours per stage. They are added up by stage, by role and for the whole project.

| Level | Rule (defaults) | Where it appears |
|---|---|---|
| OK (green) | burn < `burn.warnPct` (75) | Card badge, portfolio bar, stage pills, role cards, matrix |
| Watch (amber) | `burn.warnPct` ≤ burn ≤ `burn.dangerPct` (100) | Same places |
| Over budget (red) | burn > `burn.dangerPct` | Same places, plus the "N roles over budget" badge |
| Not estimated (blue) | role with 0 h estimated and more than 0 h spent | Role cards |

The Hours tab also lists stages at or above `burn.stageAlertPct` (95) as alerts.

**How to read it:** compare burn with the roadmap % of the same stage. If burn runs well ahead of the time elapsed, the stage will probably need more hours than estimated.

## Roadmap progress

```
roadmap % = working days elapsed up to today / total working days of all stages × 100
```

The per-stage value in the progress table uses the same formula for that stage only. It measures **time elapsed**, not work done.

## Manual progress

The "Progress" column is a percentage entered by hand for each stage, for example from your backlog tool. It is shown next to roadmap % and hours % so you can see gaps between the three.

## Schedule metrics

| Metric | Formula |
|---|---|
| Start | earliest stage start |
| Estimated end | latest stage end in the current roadmap |
| Planned end | `plannedEnd`, the baseline you commit to |
| Schedule variance (days) | estimated end − planned end, in calendar days. Zero or negative shows as "On track". |
| Schedule variance (%) | variance days / (planned end − start) |
| Scope changes | number of RAID items of type **Change** (any status) and the sum of their `impact` in days |

## Schedule badge

The header badge is decided in this order. The first rule that matches wins.

1. **Closed:** the project has `completed: true`, or all stages are marked done.
2. **No dates:** the roadmap has no dated stages.
3. **No planned end:** `plannedEnd` is not set.
4. **🔴 Behind:** variance % > `schedule.redPct` (25), **or** there is an open Issue, an item with status Blocked, or a stage flagged as blocked and not done.
5. **🟡 At risk:** variance % > `schedule.amberPct` (10).
6. **🟢 On track:** otherwise.

The variance card in the RAID section uses the same color thresholds.

**How to read it:** the badge compares where the roadmap says you will finish with what you committed to. Moving stage dates in the editor changes the estimated end. Changing the planned end is a rebaseline, so it requires a reason and is recorded in the history.

## RAID counters

- **Chips:** open items (status other than Closed) by type. Click a chip to filter the list.
- **Overdue:** open items with a due date before today. Decisions are never overdue.
- Open items are sorted with overdue ones first, then by due date. Items without a date go last.

## Portfolio KPIs

| KPI | Formula |
|---|---|
| Active projects | projects without `completed: true` |
| Need attention | projects whose `alertClass` is `b-danger`. This is set by hand in the data file. |
| Hours burn | total spent / total estimated across all projects with an estimate |

## Adjusting thresholds

Edit `config.js` and reload the page:

```js
schedule: { amberPct: 10, redPct: 25 },
burn: { warnPct: 75, dangerPct: 100, stageAlertPct: 95 },
```

- `amberPct` must be lower than `redPct`, and `warnPct` lower than `dangerPct`.
- A lower `redPct` makes the badge stricter. For short projects, consider higher values: one lost day is a large share of a short timeline.
- `dangerPct: 100` means "red only when the estimate is exceeded". Set it to 90 to get a red warning before that happens.
