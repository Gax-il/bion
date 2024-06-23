import { MDXRemote } from "next-mdx-remote/rsc";

const MarkdownViewer = ({ content }: { content: any }) => {
  return <MDXRemote source={content} />;
};

export default MarkdownViewer;
