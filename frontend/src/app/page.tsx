import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#F6F3EC] text-[#1D2420]">
      <nav className="flex items-center justify-between px-8 py-6 max-w-6xl mx-auto">
        <span className="font-display text-xl">RazorLens</span>
        <div className="flex gap-3 items-center">
          <Link
            href="/login"
            className="px-4 py-2 text-sm font-medium hover:text-[#1F4D3A]"
          >
            Log in
          </Link>
          <Link
            href="/register"
            className="px-5 py-2.5 text-sm font-medium bg-[#1D2420] text-white rounded-full hover:bg-[#2A322D]"
          >
            Get started
          </Link>
        </div>
      </nav>

      <section
        className="relative px-8 pt-16 pb-24 bg-cover bg-top"
        style={{
          backgroundImage:
            "url('https://res.cloudinary.com/dmof2vhqp/image/upload/v1790695202/ChatGPT_Image_Sep_29_2026_08_49_39_PM_axsxkb.png')",
        }}
      >
        <div className="max-w-3xl mx-auto text-center">
          <span className="inline-block text-xs font-medium px-3 py-1.5 rounded-full bg-white/70 border border-[#E7E2D6]">
            Webhook verification for Razorpay
          </span>
          <h1 className="mt-6 font-display text-5xl md:text-6xl leading-[1.1]">
            See every webhook
            <br />
            <span className="italic text-[#D68A4C]">the moment it arrives.</span>
          </h1>
          <p className="mt-6 text-[#4A4F49] text-lg max-w-xl mx-auto">
            RazorLens verifies, logs, and shows you exactly what Razorpay
            sent — so a failed payment notification is never a mystery.
          </p>
          <div className="mt-8 flex gap-3 justify-center">
            <Link
              href="/register"
              className="px-6 py-3 bg-[#1D2420] text-white rounded-full font-medium hover:bg-[#2A322D]"
            >
              Get your webhook URL
            </Link>
            <Link
              href="/login"
              className="px-6 py-3 border border-[#1D2420]/20 rounded-full font-medium hover:bg-white/50"
            >
              Log in
            </Link>
          </div>
        </div>
      </section>

      <section className="max-w-4xl mx-auto px-8 -mt-12 relative">
        <div className="bg-white rounded-2xl border border-[#E7E2D6] shadow-[0_1px_2px_rgba(29,36,32,0.04),0_12px_40px_rgba(29,36,32,0.08)] p-6">
          <div className="flex items-center justify-between mb-4">
            <span className="text-sm font-medium text-[#4A4F49]">
              payment.captured
            </span>
            <span className="text-xs font-medium text-[#1F4D3A] bg-[#E8F0EA] px-2.5 py-1 rounded-full">
              Signature verified
            </span>
          </div>
          <pre className="font-mono text-sm text-[#1D2420] bg-[#F6F3EC] rounded-lg p-4 whitespace-pre-wrap">
{`{
  "event": "payment.captured",
  "payment": {
    "id": "pay_Nf82js0KQ",
    "amount": 50000,
    "status": "captured"
  }
}`}
          </pre>
          <p className="mt-4 text-xs text-[#8A8F87]">Received 2 seconds ago</p>
        </div>
      </section>

      <section className="max-w-5xl mx-auto px-8 py-24">
        <h2 className="font-display text-3xl text-center mb-12">
          Why webhooks need watching
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          <div>
            <div className="w-10 h-10 rounded-full bg-[#E8F0EA] flex items-center justify-center text-[#1F4D3A] mb-4">
              ✓
            </div>
            <h3 className="font-medium mb-2">Verified, not assumed</h3>
            <p className="text-sm text-[#6B6F6A] leading-relaxed">
              Every event's signature is checked against your own secret
              before it's ever trusted.
            </p>
          </div>
          <div>
            <div className="w-10 h-10 rounded-full bg-[#FBEFE0] flex items-center justify-center text-[#D68A4C] mb-4">
              ◌
            </div>
            <h3 className="font-medium mb-2">Nothing goes missing</h3>
            <p className="text-sm text-[#6B6F6A] leading-relaxed">
              Valid or invalid, every event is logged — so a rejected
              webhook is visible, not silent.
            </p>
          </div>
          <div>
            <div className="w-10 h-10 rounded-full bg-[#E8F0EA] flex items-center justify-center text-[#1F4D3A] mb-4">
              ⊙
            </div>
            <h3 className="font-medium mb-2">Yours alone</h3>
            <p className="text-sm text-[#6B6F6A] leading-relaxed">
              Your webhook URL and secret are unique to your account — no
              one else's events ever reach your dashboard.
            </p>
          </div>
        </div>
      </section>

      <footer className="px-8 py-8 text-center text-sm text-[#8A8F87]">
        RazorLens — built as a learning project.
      </footer>
    </main>
  );
}