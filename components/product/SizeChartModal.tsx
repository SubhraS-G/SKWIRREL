"use client";

import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import { create } from "zustand";

interface SizeChartStore {
  open: boolean;
  setOpen: (v: boolean) => void;
}

export const useSizeChartStore = create<SizeChartStore>((set) => ({
  open: false,
  setOpen: (v) => set({ open: v }),
}));

const SIZE_DATA = [
  { size: "XS", chest: "34–36", waist: "28–30", length: "26" },
  { size: "S",  chest: "36–38", waist: "30–32", length: "27" },
  { size: "M",  chest: "38–40", waist: "32–34", length: "28" },
  { size: "L",  chest: "40–42", waist: "34–36", length: "29" },
  { size: "XL", chest: "42–44", waist: "36–38", length: "30" },
  { size: "XXL",chest: "44–46", waist: "38–40", length: "31" },
];

export function SizeChartModal() {
  const { open, setOpen } = useSizeChartStore();

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/70 z-50"
            onClick={() => setOpen(false)}
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-[#0d0d0d] border border-white/5 p-6 z-50 w-full max-w-lg"
          >
            <div className="flex justify-between items-center mb-5">
              <h3 className="font-bebas text-2xl tracking-wider text-brand-ivory">SIZE GUIDE</h3>
              <button onClick={() => setOpen(false)} className="text-brand-gray hover:text-brand-ivory transition-colors">
                <X size={20} />
              </button>
            </div>
            <p className="text-brand-gray text-xs mb-5">All measurements in inches. For best fit, measure across the chest and add 1".</p>
            <table className="w-full text-xs">
              <thead>
                <tr className="border-b border-white/5">
                  {["Size", "Chest", "Waist", "Length"].map((h) => (
                    <th key={h} className="text-left text-[0.6rem] tracking-[0.2em] text-brand-orange uppercase pb-2 font-normal">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {SIZE_DATA.map((row) => (
                  <tr key={row.size} className="border-b border-white/5 hover:bg-white/3 transition-colors">
                    <td className="py-2.5 text-brand-ivory font-medium">{row.size}</td>
                    <td className="py-2.5 text-brand-gray">{row.chest}"</td>
                    <td className="py-2.5 text-brand-gray">{row.waist}"</td>
                    <td className="py-2.5 text-brand-gray">{row.length}"</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
