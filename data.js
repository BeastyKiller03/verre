// data.js
// Replace placeholder links + flyers with real ones as you build.

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
      relatedPosts: [
        { label: "VERRE post: early set clip", url: "#" }
      ]
    },
    {
      id: "mgna-crrrta",
      name: "MGNA CRRRTA",
      tags: ["hyper", "alt", "experimental"],
      links: { instagram: "https://instagram.com/", soundcloud: "https://soundcloud.com/" },
      blurb: "Scene-favorite distortion and chaos—high color, high impact.",
      relatedPosts: [{ label: "VERRE post: flyer breakdown", url: "#" }]
    },
    {
      id: "10cust",
      name: "10cust",
      tags: ["deconstructed", "bass", "club"],
      links: { instagram: "https://instagram.com/" },
      blurb: "Tight percussion + weird textures—built for dark rooms.",
      relatedPosts: []
    },
    {
      id: "damon-r",
      name: "Damon R.",
      tags: ["dj", "electro", "indie-club"],
      links: { instagram: "https://instagram.com/" },
      blurb: "Connector-artist energy—sets that feel like a timeline of the scene.",
      relatedPosts: []
    }
  ],
  events: [
    {
      id: "neon-bunker-001",
      title: "Neon Bunker 001",
      date: "2026-01-10",
      time: "10:00 PM",
      area: "la",
      venue: "Warehouse (DTLA)",
      address: "Location released day-of",
      ticketUrl: "#",
      flyerUrl: "",
      lineup: ["MGNA CRRRTA", "10cust"],
      verreAttending: true,
      notes: "Bring earplugs. Location is usually sent via text blast."
    },
    {
      id: "oc-afterhours-017",
      title: "OC Afterhours 017",
      date: "2026-01-17",
      time: "11:30 PM",
      area: "ocie",
      venue: "Undisclosed (Santa Ana)",
      address: "DM for address",
      ticketUrl: "#",
      flyerUrl: "",
      lineup: ["Susy Sheer", "Damon R."],
      verreAttending: false,
      notes: "Doors usually strict. Arrive early."
    }
  ]
};
