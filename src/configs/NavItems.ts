import { NavItem } from "@/types/nav";

export const NavItems: NavItem[] = [
  {
    label: "O nás",
    href: "/aboutus",
    md: true,
    children: [
      {
        label: "Představenstvo",
        href: "/board",
        md: true,
      },
      {
        label: "SVAL",
        href: "/sval",
        md: true,
      },
    ],
  },
  {
    label: "Členství",
    href: "/membership",
    md: true,
  },
  {
    label: "Koleje",
    href: "/dorms",
    md: true,
    children: [
      {
        label: "GDM",
        href: "/gdm",
        md: true,
      },
      {
        label: "SOSÍK",
        href: "/sosik",
        md: true,
      },
      {
        label: "Internet",
        href: "/internet",
        md: true,
      },
    ],
  },
  {
    label: "Dobré znát",
    href: "/qal",
    md: true,
  },
  {
    label: "Dokumenty",
    href: "https://docs.bion.cvut.cz",
  },
  {
    label: "Kontakt",
    href: "/kontakt",
    md: true,
  },
];
