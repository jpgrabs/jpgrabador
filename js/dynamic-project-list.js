/* -----------------------------
   Tech Projects — data + render
   Renders into:
     #projects-gallery   (card grid)
     #projects-filter    (category chips, optional)
   ----------------------------- */

const projects = [
  // ===== Android Apps =====
  { title: "Ka-Partner App (Smart DMS)", category: "Android", image: "images/proj-logo/ic_kapartner.png",
    description: "Retailer mobile app for Smart — load wallet, suki list, transaction tooling.",
    client: "Smart · MultiSys", date: "May 2020 – Present", link: "kapartner-app-smart.html" },
  { title: "Paybox", category: "Android", image: "images/proj-logo/ic_paybox.png",
    description: "Automated payment kiosk app for self-service bills, utilities, and government payments.",
    client: "PLDT Smart · MultiSys", date: "April 2022 – Present", link: "paybox.html" },
  { title: "AlmuSalita", category: "Android", image: "images/proj-logo/ic_almusalita.png",
    description: "Daily Catholic spiritual companion with offline Bible study & guides.",
    client: "AlmuSalita", date: "Jan 2018 – 2021", link: "almusalita-app.html" },
  { title: "PhonePera", category: "Android", image: "images/proj-logo/ic_phoneperav2.png",
    description: "Fast e-wallet for bills payment, management, and P2P transactions.",
    client: "AiPayGo Inc.", date: "Jan 2019 – May 2019", link: "phonepera.html" },
  { title: "HyperPocket", category: "Android", image: "images/proj-logo/ic_hyperpocket.png",
    description: "E-wallet and bills payment mobile banking app (Project SENDO).",
    client: "AiPayGo Inc.", date: "Oct 2018 – Dec 2018", link: "hyperpocket.html" },
  { title: "Roamadex", category: "Android", image: "images/proj-logo/ic_roamadex.png",
    description: "Travel & local discovery platform with ad placement for ride-share drivers.",
    client: "AiPayGo Inc.", date: "Sept 2018 – March 2020", link: "roamadex.html" },
  { title: "TryC", category: "Android", image: "images/proj-logo/ic_tric.png",
    description: "Travel companion app built alongside the AiPayGo / Republisys stack.",
    client: "AiPayGo Inc. · Republisys", date: "Sept 2018 – March 2020", link: "tryc.html" },
  { title: "RPMC App", category: "Android", image: "images/proj-logo/ic_rmpc.png",
    description: "Real-estate property management & construction companion app (RealMark).",
    client: "AiPayGo · Republisys", date: "Sept 2018 – March 2020", link: "rpmc-app.html" },
  { title: "CheckApps", category: "Android", image: "images/proj-logo/ic_checkapps.png",
    description: "Healthcare-focused mobile application.",
    client: "—", date: "Sept 2018 – March 2020", link: "checkapps.html" },
  { title: "PEP", category: "Android", image: "images/proj-logo/ic_pep.png",
    description: "Crime-tracking mobile application.",
    client: "—", date: "—", link: "pep-app.html" },
  { title: "Spottapark", category: "Android", image: "images/proj-logo/ic_spottapark.png",
    description: "Parking reservation mobile application.",
    client: "Stardibs Corp", date: "Sept 2015 – Dec 2017", link: "spottapark.html" },
  { title: "Ride", category: "Android", image: "images/proj-logo/ic_ride.png",
    description: "Cab-hailing & ride-booking with personalised location selection.",
    client: "Stardibs Corp", date: "Jan 2017 – June 2017", link: "ride.html" },
  { title: "iPostMo", category: "Android", image: "images/proj-logo/ic_ipostmo.png",
    description: "E-commerce buy & sell mobile application.",
    client: "Stardibs Corp", date: "March 2016 – June 2016", link: "ipostmo.html" },
  { title: "MPOS", category: "Android", image: "images/proj-logo/ic_mpos.png",
    description: "Open parking reservation mobile application.",
    client: "Stardibs Corp", date: "Nov 2016 – Feb 2017", link: "mpos.html" },
  { title: "Prop", category: "Android", image: "images/proj-logo/ic_prop.png",
    description: "White-label parking reservation app with cash payment support.",
    client: "Stardibs Corp", date: "June 2016 – July 2016", link: "prop.html" },
  { title: "Autozon", category: "Android", image: "images/proj-logo/ic_autozon.png",
    description: "E-commerce buy & sell mobile application.",
    client: "Stardibs Corp", date: "—", link: "autozon.html" },
  { title: "AppChemy", category: "Android", image: "images/proj-logo/ic_appchemy.png",
    description: "Educational chemistry card game using the Lewis Electron Dot system.",
    client: "—", date: "—", link: "appchemy.html" },
  { title: "Church Management System", category: "Android", image: "images/proj-logo/ic_churchmanagementsystem.png",
    description: "Schedule & reservation mobile application for parish operations.",
    client: "—", date: "—", link: "cms-app.html" },
  { title: "VCA — Voice Command", category: "Android", image: "images/proj-logo/ic_voicecommand.png",
    description: "Voice command Android application.",
    client: "—", date: "—", link: "vca.html" },
  { title: "OLFU Student Handbook", category: "Android", image: "images/proj-logo/ic_olfu.png",
    description: "Online & offline reference handbook for OLFU students.",
    client: "OLFU", date: "—", link: "olfu.html" },
  { title: "BTC Clicks", category: "Android", image: "images/proj-logo/ic_btcclicks.png",
    description: "Instant cryptocoin earning site companion (2017).",
    client: "—", date: "2017", link: "btcclicks.html" },
  { title: "CoinPot Pro", category: "Android", image: "images/proj-logo/ic_coinpotpro.png",
    description: "One-stop BTC and altcoin earning companion platform.",
    client: "—", date: "—", link: "coinpotpro.html" },
  { title: "Status Quotes & Memes", category: "Android", image: "images/proj-logo/ic_quotememe.png",
    description: "Quote and meme sharing application.",
    client: "—", date: "—", link: "statusquotesmemes.html" },
  { title: "Whogoat", category: "Android", image: "images/proj-logo/ic_whogoat.png",
    description: "Android utility / lifestyle application.",
    client: "—", date: "—", link: "whogoat.html" },

  // ===== Web =====
  { title: "Republisys", category: "Web", image: "images/proj-logo/ic_republisys.png",
    description: "Back-end web/mobile development for Republisys Inc.",
    client: "Republisys Inc.", date: "Sept 2018 – March 2020", link: "republisys.html" },
  { title: "RPMC Web (RealMark)", category: "Web", image: "images/proj-logo/ic_rmpc.png",
    description: "Real Mark Property Management & Construction website.",
    client: "Republisys / RealMark", date: "Sept 2018 – March 2020", link: "rpmc-web.html" },
  { title: "AlmuSalita Web", category: "Web", image: "images/proj-logo/ic_almusalita.png",
    description: "Official AlmuSalita website with admin panel.",
    client: "AlmuSalita", date: "—", link: "almusalita-web.html" },
  { title: "PEP Web", category: "Web", image: "images/proj-logo/ic_pepwebserver.png",
    description: "Web platform companion to the PEP crime-tracking app.",
    client: "—", date: "—", link: "pepweb.html" },
  { title: "Firesale", category: "Web", image: "images/proj-logo/ic_firesale.png",
    description: "Promo discount e-commerce site, ReactJS + PayPal integration.",
    client: "—", date: "—", link: "firesale.html" },
  { title: "Stardibs", category: "Web", image: "images/proj-logo/ic_stardibs.png",
    description: "Corporate web presence for Stardibs Corp.",
    client: "Stardibs Corp", date: "—", link: "stardibs.html" },
  { title: "WatchLaterr", category: "Web", image: "images/proj-logo/ic_watchlaterrwebuse.png",
    description: "Personal blog & content site.",
    client: "Personal", date: "—", link: "watchlaterr.html" },

  // ===== Desktop =====
  { title: "Comic Alley POS", category: "Desktop", image: "images/proj-logo/ic_comicalley.png",
    description: "Point-of-sale desktop application for Comic Alley.",
    client: "Comic Alley", date: "—", link: "comicalley.html" },
  { title: "TPCT Trading", category: "Desktop", image: "images/proj-logo/ic_tpct.png",
    description: "Trading platform desktop application.",
    client: "—", date: "—", link: "tpct.html" },
];

