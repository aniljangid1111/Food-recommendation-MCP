export function getDriveImageUrl(url: string): string {
  const input = url.trim().replace(/^["']|["']$/g, "");

  if (!input) {
    return "";
  }

  try {
    const parsedUrl = new URL(input);

    if (
      parsedUrl.hostname === "drive.google.com" ||
      parsedUrl.hostname === "docs.google.com"
    ) {
      const fileIdFromQuery = parsedUrl.searchParams.get("id");
      const fileIdFromPath =
        parsedUrl.pathname.match(/\/file\/d\/([^/]+)/)?.[1] ||
        parsedUrl.pathname.match(/\/d\/([^/]+)/)?.[1];

      const fileId = fileIdFromQuery || fileIdFromPath;

      if (fileId) {
        return `https://drive.google.com/thumbnail?id=${encodeURIComponent(fileId)}&sz=w1000`;
      }
    }
  } catch {
    return input;
  }

  return input;
}