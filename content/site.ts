/**
 * Global facts used across the whole site (header, footer, JSON-LD, forms).
 * Edit here once and every page updates.
 */
export const site = {
  name: "Nairobi Chapel Ngong Road",
  shortName: "Nairobi Chapel",
  url: "https://nairobichapelngongroad.org",
  missionLine: "Being disciples and making disciples of Jesus Christ.",
  purposeLine: "We are committed to helping people grow D.E.E.P. to reach W.I.D.E.",
  /** Shown as an expansion once the church confirms what each letter stands for. */
  deep: "Daily devotions, eGroups, Engagement in service, Pulpit teaching and Sunday services",
  wide: "Witness, Impact society through mercy and justice, Disciple, Expand the Kingdom by planting churches",

  services: [
    { day: "Sunday", time: "9:00 AM", iso: "09:00" },
    { day: "Sunday", time: "11:30 AM", iso: "11:30" },
  ],
  serviceTimesShort: "Sundays 9:00 & 11:30 AM",

  address: {
    locality: "Ngong Road, Nairobi",
    country: "Kenya",
    countryCode: "KE",
    region: "Nairobi",
    // Not on the current site; confirm with the church before showing it anywhere
    landmark: "[TODO: confirm landmark, e.g. near Raila Odinga Stadium, off the Jamhuri Road area]",
    street: "[TODO: full street address]",
    plusCode: "[TODO: plus code]",
    /** Used for JSON-LD. Left null until the church confirms exact coordinates. */
    geo: null as { latitude: number; longitude: number } | null,
  },
  mapUrl: "https://maps.app.goo.gl/n53TFwLMWmHSst6e6",
  /** Google Maps embed URL for the click-to-load map. */
  mapEmbedUrl:
    "https://www.google.com/maps?q=Nairobi+Chapel+Ngong+Road,+Nairobi&output=embed",

  phone: {
    display: "+254 701 777 888",
    local: "0701 777 888",
    tel: "+254701777888",
  },
  whatsapp: {
    display: "+254 701 777 888",
    url: "https://wa.me/254701777888",
  },
  email: "mail@nairobichapel.org",

  googleRating: {
    rating: 4.7,
    count: 1758,
    url: "[TODO: link to the church's Google reviews (not a search results page)]",
  },

  socials: [
    { label: "Facebook", icon: "facebook", url: "[TODO: Facebook URL]" },
    { label: "X (Twitter)", icon: "x", url: "[TODO: X URL]" },
    { label: "Instagram", icon: "instagram", url: "[TODO: Instagram URL]" },
    { label: "YouTube", icon: "youtube", url: "[TODO: YouTube channel URL]" },
    { label: "TikTok", icon: "tiktok", url: "[TODO: TikTok URL]" },
  ],
  youtubeChannelUrl: "[TODO: YouTube channel URL]",

  giving: {
    paybill: "508701",
    accountHint: "The purpose of your gift, e.g. Tithe, Offering or PPI Bible",
    bank: {
      accountName: "Nairobi Chapel",
      accountNumber: "100 023 6906",
      bankName: "NCBA Bank Kenya PLC",
      branch: "Prestige branch",
      swift: "CBAFKENX",
    },
  },

  /** From the church site (/podcasts) and the show's public feed (anchor.fm). */
  podcast: {
    name: "The Compass Podcast",
    /** the show's name on Spotify, Apple and Amazon */
    showName: "The Nairobi Chapel Ngong Road Podcast",
    feedUrl: "https://anchor.fm/s/faec5b08/podcast/rss",
    platforms: [
      { label: "Listen on Spotify", platform: "Spotify", url: "https://open.spotify.com/show/6e6NsBwNO6MW6roYG47rmK" },
      { label: "Listen on Apple Podcasts", platform: "Apple Podcasts", url: "https://podcasts.apple.com/ke/podcast/the-nairobi-chapel-ngong-road-podcast/id1788218999" },
      { label: "Listen on Amazon Music", platform: "Amazon Music", url: "https://music.amazon.co.uk/podcasts/27b28654-f133-49f8-84ee-4d186f2e5692/the-nairobi-chapel-ngong-road-podcast" },
      { label: "Watch on YouTube", platform: "YouTube", url: "https://www.youtube.com/playlist?list=PLs6ogvG_T9E3vc2VUueL_Ocnw0exjO2ng" },
    ],
  },
} as const;

export type Site = typeof site;

/** True when a value is still a TODO placeholder (useful for hiding broken links). */
export const isTodo = (value: string | undefined | null): boolean =>
  !value || /\[TODO:[^\]]*\]/.test(value);
