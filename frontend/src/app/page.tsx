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

      {/* Hero */}
      <section className="max-w-6xl mx-auto px-8 py-16 grid md:grid-cols-2 gap-12 items-center">
        <div>
          <h1 className="font-display text-4xl md:text-5xl font-bold leading-tight">
            See every payment webhook the moment it happens.
          </h1>
          <p className="mt-5 text-[#5B5468] text-lg leading-relaxed max-w-md">
            Razorpay sends payment confirmations to a URL on your server.
            When that confirmation fails silently, you find out from an
            angry customer, not your logs. RazorLens gives you a place to
            watch it happen instead.
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

      {/* Why this exists */}
      <section className="bg-[#F5F1FB] border-y border-[#E4DCF5]">
        <div className="max-w-6xl mx-auto px-8 py-16 grid md:grid-cols-2 gap-12">
          <h2 className="font-display text-3xl font-bold leading-tight">
            Webhooks fail quietly. That's the problem.
          </h2>
          <div className="text-[#5B5468] leading-relaxed space-y-4">
            <p>
              When a payment succeeds, Razorpay calls your server directly —
              no browser involved, no console log, nothing you can see
              unless you built somewhere to look. If your server is down for
              ten seconds, or your signature check has a bug, that webhook
              can disappear without a trace.
            </p>
            <p>
              RazorLens sits between Razorpay and your code. Every webhook
              that arrives gets logged, its signature checked, and stored —
              valid or not — so you can see exactly what was sent, when, and
              whether it was genuine.
            </p>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="max-w-6xl mx-auto px-8 py-16">
        <h2 className="font-display text-3xl font-bold mb-12">
          How it works
        </h2>
        <div className="grid md:grid-cols-3 gap-10">
          <div>
            <span className="font-display text-4xl font-bold text-[#FB6A2C]">
              1
            </span>
            <h3 className="font-semibold mt-3 mb-2">Get a webhook URL</h3>
            <p className="text-[#5B5468] text-sm leading-relaxed">
              Register and RazorLens gives you a unique URL and secret,
              scoped only to your account.
            </p>
          </div>
          <div>
            <span className="font-display text-4xl font-bold text-[#FB6A2C]">
              2
            </span>
            <h3 className="font-semibold mt-3 mb-2">
              Paste it into Razorpay
            </h3>
            <p className="text-[#5B5468] text-sm leading-relaxed">
              Add the URL to your Razorpay dashboard's webhook settings.
              Every event they send now reaches you.
            </p>
          </div>
          <div>
            <span className="font-display text-4xl font-bold text-[#FB6A2C]">
              3
            </span>
            <h3 className="font-semibold mt-3 mb-2">Watch it arrive</h3>
            <p className="text-[#5B5468] text-sm leading-relaxed">
              Every event lands in your dashboard in real time, with its
              signature status and full payload.
            </p>
          </div>
        </div>
      </section>

      {/* Footer CTA */}
      <section className="border-t border-[#E4DCF5]">
        <div className="max-w-6xl mx-auto px-8 py-16 text-center">
          <h2 className="font-display text-2xl font-bold">
            Stop guessing what Razorpay sent you.
          </h2>
          <Link
            href="/register"
            className="mt-6 inline-block px-6 py-3 bg-[#4C1D95] text-white font-medium rounded-md hover:bg-[#3b1575]"
          >
            Create a free account
          </Link>
        </div>
      </section>

      <footer className="px-8 py-8 text-center text-sm text-[#8A8296]">
        RazorLens — built as a learning project.
      </footer>
    </main>
  );
}