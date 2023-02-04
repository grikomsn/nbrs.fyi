import type { EdgeConfigClient } from "@vercel/edge-config";
import { createClient } from "@vercel/edge-config";
import type { VercelApiHandler, VercelResponse } from "@vercel/node";

export interface FyiOptions {
  host?: string;
  query: string;
  edgeClient?: EdgeConfigClient;
  onNotFound?: (res: VercelResponse) => VercelResponse;
}

export const fyi = ({ host, query, edgeClient, onNotFound = notFound }: FyiOptions): VercelApiHandler => {
  const baseUrl = host ? `https://${host}` : undefined;
  const client = edgeClient || createClient(process.env.EDGE_CONFIG);
  return async (req, res) => {
    const slug = req.query[query];
    if (typeof slug !== "string") {
      baseUrl ? res.redirect(baseUrl) : onNotFound(res);
      return;
    }
    const url = await client.get<string>(slug);
    if (url) res.redirect(url);
    baseUrl ? res.redirect(`${baseUrl}/${slug}`) : onNotFound(res);
  };
};

const notFound = (res: VercelResponse): VercelResponse => {
  return res.status(404).end();
};
