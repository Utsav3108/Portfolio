import { randomUUID } from "crypto";
import { put } from "@vercel/blob";
import { NextRequest, NextResponse } from "next/server";

const MAX_BYTES = 5 * 1024 * 1024;
const ALLOWED_TYPES: Record<string, string> = {
  "image/png": "png",
  "image/jpeg": "jpg",
  "image/webp": "webp",
};

export async function POST(request: NextRequest) {
  const form = await request.formData().catch(() => null);
  const file = form?.get("file");

  if (!file || !(file instanceof File)) {
    return NextResponse.json({ error: "No file provided" }, { status: 400 });
  }

  const extension = ALLOWED_TYPES[file.type];
  if (!extension) {
    return NextResponse.json({ error: "Unsupported file type" }, { status: 400 });
  }

  if (file.size > MAX_BYTES) {
    return NextResponse.json({ error: "File too large (max 5MB)" }, { status: 400 });
  }

  const filename = `uploads/${randomUUID()}.${extension}`;
  const blob = await put(filename, file, {
    access: "public",
    addRandomSuffix: false,
    contentType: file.type,
  });

  return NextResponse.json({ url: blob.url });
}
