"use server";

import { mkdir, writeFile } from "fs/promises";
import path from "path";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import {
  addMedia,
  createNews,
  createPage,
  deleteMedia,
  deleteNews,
  deletePage,
  updateNews,
  updatePage,
} from "@/lib/cms-store";

function getString(formData: FormData, key: string): string {
  return String(formData.get(key) ?? "").trim();
}

function getBool(formData: FormData, key: string): boolean {
  return formData.get(key) === "on";
}

export async function createPageAction(formData: FormData) {
  await createPage({
    title: getString(formData, "title"),
    slug: getString(formData, "slug"),
    content: getString(formData, "content"),
  });

  revalidatePath("/admin/pages");
}

export async function updatePageAction(formData: FormData) {
  const id = getString(formData, "id");
  await updatePage(id, {
    title: getString(formData, "title"),
    slug: getString(formData, "slug"),
    content: getString(formData, "content"),
  });

  revalidatePath("/admin/pages");
  revalidatePath(`/admin/pages/${id}`);
}

export async function deletePageAction(formData: FormData) {
  const id = getString(formData, "id");
  await deletePage(id);

  revalidatePath("/admin/pages");
}

export async function createNewsAction(formData: FormData) {
  await createNews({
    title: getString(formData, "title"),
    slug: getString(formData, "slug"),
    excerpt: getString(formData, "excerpt"),
    content: getString(formData, "content"),
    image: getString(formData, "image"),
    published: getBool(formData, "published"),
  });

  revalidatePath("/admin/news");
}

export async function updateNewsAction(formData: FormData) {
  const id = getString(formData, "id");
  await updateNews(id, {
    title: getString(formData, "title"),
    slug: getString(formData, "slug"),
    excerpt: getString(formData, "excerpt"),
    content: getString(formData, "content"),
    image: getString(formData, "image"),
    published: getBool(formData, "published"),
  });

  revalidatePath("/admin/news");
  revalidatePath(`/admin/news/${id}`);
}

export async function deleteNewsAction(formData: FormData) {
  const id = getString(formData, "id");
  await deleteNews(id);

  revalidatePath("/admin/news");
}

export async function uploadMediaAction(formData: FormData) {
  const image = formData.get("image");
  if (!(image instanceof File) || image.size === 0) {
    return;
  }

  const ext = image.name.split(".").pop() || "jpg";
  const fileName = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}.${ext}`;

  const uploadDir = path.join(process.cwd(), "public", "uploads");
  await mkdir(uploadDir, { recursive: true });

  const bytes = await image.arrayBuffer();
  await writeFile(path.join(uploadDir, fileName), Buffer.from(bytes));

  await addMedia({
    name: image.name,
    url: `/uploads/${fileName}`,
  });

  revalidatePath("/admin/media");
  redirect("/admin/media");
}

export async function deleteMediaAction(formData: FormData) {
  const id = getString(formData, "id");
  await deleteMedia(id);

  revalidatePath("/admin/media");
}
