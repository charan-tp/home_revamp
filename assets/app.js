/* Shared mock data + render helpers for the three Home concepts.
   Catalog cards use local landscape stills; titles without one fall back to a generated wash.
   rather than loaded, so the file works with no network. */

const PROVIDERS = {
  netflix:     { name: "Netflix",      mark: "N",  color: "#e50914", connected: true,  tier: "free",    auth: "login" },
  max:         { name: "Max",          mark: "M",  color: "#3b5bff", connected: true,  tier: "free",    auth: "login" },
  hulu:        { name: "Hulu",         mark: "h",  color: "#1ce783", connected: false, tier: "free",    auth: "login" },
  disney:      { name: "Disney+",      mark: "D+", color: "#1f80e0", connected: false, tier: "free",    auth: "login" },
  youtube:     { name: "YouTube",      mark: "▶",  color: "#ff0000", connected: true,  tier: "free",    auth: "open" },
  prime:       { name: "Prime Video",  mark: "pv", color: "#00a8e1", connected: true,  tier: "free",    auth: "login" },
  hotstar:     { name: "Jio Hotstar",  mark: "JH", color: "#e8467c", connected: false, tier: "free",    auth: "login" },
  zee5:        { name: "Zee5",         mark: "Z5", color: "#8230c6", connected: false, tier: "free",    auth: "login" },
  crunchyroll: { name: "Crunchyroll",  mark: "cr", color: "#f47521", connected: true,  tier: "premium", auth: "login" },
  paramount:   { name: "Paramount+",   mark: "P+", color: "#0064ff", connected: false, tier: "premium", auth: "login" },
};

/* Android today: 8 free + 2 premium (status 3 / 4 in bundle.json).
   Extension supports many more — Android will grow toward that list. */
const FREE_PROVIDERS = ["netflix", "max", "hulu", "disney", "youtube", "prime", "hotstar", "zee5"];
const PREMIUM_PROVIDERS = ["crunchyroll", "paramount"];
const PROVIDER_ORDER = [...FREE_PROVIDERS, ...PREMIUM_PROVIDERS];

const TRENDING = {
  netflix: [
    { id: "nf_81234", title: "Dracula Untold", sub: "Film · 2h 12m" },
    { id: "nf_81992", title: "London Has Fallen", sub: "Film · 1h 39m" },
    { id: "nf_80100", title: "Wednesday", sub: "S2 · 8 eps" },
    { id: "nf_81455", title: "The Night Agent", sub: "S2 · 10 eps" },
    { id: "nf_80877", title: "Kaala Paani", sub: "Limited series" },
  ],
  prime: [
    { id: "pv_b0cx1", title: "Dhurandhar", sub: "Film · 2h 34m" },
    { id: "pv_b0cx2", title: "Reacher", sub: "S3 · 8 eps" },
    { id: "pv_b0cx3", title: "Fallout", sub: "S2 · 8 eps" },
    { id: "pv_b0cx4", title: "Citadel", sub: "S2 · 6 eps" },
  ],
  crunchyroll: [
    { id: "cr_g6099", title: "Solo Leveling", sub: "S2 · 13 eps" },
    { id: "cr_g6100", title: "Jujutsu Kaisen", sub: "S3 · 24 eps" },
    { id: "cr_g6101", title: "Frieren", sub: "S2 · 28 eps" },
    { id: "cr_g6102", title: "One Piece", sub: "Ep 1142" },
  ],
  youtube: [
    { id: "yt_dQw49", title: "Dolby Atmos Sound Test", sub: "18M views" },
    { id: "yt_kL02x", title: "The Most Elite Balls", sub: "1.5Cr views" },
    { id: "yt_9plQz", title: "First Take Live", sub: "Live now" },
  ],
  disney: [
    { id: "ds_11021", title: "Andor", sub: "S2 · 12 eps" },
    { id: "ds_11022", title: "The Bear", sub: "S4 · 10 eps" },
    { id: "ds_11023", title: "Shogun", sub: "S2 · 10 eps" },
    { id: "ds_11024", title: "Percy Jackson", sub: "S2 · 8 eps" },
  ],
  max: [
    { id: "mx_2201", title: "The Last of Us", sub: "S3 · 9 eps" },
    { id: "mx_2202", title: "The Penguin", sub: "Limited series" },
    { id: "mx_2203", title: "Dune: Prophecy", sub: "S2 · 6 eps" },
  ],
  hotstar: [
    { id: "hs_5501", title: "Special Ops", sub: "S3 · 8 eps" },
    { id: "hs_5502", title: "The Night Manager", sub: "S2 · 7 eps" },
    { id: "hs_5503", title: "Aarya", sub: "S4 · 8 eps" },
  ],
  hulu: [
    { id: "hu_3301", title: "The Bear", sub: "S4 · 10 eps" },
    { id: "hu_3302", title: "Only Murders", sub: "S5 · 10 eps" },
    { id: "hu_3303", title: "Shogun", sub: "S2 · 10 eps" },
  ],
  paramount: [
    { id: "pp_4401", title: "Tulsa King", sub: "S3 · 10 eps" },
    { id: "pp_4402", title: "Special Ops: Lioness", sub: "S2 · 8 eps" },
  ],
  zee5: [
    { id: "z5_7701", title: "The Broken News", sub: "S3 · 8 eps" },
    { id: "z5_7702", title: "Sunflower", sub: "S2 · 8 eps" },
  ],
};

