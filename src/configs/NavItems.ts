import { NavItem } from "@/types/nav";

export const NavItems: NavItem[] = [
  {
    label: "O nás",
    href: "/aboutus",
    children: [
      {
        label: "Představenstvo",
        href: "/board",
      },
      {
        label: "SVAL",
        href: "/sval",
      },
    ],
  },
  {
    label: "Členství",
    href: "/membership",
  },
  {
    label: "Koleje",
    href: "/dorms",
    children: [
      {
        label: "GDM",
        href: "/gdm",
      },
      {
        label: "SOSÍK",
        href: "/sosik",
      },
      {
        label: "Internet",
        href: "/internet",
      },
    ],
  },
  {
    label: "Dobré znát",
    href: "/qal",
  },
  {
    label: "Dokumenty",
    href: "https://docs.fkbion.cz",
  },
  {
    label: "Kontakt",
    href: "/kontakt",
  },
];
