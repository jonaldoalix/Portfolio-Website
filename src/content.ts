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
      name: "Your Studio",
      url: "https://example.com",
    },
  },
  hero: {
    eyebrow: "City Name · Software developer",
    headline: "Building websites and apps for the web.",
    lede:
      "Replace this paragraph with a short pitch about what you do. Two or three sentences is plenty. Keep it honest and specific to you.",
    primaryCta: { label: "View projects", href: "#work" },
    secondaryCta: { label: "Contact me", href: "#contact" },
    panel: {
      status: "Available for new projects",
      fitLabel: "Looking for",
      fit: "TODO: describe the kinds of clients or problems you want.",
      shapeLabel: "Process",
      shape: "TODO: outline how an engagement usually starts and finishes.",
      nextLabel: "Get started",
      next: "TODO: tell visitors what to include in a first message.",
    },
  },
  about: {
    title: "About me",
    body: [
      "Write a short bio here. Mention what you care about in your work without copying someone else's voice.",
      "Add a second paragraph if you want. Side projects, hobbies, or how you like to collaborate all work.",
    ],
    education: {
      school: "University Name",
      degree: "Degree Title",
      detail: "Major · Minor or focus area",
      graduated: "YYYY",
    },
  },
  work: [
    {
      title: "Project One",
      org: "Company or client",
      blurb:
        "One or two sentences about what you built and why it mattered. Swap the link below for the live URL.",
      href: "https://example.com/project-one",
      repo: "https://github.com/example/project-one",
      tags: ["Tag A", "Tag B", "Tag C"],
      image: null,
      tone: "ams",
    },
    {
      title: "Project Two",
      org: "Studio or team",
      blurb:
        "Another placeholder card. Delete or duplicate these entries until the list matches your real work.",
      href: "https://example.com/project-two",
      repo: null,
      tags: ["Design", "Web", "CMS"],
      image: null,
      tone: "fsb",
    },
    {
      title: "Side Project",
      org: "Personal",
      blurb:
        "Optional open-source or weekend build. Point the repo link at your GitHub when you have one.",
      href: "https://github.com/example/side-project",
      repo: "https://github.com/example/side-project",
      tags: ["Hobby", "Open source"],
      image: null,
      tone: "utility",
    },
  ],
  skills: {
    intro: "List the tools and skills you actually use. Delete anything that does not fit.",
    groups: [
      {
        title: "Languages",
        items: ["JavaScript", "TypeScript", "HTML", "CSS", "SQL"],
      },
      {
        title: "Frameworks",
        items: ["React", "Node", "Express", "Other", "Other"],
      },
      {
        title: "Tools",
        items: ["Git", "Docker", "Linux", "CI", "Cloud provider"],
      },
      {
        title: "Other",
        items: [
          "Skill one",
          "Skill two",
          "Skill three",
          "Skill four",
          "Skill five",
        ],
      },
    ],
  },
  experience: [
    {
      org: "Current Employer",
      role: "Job title",
      dates: "YYYY to present",
      points: [
        "Bullet about a responsibility or outcome",
        "Another bullet with a concrete detail",
      ],
    },
    {
      org: "Previous Employer",
      role: "Job title",
      dates: "YYYY to YYYY",
      points: ["What you shipped or supported there"],
    },
    {
      org: "Earlier Role",
      role: "Job title",
      dates: "YYYY to YYYY",
      points: ["One line is enough for older roles"],
    },
  ],
  contact: {
    title: "Contact",
    lede:
      "Invite people to reach out. Say what kinds of notes you want and how quickly you usually reply.",
    resumeNote: "Optional note about where to find a resume or CV.",
  },
};

export const profile = defaultContent.profile;
export const hero = defaultContent.hero;
export const about = defaultContent.about;
export const work = defaultContent.work;
export const skills = defaultContent.skills;
export const experience = defaultContent.experience;
export const contact = defaultContent.contact;