const CONTINUE = [
  { id: "nf_81992", title: "London Has Fallen", provider: "netflix", left: "1:30 left", pct: 62 },
  { id: "cr_g6099", title: "Solo Leveling",      provider: "crunchyroll", left: "E7 · 12m left", pct: 78 },
  { id: "pv_b0cx2", title: "Reacher",            provider: "prime", left: "E3 · 41m left", pct: 24 },
  { id: "yt_dQw49", title: "Dolby Atmos Test",   provider: "youtube", left: "22m left", pct: 40 },
];

const MEMBERS = [
  { n: "Aarav", c: "#e2416f" },
  { n: "Priya", c: "#7b3fd4" },
  { n: "Kabir", c: "#00a8e1" },
  { n: "Meera", c: "#1ce783" },
  { n: "Rohan", c: "#f47521" },
];

/* ---------- helpers ---------- */

const hash = (s) => {
  let h = 0;
  for (let i = 0; i < s.length; i++) h = (h * 31 + s.charCodeAt(i)) | 0;
  return Math.abs(h);
};

/* Landscape stills for catalog titles. Anything unlisted keeps the generated wash. */
const POSTERS = {
  "London Has Fallen": "assets/posters/london-has-fallen.jpg",
  "Dracula Untold": "assets/posters/dracula-untold.jpg",
  "Wednesday": "assets/posters/wednesday.jpg",
  "The Night Agent": "assets/posters/the-night-agent.jpg",
  "Kaala Paani": "assets/posters/kaala-paani.jpg",
  "Dhurandhar": "assets/posters/dhurandhar.jpg",
  "Reacher": "assets/posters/reacher.jpg",
  "Fallout": "assets/posters/fallout.jpg",
  "Citadel": "assets/posters/citadel.jpg",
  "Solo Leveling": "assets/posters/solo-leveling.jpg",
  "Jujutsu Kaisen": "assets/posters/jujutsu-kaisen.jpg",
  "Frieren": "assets/posters/frieren.jpg",
  "One Piece": "assets/posters/one-piece.jpg",
  "Andor": "assets/posters/andor.jpg",
  "The Bear": "assets/posters/the-bear.jpg",
  "Shogun": "assets/posters/shogun.jpg",
  "Percy Jackson": "assets/posters/percy-jackson.jpg",
  "The Last of Us": "assets/posters/the-last-of-us.jpg",
  "The Penguin": "assets/posters/the-penguin.jpg",
  "Dune: Prophecy": "assets/posters/dune-prophecy.jpg",
  "Only Murders": "assets/posters/only-murders.jpg",
  "Tulsa King": "assets/posters/tulsa-king.jpg",
  "Special Ops: Lioness": "assets/posters/special-ops-lioness.jpg",
  "The Night Manager": "assets/posters/the-night-manager.jpg",
  "Aarya": "assets/posters/aarya.jpg",
  "The Broken News": "assets/posters/the-broken-news.jpg",
  "Sunflower": "assets/posters/sunflower.jpg",
};

/* Deterministic wash for titles that don't have a still (YouTube clips, etc.). */
function art(title) {
  const still = POSTERS[title];
  if (still) return `background:url('${still}') center/cover no-repeat;`;
  const h = hash(title);
  const a = h % 360;
  const b = (h >> 3) % 360;
  const c = (h >> 6) % 360;
  return `background:
    linear-gradient(${120 + (h % 80)}deg, hsla(${a},75%,60%,.34) 0%, transparent 52%),
    radial-gradient(85% 65% at ${18 + (h % 55)}% ${12 + (h % 32)}%, hsla(${a},70%,55%,.55), transparent 62%),
    radial-gradient(80% 60% at ${76 - (h % 45)}% ${86 - (h % 24)}%, hsla(${b},58%,34%,.8), transparent 64%),
    radial-gradient(130% 95% at 50% 118%, hsla(${c},48%,16%,.95), transparent 72%),
    linear-gradient(160deg, #241d30 0%, #14121b 58%, #0a090e 100%);
    box-shadow: inset 0 0 70px rgba(0,0,0,.6), inset 0 -46px 64px rgba(0,0,0,.5);`;
}

