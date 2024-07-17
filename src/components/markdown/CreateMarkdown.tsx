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
import { IconEdit, IconEyeCheck, IconPencil } from "@tabler/icons-react";

const CreateMarkdown: React.FC = () => {
  const [filename, setFilename] = useState<string>("");
  const [content, setContent] = useState<any>("");
  const [message, setMessage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [title, setTitle] = useState<string>("");
  const [editMode, setEditMode] = useState<boolean>(true);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setIsLoading(true);
    const sanitizedFilename = filename.endsWith(".mdx")
      ? filename
      : `${filename}.mdx`;

    console.log(content);

    const response = await fetch("/api/markdown", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ filename: sanitizedFilename, content }),
    });

    const result = await response.json();

    if (response.ok) {
      setMessage("Markdown úspěšně vytvořen");
    } else {
      setMessage(result.error || "Error při vytváření markdown souboru");
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

  const handleInvalid = (e: any) => {
    setEditMode(true);
    e.target.setCustomValidity("Musí být vyplněno");
  };

  return (
    <div style={{ padding: "20px", maxWidth: "800px", margin: "0 auto" }}>
      <div className="flex justify-between">
        <h1>Vytvoření souboru Markdown</h1>
        <Button type="button" onClick={() => setEditMode(!editMode)}>
          {editMode ? <IconEyeCheck /> : <IconEdit />}
        </Button>
      </div>
      {editMode && (
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
              onInvalid={handleInvalid}
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
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              onInvalid={handleInvalid}
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
              onInvalid={handleInvalid}
            />
          </div>
          <Button type="submit" disabled={isLoading}>
            Vytvořit
          </Button>
        </form>
      )}
      {!editMode && (
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
      )}
      {message && <p>{message}</p>}
    </div>
  );
};

export default CreateMarkdown;
