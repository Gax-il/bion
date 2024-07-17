"use client";
import Link from "next/link";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "../ui/navigation-menu";
import { cn } from "@/lib/utils";
import { NavItems } from "@/configs/NavItems";
import Image from "next/image";
import { usePathname } from "next/navigation";

const MainNav = () => {
  const rawPathname = usePathname();
  const pathname = rawPathname.replace("/md", "");
  return (
    <div className="flex gap-6 md:gap-10 h-16 ">
      <Link
        href="/"
        className="flex items-center fill-primary hover:bg-inherit"
      >
        <Image
          src="/bion-logo/black.svg"
          alt="FK BION"
          width={(593 / 321) * 48}
          height={48}
          className="dark:invert "
        />
      </Link>
      <div className="flex">
        {NavItems.map((NavItem, index) => (
          <NavigationMenu key={index}>
            <NavigationMenuList>
              <NavigationMenuItem key={index}>
                <Link
                  href={NavItem.md ? `/md/${NavItem.href}` : NavItem.href}
                  legacyBehavior
                  passHref
                >
                  {NavItem.children ? (
                    <NavigationMenuTrigger
                      className={
                        NavItem.href === pathname
                          ? "text-primary"
                          : "text-inherit"
                      }
                    >
                      {NavItem.label}
                    </NavigationMenuTrigger>
                  ) : (
                    <NavigationMenuLink
                      className={cn(
                        navigationMenuTriggerStyle(),
                        "w-full  dark:text-inherit",
                        NavItem.href === pathname
                          ? "text-primary"
                          : "text-inherit"
                      )}
                    >
                      {NavItem.label}
                    </NavigationMenuLink>
                  )}
                </Link>
                {NavItem.children && (
                  <NavigationMenuContent
                    className="flex flex-col gap-2 p-2"
                    key={index}
                  >
                    {NavItem.children?.map((child, index) => (
                      <Link
                        href={
                          child.md
                            ? `/md/${child.href}`
                            : `${NavItem.href}/${child.href}`
                        }
                        legacyBehavior
                        passHref
                        key={index}
                      >
                        <NavigationMenuLink
                          className={cn(
                            navigationMenuTriggerStyle(),
                            "w-full text-inherit dark:text-inherit"
                          )}
                        >
                          {child.label}
                        </NavigationMenuLink>
                      </Link>
                    ))}
                  </NavigationMenuContent>
                )}
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        ))}
      </div>
    </div>
  );
};

export default MainNav;

const LoggComp = ({ data }: { data: any }) => {
  console.log(data);
  return <></>;
};
