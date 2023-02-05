import { edgeFyi } from "edge-fyi";

export const config = {
  runtime: "edge",
};

export default edgeFyi({
  host: process.env.HOST,
  query: "slug",
});
