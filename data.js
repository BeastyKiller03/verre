// data.js
// VERRE = tracking / archival right now (no "attending" claims).
// Update lastUpdated whenever you change anything.

window.VERRE_DATA = {
  lastUpdated: "2025-12-16",
  areas: [
    { id: "la", name: "Los Angeles" },
    { id: "ocie", name: "OC / IE" },
    { id: "sd", name: "San Diego" }
  ],

  artists: [
    {
      id: "susy-sheer",
      name: "Susy Sheer",
      tags: ["electro", "club", "underground"],
      links: {
        instagram: "https://instagram.com/",
        soundcloud: "https://soundcloud.com/",
        spotify: "https://open.spotify.com/"
      },
      blurb: "SoCal underground energy—sharp synths, pop-adjacent club pressure.",
      relatedPosts: []
    },
    {
      id: "mgna-crrrta",
      name: "MGNA CRRRTA",
      tags: ["hyper", "alt", "experimental"],
      links: {
        instagram: "https://instagram.com/",
        soundcloud: "https://soundcloud.com/"
      },
      blurb: "Distortion-forward sets with a chaos/pop edge—scene favorite.",
      relatedPosts: []
    },
    {
      id: "10cust",
      name: "10cust",
      tags: ["deconstructed", "bass", "club"],
      links: {
        instagram: "https://instagram.com/"
      },
      blurb: "Tight percussion + weird textures built for dark rooms.",
      relatedPosts: []
    },
    {
      id: "damon-r",
      name: "Damon R.",
      tags: ["dj", "electro", "indie-club"],
      links: {
        instagram: "https://instagram.com/"
      },
      blurb: "Connector energy—sets that feel like a timeline of the scene.",
      relatedPosts: []
    }
  ],

  // IMPORTANT:
  // If you don't have confirmed event info yet, leave events empty.
  // Add events only when you have at least: title + date + area + a source link.
  events: [
    // Example template (copy/paste and fill when ready):
    // {
    //   id: "unique-slug-001",
    //   title: "Event Name",
    //   date: "2026-01-10",
    //   time: "10:00 PM",
    //   area: "la",
    //   venue: "Venue / Promoter",
    //   address: "Optional (or 'DM for location')",
    //   ticketUrl: "https://...",
    //   sourceUrl: "https://instagram.com/p/...", // where you got the info
    //   flyerUrl: "", // optional local path later like "assets/flyers/xxx.jpg"
    //   lineup: ["Artist 1", "Artist 2"],
    //   verreAttending: false, // keep false until you truly are attending
    //   notes: "Optional notes."
    // }
  ]
};
