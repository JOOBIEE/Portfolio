export type CaseStudy = {
  id: string;
  title: string;
  category: string;
  tags: string[];
  summary: string;
  before: {
    label: string;
    description: string;
  };
  intervention: {
    steps: string[];
  };
  after: {
    label: string;
    description: string;
  };
  result?: string;
  year: string;
};

export const caseStudies: CaseStudy[] = [
  {
    id: "hostit-services",
    title: "HostIt Services",
    category: "Brand Identity & Digital Presence",
    year: "2026",
    tags: [
      "Event Services",
      "Brand Identity",
      "SEO",
      "Landing Page",
      "Google Business",
    ],
    summary:
      "Took HostIt Services from a WhatsApp-only referral operation to a structured digital brand with a converting website, optimized search presence, and consistent visual identity.",
    before: {
      label: "WhatsApp-dependent service brand",
      description:
        "HostIt operated almost entirely through word of mouth and WhatsApp. No website, no consistent visual identity, no digital presence beyond Instagram. Potential clients had no structured way to discover, assess, or book the service. Every inquiry required manual back-and-forth conversation before a booking could happen.",
    },
    intervention: {
      steps: [
        "Developed a full brand identity — logo, color palette, typography, and visual language applied consistently across all touchpoints",
        "Built a conversion-focused landing page structured around the three things a visitor needs to believe before booking: competence, evidence, and access",
        "Implemented SEO foundations on the website to improve discoverability for event service searches",
        "Set up and optimized a Google Business profile to establish local search presence",
        "Optimized Instagram bio and profile to route visitors directly to the website for bookings",
        "Designed the site so clients could book directly without needing a DM conversation first",
      ],
    },
    after: {
      label: "Structured brand with active digital conversion",
      description:
        "HostIt now has a consistent brand identity across every touchpoint. The website handles initial discovery, builds trust through proof and service clarity, and converts visitors into bookings without manual intervention. The Google Business profile and SEO work has increased visibility in local search.",
    },
    result:
      "Following the rebrand and website launch, new contacts began approaching the client saying they had seen her services and would reach out — unprompted, without referral. Instagram now drives direct bookings, with clients visiting the website and completing bookings independently. The client no longer relies solely on word of mouth to generate new business.",
  },
  {
    id: "exploreland-farms",
    title: "Exploreland Farms",
    category: "Narrative Positioning",
    year: "2026",
    tags: ["Storytelling", "Agriculture", "Content Strategy"],
    summary:
      "Repositioned agriculture from basic farming to intelligent, narrative-driven environmental and economic storytelling.",
    before: {
      label: "Generic agriculture brand",
      description:
        "Content focused on basic farming tips and awareness. Messaging was informational but not differentiated. Audience engagement was low and content felt interchangeable with other agriculture pages.",
    },
    intervention: {
      steps: [
        "Shifted content from tips-based to narrative-driven storytelling rooted in real Nigerian context",
        "Introduced 'Reality Check' framing to anchor posts in practical, data-backed insights",
        "Connected farming to economics, climate, and long-term value rather than just production",
        "Developed a distinct writing voice combining technical clarity with cultural familiarity",
        "Structured weekly content into themes: education, reflection, and relatability",
      ],
    },
    after: {
      label: "Authoritative agricultural voice",
      description:
        "Content now positions the brand as both a thought leader and practical guide. Audience engages with ideas, not just information. Posts feel distinct, memorable, and grounded in real-world relevance.",
    },
    result:
      "Exploreland Farms now serves as a trusted knowledge partner for investors in Nigeria.",
  },
];