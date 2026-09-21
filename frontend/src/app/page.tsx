import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen bg-white text-[#1B1330]">
      <nav className="flex items-center justify-between px-8 py-6 max-w-6xl mx-auto">
        <span className="font-display font-bold text-lg">RazorLens</span>
        <div className="flex gap-3">
          <Link
            href="/login"
            className="px-4 py-2 text-sm font-medium hover:text-[#4C1D95]"
          >
            Log in
          </Link>
          <Link
            href="/register"
            className="px-4 py-2 text-sm font-medium bg-[#4C1D95] text-white rounded-md hover:bg-[#3b1575]"
          >
            Create account
          </Link>
        </div>
      </nav>

      <section className="max-w-6xl mx-auto px-8 py-16 grid md:grid-cols-2 gap-12 items-center">
        <div>
          <h1 className="font-display text-4xl md:text-5xl font-bold leading-tight">
            See every payment webhook the moment it happens.
          </h1>
          <p className="mt-5 text-[#5B5468] text-lg leading-relaxed max-w-md">
            RazorLens verifies, logs, and lets you replay every Razorpay
            webhook your integration receives — so a failed payment
            notification is never a mystery.
          </p>
          <div className="mt-8 flex gap-3">
            <Link
              href="/register"
              className="px-6 py-3 bg-[#FB6A2C] text-white font-medium rounded-md hover:bg-[#e35a20]"
            >
              Get your webhook URL
            </Link>
            <Link
              href="/login"
              className="px-6 py-3 border border-[#E4DCF5] font-medium rounded-md hover:bg-[#F5F1FB]"
            >
              Log in
            </Link>
          </div>
        </div>

        <div className="bg-[#F5F1FB] border border-[#E4DCF5] rounded-lg p-5">
          <div className="flex items-center justify-between mb-4">
            <span className="text-sm font-medium text-[#5B5468]">
              payment.captured
            </span>
            <span className="text-xs font-medium text-[#4C1D95] bg-[#EAE1FA] px-2 py-1 rounded">
              Signature verified
            </span>
          </div>
          <pre className="font-mono text-sm text-[#1B1330] whitespace-pre-wrap leading-relaxed">
{`{
  "event": "payment.captured",
  "payment": {
    "id": "pay_Nf82js0KQ",
    "amount": 50000,
    "status": "captured"
  }
}`}
          </pre>
          <div className="mt-4 pt-4 border-t border-[#E4DCF5] text-xs text-[#8A8296]">
            Received 2 seconds ago
          </div>
        </div>
      </section>
    </main>
  );
}