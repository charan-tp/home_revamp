/* Interactive prototype — one live phone wired to the Option D designs.
   Click CTAs to open sheets, switch tabs, connect / remove services. */

function defaultConn(mode, opts = {}) {
  const conn = {};
  PROVIDER_ORDER.forEach((p) => {
    conn[p] = isOpen(p, opts) ? true : (mode === "empty" ? false : !!PROVIDERS[p].connected);
  });
  return conn;
}

function linkOpts(state) {
  return { conn: state.conn, youtubeLogin: !!state.youtubeLogin };
}

function findTitle(id) {
  for (const pid of PROVIDER_ORDER) {
    const hit = (TRENDING[pid] || []).find((t) => t.id === id);
    if (hit) return { item: hit, provider: pid };
  }
  const cont = CONTINUE.find((c) => c.id === id);
  if (cont) return { item: { id: cont.id, title: cont.title, sub: cont.left }, provider: cont.provider };
  return null;
}

function protoPartyCard(state) {
  if (state.party === "playing" && state.partyItem) {
    const item = state.partyItem;
    const pid = state.partyProvider;
    return `
      <div class="sec" style="margin-top:22px"><div class="sec-head">
        <span class="sec-title">Current party</span>
        <span class="live-pill"><span class="live-dot"></span>Live</span></div></div>
      <div class="d-party">
        <button class="d-stage" data-action="nav" data-tab="party" type="button">
          <div class="art" style="${art(item.title)}"></div><div class="veil"></div>
          <div class="top"><span class="tiny dim">48:12 / 1:32:00</span></div>
          <div class="play-ring" style="--pct:52"><div class="play"></div></div>
          <div class="bottom"><div class="ttl">${item.title}</div></div>
        </button>
        <div class="row gap8" style="margin-top:12px">${avatars(5)}
          <span class="tiny dim grow" style="margin-left:6px">5 watching</span>
          <button class="btn ghost sm" data-action="open-invite" type="button">Invite</button></div>
        <div class="d-invite"><code>teleparty.com/join/8FK2QX</code>
          <button class="btn ghost sm" data-action="copy-invite" type="button">Copy</button></div>
      </div>`;
  }
  if (state.party === "idle") {
    return `
      <div class="sec" style="margin-top:22px"><div class="sec-head">
        <span class="sec-title">Current party</span>
        <span class="live-pill"><span class="live-dot"></span>Live</span></div></div>
      <div class="d-party">
        <div class="d-empty"><span class="tp">Tp</span></div>
        <div class="row gap8" style="margin-top:12px">${avatars(3)}
          <span class="tiny dim grow" style="margin-left:6px">3 waiting to watch</span></div>
        <div class="d-actions">
          <button class="btn ghost" data-action="open-invite" type="button">Invite</button>
          <button class="btn primary" data-action="fab" type="button">Browse a video</button></div>
        <div class="d-invite"><code>teleparty.com/join/8FK2QX</code>
          <button class="btn ghost sm" data-action="copy-invite" type="button">Copy</button></div>
      </div>`;
  }
  if (state.party === "left") {
    const item = state.partyItem;
    const people = item ? 4 : 3;
    return `
      <div class="sec" style="margin-top:22px"><div class="sec-head">
        <span class="sec-title">Party still going</span>
        <span class="live-pill"><span class="live-dot"></span>Live</span></div></div>
      <div class="d-party">
        ${item ? `<button class="d-stage dimmed" data-action="rejoin-party" type="button">
          <div class="art" style="${art(item.title)}"></div><div class="veil"></div>
          <div class="bottom"><div class="ttl">${item.title}</div>
            <div class="tiny dim">${PROVIDERS[state.partyProvider].name} · you left</div></div>
        </button>` : `<div class="d-empty"><span class="tp">Tp</span></div>`}
        <div class="row gap8" style="margin-top:12px">${avatars(people)}
          <span class="tiny dim grow" style="margin-left:6px">${people} still watching</span></div>
        <div class="d-actions">
          <button class="btn ghost" data-action="dismiss-left" type="button">Not now</button>
          <button class="btn primary" data-action="rejoin-party" type="button">Rejoin</button>
        </div>
      </div>`;
  }
  return `
    <div class="sec" style="margin-top:22px"><div class="sec-head">
      <span class="sec-title">Current party</span></div></div>
    <div class="d-party">
      <div class="d-empty quiet"><span class="tp">Tp</span></div>
      <div class="d-actions"><button class="btn primary block" data-action="create-party" type="button">Create a party</button></div>
      <p class="tiny dim" style="text-align:center;margin-top:10px">Pick something below and we'll start the party for you</p>
    </div>`;
}

function protoConnectCard() {
  const logos = ["netflix", "prime", "disney", "max", "crunchyroll"];
  return `
    <div class="d-onboard">
      <h3>Connect a service to get started</h3>
      <p>We’ll show you what’s trending on each one and let you host a watch party in a tap.</p>
      <div class="d-logos">${logos.map((p) =>
        `<button class="d-logo" data-action="connect-service" data-p="${p}" type="button">${pmark(p, "lg")}</button>`
      ).join("")}</div>
      <button class="btn primary block" data-action="open-switcher" type="button">Connect a service</button>
    </div>`;
}

function protoJumpBackIn(state) {
  /* Resume rail is watch history — not “this service exists.” New users have none. */
  if (!state.hasHistory) return "";
  const linked = CONTINUE.filter((c) => state.conn[c.provider]);
  if (!linked.length) return "";
  return `
    <div class="sec">
      <div class="sec-head"><span class="sec-title big">Jump back in</span><span class="sec-more">See all</span></div>
      <div class="rail">${linked.map((c) => `
        <button class="d-chip" data-action="open-title" data-id="${c.id}" data-p="${c.provider}" type="button">
          <div class="th">
            <div class="art" style="${art(c.title)}"></div>
            <span class="chip-badge">${pmark(c.provider, "sm")}</span>
          </div>
          <div class="txt"><div class="t">${c.title}</div><div class="s">${c.left}</div>
            <div class="progress"><i style="width:${c.pct}%"></i></div></div>
        </button>`).join("")}</div>
    </div>`;
}

function protoGrid(state) {
  const sel = state.filter;
  const opts = linkOpts(state);
  /* Only render titles for services we are actually in. Logged-out catalogs
     are not scrapable for Netflix / Prime / etc. */
  if (sel === "all") {
    const linkedIds = PROVIDER_ORDER.filter((p) => isLinked(p, opts));
    if (!linkedIds.length) return "";
    const per = linkedIds.length <= 1 ? 6 : 2;
    const mixed = linkedIds.flatMap((p) =>
      (TRENDING[p] || []).slice(0, per).map((t) => ({ t, p }))
    );
    return `<div class="d-grid">${mixed.slice(0, 9).map((m) => {
      return `<button class="poster p-tall" data-action="open-title" data-id="${m.t.id}" data-p="${m.p}" type="button" style="border:0;padding:0;text-align:left;cursor:pointer">
        <div class="art" style="${art(m.t.title)}"></div>
        <div class="art-title" style="font-size:10px;bottom:30%">${m.t.title}</div>
        <span class="badge">${pmark(m.p)}</span>
      </button>`;
    }).join("")}</div>`;
  }
  if (!isLinked(sel, opts)) {
    const p = PROVIDERS[sel];
    return `<div class="d-connect">${pmark(sel, "lg")}
      <div class="txt"><b>Sign in to ${p.name}</b><span>Trending for ${p.name} shows up after you’re in.</span></div>
      <button class="btn primary sm" data-action="connect-service" data-p="${sel}" type="button">Sign in</button></div>`;
  }
  const items = (TRENDING[sel] || []).concat(TRENDING[sel] || []).slice(0, 9);
  return `<div class="d-grid">${items.map((t) => `
    <button class="poster p-tall" data-action="open-title" data-id="${t.id}" data-p="${sel}" type="button" style="border:0;padding:0;text-align:left;cursor:pointer">
      <div class="art" style="${art(t.title)}"></div>
      <div class="art-title" style="font-size:10px;bottom:30%">${t.title}</div>
    </button>`).join("")}</div>`;
}

function protoTrending(state) {
  const opts = linkOpts(state);
  const hasLinked = PROVIDER_ORDER.some((p) => isLinked(p, opts));
  if (!hasLinked) return "";
  return `<div class="sec d-trending">
    <div class="sec-head"><span class="sec-title big">Trending right now</span></div>
    ${providerTabs(state.filter, opts)}
    <div class="grid-wrap">${protoGrid(state)}</div>
  </div>`;
}

function protoHome(state) {
  const opts = linkOpts(state);
  const any = Object.values(state.conn).some(Boolean);
  const head = `<div class="ambient ${state.isPremium ? "premium" : ""}"></div>
    <div class="app-head"><h1>Home</h1>${servicePill(any ? (state.provider || "youtube") : null, opts)}</div>`;

  if (!any) {
    return head
      + `<div class="home-body"><div class="home-col">${protoConnectCard()}</div></div>`
      + `<div class="spacer-nav"></div>`;
  }

  return head
    + `<div class="home-body">
        <div class="home-col party-col">${protoPartyCard(state)}</div>
        <div class="home-col catalog-col">${protoJumpBackIn(state)}${protoTrending(state)}${state.isPremium || !hasLoginAccount(state.conn, opts) ? "" : premiumBlock()}</div>
      </div>`
    + `<div class="spacer-nav"></div>`;
}

