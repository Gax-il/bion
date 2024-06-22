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
import { Separator } from "../ui/separator";
import { cn } from "@/lib/utils";
import { NavItems } from "@/configs/NavItems";
import Image from "next/image";

const MainNav = () => {
  return (
    <div className="flex gap-6 md:gap-10 h-16 ">
      <Link href="/" className="flex items-center fill-primary ">
        <Image
          src="/bion-logo/black.svg"
          alt="FK BION"
          width={(593 / 321) * 48}
          height={48}
          className="dark:invert max-h-full"
        />
      </Link>
      <NavigationMenu>
        <NavigationMenuList>
          {NavItems.map((NavItem, index) => (
            <NavigationMenuItem key={index}>
              <Link href={NavItem.href} legacyBehavior passHref>
                {NavItem.children ? (
                  <NavigationMenuTrigger>{NavItem.label}</NavigationMenuTrigger>
                ) : (
                  <NavigationMenuLink
                    className={cn(navigationMenuTriggerStyle(), "w-full")}
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
                      href={`${NavItem.href}/${child.href}`}
                      legacyBehavior
                      passHref
                      key={index}
                    >
                      <NavigationMenuLink
                        className={cn(navigationMenuTriggerStyle(), "w-full")}
                      >
                        {child.label}
                      </NavigationMenuLink>
                    </Link>
                  ))}
                </NavigationMenuContent>
              )}
            </NavigationMenuItem>
          ))}
        </NavigationMenuList>
      </NavigationMenu>
    </div>
  );
};

export default MainNav;

const LoggComp = ({ data }: { data: any }) => {
  console.log(data);
  return <></>;
};
