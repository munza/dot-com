export interface SiteConfig {
  readonly title: string;
  readonly description: string;
  /** Document code and revision shown in the header strip, datasheet style. */
  readonly docId: string;
  readonly revision: string;
}

export interface AuthorInfo {
  readonly name: string;
  readonly designation: string;
  readonly company: string;
  readonly companyUrl: string;
  readonly location: string;
  readonly email: string;
}

export interface NavLink {
  readonly label: string;
  readonly href: string;
  /** Name of an SVG in src/icons/, shown before the label. */
  readonly icon?: string;
}

export interface PageMeta {
  readonly title: string;
  readonly description: string;
}

export interface Talk {
  readonly title: string;
  readonly event: string;
  readonly year: string;
  readonly slides: string;
}

export interface Role {
  readonly years: string;
  readonly company: string;
  readonly url?: string;
  readonly role: string;
  readonly domain: string;
  readonly setup: string;
}

export interface Entry {
  readonly label: string;
  readonly value: string;
}

export const siteConfig: SiteConfig = {
  title: "Tawsif Aqib",
  description:
    "Backend engineer in Amsterdam. I build backend systems and the tools around them, and write about architecture, Nix and Elixir.",
  docId: "TA-02",
  revision: "2026.10",
};

export const authorInfo: AuthorInfo = {
  name: "Tawsif Aqib",
  designation: "Senior Backend Engineer",
  company: "Polarsteps",
  companyUrl: "https://www.polarsteps.com/",
  location: "Amsterdam, NL",
  email: "hello@tawsifaqib.com",
};

export const navLinks: NavLink[] = [
  { label: "Home", href: "/" },
  { label: "Projects", href: "/projects" },
  { label: "Writing", href: "/writing" },
  { label: "Talks", href: "/talks" },
  { label: "Work", href: "/work" },
  { label: "Now", href: "/now" },
  { label: "Uses", href: "/uses" },
];

export const socialLinks: NavLink[] = [
  { label: "GitHub", href: "https://github.com/munza" },
  { label: "LinkedIn", href: "https://linkedin.com/in/tawsifaqib" },
  { label: "Medium", href: "https://medium.com/@munza" },
  { label: "RSS", href: "/rss.xml", icon: "rss" },
];

/** First year in software; "14 years" and similar text are worked out from it at build time. */
export const careerStartYear = 2012;
export const yearsInSoftware = new Date().getFullYear() - careerStartYear;

/** The NOW band under the home hero; the header strip uses nowLine. */
export const nowHighlight =
  "Shipping my dotfiles, a Nix configuration for macOS that anyone can fork.";

/** The home page headline, also used on the site's OG image. */
export const headline = "I build backend systems and the tools around them.";

/** Title tag and meta description per page. */
export const pages = {
  home: {
    title: "Tawsif Aqib, backend engineer",
    description: headline,
  },
  about: {
    title: "About · Tawsif Aqib",
    description: `Backend engineer with ${yearsInSoftware} years across travel, payments, logistics and subscriptions.`,
  },
  projects: {
    title: "Projects · Tawsif Aqib",
    description:
      "Tools and products I'm building, from a Nix setup for macOS to an AI agent factory.",
  },
  writing: {
    title: "Writing · Tawsif Aqib",
    description: "Notes on backend architecture, Nix, Elixir and engineering teams.",
  },
  talks: {
    title: "Talks · Tawsif Aqib",
    description: "Conference talks on Elixir and functional programming.",
  },
  work: {
    title: "Work · Tawsif Aqib",
    description: `${yearsInSoftware} years of backend engineering, from Dhaka to Amsterdam.`,
  },
  now: { title: "Now · Tawsif Aqib", description: "What I'm focused on this month." },
  uses: {
    title: "Uses · Tawsif Aqib",
    description: "The hardware, editor, Nix setup and agent tooling I work with.",
  },
} satisfies Record<string, PageMeta>;

/**
 * Home page sections. Set one to false to hide it; the "§" numbers follow what's shown,
 * so hiding §3 turns the old §4 into §3. "General description" is always shown as §1.
 */
export const homeSections = {
  /** §: the spec table beside the headline. */
  characteristics: true,
  /** The NOW band under the hero (not numbered). */
  now: true,
  /** §: thesis, the four method steps and the request-flow figure. */
  method: false,
  /** §: open-source project cards. */
  projects: true,
  /** §: latest posts. */
  writing: true,
  /** §: talks. */
  talks: true,
};

export const nowLine = "Senior Backend Engineer at Polarsteps · shipping my dotfiles";

export const method = {
  thesis: "Pragmatic solutions and incremental delivery beat clever rewrites.",
  context:
    "Most backend work is not the system itself but everything that keeps it understandable: the model, the boundaries, the deployment path and the signals it emits.",
  steps: [
    { title: "Model the domain first.", text: "Event storming and tactical DDD before any code." },
    {
      title: "Ports, adapters, events.",
      text: "Hexagonal services, the outbox pattern, event sourcing where it pays off.",
    },
    { title: "Small, reversible steps.", text: "Incremental delivery over big-bang migrations." },
    { title: "Boring to operate.", text: "Observability built in, so on-call stays quiet." },
  ],
};

/** Show the planned posts under "In preparation" on the Writing page. */
export const showPlannedPosts = false;

export const plannedPosts: string[] = [
  "What's missing from Phoenix LiveDashboard",
  "Nix flakes for one-day onboarding",
  "Event sourcing and the outbox pattern: lessons from production",
];

