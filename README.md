# RazorLens

A webhook inspection and debugging tool for Razorpay integrations. RazorLens gives every user a unique, signature-verified endpoint that logs, stores, and displays every webhook event Razorpay sends — so a failed payment notification is never a silent mystery.

**Live app:** https://razorlens.vercel.app
**Backend API:** https://razorlens.onrender.com

---

## The problem

When a payment succeeds, Razorpay confirms it by sending an HTTP webhook directly to your server — no browser involved, nothing visible unless you built somewhere to look. If that webhook fails silently (a bug in signature verification, a few seconds of downtime, an unexpected event shape), you usually find out from a confused customer, not your own logs.

RazorLens sits between Razorpay and a developer's own integration. Every webhook that arrives is verified, logged in full, and made visible in a dashboard — valid or not — so debugging a payment issue means checking a UI instead of grepping through server logs.

## How it works

1. A user registers and receives a unique webhook URL and secret, scoped only to their account
2. They add that URL and secret to their own Razorpay dashboard's webhook settings
3. Every event Razorpay sends now arrives at their personal RazorLens endpoint
4. RazorLens verifies the request's HMAC-SHA256 signature against that user's secret, stores the full event (valid or not), and displays it live in their dashboard

## Tech stack

**Backend:** Node.js, Express, TypeScript, MongoDB (Mongoose)
**Frontend:** Next.js (App Router), TypeScript, Tailwind CSS
**Auth:** JWT-based sessions, bcrypt password hashing
**Deployment:** Render (backend), Vercel (frontend)

## Key implementation details

- **HMAC-SHA256 signature verification** — every incoming webhook is verified against the receiving user's own secret before being trusted, using Node's built-in `crypto` module
- **Raw body handling** — the webhook route uses `express.raw()` instead of automatic JSON parsing, since signature verification requires the exact, untouched bytes Razorpay sent
- **Multi-tenant architecture** — each user gets their own webhook secret and a dedicated URL (`/webhooks/razorpay/:userId`), so one user's events are never visible to another
- **JWT authentication** — passwords are hashed with bcrypt before storage; login issues a signed, expiring token; a custom Express middleware verifies that token on every protected route
- **Full event logging** — both valid and invalid signature attempts are stored, not just accepted ones, so a developer can see exactly what was sent and why it was rejected

## Project structure

```
razorlens/
  backend/
    src/
      models/       Mongoose schemas (User, Event)
      routes/        Express routes (auth, webhook, events)
      middleware/    JWT auth middleware
      utils/         Signature verification logic
      db.ts          MongoDB connection
      index.ts       App entry point
  frontend/
    src/
      app/
        page.tsx           Landing page
        login/              Login
        register/           Register
        dashboard/          Event dashboard
        settings/           Webhook URL & secret
```

## Running locally

**Backend:**
```bash
cd backend
npm install
# create a .env file with MONGO_URI and JWT_SECRET
npm run dev
```

**Frontend:**
```bash
cd frontend
npm install
# create a .env.local file with NEXT_PUBLIC_API_URL=http://localhost:5000
npm run dev
```

## What I'd improve next

- **Idempotency handling** — detect and skip duplicate webhook deliveries using Razorpay's event ID, rather than storing every retry as a separate event
- **Real-time updates** — push new events to the dashboard via SSE instead of requiring a manual refresh
- **Replay** — let a user resend a stored event to a local development server
- **A queue** (BullMQ + Redis) for any future asynchronous processing, so the webhook route can acknowledge receipt immediately and process in the background

## What I learned building this

This project was primarily an exercise in going deep on one specific backend concern — webhook security and reliability — rather than building broad, shallow feature coverage. It covers signature verification and why raw body parsing matters, multi-tenant data isolation, JWT-based auth from scratch, and the practical debugging that comes with deploying a two-service app (CORS, environment variables across two separate hosting platforms, and the gap between local and production configuration).