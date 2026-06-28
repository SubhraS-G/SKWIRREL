import { z } from "zod";

// ==================
// AUTH
// ==================

export const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export const signupSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(8, "Password must be at least 8 characters")
    .regex(/[A-Z]/, "Must contain at least one uppercase letter")
    .regex(/[0-9]/, "Must contain at least one number"),
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords do not match",
  path: ["confirmPassword"],
});

// ==================
// CHECKOUT
// ==================

export const addressSchema = z.object({
  name: z.string().min(2, "Name is required"),
  phone: z.string().regex(/^[6-9]\d{9}$/, "Invalid Indian mobile number"),
  line1: z.string().min(5, "Address is required"),
  line2: z.string().optional(),
  city: z.string().min(2, "City is required"),
  state: z.string().min(2, "State is required"),
  pincode: z.string().regex(/^\d{6}$/, "Invalid PIN code"),
  country: z.string().default("India"),
});

export const checkoutSchema = z.object({
  items: z.array(z.object({
    productId: z.string(),
    variantId: z.string().optional(),
    name: z.string(),
    image: z.string(),
    price: z.number(),
    quantity: z.number().int().positive(),
  })),
  shippingAddress: addressSchema,
  email: z.string().email(),
  userId: z.string().optional(),
  couponCode: z.string().optional(),
  total: z.number().positive(),
  paymentMethod: z.enum(["stripe", "razorpay", "cod"]),
});

// ==================
// PRODUCTS
// ==================

export const productQuerySchema = z.object({
  category: z.string().optional(),
  sort: z.enum(["newest", "price-asc", "price-desc", "popular"]).default("newest"),
  page: z.number().int().positive().default(1),
  limit: z.number().int().min(1).max(48).default(12),
  q: z.string().optional(),
  minPrice: z.number().optional(),
  maxPrice: z.number().optional(),
  color: z.string().optional(),
  size: z.string().optional(),
});

// ==================
// ORDERS
// ==================

export const createOrderSchema = z.object({
  userId: z.string().optional(),
  email: z.string().email(),
  items: z.array(z.object({
    productId: z.string(),
    variantId: z.string().optional(),
    quantity: z.number().int().positive(),
    price: z.number().positive(),
  })),
  shippingAddress: addressSchema,
  total: z.number().positive(),
  couponCode: z.string().optional(),
});

// ==================
// REVIEWS
// ==================

export const reviewSchema = z.object({
  product_id: z.string(),
  rating: z.number().int().min(1).max(5),
  title: z.string().max(100).optional(),
  body: z.string().min(10, "Review must be at least 10 characters").max(1000),
  images: z.array(z.string()).max(3).optional(),
});

// ==================
// NEWSLETTER
// ==================

export const newsletterSchema = z.object({
  email: z.string().email("Please enter a valid email"),
});

// ==================
// CONTACT
// ==================

export const contactSchema = z.object({
  name: z.string().min(2, "Name is required"),
  email: z.string().email("Invalid email"),
  subject: z.string().min(3).optional(),
  message: z.string().min(10, "Message must be at least 10 characters").max(2000),
});

// ==================
// COUPON
// ==================

export const couponSchema = z.object({
  code: z.string().min(3).max(20).toUpperCase(),
});

// ==================
// PRODUCT ADMIN
// ==================

export const createProductSchema = z.object({
  name: z.string().min(2),
  slug: z.string().min(2),
  description: z.string().min(10),
  price: z.number().positive(),
  compare_price: z.number().positive().optional(),
  sku: z.string().min(3),
  category_id: z.string(),
  images: z.array(z.string()).min(1, "At least one image required"),
  tags: z.array(z.string()).optional(),
  material: z.string().optional(),
  care_instructions: z.string().optional(),
  is_featured: z.boolean().default(false),
});

export type LoginInput = z.infer<typeof loginSchema>;
export type SignupInput = z.infer<typeof signupSchema>;
export type CheckoutInput = z.infer<typeof checkoutSchema>;
export type AddressInput = z.infer<typeof addressSchema>;
export type ReviewInput = z.infer<typeof reviewSchema>;
export type ContactInput = z.infer<typeof contactSchema>;
export type CreateProductInput = z.infer<typeof createProductSchema>;
