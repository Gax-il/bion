import shadcnPlugin from "./src/lib/shadcn-plugin";
import type { Config } from "tailwindcss";
import animationPlugin from "tailwindcss-animate";

const config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  prefix: "",
  plugins: [animationPlugin, shadcnPlugin],
} satisfies Config;

export default config;
