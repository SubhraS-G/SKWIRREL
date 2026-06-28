import { useEffect, useRef } from "react";
import { useInView } from "framer-motion";

export function useScrollAnimation(threshold = 0.1) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: threshold });
  return { ref, inView };
}
