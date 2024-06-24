import Link from "next/link";
import { Button, buttonVariants } from "../ui/button";
import ThemeToggle from "./ThemeToggle";
import MainNav from "./MainNav";
import { Socials } from "@/configs/Socials";
import AuthButton from "../auth/AuthButton";
import EditButton from "./EditButton";
import { IconMenu2 } from "@tabler/icons-react";
import Image from "next/image";
import MobileMenu from "./MobileMenu";

const SiteHeader = () => {
  return (
    <header className="bg-background sticky top-0 z-40 w-full">
      <div className="container hidden lg:flex h-16 items-center space-x-4 lg:justify-between lg:space-x-0 border-b">
        <MainNav />
        <div className="flex flex-1 items-center justify-end space-x-4">
          <nav className="flex items-center space-x-1">
            {Socials.map((social, index) => (
              <Link
                href={social.href}
                key={index}
                passHref
                className="dark:text-inherit text-inherit"
              >
                <div
                  className={buttonVariants({
                    size: "icon",
                    variant: "ghost",
                  })}
                >
                  <social.icon />
                  <span className="sr-only">{social.name}</span>
                </div>
              </Link>
            ))}
            <AuthButton />
            <EditButton />
            <ThemeToggle />
          </nav>
        </div>
      </div>
      <MobileMenu /> {/* Md a níž */}
    </header>
  );
};

export default SiteHeader;
