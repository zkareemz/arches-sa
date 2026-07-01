// Gallery generator — turns raw photos in /gallery into web-optimized webp
// assets (in /public/gallery) plus a structural src/data/gallery.json.
//
// Runs before `dev` and `build` (via the `predev` / `prebuild` npm hooks) so
// the data is always fresh. Incremental: unchanged photos are skipped using a
// content-hash manifest (gallery-cache.json).

import { createHash } from "node:crypto";
import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

// --- config -----------------------------------------------------------------

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");

const SRC_DIR = path.join(ROOT, "gallery");
const OUT_IMG_DIR = path.join(ROOT, "public", "gallery");
const OUT_THUMB_DIR = path.join(OUT_IMG_DIR, "thumb");
const OUT_JSON = path.join(ROOT, "src", "data", "gallery.json");
const MANIFEST = path.join(ROOT, "gallery-cache.json");

const FULL_WIDTH = 1920;
const FULL_QUALITY = 82;
const THUMB_WIDTH = 480;
const THUMB_QUALITY = 72;

const HASH_LEN = 16; // filename = first 16 hex chars of sha1

const IMAGE_EXTS = new Set([
  ".jpg",
  ".jpeg",
  ".png",
  ".webp",
  ".avif",
  ".gif",
  ".tif",
  ".tiff",
  ".bmp",
]);

// --- small helpers ----------------------------------------------------------

const isImage = (name) =>
  !name.startsWith(".") && IMAGE_EXTS.has(path.extname(name).toLowerCase());

const exists = async (p) => {
  try {
    await fs.access(p);
    return true;
  } catch {
    return false;
  }
};

const rel = (abs) => path.relative(ROOT, abs);