function partyMembers(state) {
  const n = state.party === "playing" ? 5 : state.party === "idle" ? 3 : 4;
  const host = { name: "uvuvuv", you: true, host: true, av: "👽", bg: "" };
  const rest = [
    { name: "Priya", av: "P", bg: "#7b3fd4" },
    { name: "Kabir", av: "K", bg: "#00a8e1" },
    { name: "Aarav", av: "A", bg: "#e2416f" },
    { name: "Mei", av: "M", bg: "#f47521" },
  ];
  if (state.role === "guest") {
    return [
      { name: "Priya", host: true, av: "P", bg: "#7b3fd4" },
      { name: "You", you: true, av: "👽", bg: "" },
      { name: "Kabir", av: "K", bg: "#00a8e1" },
      { name: "Aarav", av: "A", bg: "#e2416f" },
    ].slice(0, Math.max(2, n));
  }
  return [host, ...rest].slice(0, n);
}

function protoAuth() {
  return `<div class="ambient"></div>
    <div class="auth">
      <h1>Get Started</h1>
      <p>Get your party started today with a Teleparty account</p>
      <div class="auth-field">Email or Phone Number</div>
      <button class="btn primary block" data-action="auth-signin" type="button">Create account</button>
      <p class="auth-return">Returning user? <button type="button" data-action="auth-signin">Sign In</button></p>
    </div>`;
}

function playerOverlayHtml(state) {
  const ov = state.playerOverlay;
  if (ov === "loading") {
    return `<button class="pty-ov loading" data-action="dismiss-loading" type="button" aria-label="Loading">
      <span class="load-dots"><i></i><i></i><i></i></span>
    </button>`;
  }
  if (ov === "noauth") {
    const name = PROVIDERS[state.partyProvider]?.name || "this service";
    return `<div class="pty-ov noauth">
      <div class="ov-label">Not Signed In</div>
      <div class="ov-body">You are not signed in or were signed out. Please sign into ${name} to watch this video.</div>
      <button class="btn primary sm" data-action="sign-in-party-service" type="button">Sign in to ${name}</button>
    </div>`;
  }
  if (ov === "unsupported") {
    return `<div class="pty-ov noauth">
      <div class="ov-label">Video Unavailable</div>
      <div class="ov-body">This service is not yet supported on mobile.</div>
    </div>`;
  }
  return "";
}

function protoBrowse(state) {
  const opts = linkOpts(state);
  const hasLinked = PROVIDER_ORDER.some((p) => isLinked(p, opts));
  if (!hasLinked) {
    return `<div class="browse-empty">
      <div class="browse-empty-card">
        <p>Please sign in to your subscribed services to browse and watch with your friends.</p>
        <button class="btn ghost block" data-action="nav" data-tab="accounts" type="button">Add My Accounts</button>
      </div>
    </div>`;
  }
  const pid = state.provider || "netflix";
  const linked = isLinked(pid, opts);
  const body = linked ? webviewPage(pid) : webviewLogin(pid);
  /* Make webview titles clickable */
  const wired = body
    .replace(/class="wv-tile"/g, 'class="wv-tile" data-action="open-title"')
    .replace(/data-content-id="([^"]+)"/g, 'data-id="$1" data-p="' + pid + '"')
    .replace(
      /class="wv-btn block" style="background:([^"]+)"/g,
      'class="wv-btn block" style="background:$1" data-action="complete-signin" data-p="' + pid + '"'
    );
  return `<div class="browse-view">${browseChrome(pid)}<div class="wv-wrap">${wired}</div></div>`;
}

function protoAccounts(state) {
  const opts = linkOpts(state);
  const connected = PROVIDER_ORDER.filter((p) => isLinked(p, opts));
  const freeAvail = FREE_PROVIDERS.filter((p) => !isLinked(p, opts));
  const premAvail = PREMIUM_PROVIDERS.filter((p) => !isLinked(p, opts));

  const card = (pid, kind) => {
    const p = PROVIDERS[pid];
    const premium = p.tier === "premium";
    if (kind === "connected") {
      if (isOpen(pid, linkOpts(state))) {
        return `<button class="acc-card" data-action="browse-service" data-p="${pid}" type="button">
          ${pmark(pid, "lg")}
          <div class="meta">
            <div class="t">${p.name}</div>
            <div class="s">Ready to watch</div>
          </div>
          <span class="acc-chev">›</span>
        </button>`;
      }
      return `<button class="acc-card ${premium ? "prem" : ""}" data-action="manage-service" data-p="${pid}" type="button">
        ${pmark(pid, "lg")}
        <div class="meta">
          <div class="t">${p.name}${premium ? ' <span class="star">★</span>' : ""}</div>
          <div class="s">Connected · tap for options</div>
        </div>
        <span class="acc-chev">›</span>
      </button>`;
    }
    return `<button class="acc-card ${premium ? "prem" : ""}" data-action="connect-service" data-p="${pid}" type="button">
      ${pmark(pid, "lg")}
      <div class="meta">
        <div class="t">${p.name}${premium ? ' <span class="star">★</span>' : ""}</div>
        <div class="s">${premium ? "Premium host" : "Free to connect"}</div>
      </div>
      <span class="acc-action add">+</span>
    </button>`;
  };

  const hero = connected.length === 0 ? `
    <div class="acc-hero empty">
      <div class="count">No accounts yet</div>
      <h2>Connect a service to start watching</h2>
      <div class="sub">You'll sign in on that provider's page. We never see your password.</div>
      <button class="btn primary" data-action="open-switcher" type="button">Connect your first service</button>
    </div>` : `
    <div class="acc-hero">
      <div class="count">${connected.length} connected</div>
      <h2>Your services</h2>
      <div class="sub">Tap a service to browse or remove it.</div>
      <div class="acc-orbit">
        ${connected.map((p) => `<span class="orb" style="background:${PROVIDERS[p].color}">${PROVIDERS[p].mark}</span>`).join("")}
        <span class="more">Ready to party</span>
      </div>
    </div>`;

  return `<div class="ambient ${state.isPremium ? "premium" : ""}" style="height:220px"></div>
    <div class="acc-top">
      <button class="back" data-action="nav" data-tab="profile" type="button">←</button>
      <h1>Manage accounts</h1>
      <p>Add or remove streaming services used by Teleparty.</p>
    </div>
    ${hero}
    ${connected.length ? `<div class="acc-sec"><div class="acc-sec-h">My accounts</div>
      ${connected.map((p) => card(p, "connected")).join("")}</div>` : ""}
    ${premAvail.length ? `<div class="acc-sec"><div class="acc-sec-h prem">Premium services ★</div>
      ${premAvail.map((p) => card(p, "add")).join("")}</div>` : ""}
    ${freeAvail.length ? `<div class="acc-sec"><div class="acc-sec-h">Free services</div>
      ${freeAvail.map((p) => card(p, "add")).join("")}</div>` : ""}
    <div class="acc-footnote">Need more services? The browser extension already supports extras — Android is catching up.</div>
    <div class="spacer-nav"></div>`;
}

function protoStub(title, body, cta, state = {}) {
  return `<div class="ambient ${state.isPremium ? "premium" : ""}" style="height:160px"></div>
    <div style="position:relative;z-index:10;padding:36px 20px 0">
      <h1 style="font-size:24px;font-weight:600;margin-bottom:8px">${title}</h1>
      <p style="font-size:13px;color:var(--text-secondary);line-height:1.55;margin-bottom:18px">${body}</p>
      ${cta || ""}
    </div>
    <div class="spacer-nav"></div>`;
}

function psRow(opts) {
  const {
    icon = "•", title, sub = "", action = "toast", msg = title, tab = "",
    chevron = true, copy = false, trailing = "",
  } = opts;
  const tabAttr = tab ? ` data-tab="${tab}"` : "";
  return `<button class="ps-row" data-action="${action}" data-msg="${msg}"${tabAttr} type="button">
    <span class="ico">${icon}</span>
    <span class="txt"><span class="t">${title}</span>${sub ? `<span class="s">${sub}</span>` : ""}</span>
    ${trailing}
    ${copy ? '<span class="copy">⧉</span>' : ""}
    ${chevron && !copy && !trailing ? '<span class="chev">›</span>' : ""}
  </button>`;
}

function protoProfile(state) {
  const badge = state.isPremium
    ? `<span class="ps-badge premium"><span class="bolt">★</span>Premium</span>`
    : `<span class="ps-badge"><span class="bolt">⚡</span>Free user</span>`;

  const subBlock = state.isPremium
    ? `<div class="ps-sec"><div class="ps-sec-h">Subscription</div>
        <div class="ps-card">
          ${psRow({ icon: "★", title: "Manage Subscription", action: "toast", msg: "Open subscription management" })}
        </div></div>`
    : `<div class="ps-sec"><div class="ps-sec-h">Subscription</div>
        <div class="ps-upsell">
          <div class="row-top">
            <span class="pmark lg" style="background:var(--premium);color:var(--text-on-premium)">★</span>
            <div class="txt">
              <b>Upgrade to Premium</b>
              <span>Host unlimited parties on every supported service and unlock premium hosts.</span>
            </div>
          </div>
          <button class="btn premium sm" data-action="open-paywall" type="button">Try free</button>
        </div>
        <div class="ps-card" style="margin-top:10px">
          ${psRow({ icon: "↺", title: "Restore Subscription", action: "toast", msg: "Restore checked" })}
        </div></div>`;

  const linked = Object.values(state.conn).filter(Boolean).length;

  return `<div class="ambient ${state.isPremium ? "premium" : ""}"></div>
    <div class="ps-top"><h1>Profile</h1></div>
    <div class="ps-hero">
      <div class="ps-avatar">
        <div class="face">👽</div>
        <button class="edit" data-action="toast" data-msg="Edit avatar" type="button">✎</button>
      </div>
      <div class="ps-meta">
        <div class="ps-name">uvuvuv
          <button class="edit-name" data-action="toast" data-msg="Edit nickname" type="button">✎</button>
        </div>
        <div class="ps-email">omnisigiri@gmail.com</div>
        ${badge}
      </div>
    </div>
    <div class="ps-sec"><div class="ps-sec-h">Account</div>
      <div class="ps-card">
        ${psRow({
          icon: "◎",
          title: "Manage my accounts",
          sub: linked ? `${linked} services connected` : "No services connected yet",
          action: "nav",
          tab: "accounts",
        })}
      </div>
    </div>
    ${subBlock}
    <p class="ps-footnote">App preferences live under Settings</p>
    <div class="spacer-nav"></div>`;
}

