/**
 * ============================================================================
 *  PORTFOLIO — ALL SITE CONTENT LIVES IN THIS FILE
 * ============================================================================
 *
 *  Edit the text, links and projects below, save, and push to GitHub.
 *  Vercel redeploys automatically. You never need to touch the components.
 *
 *  Quick tips
 *  - Work images go in  /public/work/  and are referenced as "/work/<file>".
 *  - `width` / `height` = the image's size in pixels. Only the ratio matters
 *    (it reserves space so the page doesn't jump while images load).
 *  - In headings, wrap a word in _underscores_ to set it in the italic accent
 *    font, e.g. "Selected _work_".
 *  - Anything marked PLACEHOLDER is dummy content waiting to be replaced.
 *
 *  Source: the two Behance galleries by Sudhanshu Ranjan
 *  - FDS Work Portfolio (agency work, Fusion Design Studio), published July 2026
 *    https://www.behance.net/gallery/252895233/FDS-Work-Portfolioa
 *  - Graphic Design Portfolio (freelance + personal), published December 2024
 *    https://www.behance.net/gallery/214225265/Graphic-Design-Portfolio
 * ============================================================================
 */

/**
 * Work section boxes, in this order (the section headings from the two Behance
 * galleries). Each category is one box; clicking it opens every piece in it.
 * A category with no projects is hidden. Add or rename freely.
 */
export const categories = [
  "Social Media Posts",
  "Videos",
  "Banners",
  "Carousel",
  "E-Commerce",
  "Catalogues",
  "Brochure",
  "Photo Manipulation",
  "Print",
  "Logos",
  "Thumbnails",
] as const;

export type Category = (typeof categories)[number];

/**
 * How each category's box looks. `cover` = slug of the piece shown on the box
 * (defaults to the category's first piece). `wide` = the box spans two columns
 * and counts as two boxes. The grid has 2, 3, 4 or 6 columns depending on the
 * screen, so a total of 12 fills every row; otherwise the last row ends short.
 */
export const categoryBoxes: Partial<Record<Category, { cover?: string; wide?: boolean }>> = {
  "Social Media Posts": { cover: "raceby-spoke-alloy-red-stripes", wide: true },
  Videos: { cover: "video-raceby-alloy-wheel" },
  Banners: { cover: "dunaali-coming-soon-banner" },
  Carousel: { cover: "steel-cookware-six-slide-carousel" },
  "E-Commerce": { cover: "tattoo-tech-18500-battery-listing" },
  Catalogues: { cover: "raceby-catalogue-opening-pages" },
  Brochure: { cover: "homebud-brochure" },
  "Photo Manipulation": { cover: "city-double-exposure" },
  Print: { cover: "farmery-super-sale-poster" },
  Logos: { cover: "the-caramel-affair-logo" },
  Thumbnails: { cover: "moto-g84-review-thumbnail" },
};

export type Project = {
  /** Unique id, lowercase-with-dashes. */
  slug: string;
  title: string;
  category: Category;
  /** One or two sentences shown in the full-screen viewer. */
  description: string;
  /** Path inside /public, e.g. "/work/my-poster.jpg" (jpg, png, webp or avif). For a video, its poster frame. */
  image: string;
  /** For a video piece: the mp4 inside /public, e.g. "/work/videos/my-reel.mp4". It plays in the viewer. */
  video?: string;
  /** Image width in pixels. */
  width: number;
  /** Image height in pixels. */
  height: number;
  /** Leave empty ("") when unknown; it's then not shown. */
  year: number | string;
};

export type SocialIcon =
  | "instagram"
  | "linkedin"
  | "behance"
  | "dribbble"
  | "x"
  | "youtube"
  | "artstation"
  | "threads"
  | "link";

export type Social = {
  label: string;
  href: string;
  /** Shown under the label, e.g. a handle. Optional. */
  handle?: string;
  icon: SocialIcon;
};

export type Stat = { value: number; suffix?: string; label: string };

export type Service = { title: string; text: string };

/** A photo in /public. `alt` describes it for screen readers and search engines. */
export type Photo = { src: string; alt: string };

/**
 * A brand in the Clients section. `logos` are files in /public/clients/
 * (transparent PNG or SVG); a client with two brands lists both. With no
 * logo the name is shown as a wordmark instead.
 */
export type Client = { name: string; logos?: string[] };

export type SiteContent = {
  name: string;
  role: string;
  specialties: string[];
  intro: string;
  location: string;
  availability: { open: boolean; text: string };
  photos: { profile: Photo; cover: Photo & { caption?: string } };
  url: string;
  seo: { title: string; description: string; keywords: string[] };
  email: string;
  socials: Social[];
  headings: {
    work: string;
    workIntro: string;
    clients: string;
    clientsIntro: string;
    about: string;
    contact: string;
  };
  /** Brands for the Clients section, in display order. */
  clients: Client[];
  about: { statement: string; paragraphs: string[]; services: Service[] };
  stats: Stat[];
  skills: string[];
  projects: Project[];
};

/* -------------------------------------------------------------- projects */
/**
 * Grouped by `category` (boxes follow the `categories` order above); inside an
 * opened box pieces keep the order they have here. The grid fills column by
 * column, so on desktop (4 columns) roughly the first quarter goes down the
 * left column.
 * `year` = the year the piece was published on Behance
 * (FDS gallery: 2026, Graphic Design Portfolio gallery: 2024).
 */