function pmark(provider, cls = "") {
  const p = PROVIDERS[provider];
  /* mono = white chrome mark (pill / FAB / browse). Colour stays for content. */
  const mono = /\bmono\b/.test(cls);
  const style = mono ? "" : `style="background:${p.color}"`;
  return `<span class="pmark ${cls}" ${style}>${p.mark}</span>`;
}

/* shape: "wide" (16:9 titles) | "hero". Portrait "tall" is unused — movies are landscape. */
function poster(item, provider, shape = "wide", opts = {}) {
  const p = PROVIDERS[provider];
  const locked = opts.locked || !p.connected;
  return `
    <div class="poster p-${shape} ${locked ? "locked" : ""}" data-content-id="${item.id}">
      <div class="art" style="${art(item.title, provider)}"></div>
      <div class="art-title">${item.title}</div>
      ${opts.badge !== false ? `<span class="badge">${pmark(provider)}</span>` : ""}
      ${locked ? `<span class="lock-pill">🔒 Connect ${p.name}</span>` : ""}
      ${opts.meta === false ? "" : `<div class="meta"><div class="t">${item.title}</div><div class="s">${item.sub || ""}</div></div>`}
    </div>`;
}

function connectTile(provider) {
  const p = PROVIDERS[provider];
  return `
    <div class="connect-tile">
      ${pmark(provider, "lg")}
      <div class="cta">Connect ${p.name}</div>
      <div class="sub">See what's trending and host parties</div>
    </div>`;
}

function avatars(count, size) {
  const shown = MEMBERS.slice(0, Math.min(count, 3));
  const extra = count - shown.length;
  return `<div class="avatars">
    ${shown.map((m) => `<span class="av" style="background:${m.c}">${m.n[0]}</span>`).join("")}
    ${extra > 0 ? `<span class="av more">+${extra}</span>` : ""}
  </div>`;
}

const ICONS = {
  home: `<svg class="ico" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7"><path d="M3 10.2 12 3l9 7.2V20a1 1 0 0 1-1 1h-5v-6H9v6H4a1 1 0 0 1-1-1z"/></svg>`,
  party: `<svg class="ico" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7"><circle cx="8" cy="9" r="2.4"/><circle cx="16" cy="9" r="2.4"/><path d="M4.5 18c.6-2.4 2.6-4 5.5-4s4.9 1.6 5.5 4"/><path d="M14 14.2c1.2-.7 2.7-1 4.2-.7 2 .5 3.4 1.9 3.8 3.5"/></svg>`,
  apps: `<svg class="ico" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7"><rect x="4" y="4" width="6" height="6" rx="1.4"/><rect x="14" y="4" width="6" height="6" rx="1.4"/><rect x="4" y="14" width="6" height="6" rx="1.4"/><rect x="14" y="14" width="6" height="6" rx="1.4"/></svg>`,
  inbox: `<svg class="ico" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/></svg>`,
  search: `<svg class="ico" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><circle cx="11" cy="11" r="6.2"/><path d="M16 16.5 20.2 20.5"/></svg>`,
  send: `<svg class="ico" viewBox="0 0 24 24" fill="currentColor"><path d="M3.2 20.8 21 12 3.2 3.2v6.7L14.4 12 3.2 14.1z"/></svg>`,
  you: `<svg class="ico" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7"><ellipse cx="12" cy="13.2" rx="6.8" ry="7.4"/><path d="M8.2 6.8 6.4 3.4M15.8 6.8l1.8-3.4"/><circle cx="9.6" cy="12.2" r="1.15" fill="currentColor" stroke="none"/><circle cx="14.4" cy="12.2" r="1.15" fill="currentColor" stroke="none"/><path d="M10.2 16.4c.55.55 1.2.85 1.8.85s1.25-.3 1.8-.85"/></svg>`,
  cam: `<svg class="ico" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="7" width="13" height="10" rx="2"/><path d="M16 10.5 21 8v8l-5-2.5z"/></svg>`,
  camOff: `<svg class="ico" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 7h10v10H3zM16 10.5 21 8v8l-5-2.5zM3 3l18 18"/></svg>`,
  mic: `<svg class="ico" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="9" y="3" width="6" height="11" rx="3"/><path d="M6 11a6 6 0 0 0 12 0M12 17v4"/></svg>`,
  micOff: `<svg class="ico" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="9" y="3" width="6" height="11" rx="3"/><path d="M6 11a6 6 0 0 0 12 0M12 17v4M4 4l16 16"/></svg>`,
};
ICONS.profile = `<svg class="ico" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7"><circle cx="12" cy="8" r="3.2"/><path d="M5.4 19c1.15-3.15 3.4-4.75 6.6-4.75S18.45 15.85 19.6 19"/></svg>`;
ICONS.invite = `<svg class="ico" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><circle cx="9" cy="8" r="3"/><path d="M3.5 19c.7-3.1 2.8-4.7 5.5-4.7s4.8 1.6 5.5 4.7"/><path d="M17 7.5v6M14 10.5h6"/></svg>`;
ICONS.close = `<svg class="ico" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M6 6l12 12M18 6 6 18"/></svg>`;
ICONS.settings = ICONS.you;

