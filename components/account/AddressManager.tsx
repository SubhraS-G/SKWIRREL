"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { addressSchema, AddressInput } from "@/lib/validations";
import { MapPin, Plus, Pencil, Trash2 } from "lucide-react";
import toast from "react-hot-toast";

interface AddressManagerProps {
  userId: string;
}

export function AddressManager({ userId }: AddressManagerProps) {
  const [showForm, setShowForm] = useState(false);
  const [addresses, setAddresses] = useState<any[]>([]);

  const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm<AddressInput>({
    resolver: zodResolver(addressSchema),
  });

  const onSubmit = async (data: AddressInput) => {
    try {
      const res = await fetch("/api/addresses", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error();
      const json = await res.json();
      setAddresses((prev) => [...prev, json.address]);
      toast.success("Address saved!");
      reset();
      setShowForm(false);
    } catch {
      toast.error("Failed to save address");
    }
  };

  const inputClass = "w-full bg-[#0d0d0d] border border-white/10 text-brand-ivory px-4 py-3 text-sm outline-none focus:border-brand-orange transition-colors placeholder:text-brand-gray/40";
  const labelClass = "block text-[0.6rem] tracking-[0.25em] text-brand-gray uppercase mb-1.5";

  return (
    <div className="space-y-4">
      {addresses.length === 0 && !showForm && (
        <div className="bg-[#0d0d0d] border border-white/5 p-10 text-center">
          <MapPin size={32} className="text-brand-gray/30 mx-auto mb-3" />
          <p className="text-brand-gray text-sm">No saved addresses yet.</p>
        </div>
      )}

      {addresses.map((addr) => (
        <div key={addr.id} className="bg-[#0d0d0d] border border-white/5 p-5 flex justify-between items-start">
          <div>
            <p className="text-brand-ivory text-sm font-medium">{addr.name}</p>
            <p className="text-brand-gray text-xs mt-1">{addr.line1}{addr.line2 ? `, ${addr.line2}` : ""}</p>
            <p className="text-brand-gray text-xs">{addr.city}, {addr.state} — {addr.pincode}</p>
            <p className="text-brand-gray text-xs">{addr.phone}</p>
          </div>
          <div className="flex gap-2">
            <button className="text-brand-gray hover:text-brand-orange transition-colors"><Pencil size={14} /></button>
            <button className="text-brand-gray hover:text-red-400 transition-colors"><Trash2 size={14} /></button>
          </div>
        </div>
      ))}

      {showForm ? (
        <form onSubmit={handleSubmit(onSubmit)} className="bg-[#0d0d0d] border border-white/5 p-6 space-y-4">
          <h3 className="font-bebas text-xl tracking-wider text-brand-ivory">ADD ADDRESS</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className={labelClass}>Full Name</label>
              <input {...register("name")} className={inputClass} placeholder="John Doe" />
              {errors.name && <p className="text-red-400 text-xs mt-1">{errors.name.message}</p>}
            </div>
            <div>
              <label className={labelClass}>Phone</label>
              <input {...register("phone")} className={inputClass} placeholder="9876543210" />
              {errors.phone && <p className="text-red-400 text-xs mt-1">{errors.phone.message}</p>}
            </div>
            <div className="sm:col-span-2">
              <label className={labelClass}>Address Line 1</label>
              <input {...register("line1")} className={inputClass} placeholder="Flat / House No., Street" />
              {errors.line1 && <p className="text-red-400 text-xs mt-1">{errors.line1.message}</p>}
            </div>
            <div className="sm:col-span-2">
              <label className={labelClass}>Address Line 2 (optional)</label>
              <input {...register("line2")} className={inputClass} placeholder="Landmark, Area" />
            </div>
            <div>
              <label className={labelClass}>City</label>
              <input {...register("city")} className={inputClass} placeholder="Bhubaneswar" />
              {errors.city && <p className="text-red-400 text-xs mt-1">{errors.city.message}</p>}
            </div>
            <div>
              <label className={labelClass}>State</label>
              <input {...register("state")} className={inputClass} placeholder="Odisha" />
              {errors.state && <p className="text-red-400 text-xs mt-1">{errors.state.message}</p>}
            </div>
            <div>
              <label className={labelClass}>PIN Code</label>
              <input {...register("pincode")} className={inputClass} placeholder="751001" maxLength={6} />
              {errors.pincode && <p className="text-red-400 text-xs mt-1">{errors.pincode.message}</p>}
            </div>
          </div>
          <div className="flex gap-3 pt-2">
            <button type="submit" disabled={isSubmitting}
              className="bg-brand-orange text-brand-ivory px-6 py-3 text-xs tracking-widest uppercase hover:bg-brand-orange-dark transition-colors disabled:opacity-50">
              {isSubmitting ? "Saving..." : "Save Address"}
            </button>
            <button type="button" onClick={() => { setShowForm(false); reset(); }}
              className="text-brand-gray text-xs tracking-wider uppercase hover:text-brand-ivory transition-colors">
              Cancel
            </button>
          </div>
        </form>
      ) : (
        <button onClick={() => setShowForm(true)}
          className="flex items-center gap-2 border border-dashed border-white/15 text-brand-gray w-full p-5 hover:border-brand-orange hover:text-brand-orange transition-all text-xs tracking-widest uppercase">
          <Plus size={14} /> Add New Address
        </button>
      )}
    </div>
  );
}
