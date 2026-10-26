import { siteConfig } from "@/consts";
import { renderOgImage } from "@/lib/og";

export function GET() {
  return renderOgImage(siteConfig.title, siteConfig.description);
}
