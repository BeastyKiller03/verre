// app.js
const $ = (sel) => document.querySelector(sel);

function fmtDate(iso){
  const d = new Date(iso + "T00:00:00");
  return d.toLocaleDateString(undefined, { year:"numeric", month:"short", day:"numeric" });
}
function byId(arr, id){ return arr.find(x => x.id === id); }
function qs(name){
  const u = new URL(window.location.href);
  return u.searchParams.get(name);
}
function setActiveNav(){
  const path = window.location.pathname.split("/").pop() || "index.html";
  document.querySelectorAll(".menu a").forEach(a=>{
    const href = a.getAttribute("href");
    if(href === path) a.classList.add("active");
  });
}

function renderMiniEvent(e){
  const areaName = byId(VERRE_DATA.areas, e.area)?.name || e.area;
  const badge = e.verreAttending ? `<span class="badge">VERRE ATTENDING</span>` : `<span class="chip">not confirmed</span>`;
  const thumb = e.flyerUrl ? `<img src="${e.flyerUrl}" alt="flyer">` : `<div>${e.area.toUpperCase()}</div>`;
  return `
    <a class="item" href="event.html?id=${encodeURIComponent(e.id)}">
      <div class="thumb">${thumb}</div>
      <div class="info">
        <p class="title">${e.title}</p>
        <p class="sub">${fmtDate(e.date)} • ${e.time} • ${areaName} • ${e.venue}</p>
        <div class="row">
          ${badge}
          <span class="chip">lineup: ${e.lineup.join(", ")}</span>
        </div>
      </div>
    </a>
  `;
}

function renderMiniArtist(a){
  const thumb = `<div>${a.name.split(" ").map(w=>w[0]).slice(0,2).join("").toUpperCase()}</div>`;
  return `
    <a class="item" href="artist.html?id=${encodeURIComponent(a.id)}">
      <div class="thumb">${thumb}</div>
      <div class="info">
        <p class="title">${a.name}</p>
        <p class="sub">${a.blurb}</p>
        <div class="row">
          ${a.tags.slice(0,4).map(t=>`<span class="chip">${t}</span>`).join("")}
        </div>
      </div>
    </a>
  `;
}

function mountHome(){
  $("#lastUpdated").textContent = VERRE_DATA.lastUpdated;
  const upcoming = [...VERRE_DATA.events]
    .sort((a,b)=> new Date(a.date) - new Date(b.date))
    .slice(0,6);

  $("#homeEvents").innerHTML = upcoming.map(renderMiniEvent).join("") || `<p class="sub">No events listed yet.</p>`;

  const featured = VERRE_DATA.artists.slice(0,6);
  $("#homeArtists").innerHTML = featured.map(renderMiniArtist).join("") || `<p class="sub">No artists yet.</p>`;
}

function mountEvents(){
  $("#lastUpdated").textContent = VERRE_DATA.lastUpdated;

  const areaSel = $("#areaFilter");
  areaSel.innerHTML = `
    <option value="all">All Areas</option>
    ${VERRE_DATA.areas.map(a=>`<option value="${a.id}">${a.name}</option>`).join("")}
  `;

  function apply(){
    const q = ($("#q").value || "").toLowerCase().trim();
    const area = areaSel.value;

    let rows = [...VERRE_DATA.events].sort((a,b)=> new Date(a.date) - new Date(b.date));

    if(area !== "all") rows = rows.filter(e=> e.area === area);
    if(q){
      rows = rows.filter(e =>
        e.title.toLowerCase().includes(q) ||
        e.venue.toLowerCase().includes(q) ||
        e.lineup.join(" ").toLowerCase().includes(q)
      );
    }

    $("#eventsList").innerHTML = rows.map(renderMiniEvent).join("") || `<p class="sub">No matches.</p>`;
  }

  $("#q").addEventListener("input", apply);
  areaSel.addEventListener("change", apply);

  apply();
}

function mountArtists(){
  $("#lastUpdated").textContent = VERRE_DATA.lastUpdated;

  function apply(){
    const q = ($("#q").value || "").toLowerCase().trim();
    let rows = [...VERRE_DATA.artists].sort((a,b)=> a.name.localeCompare(b.name));
    if(q){
      rows = rows.filter(a =>
        a.name.toLowerCase().includes(q) ||
        a.tags.join(" ").toLowerCase().includes(q) ||
        (a.blurb||"").toLowerCase().includes(q)
      );
    }
    $("#artistsList").innerHTML = rows.map(renderMiniArtist).join("") || `<p class="sub">No matches.</p>`;
  }

  $("#q").addEventListener("input", apply);
  apply();
}

