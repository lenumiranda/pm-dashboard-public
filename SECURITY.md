# Security

This is a static, client-side template. It has **no backend, no database connection, no API keys and no network calls**. Edits are stored only in the visitor's own browser. Read this before you publish it with real data or connect it to a database.

## What the template does to protect you

- **No credentials or endpoints.** The repository does not contain, and never needs, any key, token, password or database URL.
- **Nothing leaves the browser.** A Content-Security-Policy (`connect-src 'none'`) blocks all network requests from the page's scripts. Scripts can only load from the page itself and cdnjs.
- **Escaped output.** Every piece of text shown on screen is HTML-escaped. This covers what visitors type (comments, checklist items, link names, stage names, blocker reasons, RAID items) and what comes from the data file (names, statuses, alerts, runs, team members).
- **Saved data is validated.** On load, each saved field is checked for its expected shape: dates must be ISO dates, colors hex codes, numbers within range, RAID types and statuses from a fixed list, ids from a safe pattern, and URLs `http(s)` only. Anything else is dropped.
- **Data-file checks.** Account and project ids must match `[A-Za-z0-9_-]`, badge classes must come from a fixed list, and link URLs must be `http(s)`.
- **Pinned third-party script.** html2canvas is loaded with a Subresource Integrity hash, so a modified file on the CDN is rejected.
- **No referrer** is sent when visitors follow links.

## Limitations you must know

**No authentication or authorization.** There are no users or permissions. The ✏️ Edit button only shows or hides controls. RAID items can be edited even outside Edit mode.

**The data file is public.** `data/projects.js` and `config.js` are downloaded by every visitor. Anything you put there can be read by anyone with the link, even if it isn't shown on screen.

**Browser storage is not a database.**
- Edits live only in that browser (`localStorage`). They are not shared, not backed up, and are lost if site data is cleared or a different browser is used.
- Anyone with access to that browser profile can read them.

**The CSP allows inline handlers** (`'unsafe-inline'`) because the UI uses `onclick` attributes. Escaping is the main protection against injected markup; the CSP is a second layer.

**Google Fonts** is loaded as a stylesheet, which means the font provider sees visitors' IP addresses. Self-host the fonts if that matters to you.

## Recommendations

1. **Publish only fictional or public data.** Treat the hosted page as public, even if the URL is hard to guess.
2. **For real client data, keep it private:** open `index.html` locally, or host it behind access control, such as an intranet, your hosting platform's password protection or an SSO proxy.
3. **To share edits, connect your own database** following [Connecting your own database](docs/usage.md#connecting-your-own-database). You are responsible for adding authentication, server-side authorization and validation, and backups. Never put secret keys in the front end.
4. **Keep the CSP strict** when you change the page. If you add a backend, allow only its origin in `connect-src`.
5. **Pin any new third-party script** with an `integrity` hash, or self-host it.

## Reporting a vulnerability

Please open a private security advisory on the repository (Security → Report a vulnerability) instead of a public issue.
