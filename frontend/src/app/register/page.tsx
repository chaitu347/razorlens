"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function RegisterPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [webhookSecret, setWebhookSecret] = useState("");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const router = useRouter();

  const handleRegister = async () => {
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
      setWebhookSecret(data.webhookSecret);
      setSubmitting(false);
    } catch (err) {
      setError("Something went wrong. Please try again.");
      setSubmitting(false);
    }
  };

  return (
    <main className="min-h-screen grid md:grid-cols-2">
      {/* Left: brand panel */}
      <div className="relative hidden md:flex flex-col justify-between bg-[#4C1D95] text-white p-12 overflow-hidden">
        <div className="absolute -top-20 -left-20 w-96 h-96 bg-[#FB6A2C] rounded-full opacity-30 blur-3xl animate-drift" />
        <div className="relative z-10">
          <Link href="/" className="font-display font-bold text-lg">
            RazorLens
          </Link>
        </div>
        <div className="relative z-10">
          <p className="font-display text-3xl font-bold leading-snug max-w-sm">
            Every webhook, verified and logged the second it arrives.
          </p>
          <p className="mt-4 text-white/70 max-w-sm">
            Create an account and get a unique webhook URL in under a
            minute.
          </p>
        </div>
        <div className="relative z-10 text-sm text-white/50">
          Already have an account?{" "}
          <Link href="/login" className="text-white underline">
            Log in
          </Link>
        </div>
      </div>

      {/* Right: form panel */}
      <div className="flex items-center justify-center p-8">
        <div className="w-full max-w-sm">
          {webhookSecret ? (
            <div className="animate-[fadeIn_0.4s_ease-out]">
              <h1 className="font-display text-2xl font-bold">
                You're in.
              </h1>
              <p className="mt-2 text-[#5B5468] text-sm">
                Save this webhook secret now — you won't see it again.
              </p>
              <code className="mt-4 block bg-[#F5F1FB] border border-[#E4DCF5] p-3 rounded-md text-xs break-all font-mono">
                {webhookSecret}
              </code>
              <button
                onClick={() => router.push("/login")}
                className="mt-6 w-full py-3 bg-[#4C1D95] text-white font-medium rounded-md transition hover:bg-[#3b1575] active:scale-[0.98]"
              >
                Continue to login
              </button>
            </div>
          ) : (
            <div>
              <h1 className="font-display text-2xl font-bold">
                Create your account
              </h1>
              <p className="mt-2 text-[#5B5468] text-sm md:hidden">
                Already have one?{" "}
                <Link href="/login" className="text-[#4C1D95] underline">
                  Log in
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
                    placeholder="At least 8 characters"
                  />
                </div>

                {error && (
                  <p className="text-sm text-[#DC2626] bg-[#FEF2F2] border border-[#FECACA] rounded-md px-3 py-2">
                    {error}
                  </p>
                )}

                <button
                  onClick={handleRegister}
                  disabled={submitting}
                  className="w-full py-3 bg-[#FB6A2C] text-white font-medium rounded-md transition hover:bg-[#e35a20] active:scale-[0.98] disabled:opacity-60"
                >
                  {submitting ? "Creating account..." : "Create account"}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}