/* Astryx exploration — parallel to Option D. No FAB. Slack-like dock. */

const AX_PEOPLE = [
  { n: "You",    c: "#e2416f", cam: true,  mic: true,  speaking: true },
  { n: "Priya",  c: "#7b3fd4", cam: true,  mic: false, speaking: false },
  { n: "Kabir",  c: "#00a8e1", cam: false, mic: true,  speaking: true },
  { n: "Meera",  c: "#1ce783", cam: false, mic: false, speaking: false },
  { n: "Rohan",  c: "#f47521", cam: true,  mic: true,  speaking: false },
];

const AX_INBOX = [
  { id: "inv", unread: true,  ico: "users",  title: "Priya invited you", body: "Join Aarav’s party on Crunchyroll", when: "2m" },
  { id: "watch", unread: true, ico: "play",   title: "Kabir started watching", body: "Solo Leveling · Crunchyroll", when: "18m" },
  { id: "nf", unread: true,   ico: "alert",  title: "Netflix session expired", body: "Reconnect to keep hosting parties", when: "1h" },
  { id: "quota", unread: false, ico: "star", title: "1 free Crunchyroll party left", body: "Resets Monday", when: "1d" },
];

const AX_ICONS = {
  home: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"><path d="M4 10.5 12 4l8 6.5V20a1 1 0 0 1-1 1h-5v-6H10v6H5a1 1 0 0 1-1-1z"/></svg>`,
  party: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><circle cx="8" cy="9" r="2.4"/><circle cx="16" cy="9" r="2.4"/><path d="M4.5 18c.6-2.4 2.6-4 5.5-4s4.9 1.6 5.5 4"/><path d="M14 14.2c1.2-.7 2.7-1 4.2-.7 2 .5 3.4 1.9 3.8 3.5"/></svg>`,
  apps: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><rect x="4" y="4" width="6" height="6" rx="1.4"/><rect x="14" y="4" width="6" height="6" rx="1.4"/><rect x="4" y="14" width="6" height="6" rx="1.4"/><rect x="14" y="14" width="6" height="6" rx="1.4"/></svg>`,
  inbox: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"><path d="M4 7.5 12 13l8-5.5"/><path d="M5 19h14a1 1 0 0 0 1-1V6a1 1 0 0 0-1-1H5a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1z"/></svg>`,
  you: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><circle cx="12" cy="8.5" r="3"/><path d="M5 19c1.2-3 3.6-4.5 7-4.5s5.8 1.5 7 4.5"/></svg>`,
  cam: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="7" width="13" height="10" rx="2"/><path d="M16 10.5 21 8v8l-5-2.5z"/></svg>`,
  camOff: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 7h10v10H3zM16 10.5 21 8v8l-5-2.5zM3 3l18 18"/></svg>`,
  mic: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="9" y="3" width="6" height="11" rx="3"/><path d="M6 11a6 6 0 0 0 12 0M12 17v4"/></svg>`,
  micOff: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="9" y="3" width="6" height="11" rx="3"/><path d="M6 11a6 6 0 0 0 12 0M12 17v4M4 4l16 16"/></svg>`,
  play: `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M8 6.5v11l9-5.5z"/></svg>`,
  users: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><circle cx="9" cy="9" r="2.5"/><path d="M4.5 18c.5-2.2 2.4-3.5 4.5-3.5s4 1.3 4.5 3.5"/><circle cx="16.5" cy="9.5" r="2"/><path d="M15 14.5c1.6-.2 3 .7 3.6 2"/></svg>`,
  alert: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><circle cx="12" cy="12" r="8"/><path d="M12 8v5M12 16.5h.01"/></svg>`,
  star: `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 3.5 14.4 9l6 .6-4.5 3.9 1.4 5.9L12 16.5 6.7 19.4l1.4-5.9L3.6 9.6l6-.6z"/></svg>`,
};

function axFresh() {
  return {
    scene: "live",
    tab: "home",
    party: "playing",
    partyItem: TRENDING.crunchyroll[0],
    partyProvider: "crunchyroll",
    provider: "crunchyroll",
    connected: ["youtube", "netflix", "crunchyroll", "prime", "max"],
    sheet: null,
    pendingProvider: null,
    unread: AX_INBOX.filter((m) => m.unread).length,
    accent: "teleparty",
    youCam: true,
    youMic: true,
  };
}

