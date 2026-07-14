# TEDxJEC Website — Content & Codebase Guide

This is a reference doc for maintaining the TEDxJEC site. It covers how the
site works in plain English, how to update people's info day-to-day, and
which files are safe to touch vs. which control layout/functionality.

---

## 1. How the site is built (plain English)

**Stack:** The site is a single-page website built with **React** (a
JavaScript framework for building UI out of reusable components) and
**Tailwind CSS** (a styling toolkit — the black/red/white design comes from
utility classes in the code, not a separate CSS file you'd edit directly).
It's hosted on **Vercel**, which also runs the small backend for us (more on
that below). The database is **Turso** (a hosted SQLite database).

If you had to explain it in one sentence: *it's a modern React website with a
small built-in backend that saves form submissions to a real database, all
hosted on Vercel.*

### The public-facing pages

Everything on the main site (`tedxjecc-website.vercel.app`) is one continuous
scrolling page, built out of these sections/components, top to bottom:

| Section | File | What it does |
|---|---|---|
| Nav bar | `src/components/Navbar.jsx` | The sticky top bar — logo, links, scroll progress indicator |
| Hero | `src/components/Hero.jsx` | The big opening banner with the event name, theme, and date |
| About/Theme | `src/components/About.jsx` | Explains this year's theme and what TEDx is |
| Speakers | `src/components/Speakers.jsx` | Renders the speaker grid, using `SpeakerCard.jsx` for each card |
| Tickets | `src/components/Tickets.jsx` | The two pricing cards, plus the "buy ticket" mini-form |
| Team | `src/components/Team.jsx` | The 3-tier "Meet the Team" section, using `OrganizerCard.jsx` (Tier 1) and `TeamBlock.jsx` (Tiers 2 & 3) |
| Join the Team | `src/components/JoinTeam.jsx` | The full application form |
| Footer | `src/components/Footer.jsx` | Bottom credits/contact/social links |

Clicking any speaker or team member's photo opens a popup with their full
bio — that's `src/components/ProfileModal.jsx`, one shared component used
everywhere.

### Where the content actually lives

Almost none of the above files contain actual names, bios, or prices. They're
just *layout* — they say "show a card for every speaker" without knowing who
the speakers are. All the real content lives in **one file**:

**`src/data/siteData.js`** — this is the file you'll edit 95% of the time.
It's a plain list of speakers, team members, ticket prices, and event
details. The page components automatically pick up whatever's in this file.

### The admin/backend side

- **`/admin`** is a separate, password-protected page (not linked from the
  public site) where you can see every form submission.
- When someone submits the "Join the Team" form or buys a ticket, the site
  sends that data to a small backend function (code in the `api/` folder),
  which saves it into the Turso database.
- The admin page (`src/admin/`) reads that data back out and shows it in
  tables, with a shortlist checkbox and a delete button per row.

**Data flow in one sentence:** *Speaker/team content comes from
`siteData.js` and is baked into the site when it's built; form submissions
go the other direction — from the visitor's browser, through the `api/`
backend, into the Turso database, and the admin page reads them back out.*

You will not need to touch anything in `api/`, `lib/`, or `src/admin/` for
normal content updates — those only matter if you're changing how the
backend or admin panel *works*, not what content is shown.

---

## 2. Step-by-step: editing people's info

Everyone — speakers, organizers, team heads, team members — lives in
**`src/data/siteData.js`**. Open that file in any text editor (VS Code is
easiest). Here's what each section looks like and how to edit it.

### Finding the right person

The file has these lists, in this order:
- `featuredSpeakers` — the 5 invited speakers
- `openCallSpeakers` — the 5 open-call speakers
- `leadership.members` — the 3 Tier 1 leadership people (2 organizers + faculty coordinator)
- `rawTier2Teams` — Treasurer & Budgeting, Volunteer (each has a `head` and 3 `members`)
- `rawTier3Teams` — Media, Ambience, Tech (each has a `head` and 3 `members`)

Search the file (Ctrl+F) for the person's name to jump straight to them.

### Changing a name

Just edit the `name:` field. Example:

```js
{
  name: "Ananya Rao",          // ← change this
  photo: "https://i.pravatar.cc/300?img=32",
  ...
}
```

**Important:** for speakers and leadership, that's the only place their name
needs to change — everything else (the profile popup, etc.) reads from this
same field automatically.

### Replacing a placeholder photo with a real one

Right now every `photo:` field points to a placeholder image service
(`i.pravatar.cc`). To use a real photo:

1. **Prepare the image:**
   - Format: JPG or PNG (or WebP if you want smaller file sizes)
   - Shape: **square** (1:1) — all photos are displayed as circles or
     square cards, so a non-square photo will get cropped/stretched
   - Size: 400×400px to 800×800px is plenty — no need for huge files, it'll
     just slow the site down
   - Name the file something simple with no spaces, e.g. `ananya-rao.jpg`

2. **Put the file in `public/images/`** (create the `images` folder inside
   `public/` if it doesn't exist yet — anything in `public/` is served
   directly by the site).

3. **Update the `photo:` field** in `siteData.js` to point to it:

   ```js
   photo: "/images/ananya-rao.jpg",
   ```

   (Note the leading `/` — that means "from the site's root," not a full
   web address, since the file now lives on our own site instead of an
   external service.)

