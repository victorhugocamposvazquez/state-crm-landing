"use client";

import dynamic from "next/dynamic";

/** El canvas solo existe en el navegador. */
export const StageClient = dynamic(() => import("./Stage").then((m) => m.Stage), { ssr: false });
