export type Profile = {
  name: string;
  shortName: string;
  email: string;
  phone: string;
  phoneDisplay: string;
  github: string;
  linkedin: string;
  site: string;
  location: string;
  practice: {
    name: string;
    url: string;
  };
};

export type WorkItem = {
  title: string;
  org: string;
  blurb: string;
  href: string | null;
  repo: string | null;
  tags: string[];
  image: string | null;
  tone: string;
};

export type ExperienceItem = {
  org: string;
  role: string;
  dates: string;
  points: string[];
};

export type SkillGroup = {
  title: string;
  items: string[];
};

export type HeroContent = {
  eyebrow: string;
  headline: string;
  lede: string;
  primaryCta: { label: string; href: string };
  secondaryCta: { label: string; href: string };
  panel: {
    status: string;
    fitLabel: string;
    fit: string;
    shapeLabel: string;
    shape: string;
    nextLabel: string;
    next: string;
  };
};

export type AboutContent = {
  title: string;
  body: string[];
  education: {
    school: string;
    degree: string;
    detail: string;
    graduated: string;
  };
};

export type SkillsContent = {
  intro: string;
  groups: SkillGroup[];
};

export type ContactContent = {
  title: string;
  lede: string;
  resumeNote: string;
};

export type PortfolioContent = {
  version: number;
  updatedAt: string;
  profile: Profile;
  hero: HeroContent;
  about: AboutContent;
  work: WorkItem[];
  skills: SkillsContent;
  experience: ExperienceItem[];
  contact: ContactContent;
};

export const defaultContent: PortfolioContent = {
  version: 1,
  updatedAt: "2026-07-24T00:00:00.000Z",
  profile: {
    name: "Alex Rivera",
    shortName: "Alex",
    email: "hello@example.com",
    phone: "+1 555 010 0000",
    phoneDisplay: "+1 (555) 010-0000",
    github: "https://github.com/example",
    linkedin: "https://linkedin.com/in/example/",
    site: "https://example.com",
    location: "Your City",
    practice: {
      name: "Your Practice",
      url: "https://example.com",
    },
  },
  hero: {
    eyebrow: "Your City · Full-stack engineer",
    headline: "Systems that hold up in production.",
    lede:
      "I design, build, and operate client platforms end to end, from first release through the ops that keep them steady.",
    primaryCta: { label: "See my work", href: "#work" },
    secondaryCta: { label: "Start a conversation", href: "#contact" },
    panel: {
      status: "Open to a small number of new engagements",
      fitLabel: "Good fit",
      fit: "Gaps, stalled systems, or platforms that need a senior owner from plan through ops",
      shapeLabel: "How it works",
      shape: "I evaluate what is in the way, propose a clear technical path, then build and deliver it with you.",
      nextLabel: "Next step",
      next: "Send a short note about what feels stuck, slow, or harder than it should be. I will reply myself.",
    },
  },
  about: {
    title: "A person behind the practice",
    body: [
      "I care about software that stays maintainable after launch: clear architecture, honest timelines, and ops that do not fall apart at 2am.",
      "Outside client work I still tinker, ship utilities, and keep lab infrastructure running. The goal is simple. Good engineering that feels human to work with.",
    ],
    education: {
      school: "Your University",
      degree: "B.S. Computer Science",
      detail: "Relevant concentration · Optional minor",
      graduated: "Month Year",
    },
  },
  work: [
    {
      title: "Flagship Product",
      org: "Your Company",
      blurb:
        "A short description of a real product surface you own or shipped. Keep it concrete and public-safe.",
      href: "https://example.com",
      repo: "https://github.com/example/flagship",
      tags: ["React", "Full-stack", "Product"],
      image: null,
      tone: "ams",
    },
    {
      title: "Practice Site",
      org: "Studio",
      blurb:
        "The public face of your consultancy or studio: positioning, services, and a path for serious inquiries.",
      href: "https://example.com",
      repo: null,
      tags: ["Next.js", "Brand", "Consulting"],
      image: null,
      tone: "fsb",
    },
    {
      title: "Open Utility",
      org: "Public utility",
      blurb:
        "A small open tool people can actually use. Useful, opinionated, and public on GitHub.",
      href: "https://github.com/example/utility",
      repo: "https://github.com/example/utility",
      tags: ["Open source", "Utility"],
      image: null,
      tone: "utility",
    },
  ],
  skills: {
    intro: "Tools I reach for when shipping and running real systems.",
    groups: [
      {
        title: "Frontend",
        items: ["React", "TypeScript", "Next.js", "Vite", "CSS / SCSS"],
      },
      {
        title: "Backend",
        items: ["Node", "Python", "SQL", "REST APIs", "Auth"],
      },
      {
        title: "Cloud & ops",
        items: ["AWS", "Firebase", "Docker", "Linux", "CI / hosting"],
      },
      {
        title: "Practice",
        items: [
          "Client platforms",
          "Product ownership",
          "Lab ops",
          "Automation",
          "Direct engagement",
        ],
      },
    ],
  },
  experience: [
    {
      org: "Your Practice",
      role: "Senior full-stack",
      dates: "2023 to present",
      points: [
        "Client platforms built and operated with direct senior engagement",
        "Replace this with real ownership and outcomes",
      ],
    },
    {
      org: "Previous Company",
      role: "Full-stack engineer",
      dates: "2021 to 2023",
      points: ["Ship and maintain production systems on a modern stack"],
    },
    {
      org: "Earlier Role",
      role: "Software engineer",
      dates: "2019 to 2021",
      points: ["Foundational product and platform work"],
    },
  ],
  contact: {
    title: "Start a conversation",
    lede:
      "Serious inquiries welcome. Tell me what feels stuck, what is costing you time, or what you want to make easier. I read every note myself.",
    resumeNote:
      "Prefer a resume? LinkedIn is the current overview while the PDF is refreshed.",
  },
};

export const profile = defaultContent.profile;
export const hero = defaultContent.hero;
export const about = defaultContent.about;
export const work = defaultContent.work;
export const skills = defaultContent.skills;
export const experience = defaultContent.experience;
export const contact = defaultContent.contact;
