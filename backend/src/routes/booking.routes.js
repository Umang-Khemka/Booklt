import express from "express";
import { createBooking,getAvailability } from "../controllers/booking.controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.post("/", authMiddleware, createBooking);
router.get("/availability/:experienceId/:date", getAvailability);

export default router;
