import { getAll } from "@vercel/edge-config";
import type { VercelApiHandler } from "@vercel/node";

import type { Dict } from "./_lib/html";
import { renderHtml } from "./_lib/html";

const handler: VercelApiHandler = async (req, res) => {
  if (!process.env.PEEK_SECRET || req.query.secret !== process.env.PEEK_SECRET) {
    res.status(401).send("Unauthorized");
    return;
  }
  const links = await getAll<Dict>();
  res.setHeader("Cache-Control", "s-maxage=1, stale-while-revalidate");
  if (req.query.type === "json") {
    res.json(links);
    return;
  }
  const content = renderHtml(links);
  res.send(content);
};

export default handler;
