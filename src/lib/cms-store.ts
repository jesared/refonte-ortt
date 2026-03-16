import { randomUUID } from "crypto";
import { mkdir, readFile, rm, writeFile } from "fs/promises";
import path from "path";

export type CmsPage = {
  id: string;
  title: string;
  slug: string;
  content: string;
  updatedAt: string;
};

export type CmsNews = {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  image: string;
  published: boolean;
  createdAt: string;
};

export type CmsMedia = {
  id: string;
  url: string;
  name: string;
  createdAt: string;
};

type DbShape = {
  pages: CmsPage[];
  news: CmsNews[];
  media: CmsMedia[];
};

function resolveDbPath(): string {
  const configuredPath = process.env.CMS_DB_PATH;
  if (configuredPath) return configuredPath;

  if (process.env.VERCEL === "1" || process.env.NODE_ENV === "production") {
    return path.join("/tmp", "data", "cms.json");
  }

  return path.join(process.cwd(), "data", "cms.json");
}

const DB_PATH = resolveDbPath();

const INITIAL_DATA: DbShape = {
  pages: [],
  news: [],
  media: [],
};

async function readDb(): Promise<DbShape> {
  try {
    const raw = await readFile(DB_PATH, "utf8");
    const parsed = JSON.parse(raw) as DbShape;
    return {
      pages: parsed.pages ?? [],
      news: parsed.news ?? [],
      media: parsed.media ?? [],
    };
  } catch {
    await mkdir(path.dirname(DB_PATH), { recursive: true });
    await writeFile(DB_PATH, JSON.stringify(INITIAL_DATA, null, 2));
    return INITIAL_DATA;
  }
}

async function writeDb(data: DbShape): Promise<void> {
  await mkdir(path.dirname(DB_PATH), { recursive: true });
  await writeFile(DB_PATH, JSON.stringify(data, null, 2));
}

export async function listPages(): Promise<CmsPage[]> {
  const data = await readDb();
  return data.pages.sort((a, b) => +new Date(b.updatedAt) - +new Date(a.updatedAt));
}

export async function getPage(id: string): Promise<CmsPage | null> {
  const data = await readDb();
  return data.pages.find((page) => page.id === id) ?? null;
}

export async function createPage(input: Pick<CmsPage, "title" | "slug" | "content">): Promise<CmsPage> {
  const data = await readDb();
  const now = new Date().toISOString();

  const page: CmsPage = {
    id: randomUUID(),
    updatedAt: now,
    ...input,
  };

  data.pages.push(page);
  await writeDb(data);
  return page;
}

export async function updatePage(id: string, input: Pick<CmsPage, "title" | "slug" | "content">): Promise<void> {
  const data = await readDb();
  const pageIndex = data.pages.findIndex((page) => page.id === id);
  if (pageIndex < 0) return;

  data.pages[pageIndex] = {
    ...data.pages[pageIndex],
    ...input,
    updatedAt: new Date().toISOString(),
  };

  await writeDb(data);
}

export async function deletePage(id: string): Promise<void> {
  const data = await readDb();
  data.pages = data.pages.filter((page) => page.id !== id);
  await writeDb(data);
}

export async function listNews(): Promise<CmsNews[]> {
  const data = await readDb();
  return data.news.sort((a, b) => +new Date(b.createdAt) - +new Date(a.createdAt));
}

export async function getNews(id: string): Promise<CmsNews | null> {
  const data = await readDb();
  return data.news.find((item) => item.id === id) ?? null;
}

export async function createNews(input: Pick<CmsNews, "title" | "slug" | "excerpt" | "content" | "image" | "published">): Promise<CmsNews> {
  const data = await readDb();
  const news: CmsNews = {
    id: randomUUID(),
    createdAt: new Date().toISOString(),
    ...input,
  };

  data.news.push(news);
  await writeDb(data);
  return news;
}

export async function updateNews(
  id: string,
  input: Pick<CmsNews, "title" | "slug" | "excerpt" | "content" | "image" | "published">,
): Promise<void> {
  const data = await readDb();
  const newsIndex = data.news.findIndex((item) => item.id === id);
  if (newsIndex < 0) return;

  data.news[newsIndex] = {
    ...data.news[newsIndex],
    ...input,
  };

  await writeDb(data);
}

export async function deleteNews(id: string): Promise<void> {
  const data = await readDb();
  data.news = data.news.filter((item) => item.id !== id);
  await writeDb(data);
}

export async function listMedia(): Promise<CmsMedia[]> {
  const data = await readDb();
  return data.media.sort((a, b) => +new Date(b.createdAt) - +new Date(a.createdAt));
}

export async function addMedia(input: Pick<CmsMedia, "url" | "name">): Promise<CmsMedia> {
  const data = await readDb();
  const media: CmsMedia = {
    id: randomUUID(),
    createdAt: new Date().toISOString(),
    ...input,
  };

  data.media.push(media);
  await writeDb(data);
  return media;
}

export async function deleteMedia(id: string): Promise<void> {
  const data = await readDb();
  const mediaItem = data.media.find((item) => item.id === id);

  data.media = data.media.filter((item) => item.id !== id);
  await writeDb(data);

  if (mediaItem) {
    const localPath = path.join(process.cwd(), "public", mediaItem.url.replace(/^\//, ""));
    await rm(localPath, { force: true });
  }
}
