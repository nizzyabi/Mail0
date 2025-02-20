import { BASE_URL } from "./constants";

export function isActive(
  url: string,
  pathname: string,
  searchParams?: URLSearchParams,
  nested = true,
  baseUrl: string = "http://localhost",
): boolean {
  const urlObj = new URL(url, baseUrl ?? BASE_URL);

  // Remove trailing slashes for clean comparison
  const cleanPath = pathname.replace(/\/$/, "");
  const cleanUrl = urlObj.pathname.replace(/\/$/, "");

  // Check if paths match exactly or allow nested paths
  if (cleanPath !== cleanUrl && !(nested && cleanPath.startsWith(`${cleanUrl}/`))) {
    return false;
  }

  // If no searchParams provided, return true as path is already verified
  if (!searchParams) return true;

  // Extract query parameters from URL
  const urlParams = urlObj.searchParams;
  const currentParams = new URLSearchParams(searchParams);

  // Ensure all query parameters in `url` exist in `searchParams`
  for (const [key, value] of urlParams.entries()) {
    if (currentParams.get(key) !== value) return false;
  }

  return true;
}