const kebab = (s) =>
  s
    .normalize("NFKD")
    .toLowerCase()
    .replace(/['"`]/g, "")
    .replace(/[\s_]+/g, "-")
    .replace(/[^a-z0-9؀-ۿ-]/g, "")
    .replace(/-+/g, "-")
    .replace(/^-+|-+$/g, "");

const titleCase = (s) =>
  s
    .replace(/[_-]+/g, " ")
    .replace(/\s+/g, " ")
    .trim()
    .split(" ")
    .map((w) => (w ? w[0].toUpperCase() + w.slice(1) : w))
    .join(" ");

// Returns a unique slug within `used`, appending -2, -3, … on collision.
const uniqueSlug = (base, used) => {
  let slug = base || "untitled";
  let n = 2;
  while (used.has(slug)) {
    slug = `${base}-${n}`;
    n += 1;
  }
  used.add(slug);
  return slug;
};

const readDir = async (dir) => {
  try {
    return await fs.readdir(dir, { withFileTypes: true });
  } catch {
    return [];
  }
};

const hashFile = async (filePath) => {
  const data = await fs.readFile(filePath);
  return createHash("sha1").update(data).digest("hex");
};

const readManifest = async () => {
  try {
    return JSON.parse(await fs.readFile(MANIFEST, "utf8"));
  } catch {
    return {};
  }
};

// --- image processing -------------------------------------------------------

// Encodes one source photo into full + thumbnail webp. Returns the JSON entry
// (paths are public-root-relative, without a leading slash, so the consumer
// can prepend "/").
const processImage = async (srcAbs, hash, alt) => {
  const name = hash.slice(0, HASH_LEN);
  const fullOut = path.join(OUT_IMG_DIR, `${name}.webp`);
  const thumbOut = path.join(OUT_THUMB_DIR, `${name}.webp`);

  const fullInfo = await sharp(srcAbs)
    .rotate() // honor EXIF orientation
    .resize({ width: FULL_WIDTH, withoutEnlargement: true })
    .webp({ quality: FULL_QUALITY })
    .toFile(fullOut);

  await sharp(srcAbs)
    .rotate()
    .resize({ width: THUMB_WIDTH, withoutEnlargement: true })
    .webp({ quality: THUMB_QUALITY })
    .toFile(thumbOut);

  return {
    full: `gallery/${name}.webp`,
    thumb: `gallery/thumb/${name}.webp`,
    width: fullInfo.width,
    height: fullInfo.height,
    alt,
  };
};

// Re-reads dimensions of an existing (cached) full webp without re-encoding.
const inspectImage = async (hash, alt) => {
  const name = hash.slice(0, HASH_LEN);
  const fullOut = path.join(OUT_IMG_DIR, `${name}.webp`);
  const meta = await sharp(fullOut).metadata();
  return {
    full: `gallery/${name}.webp`,
    thumb: `gallery/thumb/${name}.webp`,
    width: meta.width,
    height: meta.height,
    alt,
  };
};

// --- core -------------------------------------------------------------------

const buildImageList = async (dir, altPrefix, manifest, nextManifest) => {
  const entries = await readDir(dir);
  const files = entries
    .filter((e) => e.isFile() && isImage(e.name))
    .map((e) => e.name)
    .sort((a, b) => a.localeCompare(b, undefined, { numeric: true }));

  const images = [];
  for (let i = 0; i < files.length; i++) {
    const fileName = files[i];
    const srcAbs = path.join(dir, fileName);
    const key = rel(srcAbs);
    const alt = `${altPrefix} ${i + 1}`.trim();

    try {
      const hash = await hashFile(srcAbs);
      nextManifest[key] = hash;

      const fullOut = path.join(OUT_IMG_DIR, `${hash.slice(0, HASH_LEN)}.webp`);
      const thumbOut = path.join(
        OUT_THUMB_DIR,
        `${hash.slice(0, HASH_LEN)}.webp`,
      );
      const cached =
        manifest[key] === hash &&
        (await exists(fullOut)) &&
        (await exists(thumbOut));

      const entry = cached
        ? await inspectImage(hash, alt)
        : await processImage(srcAbs, hash, alt);
      images.push(entry);
      if (cached) stats.skipped += 1;
      else stats.processed += 1;
    } catch (err) {
      // One bad photo must never abort the build.
      console.warn(`[gallery] skipping "${key}": ${err.message}`);
    }
  }
  return images;
};

const stats = { processed: 0, skipped: 0, removed: 0 };

const cleanupOrphans = async (keepNames) => {
  const scanDir = async (dir) => {
    if (!(await exists(dir))) return [];
    const entries = await readDir(dir);
    return entries
      .filter((e) => e.isFile() && e.name.endsWith(".webp"))
      .map((e) => path.join(dir, e.name));
  };

  const files = [
    ...(await scanDir(OUT_IMG_DIR)),
    ...(await scanDir(OUT_THUMB_DIR)),
  ];
  for (const file of files) {
    if (!keepNames.has(path.basename(file))) {
      await fs.rm(file, { force: true });
      stats.removed += 1;
    }
  }
};

const main = async () => {
  await fs.mkdir(OUT_THUMB_DIR, { recursive: true });

  if (!(await exists(SRC_DIR))) {
    console.warn(
      `[gallery] source dir "${rel(SRC_DIR)}" not found — writing empty gallery.`,
    );
    await fs.mkdir(path.dirname(OUT_JSON), { recursive: true });
    await fs.writeFile(
      OUT_JSON,
      JSON.stringify(
        { generatedAt: new Date().toISOString(), categories: [] },
        null,
        2,
      ) + "\n",
    );
    return;
  }

  const manifest = await readManifest();
  const nextManifest = {};
  const allImages = [];

  const catEntries = (await readDir(SRC_DIR))
    .filter((e) => e.isDirectory() && !e.name.startsWith("."))
    .map((e) => e.name)
    .sort((a, b) => a.localeCompare(b, undefined, { numeric: true }));

  const usedCatSlugs = new Set();
  const categories = [];

  for (const catName of catEntries) {
    const catDir = path.join(SRC_DIR, catName);
    const catSlug = uniqueSlug(kebab(catName), usedCatSlugs);
    const catTitle = titleCase(catName);

    const entries = await readDir(catDir);

    // direct images on the category (e.g. residential/1.jpg)
    const directFiles = entries
      .filter((e) => e.isFile() && isImage(e.name))
      .map((e) => e.name)
      .sort((a, b) =>
        a.localeCompare(b, undefined, { numeric: true, sensitivity: "base" }),
      );

    const projectNames = entries
      .filter((e) => e.isDirectory() && !e.name.startsWith("."))
      .map((e) => e.name)
      .sort((a, b) =>
        a.localeCompare(b, undefined, { numeric: true, sensitivity: "base" }),
      );

    const usedProjSlugs = new Set();
    const projects = [];
    for (const projName of projectNames) {
      const projDir = path.join(catDir, projName);
      const projSlug = uniqueSlug(kebab(projName), usedProjSlugs);
      const projTitle = titleCase(projName);
      const images = await buildImageList(
        projDir,
        `${catTitle} — ${projTitle}`,
        manifest,
        nextManifest,
      );
      allImages.push(...images);
      projects.push({ slug: projSlug, title: projTitle, images });
    }

    const images = await buildImageList(
      catDir,
      catTitle,
      manifest,
      nextManifest,
    );
    allImages.push(...images);

    categories.push({ slug: catSlug, title: catTitle, projects, images });
  }

  // Remove webps whose source no longer exists.
  const keepNames = new Set(allImages.map((i) => path.basename(i.full)));
  await cleanupOrphans(keepNames);

  const data = { generatedAt: new Date().toISOString(), categories };
  await fs.mkdir(path.dirname(OUT_JSON), { recursive: true });
  await fs.writeFile(OUT_JSON, JSON.stringify(data, null, 2) + "\n");
  await fs.writeFile(MANIFEST, JSON.stringify(nextManifest, null, 2) + "\n");

  const totalImages = categories.reduce(
    (n, c) =>
      n + c.images.length + c.projects.reduce((m, p) => m + p.images.length, 0),
    0,
  );
  console.log(
    `[gallery] processed ${stats.processed}, skipped ${stats.skipped}, removed ${stats.removed} → ` +
      `wrote ${rel(OUT_JSON)} (${categories.length} categories, ${totalImages} images)`,
  );
};

main().catch((err) => {
  console.error("[gallery] failed:", err);
  process.exit(1);
});