function axStatus() {
  return `<div class="ax-status"><span>9:41</span><span class="ax-status-dots"><i></i><i></i><i class="dot"></i></span></div>`;
}

function axDock(state) {
  const tabs = [
    ["home", "Home", AX_ICONS.home],
    ["party", "Party", AX_ICONS.party],
    ["apps", "Apps", AX_ICONS.apps],
    ["inbox", "Inbox", AX_ICONS.inbox],
    ["you", "You", AX_ICONS.you],
  ];
  return `<nav class="ax-dock">${tabs.map(([id, label, ico]) => `
    <button class="ax-tab ${state.tab === id ? "active" : ""}" data-ax="tab" data-tab="${id}" type="button">
      ${ico}${label}
      ${id === "inbox" && state.unread ? `<span class="dot"></span>` : ""}
    </button>`).join("")}</nav>`;
}

function axInboxBtn(state) {
  return `<button class="ax-inbox-btn" data-ax="tab" data-tab="inbox" type="button" aria-label="Inbox">
    ${AX_ICONS.inbox}
    ${state.unread ? `<span class="ax-badge">${state.unread}</span>` : ""}
  </button>`;
}

function axNowChip(state) {
  const p = PROVIDERS[state.provider];
  return `<button class="ax-now" data-ax="sheet" data-sheet="apps" type="button">
    ${pmark(state.provider)}${p.name}
  </button>`;
}

function axTop(state, title) {
  const now = state.connected.includes(state.provider) ? axNowChip(state) : "";
  return `<div class="ax-top">
    <h1>${title}</h1>
    ${now}
    ${axInboxBtn(state)}
  </div>`;
}

function axAvatars(people) {
  return `<div class="ax-people">${people.map((m) => {
    const pip = m.cam
      ? `<span class="pip ${m.speaking ? "speak" : ""}">${AX_ICONS.cam}</span>`
      : `<span class="pip off">${AX_ICONS.micOff}</span>`;
    return `<span class="ax-av" style="background:${m.c}">${m.n[0]}${pip}</span>`;
  }).join("")}</div>`;
}

function axPartyPeople(state) {
  return AX_PEOPLE.map((m) => {
    if (m.n === "You") return Object.assign({}, m, { cam: state.youCam, mic: state.youMic, speaking: state.youMic });
    return m;
  });
}

function axPartyCard(state) {
  const people = axPartyPeople(state);
  const cams = people.filter((p) => p.cam).length;
  const liveMics = people.filter((p) => p.mic).length;
  if (state.party === "playing" && state.partyItem) {
    const item = state.partyItem;
    const p = PROVIDERS[state.partyProvider];
    return `
      <div class="ax-kicker">Current party</div>
      <div class="ax-party">
        <button class="ax-stage" data-ax="tab" data-tab="party" type="button">
          <div class="art" style="${art(item.title)}"></div>
          <div class="veil"></div>
          <div class="live"><i></i>Live</div>
          <div class="cue"><b></b></div>
          <div class="meta">
            <div class="ttl">${item.title}</div>
            <div class="sub">${p.name} · 48:12 / 1:32:00 · 5 watching</div>
          </div>
        </button>
        <div class="ax-av-strip">
          ${axAvatars(people)}
          <div class="ax-av-meta">
            <div class="who">${people.length} in the huddle</div>
            <div class="st">${cams} cameras · ${liveMics} mics live</div>
          </div>
        </div>
        <div class="ax-status-pills">
          <button class="ax-pill ${state.youCam ? "on" : "off"}" data-ax="toggle-cam" type="button">
            ${state.youCam ? AX_ICONS.cam : AX_ICONS.camOff}${state.youCam ? "Cam on" : "Cam off"}
          </button>
          <button class="ax-pill ${state.youMic ? "on" : "off"}" data-ax="toggle-mic" type="button">
            ${state.youMic ? AX_ICONS.mic : AX_ICONS.micOff}${state.youMic ? "Mic on" : "Mic off"}
          </button>
        </div>
      </div>`;
  }
  if (state.party === "idle") {
    return `
      <div class="ax-kicker">Current party</div>
      <div class="ax-party">
        <div class="ax-empty-stage">Waiting to watch</div>
        <div class="ax-av-strip">
          ${axAvatars(people.slice(0, 3))}
          <div class="ax-av-meta">
            <div class="who">3 waiting</div>
            <div class="st">Pick something in Apps</div>
          </div>
        </div>
        <div class="ax-actions">
          <button class="ax-btn" data-ax="sheet" data-sheet="invite" type="button">Invite</button>
          <button class="ax-btn primary" data-ax="tab" data-tab="apps" type="button">Open Apps</button>
        </div>
      </div>`;
  }
  return `
    <div class="ax-kicker">No party yet</div>
    <div class="ax-party">
      <div class="ax-empty-stage">Tp</div>
      <div class="ax-actions" style="grid-template-columns:1fr">
        <button class="ax-btn primary" data-ax="create" type="button">Create a party</button>
      </div>
    </div>`;
}