const INBOX_ITEMS = [
  { id: "inv", unread: true, title: "Priya invited you", body: "Join Aarav’s party on Crunchyroll", when: "2m" },
  { id: "watch", unread: true, title: "Kabir started watching", body: "Solo Leveling · Crunchyroll", when: "18m" },
  { id: "nf", unread: true, title: "Netflix session expired", body: "Reconnect to keep hosting parties", when: "1h" },
  { id: "quota", unread: false, title: "1 free Crunchyroll party left", body: "Resets Monday", when: "1d" },
];

const HUDDLE = [
  { n: "You", c: "#e2416f", cam: true, mic: true },
  { n: "Priya", c: "#7b3fd4", cam: true, mic: false },
  { n: "Kabir", c: "#00a8e1", cam: false, mic: true },
  { n: "Meera", c: "#1ce783", cam: false, mic: false },
  { n: "Rohan", c: "#f47521", cam: true, mic: true },
];

function statusBar() {
  return `<div class="status-bar"><span>20:43</span>
    <span class="status-icons"><i></i><i class="dot"></i><i></i></span></div>`;
}

/* ---------- Trending filter chips (Home only — filters content, does NOT switch browse service) ---------- */

function providerTabs(sel, opts = {}) {
  /* Home trending filter: show connected first, then a short "more" set — not every provider. */
  const ids = opts.ids || ["netflix", "prime", "crunchyroll", "disney", "max", "youtube"];
  return `<div class="ptabs">
    ${opts.all === false ? "" : `<span class="ptab" data-p="all" aria-selected="${sel === "all"}">All</span>`}
    ${ids.map((p) => `<span class="ptab ${isLinked(p, opts) ? "" : "off"}" data-p="${p}"
        aria-selected="${sel === p}">${pmark(p)}${PROVIDERS[p].name}</span>`).join("")}
    <span class="ptabs-lead-pad" aria-hidden="true"></span>
  </div>`;
}

/* ---------- Browse tab: provider's own page inside the web view ---------- */

function webviewPage(pid, mode = {}) {
  const p = PROVIDERS[pid];
  const items = TRENDING[pid] || TRENDING.netflix;
  const hero = items[0];
  const embedded = !!mode.embedded;
  const row = (label, list) => `
    <div class="wv-row">
      <div class="lbl">${label}</div>
      <div class="wv-rail">${list.map((t) => `
        <div class="wv-tile" data-content-id="${t.id}">
          <div class="art" style="${art(t.title)}"></div>
          <span class="wv-tile-t">${t.title}</span>
        </div>`).join("")}</div>
    </div>`;
  const brand = embedded ? "" : `
      <div class="wv-brand">
        <span class="logo" style="color:${p.color}">${p.name}</span>
        <span class="wv-avatar" style="background:${p.color}"></span>
      </div>`;
  return `
    <div class="wv ${embedded ? "embedded" : ""}">${brand}
      <div class="wv-cats"><span class="on">Home</span><span>Series</span><span>Films</span><span>My list</span></div>
      <div class="wv-hero">
        <div class="art" style="${art(hero.title)}"></div>
        <div class="veil"></div>
        <div class="wv-hero-body">
          <div class="wv-hero-t">${hero.title}</div>
          <div class="wv-hero-s">${hero.sub}</div>
          <div class="row gap8" style="margin-top:10px">
            <span class="wv-btn" style="background:#fff;color:#111">▶ Play</span>
            <span class="wv-btn">+ My list</span>
          </div>
        </div>
      </div>
      ${row("Trending now", items)}
      ${row("Because you watched", items.slice().reverse())}
      ${row("New releases", items)}
      <div class="spacer-nav"></div>
    </div>`;
}

