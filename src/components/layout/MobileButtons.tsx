"use client";

import { NavItems } from "@/configs/NavItems";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "../ui/button";

const MobileButtons = () => {
  const rawPathname = usePathname();
  const pathname = rawPathname.replace("/md", "");

  return (
    <>
      {NavItems.map((NavItem, index) => (
        <div key={index}>
          <Link href={NavItem.href}>{NavItem.label}</Link>
          {NavItem.children && (
            <div className="flex flex-col ml-4">
              {NavItem.children.map((child, childIndex) => (
                <Link key={childIndex} href={`${NavItem.href}/${child.href}`}>
                  {child.label}
                </Link>
              ))}
            </div>
          )}
        </div>
      ))}
    </>
  );
};

export default MobileButtons;
