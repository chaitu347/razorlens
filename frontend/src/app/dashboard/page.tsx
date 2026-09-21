"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

interface Event {
  _id: string;
  provider: string;
  eventType: string;
  signatureValid: boolean;
  receivedAt: string;
}

export default function Dashboard() {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      router.push("/login");
      return;
    }

    fetch("http://localhost:5000/events", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setEvents(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to fetch events:", err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <p className="p-8">Loading events...</p>;
  }

  return (
    <main className="p-8">
      <h1 className="text-2xl font-bold mb-4">RazorLens — Webhook Events</h1>

      {events.length === 0 ? (
        <p>No events received yet.</p>
      ) : (
        <ul className="space-y-3">
          {events.map((event) => (
            <li key={event._id} className="border rounded p-4">
              <p><strong>Type:</strong> {event.eventType}</p>
              <p><strong>Provider:</strong> {event.provider}</p>
              <p>
                <strong>Signature:</strong>{" "}
                {event.signatureValid ? "✅ Valid" : "❌ Invalid"}
              </p>
              <p><strong>Received:</strong> {new Date(event.receivedAt).toLocaleString()}</p>
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}