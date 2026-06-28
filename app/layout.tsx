import type { Metadata } from "next";
import { Bebas_Neue, Playfair_Display, Poppins } from "next/font/google";
import Script from "next/script";
import "@/styles/globals.css";
import { Providers } from "@/components/shared/Providers";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { CustomCursor } from "@/components/shared/CustomCursor";
import { ProgressBar } from "@/components/shared/ProgressBar";
import { Toaster } from "react-hot-toast";

const bebasNeue = Bebas_Neue({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-bebas",
  display: "swap",
});

const playfairDisplay = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

const poppins = Poppins({
  weight: ["300", "400", "500", "600"],
  subsets: ["latin"],
  variable: "--font-poppins",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "SKWIRREL — Born From Odisha. Made For The World.",
    template: "%s | SKWIRREL",
  },
  description:
    "More than clothing. It's memory, music, streets, language, and pride. Premium fashion born from the culture of Odisha, India.",
  keywords: [
    "SKWIRREL",
    "Odisha fashion",
    "cultural clothing",
    "streetwear India",
    "premium clothing",
    "Bhubaneswar",
    "Sambalpuri",
    "sustainable fashion India",
  ],
  authors: [{ name: "SKWIRREL", url: "https://skwirrel.in" }],
  creator: "SKWIRREL",
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "https://skwirrel.in",
    siteName: "SKWIRREL",
    title: "SKWIRREL — Born From Odisha. Made For The World.",
    description:
      "More than clothing. It's memory, music, streets, language, and pride.",
    images: [
      {
        url: "/images/og/og-default.jpg",
        width: 1200,
        height: 630,
        alt: "SKWIRREL — Born From Odisha",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "SKWIRREL — Born From Odisha. Made For The World.",
    description: "Premium cultural streetwear from Odisha, India.",
    images: ["/images/og/og-default.jpg"],
    creator: "@skwirrelindia",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: "/icons/favicon.ico",
    apple: "/icons/apple-touch-icon.png",
  },
  manifest: "/site.webmanifest",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${bebasNeue.variable} ${playfairDisplay.variable} ${poppins.variable}`}
    >
      <body className="font-poppins bg-brand-black text-brand-ivory overflow-x-hidden">
        <Providers>
          <CustomCursor />
          <ProgressBar />
          <Navbar />
          <main>{children}</main>
          <Footer />
          <Toaster
            position="bottom-right"
            toastOptions={{
              style: {
                background: "#1a1a1a",
                color: "#F8F6F2",
                border: "1px solid rgba(232,90,28,0.3)",
              },
            }}
          />
        </Providers>
        <Script src="https://checkout.razorpay.com/v1/checkout.js" strategy="lazyOnload" />
      </body>
    </html>
  );
}