function axJumpRow(state) {
  const items = CONTINUE.filter((c) => state.connected.includes(c.provider)).slice(0, 4);
  if (!items.length) return "";
  return `
    <div class="ax-sec"><h2>Jump back in</h2></div>
    <div class="ax-hscroll">${items.map((c) => `
      <button class="ax-jump" data-ax="open-title" data-id="${c.id}" data-p="${c.provider}" type="button">
        <div class="thumb"><div class="art" style="${art(c.title)}"></div></div>
        <div class="cap"><div class="t">${c.title}</div><div class="s">${PROVIDERS[c.provider].name} · ${c.left}</div></div>
      </button>`).join("")}</div>`;
}

function axTrending(state) {
  const list = (TRENDING[state.provider] || TRENDING.youtube).slice(0, 6);
  return `
    <div class="ax-sec"><h2>Trending on ${PROVIDERS[state.provider].name}</h2><span>See all</span></div>
    <div class="ax-hscroll">${list.map((item) => `
      <button class="ax-poster" data-ax="open-title" data-id="${item.id}" data-p="${state.provider}" type="button">
        <div class="art" style="${art(item.title)}"></div>
        <div class="t">${item.title}</div>
        <div class="s">${item.sub}</div>
      </button>`).join("")}</div>`;
}

function axHome(state) {
  const connectedAny = state.connected.length > 0;
  if (!connectedAny) {
    return `${axTop(state, "Home")}
      <div class="ax-party">
        <div class="ax-empty-stage">Connect a service</div>
        <p class="ax-tiny ax-muted" style="padding:8px 6px 12px">We’ll show what’s trending and let you host in a tap. Apps is where you add services — like a Smart TV home row.</p>
        <div class="ax-actions" style="grid-template-columns:1fr">
          <button class="ax-btn primary" data-ax="tab" data-tab="apps" type="button">Open Apps</button>
        </div>
      </div>`;
  }
  return `${axTop(state, "Home")}${axPartyCard(state)}${axJumpRow(state)}${axTrending(state)}`;
}

function axAppTile(pid, state, extraClass = "") {
  const p = PROVIDERS[pid];
  const connected = state.connected.includes(pid);
  const current = state.provider === pid;
  return `<button class="ax-app ${current ? "current" : ""} ${extraClass}" data-ax="pick-app" data-p="${pid}" type="button">
    <span class="tile" style="background:${p.color}">${p.mark}${connected ? `<span class="tick">✓</span>` : ""}</span>
    <span class="nm">${p.name}</span>
  </button>`;
}

