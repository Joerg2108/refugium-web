export const CONTACT_EMAIL = "atelier@fischer-art.de";

export const INTEREST_HREF = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(
  "Interessenliste Refugium",
)}`;

export const CONTACT = {
  name: "Michael Fischer-Art",
  company: "KUNSTFABRIK",
  street: "Am Steigerhain 13",
  city: "04552 Borna",
  phone: "+49 172 342 66 84",
  phoneHref: "tel:+491723426684",
};

export const SITE_URL = "https://refugium-web.netlify.app";

/** Erst auf true setzen, wenn Gutachten, Rechtsprüfung und Vermessung vorliegen. */
export const SITE_INDEXABLE = false;
