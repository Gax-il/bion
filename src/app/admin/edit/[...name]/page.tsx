import CreateMarkdown from "@/components/markdown/CreateMarkdown";
import EditMarkdown from "@/components/markdown/EditMarkdown";
import { NavItems } from "@/configs/NavItems";

const EditPage = (params: { params: { name: string | string[] } }) => {
  let name = "";
  if (Array.isArray(params.params.name)) {
    for (const nme of params.params.name) {
      name += nme;
    }
  } else {
    name = params.params.name;
  }

  let pageName = [];
  let fileName;
  const Items = NavItems;
  for (const item of Items) {
    const itemName = item.href.replace("/", "");
    if (itemName === name) {
      pageName.push(item.label);
      fileName = itemName;
      break;
    }
    if (item.children) {
      for (const child of item.children) {
        const childName = child.href.replace("/", "");
        if (itemName + childName === name) {
          pageName.push(item.label);
          pageName.push(child.label);
          fileName = itemName + childName;
          break;
        }
      }
    }
  }

  return (
    <div>
      <span className="flex gap-2 text-bot place-items-end w-full border-b-2 pb-2 mb-2">
        <h1>Editace</h1>
        <h2 className="font-medium">{pageName.map((name) => ` - ${name}`)}</h2>
      </span>
      <EditMarkdown fileName={fileName || ""} />
    </div>
  );
};

export default EditPage;
