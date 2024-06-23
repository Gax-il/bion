"use client";
import React, { useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import remarkBreaks from "remark-breaks";
import remarkMdx from "remark-mdx";
import remarkLint from "remark-lint";
import matter from "gray-matter";
import { Textarea } from "../ui/textarea";
import { Input } from "../ui/input";
import { Button } from "../ui/button";

const CreateMarkdown: React.FC = () => {
  const [filename, setFilename] = useState<string>("");
  const [content, setContent] = useState<any>("");
  const [message, setMessage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setIsLoading(true);
    const sanitizedFilename = filename.endsWith(".mdx")
      ? filename
      : `${filename}.mdx`;

    console.log(content);

    const response = await fetch("/api/markdown", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ filename: sanitizedFilename, content }),
    });

    const result = await response.json();

    if (response.ok) {
      setMessage("Markdown file created successfully");
    } else {
      setMessage(result.error || "Error creating markdown file");
    }
    setIsLoading(false);
  };

  const handleUpdate = async (e: any) => {
    e.preventDefault();

    const msg = e.target.value;
    const data = matter(msg);
    setContent({ ...data, raw: msg });
    console.log(data);
  };

  return (
    <div style={{ padding: "20px", maxWidth: "800px", margin: "0 auto" }}>
      <h1>Vytvoření souboru Markdown</h1>
      <form onSubmit={handleSubmit} style={{ marginBottom: "20px" }}>
        <div style={{ marginBottom: "10px" }}>
          <label
            htmlFor="filename"
            style={{ display: "block", marginBottom: "5px" }}
          >
            Název souboru:
          </label>
          <Input
            disabled={isLoading}
            type="text"
            id="filename"
            value={filename}
            onChange={(e) => setFilename(e.target.value)}
            required
          />
        </div>
        <div style={{ marginBottom: "10px" }}>
          <label
            htmlFor="filename"
            style={{ display: "block", marginBottom: "5px" }}
          >
            Nadpis:
          </label>
          <Input
            disabled={isLoading}
            type="text"
            id="filename"
            value={filename}
            onChange={(e) => setFilename(e.target.value)}
            required
          />
        </div>
        <div style={{ marginBottom: "10px" }}>
          <label
            htmlFor="content"
            style={{ display: "block", marginBottom: "5px" }}
          >
            Text:
          </label>
          <Textarea
            disabled={isLoading}
            value={content.raw}
            onChange={(e) => handleUpdate(e)}
            rows={10}
            placeholder="Zadejte text"
          />
        </div>
        <Button type="submit" disabled={isLoading}>
          Create
        </Button>
      </form>
      {message && <p>{message}</p>}
      <h2>Ukázka</h2>
      <div>
        <h2 className="text-2xl">
          {content ? (content.data.title ? content.data.title : "") : ""}
        </h2>
        <ReactMarkdown
          remarkPlugins={[remarkGfm, remarkBreaks, remarkMdx, remarkLint]}
        >
          {content.content}
        </ReactMarkdown>
      </div>
    </div>
  );
};

export default CreateMarkdown;
