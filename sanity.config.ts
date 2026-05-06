import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { visionTool } from "@sanity/vision";
import { codeInput } from "@sanity/code-input";
import { table } from "@sanity/table";
import { schemaTypes } from "./sanity/schemas";
import { projectId, dataset } from "./sanity/env";

export default defineConfig({
  name: "velt-marketing",
  title: "Velt Marketing",
  projectId,
  dataset,
  basePath: "/studio",
  plugins: [structureTool(), visionTool(), codeInput(), table()],
  schema: {
    types: schemaTypes,
  },
});
