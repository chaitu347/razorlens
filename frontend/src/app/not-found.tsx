import Link from "next/link";

export default function NotFound() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-white text-[#1B1330] px-8">
      <div className="text-center max-w-sm">
        <span className="font-display text-6xl font-bold text-[#4C1D95]">
          404
        </span>
        <h1 className="font-display text-xl font-bold mt-4">
          This page doesn't exist.
        </h1>
        <p className="mt-2 text-[#5B5468] text-sm">
          The link might be broken, or the page may have moved.
        </p>
        <Link
          href="/"
          className="mt-6 inline-block px-6 py-3 bg-[#4C1D95] text-white font-medium rounded-md hover:bg-[#3b1575] transition"
        >
          Back to home
        </Link>
      </div>
    </main>
  );
}