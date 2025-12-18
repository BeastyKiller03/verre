/* app.js — VERRE
   Static site renderer for:
   - Home (index.html)
   - Events list (events.html)
   - Artists list (artists.html)
   - Event detail (event.html?id=...)
   - Artist detail (artist.html?id=...)
*/

const $ = (sel) => document.querySelector(sel);
const qs = (key) => new URLSearchParams(location.search).get(key);

function safe(str) {
  return String(str ?? "").replace(/[&<>"']/g, (m) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#039;"
  }[m]));
}

function byId(arr, id) {
  return (arr || []).find(x => x.id === id);
}

function fmtDate(iso) {
  if (!iso) return "";
  const d = new Date(`${iso}T00:00:00`);
  if (Number.isNaN(d.getTime())) return iso;
  return d.toLocaleDateString(undefined, { year: "numeric", month: "short", day: "numeric" });
}

function setActiveNav() {
  const page = (document.body.getAttribute("data-page") || "").toLowerCase();
  document.querySelectorAll(".menu a").forEach(a => {
    const href = (a.getAttribute("href") || "").toLowerCase();
    const isActive =
      (page === "events" && href.includes("events")) ||
      (page === "artists" && href.includes("artists")) ||
      (page === "press" && href.includes("press"));
    if (isActive) a.classList.add("active");
  });
}

function setLastUpdated() {
  const el = $("#lastUpdated");
  if (el && window.VERRE_DATA?.lastUpdated) el.textContent = window.VERRE_DATA.lastUpdated;
}

/* ---------- Data helpers ---------- */

function getUpcomingEvents() {
  const now = new Date();
  const events = (window.VERRE_DATA?.events || []).slice();
  // Sort by date asc
  events.sort((a, b) => (a.date || "").localeCompare(b.date || ""));
  // Keep upcoming + today
  return events.filter(e => {
    if (!e.date) return true;
    const d = new Date(`${e.date}T00:00:00`);
    return d >= new Date(now.getFullYear(), now.getMonth(), now.getDate());
  });
}

function eventAreaName(e) {
  const area = byId(window.VERRE_DATA?.areas, e.area);
  return area?.name || e.area || "";
}

function artistMatchesSearch(a, q) {
  if (!q) return true;
  const hay = [
    a.name,
    ...(a.tags || []),
    a.blurb
  ].join(" ").toLowerCase();
  return hay.includes(q.toLowerCase());
}

function eventMatchesSearch(e, q, areaId) {
  const areaOk = !areaId || e.area === areaId;
  if (!areaOk) return false;
  if (!q) return true;
  const hay = [
    e.title,
    e.venue,
    e.address,
    ...(e.lineup || []),
    e.notes
  ].join(" ").toLowerCase();
  return hay.includes(q.toLowerCase());
}

/* ---------- Render blocks ---------- */

function renderEventRow(e) {
  const area = eventAreaName(e);
  const lineup = (e.lineup || []).join(", ");
  return `
    <div class="item">
      <div class="thumb">EVENT</div>
      <div class="info">
        <div class="title">
          <a href="event.html?id=${encodeURIComponent(e.id)}">${safe(e.title)}</a>
        </div>
        <p class="sub">${safe(fmtDate(e.date))}${e.time ? ` • ${safe(e.time)}` : ""} • ${safe(area)}</p>
        <p class="sub">${safe(e.venue || "")}${e.venue && e.address ? " • " : ""}${safe(e.address || "")}</p>
        ${lineup ? `<div class="row"><span class="chip">${safe(lineup)}</span></div>` : ""}
      </div>
    </div>
  `;
}

function renderArtistRow(a) {
  const tags = (a.tags || []).slice(0, 4);
  return `
    <div class="item">
      <div class="thumb">ARTIST</div>
      <div class="info">
        <div class="title">
          <a href="artist.html?id=${encodeURIComponent(a.id)}">${safe(a.name)}</a>
        </div>
        <p class="sub">${safe(a.blurb || "")}</p>
        <div class="row">
          ${tags.map(t => `<span class="chip">${safe(t)}</span>`).join("")}
          ${a.links?.instagram ? `<a class="chip" href="${a.links.instagram}" target="_blank" rel="noopener">Instagram</a>` : ""}
        </div>
      </div>
    </div>
  `;
}

/* ---------- Pages ---------- */

