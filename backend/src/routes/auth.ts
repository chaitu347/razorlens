import express, { Request, Response } from "express";
import bcrypt from "bcryptjs";
import crypto from "crypto";
import User from "../models/User";
import jwt from "jsonwebtoken";

const router = express.Router();

router.post("/register", async (req: Request, res: Response) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).send("Email and password are required");
  }

  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return res.status(400).send("User already exists");
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const webhookSecret = crypto.randomBytes(32).toString("hex");

  const newUser = await User.create({
    email,
    password: hashedPassword,
    webhookSecret,
  });

  res.status(201).json({
    message: "User registered successfully",
    userId: newUser._id,
    webhookSecret: newUser.webhookSecret,
  });
});



router.post("/login", async (req: Request, res: Response) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).send("Email and password are required");
  }

  const user = await User.findOne({ email });
  if (!user) {
    return res.status(401).send("Invalid credentials");
  }

  const isPasswordCorrect = await bcrypt.compare(password, user.password);
  if (!isPasswordCorrect) {
    return res.status(401).send("Invalid credentials");
  }

  const token = jwt.sign(
    { userId: user._id },
    process.env.JWT_SECRET as string,
    { expiresIn: "7d" }
  );

  res.status(200).json({
    message: "Login successful",
    token,
    webhookSecret: user.webhookSecret,
  });
});

export default router;