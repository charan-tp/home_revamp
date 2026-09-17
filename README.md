# Teleparty — Home revamp

HTML for the final Home / Browse / Party / Profile / Accounts design.
**Build this in Compose** — D · Final is the source of truth.

**Start here:** open `index.html`, then **Home**.

Each page has two parts:

1. **All states** — every screen for that tab, as snapshots on one page  
2. **Interactive** — one live phone. Toggle a state, then tap inside (pill, FAB, titles, sheets)

## Files

| File | What it is |
|---|---|
| `index.html` | Overview |
| `concept-d.html` | **Home** — snapshots + live wireframe |
| `party.html` | **Party** — idle / live / none / join-only |
| `profile-settings.html` | **Profile & Settings** |
| `manage-accounts.html` | **Manage My Accounts** |
| `assets/` | Tokens, CSS, mock data, interactive engine, Android bg drawables |

## How to try it

```
open index.html
```

Inside the playground phone:

- **Pill / FAB** → Switch Services / Connect sheet  
- **Title / Jump back in** → Start a party sheet  
- **Profile → Manage accounts** → add with +, remove via options → confirm Sign out  
- State chips are per page (Home chips stay on Home)  
- Tier chips: Free · purple bg · Premium · gold bg

## Design rules locked in

- Home backdrop: Android `tp_gradient_bg` (free) ↔ `ic_premium_bg` (premium)  
- Premium also swaps CTA/FAB chrome to gold (not pink on gold)  
- Pill / FAB / Browse chrome: **white mono** service marks (content keeps brand colour)  
- Profile nav: Teleparty alien/mask icon  
- Party: play + ring progress; Invite only while you’re in. Leave keeps the session — Home/Party show **Rejoin**, not a blank Create. **Return** dock on other tabs if you’re still a member.  
- New user / FTUX: **New user** = YouTube open, no Jump back in. **New user · connect** = connect card only (no Current party, no trending). 
- Browse chrome is not an editable URL bar  
- **Adaptive:** compact phone, medium foldable cover, expanded tablet (nav rail), dual iPhone Duo / separating hinge. Tiles keep intrinsic sizes (112×168 posters). Extra width adds columns or a second pane — never `%` of screen width. 
