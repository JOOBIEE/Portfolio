export type Project = {
  id: string;
  title: string;
  tagline: string;
  status: "live" | "in-progress" | "archived";
  year: string;
  tags: string[];
  problem: string;
  approach: string;
  systemDesign: string;
  techStack: string[];
  challenges: string;
  whyItExists: string;
  github?: string;
  liveDemo?: string;
  image?: string;
  architectureDiagram?: string;
  result?: string;
};

export const projects: Project[] = [
  {
 id: "provance",
title: "Provance",
image: "/provance.jpeg",
architectureDiagram: "provancearch.png",
tagline: "Behavioral proof-of-work for knowledge workers.",
status: "in-progress",
year: "2025",
tags: ["Trust", "Infrastructure", "Verification", "SaaS", "Chrome Extension"],
problem:
  "In a world where AI can generate polished work in seconds, there is no reliable way to prove that knowledge work — writing, code, design — was genuinely done by a human. Clients doubt freelancers. Recruiters cannot verify take-home assessments. The finished document tells you nothing about how it was made.",
approach:
  "Instead of detecting AI after the fact, track the behavioral fingerprint of human work as it happens. Keystrokes, edit patterns, paste events, idle periods, typing velocity — these form a pattern that is difficult to fake and impossible to reconstruct after the fact. The insight: process is the proof.",
systemDesign:
  "A Chrome extension (Manifest V3, Vanilla JS) sits silently on any browser-based editor and captures behavioral metadata — never content. Events are batched locally and flushed every two minutes to a FastAPI backend on Railway. PostgreSQL via Supabase stores session records and raw events. A processing engine computes five behavioral signals and collapses them into a single proof score. Reports are tamper-proof via SHA-256 hashing and publicly shareable via link — no account required to view. A document verification flow lets recipients paste the submitted document and confirm it matches the fingerprint captured at session end.",
techStack: [
  "Chrome Extension (Manifest V3)",
  "Vanilla JS",
  "FastAPI",
  "PostgreSQL",
  "Supabase",
  "Redis",
  "React",
  "Vite",
  "Vercel",
  "Railway",
  "Stripe",
],
challenges:
  "Python 3.14 compatibility failures with asyncpg and pydantic-core required a parallel Python 3.11 environment. Chrome MV3 service workers sleep after 30 seconds — setInterval is useless, requiring chrome.alarms for reliable background flushing. Designing a scoring system that is fair to sessions with missing signals required weight redistribution rather than penalising gaps. The hardest design question: what counts as proof without storing anything private.",
whyItExists:
  "Trust between people who work remotely has quietly broken down. Not because people are dishonest — but because there is no infrastructure for verifying effort, only output. Provance is built on the belief that process deserves to be as shareable as the result.",github: "#",
    liveDemo: "#",
  },
  {
    id: "kaprix",
title: "Kaprix Powerhouse Logistics",
image: "/kaprixss.png",
 architectureDiagram: "/kaprixarc.png",
tagline: "A fleet that moves goods and brands — simultaneously.",
status: "live",
year: "2026",
tags: ["Logistics", "Advertising", "React", "Framer Motion"],
problem:
  "Kaprix Powerhouse Logistics needed a premium web presence that clearly communicated two distinct services — freight logistics and mobile fleet advertising — to high-value B2B clients across the UK and Europe. No existing template could represent this dual-service model without one service overshadowing the other.",
approach:
  "Built a conversion-focused marketing site from scratch using a step-by-step component architecture. Each section was designed to serve a specific audience — logistics clients or advertising clients — while reinforcing the core message that the fleet serves both purposes simultaneously.",
systemDesign:
  "Single-page React application built with Vite. All business content centralised in a constants file as a single source of truth. Sections broken into isolated components under a clear folder structure. Reusable UI components — Button, SectionLabel, GlassCard — used consistently across all sections.",
techStack: ["React", "Vite", "Tailwind CSS", "Framer Motion", "React Hook Form"],
challenges:
  "Communicating two completely different services to two different audiences without the site feeling split or unfocused. Also handling Tailwind v4 being installed by default when the project required v3, and debugging OXC parser issues with destructured component parameters in Vite.",
whyItExists:
  "To generate leads, build credibility, and position Kaprix as a premium logistics and mobile advertising provider — making clear that their fleet is not just a transport network but a moving advertising platform operating across the UK and Europe every day.",
    github: "https://github.com/JOOBIEE/Kaprix",
    liveDemo: "https://kaprix.netlify.app/"
  },


  {
  id: "plunger-plumbers",
  title: "Plunger Plumbers",
  image: "/plumbco.png",
  architectureDiagram: "/plumbcoarch.png",
  tagline: "When #2 just won't go through, Plunger Plumber saves the loo.",
  status: "live",
  year: "2026",
  tags: ["Local Business", "Landing Page", "HTML5", "CSS3", "JavaScript"],
  problem:
    "Plunger Plumbers needed a high-converting, authoritative landing page to capture urgent, high-intent local leads in Greater Cleveland. The challenge was to balance a bold, humorous brand identity (including a distinct orange/black theme and mascot) with trust signals that immediately validate their 24/7 reliability and 500+ five-star reputation.",
  approach:
    "Built a high-performance, single-page marketing site using semantic HTML5 and vanilla CSS. The layout prioritizes an immediate 'Call Now' conversion hierarchy for mobile users experiencing plumbing emergencies, paired with crisp typography contrast to make their distinct service guarantees scannable at a glance.",
  systemDesign:
    "Monolithic vanilla architecture optimized for ultra-fast loading times and zero framework overhead. Structured with semantic sectioning, a centralized CSS custom property system for the dark-mode palette and orange accents, and lightweight JavaScript handling responsive navigation and dynamic interactive elements.",
  techStack: ["HTML5", "CSS3", "JavaScript"],
  challenges:
    "Executing a rich, asset-heavy dark UI with complex image overlays (such as the fleet vehicle and mascot branding) while maintaining an optimal light performance score for users on poor mobile connections during emergency situations.",
  whyItExists:
    "To capture emergency plumbing leads, establish immediate market authority in the Greater Cleveland area, and convert casual traffic into direct phone calls via prominent sticky actions and aggressive social proof.",
  github: "https://github.com/JOOBIEE/Alert-Plumbco",
  liveDemo: "https://plungerplumbers.netlify.app/"
},

{
  id: "i-fitness-clone",
  title: "i-Fitness NG Landing Page",
  image: "/ifitnesshero.png",
  architectureDiagram: "/ifitnessarch.png",
  tagline: "Train Different. Live Better.",
  status: "live",
  year: "2026",
  tags: ["Fitness Chain", "Landing Page", "HTML5", "CSS3", "JavaScript"],
  problem: "i-Fitness needed a premium, high-impact landing page to solidify its position as West Africa's fastest-growing fitness chain. The challenge was to design a dark, high-energy UI that drives immediate user action, captures a community of 63,000+ members, and establishes an authoritative web presence with clear trust signals.",
  approach: "Built a high-performance, responsive landing page using semantic HTML5 and vanilla CSS. The layout implements a bold visual hierarchy featuring ultra-crisp, oversized typography contrasted against a deep dark background. It prioritizes frictionless conversions by placing prominent call-to-action buttons ('Find a Branch', 'View Plans') directly in the hero fold alongside a sticky WhatsApp chat widget.",
  systemDesign: "Monolithic vanilla architecture optimized for ultra-fast loading times and zero framework overhead. Structured with semantic sectioning, a centralized CSS custom property system for the stark white typography and vibrant red accents, and lightweight JavaScript handling the hero background image carousel and responsive navigation.",
  techStack: ["HTML5", "CSS3", "JavaScript"],
  challenges: "Achieving a striking balance between a media-heavy dark UI—complete with high-contrast photography and dynamic carousels—and lightweight performance to ensure seamless, lightning-fast load times for mobile users across diverse network conditions in West Africa.",
  whyItExists: "To drive gym memberships, showcase regional branch expansion across Nigeria, and convert web traffic into active gym sign-ups via a streamlined, high-converting digital storefront.",
  github: "https://github.com/JOOBIEE/ifitness",
  liveDemo: "https://i-fitness-gym.netlify.app/"
},

{
  id: "green-vault-agro-estate",
title: "Green Vault Agro Estate",
image: "/greenvaulthero.png",
architectureDiagram: "/greenvaultarch.png",
tagline: "Secure Land. Grow Wealth.",
status: "live",
year: "2026",
tags: ["AgriTech", "Investment Platform", "Landing Page", "HTML5", "CSS3", "JavaScript"],
problem: "Green Vault Agro Estate needed a premium landing page to present high-yielding agricultural investment opportunities to a Nigerian audience. The challenge was to build a credible, conversion-focused web presence that communicates land security and professional farm management while driving investors toward clear actions.",
approach: "Built a responsive landing page using semantic HTML5 and vanilla CSS. The layout centers on a full-bleed hero with a deep green-tinted farm photography background and bold white typography, establishing immediate visual authority. Key conversion actions — 'Explore Investments' and 'Book Site Visit' — are placed prominently in the hero fold, supported by a sticky chat widget and smooth scroll cues.",
systemDesign: "Monolithic vanilla architecture with zero framework overhead for fast load times. Structured with semantic HTML sectioning, a centralized CSS custom property system managing the dark green palette and gold accent typography, and lightweight JavaScript handling the hero image carousel and responsive navigation.",
techStack: ["HTML5", "CSS3", "JavaScript"],
challenges: "Balancing a visually rich, media-heavy hero section — full-bleed farm photography with dark overlays and animated carousels — against performance targets for mobile users on variable Nigerian network conditions.",
whyItExists: "To convert web traffic into agricultural investment inquiries, drive site visit bookings, and establish Green Vault Agro Estate as a trustworthy land and farm investment platform in Nigeria.",
github: "https://github.com/JOOBIEE/Green-Vault",
liveDemo: "https://green-vault.netlify.app/"
},

{
  id: "pulse-data-explorer",
title: "Pulse — Public Data Explorer",
image: "/pulse.png",
architectureDiagram: "/pulsearch.png",
tagline: "Where data comes alive.",
status: "live",
year: "2026",
tags: ["Data Visualization", "Dashboard", "HTML5", "CSS3", "Vanilla JavaScript"],
problem: "Economic data across African countries is publicly available but rarely presented in a way that's accessible or interactive for everyday users. Pulse was built to close that gap — making inflation and cost-of-living data explorable through clean filters, visual summaries, and key insights without requiring a backend or framework.",
approach: "Built entirely with HTML, CSS, and Vanilla JavaScript. The UI centers on a dark-themed dashboard with country and year filters driving all state changes client-side. Insight cards surface the most important numbers — current inflation rate, highest, lowest, and average — while a data table and trend chart respond dynamically to filter selections.",
systemDesign: "Fully client-side architecture with zero backend dependency. State is managed in plain JavaScript, data lives in a local JSON file, and all filtering, transformation, and DOM updates happen in the browser. Modular JS functions handle each concern — filtering, insight calculation, chart rendering, and table generation — keeping the codebase maintainable and scalable.",
techStack: ["HTML5", "CSS3", "Vanilla JavaScript", "JSON"],
challenges: "Managing client-side state cleanly across multiple interdependent filters without a framework. Ensuring chart and table updates stayed performant and consistent as filter combinations changed, while keeping the codebase readable and modular.",
whyItExists: "To strengthen practical frontend engineering skills through real-world data work — and to prove that a well-structured vanilla JS application can deliver a polished, data-rich experience without a single framework or external dependency.",
github: "https://github.com/JOOBIEE/Pulse",
liveDemo: "https://pulse-inflation-dashboard.netlify.app/"
},

{
  id: "niters-beauty-home",
title: "Niter's Beauty Home",
image: "/niterso.png",
architectureDiagram: "/nitersarch.png",
tagline: "Where Beauty Meets Excellence.",
status: "live",
year: "2026",
tags: ["Beauty & Lifestyle", "Landing Page", "Booking", "HTML5", "CSS3", "Vanilla JavaScript"],
problem: "Niter's Beauty Home needed a professional web presence that could communicate premium beauty services to a Nigerian audience and convert visitors into appointment bookings. The challenge was building something visually rich and brand-consistent — dark, elegant, gold-accented — without overcomplicating a simple client site.",
approach: "Built a responsive landing page using semantic HTML5 and vanilla CSS. The layout leads with a full-bleed dark hero featuring swirling abstract hair-inspired graphics and a bold gold CTA. Navigation is minimal and mobile-friendly via a hamburger menu. The overall aesthetic leans into the black-and-gold brand identity throughout every section.",
systemDesign: "Monolithic vanilla architecture — no frameworks, no build tools, no backend. Structured with semantic HTML sectioning, CSS custom properties managing the dark palette and gold accent system, and lightweight JavaScript handling the mobile nav toggle and any smooth scroll or interaction behavior.",
techStack: ["HTML5", "CSS3", "Vanilla JavaScript"],
challenges: "Achieving a high-end, editorial feel using only vanilla CSS — particularly the hero section's layered dark background, abstract graphic overlays, and gold typography — while keeping the page lightweight and fast on mobile.",
whyItExists: "To give Niter's Beauty Home a credible, conversion-focused digital presence that drives appointment bookings and positions the brand as a premium beauty destination.",
github: "https://github.com/JOOBIEE/Niters-Beauty-Saloon",
liveDemo: "https://nitersbeauty.netlify.app/"
},

{
  id: "alert-pioneer-plumbing",
title: "Alert Pioneer Plumbing Company",
image: "/alerthome.png",
architectureDiagram: "/alertarch.png",
tagline: "Fast, Clean, and Done Right the First Time.",
status: "live",
year: "2026",
tags: ["Local Business", "Landing Page", "Lead Generation", "HTML5", "CSS3", "Vanilla JavaScript"],
problem: "Alert Pioneer Plumbing needed a high-converting web presence that could communicate trust, availability, and professionalism to homeowners searching for emergency plumbing services. The site had to surface key credibility signals fast — reviews, response time, licensing — and funnel visitors toward a call or quote request immediately.",
approach: "Built a conversion-focused landing page using semantic HTML5 and vanilla CSS. The hero leads with social proof stats (179 five-star reviews, 98% satisfaction, 15 years experience) and dual CTAs — a primary booking button and a secondary free quote link. A live availability badge and a prominent phone number in the navbar reinforce urgency. A gold trust bar below the fold repeats key signals: 4.9 stars, licensed and insured, same-day service, free estimates, open 24 hours.",
systemDesign: "Monolithic vanilla architecture — static HTML, CSS, and JavaScript with no framework or backend. CSS custom properties manage the navy and amber brand system throughout. JavaScript handles the mobile nav, any scroll animations, and the availability widget behavior.",
techStack: ["HTML5", "CSS3", "Vanilla JavaScript"],
challenges: "Packing a high density of trust signals and CTAs into the hero fold without the layout feeling cluttered — balancing the stat grid, dual CTAs, availability badge, and plumber photography into a single cohesive dark-navy section.",
whyItExists: "To drive inbound calls and free quote requests for a local plumbing LLC by establishing immediate credibility and reducing friction between a visitor landing on the page and picking up the phone.",
github: "https://github.com/JOOBIEE/Alert-Plumbco",
liveDemo: "https://alert-pioneerplumbers.netlify.app/"
},

{
  id: "infratag-pro",
  title: "InfraTag",
  image: "/infrataghome.jpeg",
  architectureDiagram: "/infratagarch.png",
  tagline: "Tag. Track. Maintain. Everything Your Office Owns.",
  status: "in-progress",
  year: "2026",
  tags: [
    "SaaS",
    "B2B",
    "Asset Management",
    "Next.js 14",
    "Supabase",
    "TypeScript",
    "Tailwind CSS",
    "PostgreSQL",
    "QR Code",
  ],
  problem:
    "Most businesses in Nigeria and Africa track office equipment using paper registers, outdated spreadsheets, or nothing at all. When equipment goes missing, breaks down, or needs to be audited, nobody knows exactly what they have, where it is, or who is responsible for it.",
  approach:
    "Built a multi-tenant B2B SaaS platform where businesses generate QR code stickers in bulk, physically attach them to office equipment, and assign full equipment details to each tag from a dashboard. Anyone who scans a tag with their phone sees the equipment details instantly — no app download, no login required. Subscription billing via Lemon Squeezy handles plan enforcement with a 30-day free trial on signup.",
  systemDesign:
    "Next.js 14 App Router with a clean separation between public routes, protected dashboard routes, and the public scan page. Supabase handles PostgreSQL, auth, and file storage. Row Level Security enforces strict multi-tenant data isolation at the database level — each company can only ever access its own records. A PostgreSQL function with FOR UPDATE locking handles atomic tag number generation to prevent duplicates under concurrent load. Middleware enforces authentication, onboarding completion, and trial expiry on every protected route.",
  techStack: [
    "Next.js 14",
    "TypeScript",
    "Supabase",
    "PostgreSQL",
    "Tailwind CSS",
    "shadcn/ui",
    "Lemon Squeezy",
    "Vercel",
  ],
  challenges:
    "Multi-tenancy with Row Level Security required careful policy design to avoid infinite recursion when policies reference the same table they protect. Atomic QR tag number generation needed a database-level locking mechanism to guarantee sequential, duplicate-free tag numbers under simultaneous requests. Rendering branded tag stickers — company logo, QR code, and tag number — as print-quality downloadable PNGs required compositing on an HTML canvas at 2x resolution.",
  whyItExists:
    "To give Nigerian and African businesses a simple, affordable alternative to paper-based asset registers — turning every piece of office equipment into a scannable, trackable digital record accessible from any phone camera.",
  github: "https://github.com/JOOBIEE/Infratag",
  liveDemo: "#",
},

{
  id: "forex-lead-system",
  title: "Forex Lead Intelligence Bot",
  image: "forexbot.png",
  architectureDiagram: "/forexbotarch.png",
  tagline: "From First Message to Qualified Lead. Automatically.",
  status: "live",
  year: "2026",
  tags: [
    "Automation",
    "Lead Generation",
    "Telegram Bot",
    "Node.js",
    "Telegraf",
    "Google Sheets",
    "PM2",
    "VPS",
  ],
  problem:
    "A forex training brand was losing potential students to slow response times and unstructured follow-up. Leads contacted the business across channels, received late or no replies, and moved on. There was no system to capture, qualify, or organise inbound interest — and no way to know what courses to build for which audience.",
  approach:
    "Built an automated onboarding and lead intelligence system via Telegram. The bot introduces the brand, walks each prospect through a structured intake flow — collecting name, country, region, broker, and experience level — and categorises every lead into a database by shared attributes. The client receives an immediate Telegram notification for each new lead and a live Google Sheet organised by country, broker, and expertise level for structured follow-up and course planning.",
  systemDesign:
    "Built with Node.js and Telegraf, deployed on a VPS via PM2 for persistent uptime. The bot manages conversation state across multi-step intake flows, validates responses at each stage, and writes structured lead data to Google Sheets via the Sheets API. Leads are automatically grouped by country, broker, and expertise level so the client can identify audience segments and personalise outreach without manual sorting.",
  techStack: [
    "Node.js",
    "Telegraf",
    "PM2",
    "VPS",
    "Google Sheets API",
    "Telegram Bot API",
  ],
  challenges:
    "Managing conversation state across multi-step user flows in a stateless bot environment required careful session handling to ensure each user moved through the intake sequence correctly regardless of when or how they responded. Structuring the Google Sheet output so leads were automatically categorised rather than appended to a flat list required designing the write logic around segment grouping rather than simple row insertion.",
  whyItExists:
    "To eliminate the gap between inbound interest and structured follow-up for a forex training brand — turning every Telegram inquiry into a qualified, categorised lead the client can act on immediately with the right offer.",
  result:
    "The bot captured leads that would have been lost to slow response times. Categorised data — by country, broker, and expertise level — allowed the client to personalise outreach and design courses for specific audience segments. 5 clients converted in the first week of deployment. None had converted in the entire month of May.",
  github: "",
  liveDemo: "",
},

{
  id: "hostit-services",
  title: "HostIt Services — Premium Event Staffing Website",
  image: "hostit.jpeg",
  architectureDiagram: "/hostitarch.png",
  tagline: "A premium event staffing brand. Built to convert.",
  status: "live",
  year: "2026",
  tags: [
    "Next.js 15",
    "TypeScript",
    "Sanity CMS",
    "Resend",
    "Vercel",
    "CSS Animations",
    "Canvas API",
  ],
  problem:
    "A Lagos-based event staffing company was operating entirely through word of mouth and Instagram DMs. No website, no structured booking flow, and no way to capture leads who discovered the brand and moved on without making contact. The business had no digital presence to match the quality of its service.",
  approach:
    "Built a full premium marketing website with an integrated booking enquiry system. The site communicates trust and elegance immediately through controlled animation, a black and white to color photo gallery, and a particle system that signals invisible coordination happening behind the scenes. Every visitor path ends at a structured booking form that captures event details, saves them to a CMS, sends a formatted email to the business owner, and opens WhatsApp with a short pre-filled message containing the booking ID.",
  systemDesign:
    "Built with Next.js 15 App Router and deployed on Vercel. Content including gallery photos, testimonials, and services is managed through a standalone Sanity Studio deployed at hostit.sanity.studio, giving the client full editorial control without touching code. Booking submissions hit a server-side API route that validates the payload, writes the lead to Sanity with a generated booking ID, and sends a formatted HTML email via Resend before returning a success response to the client. WhatsApp only opens after the backend confirms the submission was saved and the email was sent.",
  techStack: [
    "Next.js 15",
    "TypeScript",
    "Sanity CMS",
    "Resend",
    "Vercel",
    "Canvas API",
    "CSS Custom Properties",
    "next/image",
  ],
  challenges:
    "Sanity's latest studio version requires React 19 canary internals that conflict with Next.js 15's bundled React instance. Resolved by separating the studio into a standalone deployment rather than embedding it inside the Next.js app, eliminating the conflict entirely while giving the client a cleaner CMS URL. Building the gallery required two distinct interaction patterns on the same component: desktop hover reveals color from grayscale, mobile requires a first tap to colorize and a second tap to open the lightbox, with only one image colorized at a time across the grid.",
  whyItExists:
    "To give a premium Lagos event staffing brand the digital presence its service quality deserved, and to replace informal WhatsApp-only bookings with a structured system that captures every lead, stores it permanently, and notifies the business owner immediately.",
  result:
    "A fully deployed production website at hostit.services with CMS-managed content, an animated premium UI, a structured booking enquiry system with email notifications and WhatsApp handoff, and a standalone content studio the client can operate independently.",
  github: "https://github.com/JOOBIEE/hostit",
  liveDemo: "https://hostit.services",
},

{
  id: "scout-lead-intelligence",
  title: "Scout — Automated Lead Discovery & Website Audit Engine",
  image: "scout.jpeg",
  architectureDiagram: "/scoutarch.png",
  tagline: "Find businesses. Audit their websites. Know who to contact first.",
  status: "live",
  year: "2026",
  tags: [
    "Node.js",
    "Express",
    "React",
    "Prisma",
    "SQLite",
    "Playwright",
    "Foursquare Places API",
    "Docker",
    "Railway",
    "Vercel",
  ],
  problem:
    "Finding and qualifying local business leads is manual and slow — searching directories one by one, guessing which businesses even have a website, and having no way to tell a genuinely weak prospect from a business that's already well set up online. There was no tool that could search a category and location, then automatically tell you who's worth contacting and why.",
  approach:
    "Built an end-to-end lead intelligence pipeline: search a business type and location, and Scout collects real businesses, discovers and verifies their websites (even when not directly listed), audits each site across SEO, trust, mobile, and conversion signals, captures desktop and mobile screenshots, and ranks every lead by priority with plain-English reasoning. Each business gets a generated outreach draft and a downloadable PDF audit report, with a lightweight CRM pipeline to track contact status from first touch to won or lost.",
  systemDesign:
    "Node.js/Express backend with Prisma ORM over SQLite, deployed on Railway via a custom Docker image built on Playwright's official base to guarantee a matching, working Chromium install. Business discovery runs through the Foursquare Places API with automatic pagination. A custom domain-guessing engine generates and tests likely website candidates for businesses with no listed URL, then a shared verification layer scores every website — guessed or provider-supplied — against the business's name, location, and phone number, so a low-confidence match never gets treated as ground truth. Audits combine fast Cheerio-based HTML parsing with a Playwright fallback for JavaScript-rendered pages. Searches run as background jobs with live progress polling rather than blocking requests, so a 50+ business search doesn't stall the UI. Frontend is React/Vite on Vercel, gated behind JWT-based authentication.",
  techStack: [
    "Node.js",
    "Express",
    "Prisma",
    "SQLite",
    "React",
    "Vite",
    "Playwright",
    "Cheerio",
    "Foursquare Places API",
    "JWT Auth",
    "Docker",
    "Railway",
    "Vercel",
  ],
  challenges:
    "Google Places API required prepaid billing unavailable to standard Nigerian accounts, so the entire data layer was rebuilt on Foursquare's API instead — including a fallback domain-guessing and content-verification system to compensate for thinner website coverage. A naive 'first website that resolves' guesser produced false positives on generic business names (a venue called RSVP matching an unrelated global rsvp.com); fixed by scaling confidence based on corroborating signals like matching phone numbers and city mentions, not name matches alone. Deploying Playwright to a memory-constrained Railway environment required tuning concurrency down from local development settings and containerizing with Playwright's official Docker image after a Prisma 7 breaking change and a Dockerfile layer-ordering bug both broke early build attempts.",
  whyItExists:
    "To replace manual, one-by-one lead research with an automated pipeline that not only finds businesses but tells you, with evidence, which ones are actually worth contacting — turning a spreadsheet of names into a ranked, audited, contact-ready list.",
  result:
    "A fully deployed production tool at the live demo link below, running a real end-to-end pipeline from business discovery through website auditing, priority ranking, outreach drafting, CRM tracking, and PDF report generation — accessible from any device, gated behind authentication, and built entirely on a zero-to-minimal budget by deliberately routing around every paid API and infrastructure option encountered along the way.",
  github: "https://github.com/JOOBIEE/Scout",
  liveDemo: "https://scout-gamma-gray.vercel.app/",
},

];