"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

interface UserInfo {
  userId: string;
  email: string;
  webhookSecret: string;
}

export default function SettingsPage() {
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState<string | null>(null);
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
        setUserInfo(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopied(label);
    setTimeout(() => setCopied(null), 2000);
  };

  if (loading) return <p className="p-8">Loading...</p>;
  if (!userInfo) return <p className="p-8">Could not load your settings.</p>;

 const webhookUrl = `${process.env.NEXT_PUBLIC_API_URL}/webhooks/razorpay/${userInfo.userId}`;

  return (
    <main className="p-8 max-w-2xl mx-auto">
      <h1 className="font-display text-2xl font-bold mb-2">Settings</h1>
      <p className="text-[#5B5468] mb-8">
        Use these values to connect Razorpay to your RazorLens account.
      </p>

      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium mb-1.5">
            Your webhook URL
          </label>
          <p className="text-xs text-[#8A8296] mb-2">
            Paste this into Razorpay → Settings → Webhooks → Webhook URL
          </p>
          <div className="flex gap-2">
            <code className="flex-1 bg-[#F5F1FB] border border-[#E4DCF5] rounded-md px-3 py-2.5 text-sm font-mono break-all">
              {webhookUrl}
            </code>
            <button
              onClick={() => copyToClipboard(webhookUrl, "url")}
              className="px-4 py-2 bg-[#4C1D95] text-white text-sm font-medium rounded-md hover:bg-[#3b1575] shrink-0"
            >
              {copied === "url" ? "Copied!" : "Copy"}
            </button>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1.5">
            Your webhook secret
          </label>
          <p className="text-xs text-[#8A8296] mb-2">
            Paste this into Razorpay's "Secret" field for the same webhook
          </p>
          <div className="flex gap-2">
            <code className="flex-1 bg-[#F5F1FB] border border-[#E4DCF5] rounded-md px-3 py-2.5 text-sm font-mono break-all">
              {userInfo.webhookSecret}
            </code>
            <button
              onClick={() => copyToClipboard(userInfo.webhookSecret, "secret")}
              className="px-4 py-2 bg-[#4C1D95] text-white text-sm font-medium rounded-md hover:bg-[#3b1575] shrink-0"
            >
              {copied === "secret" ? "Copied!" : "Copy"}
            </button>
          </div>
        </div>

        <div className="text-sm text-[#5B5468] bg-[#F5F1FB] border border-[#E4DCF5] rounded-md p-4">
          Logged in as <strong>{userInfo.email}</strong>
        </div>
      </div>
    </main>
  );
}