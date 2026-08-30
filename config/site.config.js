/**
 * Quantum Gym — single source of truth for business data.
 * Edit prices, contact details, images and social links here.
 * Anything a human reads as translatable copy (headings, descriptions,
 * feature bullet points) lives in /locales/en.json instead,
 * keyed by the same `id` used below.
 */

module.exports = {
  siteName: "QUANTUM GYM",
  foundedYear: 2017,

  contact: {
    email: "quantum.gym@outlook.com",
    phone: "+357 22 777724",
    phoneHref: "+35722777724",
    addressLine1: "Nicosia",
    addressLine2: "Cyprus"
  },

  social: {
    facebook: "https://facebook.com/quantumgym",
    instagram: "https://instagram.com/quantumgym",
    tiktok: "https://www.tiktok.com/@quantumgym"
  },

  currency: "EUR",
  currencySymbol: "€",

  memberships: {
    gymOnly: {
      id: "gymOnly",
      featured: false,
      tiers: [
        { id: "7d", price: null, period: "7d" },
        { id: "1m", price: 60,   period: "1m" },
        { id: "3m", price: 155,  period: "3m" },
        { id: "6m", price: 280,  period: "6m" },
        { id: "1y", price: 500,  period: "1y" }
      ]
    },
    combo: {
      id: "combo",
      featured: true,
      price: 80,
      period: "month"
    },
    classVisit: {
      id: "classVisit",
      featured: false,
      price: 10,
      period: "visit"
    }
  },

  addons: [
    {
      id: "pt1",
      price: 25,
      unit: "session"
    },
    {
      id: "pt10",
      price: 200,
      unit: "10sessions"
    },
    {
      id: "pt22",
      price: 400,
      unit: "22sessions"
    },
    {
      id: "trainingProgram",
      price: 10,
      unit: "month"
    },
    {
      id: "plProgram",
      price: 30,
      unit: "month"
    },
    {
      id: "plCoaching",
      price: 90,
      unit: "month"
    }
  ],

  // Order matches the carousel order.
  classes: [
    { id: "absGlutes",     protocol: "01", image: "/images/class-abs-glutes.webp" },
    { id: "circuitHiit",   protocol: "02", image: "/images/class-circuit-hiit.webp" },
    { id: "mattPilates",   protocol: "03", image: "/images/class-matt-pilates.webp" },
    { id: "stretching",    protocol: "04", image: "/images/class-stretching.webp" },
    { id: "liftPump",      protocol: "05", image: "/images/class-lift-pump.webp" }
  ],

  // Facilities / gallery rooms.
  gallery: [
    { id: "classroom",      image: "/images/gallery-classroom.webp" },
    { id: "functional",     image: "/images/gallery-functional.webp" },
    { id: "gymArea",        image: "/images/gallery-gym-area.webp" },
    { id: "powerlifting",   image: "/images/gallery-powerlifting.webp" },
    { id: "cardio",         image: "/images/gallery-cardio.webp" }
  ],

  images: {
    hero: {
      src: "/images/hero-1600.webp",
      srcsetJpg: "/images/hero-800.webp 800w, /images/hero-1600.webp 1600w",
      srcsetWebp: "/images/hero-800.webp 800w, /images/hero-1600.webp 1600w"
    },
    about: {
      src: "/images/about-barbell-1400.webp",
      srcsetJpg: "/images/about-barbell-700.webp 700w, /images/about-barbell-1400.webp 1400w",
      srcsetWebp: "/images/about-barbell-700.webp 700w, /images/about-barbell-1400.webp 1400w"
    },
    logo: "/images/logo.png"
  }
};
