// Vercel serverless entry point - exports Express app as default
// For local dev, use: npm run dev (which runs localServer.js with dotenv)
// On Vercel, vercel.json routes /api/* here automatically

import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

import connectDB from "./config/mongodb.js";
import authRouter from "./routes/authRoutes.js";
import userRouter from "./routes/userRoutes.js";

// Vercel injects env vars at runtime - no dotenv needed here.
// For local dev, localServer.js loads dotenv before importing this file.

const app = express();

// Connect DB - Mongoose caches the connection across serverless invocations
connectDB();

// CORS: support Vercel preview URLs and custom domains
const allowedOrigins = [];
if (process.env.VERCEL_URL) allowedOrigins.push('https://' + process.env.VERCEL_URL);
if (process.env.CLIENT_URL) allowedOrigins.push(process.env.CLIENT_URL);
if (process.env.NODE_ENV !== 'production') allowedOrigins.push('http://localhost:5173');

app.use(cors({
  origin: allowedOrigins.length ? allowedOrigins : true,
  credentials: true,
}));

app.use(express.json());
app.use(cookieParser());

// /api/ prefix so vercel.json can route /api/* here while frontend handles the rest
app.use('/api/auth', authRouter);
app.use('/api/user', userRouter);

// Health check
app.get('/api', (req, res) => {
  res.json({ status: 'ok', message: 'MERN Auth API is running.' });
});

export default app;