function protoSettings(state) {
  const compat = !!state.maximizeCompatibility;
  const notif = state.notificationsEnabled !== false;
  return `<div class="ambient ${state.isPremium ? "premium" : ""}"></div>
    <div class="ps-top"><h1>Settings</h1></div>
    <div class="ps-sec" style="margin-top:18px"><div class="ps-sec-h">Video</div>
      <div class="ps-card">
        <div class="ps-row" style="cursor:default">
          <span class="txt">
            <span class="t">Maximize Compatibility</span>
            <span class="s">May improve compatibility with your device or other apps but can reduce video quality.</span>
          </span>
          <button class="ps-toggle ${compat ? "on" : ""}" data-action="toggle-compat" type="button" aria-pressed="${compat}"><i></i></button>
        </div>
      </div>
    </div>
    <div class="ps-sec"><div class="ps-sec-h">Notifications</div>
      <div class="ps-card">
        <div class="ps-row" style="cursor:default">
          <span class="txt">
            <span class="t">Notifications</span>
            <span class="s">Party invites, chat messages, and updates.</span>
          </span>
          <button class="ps-toggle ${notif ? "on" : ""}" data-action="toggle-notif" type="button" aria-pressed="${notif}"><i></i></button>
        </div>
      </div>
    </div>
    <div class="ps-sec"><div class="ps-sec-h">Support &amp; Community</div>
      <div class="ps-card">
        ${psRow({ icon: "✎", title: "Contact Us" })}
        ${psRow({ icon: "◈", title: "Discord" })}
      </div>
    </div>
    <div class="ps-sec"><div class="ps-sec-h">App information</div>
      <div class="ps-card">
        ${psRow({ icon: "ID", title: "User ID: ddab2888…", chevron: false, copy: true, action: "toast", msg: "User ID copied" })}
        ${psRow({ icon: "☰", title: "Additional App Information", action: "open-whatsnew" })}
      </div>
    </div>
    <div class="ps-sec"><div class="ps-sec-h">Developer</div>
      <div class="ps-card">
        ${psRow({ icon: "🐛", title: "Streaming QA tests", action: "toast", msg: "QA tests (debug only)" })}
      </div>
    </div>
    <button class="ps-signout" data-action="ask-signout-tp" type="button">Sign Out</button>
    <p class="ps-footnote">Sign Out uses a danger gradient — not the primary CTA colour</p>
    <div class="spacer-nav"></div>`;
}

function protoParty(state) {
  /* HubPartyFragment shell: ExoPlayer (16:9) → chat → composer */
  const members = partyMembers(state);
  const people = members.length;
  const isGuest = state.role === "guest";
  const hasParty = state.party === "playing" || state.party === "idle";
  const playing = state.party === "playing" && state.partyItem;
  const left = state.party === "left";
  const canHost = Object.values(state.conn).some(Boolean);
  const opts = linkOpts(state);
  const ytReady = isOpen("youtube", opts) && !hasLoginAccount(state.conn, opts);
  const browseLabel = ytReady ? "Browse YouTube" : "Browse videos";
  const joinBtn = `<button class="btn ghost sm" data-action="open-join" type="button" style="margin-top:8px">Join with a link</button>`;

  const ov = state.playerOverlay;
  let player;
  if (playing) {
    const item = state.partyItem;
    const pid = state.partyProvider;
    const chrome = ov ? "" : `
        <div class="top">
          ${pmark(pid)}
          <span class="live-pill"><span class="live-dot"></span>Live</span>
        </div>
        <div class="play-ring" style="--pct:52"><div class="play"></div></div>
        <div class="bottom">
          <div class="ttl">${item.title}</div>
          <div class="meta-row">
            <span>${PROVIDERS[pid].name} · ${isGuest ? "guest" : "synced"}</span>
            <span>48:12 / 1:32:00</span>
          </div>
          <div class="progress" style="margin-top:6px"><i style="width:52%"></i></div>
        </div>`;
    player = `
      <div class="pty-player">
        ${ov === "noauth" ? "" : `<div class="art" style="${art(item.title)}"></div><div class="veil"></div>`}
        ${chrome}
        ${playerOverlayHtml(state)}
      </div>`;
  } else if (hasParty && isGuest) {
    player = `
      <div class="pty-player">
        <div class="pty-player-cta">
          <h2>Waiting for the host</h2>
          <p>Only the host can pick the next video.</p>
        </div>
      </div>`;
  } else if (hasParty) {
    player = `
      <div class="pty-player">
        <div class="pty-player-cta">
          <h2>Pick a video</h2>
          <p>Everyone’s waiting — choose something to watch.</p>
          <button class="btn primary" data-action="fab" type="button">${browseLabel}</button>
        </div>
      </div>`;
  } else if (left) {
    const item = state.partyItem;
    player = `
      <div class="pty-player">
        ${item ? `<div class="art" style="${art(item.title)}"></div><div class="veil"></div>` : ""}
        <div class="pty-player-cta">
          <h2>${item ? "You left this party" : "You left"}</h2>
          <p>${item ? `Friends are still on ${item.title}.` : "Friends are still in the party."}</p>
          <button class="btn primary" data-action="rejoin-party" type="button">Rejoin</button>
          <button class="btn ghost sm" data-action="dismiss-left" type="button" style="margin-top:8px">Not now</button>
        </div>
      </div>`;
  } else if (ytReady) {
    player = `
      <div class="pty-player">
        <div class="pty-player-cta create">
          <h2>Ready to watch</h2>
          <p>YouTube is ready — pick a video and start a party.</p>
          <button class="btn primary" data-action="fab" type="button">Browse YouTube</button>
          ${joinBtn}
        </div>
      </div>`;
  } else {
    player = canHost ? `
      <div class="pty-player">
        <div class="pty-player-cta create">
          <h2>Nothing playing</h2>
          <p>Invite friends, then pick a video to watch together.</p>
          <button class="btn primary" data-action="create-party" type="button">Create a party</button>
          ${joinBtn}
        </div>
      </div>` : `
      <div class="pty-player">
        <div class="pty-player-cta create">
          <h2>Join friends</h2>
          <p>Paste an invite link to watch with them.</p>
          <button class="btn primary" data-action="open-join" type="button">Join with a link</button>
        </div>
      </div>`;
  }

  const bar = hasParty ? `
    <div class="pty-bar">
      <button class="avatars-btn" data-action="open-members" type="button">${avatars(Math.min(people, 4))}</button>
      <button class="who" data-action="open-members" type="button"><b>${people}</b> ${playing ? "watching" : "waiting"}</button>
      <button class="btn ghost sm" data-action="open-invite" type="button">Invite</button>
      <button class="btn ghost sm" data-action="leave-party" type="button">Leave</button>
    </div>` : left ? `
    <div class="pty-bar">
      ${avatars(4)}
      <div class="who">Still going without you</div>
    </div>` : ytReady ? `
    <div class="pty-bar">
      <div class="who">Pick a YouTube video to start</div>
    </div>` : canHost ? `
    <div class="pty-bar">
      <div class="who">Start a party or join with a link</div>
    </div>` : `
    <div class="pty-bar">
      <div class="who">Join with an invite link</div>
    </div>`;

  const hostName = isGuest ? "Priya" : "uvuvuv";
  const feed = playing ? `
    <div class="pty-evt">
      <div class="av">${isGuest ? "P" : "👽"}</div>
      <div><div class="who">${hostName}</div><div class="what">started ${state.partyItem.title}</div></div>
    </div>
    <div class="pty-msg">
      <div class="av" style="background:#7b3fd4">P</div>
      <div class="bubble"><div class="who">Priya</div>I'm in — don't spoil anything</div>
    </div>
    <div class="pty-msg">
      <div class="av" style="background:#00a8e1">K</div>
      <div class="bubble"><div class="who">Kabir</div>Volume check?</div>
    </div>` : hasParty ? `
    <div class="pty-evt">
      <div class="av">${isGuest ? "P" : "👽"}</div>
      <div><div class="who">${hostName}</div><div class="what">created the party 🎉</div></div>
    </div>
    <div class="pty-evt">
      <div class="av" style="background:#e2416f">A</div>
      <div><div class="who">Aarav</div><div class="what">joined the party</div></div>
    </div>` : left ? `
    <div class="pty-evt">
      <div class="av">👽</div>
      <div><div class="who">Teleparty</div><div class="what">You left. Rejoin to chat again.</div></div>
    </div>` : ytReady ? `
    <div class="pty-evt">
      <div class="av">👽</div>
      <div><div class="who">Teleparty</div><div class="what">Browse YouTube to pick something</div></div>
    </div>` : canHost ? `
    <div class="pty-evt">
      <div class="av">👽</div>
      <div><div class="who">Teleparty</div><div class="what">Create a party to chat and watch together</div></div>
    </div>` : `
    <div class="pty-evt">
      <div class="av">👽</div>
      <div><div class="who">Teleparty</div><div class="what">Join a party to watch with friends</div></div>
    </div>`;

  const infoBtn = people < 2
    ? `<button class="invite" data-action="open-invite" type="button" title="Invite">👤+</button>`
    : `<button class="invite members" data-action="open-members" type="button" title="Members">${people}</button>`;

  const composer = hasParty ? `
        <div class="pty-composer">
          ${infoBtn}
          <div class="field">Aa</div>
          <div class="tools">
            <button class="tool" data-action="video-chat" type="button">◉</button>
            <button class="tool" data-action="video-chat" type="button">🎙</button>
            <button class="tool" data-action="toast" data-msg="GIF" type="button">GIF</button>
            <button class="tool" data-action="toast" data-msg="Reactions" type="button">🎉</button>
          </div>
        </div>` : "";

  return `<div class="pty">
      ${player}
      ${bar}
      <div class="pty-chat">
        <div class="pty-feed">${feed}</div>
        ${composer}
      </div>
    </div>`;
}

