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

    fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/login`, {
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
      <main className="min-h-screen flex items-center justify-center bg-[#FCFBFF]">
        <p className="text-[#5B5468] text-sm">Loading your events...</p>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#FCFBFF]">
      {/* Top bar */}
      <div className="bg-white border-b border-[#E4DCF5] sticky top-0 z-10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
          <Link href="/" className="font-display font-bold text-lg text-[#1B1330]">
            RazorLens
          </Link>
          <div className="flex items-center gap-4 sm:gap-5 text-sm">
            <Link href="/settings" className="text-[#5B5468] hover:text-[#4C1D95] transition">
              Settings
            </Link>
            <button onClick={logout} className="text-[#5B5468] hover:text-[#4C1D95] transition">
              Log out
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8">
        <div className="flex items-center justify-between flex-wrap gap-3">
          <div>
            <h1 className="font-display text-2xl font-bold text-[#1B1330]">
              Webhook events
            </h1>
            <p className="mt-1 text-[#5B5468] text-sm">
              Every event Razorpay has sent to your endpoint.
            </p>
          </div>
          <Link
            href="/settings"
            className="text-sm font-medium px-4 py-2 bg-[#4C1D95] text-white rounded-md hover:bg-[#3b1575] transition shrink-0"
          >
            Get webhook URL
          </Link>
        </div>

        {/* Stats row */}
        <div className="mt-6 grid grid-cols-3 gap-3 sm:gap-4">
          <div className="bg-white rounded-xl p-4 sm:p-5 shadow-[0_1px_2px_rgba(76,29,149,0.06),0_1px_8px_rgba(76,29,149,0.05)] border border-[#EFEAFA]">
            <p className="text-2xl sm:text-3xl font-display font-bold text-[#1B1330]">
              {events.length}
            </p>
            <p className="text-xs text-[#8A8296] mt-1">Total events</p>
          </div>
          <div className="bg-white rounded-xl p-4 sm:p-5 shadow-[0_1px_2px_rgba(76,29,149,0.06),0_1px_8px_rgba(76,29,149,0.05)] border border-[#EFEAFA]">
            <p className="text-2xl sm:text-3xl font-display font-bold text-[#15803D]">
              {validCount}
            </p>
            <p className="text-xs text-[#8A8296] mt-1">Verified</p>
          </div>
          <div className="bg-white rounded-xl p-4 sm:p-5 shadow-[0_1px_2px_rgba(76,29,149,0.06),0_1px_8px_rgba(76,29,149,0.05)] border border-[#EFEAFA]">
            <p className="text-2xl sm:text-3xl font-display font-bold text-[#DC2626]">
              {invalidCount}
            </p>
            <p className="text-xs text-[#8A8296] mt-1">Failed</p>
          </div>
        </div>

        {/* Event list */}
        <div className="mt-6">
          {events.length === 0 ? (
            <div className="bg-white rounded-xl border border-[#EFEAFA] shadow-[0_1px_2px_rgba(76,29,149,0.06),0_1px_8px_rgba(76,29,149,0.05)] text-center py-14 px-6">
              <div className="w-10 h-10 mx-auto rounded-full bg-[#F5F1FB] flex items-center justify-center text-[#4C1D95]">
                ◌
              </div>
              <p className="mt-3 font-medium text-[#1B1330]">
                No events yet
              </p>
              <p className="mt-1 text-sm text-[#8A8296] max-w-xs mx-auto">
                Once Razorpay sends a webhook to your endpoint, it'll show
                up here.
              </p>
              <Link
                href="/settings"
                className="mt-4 inline-block text-sm font-medium text-[#4C1D95] hover:underline"
              >
                Get your webhook URL →
              </Link>
            </div>
          ) : (
            <ul className="space-y-2.5">
              {events.map((event) => {
                const isOpen = expandedId === event._id;
                return (
                  <li
                    key={event._id}
                    className="bg-white rounded-xl border border-[#EFEAFA] shadow-[0_1px_2px_rgba(76,29,149,0.06),0_1px_8px_rgba(76,29,149,0.05)] overflow-hidden transition hover:shadow-[0_2px_4px_rgba(76,29,149,0.08),0_4px_16px_rgba(76,29,149,0.08)]"
                  >
                    <button
                      onClick={() => setExpandedId(isOpen ? null : event._id)}
                      className="w-full flex items-center justify-between gap-3 px-4 sm:px-5 py-3.5 text-left"
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        <span
                          className={`w-2 h-2 rounded-full shrink-0 ${
                            event.signatureValid ? "bg-[#15803D]" : "bg-[#DC2626]"
                          }`}
                        />
                        <div className="min-w-0">
                          <p className="font-medium text-sm text-[#1B1330] truncate">
                            {event.eventType}
                          </p>
                          <p className="text-xs text-[#8A8296] mt-0.5">
                            {new Date(event.receivedAt).toLocaleString()}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 sm:gap-3 shrink-0">
                        <span
                          className={`text-xs font-medium px-2 py-1 rounded-md ${
                            event.signatureValid
                              ? "bg-[#F0FDF4] text-[#15803D]"
                              : "bg-[#FEF2F2] text-[#DC2626]"
                          }`}
                        >
                          {event.signatureValid ? "Verified" : "Invalid"}
                        </span>
                        <span className="text-[#8A8296] text-sm w-4 text-center">
                          {isOpen ? "−" : "+"}
                        </span>
                      </div>
                    </button>

                    {isOpen && (
                      <div className="px-4 sm:px-5 pb-4 border-t border-[#EFEAFA] bg-[#FCFBFF]">
                        <pre className="mt-3 font-mono text-xs text-[#1B1330] overflow-x-auto whitespace-pre p-3 bg-[#F5F1FB] rounded-lg">
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