function mountHome() {
  setLastUpdated();

  // Upcoming events preview
  const homeEvents = $("#homeEvents");
  if (homeEvents) {
    const upcoming = getUpcomingEvents().slice(0, 5);
    homeEvents.innerHTML = upcoming.length
      ? upcoming.map(renderEventRow).join("")
      : `<p class="sub">No events listed yet. VERRE is building the map now.</p>`;
  }

  // Artists preview
  const homeArtists = $("#homeArtists");
  if (homeArtists) {
    const artists = (window.VERRE_DATA?.artists || []).slice()
      .sort((a, b) => a.name.localeCompare(b.name))
      .slice(0, 6);
    homeArtists.innerHTML = artists.length
      ? artists.map(renderArtistRow).join("")
      : `<p class="sub">No artists listed yet.</p>`;
  }
}

function mountEventsList() {
  setLastUpdated();

  const list = $("#eventsList");
  const search = $("#eventsSearch");
  const areaSel = $("#eventsArea");

  const areas = window.VERRE_DATA?.areas || [];
  if (areaSel && areaSel.children.length <= 1) {
    areaSel.innerHTML = `
      <option value="">All areas</option>
      ${areas.map(a => `<option value="${safe(a.id)}">${safe(a.name)}</option>`).join("")}
    `;
  }

  function paint() {
    const q = search ? search.value.trim() : "";
    const areaId = areaSel ? areaSel.value : "";
    const items = getUpcomingEvents().filter(e => eventMatchesSearch(e, q, areaId));
    list.innerHTML = items.length
      ? items.map(renderEventRow).join("")
      : `<p class="sub">No matching events yet.</p>`;
  }

  if (search) search.addEventListener("input", paint);
  if (areaSel) areaSel.addEventListener("change", paint);
  paint();
}

function mountArtistsList() {
  setLastUpdated();

  const list = $("#artistsList");
  const search = $("#artistsSearch");

  function paint() {
    const q = search ? search.value.trim() : "";
    const items = (window.VERRE_DATA?.artists || [])
      .slice()
      .sort((a, b) => a.name.localeCompare(b.name))
      .filter(a => artistMatchesSearch(a, q));
    list.innerHTML = items.length
      ? items.map(renderArtistRow).join("")
      : `<p class="sub">No matching artists.</p>`;
  }

  if (search) search.addEventListener("input", paint);
  paint();
}

function mountArtistDetail() {
  setLastUpdated();

  const id = qs("id");
  const a = (window.VERRE_DATA?.artists || []).find(x => x.id === id);
  const root = $("#detail");

  if (!root) return;
  if (!a) {
    root.innerHTML = `<p class="sub">Artist not found.</p>`;
    return;
  }

  // Find events where this artist appears in lineup (case-insensitive)
  const events = (window.VERRE_DATA?.events || []).filter(e =>
    (e.lineup || []).some(n => n.toLowerCase() === a.name.toLowerCase())
  ).sort((x, y) => (x.date || "").localeCompare(y.date || ""));

  const linksRow = `
    <div class="row" style="margin-top:0;">
      ${a.links?.instagram ? `<a class="btn primary" href="${a.links.instagram}" target="_blank" rel="noopener">Instagram</a>` : ""}
      <a class="btn" href="artists.html">Back to artists</a>
    </div>
  `;

  root.innerHTML = `
    <div class="card">
      <div class="hd">
        <h2>Artist</h2>
        <span class="chip">index</span>
      </div>

      <div class="bd">
        <div style="display:flex; justify-content:space-between; align-items:flex-start; gap:12px; flex-wrap:wrap;">
          <div style="min-width:240px; flex:1;">
            <h1 style="margin:0 0 6px; font-size:28px; line-height:1.1;">
              ${safe(a.name)}
            </h1>
            <p class="sub" style="margin:0;">${safe(a.blurb || "")}</p>
            <div class="row">
              ${(a.tags || []).map(t => `<span class="chip">${safe(t)}</span>`).join("")}
            </div>
          </div>

          <div style="flex:0 0 auto; min-width:220px;">
            ${linksRow}
          </div>
        </div>

        <hr class="sep">

        <h3 style="margin:0 0 10px; font-size:14px; color:var(--muted); letter-spacing:.08em; text-transform:uppercase;">
          Tracked events
        </h3>

        <div class="list">
          ${events.length ? events.map(renderEventRow).join("") : `<p class="sub">No tracked events yet for this artist.</p>`}
        </div>
      </div>

      <div class="ft">Last updated: ${safe(window.VERRE_DATA?.lastUpdated || "")}</div>
    </div>
  `;
}

