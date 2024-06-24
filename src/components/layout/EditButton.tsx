"use client";

import { useAuth } from "@clerk/nextjs";
import { IconEdit } from "@tabler/icons-react";
import { usePathname, useRouter } from "next/navigation";
import { Button } from "../ui/button";

const EditButton = () => {
  const pathname = usePathname();
  const editable = pathname.startsWith("/md/");
  const { userId } = useAuth();
  const router = useRouter();

  if (!userId || !editable) {
    return null;
  }

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={() => {
        router.push(`/admin/edit/${pathname.replace("/md/", "")}`);
      }}
    >
      <IconEdit className="h-5 w-5" />
    </Button>
  );
};

export default EditButton;
