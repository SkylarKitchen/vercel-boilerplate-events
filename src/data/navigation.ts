export const navLinks = [
  { label: "Sessions", href: "/sessions" },
  { label: "Schedule", href: "#schedule" },
  { label: "Locations", href: "#events" },
  { label: "About", href: "#about" },
  { label: "Components", href: "/components" },
] as const;

export type NavLink = (typeof navLinks)[number];

export const isActive = (pathname: string, href: string) =>
  href === "/" ? pathname === "/" : pathname.startsWith(href) && !href.startsWith("#");
