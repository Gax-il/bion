import Link from "next/link";
import { buttonVariants } from "../ui/button";
import { HomeIcon } from "@radix-ui/react-icons";
import ThemeToggle from "./ThemeToggle";
import MainNav from "./MainNav";
import { Socials } from "@/configs/Socials";

const SiteHeader = () => {
  return (
    <header className="bg-background sticky top-0 z-40 w-full border-b">
      <div className="container flex h-16 items-center space-x-4 sm:justify-between sm:space-x-0">
        <MainNav />
        <div className="flex flex-1 items-center justify-end space-x-4">
          <nav className="flex items-center space-x-1">
            <Link href="/">
              <div
                className={buttonVariants({
                  size: "icon",
                  variant: "ghost",
                })}
              >
                <HomeIcon className="h-5 w-5" />
                <span className="sr-only">Home</span>
              </div>
            </Link>
            {Socials.map((social, index) => (
              <Link href={social.href} key={index} passHref>
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
            <ThemeToggle />
          </nav>
        </div>
      </div>
    </header>
  );
};

export default SiteHeader;