function mountEventDetail(){
  const id = qs("id");
  const e = byId(VERRE_DATA.events, id);
  if(!e){ $("#detail").innerHTML = `<p class="sub">Event not found.</p>`; return; }

  const areaName = byId(VERRE_DATA.areas, e.area)?.name || e.area;
  const attending = e.verreAttending ? `<span class="badge">VERRE ATTENDING</span>` : `<span class="chip">coverage not confirmed</span>`;

  $("#detail").innerHTML = `
    <div class="card">
      <div class="hd">
        <h2>Event</h2>
        ${attending}
      </div>
      <div class="bd">
        <h1 style="margin:0 0 6px; font-size:28px;">${e.title}</h1>
        <p class="sub" style="margin-top:0">${fmtDate(e.date)} • ${e.time} • ${areaName}</p>

        <hr class="sep">

        <dl class="kv">
          <dt>Venue</dt><dd>${e.venue}</dd>
          <dt>Address</dt><dd>${e.address}</dd>
          <dt>Lineup</dt><dd>${e.lineup.join(", ")}</dd>
          <dt>Tickets</dt><dd><a class="smalllink" href="${e.ticketUrl}" target="_blank" rel="noopener">Open link</a></dd>
          <dt>Notes</dt><dd>${e.notes || "—"}</dd>
        </dl>

        <hr class="sep">

        <div class="row">
          ${e.lineup.map(name=>{
            const artist = VERRE_DATA.artists.find(a=>a.name.toLowerCase() === name.toLowerCase());
            return artist
              ? `<a class="chip" href="artist.html?id=${artist.id}">${name}</a>`
              : `<span class="chip">${name}</span>`;
          }).join("")}
        </div>
      </div>
      <div class="ft">Last updated: ${VERRE_DATA.lastUpdated}</div>
    </div>
  `;
}

function mountArtistDetail(){
  const id = qs("id");
  const a = byId(VERRE_DATA.artists, id);
  if(!a){ $("#detail").innerHTML = `<p class="sub">Artist not found.</p>`; return; }

  const upcoming = VERRE_DATA.events
    .filter(e => e.lineup.some(x => x.toLowerCase() === a.name.toLowerCase()))
    .sort((x,y)=> new Date(x.date) - new Date(y.date));

  const links = Object.entries(a.links || {})
    .map(([k,v]) => v ? `<a class="chip" href="${v}" target="_blank" rel="noopener">${k}</a>` : "")
    .join("");

  $("#detail").innerHTML = `
    <div class="card">
      <div class="hd">
        <h2>Artist</h2>
        <span class="chip">${a.id}</span>
      </div>
      <div class="bd">
        <h1 style="margin:0 0 6px; font-size:28px;">${a.name}</h1>
        <p class="sub" style="margin-top:0">${a.blurb || ""}</p>

        <div class="row">
          ${a.tags.map(t=>`<span class="chip">${t}</span>`).join("")}
        </div>

        <hr class="sep">

        <h3 style="margin:0 0 10px; font-size:14px; color:var(--muted); letter-spacing:.08em; text-transform:uppercase;">Links</h3>
        <div class="row">${links || `<span class="sub">No links yet.</span>`}</div>

        <hr class="sep">

        <h3 style="margin:0 0 10px; font-size:14px; color:var(--muted); letter-spacing:.08em; text-transform:uppercase;">Upcoming / Tracked Events</h3>
        <div class="list">
          ${upcoming.length ? upcoming.map(renderMiniEvent).join("") : `<p class="sub">No tracked events yet for this artist.</p>`}
        </div>

        ${a.relatedPosts?.length ? `
          <hr class="sep">
          <h3 style="margin:0 0 10px; font-size:14px; color:var(--muted); letter-spacing:.08em; text-transform:uppercase;">VERRE Archive References</h3>
          <div class="list">
            ${a.relatedPosts.map(p=>`
              <a class="item" href="${p.url}">
                <div class="thumb"><div>POST</div></div>
                <div class="info">
                  <p class="title">${p.label}</p>
                  <p class="sub">Open reference</p>
                </div>
              </a>
            `).join("")}
          </div>
        ` : ""}

      </div>
      <div class="ft">Last updated: ${VERRE_DATA.lastUpdated}</div>
    </div>
  `;
}

function mountPress(){
  $("#lastUpdated").textContent = VERRE_DATA.lastUpdated;
}

document.addEventListener("DOMContentLoaded", ()=>{
  setActiveNav();
  const page = document.body.dataset.page;

  if(page === "home") mountHome();
  if(page === "events") mountEvents();
  if(page === "artists") mountArtists();
  if(page === "event") mountEventDetail();
  if(page === "artist") mountArtistDetail();
  if(page === "press") mountPress();
});
