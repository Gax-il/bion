"use client";

import React, { useEffect, useState } from "react";
import matter from "gray-matter";
import { Textarea } from "../ui/textarea";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { IconEdit, IconEyeCheck, IconPencil } from "@tabler/icons-react";
import { editPage } from "@/utils/admin/markdown";
import MarkdownView from "./MarkdownView";

interface MarkdownProps {
  fileName: string;
  content: string;
  title: string;
}

const EditMarkdown: React.FC<MarkdownProps> = ({
  fileName,
  content,
  title,
}: MarkdownProps) => {
  const [curContent, setContent] = useState<{ actual: string; edited: string }>(
    {
      actual: "",
      edited: "",
    }
  );
  const [message, setMessage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [curTitle, setTitle] = useState<string>("");
  const [editMode, setEditMode] = useState<boolean>(true);

  useEffect(() => {
    if (content) {
      setContent({ actual: content, edited: content });
    }
    if (title) {
      setTitle(title);
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!fileName) {
      setMessage("??? Nevim jak si to udělal ale dobře xd");
      return;
    }

    setIsLoading(true);

    console.log(content);

    const res = await editPage(fileName, curContent.edited, title);
    console.log(res);

    if (res.ok) {
      setMessage("Markdown file created successfully");
    } else {
      if (res.status === 418) {
        setMessage("Markdown file doesnt exist");
      } else {
        setMessage("Error creating markdown file");
      }
    }

    setIsLoading(false);
  };

  const handleInvalid = (e: any) => {
    e.target.setCustomValidity("Musí být vyplněno");
  };

  const handleUpdate = async (e: any) => {
    const cont = matter(e.target.value);

    setContent({ actual: e.target.value, edited: cont.content });
  };

  return (
    <>
      <div className="relative">
        <Button
          type="button"
          className="absolute top-0 right-0"
          onClick={() => setEditMode(!editMode)}
        >
          {editMode ? <IconEyeCheck /> : <IconEdit />}
        </Button>
      </div>
      <div>
        {editMode && (
          <form onSubmit={handleSubmit} style={{ marginBottom: "20px" }}>
            <div style={{ marginBottom: "10px" }}>
              <label
                htmlFor="title"
                style={{ display: "block", marginBottom: "5px" }}
              >
                Nadpis:
              </label>
              <Input
                disabled={isLoading}
                type="text"
                id="title"
                value={curTitle}
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
                value={curContent.actual}
                onChange={(e) => handleUpdate(e)}
                rows={10}
                placeholder="Zadejte text"
                onInvalid={handleInvalid}
              />
            </div>
            <Button type="submit" disabled={isLoading}>
              Create
            </Button>
          </form>
        )}
        {!editMode && (
          <div>
            <h2 className="text-2xl">{title ? title : ""}</h2>
            <MarkdownView content={curContent.edited} />
          </div>
        )}
        {message && <p>{message}</p>}
      </div>
    </>
  );
};

export default EditMarkdown;
