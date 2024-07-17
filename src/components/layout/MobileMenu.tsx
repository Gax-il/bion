"use client";

import Image from "next/image";
import Link from "next/link";
import { Button } from "../ui/button";
import { IconCross, IconMenu2, IconX } from "@tabler/icons-react";
import { useState } from "react";
import MobileButtons from "./MobileButtons";

const MobileMenu = () => {
  const [expanded, setExpanded] = useState(false);
  return (
    <div className="lg:hidden">
      {!expanded && (
        <div className="flex items-center justify-between space-x-4 border-b">
          <Link
            href="/"
            className="flex items-center fill-primary hover:bg-inherit"
          >
            <Image
              src="/bion-logo/black.svg"
              alt="FK BION"
              width={(593 / 321) * 48}
              height={48}
              className="dark:invert p-2"
            />
          </Link>
          <span className="pr-2">
            <Button
              variant="ghost"
              className="p-2"
              onClick={() => setExpanded(!expanded)}
            >
              {expanded ? (
                <IconX className="h-5 w-5" />
              ) : (
                <IconMenu2 className="h-5 w-5" />
              )}
            </Button>
          </span>
        </div>
      )}
      {expanded && (
        <div className="fixed top-0 left-0 z-30 w-full h-screen bg-background">
          <div className="flex items-center justify-between space-x-4 lg:hidden border-b shadow-md">
            <Link
              href="/"
              className="flex items-center fill-primary hover:bg-inherit"
            >
              <Image
                src="/bion-logo/black.svg"
                alt="FK BION"
                width={(593 / 321) * 48}
                height={48}
                className="dark:invert p-2"
              />
            </Link>
            <span className="pr-2">
              <Button
                variant="ghost"
                className="p-2"
                onClick={() => setExpanded(!expanded)}
              >
                {expanded ? (
                  <IconX className="h-5 w-5" />
                ) : (
                  <IconMenu2 className="h-5 w-5" />
                )}
              </Button>
            </span>
          </div>
          <div className="container flex flex-col h-full overflow-auto pb-16">
            <div className="w-full flex flex-col">
              <MobileButtons />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MobileMenu;
