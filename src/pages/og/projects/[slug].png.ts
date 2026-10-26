import type { APIRoute, GetStaticPaths } from "astro";

import { getProjectPages, type Project } from "@/lib/posts";
import { renderOgImage } from "@/lib/og";

export const getStaticPaths = (async () => {
  const projects = await getProjectPages();
  return projects.map((project) => ({ params: { slug: project.id }, props: { project } }));
}) satisfies GetStaticPaths;

export const GET: APIRoute<{ project: Project }> = ({ props }) =>
  renderOgImage(props.project.data.title, props.project.data.summary, "MODULE · PROJECT");
