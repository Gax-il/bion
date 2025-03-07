import { ForwardRefExoticComponent } from "react";

export interface Social {
  name: string;
  href: string;
  icon: ForwardRefExoticComponent<any>;
}

export interface NavItem {
  label: string;
  href: string;
  children?: ChildNavItem[];
  md?: boolean;
}

export interface ChildNavItem {
  label: string;
  href: string;
  md?: boolean;
}