function protoScreen(state) {
  if (state.tab === "auth") return protoAuth();
  if (state.tab === "browse") return protoBrowse(state);
  if (state.tab === "accounts") return protoAccounts(state);
  if (state.tab === "profile") return protoProfile(state);
  if (state.tab === "settings") return protoSettings(state);
  if (state.tab === "party") return protoParty(state);
  return protoHome(state);
}

function protoOverlay(state) {
  const opts = {
    conn: state.conn,
    isPremium: state.isPremium,
    youtubeLogin: !!state.youtubeLogin,
    empty: !Object.values(state.conn).some(Boolean),
    quota: state.quota,
  };
  if (state.sheet === "switcher") {
    return switcherSheet(state.provider, opts);
  }
  if (state.sheet === "title" && state.focusItem) {
    return startPartySheet(state.focusItem, state.focusProvider, state);
  }
  if (state.sheet === "paywall") {
    return paywallSheet(state);
  }
  if (state.sheet === "signout" && state.signOutPid) {
    return confirmSignOutSheet(state.signOutPid);
  }
  if (state.sheet === "manage" && state.managePid) {
    const p = PROVIDERS[state.managePid];
    return `<div class="scrim" data-action="close-sheet"></div>
      <div class="sheet">
        <div class="sheet-grab"></div>
        <div class="row gap12" style="margin-bottom:14px">${pmark(state.managePid, "lg")}
          <div><div class="sheet-t">${p.name}</div>
            <div class="tiny dim" style="margin-top:4px">Connected</div></div></div>
        <div class="sheet-actions">
          <button class="btn primary block" data-action="browse-service" data-p="${state.managePid}" type="button">Browse ${p.name}</button>
          ${isOpen(state.managePid, linkOpts(state)) ? "" : `<button class="btn ghost block" data-action="ask-signout" data-p="${state.managePid}" type="button">Sign out…</button>`}
          <button class="btn ghost block" data-action="close-sheet" type="button">Cancel</button>
        </div>
      </div>`;
  }
  if (state.sheet === "leave") {
    return `<div class="scrim" data-action="close-sheet"></div>
      <div class="sheet">
        <div class="sheet-grab"></div>
        <div class="sheet-t">Leave party?</div>
        <p class="svc-lead" style="margin-top:8px">Friends stay in the party. You can rejoin from Home or Party.</p>
        <div class="sheet-actions">
          <button class="btn danger block" data-action="confirm-leave" type="button">Leave</button>
          <button class="btn ghost block" data-action="close-sheet" type="button">Stay</button>
        </div>
      </div>`;
  }
  if (state.sheet === "disconnected") {
    return `<div class="scrim" data-action="retry-disconnect"></div>
      <div class="sheet">
        <div class="sheet-grab"></div>
        <div class="sheet-t danger">Disconnected</div>
        <p class="svc-lead" style="margin-top:8px">${state.disconnectMsg || "Your device is not connected to the internet."}</p>
        <div class="sheet-actions">
          <button class="btn primary block" data-action="retry-disconnect" type="button">Retry</button>
          <button class="btn ghost block" data-action="ok-disconnect" type="button">Ok</button>
        </div>
      </div>`;
  }
  if (state.sheet === "switch-warn" && state.pendingSwitchPid) {
    const dest = PROVIDERS[state.pendingSwitchPid]?.name || "this service";
    return `<div class="scrim" data-action="close-sheet"></div>
      <div class="sheet">
        <div class="sheet-grab"></div>
        <div class="sheet-t">Switch service?</div>
        <p class="svc-lead" style="margin-top:8px">Switching your streaming service while there are other members in your party or a video is playing will disconnect you from the party. Would you still like to continue?</p>
        <p class="svc-lead" style="margin-top:8px">Next: ${dest}</p>
        <div class="sheet-actions">
          <button class="btn primary block" data-action="confirm-switch-service" type="button">Continue</button>
          <button class="btn ghost block" data-action="close-sheet" type="button">Cancel</button>
        </div>
      </div>`;
  }
  if (state.sheet === "members") {
    const list = partyMembers(state);
    return `<div class="scrim" data-action="close-sheet"></div>
      <div class="sheet">
        <div class="sheet-grab"></div>
        <div class="row" style="align-items:flex-start;margin-bottom:8px">
          <div class="grow">
            <div class="sheet-t">Members List</div>
            <p class="svc-lead">${list.length} users in the room</p>
          </div>
          <button class="iconbtn" data-action="open-invite" type="button" title="Invite">👤+</button>
          <button class="iconbtn" data-action="leave-party" type="button" title="Leave">⎋</button>
        </div>
        <div class="vol-row"><span>Video Content</span><i></i></div>
        <div class="member-list">${list.map((m) => `
          <div class="member-row">
            <span class="av" style="${m.bg ? `background:${m.bg}` : ""}">${m.av}</span>
            <span class="grow">${m.name}${m.you ? " (you)" : ""}</span>
            ${m.host ? '<span class="host-pill">Host</span>' : ""}
          </div>`).join("")}</div>
      </div>`;
  }
  if (state.sheet === "invite") {
    return `<div class="scrim" data-action="close-sheet"></div>
      <div class="sheet">
        <div class="sheet-grab"></div>
        <div class="sheet-t">Invite to party</div>
        <p class="svc-lead" style="margin-top:8px">Share this link. Friends open it in Teleparty — there’s no code to type.</p>
        <div class="d-invite" style="margin-top:12px"><code>teleparty.com/join/8FK2QX</code>
          <button class="btn ghost sm" data-action="copy-invite" type="button">Copy</button></div>
        <div class="sheet-actions">
          <button class="btn primary block" data-action="copy-invite" type="button">Copy link</button>
          <button class="btn ghost block" data-action="share-invite" type="button">Share</button>
        </div>
      </div>`;
  }
  if (state.sheet === "join") {
    return `<div class="scrim" data-action="close-sheet"></div>
      <div class="sheet">
        <div class="sheet-grab"></div>
        <div class="sheet-t">Join a party</div>
        <p class="svc-lead" style="margin-top:8px">Paste an invite link. Teleparty doesn’t use codes.</p>
        <input class="join-input" data-join-url type="text" placeholder="teleparty.com/join/…" value="${state.joinUrl || ""}" />
        <button class="btn ghost sm" data-action="fill-demo-join" type="button" style="margin-top:8px">Use demo link</button>
        <div class="sheet-actions">
          <button class="btn primary block" data-action="submit-join" type="button">Join</button>
          <button class="btn ghost block" data-action="close-sheet" type="button">Cancel</button>
        </div>
      </div>`;
  }
  if (state.sheet === "whatsnew") {
    return `<div class="scrim" data-action="close-sheet"></div>
      <div class="sheet sheet-paywall">
        <div class="sheet-grab"></div>
        <div class="sheet-t">What’s New</div>
        <div class="wn">
          <div class="wn-h">Crunchyroll</div>
          <ul>
            <li>Audio options other than the original language are now available</li>
            <li>All subtitles options for each video are now available</li>
          </ul>
        </div>
        <div class="sheet-actions">
          <button class="btn primary block" data-action="close-sheet" type="button">Continue</button>
        </div>
      </div>`;
  }
  if (state.sheet === "netflix-confirm") {
    return `<div class="scrim" data-action="close-sheet"></div>
      <div class="sheet">
        <div class="sheet-grab"></div>
        <div class="sheet-t">We're experiencing a temporary Netflix sign-in issue in Teleparty.</div>
        <p class="svc-lead" style="margin-top:8px">Netflix sign-in is currently down. Continue your Netflix Party with an alternate sign-in while we work on a fix.</p>
        <div class="sheet-actions">
          <button class="btn primary block" data-action="netflix-continue" type="button">Continue</button>
          <button class="btn ghost block" data-action="close-sheet" type="button">Cancel</button>
        </div>
      </div>`;
  }
  if (state.sheet === "netflix-login") {
    return `<div class="scrim" data-action="close-sheet"></div>
      <div class="sheet">
        <div class="sheet-grab"></div>
        <div class="sheet-t danger">Sign in to Netflix</div>
        <p class="svc-lead" style="margin-top:8px">Enter your Netflix credentials to continue</p>
        <input class="join-input" type="email" placeholder="Email" value="omnisigiri@gmail.com" readonly />
        <input class="join-input" type="password" placeholder="Password" value="••••••••" readonly />
        <div class="sheet-actions">
          <button class="btn primary block" data-action="netflix-signin" type="button">Sign In</button>
          <button class="btn ghost block" data-action="close-sheet" type="button">Cancel</button>
        </div>
      </div>`;
  }
  if (state.sheet === "signout-tp") {
    return `<div class="scrim" data-action="close-sheet"></div>
      <div class="sheet">
        <div class="sheet-grab"></div>
        <div class="sheet-t">Sign out of Teleparty?</div>
        <p class="svc-lead" style="margin-top:8px">You’ll need to sign in again to use the app. Streaming accounts stay saved on this device.</p>
        <div class="sheet-actions">
          <button class="btn danger block" data-action="confirm-signout-tp" type="button">Sign Out</button>
          <button class="btn ghost block" data-action="close-sheet" type="button">Cancel</button>
        </div>
      </div>`;
  }
  if (state.party === "idle" && state.tab === "browse") {
    return dock("picking", { people: 5 });
  }
  if ((state.party === "playing" || state.party === "idle") && state.tab !== "party" && state.tab !== "home") {
    const title = state.partyItem?.title || "Party";
    return dock("return", { title, people: state.party === "playing" ? 5 : 3 });
  }
  if (state.party === "left" && state.partyItem && state.tab !== "party" && state.tab !== "home") {
    return dock("rejoin", { title: state.partyItem.title, people: 4 });
  }
  return "";
}