function webviewLogin(pid) {
  const p = PROVIDERS[pid];
  return `
    <div class="wv wv-login">
      <div class="wv-brand"><span class="logo" style="color:${p.color}">${p.name}</span></div>
      <div class="wv-login-body">
        ${pmark(pid, "lg")}
        <h3>Sign in to ${p.name}</h3>
        <p>Your credentials go straight to ${p.name} — Teleparty never sees them.</p>
        <div class="wv-field">Email or phone number</div>
        <div class="wv-field">Password</div>
        <span class="wv-btn block" style="background:${p.color}">Sign in</span>
        <p class="wv-login-note">Once you're in, ${p.name} shows up on Home and you can host parties on it.</p>
      </div>
    </div>`;
}

/* Browse chrome — deliberately NOT an address bar. Service identity + back only.
   Switching services is done via the Now-on chip or the Apps tab. */
function browseChrome(pid) {
  const p = PROVIDERS[pid];
  return `<div class="bchrome">
    <div class="bchrome-row">
      <span class="iconbtn" title="Back in provider">←</span>
      <div class="bservice">
        ${pmark(pid, "mono")}
        <div class="bservice-txt">
          <div class="bservice-name">${p.name}</div>
          <div class="bservice-sub">Browsing · not editable</div>
        </div>
      </div>
      <span class="iconbtn" title="More">⋮</span>
    </div>
  </div>`;
}

function dock(kind, opts = {}) {
  if (kind === "picking") {
    return `<div class="dock">
      <span class="dock-avatars">${avatars(opts.people || 5)}</span>
      <div class="dock-txt"><div class="t">Choosing for ${opts.people || 5} people</div>
        <div class="s">Pick a title to start</div></div>
      <button class="btn ghost sm" data-action="nav" data-tab="party" type="button">Back</button>
    </div>`;
  }
  if (kind === "return") {
    return `<div class="dock">
      <div class="dock-th"><div class="art" style="${art(opts.title)}"></div></div>
      <div class="dock-txt"><div class="t">${opts.title}</div>
        <div class="s"><span class="live-dot" style="display:inline-block;vertical-align:middle;margin-right:5px"></span>${opts.people || 5} watching · you’re in</div></div>
      <button class="btn primary sm" data-action="nav" data-tab="party" type="button">Return</button>
    </div>`;
  }
  if (kind === "rejoin") {
    return `<div class="dock">
      <div class="dock-th"><div class="art" style="${art(opts.title)}"></div></div>
      <div class="dock-txt"><div class="t">${opts.title}</div>
        <div class="s"><span class="live-dot" style="display:inline-block;vertical-align:middle;margin-right:5px"></span>${opts.people || 4} still watching</div></div>
      <button class="btn primary sm" data-action="rejoin-party" type="button">Rejoin</button>
    </div>`;
  }
  return "";
}

function startPartySheet(item, pid, state = {}) {
  const guest = state.role === "guest";
  return `<div class="scrim" data-action="close-sheet"></div>
    <div class="sheet">
      <div class="sheet-grab"></div>
      <div class="row gap12" style="align-items:flex-start">
        <div class="sheet-th"><div class="art" style="${art(item.title)}"></div></div>
        <div class="grow">
          <div class="row gap8" style="margin-bottom:6px">${pmark(pid)}<span class="tiny dim">${PROVIDERS[pid].name}</span></div>
          <div class="sheet-t">${item.title}</div>
          <div class="tiny dim" style="margin-top:3px">${item.sub}</div>
        </div>
      </div>
      ${guest ? `<p class="svc-lead" style="margin-top:12px">Only the host can change the video.</p>
        <div class="sheet-actions">
          <button class="btn primary block" data-action="nav" data-tab="party" type="button">Back to the party</button>
          <button class="btn ghost block" data-action="close-sheet" type="button">Cancel</button>
        </div>` : `<div class="sheet-actions">
          <button class="btn primary block" data-action="start-party" data-id="${item.id}" data-p="${pid}" type="button">Start a party</button>
          <button class="btn ghost block" data-action="watch-alone" data-id="${item.id}" data-p="${pid}" type="button">Watch alone</button>
        </div>`}
    </div>`;
}

