export function normalizeUploadUrl(url?: string | null): string {
  if (!url) return "";

  try {
    const parsed = new URL(url);

    if (parsed.pathname.startsWith("/uploads/")) {
      return parsed.pathname;
    }

    return url;
  } catch {
    if (url.startsWith("/uploads/")) {
      return url;
    }

    return url;
  }
}