function protoToast(host, msg) {
  let el = host.querySelector(".proto-toast");
  if (!el) {
    el = document.createElement("div");
    el.className = "proto-toast";
    host.appendChild(el);
  }
  el.textContent = msg;
  el.classList.add("show");
  clearTimeout(el._t);
  el._t = setTimeout(() => el.classList.remove("show"), 1600);
}

const PAGE_SCENES = {
  home: [
    { id: "full", label: "With accounts", hint: "You’re in a live party" },
    { id: "left", label: "Left · rejoin", hint: "You left — friends still watching" },
    { id: "home-none", label: "No party yet", hint: "Create a party + trending" },
    { id: "empty", label: "New user", hint: "YouTube ready — no watch history" },
    { id: "empty-connect", label: "New user · connect", hint: "Connect card only — nothing to resume" },
    { id: "browse", label: "Browse", hint: "Provider page in the WebView" },
    { id: "browse-empty", label: "Browse · empty", hint: "No accounts — Add My Accounts" },
    { id: "switcher", label: "Switch services", hint: "Sheet over Home" },
    { id: "paywall", label: "Premium paywall", hint: "Crunchyroll as a free user" },
    { id: "paywall-quota", label: "Quota exhausted", hint: "No free parties left this week" },
    { id: "netflix-reauth", label: "Netflix re-auth", hint: "Session expired mid-browse" },
  ],
  party: [
    { id: "party-live", label: "Live", hint: "Video playing + chat" },
    { id: "party-idle", label: "Waiting", hint: "Party started, pick a video" },
    { id: "party-left", label: "Left · rejoin", hint: "Session still going without you" },
    { id: "party-yt", label: "YouTube ready", hint: "Browse YouTube — no party yet" },
    { id: "party-none", label: "None", hint: "Create or join" },
    { id: "party-join", label: "Join only", hint: "Paste an invite link" },
    { id: "party-join-link", label: "Join · link", hint: "teleparty.com/join/…" },
    { id: "party-noauth", label: "Not signed in", hint: "Guest — party’s service isn’t linked" },
    { id: "party-loading", label: "Loading", hint: "Buffering overlay on the player" },
    { id: "party-disconnected", label: "Disconnected", hint: "Retry or leave" },
    { id: "party-switch", label: "Switch service", hint: "Changing service mid-party" },
    { id: "party-guest", label: "Guest", hint: "Only the host changes the video" },
    { id: "party-members", label: "Members", hint: "List + invite + leave" },
    { id: "party-invite", label: "Invite", hint: "Copy / share the join link" },
    { id: "party-unsupported", label: "Unsupported", hint: "Service not on mobile yet" },
  ],
  profile: [
    { id: "profile", label: "Profile", hint: "Identity + subscription" },
    { id: "profile", label: "Profile · premium", hint: "Gold backdrop + gold chrome", premium: true, galleryOnly: true },
    { id: "settings", label: "Settings", hint: "Preferences + Sign out" },
    { id: "whatsnew", label: "What’s New", hint: "Version bump interstitial" },
    { id: "signed-out", label: "Signed out", hint: "Back to Get Started" },
  ],
  accounts: [
    { id: "accounts", label: "Connected", hint: "Chevron → options" },
    { id: "accounts-empty", label: "None yet", hint: "Connect your first service" },
    { id: "signout", label: "Sign out", hint: "Confirm sheet" },
  ],
};

const PAGE_LEGEND = {
  home: "Tap a snapshot to load it below. Chips set the state; Phone / Foldable / iPad / iPhone Duo switch the frame. Tap pill / FAB / titles inside. Browse · empty is Hub Home with no accounts.",
  party: "Same ExoPlayer shell as production — 16:9 on top, chat below. Host vs guest, members, invite link, overlays.",
  profile: "Profile is the person; Settings is the knobs. What’s New and Sign out → Get Started live here.",
  accounts: "Manage accounts links and unlinks. Sign out lives once, in the confirm sheet.",
};

function freshState() {
  return {
    tab: "home",
    provider: "crunchyroll",
    filter: "all",
    sheet: null,
    focusItem: null,
    focusProvider: null,
    signOutPid: null,
    managePid: null,
    isPremium: false,
    party: "playing",
    partyItem: TRENDING.netflix[0],
    partyProvider: "netflix",
    youtubeLogin: false,
    conn: defaultConn("full"),
    hasHistory: true,
    maximizeCompatibility: false,
    notificationsEnabled: true,
    playerOverlay: null,
    pendingSwitchPid: null,
    disconnectMsg: null,
    quota: { crunchyroll: 1, paramount: 1 },
    role: "host",
    paywallSource: null,
    paywallPid: null,
    paywallPeriod: "yearly",
    joinUrl: "",
    _scenario: "full",
    device: "compact",
  };
}

