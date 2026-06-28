import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-brand-black flex items-center justify-center px-6">
      <div className="text-center max-w-md">
        <p className="font-bebas text-[8rem] lg:text-[10rem] leading-none text-brand-orange/10 select-none">404</p>
        <h1 className="font-bebas text-4xl lg:text-5xl text-brand-ivory -mt-4 mb-4">PAGE NOT FOUND</h1>
        <p className="text-brand-gray text-sm mb-10">
          Looks like this page wandered off like a squirrel. Let's get you back on track.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/" className="bg-brand-orange text-brand-ivory px-8 py-4 text-[0.7rem] tracking-[0.25em] uppercase hover:bg-brand-orange-dark transition-colors">
            Go Home
          </Link>
          <Link href="/shop" className="border border-white/10 text-brand-gray px-8 py-4 text-[0.7rem] tracking-[0.25em] uppercase hover:border-brand-ivory hover:text-brand-ivory transition-all">
            Browse Shop
          </Link>
        </div>
      </div>
    </div>
  );
}
