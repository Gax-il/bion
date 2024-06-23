type Cat = {
  url: string;
  width: number;
  height: number;
};

type MarkdownResponse = {
  ok: boolean;
  status: number;
  data?: Markdown;
};

type Markdown = {
  content: string;
  title: string;
};
