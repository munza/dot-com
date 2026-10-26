import type { APIRoute, GetStaticPaths } from "astro";

import { renderFaviconPng } from "@/lib/favicon";

// Sizes for apple-touch-icon (180) and the web manifest (192, 512).
export const getStaticPaths = (() =>
  ["180", "192", "512"].map((size) => ({ params: { size } }))) satisfies GetStaticPaths;

export const GET: APIRoute = ({ params }) =>
  new Response(renderFaviconPng(Number(params.size)), { headers: { "Content-Type": "image/png" } });
