import { NextRequest, NextResponse } from "next/server";
import AWS from "aws-sdk";
import { currentUser } from "@clerk/nextjs/server";

const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
  region: process.env.AWS_REGION!,
});

const bucketName = process.env.AWS_S3_BUCKET_NAME!;

export async function POST(req: NextRequest) {
  const user = await currentUser();
  console.log(user);

  try {
    const { filename, content } = await req.json();

    if (!filename || !content) {
      return NextResponse.json({ error: "Bad Request" }, { status: 400 });
    }

    const ext = filename.endsWith(".mdx") ? "" : ".md";
    const params = {
      Bucket: bucketName,
      Key: `${filename}${ext}`,
      Body: content.content,
      ContentType: "text/markdown",
    };

    if (!params.Bucket) {
      return NextResponse.json(
        { error: "Bucket name is missing" },
        { status: 500 }
      );
    }

    try {
      await s3
        .headObject({ Bucket: bucketName, Key: `${filename}${ext}` })
        .promise();
      return NextResponse.json(
        { error: "Soubor s tímto názvem již existuje" },
        { status: 400 }
      );
    } catch (error: any) {
      if (error?.code !== "NoSuchKey") {
        return NextResponse.json(
          { error: "Internal Server Error 2" },
          { status: 500 }
        );
      }
    }

    await s3.putObject(params).promise();
    return NextResponse.json({ message: "File uploaded successfully" });
  } catch (error) {
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function PUT(req: NextRequest) {
  try {
    const { filename, content } = await req.json();

    if (!filename || !content) {
      return NextResponse.json({ error: "Bad Request" }, { status: 400 });
    }

    const ext = filename.endsWith(".mdx") ? "" : ".md";
    const params = {
      Bucket: bucketName,
      Key: `${filename}${ext}`,
      Body: content,
      ContentType: "text/markdown",
    };

    await s3
      .headObject({ Bucket: bucketName, Key: `${filename}${ext}` })
      .promise();
    await s3.putObject(params).promise();
    return NextResponse.json({ message: "File updated successfully" });
  } catch (error: any) {
    if (error?.code === "NoSuchKey") {
      return NextResponse.json({ error: "File not found" }, { status: 404 });
    } else {
      return NextResponse.json(
        { error: "Internal Server Error" },
        { status: 500 }
      );
    }
  }
}

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
    const data = await s3.getObject(params).promise();
    const content = data.Body?.toString("utf-8");
    return NextResponse.json({ content });
  } catch (error: any) {
    if (error?.code === "NoSuchKey") {
      return NextResponse.json({ error: "File not found" }, { status: 404 });
    } else {
      return NextResponse.json(
        { error: "Internal Server Error" },
        { status: 500 }
      );
    }
  }
}
