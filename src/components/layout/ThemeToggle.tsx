"use client";

import { useTheme } from "next-themes";
import { Button } from "../ui/button";
import { IconMoon, IconSun } from "@tabler/icons-react";

const ThemeToggle = () => {
  const { theme, setTheme } = useTheme();

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={() => {
        console.log("?");
        setTheme(theme === "dark" ? "light" : "dark");
      }}
    >
      <IconMoon className="h-5 w-5 dark:hidden" />
      <IconSun className="h-5 w-5 hidden dark:block" />
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
};

export default ThemeToggle;
