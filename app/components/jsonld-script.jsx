import { serializeJsonLd } from "../../lib/seo-jsonld";

export default function JsonLdScript({ id, data }) {
  if (!data) {
    return null;
  }

  return (
    <script
      id={id}
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: serializeJsonLd(data) }}
    />
  );
}
