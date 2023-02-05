import { getAll } from "@vercel/edge-config";

import type { Dict } from "./_lib/html";
import { renderHtml } from "./_lib/html";

export const config = {
  runtime: "edge",
};

const handler = async (req: Request): Promise<Response> => {
  const url = new URL(req.url);
  if (!process.env.PEEK_SECRET || url.searchParams.get("secret") !== process.env.PEEK_SECRET) {
    return new Response("Unauthorized", { status: 401 });
  }
  const links = await getAll<Dict>();
  if (url.searchParams.get("type") === "json" || req.headers.get("accept")?.includes("json")) {
    return new Response(JSON.stringify(links, null, 2), {
      headers: {
        "Cache-Control": "s-maxage=1, stale-while-revalidate",
        "Content-Type": "application/json",
      },
    });
  }
  const content = renderHtml(links);
  return new Response(content, {
    headers: {
      "Cache-Control": "s-maxage=1, stale-while-revalidate",
      "Content-Type": "text/html",
    },
  });
};

export default handler;