const projects: Project[] = [
  {
    slug: "raceby-alloy-wheels",
    title: "Raceby Alloy Wheels",
    category: "Social Media Posts",
    description:
      "Key visual for Raceby: a classic motorcycle on a desert highway at golden hour, under the line “Built by one of India's leading alloy wheel manufacturers”.",
    image: "/work/raceby-alloy-wheels.jpg",
    width: 1920,
    height: 2400,
    year: 2026,
  },
  {
    slug: "raceby-strength-design-durability",
    title: "Raceby — Strength, Design, Durability",
    category: "Social Media Posts",
    description:
      "Monochrome Raceby poster of a rider charging through a rain-slick city street, the bright alloy front wheel in focus under the headline “Strength. Design. Durability.” and the line “Our promise in every wheel.”",
    image: "/work/raceby-strength-design-durability.jpg",
    width: 1450,
    height: 1800,
    year: 2026,
  },
  {
    slug: "uniflex-xlpe-insulation",
    title: "Uniflex High-Performance XLPE Insulation",
    category: "Social Media Posts",
    description:
      "Light blue product post for Uniflex XLPE insulation: a curled grey foam sheet under the headline “High-Performance XLPE Insulation” with an eight-icon spec panel covering density, thermal conductivity, temperature range and fire class.",
    image: "/work/uniflex-xlpe-insulation.jpg",
    width: 1080,
    height: 1350,
    year: 2026,
  },
  {
    slug: "uniflex-acetate-thermal-insulation-foam",
    title: "Uniflex Acetate Thermal Insulation Foam",
    category: "Social Media Posts",
    description:
      "Dark spec-sheet post for Uniflex Acetate Thermal Insulation Foam: a rolled grey sheet in a misty plant room beside an icon list of eight properties, closing on “Engineered for performance. Built for reliability.”",
    image: "/work/uniflex-acetate-thermal-insulation-foam.jpg",
    width: 1102,
    height: 1428,
    year: 2026,
  },
  {
    slug: "raceby-spoke-alloy-red-stripes",
    title: "Raceby — Spoke Alloy on Red",
    category: "Social Media Posts",
    description:
      "Raceby poster with an oversized black-and-silver multi-spoke alloy wheel rising behind a red Royal Enfield, set on a red background cut by yellow and black racing stripes.",
    image: "/work/raceby-spoke-alloy-red-stripes.jpg",
    width: 1350,
    height: 1800,
    year: 2026,
  },
  {
    slug: "raceby-custom-alloy-wheels-indian-bike",
    title: "Raceby — Custom Alloy Wheels",
    category: "Social Media Posts",
    description:
      "Lifestyle post of a man in a three-piece suit leaning on a green Royal Enfield fitted with a Raceby disc-style alloy, under the headline “Custom Alloy Wheels for Every Indian Bike.”",
    image: "/work/raceby-custom-alloy-wheels-indian-bike.jpg",
    width: 1440,
    height: 1800,
    year: 2026,
  },
  {
    slug: "raceby-durable-and-reliable",
    title: "Raceby — Durable & Reliable",
    category: "Social Media Posts",
    description:
      "Studio-lit Raceby post of a black three-spoke alloy wheel with a white rim in front of a matte Royal Enfield, under the headline “Durable & Reliable” and “Safe for every ride.”",
    image: "/work/raceby-durable-and-reliable.jpg",
    width: 1450,
    height: 1800,
    year: 2026,
  },
  {
    slug: "uniflex-acoustic-insulation-applications",
    title: "Uniflex Acoustic Insulation for Noise Control",
    category: "Social Media Posts",
    description:
      "Product post for Uniflex acoustic foam: a grey foam slab surrounded by labelled application scenes (HVAC ducting, machinery room, auditorium wall, partition, flooring) under the headline “Acoustic Insulation for Noise Control.”",
    image: "/work/uniflex-acoustic-insulation-applications.jpg",
    width: 1441,
    height: 1800,
    year: 2026,
  },
  {
    slug: "uniflex-fire-retardant-foam-spec-sheet",
    title: "Uniflex Fire-Retardant XLPE Foam Spec Sheet",
    category: "Social Media Posts",
    description:
      "Dark spec-sheet post for Fire-Retardant XLPE / XPE Foam: a foil-faced roll unspooling in a ducted plant room beside seven property icons, closing on “Engineered for fire safety. Built for thermal reliability.”",
    image: "/work/uniflex-fire-retardant-foam-spec-sheet.jpg",
    width: 1102,
    height: 1428,
    year: 2026,
  },
  {
    slug: "uniflex-fire-retardant-foam",
    title: "Uniflex Fire-Retardant Foam",
    category: "Social Media Posts",
    description:
      "Product post for Uniflex XLPE / XPE insulation foam, starring a friendly foam-roll mascot beside the product and a row of spec icons.",
    image: "/work/uniflex-fire-retardant-foam.jpg",
    width: 1921,
    height: 2400,
    year: 2026,
  },
  {
    slug: "uniflex-heat-reducer-spec-sheet",
    title: "Uniflex Heat Reducer Reflective Insulation Spec Sheet",
    category: "Social Media Posts",
    description:
      "Dark spec-sheet post for Heat Reducer Reflective Insulation: three stacked foil rolls in a steel warehouse with glowing heat rays bouncing off them, an eleven-point spec list and the line “Engineered to reflect heat. Built for thermal efficiency.”",
    image: "/work/uniflex-heat-reducer-spec-sheet.jpg",
    width: 1102,
    height: 1428,
    year: 2026,
  },
  {
    slug: "raceby-desert-spoke-wheel",
    title: "Raceby — Desert Spoke Wheel",
    category: "Social Media Posts",
    description:
      "Raceby poster of a giant black multi-spoke alloy wheel kicking up a sandstorm in the desert while a black Royal Enfield wearing the same wheel rolls into frame.",
    image: "/work/raceby-desert-spoke-wheel.jpg",
    width: 1350,
    height: 1800,
    year: 2026,
  },
  {
    slug: "uniflex-prothin-foam",
    title: "Uniflex Lightweight Prothin Foam",
    category: "Social Media Posts",
    description:
      "Product post for Lightweight Prothin Foam: a flat grey foam sheet against a factory floor and a car-interior wireframe, headed “Lightweight Prothin Foam for Automotive & Industrial Applications” with a five-icon spec strip.",
    image: "/work/uniflex-prothin-foam.jpg",
    width: 1441,
    height: 1800,
    year: 2026,
  },
  {
    slug: "uniflex-prothin-foam-spec-sheet",
    title: "Uniflex Prothin Foam Spec Sheet",
    category: "Social Media Posts",
    description:
      "Dark spec-sheet post for Lightweight Prothin Foam: a thin grey sheet on a car-plant floor beside ten technical properties, closing on “Engineered for lightweight performance. Built for durability & protection.”",
    image: "/work/uniflex-prothin-foam-spec-sheet.jpg",
    width: 1102,
    height: 1428,
    year: 2026,
  },
  {
    slug: "uniflex-xlpe-hose-pipe",
    title: "Uniflex Crosslinked XLPE Hose Pipe",
    category: "Social Media Posts",
    description:
      "Product post for Crosslinked XPE / XLPE Hose Pipe with UV Barrier Film: three coils of white and black insulated copper tubing in front of an AC outdoor unit, with a five-icon spec strip.",
    image: "/work/uniflex-xlpe-hose-pipe.jpg",
    width: 1080,
    height: 1350,
    year: 2026,
  },
  {
    slug: "uniflex-xlpe-hose-pipe-spec-sheet",
    title: "Uniflex XLPE Hose Pipe Spec Sheet",
    category: "Social Media Posts",
    description:
      "Dark spec-sheet post for Crosslinked XPE / XLPE Hose Pipe: insulated copper-tube coils in front of an AC condenser beside nine specifications, closing on “Engineered for thermal protection. Built for HVAC durability.”",
    image: "/work/uniflex-xlpe-hose-pipe-spec-sheet.jpg",
    width: 1102,
    height: 1428,
    year: 2026,
  },
  {
    slug: "uniflex-heat-reducer-reflective-insulation",
    title: "Uniflex Heat Reducer Reflective Insulation",
    category: "Social Media Posts",
    description:
      "Light blue product post for Heat Reducer Reflective Insulation: three stacked aluminium-foil rolls in a bright warehouse under the line “Reflect radiant heat. Improve thermal efficiency.” with a five-icon spec strip.",
    image: "/work/uniflex-heat-reducer-reflective-insulation.jpg",
    width: 1440,
    height: 1800,
    year: 2026,
  },
  {
    slug: "uniflex-acoustic-insulation-spec-sheet",
    title: "Uniflex Acoustic Insulation Spec Sheet",
    category: "Social Media Posts",
    description:
      "Dark spec-sheet post for Acoustic Insulation for Noise Control: a draped grey foam sheet in a server-room setting with a glowing blue sound wave, seven property icons and “Engineered for acoustic comfort. Built for durable performance.”",
    image: "/work/uniflex-acoustic-insulation-spec-sheet.jpg",
    width: 1086,
    height: 1448,
    year: 2026,
  },
  {
    slug: "raceby-alloys-that-elevate-rides",
    title: "Raceby — Alloys That Elevate Rides",
    category: "Social Media Posts",
    description:
      "Raceby post of a ghosted, translucent Hero Splendor whose solid black three-spoke alloy wheels stand out, under the headline “Alloys that elevates rides” and model tag #22FG.",
    image: "/work/raceby-alloys-that-elevate-rides.jpg",
    width: 1280,
    height: 1600,
    year: 2026,
  },
  {
    slug: "raceby-style-that-moves-faster",
    title: "Raceby — Style That Moves Faster",
    category: "Social Media Posts",
    description:
      "Raceby post of a polished silver curved-spoke alloy wheel standing over a sunset highway streaked with light trails, under the headline “Style that moves faster.”",
    image: "/work/raceby-style-that-moves-faster.jpg",
    width: 1280,
    height: 1600,
    year: 2026,
  },
  {
    slug: "raceby-smooth-ride-interchange",
    title: "Raceby — Turning Every Corner",
    category: "Social Media Posts",
    description:
      "Top-down Raceby post where a silver three-spoke alloy wheel doubles as a highway cloverleaf interchange through a forest, under the line “Turning every corner into a smooth ride.” and tag #22FG.",
    image: "/work/raceby-smooth-ride-interchange.jpg",
    width: 1440,
    height: 1800,
    year: 2026,
  },
  {
    slug: "raceby-built-for-speed-crafted-for-style",
    title: "Raceby — Built for Speed, Crafted for Style",
    category: "Social Media Posts",
    description:
      "Spotlit Raceby post of a silver five-spoke alloy wheel floating among broken rocks, under the headline “Built for speed. Crafted for style.” and tag #36H.",
    image: "/work/raceby-built-for-speed-crafted-for-style.jpg",
    width: 1440,
    height: 1800,
    year: 2026,
  },
  {
    slug: "raceby-the-perfect-alloy",
    title: "Raceby — The Perfect Alloy",
    category: "Social Media Posts",
    description:
      "Raceby post of an oversized black five-spoke alloy rising behind a grey commuter bike on a hilltop terrace at dusk, under the headline “The Perfect Alloy into the future.” and tag #41k2.",
    image: "/work/raceby-the-perfect-alloy.jpg",
    width: 1440,
    height: 1800,
    year: 2026,
  },
  {
    slug: "raceby-take-every-ride",
    title: "Raceby — Take Every Ride",
    category: "Social Media Posts",
    description:
      "Raceby post of a red-and-black TVS Star City on a rocky ledge beside a giant silver five-spoke alloy wheel, under the headline “Take every ride to the next level of style” and tag #71S.",
    image: "/work/raceby-take-every-ride.jpg",
    width: 1440,
    height: 1800,
    year: 2026,
  },
  {
    slug: "raceby-giant-wave-alloy",
    title: "Raceby — Giant Wave Alloy",
    category: "Social Media Posts",
    description:
      "Raceby poster of a towering chrome wave-pattern alloy wheel framing a Royal Enfield on a road that splits between city towers and open desert.",
    image: "/work/raceby-giant-wave-alloy.jpg",
    width: 1440,
    height: 1800,
    year: 2026,
  },
  {
    slug: "shivaji-maharaj-jayanti",
    title: "Chhatrapati Shivaji Maharaj Jayanti",
    category: "Social Media Posts",
    description:
      "Vertical festive post for Shivaji Maharaj Jayanti on February 19: an illustrated Shivaji Maharaj in front of a hill fort with saffron flags, titled in Marathi and English with the line “Strength, vision, and fearless pride.”",
    image: "/work/shivaji-maharaj-jayanti.jpg",
    width: 1012,
    height: 1800,
    year: 2026,
  },
  {
    slug: "airon-windsor-digital-panel-meter",
    title: "Airon Windsor Digital Panel Meter",
    category: "Social Media Posts",
    description:
      "Vertical product post for Airon and Windsor digital panel display meters: blue and green square meters on a dark circuit-board surface under the headline “Panel Mount, Smart Monitoring for Smart Panels” and “Volt + Ampere + Frequency.”",
    image: "/work/airon-windsor-digital-panel-meter.jpg",
    width: 900,
    height: 1600,
    year: 2026,
  },
  {
    slug: "raceby-lets-ride-lets-live",
    title: "Raceby — Let’s Ride. Let’s Live.",
    category: "Social Media Posts",
    description:
      "Beige Raceby post showing the same black-and-silver curved-spoke alloy fitted to a Hero Splendor+, a Royal Enfield Classic and a Bajaj CT 100, under the headline “Let’s ride. Let’s live.” and “Upgrade the wheel. Upgrade the ride.”",
    image: "/work/raceby-lets-ride-lets-live.jpg",
    width: 1200,
    height: 1500,
    year: 2026,
  },
  {
    slug: "raceby-built-for-the-curves",
    title: "Raceby — Built for the Curves",
    category: "Social Media Posts",
    description:
      "A rider leaning into a mountain bend beneath a giant Raceby wheel, signed off with “Precision. Strength. Legacy.”",
    image: "/work/raceby-built-for-the-curves.jpg",
    width: 1921,
    height: 2400,
    year: 2026,
  },
  {
    slug: "alloy-wheels-village-commuter",
    title: "Alloys — Village Commuter",
    category: "Social Media Posts",
    description:
      "Warm rural scene of a silver commuter bike on black three-spoke alloys parked outside a thatched hut, with a smiling couple standing beside it under a banyan tree.",
    image: "/work/alloy-wheels-village-commuter.jpg",
    width: 1450,
    height: 1800,
    year: 2026,
  },
  {
    slug: "alloy-wheels-enfield-in-the-park",
    title: "Alloys — Enfield in the Park",
    category: "Social Media Posts",
    description:
      "Close-up of a maroon Royal Enfield’s front end on a silver curved-spoke alloy, parked at the edge of a park where a group of friends picnics in the background.",
    image: "/work/alloy-wheels-enfield-in-the-park.jpg",
    width: 1450,
    height: 1800,
    year: 2026,
  },
  {
    slug: "raceby-alloy-volcanic-landscape",
    title: "Raceby — Alloy on Volcanic Rock",
    category: "Social Media Posts",
    description:
      "Raceby product visual of a silver three-spoke alloy wheel standing upright on a field of dark volcanic rock under a beam of cyan light.",
    image: "/work/raceby-alloy-volcanic-landscape.jpg",
    width: 1450,
    height: 1800,
    year: 2026,
  },
  {
    slug: "raceby-night-riders",
    title: "Raceby — Night Riders",
    category: "Social Media Posts",
    description:
      "Night Raceby poster of two helmeted riders with their bikes on a wet mountain road painted with “RACEBY” lettering, a giant curved-spoke alloy glowing in the sky between them.",
    image: "/work/raceby-night-riders.jpg",
    width: 1450,
    height: 1800,
    year: 2026,
  },
  {
    slug: "raceby-wireframe-enfield",
    title: "Raceby — Wireframe Enfield",
    category: "Social Media Posts",
    description:
      "Raceby visual of a Royal Enfield drawn as a white line sketch on an open road at sunrise, with only its silver curved-spoke alloy wheels rendered solid.",
    image: "/work/raceby-wireframe-enfield.jpg",
    width: 1450,
    height: 1800,
    year: 2026,
  },
  {
    slug: "alloy-wheels-moonlit",
    title: "Alloys — Moonlit Wheel",
    category: "Social Media Posts",
    description:
      "Dark visual of a red Hero sport bike on a reflective surface in front of a giant backlit five-spoke alloy wheel glowing orange under a full moon.",
    image: "/work/alloy-wheels-moonlit.jpg",
    width: 1450,
    height: 1800,
    year: 2026,
  },
  {
    slug: "raceby-x-ray-bike",
    title: "Raceby — X-Ray Bike",
    category: "Social Media Posts",
    description:
      "Raceby visual of a commuter bike rendered as a translucent blue X-ray shell, leaving its solid black three-spoke alloy wheels as the only opaque parts.",
    image: "/work/raceby-x-ray-bike.jpg",
    width: 1450,
    height: 1800,
    year: 2026,
  },
  {
    slug: "raceby-cheetah-speed",
    title: "Raceby — Cheetah Speed",
    category: "Social Media Posts",
    description:
      "Raceby visual of a cheetah sprinting across desert sand that merges into a silver three-spoke alloy wheel kicking up dust.",
    image: "/work/raceby-cheetah-speed.jpg",
    width: 1450,
    height: 1800,
    year: 2026,
  },
  {
    slug: "raceby-airfield-sunset-wheel",
    title: "Raceby — Airfield at Sunset",
    category: "Social Media Posts",
    description:
      "Lifestyle visual for Raceby alloy wheels: a chrome motorcycle’s silver five-spoke front wheel in close-up on a runway, with a woman seated beside it and a private jet behind at golden hour.",
    image: "/work/raceby-airfield-sunset-wheel.jpg",
    width: 1450,
    height: 1800,
    year: 2026,
  },
  {
    slug: "raceby-black-spoke-wheel-skyline",
    title: "Raceby — Black Spoke Wheel at Dusk",
    category: "Social Media Posts",
    description:
      "Product render of a matte-black multi-spoke Raceby wheel standing on an empty flyover road against a purple dusk city skyline.",
    image: "/work/raceby-black-spoke-wheel-skyline.jpg",
    width: 1450,
    height: 1800,
    year: 2026,
  },
  {
    slug: "raceby-silver-wheel-rainy-street",
    title: "Raceby — Silver Wheel on a Wet Street",
    category: "Social Media Posts",
    description:
      "Product render of a rain-beaded silver three-spoke Raceby wheel on a wet night street lit by blue and orange neon reflections.",
    image: "/work/raceby-silver-wheel-rainy-street.jpg",
    width: 1450,
    height: 1800,
    year: 2026,
  },
  {
    slug: "raceby-swirl-wheel-spotlights",
    title: "Raceby — Swirl Wheel Under Spotlights",
    category: "Social Media Posts",
    description:
      "Product render of a white swirl-spoke Raceby wheel glowing in a dark, smoky stage set, lit by four floor spotlights.",
    image: "/work/raceby-swirl-wheel-spotlights.jpg",
    width: 1450,
    height: 1800,
    year: 2026,
  },
  {
    slug: "raceby-water-splash-wheel",
    title: "Raceby — Water Splash",
    category: "Social Media Posts",
    description:
      "Close-up of a Royal Enfield’s Raceby-badged front wheel ploughing through shallow water, frozen mid-splash in a cool blue tone.",
    image: "/work/raceby-water-splash-wheel.jpg",
    width: 1450,
    height: 1800,
    year: 2026,
  },
  {
    slug: "raceby-black-wheel-dirt-track",
    title: "Raceby — Black Wheel on a Dirt Track",
    category: "Social Media Posts",
    description:
      "Top-down product shot of a black Raceby wheel with silver-cut spokes set into a winding asphalt track carved through gravel and dust.",
    image: "/work/raceby-black-wheel-dirt-track.jpg",
    width: 1450,
    height: 1800,
    year: 2026,
  },
  {
    slug: "raceby-swirl-wheel-rock-burst",
    title: "Raceby — Breaking Through Rock",
    category: "Social Media Posts",
    description:
      "Product render of a white swirl-spoke Raceby wheel bursting out of cracked earth as rocks and dust fly around it under a shaft of light.",
    image: "/work/raceby-swirl-wheel-rock-burst.jpg",
    width: 1450,
    height: 1800,
    year: 2026,
  },
  {
    slug: "winchef-kitchen-tools-set",
    title: "Winchef — Tools That Make Cooking Better",
    category: "Social Media Posts",
    description:
      "Product post for Winchef steel kitchen tools: six skimmers, turners and ladles laid out on a wooden kitchen table under the headline “The kind of Tools that quietly make cooking feel Better.”",
    image: "/work/winchef-kitchen-tools-set.jpg",
    width: 1080,
    height: 1350,
    year: 2026,
  },
  {
    slug: "raceby-real-upgrade-forest",
    title: "Raceby — Your Ride’s Real Upgrade",
    category: "Social Media Posts",
    description:
      "Ad for Raceby alloy wheels: a motorcycle with a silver five-spoke wheel parked on a sunlit forest trail, a couple picnicking behind, under the headline “Your Ride’s Real Upgrade starts with the Raceby.”",
    image: "/work/raceby-real-upgrade-forest.jpg",
    width: 1394,
    height: 1800,
    year: 2026,
  },
  {
    slug: "jvl-personalised-lunchbox",
    title: "JVL — Not Just a Lunchbox",
    category: "Social Media Posts",
    description:
      "Product post for JVL steel lunchboxes engraved with the names “Pratik” and “Meenakshi” on a kitchen counter, under the headline “Not just a lunchbox — your name, your story, your everyday comfort.”",
    image: "/work/jvl-personalised-lunchbox.jpg",
    width: 1450,
    height: 1800,
    year: 2026,
  },
  {
    slug: "raceby-race-track-pit-stop",
    title: "Raceby — Pit Stop at the Track",
    category: "Social Media Posts",
    description:
      "Lifestyle visual of a Royal Enfield on a swirl-spoke Raceby wheel parked at a race track, with a couple chatting by a chequered-flag wall and an open toolbox.",
    image: "/work/raceby-race-track-pit-stop.jpg",
    width: 1450,
    height: 1800,
    year: 2026,
  },
  {
    slug: "raceby-jet-engine-wheel",
    title: "Raceby — Jet Engine Wheel",
    category: "Social Media Posts",
    description:
      "Concept visual in which a jet airliner’s engine intake is replaced by a giant black Raceby spoke wheel, with a Royal Enfield parked on the apron below.",
    image: "/work/raceby-jet-engine-wheel.jpg",
    width: 1450,
    height: 1800,
    year: 2026,
  },
  {
    slug: "raceby-ride-strong-splendor",
    title: "Raceby — Ride Strong",
    category: "Social Media Posts",
    description:
      "Ad showing a black Hero Splendor on white swirl-spoke wheels in front of an oversized version of the same wheel, under the headline “Ride Strong, Ride Raceby.”",
    image: "/work/raceby-ride-strong-splendor.jpg",
    width: 1440,
    height: 1800,
    year: 2026,
  },
  {
    slug: "raceby-make-every-moment-remarkable",
    title: "Raceby — Make Every Moment Remarkable",
    category: "Social Media Posts",
    description:
      "Monsoon ad of a Hero Splendor+ with a silver Raceby wheel on a wet roadside, three friends sheltering at a tea stall behind, under the headline “Make Every Moment Remarkable with Raceby” and a “For Splendor / Classic” strip.",
    image: "/work/raceby-make-every-moment-remarkable.jpg",
    width: 1392,
    height: 1800,
    year: 2026,
  },
  {
    slug: "homebud-holi-cleaning-story",
    title: "Home Bud — Holi Khelo Bina Dar",
    category: "Social Media Posts",
    description:
      "Holi story ad for Home Bud cleaning tools: a mother and daughter playing with colour on a cream sofa above a wiper, broom and scrub pad, under the headline “Is Saal Holi Khelo Bina Dar.”",
    image: "/work/homebud-holi-cleaning-story.jpg",
    width: 1012,
    height: 1800,
    year: 2026,
  },
  {
    slug: "raceby-race-track-duel",
    title: "Raceby — Race Track Duel",
    category: "Social Media Posts",
    description:
      "Visual of two riders on a Hero Splendor and a Royal Enfield racing down a track with speed streaks, beneath a giant translucent three-spoke Raceby wheel in the sky.",
    image: "/work/raceby-race-track-duel.jpg",
    width: 1080,
    height: 1350,
    year: 2026,
  },
  {
    slug: "homebud-best-buddy-retailer",
    title: "Home Bud — Your Home’s Best Buddy",
    category: "Social Media Posts",
    description:
      "Retailer poster for Home Bud showing the full range of brooms, wipers, hangers and scrubbers under the headline “Your Home’s Best Buddy,” with a dealer’s photo, store address and QR code below.",
    image: "/work/homebud-best-buddy-retailer.jpg",
    width: 1269,
    height: 1800,
    year: 2026,
  },
  {
    slug: "dunaali-strong-man-beer",
    title: "Dunaali — The Strong Man Beer",
    category: "Social Media Posts",
    description:
      "Launch post for Dunaali beer: a gold can in a smoky, sepia western scene, with the lines “Built for men, brewed to be legendary”.",
    image: "/work/dunaali-strong-man-beer.jpg",
    width: 1254,
    height: 1254,
    year: 2026,
  },
  {
    slug: "dunaali-coming-soon-story",
    title: "Dunaali — Coming Soon",
    category: "Social Media Posts",
    description:
      "Launch story for Dunaali beer: a black-and-gold 500 ml can on a dark beach at sunset beside the headline “Coming Soon!” and the line “Built for men, brewed to be legendary.”",
    image: "/work/dunaali-coming-soon-story.jpg",
    width: 900,
    height: 1600,
    year: 2026,
  },
  {
    slug: "raceby-style-that-moves-you",
    title: "Raceby — Style That Moves You",
    category: "Social Media Posts",
    description:
      "Night ad of a rider on a black Royal Enfield Bullet looking up at a black three-spoke Raceby wheel trailing red light streaks, under the headline “Style That Moves You.”",
    image: "/work/raceby-style-that-moves-you.jpg",
    width: 1122,
    height: 1402,
    year: 2026,
  },
  {
    slug: "raceby-limited-stock-hero-wheels",
    title: "Raceby — Limited Stock Offer",
    category: "Social Media Posts",
    description:
      "Offer post for Raceby Hero alloy wheels showing four models (22FG/22FH, 22FG2/22FH2, 23FG/23FH, 23FG2/23FH2) on lit plinths under the headline “Limited Stock for Special Prices.”",
    image: "/work/raceby-limited-stock-hero-wheels.jpg",
    width: 1280,
    height: 1600,
    year: 2026,
  },
  {
    slug: "winchef-gold-skimmer",
    title: "Winchef — Lift It Right, Drain It Easy",
    category: "Social Media Posts",
    description:
      "Product post for a gold Winchef slotted skimmer on a walnut chopping board beside a copper pot and a dish of spices, under the headline “Lift it right, Drain it easy.”",
    image: "/work/winchef-gold-skimmer.jpg",
    width: 1080,
    height: 1350,
    year: 2026,
  },
  {
    slug: "kk-powerswipe-wiper-packaging",
    title: "KK Powerswipe — Wiper Package Design",
    category: "Social Media Posts",
    description:
      "Dimensioned front-and-back packaging dieline for the KK Powerswipe wiper, a blue and gold header card with transparent windows and the tagline “Swipe strong. Shine longer.”",
    image: "/work/kk-powerswipe-wiper-packaging.jpg",
    width: 1800,
    height: 607,
    year: 2026,
  },
  {
    slug: "tattoo-tech-led-workstation",
    title: "Tattoo Tech — LED Workstation",
    category: "Social Media Posts",
    description:
      "Product post for a black tattoo LED workstation with adjustable arms, tray and wheels on a marble plinth, headlined “Tattoo LED Workstation” with five feature icons.",
    image: "/work/tattoo-tech-led-workstation.jpg",
    width: 1122,
    height: 1402,
    year: 2026,
  },
  {
    slug: "tattoo-tech-saddle-stool",
    title: "Tattoo Tech — Saddle Stool 9949A",
    category: "Social Media Posts",
    description:
      "Product post for a black adjustable saddle stool on a chrome rolling base in a dark tattoo studio, headlined “Adjustable Saddle Stool Chair Rolling 9949A” with four spec icons.",
    image: "/work/tattoo-tech-saddle-stool.jpg",
    width: 1122,
    height: 1402,
    year: 2026,
  },
  {
    slug: "tattoo-tech-rotary-machine",
    title: "Tattoo Tech — Digital Display Rotary Machine",
    category: "Social Media Posts",
    description:
      "Product post for a rotary tattoo machine with a digital display and chrome grip standing on a glass block, headlined “Fusion Digital Display Rotary Tattoo Machine.”",
    image: "/work/tattoo-tech-rotary-machine.jpg",
    width: 1122,
    height: 1402,
    year: 2026,
  },
  {
    slug: "radiant-shading-solution",
    title: "Radiant — Shading Solution",
    category: "Social Media Posts",
    description:
      "Product post for a 1 oz bottle of Radiant shader solution on a glass disc in soft white light, headlined “Radiant Shading Solution 1oz” with the line “Precision in every shade.”",
    image: "/work/radiant-shading-solution.jpg",
    width: 1122,
    height: 1402,
    year: 2026,
  },
  {
    slug: "zooni-tattoo-pen-machine",
    title: "Zooni Tattoo Pen Machine",
    category: "Social Media Posts",
    description:
      "Product post for a tattoo pen machine: a splash-painted pen on dark rock, with a clean row of feature icons underneath.",
    image: "/work/zooni-tattoo-pen-machine.jpg",
    width: 1122,
    height: 1402,
    year: 2026,
  },
  {
    slug: "inkin-revo-cartridges",
    title: "INKin Revo Cartridges",
    category: "Social Media Posts",
    description:
      "Product post for tattoo cartridge needles: a translucent green cartridge and its box under the headline “Precision re-defined.”",
    image: "/work/inkin-revo-cartridges.jpg",
    width: 1122,
    height: 1402,
    year: 2026,
  },
  {
    slug: "windsor-digital-protector-meter",
    title: "Windsor — Digital Protector Meter",
    category: "Social Media Posts",
    description:
      "Product post for a Windsor three-phase voltage and current protector wired into a distribution board, under the headline “Tired of Resetting Back-up Meter Due to Overload” with three feature icons and a QR code.",
    image: "/work/windsor-digital-protector-meter.jpg",
    width: 1450,
    height: 1800,
    year: 2026,
  },
  {
    slug: "windsor-national-flag-day",
    title: "Windsor — National Flag Day",
    category: "Social Media Posts",
    description:
      "Occasion post for Airon, Windsor and PRG Group: a cartoon electrician saluting the Indian flag above the Red Fort, headlined “National Flag Day” with a note on its adoption on 22 July 1947.",
    image: "/work/windsor-national-flag-day.jpg",
    width: 1122,
    height: 1402,
    year: 2026,
  },
  {
    slug: "uniflex-xlpe-foam-pipe-worker",
    title: "Uniflex — Fire-Retardant XLPE / XPE Foam",
    category: "Social Media Posts",
    description:
      "Product post for fire-retardant XLPE / XPE foam: a worker in a hard hat wrapping a foil-faced roll around industrial pipes beside the foam-roll mascot, under the line “Fire-safe insulation for demanding industrial environments.”",
    image: "/work/uniflex-xlpe-foam-pipe-worker.jpg",
    width: 1389,
    height: 1800,
    year: 2026,
  },
  {
    slug: "uniflex-acetate-thermal-foam",
    title: "Uniflex — Acetate Thermal Insulation Foam",
    category: "Social Media Posts",
    description:
      "Product post for Uniflex acetate thermal insulation foam: an engineer with a clipboard checking overhead ducts while the foam-roll mascot points to a sheet of grey foam, under the line “Efficient insulation for quieter, moisture-protected spaces.”",
    image: "/work/uniflex-acetate-thermal-foam.jpg",
    width: 1102,
    height: 1428,
    year: 2026,
  },
  {
    slug: "uniflex-prothin-automotive-foam",
    title: "Uniflex — Lightweight Prothin Foam",
    category: "Social Media Posts",
    description:
      "Product post for Lightweight Prothin Foam: a technician laying a grey foam sheet into a van floor as the foam-roll mascot looks on, under the line “Thin, durable cushioning for automotive and OEM use.”",
    image: "/work/uniflex-prothin-automotive-foam.jpg",
    width: 1389,
    height: 1800,
    year: 2026,
  },
  {
    slug: "uniflex-acoustic-insulation",
    title: "Uniflex — Acoustic Insulation for Noise Control",
    category: "Social Media Posts",
    description:
      "Product post for acoustic insulation foam: a draped grey foam sheet and the shushing foam-roll mascot in a dark screening room, headlined “Acoustic Insulation for Noise Control.”",
    image: "/work/uniflex-acoustic-insulation.jpg",
    width: 1389,
    height: 1800,
    year: 2026,
  },
  {
    slug: "uniflex-heat-reducer-reflective",
    title: "Uniflex — Heat Reducer Reflective Insulation",
    category: "Social Media Posts",
    description:
      "Product post for Heat Reducer reflective insulation: workers on scaffolding fitting foil under a factory roof, with stacked foil rolls and the foam-roll mascot in front, under the line “Reflect radiant heat and keep interior cooler.”",
    image: "/work/uniflex-heat-reducer-reflective.jpg",
    width: 1102,
    height: 1428,
    year: 2026,
  },
  {
    slug: "uniflex-xlpe-ac-hose-pipe",
    title: "Uniflex — Crosslinked XPE/XLPE Hose Pipe",
    category: "Social Media Posts",
    description:
      "Product post for crosslinked XPE/XLPE hose pipe: coils of insulated copper AC line beside an outdoor AC unit and the pointing foam-roll mascot, under the line “Reliable AC line protection for long-lasting outdoor use.”",
    image: "/work/uniflex-xlpe-ac-hose-pipe.jpg",
    width: 1389,
    height: 1800,
    year: 2026,
  },
  {
    slug: "homebud-cleaning-buddy-web-banner",
    title: "HomeBud — Website Banner",
    category: "Banners",
    description:
      "Wide web banner for HomeBud home-cleaning products, setting wipers, a broom, a floor duster and a kids’ hanger pack against a sunlit bathroom under the line “Your Home’s Best Cleaning Buddy”.",
    image: "/work/homebud-cleaning-buddy-web-banner.jpg",
    width: 1800,
    height: 600,
    year: 2026,
  },
  {
    slug: "jvl-cookware-holi-banner",
    title: "JVL Cookware — Holi Banner",
    category: "Banners",
    description:
      "Holi web banner for JVL Cookware showing a stainless-steel range of canisters, steamers, kettle, tiffin and pans on a marble counter with colour powders, headlined “Cook with vibrant flavours this Holi with JVL Cookware”.",
    image: "/work/jvl-cookware-holi-banner.jpg",
    width: 1800,
    height: 609,
    year: 2026,
  },
  {
    slug: "raceby-style-that-spins-stronger-banner",
    title: "Raceby — “Style That Spins Stronger” Banner",
    category: "Banners",
    description:
      "Web banner for Raceby alloy wheels with an oversized black-and-silver wheel over a sunset mountain road and a rider, headlined “Style That Spins Stronger.” with a Shop Now button.",
    image: "/work/raceby-style-that-spins-stronger-banner.jpg",
    width: 1600,
    height: 583,
    year: 2026,
  },
  {
    slug: "dunaali-coming-soon-banner",
    title: "Dunaali Beer — “Coming Soon” Banner",
    category: "Banners",
    description:
      "Teaser banner for Dunaali, “The Strong Man Beer”, with a dewy black-and-gold 500 ml can on a sunset beach beside the gold headline “Coming Soon!” and the line “Unleash Your Legend”.",
    image: "/work/dunaali-coming-soon-banner.jpg",
    width: 1600,
    height: 900,
    year: 2026,
  },
  {
    slug: "prg-tech-led-indicator-standee",
    title: "PRG Tech — LED Indicator Standee",
    category: "Banners",
    description:
      "Tall vertical banner for PRG Tech’s Airon and Windsor brands, scattering coloured panel indicator lamps and digital display meters under “Connectivity & Automation Solutions” with the headline “LED Indicator & Display Meter”.",
    image: "/work/prg-tech-led-indicator-standee.jpg",
    width: 600,
    height: 1800,
    year: 2026,
  },
  {
    slug: "prg-tech-connect-control-banner",
    title: "PRG Tech — “Connect. Control. Monitor. Protect.” Banner",
    category: "Banners",
    description:
      "Wide banner for PRG Tech’s Airon and Windsor brands, stacking DIN-rail digital meters and terminal blocks on lit blue podiums beside the tagline “Connect. Control. Monitor. Protect.”",
    image: "/work/prg-tech-connect-control-banner.jpg",
    width: 1800,
    height: 600,
    year: 2026,
  },
  {
    slug: "fashion-sale-banner",
    title: "Fashion Sale Banner",
    category: "Banners",
    description:
      "Web banner on a warm orange backdrop: a model in a black dress beside bold “Fashion sale” lettering with a script overlay, a “Shop now” pill button and a vertical “New arrival” strip.",
    image: "/work/fashion-sale-banner.jpg",
    width: 1800,
    height: 1013,
    year: 2024,
  },
  {
    slug: "summer-sale-75-off-banner",
    title: "Summer Sale Banner",
    category: "Banners",
    description:
      "Mint-green sale banner repeating one model in a navy floral sundress three times, with the headline “Elevate your elegance” and a big “Summer sale, up to 75% off”.",
    image: "/work/summer-sale-75-off-banner.jpg",
    width: 1800,
    height: 1013,
    year: 2024,
  },
  {
    slug: "farmery-order-here-banner",
    title: "Farmery Order Here Banner",
    category: "Banners",
    description:
      "Banner for Farmery lining up its range (cow and buffalo milk packs, paneer, ghee, curd, oils and spices) under milk splashes and an “Order here” button, with app-store badges, phone number and a QR code along the bottom.",
    image: "/work/farmery-order-here-banner.jpg",
    width: 1800,
    height: 1350,
    year: 2024,
  },
  {
    slug: "farmery-roll-up-standee",
    title: "Farmery Roll-Up Standee",
    category: "Banners",
    description:
      "Tall roll-up standee for Farmery headed “Choose Farmery, Choose Health”, listing “No harmful chemicals”, “No preservatives” and “Fresh from farms to your home” above app links, a QR code and dairy, fruit, vegetable and grocery tiles.",
    image: "/work/farmery-roll-up-standee.jpg",
    width: 771,
    height: 1800,
    year: 2024,
  },
  {
    slug: "winchef-butter-knife-carousel",
    title: "Winchef Butter Knife — Carousel",
    category: "Carousel",
    description:
      "Layered carousel layout for the Winchef butter knife combining product renders, pencil sketches and a technical side profile around a dark hero slide reading “Smooth. Sleek. For Everyday.”, with lines like “Get Even Spreads” and “Spreading butter, jam, or chocolate?”",
    image: "/work/winchef-butter-knife-carousel.jpg",
    width: 1794,
    height: 1800,
    year: 2026,
  },
  {
    slug: "steel-cookware-six-slide-carousel",
    title: "Stainless Cookware — Carousel",
    category: "Carousel",
    description:
      "Six-slide social carousel for a stainless-steel cookware range (kadhai, fry pans, casserole) with styled food scenes and lines such as “Made for every dish you love”, “Handles the heat, Delivers the taste” and “Built for the flame you trust”.",
    image: "/work/steel-cookware-six-slide-carousel.jpg",
    width: 1800,
    height: 1147,
    year: 2026,
  },
  {
    slug: "futura-exhaust-fan-listing",
    title: "Futura Air Fan — Listing Images",
    category: "E-Commerce",
    description:
      "Five listing images for the Futura heavy-duty metal exhaust fan: white-background hero, wall-mounted shot, a workshop scene titled “Circulate Freshness”, a spec card (35 W, 150 mm sweep, 2500 rpm, 2-year warranty) and a hub close-up.",
    image: "/work/futura-exhaust-fan-listing.jpg",
    width: 736,
    height: 1084,
    year: 2026,
  },
  {
    slug: "indo-club-dlx-mixer-listing",
    title: "Indo Club DLX Mixer Grinder — Listing Images",
    category: "E-Commerce",
    description:
      "Five listing images for the Indo Club DLX 500 W two-jar mixer grinder: white-background hero, kitchen lifestyle shot, “Easy on Hands, Tough on Ingredients”, a callout infographic (continuous grinding, stainless steel jars, compact design) and a knob close-up with warranty badge.",
    image: "/work/indo-club-dlx-mixer-listing.jpg",
    width: 736,
    height: 1084,
    year: 2026,
  },
  {
    slug: "indo-cabin-wall-fan-listing",
    title: "Indo Cabin Fan — Listing Images",
    category: "E-Commerce",
    description:
      "Five listing images for the Indo white wall-mounted cabin fan: white-background hero, wall shot, a living-room scene titled “Silent Breeze — Cooling for Personal Space”, a spec table comparing 12″ and 10″ models, and a close-up with the available colours.",
    image: "/work/indo-cabin-wall-fan-listing.jpg",
    width: 736,
    height: 1084,
    year: 2026,
  },
  {
    slug: "benz-ceiling-fan-listing",
    title: "Benz Ceiling Fan — Listing Images",
    category: "E-Commerce",
    description:
      "Five listing images for the Benz three-blade ceiling fan: white-background hero, a remote-in-hand lifestyle shot, a three-room “Smart Design, smooth airflow” scene, a feature callout with nine colour finishes, and a motor close-up with a power-saving spec card.",
    image: "/work/benz-ceiling-fan-listing.jpg",
    width: 736,
    height: 1084,
    year: 2026,
  },
  {
    slug: "indo-avianca-ceiling-exhaust-listing",
    title: "Indo Avianca Exhaust Fan — Listing Images",
    category: "E-Commerce",
    description:
      "Five listing images for the Indo Avianca ceiling-mounted exhaust fan: white-background hero, installed ceiling shot, a kitchen cooking scene, a spec card (33 dB noise, 170 CMH air delivery, 22 W) and a grille close-up.",
    image: "/work/indo-avianca-ceiling-exhaust-listing.jpg",
    width: 736,
    height: 1084,
    year: 2026,
  },
  {
    slug: "indo-rado-mixer-listing",
    title: "Indo Rado Mixer Grinder — Listing Images",
    category: "E-Commerce",
    description:
      "Five listing images for the Indo Rado 500 W three-jar mixer grinder: white-background hero, kitchen counter shot, “Grind. Blend. Repeat.”, a dark spice-scene feature card (continuous grinding, robust machinery, ventilation) and a stainless-jars/compact-design card with a 2-year warranty badge.",
    image: "/work/indo-rado-mixer-listing.jpg",
    width: 736,
    height: 1084,
    year: 2026,
  },
  {
    slug: "nutri-nest-2-container-steel-lunch-box-listing",
    title: "Nutri Nest 2-Container Lunch Box — Listing Images",
    category: "E-Commerce",
    description:
      "Nine listing images for the Sanjeev Kapoor Nutri Nest two-container steel lunch box with green insulated bag: hero, chef endorsement shot, lifestyle scenes, “Leak Safe, Travel Ready” callouts, “Good Food Sorted”, bag-detail panels and a “What’s Inside the Box” breakdown.",
    image: "/work/nutri-nest-2-container-steel-lunch-box-listing.jpg",
    width: 574,
    height: 1800,
    year: 2026,
  },
  {
    slug: "nutri-nest-black-lunch-bag-listing",
    title: "Nutri Nest Black Lunch Kit — Listing Images",
    category: "E-Commerce",
    description:
      "Nine listing images for the Sanjeev Kapoor Nutri Nest black lunch kit with bottle and smart-pocket tote: hero, “Pack Fresh, Carry Calm” picnic scene, a “Microwave, Oven & Dishwasher Safe” panel, leak-proof and bag-detail cards and a “What’s Inside the Box” breakdown.",
    image: "/work/nutri-nest-black-lunch-bag-listing.jpg",
    width: 574,
    height: 1800,
    year: 2026,
  },
  {
    slug: "nutri-nest-glass-lunch-box-listing",
    title: "Nutri Nest Glass Lunch Box — Listing Images",
    category: "E-Commerce",
    description:
      "Ten listing images for the Sanjeev Kapoor Nutri Nest two-container glass lunch box with green-and-white bag: hero, chef shot, lifestyle scenes, “Leak Safe, Travel Ready” callouts, a “Microwave Safe” oven scene, bag-detail cards and a “What’s Inside the Box” breakdown.",
    image: "/work/nutri-nest-glass-lunch-box-listing.jpg",
    width: 574,
    height: 1800,
    year: 2026,
  },
  {
    slug: "sanjeev-kapoor-750ml-serving-bowl-listing",
    title: "Sanjeev Kapoor Serving Bowl — Listing Images",
    category: "E-Commerce",
    description:
      "Nine listing images for the Sanjeev Kapoor 750 ml microwave-safe stainless serving bowl: hero, chef shot, styled table scenes, feature icons, an “India’s First 100% Microwave-Safe Stainless Steel Plate” microwave panel, “The Future Of Reheating Is Here” and a 13.5 cm dimension card.",
    image: "/work/sanjeev-kapoor-750ml-serving-bowl-listing.jpg",
    width: 574,
    height: 1800,
    year: 2026,
  },
  {
    slug: "classic-essentials-black-lunch-kit-listing",
    title: "Classic Essentials Black Lunch Kit — Listing Images",
    category: "E-Commerce",
    description:
      "Ten listing images for the Classic Essentials Pro-Heat steel microwave-safe lunch box with bottle and black tote: hero, sunlit table and picnic scenes, “Pack Fresh, Carry Calm”, feature icons, a “Microwave & Dishwasher Safe” panel, leak-proof and smart-pocket cards and a “What’s Inside the Bag” breakdown.",
    image: "/work/classic-essentials-black-lunch-kit-listing.jpg",
    width: 736,
    height: 2310,
    year: 2026,
  },
  {
    slug: "nutri-nest-4-container-lunch-box-listing",
    title: "Nutri Nest 4-Container Lunch Box — Listing Images",
    category: "E-Commerce",
    description:
      "Eight listing images for the Sanjeev Kapoor Nutri Nest four-container steel lunch box with green bag: hero, chef shot, two dining-table scenes, “Leak Safe, Travel Ready”, “Good Food Sorted”, bag-detail panels and a “What’s Inside the Box” card.",
    image: "/work/nutri-nest-4-container-lunch-box-listing.jpg",
    width: 714,
    height: 1800,
    year: 2026,
  },
  {
    slug: "tattoo-tech-18500-battery-listing",
    title: "Tattoo Tech 18500 Battery — Listing Images",
    category: "E-Commerce",
    description:
      "Four listing images for Tattoo Tech’s INR18500 1800 mAh 3.7 V rechargeable battery for wireless tattoo machines: a “Reliable Power for Every Tattoo Session” bullet card, two studio product shots and a feature callout infographic.",
    image: "/work/tattoo-tech-18500-battery-listing.jpg",
    width: 1079,
    height: 1079,
    year: 2026,
  },
  {
    slug: "tattoo-tech-tracing-paper-listing",
    title: "Tattoo Tech Tracing Paper — Listing Images",
    category: "E-Commerce",
    description:
      "Four purple listing images for Tattoo Tech thin tracing paper (500-sheet US Letter reams): a hero card, “A very important part of the tattoo stencil process!”, a bulleted description card and a gloved stencil being peeled off an arm.",
    image: "/work/tattoo-tech-tracing-paper-listing.jpg",
    width: 1079,
    height: 1079,
    year: 2026,
  },
  {
    slug: "raceby-catalogue-opening-pages",
    title: "Raceby Catalogue — Opening Pages",
    category: "Catalogues",
    description:
      "Eight opening pages of Raceby’s 88-page alloy-wheel catalogue and price list: the “Designed to Dominate” cover, a managing director’s message, “About Us”, a “20+ Strict Quality Tests” page, the manufacturing unit, the index and the H3RO section opener and product page.",
    image: "/work/raceby-catalogue-opening-pages.jpg",
    width: 679,
    height: 1800,
    year: 2026,
  },
  {
    slug: "raceby-catalogue-brand-sections",
    title: "Raceby Catalogue — Brand Sections",
    category: "Catalogues",
    description:
      "Eight pages from the Raceby alloy-wheel catalogue alternating dark brand-section openers (HND, BJ, TBS, YMH) with white product pages showing wheel codes beside the matching motorcycles and scooters.",
    image: "/work/raceby-catalogue-brand-sections.jpg",
    width: 679,
    height: 1800,
    year: 2026,
  },
  {
    slug: "raceby-catalogue-closing-sections",
    title: "Raceby Catalogue — Classic, EV & Scooter Pages",
    category: "Catalogues",
    description:
      "Seven pages from the Raceby alloy-wheel catalogue: the “Ryl Enfld Clasc” opener and spoke-wheel product pages, a “Premium Alloy Wheels” RBRN page, an electric-vehicle e-rickshaw page and the Suzki Aces125 opener and product page.",
    image: "/work/raceby-catalogue-closing-sections.jpg",
    width: 679,
    height: 1800,
    year: 2026,
  },
  {
    slug: "homebud-company-profile-intro",
    title: "HomeBud Company Profile — Intro Pages",
    category: "Catalogues",
    description:
      "Five opening pages of HomeBud’s company profile featuring its fennec-fox mascot: the “Your Home’s Best Buddy” cover, “About Us”, a co-founder’s message, “Factory Insight” and “Product Categories” (kitchen, house and cloth care).",
    image: "/work/homebud-company-profile-intro.jpg",
    width: 740,
    height: 1486,
    year: 2026,
  },
  {
    slug: "homebud-company-profile-products",
    title: "HomeBud Company Profile — Product Pages",
    category: "Catalogues",
    description:
      "Five product pages from HomeBud’s company profile listing Kitchen Care (sponges, scrubbers, wiper), House Care (wipers, brooms, dusters) and Cloth Care (hangers, clips) items with short red-tab descriptions.",
    image: "/work/homebud-company-profile-products.jpg",
    width: 740,
    height: 1486,
    year: 2026,
  },
  {
    slug: "homebud-company-profile-closing",
    title: "HomeBud Company Profile — Closing Pages",
    category: "Catalogues",
    description:
      "Four closing pages of HomeBud’s company profile: “Merchants” with distribution stats and Amazon/Blinkit availability, a certifications page, the mascot holding a plastics-association membership certificate, and the back cover with QR code and office addresses.",
    image: "/work/homebud-company-profile-closing.jpg",
    width: 740,
    height: 1004,
    year: 2026,
  },
  {
    slug: "homebud-brochure",
    title: "HomeBud Tri-fold Brochure",
    category: "Brochure",
    description:
      "Outer spread of a tri-fold brochure for HomeBud by Kushal, a home-cleaning range: product panel, brand panel and a “Your Home's Best Buddy” cover.",
    image: "/work/homebud-brochure.jpg",
    width: 1512,
    height: 717,
    year: 2026,
  },
  {
    slug: "homebud-brochure-inner-spread",
    title: "HomeBud Tri-fold Brochure — Inner Spread",
    category: "Brochure",
    description:
      "Inner spread of HomeBud’s tri-fold brochure laying out the range in three panels, Kitchen Care, House Care and Cloth Care, with product shots and feature icons above the footer line “Cleaner Home. Happier You”.",
    image: "/work/homebud-brochure-inner-spread.jpg",
    width: 1512,
    height: 718,
    year: 2026,
  },
  {
    slug: "morning-brew-coffee-can",
    title: "Morning Brew",
    category: "Photo Manipulation",
    description:
      "Can mockup composite: a frosted coffee can wrapped in a liquid coffee splash, with “Make Your Morning Refreshing” set in bronze.",
    image: "/work/morning-brew-coffee-can.jpg",
    width: 1920,
    height: 1080,
    year: 2024,
  },
  {
    slug: "floral-dress-mockup",
    title: "Floral Dress Mockup",
    category: "Photo Manipulation",
    description:
      "Before/after mockup: a woman twirling in a plain white maxi dress by a wrought-iron fence, re-dressed on the right in a maroon fabric with pink flower prints that follows every fold.",
    image: "/work/floral-dress-mockup.jpg",
    width: 1800,
    height: 1013,
    year: 2024,
  },
  {
    slug: "textured-gown-mockup",
    title: "Textured Gown Mockup",
    category: "Photo Manipulation",
    description:
      "Before/after mockup: a model seated in a white satin gown on a studio floor, with the gown retextured on the right in a distressed grey-and-white stone print.",
    image: "/work/textured-gown-mockup.jpg",
    width: 1800,
    height: 1013,
    year: 2024,
  },
  {
    slug: "ride-like-a-pro-ebike-post",
    title: "Ride Like a Pro",
    category: "Photo Manipulation",
    description:
      "Bicycle manipulation for branding: a folding fat-tyre e-bike composited onto a misty forest trail under a mossy fallen tree, with sun rays breaking through and the line “Ride like a pro”.",
    image: "/work/ride-like-a-pro-ebike-post.jpg",
    width: 1800,
    height: 1800,
    year: 2024,
  },
  {
    slug: "ebike-quarry-composite",
    title: "E-Bike Quarry Composite",
    category: "Photo Manipulation",
    description:
      "The same fat-tyre folding e-bike placed on a dusty track between piles of white rock under a deep blue, cloud-filled sky, with matched shadows and boulders in the foreground.",
    image: "/work/ebike-quarry-composite.jpg",
    width: 1800,
    height: 1800,
    year: 2024,
  },
  {
    slug: "ocean-in-a-bottle",
    title: "Ocean in a Bottle",
    category: "Photo Manipulation",
    description:
      "Self-initiated composite: a whole seascape, with container ship, oil rig, fishing boat, whale, submarine and reef, sealed inside a steel water bottle.",
    image: "/work/ocean-in-a-bottle.jpg",
    width: 2400,
    height: 1350,
    year: 2024,
  },
  {
    slug: "city-double-exposure",
    title: "City Double Exposure",
    category: "Photo Manipulation",
    description:
      "Double-exposure portrait: a city skyline and mountain range blended into a face in cool blue tones.",
    image: "/work/city-double-exposure.jpg",
    width: 1623,
    height: 1200,
    year: 2024,
  },
  {
    slug: "day-to-night-edit",
    title: "Day to Night Edit",
    category: "Photo Manipulation",
    description:
      "Before/after edit turning a sunny daytime shot of a parking lot and a “#Chorus 2017” sign into a moonlit night scene with glowing headlights and a recoloured rainbow sign.",
    image: "/work/day-to-night-edit.jpg",
    width: 1800,
    height: 789,
    year: 2024,
  },
  {
    slug: "heatblast-photo-manipulation",
    title: "Heatblast on Myself",
    category: "Photo Manipulation",
    description:
      "A Ben 10 manipulation on a self-portrait: a tiny Heatblast rising from my watch while a fireball burns in my open hand.",
    image: "/work/heatblast-photo-manipulation.jpg",
    width: 2252,
    height: 1267,
    year: 2024,
  },
  {
    slug: "farmery-a2-ghee-label",
    title: "Farmery A2 Cow Ghee Label",
    category: "Print",
    description:
      "Front panel of a jar label for Farmery's A2 pure cow ghee: deep green, a gold line ornament and an illustrated cow.",
    image: "/work/farmery-a2-ghee-label.jpg",
    width: 2400,
    height: 1234,
    year: 2024,
  },
  {
    slug: "farmery-super-sale-poster",
    title: "Farmery Super Sale",
    category: "Print",
    description:
      "Festive sale poster for Farmery, a dairy and organic products brand: discounts on groceries, vegetables and fruits, with app badges and a QR code.",
    image: "/work/farmery-super-sale-poster.jpg",
    width: 1705,
    height: 2400,
    year: 2024,
  },
  {
    slug: "build-it-better-logo",
    title: "Build it Better",
    category: "Logos",
    description:
      "Logo for a friend's phone-repair business: a mirrored B and E split by a screwdriver, in electric blue and lime.",
    image: "/work/build-it-better-logo.jpg",
    width: 1080,
    height: 1080,
    year: 2024,
  },
  {
    slug: "the-caramel-affair-logo",
    title: "The Caramel Affair",
    category: "Logos",
    description:
      "Self-initiated logo for a bakery: chunky lettering inside a bitten cookie, with a cupcake and a slice of cake tucked into the crumbs.",
    image: "/work/the-caramel-affair-logo.jpg",
    width: 1024,
    height: 1024,
    year: 2024,
  },
  {
    slug: "blog-snax-logo",
    title: "Blog Snax Logo",
    category: "Logos",
    description:
      "Wordmark for Blog Snax: heavy orange “Blog” letters with “Snax” in slanted italic cutting across the bottom edge.",
    image: "/work/blog-snax-logo.jpg",
    width: 962,
    height: 328,
    year: 2024,
  },
  {
    slug: "gaming-logo",
    title: "Gaming Logo",
    category: "Logos",
    description:
      "My own gaming mark for YouTube: distressed red lettering over a blood-red moon, the “1” drawn as a bullet with trident prongs, and bats circling.",
    image: "/work/gaming-logo.jpg",
    width: 706,
    height: 706,
    year: 2024,
  },
  {
    slug: "valorant-chamber-thumbnail",
    title: "Valorant Chamber",
    category: "Thumbnails",
    description:
      "Valorant thumbnail with a cel-shaded Chamber, in his waistcoat and glasses, thrusting his gold-striped calling card at the camera over a darkened map with his name in outlined type.",
    image: "/work/valorant-chamber-thumbnail.jpg",
    width: 1280,
    height: 720,
    year: 2024,
  },
  {
    slug: "minecraft-horror-mode-thumbnail",
    title: "Minecraft Horror Mode",
    category: "Thumbnails",
    description:
      "Live-stream thumbnail for my gaming channel: glowing green type, a screaming Steve and a red-eyed mob lurking in the dark.",
    image: "/work/minecraft-horror-mode-thumbnail.jpg",
    width: 1280,
    height: 720,
    year: 2024,
  },
  {
    slug: "among-us-playing-with-subs-thumbnail",
    title: "Among Us with Subs",
    category: "Thumbnails",
    description:
      "Live-stream thumbnail for Among Us: a red crewmate holding a tablet against crackling lightning, with the title “Playing with subs” and a red “Live!” tag.",
    image: "/work/among-us-playing-with-subs-thumbnail.jpg",
    width: 1280,
    height: 720,
    year: 2024,
  },
  {
    slug: "i-joined-lspd-thumbnail",
    title: "I Joined LSPD",
    category: "Thumbnails",
    description:
      "Live-stream thumbnail: a police officer in front of a patrol car, with bold blue-and-red “I Joined LSPD” lettering.",
    image: "/work/i-joined-lspd-thumbnail.jpg",
    width: 1280,
    height: 720,
    year: 2024,
  },
  {
    slug: "colorful-evol-laptop-thumbnail",
    title: "Colorful EVOL Laptop",
    category: "Thumbnails",
    description:
      "Tech thumbnail for the Colorful EVOL gaming laptop: the white laptop in front of its box on a wooden desk, with “55K/-”, “100+ FPS”, an RTX 4050 badge and a Goku figure charging in from the side.",
    image: "/work/colorful-evol-laptop-thumbnail.jpg",
    width: 1800,
    height: 1013,
    year: 2024,
  },
  {
    slug: "worlds-smallest-violin-thumbnail",
    title: "World’s Smallest Violin",
    category: "Thumbnails",
    description:
      "Valorant thumbnail of a first-person rifle inspect in purple and black, behind a giant translucent “World’s” headline with a tiny violin icon in the corner.",
    image: "/work/worlds-smallest-violin-thumbnail.jpg",
    width: 1280,
    height: 720,
    year: 2024,
  },
  {
    slug: "fastrack-smartwatch-thumbnail",
    title: "Cool Smartwatch, But",
    category: "Thumbnails",
    description:
      "Review thumbnail for a Fastrack smartwatch: the watch with a maroon strap laid diagonally on mustard yellow, beside brush-script “Cool smartwatch but”.",
    image: "/work/fastrack-smartwatch-thumbnail.jpg",
    width: 1308,
    height: 735,
    year: 2024,
  },
  {
    slug: "darkside-thumbnail",
    title: "Darkside",
    category: "Thumbnails",
    description:
      "Gaming thumbnail of a first-person rifle with a glowing glass-and-fish skin, held up against a starry night sky behind huge “Darkside” lettering.",
    image: "/work/darkside-thumbnail.jpg",
    width: 640,
    height: 360,
    year: 2024,
  },
  {
    slug: "moto-g84-review-thumbnail",
    title: "Moto G84 Review",
    category: "Thumbnails",
    description:
      "Review thumbnail for the Moto G84: me holding the red phone up to the camera, with a big “G84” behind it, a fire emoji and “Full detailed review”.",
    image: "/work/moto-g84-review-thumbnail.jpg",
    width: 1800,
    height: 1013,
    year: 2024,
  },
  {
    slug: "ares-gamepad-thumbnail",
    title: "Ares Wireless Gamepad",
    category: "Thumbnails",
    description:
      "Review thumbnail for a ₹1,700 wireless gamepad: me holding the controller, gradient type and the hook “Xbox wali feel”.",
    image: "/work/ares-gamepad-thumbnail.jpg",
    width: 2400,
    height: 1350,
    year: 2024,
  },
  {
    slug: "bgmi-live-thumbnail",
    title: "BGMI Live Thumbnail",
    category: "Thumbnails",
    description:
      "Gaming stream thumbnail for my channel: big peach BGMI lettering, two jester-skin characters and me on a purple and hot-pink backdrop.",
    image: "/work/bgmi-live-thumbnail.jpg",
    width: 1920,
    height: 1080,
    year: 2024,
  },
  {
    slug: "dying-light-coop-thumbnail",
    title: "Dying Light Co-op",
    category: "Thumbnails",
    description:
      "Dying Light co-op thumbnail in black and white: my profile used as a double exposure filled with a ruined city, zombies and a parkour jumper, on brushed metal with the game’s logo and a “Coop” bar.",
    image: "/work/dying-light-coop-thumbnail.jpg",
    width: 1800,
    height: 1013,
    year: 2024,
  },
  {
    slug: "thermal-paste-result-thumbnail",
    title: "Thermal Paste Results",
    category: "Thumbnails",
    description:
      "Tech thumbnail for an Arctic MX-4 thermal paste repaste: me pointing at the syringe beside an Asus laptop whose screen shows the temperature dropping from 95C to 75C, with “Amazing result!” and “Use it now”.",
    image: "/work/thermal-paste-result-thumbnail.jpg",
    width: 1800,
    height: 1013,
    year: 2024,
  },
  {
    slug: "valorant-minus-140-thumbnail",
    title: "Valorant −140",
    category: "Thumbnails",
    description:
      "Valorant live thumbnail: me holding a sci-fi pistol next to an easel board reading “-140”, with a Diamond rank badge, the Valorant logo and a red “Live” tag.",
    image: "/work/valorant-minus-140-thumbnail.jpg",
    width: 1800,
    height: 1013,
    year: 2024,
  },
  {
    slug: "razer-viper-mini-thumbnail",
    title: "Razer Viper Mini",
    category: "Thumbnails",
    description:
      "Tech thumbnail for the Razer Viper Mini: me in a green hoodie pointing at the boxed mouse against black-and-neon-green streaks, with “Aimbot mouse” and the Razer snake logo.",
    image: "/work/razer-viper-mini-thumbnail.jpg",
    width: 1800,
    height: 1013,
    year: 2024,
  },
  {
    slug: "dead-by-daylight-thumbnail",
    title: "Dead by Daylight",
    category: "Thumbnails",
    description:
      "Dead by Daylight thumbnail in red and black: Michael Myers’ mask on one side, a cut-faced me staring at him from the other, with the game’s logo between us.",
    image: "/work/dead-by-daylight-thumbnail.jpg",
    width: 1800,
    height: 1013,
    year: 2024,
  },
  /* ---------------------------------------------------------- videos */
  /* Self-hosted in /public/work/videos (H.264 mp4 + webp poster). */
  {
    slug: "video-raceby-alloy-wheel",
    title: "Raceby — Alloy Wheel",
    category: "Videos",
    description: "Short video for Raceby.",
    image: "/work/videos/video-raceby-alloy-wheel.webp",
    video: "/work/videos/video-raceby-alloy-wheel.mp4",
    width: 870,
    height: 1080,
    year: "",
  },
  {
    slug: "video-raceby-brand-film",
    title: "Raceby — Brand Film",
    category: "Videos",
    description: "Short video for Raceby.",
    image: "/work/videos/video-raceby-brand-film.webp",
    video: "/work/videos/video-raceby-brand-film.mp4",
    width: 608,
    height: 1080,
    year: "",
  },
  {
    slug: "video-raceby-bike-transformation",
    title: "Raceby — Bike Transformation",
    category: "Videos",
    description: "Short video for Raceby.",
    image: "/work/videos/video-raceby-bike-transformation.webp",
    video: "/work/videos/video-raceby-bike-transformation.mp4",
    width: 1080,
    height: 1080,
    year: "",
  },
  {
    slug: "video-ligna-hanuman-jayanti",
    title: "Ligna — Hanuman Jayanti",
    category: "Videos",
    description: "Short video for Ligna.",
    image: "/work/videos/video-ligna-hanuman-jayanti.webp",
    video: "/work/videos/video-ligna-hanuman-jayanti.mp4",
    width: 602,
    height: 1080,
    year: "",
  },
  {
    slug: "video-tattoo-tech-wireless-tattoo-pen",
    title: "Tattoo Tech — Wireless Tattoo Pen",
    category: "Videos",
    description: "Short video for Tattoo Tech.",
    image: "/work/videos/video-tattoo-tech-wireless-tattoo-pen.webp",
    video: "/work/videos/video-tattoo-tech-wireless-tattoo-pen.mp4",
    width: 810,
    height: 1080,
    year: "",
  },
  {
    slug: "video-amour-scrt-just-one-bra",
    title: "Amour Scrt — Just One Bra",
    category: "Videos",
    description: "Short video for Amour Scrt.",
    image: "/work/videos/video-amour-scrt-just-one-bra.webp",
    video: "/work/videos/video-amour-scrt-just-one-bra.mp4",
    width: 608,
    height: 1080,
    year: "",
  },
  {
    slug: "video-tattoo-tech-the-artists-throne",
    title: "Tattoo Tech — The Artist's Throne",
    category: "Videos",
    description: "Short video for Tattoo Tech.",
    image: "/work/videos/video-tattoo-tech-the-artists-throne.webp",
    video: "/work/videos/video-tattoo-tech-the-artists-throne.mp4",
    width: 810,
    height: 1080,
    year: "",
  },
  {
    slug: "video-fds-baisakhi",
    title: "FDS — Baisakhi",
    category: "Videos",
    description: "Short video for Fusion Design Studio.",
    image: "/work/videos/video-fds-baisakhi.webp",
    video: "/work/videos/video-fds-baisakhi.mp4",
    width: 608,
    height: 1080,
    year: "",
  },
  {
    slug: "video-raceby-awareness-film",
    title: "Raceby — Awareness Film",
    category: "Videos",
    description: "Short video for Raceby.",
    image: "/work/videos/video-raceby-awareness-film.webp",
    video: "/work/videos/video-raceby-awareness-film.mp4",
    width: 604,
    height: 1080,
    year: "",
  },
  {
    slug: "video-tattoo-tech-ink-mixer",
    title: "Tattoo Tech — Ink Mixer",
    category: "Videos",
    description: "Short video for Tattoo Tech.",
    image: "/work/videos/video-tattoo-tech-ink-mixer.webp",
    video: "/work/videos/video-tattoo-tech-ink-mixer.mp4",
    width: 810,
    height: 1080,
    year: "",
  },
  {
    slug: "video-jvl-baisakhi",
    title: "JVL — Baisakhi",
    category: "Videos",
    description: "Short video for JVL.",
    image: "/work/videos/video-jvl-baisakhi.webp",
    video: "/work/videos/video-jvl-baisakhi.mp4",
    width: 608,
    height: 1080,
    year: "",
  },
  {
    slug: "video-fds-ambedkar-jayanti",
    title: "FDS — Ambedkar Jayanti",
    category: "Videos",
    description: "Short video for Fusion Design Studio.",
    image: "/work/videos/video-fds-ambedkar-jayanti.webp",
    video: "/work/videos/video-fds-ambedkar-jayanti.mp4",
    width: 604,
    height: 1080,
    year: "",
  },
  {
    slug: "video-indo-ceiling-fan",
    title: "Indo — Ceiling Fan",
    category: "Videos",
    description: "Short video for Indo.",
    image: "/work/videos/video-indo-ceiling-fan.webp",
    video: "/work/videos/video-indo-ceiling-fan.mp4",
    width: 608,
    height: 1080,
    year: "",
  },
  {
    slug: "video-amour-scrt-product-film",
    title: "Amour Scrt — Product Film",
    category: "Videos",
    description: "Short video for Amour Scrt.",
    image: "/work/videos/video-amour-scrt-product-film.webp",
    video: "/work/videos/video-amour-scrt-product-film.mp4",
    width: 608,
    height: 1080,
    year: "",
  },
  {
    slug: "video-tattoo-tech-needles",
    title: "Tattoo Tech — Needles",
    category: "Videos",
    description: "Short video for Tattoo Tech.",
    image: "/work/videos/video-tattoo-tech-needles.webp",
    video: "/work/videos/video-tattoo-tech-needles.mp4",
    width: 810,
    height: 1080,
    year: "",
  },
  {
    slug: "video-homebud-akshaya-tritiya",
    title: "Homebud × Akshaya Tritiya",
    category: "Videos",
    description: "Short video for homebud.",
    image: "/work/videos/video-homebud-akshaya-tritiya.webp",
    video: "/work/videos/video-homebud-akshaya-tritiya.mp4",
    width: 608,
    height: 1080,
    year: "",
  },
  {
    slug: "video-ligna-akshaya-tritiya",
    title: "Ligna × Akshaya Tritiya",
    category: "Videos",
    description: "Short video for Ligna.",
    image: "/work/videos/video-ligna-akshaya-tritiya.webp",
    video: "/work/videos/video-ligna-akshaya-tritiya.mp4",
    width: 604,
    height: 1080,
    year: "",
  },
  {
    slug: "video-winchef-akshaya-tritiya",
    title: "Winchef × Akshaya Tritiya",
    category: "Videos",
    description: "Short video for Winchef.",
    image: "/work/videos/video-winchef-akshaya-tritiya.webp",
    video: "/work/videos/video-winchef-akshaya-tritiya.mp4",
    width: 608,
    height: 1080,
    year: "",
  },
  {
    slug: "video-tattoo-tech-digital-tattoo-pen",
    title: "Tattoo Tech — Digital Tattoo Pen",
    category: "Videos",
    description: "Short video for Tattoo Tech.",
    image: "/work/videos/video-tattoo-tech-digital-tattoo-pen.webp",
    video: "/work/videos/video-tattoo-tech-digital-tattoo-pen.mp4",
    width: 810,
    height: 1080,
    year: "",
  },
  {
    slug: "video-tattoo-tech-tattoo-bed",
    title: "Tattoo Tech — Tattoo Bed",
    category: "Videos",
    description: "Short video for Tattoo Tech.",
    image: "/work/videos/video-tattoo-tech-tattoo-bed.webp",
    video: "/work/videos/video-tattoo-tech-tattoo-bed.mp4",
    width: 810,
    height: 1080,
    year: "",
  },
  {
    slug: "video-tattoo-tech-cartridges",
    title: "Tattoo Tech — Cartridges",
    category: "Videos",
    description: "Short video for Tattoo Tech.",
    image: "/work/videos/video-tattoo-tech-cartridges.webp",
    video: "/work/videos/video-tattoo-tech-cartridges.mp4",
    width: 810,
    height: 1080,
    year: "",
  },
  {
    slug: "video-fds-world-health-day",
    title: "FDS — World Health Day",
    category: "Videos",
    description: "Short video for Fusion Design Studio.",
    image: "/work/videos/video-fds-world-health-day.webp",
    video: "/work/videos/video-fds-world-health-day.mp4",
    width: 608,
    height: 1080,
    year: "",
  },
  {
    slug: "video-fds-easter",
    title: "FDS — Easter",
    category: "Videos",
    description: "Short video for Fusion Design Studio.",
    image: "/work/videos/video-fds-easter.webp",
    video: "/work/videos/video-fds-easter.mp4",
    width: 608,
    height: 1080,
    year: "",
  },
  {
    slug: "video-jvl-easter",
    title: "JVL — Easter",
    category: "Videos",
    description: "Short video for JVL.",
    image: "/work/videos/video-jvl-easter.webp",
    video: "/work/videos/video-jvl-easter.mp4",
    width: 608,
    height: 1080,
    year: "",
  },
  {
    slug: "video-jvl-lunch-box-reveal",
    title: "JVL — Lunch Box Reveal",
    category: "Videos",
    description: "Short video for JVL.",
    image: "/work/videos/video-jvl-lunch-box-reveal.webp",
    video: "/work/videos/video-jvl-lunch-box-reveal.mp4",
    width: 602,
    height: 1080,
    year: "",
  },
  {
    slug: "video-jvl-earth-day",
    title: "JVL — Earth Day",
    category: "Videos",
    description: "Short video for JVL.",
    image: "/work/videos/video-jvl-earth-day.webp",
    video: "/work/videos/video-jvl-earth-day.mp4",
    width: 608,
    height: 1080,
    year: "",
  },
  {
    slug: "video-earth-day",
    title: "Earth Day",
    category: "Videos",
    description: "Short social video.",
    image: "/work/videos/video-earth-day.webp",
    video: "/work/videos/video-earth-day.mp4",
    width: 608,
    height: 1080,
    year: "",
  },
  {
    slug: "video-airon-windsor-panel-meter",
    title: "Airon Windsor — Panel Meter",
    category: "Videos",
    description: "Short video for Airon Windsor.",
    image: "/work/videos/video-airon-windsor-panel-meter.webp",
    video: "/work/videos/video-airon-windsor-panel-meter.mp4",
    width: 608,
    height: 1080,
    year: "",
  },
  {
    slug: "video-airon-windsor-temperature-meter",
    title: "Airon Windsor — Temperature Meter",
    category: "Videos",
    description: "Short video for Airon Windsor.",
    image: "/work/videos/video-airon-windsor-temperature-meter.webp",
    video: "/work/videos/video-airon-windsor-temperature-meter.mp4",
    width: 608,
    height: 1080,
    year: "",
  },
  {
    slug: "video-airon-windsor-fathers-day",
    title: "Airon Windsor — Father's Day",
    category: "Videos",
    description: "Short video for Airon Windsor.",
    image: "/work/videos/video-airon-windsor-fathers-day.webp",
    video: "/work/videos/video-airon-windsor-fathers-day.mp4",
    width: 618,
    height: 1080,
    year: "",
  },
  {
    slug: "video-airon-windsor-yoga-day",
    title: "Airon Windsor — Yoga Day",
    category: "Videos",
    description: "Short video for Airon Windsor.",
    image: "/work/videos/video-airon-windsor-yoga-day.webp",
    video: "/work/videos/video-airon-windsor-yoga-day.mp4",
    width: 618,
    height: 1080,
    year: "",
  },
  {
    slug: "video-homebud-fathers-day",
    title: "Homebud — Father's Day",
    category: "Videos",
    description: "Short video for homebud.",
    image: "/work/videos/video-homebud-fathers-day.webp",
    video: "/work/videos/video-homebud-fathers-day.mp4",
    width: 618,
    height: 1080,
    year: "",
  },
  {
    slug: "video-homebud-hanuman-jayanti",
    title: "Homebud — Hanuman Jayanti",
    category: "Videos",
    description: "Short video for homebud.",
    image: "/work/videos/video-homebud-hanuman-jayanti.webp",
    video: "/work/videos/video-homebud-hanuman-jayanti.mp4",
    width: 608,
    height: 1080,
    year: "",
  },
  {
    slug: "video-homebud-yoga-day",
    title: "Homebud — Yoga Day",
    category: "Videos",
    description: "Short video for homebud.",
    image: "/work/videos/video-homebud-yoga-day.webp",
    video: "/work/videos/video-homebud-yoga-day.mp4",
    width: 618,
    height: 1080,
    year: "",
  },
  {
    slug: "video-oasis-studio-april-fools-day",
    title: "Oasis Studio — April Fools' Day",
    category: "Videos",
    description: "Short video for Oasis Studio.",
    image: "/work/videos/video-oasis-studio-april-fools-day.webp",
    video: "/work/videos/video-oasis-studio-april-fools-day.mp4",
    width: 864,
    height: 1080,
    year: "",
  },
  {
    slug: "video-oasis-studio-easter",
    title: "Oasis Studio — Easter",
    category: "Videos",
    description: "Short video for Oasis Studio.",
    image: "/work/videos/video-oasis-studio-easter.webp",
    video: "/work/videos/video-oasis-studio-easter.mp4",
    width: 608,
    height: 1080,
    year: "",
  },
  {
    slug: "video-oasis-studio-world-health-day",
    title: "Oasis Studio — World Health Day",
    category: "Videos",
    description: "Short video for Oasis Studio.",
    image: "/work/videos/video-oasis-studio-world-health-day.webp",
    video: "/work/videos/video-oasis-studio-world-health-day.mp4",
    width: 608,
    height: 1080,
    year: "",
  },
  {
    slug: "video-winchef-chaitra-navratri",
    title: "Winchef — Chaitra Navratri",
    category: "Videos",
    description: "Short video for Winchef.",
    image: "/work/videos/video-winchef-chaitra-navratri.webp",
    video: "/work/videos/video-winchef-chaitra-navratri.mp4",
    width: 608,
    height: 1080,
    year: "",
  },
  {
    slug: "video-winchef-eid-ul-fitr",
    title: "Winchef — Eid ul-Fitr",
    category: "Videos",
    description: "Short video for Winchef.",
    image: "/work/videos/video-winchef-eid-ul-fitr.webp",
    video: "/work/videos/video-winchef-eid-ul-fitr.mp4",
    width: 608,
    height: 1080,
    year: "",
  },
  {
    slug: "video-winchef-fathers-day",
    title: "Winchef — Father's Day",
    category: "Videos",
    description: "Short video for Winchef.",
    image: "/work/videos/video-winchef-fathers-day.webp",
    video: "/work/videos/video-winchef-fathers-day.mp4",
    width: 618,
    height: 1080,
    year: "",
  },
  {
    slug: "video-winchef-copper-bottle",
    title: "Winchef — Copper Bottle",
    category: "Videos",
    description: "Short video for Winchef.",
    image: "/work/videos/video-winchef-copper-bottle.webp",
    video: "/work/videos/video-winchef-copper-bottle.mp4",
    width: 864,
    height: 1080,
    year: "",
  },
  {
    slug: "video-winchef-cool-touch-bottle",
    title: "Winchef — Cool Touch Bottle",
    category: "Videos",
    description: "Short video for Winchef.",
    image: "/work/videos/video-winchef-cool-touch-bottle.webp",
    video: "/work/videos/video-winchef-cool-touch-bottle.mp4",
    width: 864,
    height: 1080,
    year: "",
  },
  {
    slug: "video-winchef-lunch-bag-set",
    title: "Winchef — Lunch Bag Set",
    category: "Videos",
    description: "Short video for Winchef.",
    image: "/work/videos/video-winchef-lunch-bag-set.webp",
    video: "/work/videos/video-winchef-lunch-bag-set.mp4",
    width: 864,
    height: 1080,
    year: "",
  },
  {
    slug: "video-winchef-insulated-lunch-box",
    title: "Winchef — Insulated Lunch Box",
    category: "Videos",
    description: "Short video for Winchef.",
    image: "/work/videos/video-winchef-insulated-lunch-box.webp",
    video: "/work/videos/video-winchef-insulated-lunch-box.mp4",
    width: 864,
    height: 1080,
    year: "",
  },
  {
    slug: "video-winchef-masala-box",
    title: "Winchef — Masala Box",
    category: "Videos",
    description: "Short video for Winchef.",
    image: "/work/videos/video-winchef-masala-box.webp",
    video: "/work/videos/video-winchef-masala-box.mp4",
    width: 864,
    height: 1080,
    year: "",
  },
  {
    slug: "video-winchef-cook-bold-pan",
    title: "Winchef — Cook Bold Pan",
    category: "Videos",
    description: "Short video for Winchef.",
    image: "/work/videos/video-winchef-cook-bold-pan.webp",
    video: "/work/videos/video-winchef-cook-bold-pan.mp4",
    width: 864,
    height: 1080,
    year: "",
  },
  {
    slug: "video-winchef-cook-bold-pan-short-cut",
    title: "Winchef — Cook Bold Pan (Short Cut)",
    category: "Videos",
    description: "Short video for Winchef.",
    image: "/work/videos/video-winchef-cook-bold-pan-short-cut.webp",
    video: "/work/videos/video-winchef-cook-bold-pan-short-cut.mp4",
    width: 864,
    height: 1080,
    year: "",
  },
  {
    slug: "video-winchef-keep-it-tidy",
    title: "Winchef — Keep It Tidy",
    category: "Videos",
    description: "Short video for Winchef.",
    image: "/work/videos/video-winchef-keep-it-tidy.webp",
    video: "/work/videos/video-winchef-keep-it-tidy.mp4",
    width: 864,
    height: 1080,
    year: "",
  },
  {
    slug: "video-winchef-napkin-holder",
    title: "Winchef — Napkin Holder",
    category: "Videos",
    description: "Short video for Winchef.",
    image: "/work/videos/video-winchef-napkin-holder.webp",
    video: "/work/videos/video-winchef-napkin-holder.mp4",
    width: 864,
    height: 1080,
    year: "",
  },
];

