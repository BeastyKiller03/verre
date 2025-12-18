// data.js
// VERRE = tracking / archival platform.
// No attendance claims unless explicitly marked.
// Events require real sources or ticket links.

window.VERRE_DATA = {
  lastUpdated: "2025-12-16",

  /* ---------- AREAS ---------- */
  areas: [
    { id: "la", name: "Los Angeles" },
    { id: "ocie", name: "OC / IE" },
    { id: "sd", name: "San Diego" },
    { id: "nyc", name: "New York City" }
  ],

  /* ---------- ARTISTS ---------- */
  artists: [
    {
      id: "susy-sheer",
      name: "Susy Sheer",
      tags: ["electro", "club", "underground"],
      links: { instagram: "https://www.instagram.com/susysheer/" },
      blurb: "SoCal underground energy—sharp synths and pop-adjacent club pressure.",
      relatedPosts: []
    },
    {
      id: "mgna-crrrta",
      name: "MGNA CRRRTA",
      tags: ["hyper", "alt", "experimental"],
      links: { instagram: "https://www.instagram.com/mgnacrrrta/" },
      blurb: "Distortion-forward sets with a chaos-pop edge—scene favorite.",
      relatedPosts: []
    },
    {
      id: "10cust",
      name: "10cust",
      tags: ["deconstructed", "bass", "club"],
      links: { instagram: "https://www.instagram.com/10cust/" },
      blurb: "Tight percussion and dark textures built for club rooms.",
      relatedPosts: []
    },
    {
      id: "damon-r",
      name: "Damon R.",
      tags: ["dj", "electro", "indie-club"],
      links: { instagram: "https://www.instagram.com/damonr__/" },
      blurb: "Connector energy—sets that feel like a timeline of the scene.",
      relatedPosts: []
    },
    {
      id: "the-hellp",
      name: "The Hellp",
      tags: ["indie sleaze", "electro", "club"],
      links: { instagram: "https://www.instagram.com/thehellp/" },
      blurb: "Indie-sleaze revival pressure with club energy and sharp visuals.",
      relatedPosts: []
    },
    {
      id: "2hollis",
      name: "2hollis",
      tags: ["alt pop", "club", "scene"],
      links: { instagram: "https://www.instagram.com/2hollis/" },
      blurb: "High-gloss alt-pop and club crossover anchoring the current scene.",
      relatedPosts: []
    },
    {
      id: "nate-sib",
      name: "Nate Sib",
      tags: ["hyperpop", "alt", "emo"],
      links: { instagram: "https://www.instagram.com/nate_sib/" },
      blurb: "LA-rooted hyperpop/alt voice with heavy scene overlap.",
      relatedPosts: []
    },
    {
      id: "underscores",
      name: "underscores",
      tags: ["hyperpop", "pop-punk", "alt"],
      links: { instagram: "https://www.instagram.com/underscores/" },
      blurb: "Genre-bending songwriter with a strong DIY and community pull.",
      relatedPosts: []
    },
    {
      id: "frost-children",
      name: "Frost Children",
      tags: ["hyperpop", "electro", "chaos"],
      links: { instagram: "https://www.instagram.com/thefrostchildren/" },
      blurb: "Sibling duo channeling rave chaos, glitch-pop, and internet energy.",
      relatedPosts: []
    },
    {
      id: "snow-strippers",
      name: "Snow Strippers",
      tags: ["indie sleaze", "electronic", "club"],
      links: { instagram: "https://www.instagram.com/snowstrippers/" },
      blurb: "Dark pop minimalism with sleaze-era club aesthetics.",
      relatedPosts: []
    },
    {
      id: "dres",
      name: "DRES",
      tags: ["indie", "alt", "band"],
      links: { instagram: "https://www.instagram.com/wearedres_/" },
      blurb: "Alt band with crossover appeal into electronic-adjacent scenes.",
      relatedPosts: []
    },
    {
      id: "umru",
      name: "umru",
      tags: ["hyperpop", "club", "dj"],
      links: { instagram: "https://www.instagram.com/umru_/" },
      blurb: "Hyperpop architect with club-rooted DJ sets and maximalist energy.",
      relatedPosts: []
    },
    {
      id: "petal-supply",
      name: "Petal Supply",
      tags: ["hyperpop", "dj", "internet"],
      links: { instagram: "https://www.instagram.com/petalsupply/" },
      blurb: "Internet-era producer bridging pop melody and club pressure.",
      relatedPosts: []
    },
    {
      id: "ninajirachi",
      name: "Ninajirachi",
      tags: ["club", "hyperpop", "electronic"],
      links: { instagram: "https://www.instagram.com/ninajirachi/" },
      blurb: "Club-forward producer blending pop precision and rave energy.",
      relatedPosts: []
    },
    {
      id: "the-dare",
      name: "The Dare",
      tags: ["indie sleaze", "dance-punk", "club"],
      links: { instagram: "https://www.instagram.com/thedare/" },
      blurb: "NYC dance-punk chaos fueling the sleaze revival.",
      relatedPosts: []
    },
    {
      id: "atl-grandma",
      name: "ATL Grandma",
      tags: ["underground", "dj", "scene"],
      links: { instagram: "https://www.instagram.com/atlgrandma/" },
      blurb: "DIY club presence tied to underground circuits and regional scenes.",
      relatedPosts: []
    },
    {
      id: "perto",
      name: "Perto",
      tags: ["underground", "electronic", "experimental"],
      links: { instagram: "https://www.instagram.com/iamperto/" },
      blurb: "Underground electronic project with club-forward crossover energy.",
      relatedPosts: []
    },
    {
      id: "kimj",
      name: "kimj",
      tags: ["dj", "club", "experimental"],
      links: { instagram: "https://www.instagram.com/youngkimj/" },
      blurb: "DJ/producer appearing across underground and hybrid club lineups.",
      relatedPosts: []
    },
    {
      id: "extra-small",
      name: "Extra Small",
      tags: ["electronic", "underground", "dj"],
      links: { instagram: "https://www.instagram.com/extrsmll/" },
      blurb: "DIY electronic project with low-profile underground reach.",
      relatedPosts: []
    },
    {
      id: "effie",
      name: "Effie",
      tags: ["electroclash", "club", "icon"],
      links: { instagram: "https://www.instagram.com/effi3e/" },
      blurb: "Electroclash-era icon whose influence still echoes in modern club spaces.",
      relatedPosts: []
    },
    {
      id: "the-deep",
      name: "The Deep",
      tags: ["underground", "electronic", "collective"],
      links: { instagram: "https://www.instagram.com/thedeeeep/" },
      blurb: "Underground electronic project/collective with scene-driven presence.",
      relatedPosts: []
    },
    {
      id: "sebii",
      name: "SEBii",
      tags: ["hyperpop", "emo", "internet"],
      links: { instagram: "https://www.instagram.com/sebii.jpg/" },
      blurb: "Internet-native hyperpop voice with heavy youth pull.",
      relatedPosts: []
    },
    {
      id: "alice-glass",
      name: "Alice Glass",
      tags: ["electronic", "punk", "icon"],
      links: { instagram: "https://www.instagram.com/aliceglass/" },
      blurb: "Electronic punk icon bridging early internet chaos and modern club energy.",
      relatedPosts: []
    },
    {
      id: "jane-remover",
      name: "Jane Remover",
      tags: ["hyperpop", "shoegaze", "experimental"],
      links: { instagram: "https://www.instagram.com/janeremover/" },
      blurb: "Genre-defying artist moving between hyperpop, emo, and shoegaze.",
      relatedPosts: []
    },
    {
      id: "tommy-fleece",
      name: "Tommy Fleece",
      tags: ["indie", "alt", "scene"],
      links: { instagram: "https://www.instagram.com/tommysfleece/" },
      blurb: "Alt-indie songwriter orbiting the current NY/LA crossover scene.",
      relatedPosts: []
    }
  ],

  /* ---------- EVENTS ---------- */
  events: [
    {
      id: "nye-umru-petal-supply-2025",
      title: "New Years Eve with umru & Petal Supply",
      date: "2025-12-31",
      time: "10:00 PM",
      area: "nyc",
      venue: "Brooklyn Brewery",
      address: "79 North 11th Street, Brooklyn, New York 11249, United States",
      ticketUrl:
        "https://dice.fm/event/oeqblg-new-years-eve-with-umru-petal-supply-31st-dec-brooklyn-brewery-new-york-city-tickets",
      sourceUrl:
        "https://dice.fm/event/oeqblg-new-years-eve-with-umru-petal-supply-31st-dec-brooklyn-brewery-new-york-city-tickets",
      flyerUrl: "",
      lineup: ["umru", "Petal Supply"],
      verreAttending: false,
      notes: "DJ event. New Years Eve."
    }
  ]
};
