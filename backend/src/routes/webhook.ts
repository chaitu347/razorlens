import express, { Request, Response } from "express";
import { verifyRazorpaySignature } from "../utils/verifySignature";
import Event from "../models/Event";

const router = express.Router();

router.post(
  "/razorpay",
  express.raw({ type: "application/json" }),
  async (req: Request, res: Response) => {
    const signature = req.headers["x-razorpay-signature"] as string;
    const secret = process.env.RAZORPAY_WEBHOOK_SECRET as string;
    const rawBody = req.body.toString();

    const isValid = verifyRazorpaySignature(rawBody, signature, secret);

    const parsedBody = JSON.parse(rawBody);

    await Event.create({
      provider: "razorpay",
      eventType: parsedBody.event,
      payload: parsedBody,
      headers: req.headers,
      signatureValid: isValid,
    });

    if (!isValid) {
      console.log("Invalid signature received!");
      return res.status(400).send("Invalid signature");
    }

    console.log("Valid webhook received:", parsedBody.event);
    res.status(200).send("Webhook received");
  }
);

export default router;