/* ✅ CLEAN EVENT DETAIL LAYOUT */
function mountEventDetail(){
  const id = qs("id");
  const e = (window.VERRE_DATA?.events || []).find(x => x.id === id);
  const root = $("#detail");

  if (!root) return;
  if(!e){ root.innerHTML = `<p class="sub">Event not found.</p>`; return; }

  const areaName = eventAreaName(e);
  const lineup = (e.lineup && e.lineup.length) ? e.lineup : [];

  const actions = `
    <div class="row" style="margin-top:0">
      ${e.ticketUrl ? `<a class="btn primary" href="${e.ticketUrl}" target="_blank" rel="noopener">Tickets</a>` : ""}
      ${e.sourceUrl ? `<a class="btn" href="${e.sourceUrl}" target="_blank" rel="noopener">Source</a>` : ""}
      <a class="btn" href="events.html">Back to events</a>
    </div>
  `;

  // Link lineup chips to artist pages where possible
  const linkedLineup = lineup.map(name=>{
    const artist = (window.VERRE_DATA?.artists || []).find(a => a.name.toLowerCase() === name.toLowerCase());
    return artist
      ? `<a class="chip" href="artist.html?id=${encodeURIComponent(artist.id)}">${safe(name)}</a>`
      : `<span class="chip">${safe(name)}</span>`;
  }).join(" "); // <-- fixes squished chips

  root.innerHTML = `
    <div class="card">
      <div class="hd">
        <h2>Event</h2>
        <span class="chip">tracking</span>
      </div>

      <div class="bd">
        <div style="display:flex; justify-content:space-between; align-items:flex-start; gap:12px; flex-wrap:wrap;">
          <div style="min-width:240px; flex:1;">
            <h1 style="margin:0 0 6px; font-size:28px; line-height:1.1;">
              ${safe(e.title)}
            </h1>
            <p class="sub" style="margin:0;">
              ${fmtDate(e.date)}${e.time ? ` • ${safe(e.time)}` : ""} • ${safe(areaName)}
            </p>
          </div>

          <div style="flex:0 0 auto; min-width:220px;">
            ${actions}
          </div>
        </div>

        <hr class="sep">

        <div style="display:grid; grid-template-columns: 1fr 1fr; gap:14px;">
          <div>
            <dl class="kv">
              <dt>Venue</dt><dd>${safe(e.venue) || "—"}</dd>
              <dt>Address</dt><dd>${safe(e.address) || "—"}</dd>
              <dt>Area</dt><dd>${safe(areaName)}</dd>
              <dt>Date</dt><dd>${fmtDate(e.date)}${e.time ? ` • ${safe(e.time)}` : ""}</dd>
            </dl>
          </div>

          <div>
            <dl class="kv">
              <dt>Lineup</dt><dd>${lineup.length ? safe(lineup.join(", ")) : "TBA"}</dd>
              <dt>Notes</dt><dd>${safe(e.notes) || "—"}</dd>
              <dt>Tickets</dt><dd>${e.ticketUrl ? `<a class="smalllink" href="${e.ticketUrl}" target="_blank" rel="noopener">Open tickets</a>` : "—"}</dd>
              <dt>Source</dt><dd>${e.sourceUrl ? `<a class="smalllink" href="${e.sourceUrl}" target="_blank" rel="noopener">Open source</a>` : "—"}</dd>
            </dl>
          </div>
        </div>

        <hr class="sep">

        <h3 style="margin:0 0 10px; font-size:14px; color:var(--muted); letter-spacing:.08em; text-transform:uppercase;">
          Lineup
        </h3>
        <div class="row" style="margin-top:0;">
          ${lineup.length ? linkedLineup : `<span class="sub">TBA</span>`}
        </div>
      </div>

      <div class="ft">Last updated: ${safe(window.VERRE_DATA?.lastUpdated || "")}</div>
    </div>
  `;
}

/* ---------- Boot ---------- */

function boot(){
  setActiveNav();

  const page = (document.body.getAttribute("data-page") || "").toLowerCase();

  if (page === "home") return mountHome();
  if (page === "events") return mountEventsList();
  if (page === "artists") return mountArtistsList();
  if (page === "artist") return mountArtistDetail();
  if (page === "event") return mountEventDetail();
  // press page can stay static (no JS required)
}

document.addEventListener("DOMContentLoaded", boot);
