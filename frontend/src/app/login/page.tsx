"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const router = useRouter();

  const handleLogin = async () => {
    setError("");
    setSubmitting(true);

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (!res.ok) {
        const text = await res.text();
        setError(text);
        setSubmitting(false);
        return;
      }

      const data = await res.json();
      localStorage.setItem("token", data.token);
      router.push("/dashboard");
    } catch (err) {
      setError("Something went wrong. Please try again.");
      setSubmitting(false);
    }
  };

  return (
    <main className="min-h-screen grid md:grid-cols-2">
      <div className="relative hidden md:flex flex-col justify-between bg-[#4C1D95] text-white p-12 overflow-hidden">
        <div className="absolute -bottom-24 -right-16 w-96 h-96 bg-[#FB6A2C] rounded-full opacity-30 blur-3xl animate-drift" />
        <div className="relative z-10">
          <Link href="/" className="font-display font-bold text-lg">
            RazorLens
          </Link>
        </div>
        <div className="relative z-10">
          <p className="font-display text-3xl font-bold leading-snug max-w-sm">
            Welcome back.
          </p>
          <p className="mt-4 text-white/70 max-w-sm">
            Your webhooks have been waiting.
          </p>
        </div>
        <div className="relative z-10 text-sm text-white/50">
          New here?{" "}
          <Link href="/register" className="text-white underline">
            Create an account
          </Link>
        </div>
      </div>

      <div className="flex items-center justify-center p-8">
        <div className="w-full max-w-sm">
          <h1 className="font-display text-2xl font-bold">Log in</h1>
          <p className="mt-2 text-[#5B5468] text-sm md:hidden">
            New here?{" "}
            <Link href="/register" className="text-[#4C1D95] underline">
              Create an account
            </Link>
          </p>

          <div className="mt-8 space-y-5">
            <div>
              <label className="block text-sm font-medium mb-1.5">
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full border border-[#E4DCF5] rounded-md px-3 py-2.5 outline-none transition focus:border-[#4C1D95] focus:ring-2 focus:ring-[#4C1D95]/20"
                placeholder="you@company.com"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1.5">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full border border-[#E4DCF5] rounded-md px-3 py-2.5 outline-none transition focus:border-[#4C1D95] focus:ring-2 focus:ring-[#4C1D95]/20"
                placeholder="Your password"
              />
            </div>

            {error && (
              <p className="text-sm text-[#DC2626] bg-[#FEF2F2] border border-[#FECACA] rounded-md px-3 py-2">
                {error}
              </p>
            )}

            <button
              onClick={handleLogin}
              disabled={submitting}
              className="w-full py-3 bg-[#4C1D95] text-white font-medium rounded-md transition hover:bg-[#3b1575] active:scale-[0.98] disabled:opacity-60"
            >
              {submitting ? "Logging in..." : "Log in"}
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}