import { headline, siteConfig } from "@/consts";
import { renderOgImage } from "@/lib/og";

export function GET() {
  return renderOgImage(headline, siteConfig.description);
}
