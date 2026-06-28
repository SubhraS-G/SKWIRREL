"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { reviewSchema } from "@/lib/validations";
import { useSession } from "next-auth/react";
import toast from "react-hot-toast";

interface Review {
  id: string;
  rating: number;
  title?: string | null;
  body: string;
  user: { name: string | null };
  created_at: string;
}

interface ProductReviewsProps {
  productId: string;
}

function StarRating({ rating, interactive = false, onChange }: {
  rating: number;
  interactive?: boolean;
  onChange?: (r: number) => void;
}) {
  const [hover, setHover] = useState(0);
  return (
    <div className="flex gap-0.5">
      {[1,2,3,4,5].map((s) => (
        <button
          key={s}
          type={interactive ? "button" : undefined}
          onClick={() => interactive && onChange?.(s)}
          onMouseEnter={() => interactive && setHover(s)}
          onMouseLeave={() => interactive && setHover(0)}
          className={`text-lg transition-colors ${
            s <= (hover || rating) ? "text-brand-orange" : "text-brand-gray/30"
          } ${interactive ? "cursor-pointer" : "cursor-default"}`}
        >
          ★
        </button>
      ))}
    </div>
  );
}

export function ProductReviews({ productId }: ProductReviewsProps) {
  const { data: session } = useSession();
  const [reviews, setReviews] = useState<Review[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [selectedRating, setSelectedRating] = useState(5);

  const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm({
    resolver: zodResolver(reviewSchema.omit({ product_id: true })),
  });

  const onSubmit = async (data: any) => {
    if (!session) { toast.error("Please login to review"); return; }
    try {
      const res = await fetch("/api/reviews", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, product_id: productId, rating: selectedRating }),
      });
      if (!res.ok) throw new Error();
      toast.success("Review submitted! It'll appear after approval.");
      reset();
      setShowForm(false);
    } catch {
      toast.error("Failed to submit review");
    }
  };

  return (
    <section className="py-16 border-t border-white/5 mt-16">
      <div className="flex justify-between items-center mb-8">
        <h2 className="font-bebas text-3xl tracking-wider text-brand-ivory">REVIEWS</h2>
        {session && !showForm && (
          <button
            onClick={() => setShowForm(true)}
            className="text-[0.65rem] tracking-[0.25em] text-brand-orange uppercase border border-brand-orange px-4 py-2 hover:bg-brand-orange hover:text-brand-ivory transition-all"
          >
            Write a Review
          </button>
        )}
      </div>

      {showForm && (
        <form onSubmit={handleSubmit(onSubmit)} className="bg-[#0d0d0d] p-6 mb-8 space-y-4">
          <div>
            <p className="text-[0.6rem] tracking-[0.2em] text-brand-orange uppercase mb-2">Rating</p>
            <StarRating rating={selectedRating} interactive onChange={setSelectedRating} />
          </div>
          <div>
            <input
              {...register("title")}
              placeholder="Review title (optional)"
              className="w-full bg-transparent border border-white/10 text-brand-ivory px-4 py-3 text-sm outline-none focus:border-brand-orange transition-colors placeholder:text-brand-gray/40"
            />
          </div>
          <div>
            <textarea
              {...register("body")}
              rows={4}
              placeholder="Share your experience..."
              className="w-full bg-transparent border border-white/10 text-brand-ivory px-4 py-3 text-sm outline-none focus:border-brand-orange transition-colors placeholder:text-brand-gray/40 resize-none"
            />
            {errors.body && <p className="text-red-400 text-xs mt-1">{errors.body.message as string}</p>}
          </div>
          <div className="flex gap-3">
            <button type="submit" disabled={isSubmitting} className="bg-brand-orange text-brand-ivory px-6 py-3 text-xs tracking-widest uppercase hover:bg-brand-orange-dark transition-colors disabled:opacity-50">
              {isSubmitting ? "Submitting..." : "Submit Review"}
            </button>
            <button type="button" onClick={() => setShowForm(false)} className="text-brand-gray text-xs tracking-wider uppercase hover:text-brand-ivory transition-colors">
              Cancel
            </button>
          </div>
        </form>
      )}

      {reviews.length === 0 ? (
        <p className="text-brand-gray text-sm">No reviews yet. Be the first to review this product.</p>
      ) : (
        <div className="space-y-6">
          {reviews.map((r) => (
            <div key={r.id} className="border-b border-white/5 pb-6">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <StarRating rating={r.rating} />
                  {r.title && <p className="text-brand-ivory text-sm font-medium mt-1">{r.title}</p>}
                </div>
                <span className="text-brand-gray text-xs">
                  {new Date(r.created_at).toLocaleDateString("en-IN")}
                </span>
              </div>
              <p className="text-brand-gray text-sm leading-relaxed mt-2">{r.body}</p>
              <p className="text-[0.6rem] tracking-wider text-brand-orange uppercase mt-3">{r.user.name ?? "Anonymous"}</p>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
