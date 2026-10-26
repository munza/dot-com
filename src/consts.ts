export interface SiteConfig {
  readonly title: string;
  readonly description: string;
}

export interface AuthorInfo {
  readonly name: string;
  readonly designation: string;
  readonly location: string;
}

export interface NavLink {
  readonly label: string;
  readonly href: string;
  /** Name of an SVG in src/icons/, shown before the label. */
  readonly icon?: string;
}

export interface SocialLink extends NavLink {
  readonly icon: string;
}

export const siteConfig: SiteConfig = {
  title: "Mara Lindqvist",
  description:
    "Backend engineer in Rotterdam. Notes on databases, queues and the unglamorous parts of running software in production.",
};

export const authorInfo: AuthorInfo = {
  name: "Mara Lindqvist",
  designation: "Staff backend engineer",
  location: "Rotterdam, NL",
};

export const navLinks: NavLink[] = [
  { label: "About", href: "/#about" },
  { label: "Blog", href: "/blog" },
];

export const socialLinks: SocialLink[] = [
  { icon: "github", href: "https://github.com/maralindqvist", label: "GitHub" },
  { icon: "mastodon", href: "https://hachyderm.io/@mara", label: "Mastodon" },
  { icon: "rss", href: "/rss.xml", label: "RSS" },
];