function axApps(state) {
  const p = PROVIDERS[state.provider];
  const recents = state.connected.slice(0, 4);
  const rest = PROVIDER_ORDER.filter((id) => !recents.includes(id));
  return `${axTop(state, "Apps")}
    <div class="ax-kicker">Now on this party</div>
    <div class="ax-apps-hero">
      <div class="ax-app-mark" style="background:${p.color}">${p.mark}</div>
      <div>
        <h3>${p.name}</h3>
        <p>${state.party === "playing" ? "Playing in the party" : "Ready to browse"}</p>
      </div>
    </div>
    <div class="ax-sec"><h2>Recently used</h2></div>
    <div class="ax-grid">${recents.map((id) => axAppTile(id, state)).join("")}</div>
    <div class="ax-sec"><h2>All apps</h2></div>
    <div class="ax-grid">
      ${rest.map((id) => axAppTile(id, state)).join("")}
      <button class="ax-app add" data-ax="add-app" type="button"><span class="tile">+</span><span class="nm">Add</span></button>
    </div>
    <p class="ax-tiny ax-muted" style="margin-top:16px">Tap an app to watch it. We’ll ask before leaving a live video.</p>`;
}

function axInbox(state) {
  return `${axTop(state, "Inbox")}
    <div class="ax-list">${AX_INBOX.map((m) => `
      <button class="ax-mail ${m.unread ? "unread" : ""}" data-ax="read" data-id="${m.id}" type="button">
        <span class="ico">${AX_ICONS[m.ico]}</span>
        <span>
          <div class="ttl">${m.title}</div>
          <div class="bd">${m.body}</div>
        </span>
        <span class="when">${m.when}</span>
      </button>`).join("")}</div>`;
}

function axYou(state) {
  return `${axTop(state, "You")}
    <div class="ax-you-head">
      <div class="big" style="background:#e2416f">A</div>
      <div>
        <h2>Aarav</h2>
        <p class="ax-tiny ax-muted">Free · 1 Crunchyroll party left</p>
      </div>
    </div>
    <div class="ax-cell">Manage accounts <span>${state.connected.length} connected</span></div>
    <div class="ax-cell">Notifications <span>Inbox</span></div>
    <div class="ax-cell">Appearance <span>${state.accent === "gothic" ? "Gothic" : "Teleparty"}</span></div>
    <div class="ax-cell">Settings <span></span></div>`;
}

function axPartyTab(state) {
  const people = axPartyPeople(state);
  const item = state.partyItem;
  return `${axTop(state, "Party")}
    ${item && state.party === "playing" ? `
      <div class="ax-party" style="margin-bottom:16px">
        <button class="ax-stage" type="button">
          <div class="art" style="${art(item.title)}"></div>
          <div class="veil"></div>
          <div class="live"><i></i>Live</div>
          <div class="meta"><div class="ttl">${item.title}</div>
            <div class="sub">${PROVIDERS[state.partyProvider].name}</div></div>
        </button>
      </div>` : `<div class="ax-party" style="margin-bottom:16px"><div class="ax-empty-stage">No video yet</div></div>`}
    <div class="ax-sec"><h2>Huddle</h2><span>${people.length}</span></div>
    ${people.map((m) => `
      <div class="ax-member">
        <span class="ax-av" style="background:${m.c};margin:0">${m.n[0]}</span>
        <span class="name">${m.n}${m.n === "You" ? " · you" : ""}</span>
        <span class="flags">
          <span class="ax-flag ${m.cam ? "on" : "mute"}">${m.cam ? AX_ICONS.cam : AX_ICONS.camOff}</span>
          <span class="ax-flag ${m.mic ? "on" : "mute"}">${m.mic ? AX_ICONS.mic : AX_ICONS.micOff}</span>
        </span>
      </div>`).join("")}`;
}

function axScreen(state) {
  if (state.tab === "apps") return axApps(state);
  if (state.tab === "inbox") return axInbox(state);
  if (state.tab === "you") return axYou(state);
  if (state.tab === "party") return axPartyTab(state);
  return axHome(state);
}

