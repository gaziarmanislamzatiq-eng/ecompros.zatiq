export type TeamProfile = {
  certifications: string[];
  education: string[];
  experienceHighlights: string[];
  focusAreas: string[];
  proofPoints: string[];
  roleContext: string;
  skills: string[];
  summary: string;
};

export type TeamMember = {
  designation: string;
  image: {
    alt: string;
    src: string;
  };
  name: string;
  profile: TeamProfile;
  slug: string;
};

export const teamMembers: TeamMember[] = [
  {
    slug: "gazi-arman-islam",
    name: "Gazi Arman Islam",
    designation: "Technical Lead",
    image: {
      src: "/team/images/Gazi%20Arman%20Islam.png",
      alt: "Portrait of Gazi Arman Islam",
    },
    profile: {
      roleContext:
        "Technical delivery leadership across full-stack software and AI engineering.",
      summary:
        "Gazi's listed background positions him as a Software Engineer, Full-Stack Developer, and AI Engineer with Laravel, React.js, Django, Flask, SQL databases, APIs, payments, analytics, and applied NLP experience.",
      focusAreas: [
        "Full-stack delivery",
        "AI engineering",
        "Laravel and React systems",
        "API and payment integration",
        "Analytics platforms",
      ],
      experienceHighlights: [
        "Mid-Level Full Stack Developer at Zatiq Easy Limited, listed from June 2026.",
        "Software Engineer at neoNexor from July 2025 to June 2026.",
        "Executive at TechGarlic from October 2023 to May 2025, working with Power BI dashboards and NLP sentiment or trend analysis.",
        "Freelance web developer on Fiverr with 17+ international projects.",
      ],
      proofPoints: [
        "Built an AI-powered quiz and answer-evaluation system using Flask, Python, SQLite, Sentence-BERT, and mT5.",
        "Built Laravel e-commerce work with bKash, Nagad, Steadfast, and Pathao integrations.",
        "Publication work includes multimodal 3D emotion recognition and hospital energy demand forecasting.",
      ],
      skills: [
        "PHP",
        "Python",
        "JavaScript",
        "Laravel",
        "Flask",
        "Django",
        "React",
        "Next.js",
        "MySQL",
        "PostgreSQL",
        "MongoDB",
        "REST APIs",
        "NLP",
        "Semantic search",
      ],
      education: [
        "BSc in CSE, Brac University, 2025.",
        "HSC, 2019.",
        "SSC, 2017.",
      ],
      certifications: [],
    },
  },
];
