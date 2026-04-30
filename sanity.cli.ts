import { defineCliConfig } from "sanity/cli";
import { projectId, dataset } from "./sanity/env";

export default defineCliConfig({
  api: { projectId, dataset },
  studioHost: "velt",
  deployment: {
    appId: "ktfaywp4j8m7ziinn4eyfz8o",
  },
});
