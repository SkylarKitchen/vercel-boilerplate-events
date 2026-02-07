export const navLinks = [
  { label: "Sessions", href: "/sessions" },
  { label: "Schedule", href: "#schedule" },
  { label: "Locations", href: "#locations" },
  { label: "About", href: "#about" },
  { label: "Components", href: "/components" },
] as const;

export type NavLink = (typeof navLinks)[number];
