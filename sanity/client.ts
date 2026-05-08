import { createClient } from "@sanity/client";
import { projectId, dataset, apiVersion } from "./env";

export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  // Live API in dev so seed-script writes show up immediately; CDN in
  // production where Next.js ISR (revalidate) already handles freshness
  // and the CDN saves API quota.
  useCdn: process.env.NODE_ENV === "production",
});
