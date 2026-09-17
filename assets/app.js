/* Shared mock data + render helpers for the three Home concepts.
   Everything renders offline: poster art is generated from the title string
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

/* Deterministic "key art" so every poster looks distinct but stable.
   Layered so it reads as moody film artwork rather than a flat colour blob. */
function art(title) {
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

/* shape: "tall" | "wide" | "hero" */
function poster(item, provider, shape = "tall", opts = {}) {
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
  settings: `<svg class="ico" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 1 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.6 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 1 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.6a1.65 1.65 0 0 0 1-1.51V3a2 2 0 1 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9c.14.35.4.64.73.83"/></svg>`,
  home: `<svg class="ico" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7"><path d="M3 10.2 12 3l9 7.2V20a1 1 0 0 1-1 1h-5v-6H9v6H4a1 1 0 0 1-1-1z"/></svg>`,
  party: `<svg class="ico" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7"><path d="M21 12a7 7 0 0 1-7 7H8l-5 3 1.4-4.2A7 7 0 0 1 3 12a7 7 0 0 1 7-7h4a7 7 0 0 1 7 7z"/><path d="m10.5 9 4.5 3-4.5 3z" fill="currentColor" stroke="none"/></svg>`,
  /* Teleparty alien / mask — matches product, not a generic person silhouette */
  profile: `<svg class="ico" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7"><ellipse cx="12" cy="13.2" rx="6.8" ry="7.4"/><path d="M8.2 6.8 6.4 3.4M15.8 6.8l1.8-3.4"/><circle cx="9.6" cy="12.2" r="1.15" fill="currentColor" stroke="none"/><circle cx="14.4" cy="12.2" r="1.15" fill="currentColor" stroke="none"/><path d="M10.2 16.4c.55.55 1.2.85 1.8.85s1.25-.3 1.8-.85"/></svg>`,
};

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
  </div>`;
}

/* ---------- Browse tab: provider's own page inside the web view ---------- */

function webviewPage(pid) {
  const p = PROVIDERS[pid];
  const items = TRENDING[pid] || TRENDING.netflix;
  const hero = items[0];
  const row = (label, list) => `
    <div class="wv-row">
      <div class="lbl">${label}</div>
      <div class="wv-rail">${list.map((t) => `
        <div class="wv-tile" data-content-id="${t.id}">
          <div class="art" style="${art(t.title)}"></div>
          <span class="wv-tile-t">${t.title}</span>
        </div>`).join("")}</div>
    </div>`;
  return `
    <div class="wv">
      <div class="wv-brand">
        <span class="logo" style="color:${p.color}">${p.name}</span>
        <div class="row gap12">
          <span class="wv-ico">⌕</span>
          <span class="wv-avatar" style="background:${p.color}"></span>
        </div>
      </div>
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
   Switching services is done via the pill → Switch Services sheet. */
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

/* Switch Services sheet — no repeated "Sign in" copy.
   Connected = full tile. Available = muted with a corner +.
   Active browse = green dot. Premium = gold border. */
function switcherTile(pid, current, opts = {}) {
  const p = PROVIDERS[pid];
  const premium = p.tier === "premium";
  const active = pid === current && !opts.empty;
  const left = premium && !opts.isPremium ? ((opts.quota && opts.quota[pid]) || 0) : null;
  const locked = premium && !opts.isPremium && left === 0;
  const isConnected = isLinked(pid, opts);
  const available = !isConnected && !locked;
  return `<button class="svc-tile ${premium ? "premium" : ""} ${active ? "active" : ""} ${isConnected ? "connected" : ""} ${available ? "available" : ""} ${locked ? "locked" : ""}" data-p="${pid}" data-action="pick-service" type="button">
    ${active ? '<span class="svc-dot" title="Browsing now"></span>' : ""}
    ${locked ? '<span class="svc-lock">★</span>' : ""}
    ${left > 0 ? `<span class="svc-quota">${left} left</span>` : ""}
    ${available ? '<span class="svc-add" aria-hidden="true">+</span>' : ""}
    ${isConnected && !active ? '<span class="svc-check" aria-hidden="true">✓</span>' : ""}
    <span class="svc-logo" style="color:${premium ? "var(--premium)" : "#fff"}">${p.mark}</span>
    <span class="svc-name">${p.name}</span>
  </button>`;
}

function switcherSheet(current, opts = {}) {
  const isPremium = opts.isPremium !== false;
  const empty = !!opts.empty;
  const connected = (ids) => ids.filter((p) => isLinked(p, opts));
  const available = (ids) => ids.filter((p) => !isLinked(p, opts));
  /* Prefer: Your services → Add free → Premium. Falls back to Free/Premium if nothing connected. */
  const yours = connected([...FREE_PROVIDERS, ...PREMIUM_PROVIDERS]);
  const addFree = available(FREE_PROVIDERS);
  const prem = PREMIUM_PROVIDERS;

  const tileOpts = { isPremium, empty, conn: opts.conn, youtubeLogin: !!opts.youtubeLogin, quota: opts.quota || {} };
  const section = (title, cls, ids) => {
    if (!ids.length) return "";
    return `<div class="svc-sec">
      <div class="svc-sec-h ${cls}">${title}</div>
      <div class="svc-grid">${ids.map((p) => switcherTile(p, current, tileOpts)).join("")}</div>
    </div>`;
  };

  let body;
  if (yours.length === 0) {
    /* Brand-new user — nothing connected yet */
    body = `
      <div class="svc-empty">
        <div class="svc-empty-ico">+</div>
        <b>Add a streaming service</b>
        <span>You’ll sign in on that service — we never see your password.</span>
      </div>
      ${section("Free services", "free", FREE_PROVIDERS)}
      ${section("Premium Services ★", "prem", prem)}
      ${isPremium ? "" : `<div class="svc-upsell">
        <div><b>Unlock with Premium</b><span>Host on Crunchyroll, Paramount+ and more</span></div>
        <button class="btn premium sm" data-action="open-paywall" type="button">Try free</button>
      </div>`}`;
  } else {
    body = `
      ${section("Your services", "free", yours)}
      ${section("Add a free service", "free", addFree)}
      ${section("Premium Services ★", "prem", prem)}
      ${isPremium ? "" : `<div class="svc-upsell">
        <div><b>Unlock with Premium</b><span>Host on Crunchyroll, Paramount+ and more</span></div>
        <button class="btn premium sm" data-action="open-paywall" type="button">Try free</button>
      </div>`}`;
  }

  const quotaHint = !isPremium && opts.quota
    ? (() => {
      const bits = PREMIUM_PROVIDERS
        .map((p) => ({ p, n: opts.quota[p] || 0 }))
        .filter((x) => x.n > 0)
        .map((x) => `${x.n} free ${PROVIDERS[x.p].name} part${x.n === 1 ? "y" : "ies"} left this week`);
      return bits.length ? `<p class="svc-lead">${bits.join(" · ")}</p>` : `<p class="svc-lead">No free parties left this week 😢</p>`;
    })()
    : "";
  const lead = !hasLoginAccount(opts.conn || {}, opts)
    ? (opts.youtubeLogin
      ? "Sign in to a service you watch."
      : "YouTube works without signing in. Add Netflix, Prime, and more below.")
    : "Tap a service to switch. + means you haven’t added it yet.";

  return `<div class="scrim" data-action="close-sheet"></div>
    <div class="sheet sheet-switch">
      <div class="sheet-grab"></div>
      <div class="sheet-t">${empty || yours.length === 0 ? "Connect a service" : "Switch Services"}</div>
      <p class="svc-lead">${lead}</p>
      ${quotaHint}
      ${body}
      <p class="svc-footnote">Android supports ${FREE_PROVIDERS.length + PREMIUM_PROVIDERS.length} services today.
        The browser extension has more — we're bringing them over.</p>
    </div>`;
}

/* Header pill — white mono mark for chrome consistency (designer). */
function servicePill(pid, opts = {}) {
  if (!pid || !PROVIDERS[pid] || !isLinked(pid, opts)) {
    return `<button class="service-chip connect-chip" data-action="open-switcher" type="button"><span class="plus">+</span><span>Add a service</span></button>`;
  }
  const p = PROVIDERS[pid];
  return `<button class="service-chip" data-action="open-switcher" type="button">${pmark(pid, "mono round")}<span>${p.name.toLowerCase()}</span><span class="chev">▼</span></button>`;
}

/* FAB glyph — white mono on gradient; Tp when nothing connected. */
function fabGlyph(pid, opts = {}) {
  if (!pid || !PROVIDERS[pid]) {
    return `<span class="pmark mono tp-mark">Tp</span>`;
  }
  return `<span class="pmark mono">${PROVIDERS[pid].mark}</span>`;
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

/* activeTab: settings | home | browse | party | profile.  fabProvider drives the FAB glyph. */
function nav(activeTab, fabProvider, opts = {}) {
  const item = (id, label, badge) => `
    <button class="nav-item ${activeTab === id ? "active" : ""}" data-action="nav" data-tab="${id}" type="button">
      <span class="ico-wrap">${ICONS[id]}${badge ? '<span class="ndot"></span>' : ""}</span>
      <span>${label}</span>
    </button>`;
  const p = fabProvider && PROVIDERS[fabProvider];
  const linked = p && isLinked(fabProvider, opts);
  const label = opts.fabLabel || (linked ? "Browse" : p ? "Sign in" : "Connect");
  const title = linked
    ? `Opens ${p.name}`
    : p
      ? `Sign in to ${p.name}`
      : "Connect a service";
  return `
    <div class="nav">
      ${item("settings", "Settings")}
      ${item("home", "Home")}
      <div class="nav-item fab-slot"></div>
      ${item("party", "Party", opts.partyBadge)}
      ${item("profile", "Profile")}
      <button class="fab ${activeTab === "browse" ? "on" : ""} ${p ? "" : "empty"}" data-action="fab" type="button" title="${title}">
        ${fabGlyph(p ? fabProvider : null, opts)}
      </button>
      <span class="fab-label ${activeTab === "browse" ? "on" : ""}">${label}</span>
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
