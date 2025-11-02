const crypto = require("crypto");
const fs = require("fs");
const path = require("path");
const matter = require("gray-matter");
const slugify = require("@sindresorhus/slugify");

const NOTES_DIR = path.join(process.cwd(), "src", "site", "notes");

const registryByKey = new Map();

function createHashId(relativePath) {
  return crypto.createHash("sha256").update(relativePath).digest("hex").slice(0, 10);
}

function normalizeRelativePath(relativePath) {
  return relativePath.replace(/^\/+/, "").replace(/\.md$/i, "");
}

function getRelativePathFromData(data) {
  if (!data?.page?.filePathStem) {
    return null;
  }
  return normalizeRelativePath(data.page.filePathStem.replace(/^\/?notes\//, ""));
}

function isGardenEntry(data) {
  if (!data) {
    return false;
  }
  if (data["dg-home"] === true) {
    return true;
  }
  const tags = data.tags || [];
  return Array.isArray(tags) && tags.indexOf("gardenEntry") !== -1;
}

function buildMeta({ relativePath, data = {} }) {
  const id = createHashId(relativePath);
  const isHome = isGardenEntry(data);
  const permalink = isHome ? "/" : `/${id}/`;
  const noteIcon = data.noteIcon || process.env.NOTE_ICON_DEFAULT;
  const title = data.title || relativePath.split("/").pop();
  const meta = {
    id,
    articleId: id,
    permalink,
    noteIcon,
    title,
    relativePath,
    isHome,
  };
  return meta;
}

function storeMeta(meta) {
  const { relativePath } = meta;
  const baseName = relativePath.split("/").pop();
  const variants = new Set([
    relativePath,
    relativePath.toLowerCase(),
    `${relativePath}.md`,
    `${relativePath}.md`.toLowerCase(),
    baseName,
    baseName.toLowerCase(),
    `${baseName}.md`,
    `${baseName}.md`.toLowerCase(),
    slugify(relativePath),
    slugify(relativePath.split("/").pop()),
    meta.id,
  ]);
  variants.forEach((key) => {
    registryByKey.set(key, meta);
  });
  return meta;
}

function registerFromData(data) {
  const relativePath = getRelativePathFromData(data);
  if (!relativePath) {
    return null;
  }
  const cached = registryByKey.get(relativePath) || registryByKey.get(relativePath.toLowerCase());
  if (cached) {
    return cached;
  }
  const meta = buildMeta({ relativePath, data });
  return storeMeta(meta);
}

function readFrontMatter(relativePathWithExt) {
  const fullPath = path.join(NOTES_DIR, relativePathWithExt);
  const file = fs.readFileSync(fullPath, "utf8");
  return matter(file).data || {};
}

function registerFromDisk(linkPath) {
  const normalized = normalizeRelativePath(linkPath);
  if (!normalized) {
    return null;
  }
  const keyWithExt = `${normalized}.md`;
  try {
    const data = readFrontMatter(keyWithExt);
    const meta = buildMeta({ relativePath: normalized, data });
    return storeMeta(meta);
  } catch (error) {
    return null;
  }
}

function resolveByLink(fileLink) {
  if (!fileLink) {
    return null;
  }
  const cleaned = fileLink.replace(/^\/+/, "");
  const slug = slugify(cleaned);
  const base = cleaned.split("/").pop();
  const slugBase = slugify(base);
  const keysToTry = [
    cleaned,
    cleaned.toLowerCase(),
    cleaned.endsWith(".md") ? cleaned : `${cleaned}.md`,
    slug,
    slugBase,
  ];
  for (const key of keysToTry) {
    if (registryByKey.has(key)) {
      return registryByKey.get(key);
    }
  }
  return registerFromDisk(cleaned);
}

function getMetaByArticleId(articleId) {
  return registryByKey.get(articleId) || null;
}

module.exports = {
  registerFromData,
  resolveByLink,
  getMetaByArticleId,
  createHashId,
};
