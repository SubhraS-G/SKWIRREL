"use client";

export default function GlobalError({ reset }: { reset: () => void }) {
  return (
    <html>
      <body className="bg-[#0A0A0A] text-[#F8F6F2] flex items-center justify-center min-h-screen font-sans">
        <div className="text-center px-6">
          <p className="font-bold text-[#E85A1C] text-xs tracking-widest uppercase mb-4">Something went wrong</p>
          <h1 className="text-5xl font-black tracking-widest mb-6">OOPS.</h1>
          <p className="text-[#8B8B8B] text-sm mb-8">An unexpected error occurred. Please try again.</p>
          <button
            onClick={reset}
            className="bg-[#E85A1C] text-white px-8 py-4 text-xs tracking-widest uppercase hover:bg-[#C04A10] transition-colors"
          >
            Try Again
          </button>
        </div>
      </body>
    </html>
  );
}
