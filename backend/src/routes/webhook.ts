import express, { Request, Response } from "express";
import { verifyRazorpaySignature } from "../utils/verifySignature";
import Event from "../models/Event";
import User from "../models/User";

const router = express.Router();

router.post(
  "/razorpay/:userId",
  express.raw({ type: "application/json" }),
  async (req: Request, res: Response) => {
    const user = await User.findById(req.params.userId);

    if (!user) {
      return res.status(404).send("User not found");
    }

    const signature = req.headers["x-razorpay-signature"] as string;
    const rawBody = req.body.toString();

    const isValid = verifyRazorpaySignature(rawBody, signature, user.webhookSecret);

    const parsedBody = JSON.parse(rawBody);

   await Event.create({
     userId: user._id.toString(),
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