function applyScenario(state, name) {
  state._scenario = name;
  state.sheet = null;
  state.focusItem = null;
  state.focusProvider = null;
  state.signOutPid = null;
  state.managePid = null;
  state.youtubeLogin = false;
  state.hasHistory = false;
  state.playerOverlay = null;
  state.pendingSwitchPid = null;
  state.disconnectMsg = null;
  state.quota = { crunchyroll: 1, paramount: 1 };
  state.role = "host";
  state.paywallSource = null;
  state.paywallPid = null;
  state.paywallPeriod = "yearly";
  state.joinUrl = "";

  const withAccounts = () => {
    state.conn = defaultConn("full");
    state.provider = "crunchyroll";
    state.filter = "all";
    state.partyItem = TRENDING.netflix[0];
    state.partyProvider = "netflix";
    state.hasHistory = true;
  };

  if (name === "empty" || name === "empty-connect") {
    state.youtubeLogin = name === "empty-connect";
    state.conn = defaultConn("empty", { youtubeLogin: state.youtubeLogin });
    state.provider = state.youtubeLogin ? null : "youtube";
    state.filter = state.youtubeLogin ? "netflix" : "all";
    state.party = "none";
    state.tab = "home";
    return;
  }
  if (name === "left") {
    withAccounts();
    state.party = "left";
    state.tab = "home";
    return;
  }
  if (name === "home-none") {
    withAccounts();
    state.party = "none";
    state.tab = "home";
    return;
  }
  if (name === "browse") {
    withAccounts();
    state.party = "playing";
    state.tab = "browse";
    state.provider = "netflix";
    return;
  }
  if (name === "browse-empty") {
    state.youtubeLogin = true;
    state.conn = defaultConn("empty", { youtubeLogin: true });
    state.provider = null;
    state.filter = "netflix";
    state.party = "none";
    state.tab = "browse";
    return;
  }
  if (name === "switcher") {
    withAccounts();
    state.party = "playing";
    state.tab = "home";
    state.sheet = "switcher";
    return;
  }
  if (name === "party-idle") {
    withAccounts();
    state.party = "idle";
    state.tab = "party";
    return;
  }
  if (name === "party-live") {
    withAccounts();
    state.party = "playing";
    state.tab = "party";
    return;
  }
  if (name === "party-left") {
    withAccounts();
    state.party = "left";
    state.tab = "party";
    return;
  }
  if (name === "party-yt") {
    state.youtubeLogin = false;
    state.conn = defaultConn("empty", { youtubeLogin: false });
    state.provider = "youtube";
    state.filter = "all";
    state.party = "none";
    state.hasHistory = false;
    state.tab = "party";
    return;
  }
  if (name === "party-none") {
    withAccounts();
    state.party = "none";
    state.tab = "party";
    return;
  }
  if (name === "party-join") {
    state.youtubeLogin = true;
    state.conn = defaultConn("empty", { youtubeLogin: true });
    state.provider = null;
    state.party = "none";
    state.tab = "party";
    return;
  }
  if (name === "party-noauth") {
    withAccounts();
    state.conn.netflix = false;
    state.party = "playing";
    state.tab = "party";
    state.playerOverlay = "noauth";
    return;
  }
  if (name === "party-loading") {
    withAccounts();
    state.party = "playing";
    state.tab = "party";
    state.playerOverlay = "loading";
    return;
  }
  if (name === "party-disconnected") {
    withAccounts();
    state.party = "playing";
    state.tab = "party";
    state.sheet = "disconnected";
    state.disconnectMsg = "Your device is not connected to the internet.";
    return;
  }
  if (name === "party-switch") {
    withAccounts();
    state.party = "playing";
    state.tab = "party";
    state.pendingSwitchPid = "disney";
    state.sheet = "switch-warn";
    return;
  }
  if (name === "party-guest") {
    withAccounts();
    state.party = "playing";
    state.tab = "party";
    state.role = "guest";
    return;
  }
  if (name === "party-members") {
    withAccounts();
    state.party = "playing";
    state.tab = "party";
    state.sheet = "members";
    return;
  }
  if (name === "party-invite") {
    withAccounts();
    state.party = "playing";
    state.tab = "party";
    state.sheet = "invite";
    return;
  }
  if (name === "party-unsupported") {
    withAccounts();
    state.party = "playing";
    state.tab = "party";
    state.playerOverlay = "unsupported";
    return;
  }
  if (name === "party-join-link") {
    state.youtubeLogin = true;
    state.conn = defaultConn("empty", { youtubeLogin: true });
    state.provider = null;
    state.party = "none";
    state.tab = "party";
    state.sheet = "join";
    return;
  }
  if (name === "paywall") {
    withAccounts();
    state.party = "none";
    state.tab = "home";
    state.sheet = "paywall";
    state.paywallSource = "provider";
    state.paywallPid = "crunchyroll";
    return;
  }
  if (name === "paywall-quota") {
    withAccounts();
    state.quota = { crunchyroll: 0, paramount: 0 };
    state.party = "none";
    state.tab = "home";
    state.sheet = "paywall";
    state.paywallSource = "quota";
    state.paywallPid = "crunchyroll";
    return;
  }
  if (name === "netflix-reauth") {
    withAccounts();
    state.party = "playing";
    state.tab = "browse";
    state.provider = "netflix";
    state.sheet = "netflix-confirm";
    return;
  }
  if (name === "whatsnew") {
    withAccounts();
    state.party = "none";
    state.tab = "settings";
    state.sheet = "whatsnew";
    return;
  }
  if (name === "signed-out") {
    state.tab = "auth";
    state.party = "none";
    state.conn = defaultConn("empty", { youtubeLogin: true });
    return;
  }
  if (name === "accounts") {
    withAccounts();
    state.party = "none";
    state.tab = "accounts";
    return;
  }
  if (name === "accounts-empty") {
    state.youtubeLogin = true;
    state.conn = defaultConn("empty", { youtubeLogin: true });
    state.provider = null;
    state.party = "none";
    state.tab = "accounts";
    return;
  }
  if (name === "signout") {
    withAccounts();
    state.party = "none";
    state.tab = "accounts";
    state.signOutPid = "netflix";
    state.sheet = "signout";
    return;
  }
  if (name === "profile") {
    withAccounts();
    state.party = "none";
    state.tab = "profile";
    return;
  }
  if (name === "settings") {
    withAccounts();
    state.party = "none";
    state.tab = "settings";
    return;
  }
  withAccounts();
  state.party = "playing";
  state.tab = "home";
}

function protoNav(state) {
  if (state.tab === "auth") return "";
  const any = Object.values(state.conn).some(Boolean);
  const fabPid = any ? state.provider : null;
  return nav(state.tab === "accounts" ? "profile" : state.tab, fabPid, {
    conn: state.conn,
    youtubeLogin: !!state.youtubeLogin,
    partyBadge: state.party === "playing" || state.party === "idle" || state.party === "left",
  });
}

function dualRightTab(state) {
  if (state.tab && state.tab !== "home") return state.tab;
  if (state.party === "playing" || state.party === "idle" || state.party === "left") return "party";
  return "browse";
}

function protoPhoneHtml(state, extraClass = "") {
  const overlay = protoOverlay(state);
  const device = state.device || "compact";
  const tierClass = state.isPremium ? " tier-premium" : "";
  const cls = `phone${tierClass} device-${device}${extraClass ? " " + extraClass : ""}`;
  const navHtml = protoNav(state);

  if (device === "dual") {
    const rightState = Object.assign({}, state, { tab: dualRightTab(state) });
    const leftNav = protoNav(Object.assign({}, state, { tab: "home" }));
    const rightNav = protoNav(rightState);
    return `<div class="${cls}">
      <div class="duo-pane pane-a">
        ${statusBar()}
        <div class="screen">${protoHome(state)}</div>
        ${leftNav}
      </div>
      <div class="duo-hinge" aria-hidden="true"></div>
      <div class="duo-pane pane-b">
        ${statusBar()}
        <div class="screen">${protoScreen(rightState)}</div>
        ${rightNav}
      </div>
      ${overlay}
    </div>`;
  }

  return phone(protoScreen(state), navHtml, overlay).replace(
    'class="phone"',
    `class="${cls}"`
  );
}

function sceneChipRows(scenes) {
  const n = scenes.length;
  const rows = n <= 6
    ? [scenes]
    : n <= 12
      ? [scenes.slice(0, Math.ceil(n / 2)), scenes.slice(Math.ceil(n / 2))]
      : (() => {
          const size = Math.ceil(n / 3);
          return [scenes.slice(0, size), scenes.slice(size, size * 2), scenes.slice(size * 2)];
        })();
  return rows.map((row) =>
    `<div class="proto-chips">${row.map((s) =>
      `<button type="button" data-scenario="${s.id}" class="proto-chip">${s.label}</button>`
    ).join("")}</div>`
  ).join("");
}

function inferPage(options = {}) {
  if (options.page) return options.page;
  if (options.tab === "party") return "party";
  if (options.tab === "profile" || options.tab === "settings") return "profile";
  if (options.tab === "accounts") return "accounts";
  return "home";
}

function mountGallery(root, page) {
  const scenes = PAGE_SCENES[page] || [];
  root.className = "state-gallery";
  root.innerHTML = scenes.map((scene) => {
    const state = freshState();
    applyScenario(state, scene.id);
    state.isPremium = !!scene.premium;
    return `<div class="frame-wrap gallery-card" data-scene="${scene.id}" data-premium="${scene.premium ? "1" : "0"}" tabindex="0" role="button">
      ${protoPhoneHtml(state, "snapshot")}
      <div class="frame-caption"><h3>${scene.label}</h3><p>${scene.hint}</p></div>
    </div>`;
  }).join("");
}

