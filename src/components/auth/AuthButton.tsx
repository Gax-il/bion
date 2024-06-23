"use client";

import { useClerk, useUser } from "@clerk/nextjs";
import { Button } from "../ui/button";
import { IconLogin, IconLogout } from "@tabler/icons-react";
import Link from "next/link";

const AuthButton = () => {
  const { isSignedIn, user } = useUser();
  const { signOut } = useClerk();

  return (
    <>
      {isSignedIn && (
        <Button onClick={() => signOut()} variant={"ghost"} className="p-2">
          <IconLogout className="h-5 w-5" />
        </Button>
      )}
      {!isSignedIn && (
        <Link href="/login" passHref legacyBehavior>
          <Button variant={"ghost"} className="p-2">
            <IconLogin className="h-5 w-5" />
          </Button>
        </Link>
      )}
    </>
  );
};

export default AuthButton;
