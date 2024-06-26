import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { rateLimit } from 'express-rate-limit'
import { connectDB } from "./config/default.js";
import { authRoutes } from "./routes/auth.js";
import { jobAdRoutes } from "./routes/jobAd.js";
import cookieParser from "cookie-parser";
import './cronJob.js'

const PORT = 5000;

// origin: 'http://localhost:3000',
const app = express();
dotenv.config();
app.use(cors({
    origin: 'https://signup110.netlify.app',
    credentials: true
}));

app.use(cookieParser())
// app.use(express.urlencoded({ extended: true }));
app.use(express.json());

connectDB();

// const limiter = rateLimit({
//     windowMs: 1 * 60 * 1000, // 15 minutes
//     limit: 4, // Limit each IP to 100 requests per `window` (here, per 15 minutes).
//     // standardHeaders: 'draft-7', // draft-6: `RateLimit-*` headers; draft-7: combined `RateLimit` header
//     // legacyHeaders: false, // Disable the `X-RateLimit-*` headers.
//     // store: ... , // Use an external store for consistency across multiple server instances.
//     message: "Too many requests, please try again later.",
// })

// Apply the rate limiting middleware to all requests.
// app.use(limiter)

app.use("/api/auth", authRoutes);
app.use("/api/jobAd", jobAdRoutes);

app.get("/", (request, response) => {
    response.send("Hello World... cookie..credential..==>> orign");
});


app.listen(PORT, () => {
    console.log(`Server is Running at http://localhost:${PORT}`);
});
