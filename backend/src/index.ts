import express, { Request, Response } from "express";
import cors from "cors";
import { connectDB } from "./db";
import webhookRouter from "./routes/webhook";
import eventsRouter from "./routes/events";
import authRouter from "./routes/auth";

const app = express();
const PORT = 5000;

connectDB();

app.use(cors());

app.use("/webhooks", webhookRouter);

app.use(express.json());

app.use("/events", eventsRouter);
app.use("/auth", authRouter);

app.get("/", (req: Request, res: Response) => {
  res.send("Razorlens backend is working");
});

app.listen(PORT, () => {
  console.log(`Server started on http://localhost:${PORT}`);
});