function paywallSheet(state) {
  const source = state.paywallSource || "provider";
  const pid = state.paywallPid;
  const name = pid && PROVIDERS[pid] ? PROVIDERS[pid].name : "premium services";
  const yearly = state.paywallPeriod !== "monthly";
  const quota = source === "quota";
  const title = quota ? "No free parties left this week 😢" : "Ready to get started?";
  const lead = quota
    ? `You can host 1 free watch party on ${name} every week. To host more parties every week, subscribe to Teleparty Premium.`
    : "Get started with a free Teleparty Premium trial! Host unlimited watch parties on our channels & customize chat.";
  const price = yearly ? "$59.99 / year" : "$19.99 / month";
  const save = yearly ? "Save 25%" : "";
  return `<div class="scrim" data-action="close-sheet"></div>
    <div class="sheet sheet-paywall">
      <div class="sheet-grab"></div>
      <div class="row gap8" style="align-items:flex-start">
        <div class="grow"><div class="sheet-t">${title}</div>
          <p class="svc-lead" style="margin-top:8px">${lead}</p></div>
        <button class="iconbtn" data-action="close-sheet" type="button" aria-label="Close">✕</button>
      </div>
      <div class="plan-toggle">
        <button type="button" class="plan-opt ${yearly ? "on" : ""}" data-action="paywall-period" data-period="yearly">Yearly ${save ? `<span>${save}</span>` : ""}</button>
        <button type="button" class="plan-opt ${yearly ? "" : "on"}" data-action="paywall-period" data-period="monthly">Monthly</button>
      </div>
      <div class="pay-card">
        <div class="pay-price">${price}</div>
        <div class="pay-feats">
          <div>Netflix, Disney, Hotstar, parties and more!</div>
          <div>Teleparty priority support</div>
          <div>Voice and video chat</div>
          <div>Unlimited Teleparties!</div>
        </div>
        <button class="btn premium block" data-action="start-trial" type="button">Start a free trial</button>
        <div class="tiny dim" style="text-align:center;margin-top:8px">Cancel anytime</div>
      </div>
      <p class="svc-footnote">Privacy policy | Terms of service</p>
    </div>`;
}

/* Connection helper — opts.conn overrides PROVIDERS[].connected for interactive prototypes.
   auth:"open" (YouTube) is always available — Android auto-enables it on first launch. */
function isOpen(pid, opts = {}) {
  if (PROVIDERS[pid]?.auth !== "open") return false;
  return !opts.youtubeLogin;
}
function isLinked(pid, opts = {}) {
  if (isOpen(pid, opts)) return true;
  if (opts.empty) return false;
  if (opts.conn) return !!opts.conn[pid];
  return !!PROVIDERS[pid]?.connected;
}
function hasLoginAccount(conn = {}, opts = {}) {
  return PROVIDER_ORDER.some((p) => !isOpen(p, opts) && !!conn[p]);
}

/* Service picker: a wrapping grid (more columns as the sheet gets wider) plus Free / Premium filters. */
function switcherSheet(current, opts = {}) {
  const filter = opts.filter || "all";
  const ids = PROVIDER_ORDER.filter((pid) => {
    const tier = PROVIDERS[pid].tier;
    if (filter === "free") return tier !== "premium";
    if (filter === "premium") return tier === "premium";
    return true;
  });
  const chip = (id, label) => `<button class="picker-chip" data-action="switcher-filter" data-filter="${id}" aria-selected="${filter === id}" type="button">${label}</button>`;
  const tiles = ids.map((pid) => {
    const p = PROVIDERS[pid];
    const on = pid === current;
    const cls = ["picker-tile", on ? "on" : "", p.tier === "premium" ? "premium" : ""].filter(Boolean).join(" ");
    return `<button class="${cls}" data-action="pick-service" data-p="${pid}" type="button">
      ${p.tier === "premium" ? `<span class="picker-star" aria-hidden="true">★</span>` : ""}
      <span class="picker-logo">${pmark(pid, "round")}</span>
      <span class="picker-name">${p.name}</span>
    </button>`;
  }).join("");

  return `<div class="scrim" data-action="close-sheet"></div>
    <div class="sheet sheet-profiles">
      <div class="picker-top">
        <h2 class="picker-title">Teleparty</h2>
      </div>
      <p class="picker-kicker">Choose a service</p>
      <div class="picker-filters" role="tablist">
        ${chip("all", "All")}
        ${chip("free", "Free")}
        ${chip("premium", "Premium")}
      </div>
      ${tiles ? `<div class="picker-grid">${tiles}</div>` : `<p class="picker-empty">No services in this filter.</p>`}
    </div>`;
}

function nowChip(pid, opts = {}) {
  if (!pid || !PROVIDERS[pid] || !isLinked(pid, opts)) {
    return `<button class="now-chip connect-chip" data-action="open-switcher" type="button"><span class="plus">+</span><span>Connect</span></button>`;
  }
  const p = PROVIDERS[pid];
  return `<button class="now-chip" data-action="open-switcher" type="button">${pmark(pid)}<span>${p.name}</span><span class="now-chev" aria-hidden="true">▾</span></button>`;
}