const isExternal = (href) => /^https?:\/\//i.test(href);

const categoryMeta = {
  Android: {
    label: "Mobile",
    eyebrow: "Android Apps",
    blurb: "Native Android applications shipped to Google Play and on-prem distribution — Kotlin, Java, REST APIs, and clean architecture."
  },
  Web: {
    label: "Web",
    eyebrow: "Websites & Platforms",
    blurb: "Front-end and back-end web projects — corporate sites, admin panels, and e-commerce experiences."
  },
  Desktop: {
    label: "Desktop",
    eyebrow: "Desktop Software",
    blurb: "Windowed desktop applications — point-of-sale and trading tooling built in Java."
  },
};

const categoryOrder = ["Android", "Web", "Desktop"];

function cardHtml(p) {
  const href   = p.link && p.link !== "#" ? p.link : "#";
  const target = isExternal(href) ? ' target="_blank" rel="noopener"' : "";
  return `
    <a class="work-card" href="${href}"${target}>
      <div class="work-thumb">
        <img src="${p.image}" alt="${p.title} logo" loading="lazy">
      </div>
      <div class="work-meta">
        <span class="work-tag">${p.client && p.client !== "—" ? p.client : p.category}</span>
        <h3>${p.title}</h3>
        <p>${p.description}</p>
        ${p.date && p.date !== "—" ? `<span class="work-date">${p.date}</span>` : ""}
      </div>
    </a>
  `;
}

