import { fyi } from "edge-fyi";

export default fyi({
  host: process.env.HOST,
  query: "slug",
});