### Updating bio/about text

There are actually **two different bio fields** depending on the person type:

- **Speakers** have `bio` (the short line shown on the card, e.g. "AI
  Researcher & Ethicist") and `longBio` (the full paragraph shown when you
  click their card).
- **Leadership** (organizers/faculty coordinator) have `description` (short,
  on-card version) and `longBio` (full popup version).
- **Team heads/members** (Tier 2 & 3) don't have a manually-written bio —
  theirs is auto-generated from their name, role, and team (see the
  `withProfile` function near the top of the file). If you want to give a
  specific team member a custom bio instead of the auto-generated one, add
  a `bio:` field directly to their entry — it'll override the automatic one.

### Updating LinkedIn, WhatsApp, and email

By default, every person gets **auto-generated placeholder contact info**
from their name (see the `placeholderContact()` function near the top of
`siteData.js`) — a fake LinkedIn URL, a placeholder WhatsApp number
(`91XXXXXXXXXX`), and a made-up `@tedxjecc.org` email.

To set a **real** one for a specific person, just add the field directly to
their entry — it overrides the auto-generated version:

```js
{
  name: "Ananya Rao",
  photo: "/images/ananya-rao.jpg",
  linkedin: "https://linkedin.com/in/ananya-rao-real",
  whatsapp: "https://wa.me/919876543210",
  email: "ananya@realdomain.com",
  ...
}
```

For WhatsApp, the format is always `https://wa.me/` followed by the country
code and phone number with no spaces, dashes, or `+` sign (e.g.
`https://wa.me/919876543210` for a `+91 98765 43210` number).

### Updating a speaker's talk title/description

Speakers (only) have two extra fields for this:

```js
talkTitle: "Teaching Machines to Say 'I Don't Know'",
talkDescription: "Why the most responsible AI systems are the ones that know the limits of their own knowledge.",
```

Just edit the text directly. `talkTitle` shows on the card and in the popup;
`talkDescription` shows only in the popup, under the talk title.

### Adding a brand new person

**New speaker:** Copy an existing speaker's whole `{ ... }` block (including
the surrounding curly braces and trailing comma) inside `featuredSpeakers` or
`openCallSpeakers`, paste it as a new entry, and change every field.

**New team member:** Copy an existing entry inside the relevant team's
`members: [ ... ]` array (in `rawTier2Teams` or `rawTier3Teams`) and edit it.
Note: team members only need `name` and `photo` — everything else
(role label, bio, contact info) is generated automatically.

**New leadership person:** Copy an entry inside `leadership.members` and
edit it, same as a speaker.

Just make sure every entry you add ends with a comma before the next `{`,
and that curly braces `{ }` and square brackets `[ ]` stay balanced — a
text editor like VS Code will show a red squiggly line if something's
mismatched.

### Removing a person entirely

Delete their whole `{ ... }` block, including the trailing comma. Nothing
else needs to change — the page automatically re-renders with one fewer
card.

### Do I need to rebuild/restart anything?

**Not manually, no.** The moment you push a change to the `siteData.js` file
to GitHub, Vercel automatically detects it and rebuilds/redeploys the live
site within about a minute — no commands to run, nothing to restart. If
you're editing locally first, you'd only see the change after
committing + pushing (see the Quick Reference below for exact commands, or
just ask Claude Code to do it).

---

## 3. Quick reference

### Files you'll realistically touch for content updates

| File | What's in it |
|---|---|
| **`src/data/siteData.js`** | Everyone's info, ticket prices, event date/time/venue, theme name & description, tagline |

That's genuinely the only file for day-to-day content work. Specifically,
inside that one file:

- `eventInfo` — event date, time, venue, tagline, contact email
- `eventTheme` — this year's theme name, one-liner, description, discipline tags
- `ticketTiers` — prices and perks for each ticket type
- `featuredSpeakers` / `openCallSpeakers` — speaker info
- `leadership` — Tier 1 (organizers + faculty coordinator)
- `rawTier2Teams` / `rawTier3Teams` — every team's head + members
- `socialLinks` — footer social media links

### Files to leave alone (layout & functionality — not content)

Editing these changes *how the site works or looks*, not *what it says*.
Only touch these if you're making a design/feature change (or ask Claude
Code to do it):

- Anything in `src/components/` — these define layout, styling, and behavior
- Anything in `src/admin/` — the admin panel's code
- Anything in `api/` and `lib/` — the backend and database logic
- `src/index.css` — the color palette, fonts, and shared design tokens
- `vercel.json`, `vite.config.js`, `package.json` — project/build configuration

### Common day-to-day tasks, at a glance

| I want to... | Edit this |
|---|---|
| Fix a typo in someone's name/bio | Their entry in `siteData.js` |
| Swap a placeholder photo for a real one | Add file to `public/images/`, update their `photo:` field |
| Change ticket prices | `ticketTiers` in `siteData.js` |
| Change the event date/venue | `eventInfo` in `siteData.js` |
| Change this year's theme | `eventTheme` in `siteData.js` |
| Add/remove a speaker or team member | Add/remove their block in the relevant array in `siteData.js` |
| See who applied to join the team / bought tickets | Log into `/admin` on the live site |