/* New-user v1 header: the word Teleparty, with a looping mark that crossfades every provider. */
function telepartyBrandSwitch() {
  const ids = PROVIDER_ORDER;
  const step = 1.2;
  const chev = `<svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"><path d="M6 9l6 6 6-6"/></svg>`;
  return `<button class="ws-switch brand-home" data-action="open-switcher" type="button" aria-label="Teleparty">
    <span class="brand-lottie" aria-hidden="true">
      ${ids.map((p, i) => `<span class="brand-frame" style="animation-delay:${(i * step).toFixed(1)}s">${pmark(p, "round")}</span>`).join("")}
    </span>
    <span class="ws-name">Teleparty</span>
    <span class="ws-chev" aria-hidden="true">${chev}</span>
  </button>`;
}

function workspaceSwitch(pid, opts = {}) {
  const linked = opts.forceHeader || isLinked(pid, opts);
  if (!pid || !PROVIDERS[pid] || !linked) {
    return `<button class="ws-switch" data-action="open-switcher" type="button">
      <span class="ws-logo plus">+</span>
      <span class="ws-name">Connect</span>
      <span class="ws-chev" aria-hidden="true"><svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"><path d="M6 9l6 6 6-6"/></svg></span>
    </button>`;
  }
  const p = PROVIDERS[pid];
  return `<button class="ws-switch" data-action="open-switcher" type="button">
    ${pmark(pid, "round")}
    <span class="ws-name">${p.name}</span>
    <span class="ws-chev" aria-hidden="true"><svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"><path d="M6 9l6 6 6-6"/></svg></span>
  </button>`;
}

function appHead(title, state = {}, opts = {}) {
  const any = state.conn && Object.values(state.conn).some(Boolean);
  const pid = any ? (state.provider || "youtube") : null;
  if (title === "Home") {
    if (state.brandHome) {
      return `<div class="app-head workspace">${telepartyBrandSwitch()}</div>`;
    }
    const any = state.conn && Object.values(state.conn).some(Boolean);
    const pid = state.forceHeader && state.provider
      ? state.provider
      : (any ? (state.provider || "youtube") : null);
    const headOpts = state.forceHeader ? Object.assign({}, opts, { forceHeader: true }) : opts;
    return `<div class="app-head workspace">
      ${workspaceSwitch(pid, headOpts)}
    </div>`;
  }
  return `<div class="app-head">
    <h1>${title}</h1>
    <div class="app-head-actions">${nowChip(pid, opts)}</div>
  </div>`;
}

function huddlePeople(state, count) {
  return HUDDLE.slice(0, count).map((m) => {
    if (m.n !== "You") return m;
    return Object.assign({}, m, {
      cam: state.youCam !== false,
      mic: state.youMic !== false,
    });
  });
}

function huddleStrip(state, total = 5) {
  const cap = 5;
  const shown = Math.min(cap, total);
  const overflow = Math.max(0, total - cap);
  const people = huddlePeople(state, shown);
  const avs = people.map((m) =>
    `<span class="av huddle-av" style="background:${m.c}">${m.n[0]}</span>`
  ).join("") + (overflow > 0
    ? `<span class="av huddle-av more">+${overflow}</span>`
    : "");
  return `<div class="huddle">
    <div class="avatars huddle-avs">${avs}</div>
    <button class="huddle-invite" data-action="open-invite" type="button" aria-label="Invite">${ICONS.invite}</button>
  </div>`;
}

function wireCatalog(body, pid) {
  return body
    .replace(/class="wv-tile"/g, 'class="wv-tile" data-action="open-title"')
    .replace(/data-content-id="([^"]+)"/g, 'data-id="$1" data-p="' + pid + '"')
    .replace(
      /class="wv-btn block" style="background:([^"]+)"/,
      'class="wv-btn block" style="background:$1" data-action="complete-signin" data-p="' + pid + '"'
    );
}

function tvAppTile(pid, current, opts = {}) {
  const p = PROVIDERS[pid];
  const connected = isLinked(pid, opts);
  const active = pid === current && connected;
  return `<button class="tv-app ${active ? "current" : ""}" data-action="pick-service" data-p="${pid}" type="button">
    <span class="tv-tile" style="background:${p.color}">${p.mark}${connected ? `<span class="tv-tick">✓</span>` : ""}</span>
    <span class="tv-nm">${p.name}</span>
  </button>`;
}

