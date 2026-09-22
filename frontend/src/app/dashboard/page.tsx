"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

interface Event {
  _id: string;
  provider: string;
  eventType: string;
  signatureValid: boolean;
  receivedAt: string;
  payload: any;
}

export default function Dashboard() {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      router.push("/login");
      return;
    }

    fetch("http://localhost:5000/events", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((data) => {
        setEvents(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const logout = () => {
    localStorage.removeItem("token");
    router.push("/login");
  };

  const validCount = events.filter((e) => e.signatureValid).length;
  const invalidCount = events.length - validCount;

  if (loading) {
    return (
      <main className="min-h-screen flex items-center justify-center">
        <p className="text-[#5B5468]">Loading your events...</p>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-white">
      {/* Top bar */}
      <div className="border-b border-[#E4DCF5]">
        <div className="max-w-4xl mx-auto px-8 py-5 flex items-center justify-between">
          <Link href="/" className="font-display font-bold text-lg text-[#1B1330]">
            RazorLens
          </Link>
          <div className="flex items-center gap-5 text-sm">
            <Link href="/settings" className="text-[#5B5468] hover:text-[#4C1D95]">
              Settings
            </Link>
            <button onClick={logout} className="text-[#5B5468] hover:text-[#4C1D95]">
              Log out
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-8 py-10">
        <h1 className="font-display text-2xl font-bold text-[#1B1330]">
          Webhook events
        </h1>
        <p className="mt-1 text-[#5B5468] text-sm">
          Every event Razorpay has sent to your endpoint.
        </p>

        {/* Stats row */}
        <div className="mt-6 grid grid-cols-3 gap-4">
          <div className="border border-[#E4DCF5] rounded-lg p-4">
            <p className="text-2xl font-display font-bold text-[#1B1330]">
              {events.length}
            </p>
            <p className="text-xs text-[#8A8296] mt-1">Total events</p>
          </div>
          <div className="border border-[#E4DCF5] rounded-lg p-4">
            <p className="text-2xl font-display font-bold text-[#15803D]">
              {validCount}
            </p>
            <p className="text-xs text-[#8A8296] mt-1">Verified</p>
          </div>
          <div className="border border-[#E4DCF5] rounded-lg p-4">
            <p className="text-2xl font-display font-bold text-[#DC2626]">
              {invalidCount}
            </p>
            <p className="text-xs text-[#8A8296] mt-1">Failed signature</p>
          </div>
        </div>

        {/* Event list */}
        <div className="mt-8">
          {events.length === 0 ? (
            <div className="text-center py-20 border border-dashed border-[#E4DCF5] rounded-lg">
              <div className="w-12 h-12 mx-auto rounded-full bg-[#F5F1FB] flex items-center justify-center">
                <span className="text-xl">◌</span>
              </div>
              <p className="mt-4 font-medium text-[#1B1330]">
                No events yet
              </p>
              <p className="mt-1 text-sm text-[#8A8296] max-w-xs mx-auto">
                Once Razorpay sends a webhook to your endpoint, it'll show
                up here.
              </p>
              <Link
                href="/settings"
                className="mt-5 inline-block text-sm text-[#4C1D95] underline"
              >
                Get your webhook URL
              </Link>
            </div>
          ) : (
            <ul className="space-y-3">
              {events.map((event) => {
                const isOpen = expandedId === event._id;
                return (
                  <li
                    key={event._id}
                    className="border border-[#E4DCF5] rounded-lg overflow-hidden"
                  >
                    <button
                      onClick={() =>
                        setExpandedId(isOpen ? null : event._id)
                      }
                      className="w-full flex items-center justify-between px-5 py-4 text-left hover:bg-[#F5F1FB]/50 transition"
                    >
                      <div className="flex items-center gap-3">
                        <span
                          className={`w-2 h-2 rounded-full shrink-0 ${
                            event.signatureValid
                              ? "bg-[#15803D]"
                              : "bg-[#DC2626]"
                          }`}
                        />
                        <div>
                          <p className="font-medium text-sm text-[#1B1330]">
                            {event.eventType}
                          </p>
                          <p className="text-xs text-[#8A8296] mt-0.5">
                            {new Date(event.receivedAt).toLocaleString()}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <span
                          className={`text-xs font-medium px-2 py-1 rounded ${
                            event.signatureValid
                              ? "bg-[#F0FDF4] text-[#15803D]"
                              : "bg-[#FEF2F2] text-[#DC2626]"
                          }`}
                        >
                          {event.signatureValid ? "Verified" : "Invalid"}
                        </span>
                        <span className="text-[#8A8296] text-sm">
                          {isOpen ? "−" : "+"}
                        </span>
                      </div>
                    </button>

                    {isOpen && (
                      <div className="px-5 pb-4 border-t border-[#E4DCF5] bg-[#F5F1FB]/40">
                        <pre className="mt-4 font-mono text-xs text-[#1B1330] overflow-x-auto whitespace-pre">
                          {JSON.stringify(event.payload, null, 2)}
                        </pre>
                      </div>
                    )}
                  </li>
                );
              })}
            </ul>
          )}
        </div>
      </div>
    </main>
  );
}