"use client";

import { error } from "console";

export default function Error({ error }: { error: Error }) {
  return (
    <div className="grid h-full place-content-center">
      <div className="text-center">
        <h1 className="font-black text-destructive text-9xl">{error.name}</h1>
        <p>{error.message}</p>
      </div>
    </div>
  );
}
