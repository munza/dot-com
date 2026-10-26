import type { APIRoute } from "astro";

import { renderFaviconIco } from "@/lib/favicon";

export const GET: APIRoute = () =>
  new Response(renderFaviconIco(), { headers: { "Content-Type": "image/x-icon" } });
