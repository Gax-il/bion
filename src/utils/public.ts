"use server";

import AWS from "aws-sdk";

import matter from "gray-matter";

export const fetchMarkdown = async (
  filename: string
): Promise<MarkdownResponse> => {
  console.log(filename);
  if (!filename) {
    return { ok: false, status: 400 };
  }

  const s3 = new AWS.S3({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
    region: process.env.AWS_REGION!,
  });

  const ext = ".mdx";
  const params = {
    Bucket: process.env.AWS_S3_BUCKET_NAME!,
    Key: `${filename}${ext}`,
  };

  try {
    console.log(params.Key);
    await s3
      .headObject({
        Bucket: process.env.AWS_S3_BUCKET_NAME!,
        Key: `${filename}${ext}`,
      })
      .promise();
    const res = await s3.getObject(params).promise();
    const content = res.Body?.toString("utf-8");

    if (!content) {
      return { ok: false, status: 404 };
    }

    const contentRaw = matter(content);
    const data = { title: contentRaw.data.title, content: contentRaw.content };
    return { ok: true, status: 200, data: data };
  } catch (error: any) {
    if (error?.code === "NotFound") {
      return { ok: false, status: 418 };
    } else {
      console.log(error);
      return { ok: false, status: 500 };
    }
  }
};

export const fetchCatData = async () => {
  const res = await fetch("https://api.thecatapi.com/v1/images/search", {
    headers: {
      "Cache-Control": "no-cache",
    },
  });
  const data = await res.json();
  return data[0];
};
