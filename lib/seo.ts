import type { Metadata } from "next";

export function pageMetadata({
  title,
  description,
  path,
}: {
  title: string;
  description: string;
  path: string;
}): Metadata {
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      title,
      description,
      url: path,
      siteName: "Refugium",
      locale: "de_DE",
      type: "website",
      images: [{ url: "/images/og.jpg", width: 1200, height: 630, alt: "Refugium: Gemeinsam vorgesorgt." }],
    },
    twitter: { card: "summary_large_image", title, description, images: ["/images/og.jpg"] },
  };
}
