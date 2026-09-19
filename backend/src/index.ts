import express, { Request, Response } from "express";
import { connectDB } from "./db";
import webhookRouter from "./routes/webhook";
import eventsRouter from "./routes/events";

const app = express();
const PORT = 5000;

connectDB();

app.use("/webhooks", webhookRouter);
app.use("/events", eventsRouter);

app.get("/", (req: Request, res: Response) => {
  res.send("Razorlens backend is working");
});

app.listen(PORT, () => {
  console.log(`Server started on http://localhost:${PORT}`);
});