function axOverlay(state) {
  if (!state.sheet) return "";
  if (state.sheet === "apps") {
    return `<button class="ax-scrim" data-ax="close" type="button"></button>
      <div class="ax-sheet">
        <div class="ax-handle"></div>
        <h3>Switch app</h3>
        <p class="lead">Same Smart TV grid as the Apps tab. Changing app while a video is playing asks first.</p>
        <div class="ax-grid">${PROVIDER_ORDER.map((id) => axAppTile(id, state)).join("")}</div>
      </div>`;
  }
  if (state.sheet === "confirm") {
    const next = PROVIDERS[state.pendingProvider] || PROVIDERS.netflix;
    const now = state.partyItem ? state.partyItem.title : "the current video";
    return `<button class="ax-scrim" data-ax="close" type="button"></button>
      <div class="ax-sheet">
        <div class="ax-handle"></div>
        <h3>Switch to ${next.name}?</h3>
        <p class="lead">This leaves <b style="color:var(--color-text-primary)">${now}</b> for everyone until someone starts something new.</p>
        <div class="ax-actions">
          <button class="ax-btn" data-ax="close" type="button">Keep watching</button>
          <button class="ax-btn primary" data-ax="confirm-switch" type="button">Switch</button>
        </div>
      </div>`;
  }
  if (state.sheet === "invite") {
    return `<button class="ax-scrim" data-ax="close" type="button"></button>
      <div class="ax-sheet">
        <div class="ax-handle"></div>
        <h3>Invite to this party</h3>
        <p class="lead">Share the link. They land in the huddle with cam and mic off until they turn them on.</p>
        <div class="ax-invite"><code>teleparty.com/join/8FK2QX</code>
          <button class="ax-btn sm" type="button">Copy</button></div>
      </div>`;
  }
  return "";
}

function axPhoneHtml(state, extraClass = "") {
  return `<div class="ax-phone ${extraClass}" data-accent="${state.accent}">
    ${axStatus()}
    <div class="ax-screen">${axScreen(state)}</div>
    ${axDock(state)}
    ${axOverlay(state)}
  </div>`;
}

function axApply(state, action, el) {
  const next = Object.assign({}, state);
  if (action === "tab") {
    next.tab = el.dataset.tab;
    next.sheet = null;
    if (el.dataset.tab === "inbox") next.unread = 0;
  } else if (action === "sheet") {
    next.sheet = el.dataset.sheet;
  } else if (action === "close") {
    next.sheet = null;
    next.pendingProvider = null;
  } else if (action === "toggle-cam") {
    next.youCam = !state.youCam;
  } else if (action === "toggle-mic") {
    next.youMic = !state.youMic;
  } else if (action === "create") {
    next.party = "idle";
    next.tab = "home";
  } else if (action === "pick-app") {
    const pid = el.dataset.p;
    if (pid === state.provider) {
      next.sheet = null;
      return next;
    }
    if (state.party === "playing" && pid !== state.partyProvider) {
      next.pendingProvider = pid;
      next.sheet = "confirm";
    } else {
      next.provider = pid;
      next.sheet = null;
      if (!state.connected.includes(pid)) next.connected = state.connected.concat(pid);
    }
  } else if (action === "confirm-switch") {
    const pid = state.pendingProvider;
    next.provider = pid;
    next.partyProvider = pid;
    next.partyItem = (TRENDING[pid] || TRENDING.youtube)[0];
    next.sheet = null;
    next.pendingProvider = null;
    next.tab = "home";
    if (!state.connected.includes(pid)) next.connected = state.connected.concat(pid);
  } else if (action === "add-app") {
    next.sheet = "apps";
  } else if (action === "read") {
    next.unread = 0;
  } else if (action === "open-title") {
    next.tab = "party";
    next.party = "playing";
    next.partyProvider = el.dataset.p;
    next.provider = el.dataset.p;
    const list = TRENDING[el.dataset.p] || [];
    next.partyItem = list.find((x) => x.id === el.dataset.id) || CONTINUE.find((x) => x.id === el.dataset.id) || list[0];
  }
  return next;
}

const AX_SCENES = [
  { id: "live", label: "Home · live party", apply: (s) => Object.assign(s, { scene: "live", tab: "home", party: "playing", sheet: null }) },
  { id: "idle", label: "Home · waiting", apply: (s) => Object.assign(s, { scene: "idle", tab: "home", party: "idle", partyItem: null, sheet: null }) },
  { id: "empty", label: "Home · new user", apply: (s) => Object.assign(s, { scene: "empty", tab: "home", party: "none", connected: [], sheet: null }) },
  { id: "apps", label: "Apps · Smart TV", apply: (s) => Object.assign(s, { scene: "apps", tab: "apps", sheet: null, connected: ["youtube", "netflix", "crunchyroll", "prime", "max"] }) },
  { id: "inbox", label: "Inbox", apply: (s) => Object.assign(s, { scene: "inbox", tab: "inbox", unread: 3, sheet: null }) },
  { id: "switcher", label: "Switcher sheet", apply: (s) => Object.assign(s, { scene: "switcher", tab: "home", party: "playing", sheet: "apps" }) },
  { id: "party", label: "Party huddle", apply: (s) => Object.assign(s, { scene: "party", tab: "party", party: "playing", sheet: null }) },
];

