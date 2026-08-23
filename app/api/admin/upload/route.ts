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

  // On Vercel, OIDC auth is available automatically — passing storeId is
  // enough, and it's what actually gets used there (the SDK ignores
  // `token` whenever OIDC + storeId are both present). Locally there's no
  // OIDC token, so the SDK falls back to `token` instead. Passing both
  // covers prod and local dev with the same code path.
  const storeId = process.env.BLOB_READ_WRITE_TOKEN_STORE_ID;
  const token = process.env.BLOB_READ_WRITE_TOKEN_READ_WRITE_TOKEN;
  if (!storeId && !token) {
    return NextResponse.json({ error: "Blob storage is not configured" }, { status: 500 });
  }

  try {
    const blob = await put(filename, file, {
      access: "public",
      addRandomSuffix: false,
      contentType: file.type,
      storeId,
      token,
    });
    return NextResponse.json({ url: blob.url });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown storage error";
    return NextResponse.json({ error: `Blob storage error: ${message}` }, { status: 502 });
  }
}