function tvAppsGrid(current, opts = {}) {
  const recents = PROVIDER_ORDER.filter((p) => isLinked(p, opts)).slice(0, 4);
  const rest = PROVIDER_ORDER.filter((p) => !recents.includes(p));
  const currentP = current && PROVIDERS[current] ? PROVIDERS[current] : null;
  const hero = currentP ? `<div class="tv-hero">
      <div class="tv-hero-mark" style="background:${currentP.color}">${currentP.mark}</div>
      <div>
        <h3>${currentP.name}</h3>
        <p>${opts.playing ? "Playing in the party" : "Ready to browse"}</p>
      </div>
      <button class="btn ghost sm" data-action="open-browse" type="button">Open</button>
    </div>` : "";
  return `${hero}
    ${recents.length ? `<div class="sec-head" style="padding:18px 0 10px"><span class="sec-title big">Recently used</span></div>
      <div class="tv-grid">${recents.map((p) => tvAppTile(p, current, opts)).join("")}</div>` : ""}
    <div class="sec-head" style="padding:18px 0 10px"><span class="sec-title big">All apps</span></div>
    <div class="tv-grid">
      ${rest.map((p) => tvAppTile(p, current, opts)).join("")}
      <button class="tv-app add" data-action="open-switcher" type="button"><span class="tv-tile">+</span><span class="tv-nm">Add</span></button>
    </div>`;
}

/* Header pill kept as an alias for older snapshots. */
function servicePill(pid, opts = {}) {
  return nowChip(pid, opts);
}

function premiumBlock() {
  return `<div class="premium-card">
    <div class="premium-card-top">
      <span class="pmark lg" style="background:var(--premium);color:var(--text-on-premium)">★</span>
      <div class="txt">
        <b>Switch to Premium</b>
        <span>Host unlimited watch parties on all supported channels &amp; customize your chat experience.</span>
      </div>
    </div>
    <button class="btn premium sm" data-action="open-paywall" type="button">Try free</button>
  </div>`;
}

/* Capsule dock: Profile · Home · Browse in the pill, Party as the orb on the right. */
function nav(activeTab, _unused, opts = {}) {
  const resolved = activeTab === "browse" ? "apps"
    : (activeTab === "profile" || activeTab === "accounts" || activeTab === "settings" || activeTab === "you") ? "profile"
    : activeTab;
  const item = (id, label, badge) => `
    <button class="nav-item ${resolved === id ? "active" : ""}" data-action="nav" data-tab="${id}" type="button">
      <span class="ico-wrap">${ICONS[id]}${badge ? '<span class="ndot"></span>' : ""}</span>
      <span class="label">${label}</span>
    </button>`;
  const partyOn = resolved === "party";
  return `
    <div class="nav-cluster${opts.live ? " live" : ""}">
      <div class="nav-dock">
        <nav class="nav">
          <div class="nav-tabs">
            ${item("profile", "Profile")}
            ${item("home", "Home")}
            ${item("apps", "Browse")}
          </div>
        </nav>
        <button class="nav-orb ${partyOn ? "active" : ""} ${opts.partyBadge ? "live" : ""}" data-action="nav" data-tab="party" type="button" aria-label="Party">
          <span class="ico-wrap">${ICONS.party}${opts.partyBadge ? '<span class="ndot"></span>' : ""}</span>
        </button>
      </div>
    </div>`;
}

function confirmSignOutSheet(pid) {
  const p = PROVIDERS[pid];
  return `<div class="scrim" data-action="close-sheet"></div>
    <div class="sheet">
      <div class="sheet-grab"></div>
      <div class="row gap12" style="align-items:flex-start;margin-bottom:8px">
        ${pmark(pid, "lg")}
        <div class="grow">
          <div class="sheet-t">Remove ${p.name}?</div>
          <p class="svc-lead" style="margin-top:6px">You'll need to sign in again to browse or host on ${p.name}. Your Teleparty account stays signed in.</p>
        </div>
      </div>
      <div class="sheet-actions">
        <button class="btn danger block" data-action="confirm-signout" data-p="${pid}" type="button">Sign out</button>
        <button class="btn ghost block" data-action="close-sheet" type="button">Cancel</button>
      </div>
    </div>`;
}

/* overlay renders above the scrolling screen — used for sheets, scrims and docks. */
function phone(inner, navHtml, overlay = "") {
  return `<div class="phone">${statusBar()}<div class="screen">${inner}</div>${overlay}${navHtml}</div>`;
}

function frame(title, desc, inner, navHtml, overlay = "") {
  return `<div class="frame-wrap">
    ${phone(inner, navHtml, overlay)}
    <div class="frame-caption"><h3>${title}</h3><p>${desc}</p></div>
  </div>`;
}

function mount(id, html) {
  document.getElementById(id).innerHTML = html;
}
