import { NextRequest, NextResponse } from "next/server";
import AWS from "aws-sdk";

const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
  region: process.env.AWS_REGION!,
});

const bucketName = process.env.AWS_S3_BUCKET_NAME!;

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const filename = searchParams.get("filename");

  if (!filename) {
    return NextResponse.json({ error: "Bad Request" }, { status: 400 });
  }

  const ext = filename.endsWith(".mdx") ? "" : ".md";
  const params = {
    Bucket: bucketName,
    Key: `${filename}${ext}`,
  };

  try {
    await s3
      .headObject({ Bucket: bucketName, Key: `${filename}${ext}` })
      .promise();
    const data = await s3.getObject(params).promise();
    const content = data.Body?.toString("utf-8");
    return NextResponse.json({ content });
  } catch (error: any) {
    if (error?.code === "NotFound") {
      return NextResponse.json({ error: "File not found" }, { status: 418 });
    } else {
      console.log(error);
      return NextResponse.json(
        { error: "Internal Server Error" },
        { status: 500 }
      );
    }
  }
}
