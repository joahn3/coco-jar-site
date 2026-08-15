export default function robots() {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
      },
      {
        userAgent: "*",
        disallow: "/api/",
      },
    ],
    sitemap: "https://coco-jar-site.vercel.app/sitemap.xml",
  };
}