export const talks: Talk[] = [
  {
    title: "From OOP to FP",
    event: "Dhaka Tech Summit",
    year: "2020",
    slides: "https://docs.google.com/presentation/d/1oAm2N9fJBp1lULfLFQrP5FknHHZX0Qk1NxU6YYkCUYA",
  },
  {
    title: "Getting Real with Elixir",
    event: "DevConf Dhaka",
    year: "2018",
    slides: "https://slides.com/munza/getting-real-with-elixir",
  },
  {
    title: "Elixir for the Future",
    event: "Developer Conference",
    year: "2017",
    slides: "https://slides.com/munza/elixir-for-future",
  },
  {
    title: "Elixir for Rubyists",
    event: "RubyConf Bangladesh",
    year: "2017",
    slides: "https://docs.google.com/presentation/d/1Xd3ksdWYMPj1boihTz38MEMVqeiziIKQnZqOYM8wwvY",
  },
];

export const talkTopics: string[] = [
  "Backend architecture",
  "Event-driven systems",
  "Developer tooling",
];

export const roles: Role[] = [
  {
    years: "2026–now",
    company: "Polarsteps",
    url: "https://www.polarsteps.com/",
    role: "Senior Backend Engineer",
    domain: "Travel",
    setup: "Hybrid · NL",
  },
  {
    years: "2025–2026",
    company: "Mollie",
    url: "https://mollie.com",
    role: "Senior Application Developer",
    domain: "Payments",
    setup: "Hybrid · NL",
  },
  {
    years: "2024–2025",
    company: "Sendcloud",
    url: "https://www.sendcloud.com/",
    role: "Engineering Manager",
    domain: "Shipping & logistics",
    setup: "Hybrid · NL",
  },
  {
    years: "2023–2024",
    company: "Sendcloud",
    role: "Lead Engineer",
    domain: "Shipping & logistics",
    setup: "Hybrid · NL",
  },
  {
    years: "2021–2023",
    company: "HelloFresh",
    url: "https://www.hellofresh.de/",
    role: "Senior Software Engineer",
    domain: "Subscriptions",
    setup: "Hybrid · DE",
  },
  {
    years: "2020–2021",
    company: "Eskimi",
    url: "https://www.eskimi.com/",
    role: "Senior Software Engineer",
    domain: "Ad tech",
    setup: "Remote · LT",
  },
  {
    years: "2019–2020",
    company: "Intelligent Machines",
    role: "Principal Engineer",
    domain: "AI / ML",
    setup: "On-site · BD",
  },
  {
    years: "2017–2019",
    company: "Pathao",
    url: "https://www.pathao.com/",
    role: "Engineering Manager",
    domain: "Logistics & delivery",
    setup: "On-site · BD",
  },
  {
    years: "2014–2016",
    company: "BTech Solution",
    role: "Software Specialist",
    domain: "—",
    setup: "On-site · BD",
  },
  {
    years: "2013–2014",
    company: "Bangla Trac Miaki VAS",
    role: "Mobile / Web Application Developer",
    domain: "—",
    setup: "On-site · BD",
  },
  {
    years: "2012–2013",
    company: "Panacea Systems",
    role: "UI Developer",
    domain: "—",
    setup: "On-site · BD",
  },
  {
    years: "2012",
    company: "Leevio",
    role: "Web Application Developer",
    domain: "—",
    setup: "On-site · BD",
  },
];

export const workSummary: Entry[] = [
  { label: "Core work", value: "Backend services, distributed systems, pragmatic architecture" },
  { label: "Product domains", value: "Travel, payments, logistics, subscriptions, lending" },
  { label: "Roles", value: "Individual contributor, technical lead, engineering manager" },
  { label: "Company mix", value: "Startups, scale-ups, enterprises, technology services" },
  {
    label: "Project work",
    value: "Greenfield builds, product evolution, migrations, platform reliability",
  },
];

export const toolkit: { label: string; items: string[] }[] = [
  { label: "Languages", items: ["Go", "Python", "PHP", "TypeScript", "Elixir"] },
  { label: "Frameworks", items: ["FastAPI", "Laravel", "Symfony", "Phoenix", "Node.js"] },
  { label: "Data & messaging", items: ["PostgreSQL", "MySQL", "Redis", "RabbitMQ", "Kafka"] },
  { label: "Infrastructure", items: ["Kubernetes", "Docker", "GCP", "AWS"] },
  { label: "Observability", items: ["Datadog", "Sentry", "Grafana", "Prometheus"] },
  {
    label: "Architecture",
    items: [
      "Domain-driven design",
      "Event-driven architecture",
      "Hexagonal architecture",
      "Distributed systems",
    ],
  },
];

export const now = {
  updated: "October 2026",
  entries: [
    {
      label: "Work",
      value:
        "Senior backend engineer at Polarsteps in Amsterdam, building backend services for a travel app.",
    },
    {
      label: "Building",
      value:
        "My dotfiles, and a tool for facilitated team retrospectives. Next up: an AI agent factory for automated software development.",
    },
    {
      label: "Writing",
      value: "Moving my posts from Medium to this site and starting a monthly post.",
    },
    { label: "Site", value: "Redesigning this site from scratch." },
  ] satisfies Entry[],
};

export const uses: Entry[] = [
  { label: "Hardware", value: "[laptop, monitor, keyboard, mouse, headphones]" },
  {
    label: "OS and setup",
    value: "[macOS version] with Nix, nix-darwin and home-manager, from my dotfiles",
  },
  { label: "Terminal and shell", value: "[terminal app], [shell], [prompt]" },
  { label: "Editor", value: "[editor and key plugins]" },
  { label: "Coding agents", value: "[agents you use], configured in my dotfiles" },
  { label: "Project workflow", value: "herdr, Linear/Jira, GitHub/GitLab" },
  { label: "Local infrastructure", value: "Docker, kind for local Kubernetes, Helm" },
  { label: "Writing and notes", value: "[tools]" },
  { label: "Fonts and theme", value: "[font, colour scheme]" },
];
