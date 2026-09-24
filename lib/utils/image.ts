export function getDriveImageUrl(url: string): string {
  if (!url) {
    return "";
  }

  const match = url.match(/id=([^&]+)/);

  if (!match) {
    return url;
  }

  const fileId = match[1];

  return `https://drive.google.com/thumbnail?id=${fileId}&sz=w1000`;
}