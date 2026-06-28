import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          black: "#0A0A0A",
          orange: "#E85A1C",
          "orange-dark": "#C04A10",
          ivory: "#F8F6F2",
          beige: "#EDE7DE",
          gray: "#8B8B8B",
        },
      },
      fontFamily: {
        bebas: ["var(--font-bebas)", "sans-serif"],
        playfair: ["var(--font-playfair)", "serif"],
        poppins: ["var(--font-poppins)", "sans-serif"],
      },
      animation: {
        "ticker": "ticker 20s linear infinite",
        "fade-up": "fadeUp 0.6s ease forwards",
        "orb-pulse": "orbPulse 4s ease-in-out infinite",
        "scroll-drop": "scrollDrop 1.5s ease-in-out infinite",
        "test-scroll": "testScroll 25s linear infinite",
      },
      keyframes: {
        ticker: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
        fadeUp: {
          from: { opacity: "0", transform: "translateY(30px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        orbPulse: {
          "0%, 100%": { transform: "translate(-50%, -50%) scale(1)" },
          "50%": { transform: "translate(-50%, -50%) scale(1.1)" },
        },
        scrollDrop: {
          "0%": { transform: "scaleY(0)", transformOrigin: "top" },
          "49%": { transform: "scaleY(1)", transformOrigin: "top" },
          "51%": { transform: "scaleY(1)", transformOrigin: "bottom" },
          "100%": { transform: "scaleY(0)", transformOrigin: "bottom" },
        },
        testScroll: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};

export default config;
