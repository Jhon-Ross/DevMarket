import { createClient } from "@sanity/client";

const projectId = process.env.SANITY_PROJECT_ID || "";
const dataset = process.env.SANITY_DATASET || "production";
const token = process.env.SANITY_TOKEN;

export const sanityClient = createClient({
  projectId,
  dataset,
  apiVersion: "2023-10-01",
  useCdn: true,
  token,
});