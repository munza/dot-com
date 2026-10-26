import css from "@/styles/global.css?raw";

const [lightBlock, darkBlock] = css.split(":root.dark");

// Places that can't use CSS variables (OG images, manifest, meta tags) read the hex values from global.css.
export function themeColor(name: string, scheme: "light" | "dark" = "light"): string {
  const block = scheme === "light" ? lightBlock : darkBlock;
  const value = block?.match(new RegExp(`--theme-${name}:\\s*(#[0-9a-fA-F]{3,8})`))?.[1];
  if (!value)
    throw new Error(`--theme-${name} must be a hex color in the ${scheme} block of global.css`);
  return value;
}
