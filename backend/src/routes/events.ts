import express, { Request, Response } from "express";
import Event from "../models/Event";

const router = express.Router();

router.get("/", async (req: Request, res: Response) => {
  const events = await Event.find().sort({ receivedAt: -1 });
  res.status(200).json(events);
});

router.get("/:id", async (req: Request, res: Response) => {
  const event = await Event.findById(req.params.id);

  if (!event) {
    return res.status(404).send("Event not found");
  }

  res.status(200).json(event);
});

export default router;