import { Product, ProductVariant, Category, Order, OrderItem, User, Review, BlogPost } from "@prisma/client";

// ==================
// Product Types
// ==================

export type ProductWithVariants = Product & {
  variants: ProductVariant[];
  category: Category;
};

export type ProductWithDetails = Product & {
  variants: ProductVariant[];
  category: Category;
  reviews: ReviewWithUser[];
};

export type ReviewWithUser = Review & {
  user: { name: string | null };
};

// ==================
// Order Types
// ==================

export type OrderWithItems = Order & {
  items: (OrderItem & {
    product: Product;
    variant?: ProductVariant | null;
  })[];
};

// ==================
// Cart Types
// ==================

export interface CartItemType {
  id: string;
  productId: string;
  variantId?: string;
  name: string;
  slug: string;
  image: string;
  price: number;
  comparePrice?: number;
  size?: string;
  color?: string;
  colorHex?: string;
  quantity: number;
  maxStock: number;
}

// ==================
// API Response Types
// ==================

export interface ApiResponse<T = any> {
  data?: T;
  error?: string;
  message?: string;
}

export interface PaginatedResponse<T> {
  items: T[];
  total: number;
  page: number;
  pages: number;
}

// ==================
// Checkout Types
// ==================

export interface ShippingAddress {
  name: string;
  phone: string;
  line1: string;
  line2?: string;
  city: string;
  state: string;
  pincode: string;
  country: string;
}

export interface CheckoutSession {
  items: CartItemType[];
  shippingAddress: ShippingAddress;
  email: string;
  couponCode?: string;
  paymentMethod: "stripe" | "razorpay" | "cod";
}

// ==================
// NextAuth extension
// ==================

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      name?: string | null;
      email?: string | null;
      image?: string | null;
      role: string;
    };
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    role: string;
  }
}