function mountInteractive(root, options = {}) {
  const page = inferPage(options);
  const scenes = (PAGE_SCENES[page] || []).filter((s) => !s.galleryOnly);
  const start = options.start || scenes[0]?.id || "full";
  const state = freshState();
  applyScenario(state, start);
  state.isPremium = !!options.isPremium;

  const stage = document.createElement("div");
  stage.className = "proto-play";
  stage.innerHTML = `
    <div class="proto-toolbar">
      <div class="proto-toolbar-top">
        <span class="proto-hint">Interactive — tap inside the phone</span>
        <button type="button" class="proto-fs-btn" data-fs="1">Full screen</button>
      </div>
      ${sceneChipRows(scenes)}
      <div class="proto-chips proto-tier">
        <button type="button" data-tier="free" class="proto-chip">Free · purple bg</button>
        <button type="button" data-tier="premium" class="proto-chip">Premium · gold bg</button>
      </div>
      <div class="proto-chips proto-device">
        <button type="button" data-device="compact" class="proto-chip">Phone</button>
        <button type="button" data-device="medium" class="proto-chip">Foldable</button>
        <button type="button" data-device="expanded" class="proto-chip">iPad</button>
        <button type="button" data-device="dual" class="proto-chip">iPhone Duo</button>
      </div>
    </div>
    <div class="proto-phone-wrap"></div>
    <p class="proto-legend">${PAGE_LEGEND[page] || ""}</p>
  `;
  root.appendChild(stage);
  const wrap = stage.querySelector(".proto-phone-wrap");
  const fsObserver = new ResizeObserver(() => fitFsPhone());

  function fitFsPhone() {
    const sizer = wrap.querySelector(".proto-phone-sizer");
    const phoneEl = wrap.querySelector(".phone");
    if (!sizer || !phoneEl) return;
    if (!stage.classList.contains("is-fs")) {
      phoneEl.style.transform = "";
      phoneEl.style.position = "";
      phoneEl.style.top = "";
      phoneEl.style.left = "";
      sizer.style.width = "";
      sizer.style.height = "";
      return;
    }
    const w = phoneEl.offsetWidth;
    const h = phoneEl.offsetHeight;
    const box = wrap.getBoundingClientRect();
    const availW = Math.max(0, box.width - 24);
    const availH = Math.max(0, box.height - 24);
    if (!w || !h || !availW || !availH) return;
    const scale = Math.min(availW / w, availH / h);
    sizer.style.width = `${Math.round(w * scale)}px`;
    sizer.style.height = `${Math.round(h * scale)}px`;
    phoneEl.style.position = "absolute";
    phoneEl.style.top = "0";
    phoneEl.style.left = "0";
    phoneEl.style.transform = `scale(${scale})`;
    phoneEl.style.transformOrigin = "top left";
  }
  fsObserver.observe(wrap);

  function render() {
    wrap.innerHTML = `<div class="proto-phone-sizer">${protoPhoneHtml(state)}</div>`;
    stage.querySelectorAll("[data-scenario]").forEach((c) => {
      c.classList.toggle("on", c.dataset.scenario === state._scenario);
    });
    stage.querySelectorAll("[data-tier]").forEach((c) => {
      const want = state.isPremium ? "premium" : "free";
      c.classList.toggle("on", c.dataset.tier === want);
    });
    stage.querySelectorAll("[data-device]").forEach((c) => {
      c.classList.toggle("on", c.dataset.device === (state.device || "compact"));
    });
    requestAnimationFrame(() => requestAnimationFrame(fitFsPhone));
  }

  function setScenario(name) {
    clearTimeout(stage._loadT);
    const keepPremium = state.isPremium;
    const keepDevice = state.device || "compact";
    applyScenario(state, name);
    state.isPremium = keepPremium;
    state.device = keepDevice;
    render();
  }

  function showScene(name, premium) {
    clearTimeout(stage._loadT);
    const keepDevice = state.device || "compact";
    applyScenario(state, name);
    state.isPremium = !!premium;
    state.device = keepDevice;
    render();
  }

  function setFsButton(on) {
    const btn = stage.querySelector("[data-fs]");
    if (btn) btn.textContent = on ? "Exit full screen" : "Full screen";
  }

  function enterFs() {
    stage.classList.add("is-fs");
    document.body.classList.add("proto-fs-lock");
    setFsButton(true);
    requestAnimationFrame(() => requestAnimationFrame(fitFsPhone));
    const req = stage.requestFullscreen || stage.webkitRequestFullscreen;
    if (req) req.call(stage).catch(() => {});
  }

  function exitFs() {
    stage.classList.remove("is-fs");
    document.body.classList.remove("proto-fs-lock");
    setFsButton(false);
    fitFsPhone();
    if (document.fullscreenElement === stage || document.webkitFullscreenElement === stage) {
      (document.exitFullscreen || document.webkitExitFullscreen).call(document);
    }
  }

  function toggleFs() {
    if (stage.classList.contains("is-fs")) exitFs();
    else enterFs();
  }

  document.addEventListener("fullscreenchange", () => {
    if (!document.fullscreenElement && stage.classList.contains("is-fs")) exitFs();
    else requestAnimationFrame(() => requestAnimationFrame(fitFsPhone));
  });
  document.addEventListener("webkitfullscreenchange", () => {
    if (!document.webkitFullscreenElement && stage.classList.contains("is-fs")) exitFs();
    else requestAnimationFrame(() => requestAnimationFrame(fitFsPhone));
  });
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && stage.classList.contains("is-fs")) exitFs();
  });
  window.addEventListener("resize", fitFsPhone);

  stage.addEventListener("click", (e) => {
    const fsBtn = e.target.closest("[data-fs]");
    if (fsBtn && stage.contains(fsBtn)) {
      toggleFs();
      return;
    }

    const scenario = e.target.closest("[data-scenario]");
    if (scenario && stage.contains(scenario)) {
      setScenario(scenario.dataset.scenario);
      return;
    }

    const tier = e.target.closest("[data-tier]");
    if (tier && stage.contains(tier)) {
      state.isPremium = tier.dataset.tier === "premium";
      state.sheet = null;
      protoToast(stage, state.isPremium ? "Premium backdrop (ic_premium_bg)" : "Free backdrop (tp_gradient_bg)");
      render();
      return;
    }

    const deviceChip = e.target.closest("[data-device]");
    if (deviceChip && stage.contains(deviceChip)) {
      state.device = deviceChip.dataset.device;
      protoToast(stage, ({
        compact: "Phone · compact · bottom bar",
        medium: "Foldable · more columns, same tile size",
        expanded: "iPad · nav rail · two-column Home",
        dual: "iPhone Duo · two phones, Home | Party across the hinge",
      })[state.device] || state.device);
      render();
      return;
    }

    const t = e.target.closest("[data-action]");
    if (!t || !wrap.contains(t)) {
      /* trending chips */
      const tab = e.target.closest(".ptab");
      if (tab && wrap.contains(tab)) {
        state.filter = tab.dataset.p;
        render();
      }
      return;
    }

    const action = t.dataset.action;
    const pid = t.dataset.p;

    if (action === "close-sheet") {
      if (state.sheet === "switch-warn") state.pendingSwitchPid = null;
      if (state.sheet === "disconnected") {
        state.sheet = null;
        protoToast(stage, "Reconnected");
        render();
        return;
      }
      state.sheet = null;
      render();
      return;
    }
    if (action === "open-switcher") { state.sheet = "switcher"; render(); return; }
    if (action === "open-paywall") {
      state.sheet = "paywall";
      state.paywallSource = "provider";
      state.paywallPid = state.paywallPid || "crunchyroll";
      render();
      return;
    }
    if (action === "paywall-period") {
      state.paywallPeriod = t.dataset.period || "yearly";
      render();
      return;
    }
    if (action === "start-trial") {
      state.isPremium = true;
      state.sheet = null;
      protoToast(stage, "Premium trial started");
      render();
      return;
    }
    if (action === "open-members") {
      state.sheet = "members";
      render();
      return;
    }
    if (action === "open-invite") {
      state.sheet = "invite";
      render();
      return;
    }
    if (action === "copy-invite") {
      protoToast(stage, "Invite link copied");
      return;
    }
    if (action === "share-invite") {
      protoToast(stage, "Share sheet — Messages, WhatsApp, Copy");
      return;
    }
    if (action === "open-join") {
      state.sheet = "join";
      render();
      return;
    }
    if (action === "fill-demo-join") {
      state.joinUrl = "https://teleparty.com/join/8FK2QX";
      render();
      return;
    }
    if (action === "submit-join") {
      const input = wrap.querySelector("[data-join-url]");
      const url = ((input && input.value) || state.joinUrl || "").trim();
      const ok = /teleparty\.com\/join\/|teleparty:\/\/join\//i.test(url);
      if (!ok) {
        protoToast(stage, "Paste a link like teleparty.com/join/8FK2QX");
        return;
      }
      state.role = "guest";
      state.party = "playing";
      state.partyItem = TRENDING.netflix[0];
      state.partyProvider = "netflix";
      state.sheet = null;
      state.tab = "party";
      if (!state.conn.netflix && !isOpen("netflix", linkOpts(state))) {
        state.playerOverlay = "noauth";
      }
      protoToast(stage, "Joined as guest");
      render();
      return;
    }
    if (action === "video-chat") {
      if (!state.isPremium) {
        state.sheet = "paywall";
        state.paywallSource = "provider";
        state.paywallPid = "crunchyroll";
        protoToast(stage, "Video chat is a Premium feature");
        render();
        return;
      }
      protoToast(stage, "Video chat");
      return;
    }
    if (action === "open-whatsnew") {
      state.sheet = "whatsnew";
      render();
      return;
    }
    if (action === "ask-signout-tp") {
      state.sheet = "signout-tp";
      render();
      return;
    }
    if (action === "confirm-signout-tp") {
      state.tab = "auth";
      state.sheet = null;
      state.party = "none";
      protoToast(stage, "Signed out");
      render();
      return;
    }
    if (action === "auth-signin") {
      applyScenario(state, "full");
      state.isPremium = false;
      protoToast(stage, "Signed in");
      render();
      return;
    }
    if (action === "netflix-continue") {
      state.sheet = "netflix-login";
      render();
      return;
    }
    if (action === "netflix-signin") {
      state.sheet = null;
      state.conn.netflix = true;
      protoToast(stage, "Signed in to Netflix");
      render();
      return;
    }
    if (action === "toast") {
      if (/Premium trial/i.test(t.dataset.msg || "")) {
        state.isPremium = true;
        render();
      }
      protoToast(stage, t.dataset.msg || "Done");
      return;
    }
    if (action === "toggle-compat") {
      state.maximizeCompatibility = !state.maximizeCompatibility;
      render();
      return;
    }
    if (action === "toggle-notif") {
      state.notificationsEnabled = !state.notificationsEnabled;
      render();
      return;
    }
    if (action === "create-party") {
      if (state.role === "guest" && inLiveParty(state)) {
        protoToast(stage, "Only the host can change the video");
        return;
      }
      if (!Object.values(state.conn).some(Boolean)) {
        state.sheet = "switcher";
        protoToast(stage, "Add a service first");
        render();
        return;
      }
      state.role = "host";
      state.party = "idle";
      state.partyItem = null;
      state.tab = "party";
      protoToast(stage, "Party started");
      render();
      return;
    }
    if (action === "leave-party") {
      state.sheet = "leave";
      render();
      return;
    }
    if (action === "retry-disconnect") {
      state.sheet = null;
      protoToast(stage, "Reconnected");
      render();
      return;
    }
    if (action === "ok-disconnect") {
      state.party = "none";
      state.partyItem = null;
      state.playerOverlay = null;
      state.sheet = null;
      protoToast(stage, "Left the party");
      render();
      return;
    }
    if (action === "dismiss-loading") {
      state.playerOverlay = null;
      render();
      return;
    }
    if (action === "sign-in-party-service") {
      const pid = state.partyProvider;
      state.provider = pid;
      state.tab = "browse";
      protoToast(stage, "Sign in to " + PROVIDERS[pid].name);
      render();
      return;
    }
    if (action === "confirm-switch-service") {
      const pid = state.pendingSwitchPid;
      if (!pid) { state.sheet = null; render(); return; }
      state.party = "none";
      state.partyItem = null;
      state.playerOverlay = null;
      state.pendingSwitchPid = null;
      if (PROVIDERS[pid].tier === "premium" && !state.isPremium) {
        const left = state.quota[pid] || 0;
        if (left <= 0) {
          state.sheet = "paywall";
          state.paywallSource = "quota";
          state.paywallPid = pid;
          render();
          return;
        }
      }
      if (!state.conn[pid]) {
        state.conn[pid] = true;
        protoToast(stage, "Left party · opening " + PROVIDERS[pid].name + " sign-in");
      } else {
        protoToast(stage, "Left party · " + PROVIDERS[pid].name);
      }
      state.provider = pid;
      state.sheet = null;
      state.tab = "browse";
      render();
      return;
    }
    if (action === "confirm-leave") {
      state.party = "left";
      state.sheet = null;
      state.playerOverlay = null;
      protoToast(stage, "Left the party");
      render();
      return;
    }
    if (action === "rejoin-party") {
      state.party = state.partyItem ? "playing" : "idle";
      state.sheet = null;
      state.tab = "party";
      protoToast(stage, "Rejoined");
      render();
      return;
    }
    if (action === "dismiss-left") {
      state.party = "none";
      state.partyItem = null;
      state.sheet = null;
      protoToast(stage, "Okay — join again with a code anytime");
      render();
      return;
    }
    if (action === "nav") {
      state.tab = t.dataset.tab;
      state.sheet = null;
      render();
      return;
    }
    if (action === "fab") {
      if (!Object.values(state.conn).some(Boolean)) {
        state.sheet = "switcher";
      } else {
        state.tab = "browse";
        state.sheet = null;
      }
      render();
      return;
    }
    if (action === "pick-service") {
      const p = PROVIDERS[pid];
      if (p.tier === "premium" && !state.isPremium) {
        const left = state.quota[pid] || 0;
        if (left <= 0) {
          state.sheet = "paywall";
          state.paywallSource = "quota";
          state.paywallPid = pid;
          render();
          return;
        }
      }
      if (inLiveParty(state) && pid !== (state.partyProvider || state.provider)) {
        state.pendingSwitchPid = pid;
        state.sheet = "switch-warn";
        render();
        return;
      }
      if (!state.conn[pid]) {
        state.conn[pid] = true;
        state.provider = pid;
        state.sheet = null;
        state.tab = "browse";
        protoToast(stage, "Opening " + p.name + " sign-in");
      } else {
        state.provider = pid;
        state.sheet = null;
        state.tab = "browse";
      }
      render();
      return;
    }
    if (action === "connect-service") {
      if (inLiveParty(state) && pid !== (state.partyProvider || state.provider)) {
        state.pendingSwitchPid = pid;
        state.sheet = "switch-warn";
        render();
        return;
      }
      state.provider = pid;
      state.sheet = null;
      state.tab = "browse";
      protoToast(stage, "Sign in to " + PROVIDERS[pid].name);
      render();
      return;
    }
    if (action === "complete-signin") {
      state.conn[pid] = true;
      state.provider = pid;
      if (state.playerOverlay === "noauth" && pid === state.partyProvider) {
        state.playerOverlay = null;
        state.tab = "party";
        protoToast(stage, "Signed in — watching on " + PROVIDERS[pid].name);
      } else {
        protoToast(stage, "Signed in to " + PROVIDERS[pid].name);
      }
      render();
      return;
    }
    if (action === "open-title") {
      if (!isLinked(pid, linkOpts(state))) {
        state.provider = pid;
        state.sheet = null;
        state.tab = "browse";
        protoToast(stage, "Sign in to " + PROVIDERS[pid].name);
        render();
        return;
      }
      const found = findTitle(t.dataset.id) || { item: { id: t.dataset.id, title: "Title", sub: "" }, provider: pid };
      state.focusItem = found.item;
      state.focusProvider = pid;
      state.sheet = "title";
      render();
      return;
    }
    if (action === "start-party") {
      if (state.role === "guest") {
        protoToast(stage, "Only the host can change the video");
        return;
      }
      const hostPid = state.focusProvider;
      if (hostPid && PROVIDERS[hostPid].tier === "premium" && !state.isPremium) {
        const left = state.quota[hostPid] || 0;
        if (left <= 0) {
          state.sheet = "paywall";
          state.paywallSource = "quota";
          state.paywallPid = hostPid;
          render();
          return;
        }
        state.quota[hostPid] = left - 1;
      }
      state.role = "host";
      state.party = "playing";
      state.partyItem = state.focusItem;
      state.partyProvider = state.focusProvider;
      state.sheet = null;
      state.tab = "party";
      state.playerOverlay = "loading";
      protoToast(stage, "Party started");
      render();
      clearTimeout(stage._loadT);
      stage._loadT = setTimeout(() => {
        if (state.playerOverlay === "loading") {
          state.playerOverlay = null;
          render();
        }
      }, 1400);
      return;
    }
    if (action === "watch-alone") {
      state.sheet = null;
      state.tab = "browse";
      state.provider = state.focusProvider;
      protoToast(stage, "Playing alone");
      render();
      return;
    }
    if (action === "manage-service") {
      state.managePid = pid;
      state.sheet = "manage";
      render();
      return;
    }
    if (action === "ask-signout") {
      if (isOpen(pid, linkOpts(state))) {
        protoToast(stage, "YouTube doesn’t use an account");
        return;
      }
      state.signOutPid = pid;
      state.sheet = "signout";
      render();
      return;
    }
    if (action === "confirm-signout") {
      if (isOpen(pid, linkOpts(state))) {
        state.sheet = null;
        protoToast(stage, "YouTube doesn’t use an account");
        render();
        return;
      }
      state.conn[pid] = false;
      if (state.provider === pid) {
        const next = PROVIDER_ORDER.find((p) => state.conn[p]);
        state.provider = next || null;
      }
      state.sheet = null;
      state.signOutPid = null;
      protoToast(stage, "Signed out of " + PROVIDERS[pid].name);
      render();
      return;
    }
    if (action === "browse-service") {
      if (inLiveParty(state) && pid !== (state.partyProvider || state.provider)) {
        state.pendingSwitchPid = pid;
        state.sheet = "switch-warn";
        render();
        return;
      }
      state.provider = pid;
      state.tab = "browse";
      state.sheet = null;
      render();
      return;
    }
  });

  render();
  return { state, render, setScenario, showScene };
}

