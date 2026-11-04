import type { MetadataRoute } from "next";

import { SITE_URL } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  return [
    { url: SITE_URL, lastModified, priority: 1 },
    { url: `${SITE_URL}/impressum`, lastModified, priority: 0.2 },
    { url: `${SITE_URL}/datenschutz`, lastModified, priority: 0.2 },
  ];
}
