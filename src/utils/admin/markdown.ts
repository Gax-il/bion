"use server";

import { auth } from "@clerk/nextjs/server";
import AWS from "aws-sdk";

import matter from "gray-matter";

export const editPage = async (
  filename: string,
  rawContent: string,
  title: string
): Promise<{ ok: boolean; status: number }> => {
  const user = await auth();

  if (!user) {
    return { ok: false, status: 401 };
  }

  const content = matter(rawContent);

  const finalMdx = matter.stringify(content.content, { title: title });

  const s3 = new AWS.S3({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
    region: process.env.AWS_REGION!,
  });

  const ext = ".mdx";
  const params = {
    Bucket: process.env.AWS_S3_BUCKET_NAME!,
    Key: `${filename}${ext}`,
    ContentType: "text/markdown",
    Body: finalMdx,
  };

  try {
    await s3
      .headObject({
        Bucket: process.env.AWS_S3_BUCKET_NAME!,
        Key: `${filename}${ext}`,
      })
      .promise();
    await s3.putObject(params).promise();
    return { ok: true, status: 200 };
  } catch (error: any) {
    if (error?.code === "NotFound") {
      await s3.putObject(params).promise();
      return { ok: true, status: 200 };
    } else {
      console.log(error);
      return { ok: false, status: 500 };
    }
  }
};
