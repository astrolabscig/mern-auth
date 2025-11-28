// import express from "express";
// import cors from "cors";
// import 'dotenv/config';
// import cookieParser from "cookie-parser";

// import connectDB from "./config/mongodb.js";
// import authRouter from "./routes/authRoutes.js";
// import userRouter from "./routes/userRoutes.js";

// const app = express();
// const port = process.env.PORT || 4000;
// connectDB();

// //const allowedOrigins = ['http://localhost:5173'];


// app.use(express.json());
// app.use(cookieParser());
// //app.use(cors({origin: allowedOrigins, credentials: true}));
// app.use(cors({origin: true, credentials: true}));

// // API Endpoints
// app.use('/api/auth', authRouter);
// app.use('/api/user', userRouter);



// export default app;
// //app.listen(port, () => console.log(`Server started successfully on PORT: ${port}`));

import express from "express";
import cors from "cors";
// REMOVED: import 'dotenv/config'; // Vercel handles environment variables directly
import cookieParser from "cookie-parser";

import connectDB from "./config/mongodb.js";
import authRouter from "./routes/authRoutes.js";
import userRouter from "./routes/userRoutes.js";

const app = express();
// REMOVED: const port = process.env.PORT || 4000; // Vercel handles port

connectDB(); // Ensure this handles connection caching for serverless environments

//const allowedOrigins = ['https://mern-auth-tau-sandy.vercel.app/'];
const VERCEL_URL = process.env.VERCEL_URL;
const allowedOrigins = VERCEL_URL ? `https://${VERCEL_URL}` : 'http://localhost:5173';
app.use(express.json());
app.use(cookieParser());
// Your CORS setting is good for local/testing. Keep it restricted for final production.
app.use(cors({origin: allowedOrigins, credentials: true}));
//app.use(cors({origin: true, credentials: true})); // Good for now, ensures your client can connect

// API Endpoints
app.use('api/auth', authRouter);
app.use('api/user', userRouter);

// ADDED: A basic health check or root response for Vercel
app.get('/', (req, res) => {
    res.send('MERN Auth API is running on Vercel.');
});

export default app;
