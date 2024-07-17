import Image from "next/image";
import { fetchMarkdown, fetchCatData } from "@/utils/public";
import MarkdownView from "@/components/markdown/MarkdownView";
import { Separator } from "@/components/ui/separator";

export default async function MDPage({
  params,
}: {
  params: { name: string | string[] };
}) {
  let name = "";
  if (Array.isArray(params.name)) {
    for (const nme of params.name) {
      name += nme;
    }
  } else {
    name = params.name;
  }

  let content: string | null = null;
  let cat: { url: string; width: number; height: number } | null = null;
  let title: string | null = null;

  try {
    const res = await fetchMarkdown(name);

    if (res.ok) {
      content = res.data?.content || "";
      title = res.data?.title || "";
    } else {
      const catData = await fetchCatData();
      cat = {
        url: catData.url,
        width: catData.width,
        height: catData.height,
      };
    }
  } catch (err) {
    throw err;
  }

  return (
    <div>
      {!content && !cat ? (
        "Loading..."
      ) : (
        <>
          {content && (
            <>
              <h1>{title}</h1>
              <Separator />
              <MarkdownView content={content} />
            </>
          )}
          {cat && (
            <div className="flex justify-center flex-col text-center">
              <h1 className="text-9xl">No....</h1>
              <h1>stránka tu bejt nemá tak tu máš aspoň kočku</h1>
              <div className="h-[50vh] rounded-md flex justify-center">
                <Image
                  src={cat.url}
                  width={cat.width}
                  height={cat.height}
                  alt="Kočka"
                  className="w-auto h-full"
                />
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}
