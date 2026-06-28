import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Seeding SKWIRREL database...");

  // Categories
  const categories = await Promise.all([
    prisma.category.upsert({
      where: { slug: "t-shirts" },
      update: {},
      create: { name: "T-Shirts", slug: "t-shirts", sort_order: 1 },
    }),
    prisma.category.upsert({
      where: { slug: "hoodies" },
      update: {},
      create: { name: "Hoodies", slug: "hoodies", sort_order: 2 },
    }),
    prisma.category.upsert({
      where: { slug: "oversized" },
      update: {},
      create: { name: "Oversized Fits", slug: "oversized", sort_order: 3 },
    }),
    prisma.category.upsert({
      where: { slug: "cultural" },
      update: {},
      create: { name: "Cultural Editions", slug: "cultural", sort_order: 4 },
    }),
    prisma.category.upsert({
      where: { slug: "sustainable" },
      update: {},
      create: { name: "Sustainable Collection", slug: "sustainable", sort_order: 5 },
    }),
    prisma.category.upsert({
      where: { slug: "accessories" },
      update: {},
      create: { name: "Accessories", slug: "accessories", sort_order: 6 },
    }),
  ]);

  // Sample products
  const tshirtCategory = categories[0];
  const hoodieCategory = categories[1];
  const culturalCategory = categories[3];

  await prisma.product.upsert({
    where: { slug: "temple-gate-tee" },
    update: {},
    create: {
      name: "Temple Gate Tee",
      slug: "temple-gate-tee",
      description: "Inspired by the intricate carvings of Odisha's ancient temples. The Temple Gate Tee features a minimalist graphic derived from Konark's wheel motifs, screen-printed on 100% premium cotton.",
      short_description: "Konark-inspired minimal graphic tee",
      price: 999,
      compare_price: 1299,
      sku: "SKW-TGT-001",
      images: ["/images/products/temple-gate-tee-1.jpg", "/images/products/temple-gate-tee-2.jpg"],
      category_id: culturalCategory.id,
      collection: "Cultural Edition",
      tags: ["bestseller", "new", "cultural"],
      material: "100% Organic Cotton, 180 GSM",
      care_instructions: "Machine wash cold, tumble dry low, do not bleach",
      sustainability_info: "Made from GOTS-certified organic cotton. Printed with water-based inks.",
      is_featured: true,
      variants: {
        create: [
          { size: "XS", color: "Black", color_hex: "#0A0A0A", sku: "SKW-TGT-001-XS-BLK", stock: 15 },
          { size: "S", color: "Black", color_hex: "#0A0A0A", sku: "SKW-TGT-001-S-BLK", stock: 25 },
          { size: "M", color: "Black", color_hex: "#0A0A0A", sku: "SKW-TGT-001-M-BLK", stock: 30 },
          { size: "L", color: "Black", color_hex: "#0A0A0A", sku: "SKW-TGT-001-L-BLK", stock: 20 },
          { size: "XL", color: "Black", color_hex: "#0A0A0A", sku: "SKW-TGT-001-XL-BLK", stock: 10 },
          { size: "S", color: "Ivory", color_hex: "#F8F6F2", sku: "SKW-TGT-001-S-IVY", stock: 20 },
          { size: "M", color: "Ivory", color_hex: "#F8F6F2", sku: "SKW-TGT-001-M-IVY", stock: 25 },
          { size: "L", color: "Ivory", color_hex: "#F8F6F2", sku: "SKW-TGT-001-L-IVY", stock: 15 },
        ],
      },
    },
  });

  await prisma.product.upsert({
    where: { slug: "wheel-of-time-hoodie" },
    update: {},
    create: {
      name: "Wheel of Time Hoodie",
      slug: "wheel-of-time-hoodie",
      description: "The iconic Konark Wheel — a symbol of time, movement, and cosmic order — reimagined as an oversized graphic on our premium fleece hoodie. Heavyweight, warm, and unmistakably Odishan.",
      short_description: "Konark wheel heavyweight hoodie",
      price: 2499,
      sku: "SKW-WTH-001",
      images: ["/images/products/wheel-hoodie-1.jpg"],
      category_id: hoodieCategory.id,
      collection: "Heritage",
      tags: ["new", "hoodie", "cultural"],
      material: "80% Cotton, 20% Polyester, 350 GSM fleece",
      care_instructions: "Machine wash cold, hang dry",
      is_featured: true,
      variants: {
        create: [
          { size: "S", color: "Charcoal", color_hex: "#2a2a2a", sku: "SKW-WTH-001-S-CHR", stock: 12 },
          { size: "M", color: "Charcoal", color_hex: "#2a2a2a", sku: "SKW-WTH-001-M-CHR", stock: 18 },
          { size: "L", color: "Charcoal", color_hex: "#2a2a2a", sku: "SKW-WTH-001-L-CHR", stock: 15 },
          { size: "XL", color: "Charcoal", color_hex: "#2a2a2a", sku: "SKW-WTH-001-XL-CHR", stock: 8 },
        ],
      },
    },
  });

  // Sample coupon
  await prisma.coupon.upsert({
    where: { code: "ODISHA10" },
    update: {},
    create: {
      code: "ODISHA10",
      type: "percentage",
      value: 10,
      min_order: 999,
      is_active: true,
    },
  });

  // Sample blog post
  await prisma.blogPost.upsert({
    where: { slug: "the-story-of-sambalpuri-weave" },
    update: {},
    create: {
      title: "The Story of Sambalpuri Weave",
      slug: "the-story-of-sambalpuri-weave",
      excerpt: "How ancient ikat weaving traditions from western Odisha found their way into modern streetwear.",
      content: "<p>The Sambalpuri weave is one of Odisha's most treasured textile traditions...</p>",
      cover_image: "/images/blog/sambalpuri-story.jpg",
      author_name: "SKWIRREL Team",
      tags: ["culture", "textiles", "odisha", "heritage"],
      category: "Culture",
      is_published: true,
      published_at: new Date(),
    },
  });

  console.log("✅ Seeding complete!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
