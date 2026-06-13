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
  id: "exploreland-homes",
  title: "Exploreland Homes",
  category: "Lifestyle Branding",
  year: "2026",
  tags: ["Aspirational Content", "Real Estate", "Emotional Positioning"],
  summary:
    "Transformed property marketing from listing-focused communication to lifestyle-driven emotional storytelling.",

  before: {
    label: "Property listing brand",
    description:
      "Content focused on features, availability, and generic real estate messaging. Visuals were appealing but lacked emotional depth or narrative consistency. Audience saw houses, not a lifestyle.",
  },

  intervention: {
    steps: [
      "Shifted messaging from features to lived experience and emotional outcomes",
      "Introduced relatable scenarios tied to Nigerian daily life (traffic, rain, weekends, family moments)",
      "Balanced aspirational luxury with humor and realism to improve relatability",
      "Standardized tone to feel premium but conversational, not overly corporate",
      "Aligned visuals with storytelling to create cohesive mood-driven content",
    ],
  },

  after: {
    label: "Lifestyle-driven real estate brand",
    description:
      "Audience now connects properties to personal aspiration and everyday experience. Content feels human, relatable, and premium. Homes are perceived as environments, not just structures.",
  },

  result:
    "Improved audience connection. Stronger brand recall. Content now influences desire, not just awareness.",
},
  {
  id: "imagesxpert",
  title: "ImagesXpert Media",
  category: "Creative Identity",
  year: "2026",
  tags: ["Visual Storytelling", "Photography", "Brand Personality"],
  summary:
    "Shifted photography brand from service provider to personality-driven visual experience with strong narrative identity.",

  before: {
    label: "Photography service brand",
    description:
      "Content focused on showcasing images without a consistent narrative or brand personality. Posts highlighted output but did not communicate experience or emotional value.",
  },

  intervention: {
    steps: [
      "Introduced carousel storytelling formats to create narrative flow across posts",
      "Developed a distinct brand voice blending premium tone with humor and relatability",
      "Shifted focus from 'photos' to 'moments and experience'",
      "Structured content into themes: cinematic, emotional, and playful",
      "Integrated subtle humor and real-life scenarios to humanize the brand",
    ],
  },

  after: {
    label: "Personality-driven visual brand",
    description:
      "Content now feels alive, engaging, and story-driven. Audience connects with the experience behind the visuals, not just the final output. Brand stands out through tone and consistency.",
  },

  result:
    "Higher engagement. Stronger audience connection. Brand now communicates experience, not just service.",
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
    "Stronger brand identity. Increased perceived expertise. Content now drives conversation, not just visibility.",
},
  {
    id: "personal-brand",
    title: "Personal Brand",
    category: "Identity Design",
    year: "2023",
    tags: ["Identity", "Culture", "Human Behavior"],
    summary:
      "Transformed an undefined online presence into a recognized voice in a specific domain.",
    before: {
      label: "Undefined presence",
      description:
        "Active online but unfocused. Posting across topics. Followers couldn't describe what they stood for. No clear reason to follow.",
    },
    intervention: {
      steps: [
        "Defined the intersection — what topic, what angle, what audience",
        "Deleted content that didn't fit the defined position",
        "Committed to one idea per week, explored deeply",
        "Engaged only in conversations adjacent to the defined domain",
        "Made the positioning visible in every touchpoint",
      ],
    },
    after: {
      label: "Recognized domain voice",
      description:
        "Followers could describe exactly what they followed for. Opportunities arrived pre-filtered. Collaborations from people aligned with the defined work.",
    },
    result: "Clarity of position created clarity of opportunity.",
    year: "2023",
  },
];