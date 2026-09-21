import express, { Response } from "express";
import Event from "../models/Event";
import { authMiddleware, AuthRequest } from "../middleware/auth";

const router = express.Router();

router.get("/", authMiddleware, async (req: AuthRequest, res: Response) => {
  const events = await Event.find({ userId: req.userId }).sort({ receivedAt: -1 });
  res.status(200).json(events);
});

router.get("/:id", authMiddleware, async (req: AuthRequest, res: Response) => {
  const event = await Event.findOne({ _id: req.params.id, userId: req.userId });

  if (!event) {
    return res.status(404).send("Event not found");
  }

  res.status(200).json(event);
});

export default router;