import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import remarkBreaks from "remark-breaks";
import remarkMdx from "remark-mdx";
import remarkLint from "remark-lint";
import React from "react";

import styles from "./markdown.module.css";
import { cn } from "@/lib/utils";

interface MarkdownProps {
  content: string;
  className?: string;
}

const MarkdownView: React.FC<MarkdownProps> = ({ content, className }) => {
  return (
    <ReactMarkdown
      className={cn("w-full", className)}
      remarkPlugins={[remarkGfm, remarkBreaks, remarkMdx, remarkLint]}
      components={{
        p: ({ node, ...props }) => (
          <p className={styles.paragraph} {...props} />
        ),
        ul: ({ node, ...props }) => (
          <ul className={styles.unorderedList} {...props} />
        ),
        li: ({ node, ...props }) => (
          <li className={styles.listItem} {...props} />
        ),
        h1: ({ node, ...props }) => (
          <h1 className={styles.heading1} {...props} />
        ),
        h2: ({ node, ...props }) => (
          <h2 className={styles.heading2} {...props} />
        ),
        h3: ({ node, ...props }) => (
          <h3 className={styles.heading3} {...props} />
        ),
        h4: ({ node, ...props }) => (
          <h4 className={styles.heading4} {...props} />
        ),
        h5: ({ node, ...props }) => (
          <h5 className={styles.heading5} {...props} />
        ),
      }}
    >
      {content}
    </ReactMarkdown>
  );
};

export default MarkdownView;
