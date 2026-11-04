import type { MetadataRoute } from "next";

import { SITE_INDEXABLE, SITE_URL } from "@/lib/site";

// Crawling bleibt erlaubt, sonst könnten Suchmaschinen das noindex nicht lesen.
export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/" },
    ...(SITE_INDEXABLE ? { sitemap: `${SITE_URL}/sitemap.xml` } : {}),
  };
}
