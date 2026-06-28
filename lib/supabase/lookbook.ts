import { prisma } from "@/lib/prisma";

export async function getLookbookImages(category?: string) {
  return prisma.lookbookImage.findMany({
    where: {
      is_active: true,
      ...(category ? { category } : {}),
    },
    orderBy: { sort_order: "asc" },
  });
}
