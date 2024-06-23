"use server";

import matter from "gray-matter";
import { MDXRemote } from "next-mdx-remote/rsc";
import React from "react";

const AboutUs = async () => {
  const res = await fetch(
    "http://localhost:3000/api/markdown?filename=aboutus.mdx",
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  if (!res.ok) {
    throw new Error("Error fetching content");
  }

  const markdown = await res.json();
  const { content, data } = matter(markdown.content);

  console.log(data.title);

  if (!markdown.content) {
    throw new Error("Error fetching content");
  }
  return (
    <main>
      <div>
        <h1 className="text-3xl font-bold">{data.title}</h1>
        <div className="mt-2 flex flex-col gap-2">
          <MDXRemote source={content} />
        </div>
      </div>
    </main>
  );
};

export default AboutUs;
