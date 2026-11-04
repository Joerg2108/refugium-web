import { faqItems } from "@/components/faq";
import { CONTACT_EMAIL, SITE_URL } from "@/lib/site";

const data = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": `${SITE_URL}/#organisation`,
      name: "Refugium",
      url: SITE_URL,
      logo: `${SITE_URL}/icon.png`,
      email: CONTACT_EMAIL,
      description: "Geplante Schutzraum-Genossenschaft bei Leipzig. Refugium eG ist ein Arbeitstitel.",
    },
    {
      "@type": "WebSite",
      "@id": `${SITE_URL}/#website`,
      url: SITE_URL,
      name: "Refugium",
      inLanguage: "de-DE",
      publisher: { "@id": `${SITE_URL}/#organisation` },
    },
    {
      "@type": "FAQPage",
      url: SITE_URL,
      mainEntity: faqItems.map((item) => ({
        "@type": "Question",
        name: item.q,
        acceptedAnswer: { "@type": "Answer", text: item.a },
      })),
    },
    {
      "@type": "VideoObject",
      name: "Rundgang durch die geplante Anlage",
      description: "Visualisierter, KI-generierter Rundgang durch Schleuse, Gemeinschaftszone, Einheit und Vorrat.",
      thumbnailUrl: `${SITE_URL}/video/rundgang-poster.jpg`,
      contentUrl: `${SITE_URL}/video/rundgang.mp4`,
      uploadDate: "2026-11-04",
      duration: "PT30S",
    },
  ],
};

export function JsonLd() {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }}
    />
  );
}
