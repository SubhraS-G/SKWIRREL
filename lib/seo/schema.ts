export function generateProductSchema(product: any) {
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.description,
    image: product.images,
    sku: product.sku,
    brand: {
      "@type": "Brand",
      name: "SKWIRREL",
    },
    offers: {
      "@type": "Offer",
      url: `https://skwirrel.in/shop/${product.slug}`,
      priceCurrency: "INR",
      price: Number(product.price),
      availability:
        product.variants?.some((v: any) => v.stock > 0)
          ? "https://schema.org/InStock"
          : "https://schema.org/OutOfStock",
    },
    aggregateRating:
      product.reviews?.length > 0
        ? {
            "@type": "AggregateRating",
            ratingValue: (
              product.reviews.reduce((s: number, r: any) => s + r.rating, 0) /
              product.reviews.length
            ).toFixed(1),
            reviewCount: product.reviews.length,
          }
        : undefined,
  };
}

export function generateOrganizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "SKWIRREL",
    url: "https://skwirrel.in",
    logo: "https://skwirrel.in/icons/logo.png",
    description: "Premium cultural streetwear brand from Odisha, India.",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Bhubaneswar",
      addressRegion: "Odisha",
      postalCode: "751001",
      addressCountry: "IN",
    },
    contactPoint: {
      "@type": "ContactPoint",
      email: "hello@skwirrel.in",
      contactType: "Customer Service",
    },
    sameAs: [
      "https://instagram.com/skwirrelindia",
      "https://facebook.com/skwirrelindia",
    ],
  };
}
