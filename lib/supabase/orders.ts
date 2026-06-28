import { prisma } from "@/lib/prisma";

export async function getUserOrders(userId: string) {
  return prisma.order.findMany({
    where: { user_id: userId },
    include: { items: { include: { product: true } } },
    orderBy: { created_at: "desc" },
  });
}

export async function getOrderById(orderId: string) {
  return prisma.order.findUnique({
    where: { id: orderId },
    include: { items: { include: { product: true, variant: true } } },
  });
}

export async function getOrderByNumber(orderNumber: string, email: string) {
  return prisma.order.findFirst({
    where: { order_number: orderNumber, email },
    include: { items: { include: { product: true } } },
  });
}