const AX_SHOTS = [
  { title: "Home · live", desc: "Party card carries cam / mic status. Inbox lives in the header. No FAB.", apply: AX_SCENES[0].apply },
  { title: "Apps", desc: "Smart TV grid is the provider switcher — recently used + all apps.", apply: AX_SCENES[3].apply },
  { title: "Inbox", desc: "Invites, watch activity, expired sessions. Same destination as the header icon.", apply: AX_SCENES[4].apply },
  { title: "Switch app", desc: "Quiet sheet from the Now-on chip. Same tiles as Apps, not a wallpaper list.", apply: AX_SCENES[5].apply },
];

function axBindPhone(root, getState, setState) {
  root.addEventListener("click", (e) => {
    const t = e.target.closest("[data-ax]");
    if (!t || !root.contains(t)) return;
    setState(axApply(getState(), t.dataset.ax, t));
  });
}

function mountAstryx(opts) {
  let state = axFresh();

  const gallery = opts.gallery;
  if (gallery) {
    gallery.innerHTML = AX_SHOTS.map((shot, i) => {
      const s = shot.apply(axFresh());
      return `<div class="ax-shot" data-shot="${i}">
        <div class="ax-frame">${axPhoneHtml(s)}</div>
        <h3>${shot.title}</h3><p>${shot.desc}</p>
      </div>`;
    }).join("");
    gallery.addEventListener("click", (e) => {
      const shot = e.target.closest("[data-shot]");
      if (!shot) return;
      const accent = state.accent;
      state = AX_SHOTS[+shot.dataset.shot].apply(axFresh());
      state.accent = accent;
      render();
    });
  }

  const play = opts.play;
  play.innerHTML = `
    <div>
      <div class="ax-chip-label">Scenes</div>
      <div class="ax-chips" id="ax-scenes"></div>
      <div class="ax-chip-label">Accent</div>
      <div class="ax-chips">
        <button class="ax-chip" data-accent="teleparty" type="button">Teleparty magenta</button>
        <button class="ax-chip" data-accent="gothic" type="button">Gothic ice (raw Astryx)</button>
      </div>
      <p class="ax-tiny ax-muted" style="margin-top:16px;max-width:280px">Gothic’s own accent is ice-white. Magenta is our overlay so this still reads as Teleparty. Toggle to judge the system on its own.</p>
    </div>
    <div id="ax-live"></div>`;

  const sceneBox = play.querySelector("#ax-scenes");
  sceneBox.innerHTML = AX_SCENES.map((sc) =>
    `<button class="ax-chip" data-scene="${sc.id}" type="button">${sc.label}</button>`
  ).join("");

  const live = play.querySelector("#ax-live");

  function render() {
    live.innerHTML = axPhoneHtml(state);
    sceneBox.querySelectorAll(".ax-chip").forEach((b) => {
      b.classList.toggle("on", b.dataset.scene === state.scene);
    });
    play.querySelectorAll("[data-accent]").forEach((b) => b.classList.toggle("on", b.dataset.accent === state.accent));
  }

  axBindPhone(live, () => state, (next) => { state = next; render(); });

  sceneBox.addEventListener("click", (e) => {
    const b = e.target.closest("[data-scene]");
    if (!b) return;
    const scene = AX_SCENES.find((s) => s.id === b.dataset.scene);
    state = scene.apply(axFresh());
    state.accent = play.querySelector("[data-accent].on")?.dataset.accent || "teleparty";
    render();
  });
  play.addEventListener("click", (e) => {
    const b = e.target.closest("[data-accent]");
    if (!b || b.closest(".ax-phone")) return;
    state = Object.assign({}, state, { accent: b.dataset.accent });
    render();
  });

  render();
}
