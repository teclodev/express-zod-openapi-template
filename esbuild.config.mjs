#!/usr/bin/env node
import * as esbuild from "esbuild"

await esbuild.build({
  platform: "node",
  bundle: true,
  entryPoints: ["src/server.ts", "src/entry.ts"],
  outdir: "dist"
})