export const site: SiteContent = {
  /* ------------------------------------------------------------ identity */
  name: "Sudhanshu Ranjan",
  role: "Graphic Designer",
  specialties: ["Social media", "E-commerce", "Thumbnails", "Manipulation", "Logos"],
  /** Short line under the big name in the hero. */
  intro: "Ad creatives for brands, thumbnails for creators, and photo manipulations that make people look twice.",
  location: "Patna, India",
  /** Set `open: false` to hide the green "available" dot. */
  availability: { open: true, text: "Available for freelance" },

  /**
   * Your photos, in /public/me/. `profile` = the big portrait in the hero,
   * `cover` = the wide photo just above the work boxes (caption is optional).
   */
  photos: {
    profile: { src: "/me/profile.jpg", alt: "Portrait of Sudhanshu Ranjan" },
    cover: {
      src: "/me/cover.jpg",
      alt: "Sudhanshu at his desk, working on a monitor beside an RGB-lit PC",
      caption: "Behind the screen",
    },
  },

  /**
   * Your live site address, e.g. "https://example.com".
   * Leave empty on Vercel: the site then uses its own <project>.vercel.app URL.
   */
  url: "",

  /* ----------------------------------------------------------------- SEO */
  seo: {
    title: "Sudhanshu Ranjan — Graphic Designer",
    description:
      "Sudhanshu Ranjan is a graphic designer from Patna, India, making social media posts, banners, carousels, e-commerce listing images, catalogues, brochures, photo manipulations, print, logos and YouTube thumbnails.",
    keywords: [
      "graphic designer",
      "social media design",
      "web banners",
      "e-commerce listing images",
      "catalogue design",
      "brochure design",
      "youtube thumbnails",
      "photo manipulation",
      "logo design",
      "Patna",
      "portfolio",
    ],
  },

  /* ------------------------------------------------------------- contact */
  email: "sudhanshuvista@gmail.com",
  socials: [
    {
      label: "Behance",
      handle: "sudhanshuranjan13",
      href: "https://www.behance.net/sudhanshuranjan13",
      icon: "behance",
    },
    {
      label: "LinkedIn",
      handle: "sudhanshuranjan1",
      href: "https://www.linkedin.com/in/sudhanshuranjan1",
      icon: "linkedin",
    },
    { label: "YouTube", href: "https://www.youtube.com/@techysinskari", icon: "youtube" },
  ],

  /* ------------------------------------------------------ section copy */
  headings: {
    work: "Selected _work_",
    workIntro:
      "Social posts, short videos, banners, carousels, e-commerce images, catalogues and brochures from my agency work at Fusion Design Studio, then manipulations, print, logos and thumbnails from my own projects. Open a category to see every piece in it, then tap any piece to see it full size.",
    about: "Design that _hits_ first, explains later.",
    clients: "Brands I've _worked_ with",
    clientsIntro: "Some of the brands whose posts, banners, listings, catalogues and labels I've designed.",
    contact: "Let's make something _loud_.",
  },

  /* ------------------------------------------------------------- clients */
  /**
   * Shown as a logo grid under the work boxes. A client with two logos takes a
   * double-width box; on desktop each row holds 8 single boxes, on phones 2, so
   * keep the double boxes starting on an even slot. Add, remove or reorder freely.
   */
  clients: [
    { name: "Raceby", logos: ["/clients/raceby.png"] },
    { name: "JVL", logos: ["/clients/jvl.png"] },
    { name: "Ligna", logos: ["/clients/ligna.png"] },
    { name: "Amour Secrt", logos: ["/clients/amour-scrt.png"] },
    { name: "homebud", logos: ["/clients/homebud.png"] },
    { name: "Farmery", logos: ["/clients/farmery.png"] },
    { name: "Dunaali", logos: ["/clients/dunaali.png"] },
    { name: "Tattoo Tech", logos: ["/clients/tattoo-tech.png"] },
    { name: "Uniflex", logos: ["/clients/uniflex.png"] },
    { name: "Winchef", logos: ["/clients/winchef.png"] },
    { name: "Windsor / Airon", logos: ["/clients/windsor.png", "/clients/airon.png"] },
    { name: "Indo", logos: ["/clients/indo.png"] },
    { name: "Oasis Studio", logos: ["/clients/oasis-studio.png"] },
    { name: "SNB / Classic Essentials", logos: ["/clients/snb.png", "/clients/classic-essentials.png"] },
  ],

  /* --------------------------------------------------------------- about */
  about: {
    /** The big statement that lights up word-by-word as you scroll. */
    statement:
      "I'm Sudhanshu Ranjan, a graphic designer from Patna, India. I make ad creatives, thumbnails and photo manipulations built to stop the scroll.",
    paragraphs: [
      "At the digital marketing agency Fusion Design Studio I designed social posts, web banners, e-commerce listing images and catalogues for brands like Raceby Alloy Wheels, Uniflex insulation, Tattoo Tech and HomeBud.",
      "As a freelancer and for my own creativity I make logos, labels and posters, Photoshop manipulations, and thumbnails for my own gaming and tech YouTube channels.",
    ],
    services: [
      { title: "Social media creatives", text: "Product posts, carousels, launch teasers and festival posts for brand feeds." },
      { title: "Banners & e-commerce", text: "Web banners and marketplace listing images that explain a product at a glance." },
      { title: "YouTube thumbnails", text: "Loud, readable thumbnails for gaming and tech videos." },
      { title: "Photo manipulation", text: "Composites, double exposures and before/after edits in Photoshop." },
      { title: "Logos & print", text: "Logos, labels, posters, standees, catalogues and brochures." },
    ],
  },

  /** Count-up numbers in the About section, all taken from the work itself. */
  stats: [
    { value: projects.length, label: "Pieces on this site" },
    { value: categories.length, label: "Disciplines" },
    { value: 15, suffix: "+", label: "Clients satisfied" },
  ],

  /** Scrolling strip of tools (as listed on the Behance projects). */
  skills: [
    "Photoshop",
    "Illustrator",
    "InDesign",
    "Premiere Pro",
    "After Effects",
    "Canva",
    "ChatGPT",
    "Kling AI",
    "Claude",
  ],

  projects,
};