function mountDeviceGallery(root) {
  if (!root) return;
  const devices = [
    { id: "compact", label: "Phone", hint: "Compact · bottom bar. Posters stay 112×168." },
    { id: "medium", label: "Foldable", hint: "Cover / fold outer · more columns, same tile size." },
    { id: "expanded", label: "iPad", hint: "Nav rail · party + catalog side by side." },
    { id: "dual", label: "iPhone Duo", hint: "Two phones + hinge. Home on the left, Party/Browse on the right." },
  ];
  root.className = "device-gallery";
  root.innerHTML = devices.map((d) => {
    const state = freshState();
    applyScenario(state, "full");
    state.device = d.id;
    return `<div class="frame-wrap gallery-card device-${d.id}" data-device="${d.id}" tabindex="0" role="button">
      ${protoPhoneHtml(state, "snapshot")}
      <div class="frame-caption"><h3>${d.label}</h3><p>${d.hint}</p></div>
    </div>`;
  }).join("");
}

function mountPage(opts) {
  const page = opts.page || "home";
  mountGallery(opts.gallery, page);
  if (opts.devices) mountDeviceGallery(opts.devices);
  const proto = mountInteractive(opts.play, { page, start: opts.start, isPremium: opts.isPremium });
  const pick = (card) => {
    proto.showScene(card.dataset.scene, card.dataset.premium === "1");
    opts.play.scrollIntoView({ behavior: "smooth", block: "start" });
  };
  opts.gallery.addEventListener("click", (e) => {
    const card = e.target.closest("[data-scene]");
    if (!card || !opts.gallery.contains(card)) return;
    pick(card);
  });
  opts.gallery.addEventListener("keydown", (e) => {
    if (e.key !== "Enter" && e.key !== " ") return;
    const card = e.target.closest("[data-scene]");
    if (!card || !opts.gallery.contains(card)) return;
    e.preventDefault();
    pick(card);
  });
  if (opts.devices) {
    opts.devices.addEventListener("click", (e) => {
      const card = e.target.closest("[data-device]");
      if (!card || !opts.devices.contains(card)) return;
      proto.state.device = card.dataset.device;
      proto.render();
      opts.play.scrollIntoView({ behavior: "smooth", block: "start" });
    });
    opts.devices.addEventListener("keydown", (e) => {
      if (e.key !== "Enter" && e.key !== " ") return;
      const card = e.target.closest("[data-device]");
      if (!card || !opts.devices.contains(card)) return;
      e.preventDefault();
      proto.state.device = card.dataset.device;
      proto.render();
      opts.play.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  }
  return proto;
}