function renderCategorized(activeCat) {
  const container = document.getElementById("projects-categorized");
  if (!container) return;

  const cats = activeCat === "All" || !activeCat
    ? categoryOrder
    : categoryOrder.filter(c => c === activeCat);

  container.innerHTML = cats.map(cat => {
    const meta = categoryMeta[cat] || { label: cat, eyebrow: cat, blurb: "" };
    const items = projects.filter(p => p.category === cat);
    if (!items.length) return "";

    return `
      <section class="category-section" id="cat-${cat.toLowerCase()}">
        <div class="category-head">
          <div class="category-headline">
            <span class="eyebrow">${meta.eyebrow}</span>
            <h2>${meta.label} <span class="category-count">${items.length}</span></h2>
            ${meta.blurb ? `<p>${meta.blurb}</p>` : ""}
          </div>
        </div>
        <div class="work-grid work-grid--auto">
          ${items.map(cardHtml).join("")}
        </div>
      </section>
    `;
  }).join("");
}

function renderFilters() {
  const filter = document.getElementById("projects-filter");
  if (!filter) return;

  const chips = ["All", ...categoryOrder.filter(c => projects.some(p => p.category === c))];
  filter.innerHTML = chips
    .map((c, i) => {
      const label = c === "All"
        ? `All <span class="chip-count">${projects.length}</span>`
        : `${categoryMeta[c]?.label || c} <span class="chip-count">${projects.filter(p => p.category === c).length}</span>`;
      return `<button class="filter-chip${i === 0 ? " active" : ""}" data-cat="${c}">${label}</button>`;
    })
    .join("");

  filter.addEventListener("click", (e) => {
    const btn = e.target.closest(".filter-chip");
    if (!btn) return;
    filter.querySelectorAll(".filter-chip").forEach(c => c.classList.remove("active"));
    btn.classList.add("active");
    renderCategorized(btn.dataset.cat);
  });
}

document.addEventListener("DOMContentLoaded", () => {
  renderFilters();
  renderCategorized("All");
});
