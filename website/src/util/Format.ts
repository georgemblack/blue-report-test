import { formatInTimeZone } from "date-fns-tz";

export function formatHost(url: string): string {
  let host;

  try {
    host = new URL(url).host;
  } catch (e) {
    return "";
  }
  if (host.startsWith("www.")) host = host.substring(4);
  return host;
}

export function formatCount(count: number): string {
  // If the number is under 1000, no changes
  if (count < 1000) return count.toString();

  // If the number is between 1000 and 10000, format as thousands with one decimal place.
  // Examples:
  //  - 1,000 -> 1k
  //	- 1,500 -> 1.5k
  //	- 9,999 -> 9.9k
  if (count < 10000) return (Math.floor(count / 100) / 10).toFixed(1) + "k";

  // If the number is greater than 10000, format as thousands with no decimal places.
  // Examples:
  //  - 10,000 -> 10k
  //	- 15,000 -> 15k
  //	- 99,999 -> 99k
  if (count < 1000000) return Math.floor(count / 1000) + "k";

  // If the number is greater than 1,000,000, format as millions with one decimal place.
  // Examples:
  //  - 1,000,000 -> 1M
  //	- 1,500,000 -> 1.5M
  //	- 9,999,999 -> 9.9M
  return (Math.floor(count / 100000) / 10).toFixed(1) + "M";
}

// Convert a date '2025-02-09T04:13:31Z' to 'Feb 8, 2025 at 11:03pm (EST)'
export function formatDate(iso: string): string {
  return formatInTimeZone(
    iso,
    "America/New_York",
    "MMM d, yyyy 'at' h:mma (zzz)"
  );
}

// Convert an AT URI & user handle to a URL
export function urlFromPost(atUri: string, handle: string): string {
  // Parse rkey from AT URI
  // 'at://did:plc:y5xyloyy7s4a2bwfeimj7r3b/app.bsky.feed.post/3lhrms2lbc22c' -> '3lhrms2lbc22c'
  const rkey = atUri.split("/").pop();

  // Construct URL
  return `https://bsky.app/profile/${handle}/post/${rkey}`;
}

// Remove any non-alphanumeric characters from a string
export function strip(s: string): string {
  return s.replace(/[^a-z0-9]/gi, "");
}
