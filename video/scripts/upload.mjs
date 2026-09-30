// Uploads the web renders to the site's Vercel Blob store and records their
// URLs in src/data/course-trailers.json, which the course pages read.
//
// Needs BLOB_READ_WRITE_TOKEN in video/.env.local, e.g. from the repo root:
//   vercel link && vercel env pull video/.env.local
import { createHash } from "node:crypto";
import { existsSync, readFileSync, writeFileSync } from "node:fs";

import { put } from "@vercel/blob";

import { FORMATS, selectTrailers, webDir } from "./trailers.mjs";

const MANIFEST = "../src/data/course-trailers.json";

if (existsSync(".env.local")) process.loadEnvFile(".env.local");
if (!process.env.BLOB_READ_WRITE_TOKEN) {
  console.error("Missing BLOB_READ_WRITE_TOKEN: run `vercel env pull video/.env.local` first.");
  process.exit(1);
}

const CONTENT_TYPE = { mp4: "video/mp4", jpg: "image/jpeg" };

/**
 * Pathnames carry a content hash, so a re-render gets a new URL instead of
 * fighting the CDN's cache of the old file under the same name.
 */
async function upload(file, folder, name) {
  const body = readFileSync(file);
  const ext = file.split(".").pop();
  const hash = createHash("sha256").update(body).digest("hex").slice(0, 10);
  const { url } = await put(`${folder}/${name}-${hash}.${ext}`, body, {
    access: "public",
    contentType: CONTENT_TYPE[ext],
    cacheControlMaxAge: 60 * 60 * 24 * 365,
    // Same hash means same bytes, so re-uploading is harmless.
    allowOverwrite: true,
  });
  console.log(`  ${(body.length / 1e6).toFixed(1)} MB  ${url}`);
  return url;
}

const manifest = existsSync(MANIFEST) ? JSON.parse(readFileSync(MANIFEST, "utf8")) : {};

for (const trailer of selectTrailers()) {
  const dir = webDir(trailer);
  const folder = `trailers/${trailer.slug}/${trailer.locale}`;
  console.log(`${trailer.slug} (${trailer.locale})`);

  const entry = {};
  for (const format of FORMATS) {
    entry[format] = {
      video: await upload(`${dir}/${format}.mp4`, folder, format),
      poster: await upload(`${dir}/${format}.jpg`, folder, `${format}-poster`),
    };
  }

  manifest[trailer.slug] = { ...manifest[trailer.slug], [trailer.locale]: entry };
}

writeFileSync(MANIFEST, JSON.stringify(manifest, null, 2) + "\n");
console.log(`Updated ${MANIFEST.replace("../", "")}`);
