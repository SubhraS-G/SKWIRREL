import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface CartItem {
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

interface CartStore {
  items: CartItem[];
  coupon: { code: string; discount: number; type: "percentage" | "fixed" } | null;

  addItem: (item: Omit<CartItem, "quantity"> & { quantity?: number }) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  applyCoupon: (coupon: CartStore["coupon"]) => void;
  removeCoupon: () => void;

  subtotal: () => number;
  discount: () => number;
  shipping: () => number;
  total: () => number;
  totalItems: () => number;
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      coupon: null,

      addItem: (item) => {
        set((state) => {
          const key = `${item.productId}-${item.variantId ?? "default"}`;
          const existing = state.items.find(
            (i) => `${i.productId}-${i.variantId ?? "default"}` === key
          );
          if (existing) {
            return {
              items: state.items.map((i) =>
                `${i.productId}-${i.variantId ?? "default"}` === key
                  ? { ...i, quantity: Math.min(i.quantity + (item.quantity ?? 1), i.maxStock) }
                  : i
              ),
            };
          }
          return {
            items: [
              ...state.items,
              { ...item, id: key, quantity: item.quantity ?? 1 },
            ],
          };
        });
      },

      removeItem: (id) =>
        set((state) => ({ items: state.items.filter((i) => i.id !== id) })),

      updateQuantity: (id, quantity) => {
        if (quantity < 1) {
          get().removeItem(id);
          return;
        }
        set((state) => ({
          items: state.items.map((i) =>
            i.id === id ? { ...i, quantity: Math.min(quantity, i.maxStock) } : i
          ),
        }));
      },

      clearCart: () => set({ items: [], coupon: null }),

      applyCoupon: (coupon) => set({ coupon }),
      removeCoupon: () => set({ coupon: null }),

      subtotal: () =>
        get().items.reduce((sum, i) => sum + i.price * i.quantity, 0),

      discount: () => {
        const { coupon, subtotal } = get();
        if (!coupon) return 0;
        if (coupon.type === "percentage")
          return Math.round((subtotal() * coupon.discount) / 100);
        return Math.min(coupon.discount, subtotal());
      },

      shipping: () => {
        const sub = get().subtotal();
        return sub >= 999 ? 0 : 99;
      },

      total: () => get().subtotal() - get().discount() + get().shipping(),

      totalItems: () => get().items.reduce((sum, i) => sum + i.quantity, 0),
    }),
    { name: "skwirrel-cart" }
  )
);
