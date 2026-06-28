import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/admin", "/account", "/api", "/checkout", "/cart"],
      },
    ],
    sitemap: "https://skwirrel.in/sitemap.xml",
  };
}
