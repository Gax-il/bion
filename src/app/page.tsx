"use client";

import { InstagramEmbed } from "react-social-media-embed";

export default function Home() {
  return (
    <main className="flex flex-col items-center h-full">
      <InstagramEmbed
        url="https://www.instagram.com/p/C6I0a0ft1LV/"
        width={400}
      />
      <InstagramEmbed
        url="https://www.instagram.com/p/C6ChmJysTAU/"
        width={400}
      />
      <InstagramEmbed
        url="https://www.instagram.com/p/C53qif3sgVY/"
        width={400}
      />
    </main>
  );
}
