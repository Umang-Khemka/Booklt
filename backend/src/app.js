import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";

import userRoutes from "./routes/auth.routes.js";
import experienceRoutes from "./routes/experience.routes.js";
import bookingRoutes from "./routes/booking.routes.js";
import promoRoutes from "./routes/promo.routes.js";

import path from "path";
const __dirname = path.resolve();

dotenv.config();
const app = express();

app.use(cors({
    origin: "*",
    credentials: true
}));
app.use(express.json());
app.use(cookieParser());

// // Production setup
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../frontend/dist")));
  app.get("/*splat", (req, res) => {
    res.sendFile(path.join(__dirname, "../frontend", "dist", "index.html"));
  });
}

// API routes
app.use("/api/v1/users", userRoutes);
app.use("/api/v1/experiences", experienceRoutes);
app.use("/api/v1/bookings", bookingRoutes);
app.use("/api/v1/promo", promoRoutes);

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
